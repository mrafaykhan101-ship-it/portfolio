# Portfolio — Muhammad Rafay Khan

Source for **[portfolio-ten-dun-18.vercel.app](https://portfolio-ten-dun-18.vercel.app)**.

A dark, motion-led personal site documenting five completed projects across
financial machine learning, statistical research, Islamic finance structuring and
relational data modelling — each with its method, its measured result, and its limits.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis

---

## Running it

```bash
npm install && npm run dev
```

| Command | |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

---

## Engineering notes

The parts of this build that involved an actual decision.

### Scroll reveals don't use IntersectionObserver

The obvious implementation is `IntersectionObserver` with `once: true`. It has a
failure mode: IO callbacks are tied to the compositor and stop firing whenever the
page isn't being painted — a background tab, a print context, a non-displayed
webview. A one-shot reveal that never fires leaves its content stranded at
`opacity: 0`, permanently.

`useInViewport` uses `getBoundingClientRect` on a passive, rAF-throttled scroll
listener instead. Geometry is available whether or not the page is compositing, so
content cannot get trapped invisible. It unsubscribes itself once a `once` element
has been shown.

### Motion state is server-rendered, so there's a no-JS fallback

Framer Motion emits `style="opacity:0"` during SSR for anything with an entrance
animation, and the preloader only dismisses via script. With JavaScript disabled
that combination is a blank page. A `<noscript>` block hides the preloader and
forces entrance states visible — scoped so it never touches the scripted path.

### Chart colours were validated, not chosen by eye

Figures use `#6e56f8` and `#0ea5c4`. The site's own accent tints (`iris-400`,
`aqua-400`) were the natural pick and failed: ΔE 11.6 apart in normal vision —
below the readability floor — and outside the lightness band for a dark surface.
The pair in use passes lightness band, chroma floor, CVD separation (ΔE 16.8
deuteranopia) and contrast.

Every figure plots a number the underlying project actually reported. Projects with
no measured result get stat tiles or a structure diagram rather than an invented chart.

### No charting library, no Three.js

The figures are a handful of bars, cells and proportions — hand-built SVG, since a
charting dependency would render them no better. The background is a capped
canvas-2D field (≤84 particles, DPR capped at 1.5, paused when hidden, skipped on
touch and for reduced motion) rather than WebGL, which would add ~150KB to a page
whose point is being fast.

### Accessibility is enforced, not assumed

Every step of the type scale clears WCAG AA (4.5:1) against the page background —
the muted steps originally sat at 2.95:1 and were rebalanced. Verified on the
production build: zero contrast failures, one `h1` per page, no heading-level skips,
every control labelled, tap targets ≥24px, no horizontal overflow at 375/768/desktop.

Reduced motion is handled per primitive — each wrapper renders a static element —
rather than relying on a global CSS override, so `prefers-reduced-motion` yields a
calm, fully functional site instead of a broken one.

### Contact form is honest about being static

No backend, so the form validates input and hands off a pre-filled `mailto:` rather
than pretending to POST somewhere.

---

## Structure

```
src/
├─ app/                 8 static routes + /projects/[slug] case studies,
│                       per-page metadata, generated OG image and icons,
│                       sitemap, robots, manifest
├─ components/
│  ├─ background/       CSS aurora + canvas constellation
│  ├─ charts/           Hand-built SVG figures
│  ├─ layout/           Navbar, Footer, Preloader, ScrollProgress
│  ├─ providers/        Lenis smooth-scroll
│  ├─ sections/         One file per page section
│  └─ ui/               Reveal, Button, GlassCard, Magnetic, …
├─ hooks/               useInViewport, useFinePointer
└─ lib/                 content.ts — all copy; motion.ts; accents.ts
```

All copy lives in [`src/lib/content.ts`](src/lib/content.ts). Adding a project or a
skill is a data edit; no component changes.

---

## Deployment

Deploys on Vercel with zero configuration; every push to `main` redeploys.
`site.url` in `content.ts` drives the canonical tag, Open Graph tags, sitemap and
`robots.txt`.
