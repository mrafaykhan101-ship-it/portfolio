import { Trophy } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { achievements, achievementsPipeline } from "@/lib/content";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title={
          <>
            The work, <span className="text-gradient">by the numbers</span>
          </>
        }
        lede="No trophies yet — but real, measured results. These are the numbers I'm proudest of from my project work, and the credentials I'm chasing next."
      />

      {/* Metric grid */}
      <Stagger
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.07}
      >
        {achievements.map((item) => {
          const accent = accentStyles[item.accent];
          return (
            <StaggerItem key={`${item.metric}-${item.label}`}>
              <GlassCard className="h-full p-6" spotlight>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-[2.25rem] leading-none font-semibold tracking-tight",
                      accent.text,
                    )}
                  >
                    {item.metric}
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] font-semibold text-mist-50">
                  {item.label}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-mono text-[0.6875rem] tracking-wide",
                    accent.text,
                  )}
                >
                  {item.context}
                </p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-mist-400">
                  {item.detail}
                </p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Pipeline */}
      <Reveal delay={0.1} className="mt-8">
        <GlassCard className="p-6 md:p-8" glow={false} spotlight={false}>
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-mint-500/12 text-mint-300 ring-1 ring-mint-500/20">
              <Trophy className="size-4" aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-mist-50">
              On the roadmap
            </h3>
          </div>

          <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {achievementsPipeline.map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <span className="font-mono text-sm text-mist-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[0.9375rem] font-medium text-mist-100">
                      {item.title}
                    </h4>
                    <span className="rounded-full border border-mist-50/10 bg-mist-50/4 px-2 py-0.5 text-[0.625rem] font-medium tracking-wide text-mist-400 uppercase">
                      {item.stage}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-mist-400">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
