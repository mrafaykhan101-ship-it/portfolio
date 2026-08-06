import { Briefcase, Compass, Target } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { experience, experienceSeeking } from "@/lib/content";

/**
 * Renders real roles when they exist; until then, an intentional "open to
 * work" state that reframes the absence of experience as a clear pitch rather
 * than a blank section.
 */
export function Experience() {
  const hasExperience = experience.length > 0;

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            The <span className="text-gradient">next chapter</span>
          </>
        }
        lede={
          hasExperience
            ? "Where I've worked and what I shipped."
            : experienceSeeking.body
        }
      />

      {hasExperience ? (
        <ExperienceTimeline />
      ) : (
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* What I bring */}
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-iris-500/12 text-iris-300 ring-1 ring-iris-500/20">
                <Briefcase className="size-4" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-mist-50">
                What I bring on day one
              </h3>
            </div>

            <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
              {experienceSeeking.offering.map((item) => (
                <StaggerItem key={item.title}>
                  <GlassCard className="h-full p-5" glow={false} spotlight={false}>
                    <h4 className="text-[0.9375rem] font-semibold text-mist-50">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-400">
                      {item.body}
                    </p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Where I'm aiming */}
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-6" spotlight>
              <div className="mb-5 flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-aqua-500/12 text-aqua-300 ring-1 ring-aqua-500/20">
                  <Target className="size-4" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-mist-50">
                  Where I&apos;m aiming
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {experienceSeeking.targets.map((target) => (
                  <li
                    key={target}
                    className="rounded-full border border-mist-50/10 bg-mist-50/4 px-3 py-1.5 text-[0.8125rem] font-medium text-mist-200"
                  >
                    {target}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-mint-500/20 bg-mint-500/6 p-4">
                <Compass className="mt-0.5 size-4 shrink-0 text-mint-300" aria-hidden />
                <p className="text-[0.8125rem] leading-relaxed text-mist-300">
                  Available for internships and part-time roles — remote, hybrid or
                  on-site in Karachi. Happy to start with a trial task.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      )}
    </Section>
  );
}

/** Rendered once real roles are added to `experience`. */
function ExperienceTimeline() {
  return (
    <ol className="mt-14 space-y-6">
      {experience.map((role) => (
        <li key={`${role.company}-${role.role}`}>
          <GlassCard className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-mist-50">{role.role}</h3>
              <span className="font-mono text-xs text-iris-300">{role.period}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-mist-300">{role.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist-400">{role.summary}</p>
            <ul className="mt-4 space-y-2">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-mist-300"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-iris-400" />
                  {point}
                </li>
              ))}
            </ul>
          </GlassCard>
        </li>
      ))}
    </ol>
  );
}
