"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { heroLede, heroRoles, heroStats, site } from "@/lib/content";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { PortraitCard } from "@/components/ui/PortraitCard";
import { RotatingText } from "@/components/ui/RotatingText";
import { EASE_EXPO } from "@/lib/motion";

/** Entrance is on mount, not on scroll — the hero is above the fold. */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: EASE_EXPO },
});

export function Hero() {
  const reduce = useReducedMotion();
  const anim = reduce ? () => ({}) : enter;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center pt-32 pb-28 lg:pt-28"
    >
      <div className="shell grid w-full items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        {/* ------------------------------------------------------ copy */}
        <div className="max-w-2xl">
          <motion.div {...anim(0.05)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-mint-500/25 bg-mint-500/8 py-1.5 pr-4 pl-3 text-[0.8125rem] font-medium text-mint-300">
              <span className="relative flex size-2">
                <span
                  aria-hidden
                  className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-mint-400"
                />
                <span className="relative inline-flex size-2 rounded-full bg-mint-400" />
              </span>
              {site.availability}
            </span>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.75rem,7.2vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
            <AnimatedText
              text="Muhammad"
              className="block text-mist-50"
              delay={0.15}
            />
            <AnimatedText
              text="Rafay Khan"
              className="block text-gradient"
              delay={0.28}
            />
          </h1>

          <motion.p
            {...anim(0.5)}
            className="mt-6 flex flex-wrap items-baseline gap-x-3 font-mono text-[0.9375rem] tracking-tight text-mist-300 sm:text-base"
          >
            <span aria-hidden className="text-iris-400">
              &gt;
            </span>
            <RotatingText items={heroRoles} className="text-mist-100" />
            <span
              aria-hidden
              className="inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-caret bg-aqua-400"
            />
          </motion.p>

          <motion.p
            {...anim(0.6)}
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-mist-300 md:text-lg"
          >
            {heroLede}
          </motion.p>

          <motion.div {...anim(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              href="/projects"
              size="lg"
              trailing={
                <ArrowUpRight
                  className="size-[18px] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  aria-hidden
                />
              }
            >
              View my work
            </Button>

            <Button
              href={site.resumePath}
              variant="secondary"
              size="lg"
              download
              leading={<FileText className="size-[18px]" aria-hidden />}
            >
              Résumé
            </Button>

            <div className="ml-1 flex items-center gap-2">
              {[
                { href: site.github, label: "GitHub profile", Icon: GithubIcon },
                { href: site.linkedin, label: "LinkedIn profile", Icon: LinkedinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-mist-50/10 bg-mist-50/4 text-mist-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-mist-50/20 hover:bg-mist-50/10 hover:text-mist-50 motion-reduce:hover:translate-y-0"
                >
                  <Icon className="size-[18px]" aria-hidden />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.dl
            {...anim(0.82)}
            className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-mist-50/8 bg-mist-50/6"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-ink-950/70 px-4 py-5 backdrop-blur-sm">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight text-mist-50">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] font-medium text-mist-200">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-mist-500">
                    {stat.detail}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* --------------------------------------------------- portrait */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE_EXPO }}
          className="order-first lg:order-none"
        >
          <PortraitCard />
        </motion.div>
      </div>

      {/* ------------------------------------------------- scroll cue */}
      <motion.a
        href="#explore"
        aria-label="Scroll to explore the site"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="group absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-2.5 text-mist-500 transition-colors hover:text-mist-200 md:flex"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase">
          Scroll
        </span>
        <span className="relative h-11 w-px overflow-hidden bg-mist-50/12">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-linear-to-b from-transparent to-iris-400"
            animate={reduce ? undefined : { y: ["-100%", "280%"] }}
            transition={{ duration: 1.9, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
        <ArrowDown
          className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden
        />
      </motion.a>
    </section>
  );
}
