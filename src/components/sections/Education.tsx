"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { education } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Vertical timeline whose spine "draws" itself as it scrolls into view and
 * whose nodes light up in sequence.
 *
 * GSAP ScrollTrigger is the right tool here specifically because the progress
 * of one element (the fill line) has to be tied to scroll position — that's
 * scrubbing, which Framer's whileInView can't express.
 */
export function Education() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Spine draws from 0 → full height, scrubbed to scroll.
      gsap.fromTo(
        ".edu-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".edu-timeline",
            start: "top 78%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );

      // Each node pops when its row reaches the trigger band.
      gsap.utils.toArray<HTMLElement>(".edu-node").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: node, start: "top 82%" },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title={
          <>
            The foundation this is <span className="text-gradient">built on</span>
          </>
        }
        lede="A deliberately hybrid path — from a science and pre-engineering grounding into a degree designed for where finance and software meet."
      />

      <div ref={rootRef} className="mt-16">
        <div className="edu-timeline relative">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.30rem] w-px bg-mist-50/10 md:left-1/2 md:-translate-x-1/2"
          >
            <div className="edu-line-fill absolute inset-0 origin-top bg-linear-to-b from-iris-500 via-aqua-400 to-mint-400" />
          </div>

          <ol className="space-y-10 md:space-y-16">
            {education.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={entry.id}
                  className="relative grid md:grid-cols-2 md:gap-x-14"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "edu-node absolute top-1 left-[1.30rem] z-10 grid size-7 -translate-x-1/2 place-items-center rounded-full ring-4 ring-ink-950 md:left-1/2",
                      entry.status === "current"
                        ? "bg-linear-to-br from-iris-500 to-aqua-400"
                        : "bg-ink-700",
                    )}
                  >
                    {entry.status === "current" ? (
                      <Sparkles className="size-3.5 text-white" />
                    ) : (
                      <GraduationCap className="size-3.5 text-mist-300" />
                    )}
                    {entry.status === "current" && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-iris-400/60" />
                    )}
                  </span>

                  {/* Card — alternates sides on desktop */}
                  <div
                    className={cn(
                      "pl-14 md:pl-0",
                      left
                        ? "md:col-start-1 md:pr-2 md:text-right"
                        : "md:col-start-2 md:pl-2",
                    )}
                  >
                    <GlassCard
                      className="p-6"
                      glow={entry.status === "current"}
                      spotlight={false}
                    >
                      {entry.status === "current" && (
                        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-mint-500/12 px-2.5 py-1 text-[0.6875rem] font-medium text-mint-300 ring-1 ring-mint-500/20 md:float-none">
                          <span className="size-1.5 rounded-full bg-mint-400" />
                          In progress
                        </span>
                      )}

                      <p className="font-mono text-xs tracking-wide text-iris-300">
                        {entry.period}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-mist-50">
                        {entry.qualification}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-mist-300">
                        {entry.institution}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-mist-400">
                        {entry.summary}
                      </p>

                      <ul
                        className={cn(
                          "mt-4 flex flex-wrap gap-1.5",
                          left && "md:justify-end",
                        )}
                      >
                        {entry.focus.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-full border border-mist-50/8 bg-mist-50/4 px-2.5 py-1 text-[0.6875rem] font-medium text-mist-300"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
