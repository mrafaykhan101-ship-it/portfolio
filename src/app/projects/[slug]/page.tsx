import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects, site } from "@/lib/content";
import { accentStyles } from "@/lib/accents";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import {
  CompareBars,
  DotMatrix,
  ProportionBar,
  StatTile,
  StepTimeline,
} from "@/components/charts/Charts";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.detail?.context ?? project.blurb,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.detail?.context ?? project.blurb,
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

/**
 * Per-slug figures.
 *
 * Only projects that reported a measurable result get a chart; the rest show
 * their structure. Nothing here is interpolated or estimated — every number
 * traces back to the project's own reported findings.
 */
function Figures({ slug }: { slug: string }) {
  if (slug === "mcb-stock-prediction") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <CompareBars
          title="Directional accuracy vs. a coin flip"
          a={{ label: "Model", value: 56.6, display: "56.6%" }}
          b={{ label: "Random baseline", value: 50, display: "50.0%" }}
          caption="Measured walk-forward on out-of-sample data, not on the training period."
        />
        <DotMatrix
          title="Quarterly performance"
          filled={13}
          total={15}
          filledLabel="Above baseline"
          emptyLabel="At or below"
          caption="Each cell is one quarter of walk-forward testing."
        />
      </div>
    );
  }

  if (slug === "financial-literacy-study") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <ProportionBar
          title="Saving behaviour explained by financial literacy"
          percent={46.2}
          partLabel="Explained (R² = 0.462)"
          restLabel="Unexplained"
          caption="Significant at p < 0.001, from a 15-item survey of 86 students."
        />
        <StepTimeline
          title="How the study was run"
          steps={[
            "Designed a 15-item instrument",
            "Fielded to 86 respondents",
            "Tested reliability (Cronbach's α)",
            "Ran correlation and regression in SPSS",
          ]}
        />
      </div>
    );
  }

  if (slug === "diminishing-musharakah") {
    return (
      <StepTimeline
        title="Structure of the financing"
        steps={[
          "Bank and client co-own the property as partners",
          "Client pays rent on the bank's share of the asset",
          "Client progressively buys out that share over seven years",
          "Bank's equity diminishes to zero; client owns the asset outright",
        ]}
        caption="The structure of a Diminishing Musharakah — how the modelled deal was designed, not a plot of the schedule figures."
      />
    );
  }

  if (slug === "school-db-design") {
    return (
      <StepTimeline
        title="Modules covered by the schema"
        steps={[
          "Attendance",
          "Library",
          "Fees",
          "Examinations",
          "Transportation",
          "Hostel management",
        ]}
        caption="Six operational modules, modelled across 22 related tables."
      />
    );
  }

  return null;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const accent = accentStyles[project.accent];
  const detail = project.detail;
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="section-y pt-28 md:pt-36">
      <div className="shell">
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-mist-400 transition-colors hover:text-mist-100"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            All projects
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mt-8 max-w-3xl">
          <Reveal delay={0.04}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium",
                  accent.softBg,
                  accent.text,
                  accent.border,
                )}
              >
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-500/30 bg-mint-500/12 px-2.5 py-1 text-[0.6875rem] font-medium text-mint-300">
                <Check className="size-3" aria-hidden />
                Completed
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.06] font-semibold text-mist-50">
              {project.title}
            </h1>
          </Reveal>

          {detail && (
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-mist-300">
                {detail.context}
              </p>
            </Reveal>
          )}
        </header>

        {/* Results */}
        {detail && (
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {detail.results.map((r) => (
              <StaggerItem key={r.label}>
                <StatTile value={r.value} label={r.label} note={r.note} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* Figures */}
        <Reveal delay={0.06} className="mt-4">
          <Figures slug={project.slug} />
        </Reveal>

        {/* Method + meta */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {detail && (
            <Reveal>
              <GlassCard className="h-full p-6 md:p-7" glow={false} spotlight={false}>
                <h2 className="text-lg font-semibold text-mist-50">Approach</h2>
                <ol className="mt-5 space-y-4">
                  {detail.approach.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="font-mono text-xs text-mist-500 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-mist-300">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                {detail.caveat && (
                  <div className="mt-7 rounded-2xl border border-mist-50/8 bg-mist-50/3 p-5">
                    <h3 className="text-[0.8125rem] font-semibold text-mist-200">
                      What this does and doesn&apos;t show
                    </h3>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-400">
                      {detail.caveat}
                    </p>
                  </div>
                )}
              </GlassCard>
            </Reveal>
          )}

          <Reveal delay={0.08}>
            <GlassCard className="h-full p-6 md:p-7" glow={false} spotlight={false}>
              <h2 className="text-lg font-semibold text-mist-50">Details</h2>

              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-mist-500 uppercase">
                    Built with
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-mist-50/8 bg-mist-50/4 px-2 py-1 font-mono text-[0.6875rem] text-mist-300"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>

                {detail && (
                  <div>
                    <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-mist-500 uppercase">
                      Methods
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {detail.methods.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-mist-50/8 bg-mist-50/4 px-2 py-1 text-[0.6875rem] text-mist-300"
                        >
                          {m}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 border-t border-mist-50/6 pt-5">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-mist-200 transition-colors hover:text-mist-50"
                  >
                    <GithubIcon className="size-4" />
                    View the code
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  <p className="text-[0.8125rem] leading-relaxed text-mist-500">
                    Code isn&apos;t public yet.{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-mist-300 underline decoration-mist-50/20 underline-offset-4 transition-colors hover:text-mist-50 hover:decoration-iris-400"
                    >
                      Ask me for a walkthrough
                    </Link>
                    .
                  </p>
                )}
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* Next project */}
        <Reveal delay={0.05} className="mt-12">
          <Link href={`/projects/${next.slug}`} className="block">
            <GlassCard className="group/next flex items-center justify-between gap-4 p-6">
              <div className="min-w-0">
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-mist-500 uppercase">
                  Next project
                </p>
                <p className="mt-1.5 truncate text-lg font-semibold text-mist-50">
                  {next.title}
                </p>
              </div>
              <ArrowUpRight
                className="size-5 shrink-0 text-mist-400 transition-transform duration-300 group-hover/next:translate-x-0.5 group-hover/next:-translate-y-0.5"
                aria-hidden
              />
            </GlassCard>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
