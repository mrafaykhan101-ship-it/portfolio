# Muhammad Rafay Khan — Portfolio

A premium, animated personal portfolio built with Next.js 16, React 19,
TypeScript and Tailwind CSS v4.

Dark, glassmorphic and motion-led — designed to read like a product site
rather than a résumé template.

---

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Dev server with hot reload (Turbopack)        |
| `npm run build` | Production build                              |
| `npm run start` | Serve the production build locally            |
| `npm run lint`  | ESLint                                        |
| `npx tsc --noEmit` | Type-check without emitting files          |

---

## Making it yours

Almost everything you'll want to change lives in **one file**:
[`src/lib/content.ts`](src/lib/content.ts). No component edits required.

### 1. Fill in the placeholder links

These are the only values that still point at placeholders:

```ts
// src/lib/content.ts
github:   "https://github.com/",        // ← your GitHub profile
linkedin: "https://www.linkedin.com/",  // ← your LinkedIn profile
url:      "https://rafaykhan.vercel.app", // ← your live URL after deploying
```

`url` matters more than it looks — it drives the canonical tag, the Open
Graph tags, the sitemap and `robots.txt`. Set it to your real domain once
you've deployed.

### 2. Add your photo (optional)

The hero currently shows a designed monogram card. To use a real photo, drop
a square-ish image into `public/` and point to it:

```ts
portrait: "/portrait.jpg",
```

It renders through `next/image` automatically — no other change needed.

### 3. Add or edit a project

Append to the `projects` array. To publish code or a demo, set `github` /
`demo` to real URLs — the buttons switch from a disabled state to real links
on their own:

```ts
{
  slug: "my-project",
  title: "My Project",
  category: "Machine Learning", // must exist in projectCategories
  blurb: "One line that sells it.",
  description: "Two or three sentences on what you built and how.",
  tech: ["Python", "pandas"],
  metric: { value: "94%", label: "Accuracy" }, // optional headline number
  github: "https://github.com/you/my-project",
  demo: null,
  status: "completed", // "live" | "completed" | "building"
  accent: "iris",      // "iris" | "aqua" | "mint"
  image: "/my-project.png", // optional; falls back to generated cover art
}
```

### 4. Update the résumé

Replace `public/Muhammad-Rafay-Khan-Resume.pdf` with your latest PDF, keeping
the filename (or update `resumePath` in `content.ts`).

### 5. Add real work experience

`experience` is an empty array, so the Experience section renders an
intentional "open to work" pitch. Add a single entry and it automatically
switches to a proper role timeline — no component changes.

---

## Deploying to Vercel

The project is a standard Next.js app and deploys with zero configuration.

### Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

```bash
git push -u origin main
```

> If `git push` complains that the branch is called something else, run
> `git branch -M main` first.

### Deploy

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the repository you just pushed.
3. Vercel auto-detects Next.js — leave every setting at its default.
4. Click **Deploy**.

You'll get a `*.vercel.app` URL in about a minute. Every later `git push` to
`main` redeploys automatically.

### One thing to do after the first deploy

Set `url` in `src/lib/content.ts` to your real deployed URL and push again.
Until you do, the canonical tag, sitemap and social-share metadata will point
at the placeholder domain.

**Deploying from the CLI instead:**

```bash
npx vercel --prod
```

---

## How it's built

```
src/
├─ app/
│  ├─ layout.tsx            Fonts, metadata, JSON-LD, shell composition
│  ├─ page.tsx              Section order
│  ├─ globals.css           Design tokens + custom Tailwind utilities
│  ├─ opengraph-image.tsx   Generated social card
│  ├─ icon.tsx              Generated favicon
│  ├─ sitemap.ts robots.ts manifest.ts
├─ components/
│  ├─ background/           Aurora backdrop + canvas constellation
│  ├─ layout/               Navbar, Footer, Preloader, ScrollProgress
│  ├─ providers/            Lenis smooth-scroll provider
│  ├─ sections/             One file per page section
│  └─ ui/                   Reveal, Button, GlassCard, Magnetic, …
├─ hooks/                   useInViewport, useActiveSection, useFinePointer
└─ lib/                     content.ts (all copy), motion.ts, accents.ts
```

### Design system

All colour, spacing, easing and animation tokens are declared once in
`src/app/globals.css` under `@theme`. The palette is intentionally small:
`ink` surfaces, `mist` type, and three accents (`iris`, `aqua`, `mint`).

Every step of the `mist` type scale clears **WCAG AA (4.5:1)** on the page
background, so muted text stays readable.

### Motion

- **Framer Motion (`motion`)** — scroll reveals, layout animations, springs.
- **GSAP** — the preloader timeline and the scrubbed education timeline,
  where a shared clock and scroll-linked progress are genuinely easier.
- **Lenis** — smooth scrolling, with in-page anchors handled by one delegated
  listener.

Scroll reveals use a geometry-based `useInViewport` hook rather than
`IntersectionObserver`. IO callbacks stop firing when a page isn't
compositing, which can strand a one-shot reveal at `opacity: 0`; a
`getBoundingClientRect` check has no such dependency.

**Reduced motion** is handled at the primitive level — each wrapper renders a
static element rather than relying on a global CSS override — so
`prefers-reduced-motion` produces a calm, fully functional site.

There's also a `<noscript>` fallback: with JavaScript disabled the preloader
is hidden and all entrance states are forced visible, so the page stays
readable.

### Notes on a few decisions

- **No Three.js.** The interactive background is a capped canvas-2D
  constellation (≤84 particles, DPR capped at 1.5, paused when the tab is
  hidden, skipped entirely on touch and for reduced-motion). WebGL wouldn't
  render this any better and would add ~150KB to a page whose point is speed.
- **The contact form uses `mailto:`.** This is a static site with no backend,
  so the form validates input and hands off a pre-filled message rather than
  pretending to POST somewhere. To wire up a real endpoint, replace the
  submit handler in `src/components/sections/Contact.tsx`.
- **Skills show tiers, not percentages.** A "92%" on a skill bar is
  unverifiable and is the clearest tell of a template portfolio.

---

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP ·
Lenis · Lucide
