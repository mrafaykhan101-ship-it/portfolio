"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Reveal only the first time the element enters view. */
  once?: boolean;
  /** Pixels of the element that must be past the viewport edge to count. */
  margin?: number;
};

/**
 * Reports whether an element is within the viewport.
 *
 * Deliberately built on scroll events + `getBoundingClientRect` rather than
 * IntersectionObserver. IO callbacks are tied to the compositor and go silent
 * whenever the page isn't being painted (background tabs, print, headless and
 * non-displayed webviews) — which for a `once`-style reveal means content can
 * get trapped at `opacity: 0` forever. A geometry check has no such
 * dependency, so reveals stay reliable everywhere.
 *
 * It runs at most one bounding-rect read per scroll frame on a passive
 * listener, and unsubscribes itself as soon as a `once` element is shown.
 */
export function useInViewport(
  ref: RefObject<HTMLElement | null>,
  { once = true, margin = 80 }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let settled = false;
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Zero-size (not yet laid out) elements are treated as "not in view"
      // so we don't reveal something that hasn't been measured.
      const visible =
        rect.height > 0 && rect.top < vh - margin && rect.bottom > margin;

      if (visible) {
        setInView(true);
        if (once) {
          settled = true;
          teardown();
        }
      } else if (!once) {
        setInView(false);
      }
    };

    const onScroll = () => {
      if (ticking || settled) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    const teardown = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Check across the first few frames: initial layout, font swaps and
    // Lenis's first tick can all shift geometry after mount.
    evaluate();
    const raf = requestAnimationFrame(evaluate);
    const t = window.setTimeout(evaluate, 220);

    return () => {
      teardown();
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [ref, once, margin]);

  return inView;
}
