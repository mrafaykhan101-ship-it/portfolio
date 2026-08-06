import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { goals } from "@/lib/content";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function Goals() {
  return (
    <Section id="goals">
      <SectionHeading
        eyebrow={goals.eyebrow}
        title={
          <>
            Where this is <span className="text-gradient">going</span>
          </>
        }
        lede={goals.intro}
      />

      <Stagger className="mt-14 grid gap-4 md:grid-cols-2" gap={0.09}>
        {goals.milestones.map((milestone, i) => {
          const accent = accentStyles[milestone.accent];
          return (
            <StaggerItem key={milestone.title}>
              <GlassCard className="group/goal h-full p-6 md:p-7" spotlight>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium tracking-wide",
                      accent.softBg,
                      accent.text,
                      accent.border,
                    )}
                  >
                    {milestone.horizon}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "font-mono text-2xl font-semibold tabular-nums opacity-25 transition-opacity duration-300 group-hover/goal:opacity-60",
                      accent.text,
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-mist-50">
                  {milestone.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">
                  {milestone.body}
                </p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
