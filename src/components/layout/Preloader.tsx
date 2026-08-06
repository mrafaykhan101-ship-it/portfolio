"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

const SESSION_KEY = "rk-intro-played";

/**
 * First-load intro.
 *
 * Choreographed with a GSAP timeline — this is exactly the case GSAP is
 * better at than declarative variants: five elements, overlapping offsets,
 * one shared clock.
 *
 * Deliberately an *overlay*, not a gate: the page renders underneath from the
 * first frame, so the hero still counts as painted and LCP isn't pushed out by
 * the animation. It also plays once per session and is skipped entirely for
 * reduced-motion visitors.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const { setLocked } = useSmoothScroll();

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (reduce || seen) {
      setDone(true);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setLocked(true);
    // Start at the top; a restored scroll position under the overlay is
    // disorienting when it lifts.
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setLocked(false);
          setDone(true);
        },
      });

      tl.from(".intro-mark", { yPercent: 115, duration: 0.75, stagger: 0.06 })
        .from(".intro-rule", { scaleX: 0, duration: 0.6 }, "-=0.45")
        .from(".intro-meta", { opacity: 0, y: 10, duration: 0.5 }, "-=0.4")
        .to(
          progress,
          {
            value: 100,
            duration: 0.85,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(progress.value),
                ).padStart(3, "0");
              }
            },
          },
          "-=0.85",
        )
        .to(".intro-bar", { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, "<")
        .to(".intro-content", {
          opacity: 0,
          y: -18,
          filter: "blur(8px)",
          duration: 0.45,
          ease: "power2.in",
        })
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.15",
        );
    }, rootRef);

    return () => {
      ctx.revert();
      setLocked(false);
    };
  }, [setLocked]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ink-950"
    >
      <div className="intro-content flex flex-col items-center px-6">
        <div className="flex overflow-hidden" aria-hidden>
          {site.initials.split("").map((letter, i) => (
            <span
              key={i}
              className="intro-mark font-display text-[clamp(3.5rem,12vw,6rem)] leading-none text-mist-50"
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="intro-rule mt-7 h-px w-[min(20rem,70vw)] origin-left bg-mist-50/12">
          <div className="intro-bar h-full w-full origin-left scale-x-0 bg-linear-to-r from-iris-500 to-aqua-400" />
        </div>

        <div className="intro-meta mt-4 flex w-[min(20rem,70vw)] items-center justify-between font-mono text-[0.6875rem] tracking-[0.18em] text-mist-400 uppercase">
          <span>{site.shortName}</span>
          <span>
            <span ref={counterRef}>000</span>
            <span aria-hidden>%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
