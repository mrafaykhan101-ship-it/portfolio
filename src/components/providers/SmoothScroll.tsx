"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SmoothScrollValue = {
  /** Scroll to an element id ("#about" or "about") or an absolute offset. */
  scrollTo: (target: string | number, offset?: number) => void;
  /** Freeze scrolling — used by the preloader and the mobile menu. */
  setLocked: (locked: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollValue>({
  scrollTo: () => {},
  setLocked: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/** Pixels of breathing room below the fixed navbar when jumping to a section. */
const NAV_OFFSET = -88;

/**
 * Lenis-powered smooth scrolling.
 *
 * Two things make this behave rather than fight the browser:
 *
 * 1. Reduced-motion visitors never get a Lenis instance at all — they keep
 *    native scrolling, and `scrollTo` falls back to an instant jump.
 * 2. In-page anchors are handled by one delegated listener instead of each
 *    link wiring itself up, so `<a href="#projects">` anywhere on the page
 *    just works and still behaves like a real link (URL updates, focus moves,
 *    modifier-clicks and middle-clicks are left alone).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Expo-out: fast start, long settle. Matches the CSS easing tokens.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scrolling on mobile — smoothing it feels laggy and
      // breaks the platform's momentum behaviour.
      syncTouch: false,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setReady(true);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number, offset = NAV_OFFSET) => {
    const lenis = lenisRef.current;
    if (typeof target === "number") {
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else window.scrollTo({ top: target });
      return;
    }

    const id = target.startsWith("#") ? target.slice(1) : target;
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.25 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top });
    }

    // Move keyboard focus with the viewport, otherwise the next Tab press
    // jumps back to wherever the user physically was.
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (locked) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  // Delegated in-page anchor handling.
  useEffect(() => {
    if (!ready) return;

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      if (anchor.target && anchor.target !== "_self") return;

      const el = document.getElementById(href.slice(1));
      if (!el) return;

      event.preventDefault();
      scrollTo(href);
      history.replaceState(null, "", href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [ready, scrollTo]);

  // Honour a hash present on first load, once layout has settled.
  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const id = window.location.hash;
    const timer = window.setTimeout(() => scrollTo(id), 350);
    return () => window.clearTimeout(timer);
  }, [ready, scrollTo]);

  const value = useMemo(() => ({ scrollTo, setLocked }), [scrollTo, setLocked]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
