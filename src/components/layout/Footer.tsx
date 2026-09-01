import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navLinks, site } from "@/lib/content";

const socials = [
  { href: site.github, label: "GitHub", Icon: GithubIcon },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div aria-hidden className="h-px hairline" />

      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 text-mist-50">
              <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-iris-500 to-iris-600 text-xs font-bold text-white">
                MR
              </span>
              <span className="text-base font-semibold tracking-tight">
                {site.name}
              </span>
            </Link>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-mist-400">
              {site.tagline} Financial Technology undergraduate in Karachi, working
              across machine learning, statistical research and financial modelling.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-mist-400">
              <MapPin className="size-4 shrink-0 text-mist-500" aria-hidden />
              {site.location}
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-mist-500 uppercase">
              Navigate
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/${link.id}`}
                    // py keeps the tap target >=24px tall (WCAG 2.2 AA 2.5.8)
                    className="inline-block py-1 text-sm text-mist-300 transition-colors duration-300 hover:text-mist-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reach */}
          <div>
            <h2 className="font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-mist-500 uppercase">
              Elsewhere
            </h2>
            <ul className="mt-5 space-y-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 py-1 text-sm text-mist-300 transition-colors duration-300 hover:text-mist-50"
                  >
                    <Icon className="size-4 text-mist-500 transition-colors group-hover:text-iris-300" aria-hidden />
                    {label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block py-1 text-sm text-mist-300 underline decoration-mist-50/20 underline-offset-4 transition-colors hover:text-mist-50 hover:decoration-iris-400"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-mist-50/6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-mist-500 uppercase">
            Designed &amp; built with Next.js, TypeScript &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
