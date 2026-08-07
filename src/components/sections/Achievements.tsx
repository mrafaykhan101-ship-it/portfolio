import { ArrowUpRight, BadgeCheck, Trophy } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { achievements, achievementsPipeline, certifications } from "@/lib/content";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function Achievements() {
  const headline = certifications.find((c) => c.headline);
  const courses = certifications.filter((c) => !c.headline);

  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title={
          <>
            The work, <span className="text-gradient">by the numbers</span>
          </>
        }
        lede="Measured outcomes and verified credentials. These are the results I'm proudest of from my project work, the certifications behind them, and what I'm working toward next."
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

      {/* Certifications — every entry links to a public verification page */}
      <Reveal delay={0.08} className="mt-8">
        <GlassCard className="p-6 md:p-8" glow={false} spotlight={false}>
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-aqua-500/12 text-aqua-300 ring-1 ring-aqua-500/20">
              <BadgeCheck className="size-4" aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-mist-50">
              Verified certifications
            </h3>
          </div>

          {headline && (
            <a
              href={headline.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cert mb-4 flex items-center gap-4 rounded-2xl border border-aqua-500/25 bg-aqua-500/6 p-5 transition-colors duration-300 hover:border-aqua-500/45 hover:bg-aqua-500/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-aqua-500/15 text-aqua-300 ring-1 ring-aqua-500/25">
                <BadgeCheck className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-semibold text-mist-50">
                  {headline.name}
                </span>
                <span className="mt-0.5 block text-xs text-mist-400">
                  {headline.issuer} · click to verify
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-aqua-300 transition-transform duration-300 group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5"
                aria-hidden
              />
            </a>
          )}

          <ul className="grid gap-2 sm:grid-cols-2">
            {courses.map((cert) => (
              <li key={cert.credentialUrl}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/c flex items-center gap-3 rounded-xl border border-mist-50/8 bg-mist-50/3 px-4 py-3 transition-colors duration-300 hover:border-mist-50/16 hover:bg-mist-50/6"
                >
                  <BadgeCheck
                    className="size-4 shrink-0 text-mist-500 transition-colors group-hover/c:text-aqua-300"
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-mist-200">
                    {cert.name}
                  </span>
                  <ArrowUpRight
                    className="size-3.5 shrink-0 text-mist-500 opacity-0 transition-all duration-300 group-hover/c:opacity-100"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

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
