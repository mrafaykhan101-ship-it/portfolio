import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Marquee } from "@/components/ui/Marquee";
import { about, skillMarquee } from "@/lib/content";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left rail — sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-mist-50/10 bg-mist-50/4 px-3.5 py-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-mist-300 uppercase">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-linear-to-br from-iris-400 to-aqua-400"
              />
              {about.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.1] font-semibold text-mist-50">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 hidden lg:block">
              <div className="h-px w-16 hairline" />
              <p className="mt-6 max-w-xs font-mono text-[0.8125rem] leading-relaxed text-mist-500">
                Two disciplines, one toolkit — the reason I chose this degree
                and the reason I think it matters.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right — narrative + highlight cards */}
        <div>
          <Stagger className="space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <StaggerItem
                key={i}
                as="p"
                className="text-[1.0625rem] leading-relaxed text-mist-300 md:text-lg"
              >
                {paragraph}
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger
            className="mt-12 grid gap-4 sm:grid-cols-2"
            gap={0.09}
            delay={0.1}
          >
            {about.highlights.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard className="h-full p-6" glow={false}>
                  <h3 className="flex items-center gap-2.5 text-base font-semibold text-mist-50">
                    <span
                      aria-hidden
                      className="grid size-6 place-items-center rounded-lg bg-iris-500/12 text-iris-300 ring-1 ring-iris-500/20"
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-400">
                    {item.body}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Skills ticker — a quiet transition into the detail below */}
      <Reveal delay={0.1} className="mt-16">
        <div className="glass rounded-2xl py-5">
          <Marquee items={skillMarquee} duration={46} />
        </div>
      </Reveal>
    </Section>
  );
}
