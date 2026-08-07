"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { skillGroups, type SkillTier } from "@/lib/content";
import { accentStyles } from "@/lib/accents";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Tier badge.
 *
 * Three honest levels instead of a percentage bar: the numbers on a typical
 * "skills" bar are unverifiable, and the bars themselves are the clearest
 * tell of a template portfolio.
 */
const tierStyles: Record<SkillTier, string> = {
  Core: "bg-mint-500/12 text-mint-300 ring-mint-500/25",
  Strong: "bg-iris-500/12 text-iris-300 ring-iris-500/25",
  Working: "bg-mist-50/6 text-mist-300 ring-mist-50/12",
};

export function Skills() {
  const [activeId, setActiveId] = useState<string>(skillGroups[0].id);
  const reduce = useReducedMotion();
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title={
          <>
            A toolkit split across <span className="text-gradient">three fronts</span>
          </>
        }
        lede="Not a wall of logos. These are the technical, financial and human skills I actually reach for — each one tied to the work that backs it up."
      />

      {/* Category selector */}
      <Reveal delay={0.05} className="mt-12">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex flex-wrap gap-2"
        >
          {skillGroups.map((group) => {
            const isActive = group.id === activeId;
            return (
              <button
                key={group.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`skills-panel-${group.id}`}
                id={`skills-tab-${group.id}`}
                onClick={() => setActiveId(group.id)}
                className={cn(
                  "relative min-h-10 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-mist-50" : "text-mist-300 hover:text-mist-100",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-mist-50/8 ring-1 ring-mist-50/12 ring-inset"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", accentStyles[group.accent].bg)}
                  />
                  {group.label}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Active panel */}
      <div
        role="tabpanel"
        id={`skills-panel-${active.id}`}
        aria-labelledby={`skills-tab-${active.id}`}
        className="mt-8"
      >
        <motion.div
          key={active.id}
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
        >
          <p className="mb-6 text-sm text-mist-400">{active.blurb}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={reduce ? undefined : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.06,
                  ease: EASE_EXPO,
                }}
              >
                <GlassCard className="h-full p-5" glow={false} spotlight={false}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[0.9375rem] font-semibold text-mist-50">
                      {skill.name}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide uppercase ring-1 ring-inset",
                        tierStyles[skill.tier],
                      )}
                    >
                      {skill.tier}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-mist-400">
                    {skill.note}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Legend — makes the tiers mean something concrete */}
          <p className="mt-6 text-xs leading-relaxed text-mist-500">
            <span className="font-semibold text-mist-400">Core</span> — used daily
            across multiple projects. <span className="font-semibold text-mist-400">Strong</span>{" "}
            — applied end-to-end in real project work.{" "}
            <span className="font-semibold text-mist-400">Working</span> — comfortable,
            and actively deepening.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
