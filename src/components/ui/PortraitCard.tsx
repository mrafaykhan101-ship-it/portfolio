"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { BarChart3, Code2, Landmark } from "lucide-react";
import { site } from "@/lib/content";
import { useFinePointer } from "@/hooks/useFinePointer";

const chips = [
  { label: "Python", Icon: Code2, className: "-left-4 top-[18%]", depth: 26 },
  { label: "FinTech", Icon: Landmark, className: "-right-5 top-[42%]", depth: 34 },
  { label: "Data", Icon: BarChart3, className: "left-2 bottom-[12%]", depth: 20 },
];

/**
 * Hero portrait.
 *
 * Renders `site.portrait` when a photo has been added; until then it shows a
 * designed monogram card rather than a grey box — an obviously-empty slot is
 * the fastest way to make a portfolio look unfinished.
 *
 * The tilt uses `gsap.quickTo`, which reuses one tween instance per property
 * instead of allocating a new tween on every pointer move.
 */
export function PortraitCard() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card || !fine || reduce) return;

    const ctx = gsap.context(() => {
      const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3" });
      const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3" });
      const chipSetters = gsap.utils
        .toArray<HTMLElement>(".portrait-chip")
        .map((el) => ({
          el,
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
          depth: Number(el.dataset.depth ?? 20),
        }));

      function onMove(event: PointerEvent) {
        const rect = scene!.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const clampedX = gsap.utils.clamp(-1, 1, dx);
        const clampedY = gsap.utils.clamp(-1, 1, dy);

        rotateY(clampedX * 9);
        rotateX(-clampedY * 7);
        for (const chip of chipSetters) {
          chip.x(clampedX * chip.depth);
          chip.y(clampedY * chip.depth * 0.55);
        }
      }

      function onLeave() {
        rotateY(0);
        rotateX(0);
        for (const chip of chipSetters) {
          chip.x(0);
          chip.y(0);
        }
      }

      scene!.addEventListener("pointermove", onMove);
      scene!.addEventListener("pointerleave", onLeave);

      return () => {
        scene!.removeEventListener("pointermove", onMove);
        scene!.removeEventListener("pointerleave", onLeave);
      };
    }, sceneRef);

    return () => ctx.revert();
  }, [fine, reduce]);

  return (
    <div
      ref={sceneRef}
      className="relative mx-auto w-full max-w-[22rem] lg:max-w-[26rem]"
      style={{ perspective: "1100px" }}
    >
      {/* Glow pad behind the card */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-full bg-iris-500/18 blur-[70px]"
      />

      <div
        ref={cardRef}
        className="glass relative aspect-4/5 overflow-hidden rounded-[2rem] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 26rem, 22rem"
            className="object-cover"
            priority
          />
        ) : (
          <div className="relative size-full">
            {/* Mesh */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,var(--color-iris-600)_0%,transparent_55%),radial-gradient(circle_at_80%_75%,var(--color-aqua-500)_0%,transparent_50%),radial-gradient(circle_at_50%_100%,var(--color-mint-500)_0%,transparent_45%)] opacity-30"
            />
            {/* Concentric rings */}
            <div aria-hidden className="absolute inset-0 grid place-items-center">
              {[0.45, 0.65, 0.85].map((scale, i) => (
                <div
                  key={scale}
                  className="absolute aspect-square rounded-full border border-mist-50/8"
                  style={{
                    width: `${scale * 100}%`,
                    animation: `float ${9 + i * 3}s var(--ease-soft) ${i * -2}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="relative flex size-full flex-col items-center justify-center gap-3">
              <span className="font-display text-[clamp(4rem,14vw,6.5rem)] leading-none text-gradient">
                {site.initials}
              </span>
              <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-mist-400 uppercase">
                {site.role}
              </span>
            </div>
          </div>
        )}

        {/* Bottom caption bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-mist-50/10 bg-ink-950/60 px-4 py-3 backdrop-blur-md">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-mist-50">{site.name}</p>
            <p className="truncate text-xs text-mist-400">{site.location}</p>
          </div>
          <span className="relative flex size-2.5 shrink-0">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-mint-400" />
            <span className="relative inline-flex size-2.5 rounded-full bg-mint-400" />
          </span>
        </div>
      </div>

      {/* Floating capability chips */}
      {chips.map(({ label, Icon, className, depth }) => (
        <div
          key={label}
          data-depth={depth}
          aria-hidden
          className={`portrait-chip absolute hidden items-center gap-2 rounded-full border border-mist-50/12 bg-ink-850/80 px-3.5 py-2 text-xs font-medium text-mist-100 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:flex ${className}`}
        >
          <Icon className="size-3.5 text-iris-300" />
          {label}
        </div>
      ))}
    </div>
  );
}
