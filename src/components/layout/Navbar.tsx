"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { setLocked } = useSmoothScroll();
  const { scrollY } = useScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Threshold crossing only — this sets state a handful of times per session,
  // not on every scroll frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setLocked(open);
    // The panel mounts in the same commit, so the node already exists here.
    // Focusing directly (rather than deferring a frame) keeps focus management
    // working even when rAF is throttled — e.g. a backgrounded tab.
    if (open) closeRef.current?.focus();
  }, [open, setLocked]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);


  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-80 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "shell flex items-center justify-between gap-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "h-14 max-w-5xl glass-strong !px-3 sm:!px-4"
              : "h-16 border border-transparent",
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full py-1 pr-3 text-mist-50"
          >
            <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-xl bg-linear-to-br from-iris-500 to-iris-600 text-[0.6875rem] font-bold tracking-tight text-white shadow-[0_6px_20px_-8px_var(--color-iris-500)]">
              MR
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
              />
            </span>
            <span className="hidden text-[0.9375rem] font-semibold tracking-tight sm:block">
              Rafay Khan
            </span>
            <span className="sr-only sm:hidden">{site.name} — home</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === `/${link.id}`;
              return (
                <li key={link.id}>
                  <Link
                    href={`/${link.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-mist-50"
                        : "text-mist-300 hover:text-mist-50",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-mist-50/8 ring-1 ring-mist-50/10 ring-inset"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              magnetic={false}
              className="hidden sm:inline-flex"
              trailing={
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              }
            >
              Contact
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-mist-50/10 bg-mist-50/4 text-mist-100 transition-colors duration-300 hover:bg-mist-50/10 lg:hidden"
            >
              <Menu className="size-[18px]" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="fixed inset-0 z-95 flex flex-col bg-ink-950/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-20 items-center justify-between">
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-mist-400 uppercase">
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-mist-50/10 bg-mist-50/4 text-mist-100"
              >
                <X className="size-[18px]" aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pt-2">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.045,
                      duration: 0.5,
                      ease: EASE_EXPO,
                    }}
                    className="border-b border-mist-50/6"
                  >
                    <Link
                      href={`/${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === `/${link.id}` ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 text-2xl font-medium tracking-tight transition-colors",
                        pathname === `/${link.id}`
                          ? "text-iris-300"
                          : "text-mist-100 hover:text-mist-50",
                      )}
                    >
                      {link.label}
                      <span className="font-mono text-xs text-mist-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE_EXPO }}
                className="mt-8 pb-10"
              >
                <Button
                  href="/contact"
                  onClick={() => setOpen(false)}
                  size="lg"
                  magnetic={false}
                  className="w-full"
                  trailing={<ArrowUpRight className="size-4" />}
                >
                  Get in touch
                </Button>

                <div className="mt-6 flex items-center gap-2">
                  {[
                    { href: site.github, label: "GitHub", Icon: GithubIcon },
                    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                    { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-mist-50/10 bg-mist-50/4 text-mist-200 transition-colors hover:bg-mist-50/10 hover:text-mist-50"
                    >
                      <Icon className="size-[18px]" aria-hidden />
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
