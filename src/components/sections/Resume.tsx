import { ArrowRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content";

const sheet = [
  { label: "Machine learning", value: "Random Forest · Regression · KNN" },
  { label: "Languages & tools", value: "Python · SQL · SPSS · Excel" },
  { label: "Focus", value: "FinTech · Insurtech · Data" },
];

/**
 * Resume band — a single, confident call to download the real PDF, with a
 * quick-glance summary so the visitor knows what's inside before they open it.
 */
export function Resume() {
  return (
    <section id="resume" className="relative section-y">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline" />
      <div className="shell">
        <Reveal>
          <div className="ring-glow relative overflow-hidden rounded-4xl">
            <div className="glass-strong relative grid items-center gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
              {/* Ambient glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-iris-500/20 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-mist-50/10 bg-mist-50/4 px-3 py-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-mist-300 uppercase">
                  <FileText className="size-3.5" aria-hidden />
                  Résumé
                </span>

                <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-tight font-semibold text-mist-50">
                  Everything on one page,
                  <br className="hidden sm:block" /> ready when you are.
                </h2>

                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-mist-300">
                  Projects, skills and education in a clean, recruiter-friendly PDF.
                  Take it with you, or reach out and let&apos;s talk.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    href={site.resumePath}
                    size="lg"
                    download
                    leading={<Download className="size-[18px]" aria-hidden />}
                  >
                    Download résumé
                  </Button>
                  <Button
                    href="#contact"
                    variant="ghost"
                    size="lg"
                    trailing={<ArrowRight className="size-4" aria-hidden />}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>

              {/* At-a-glance card */}
              <div className="relative">
                <div className="rounded-2xl border border-mist-50/10 bg-ink-950/50 p-6 backdrop-blur-sm">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-mist-500 uppercase">
                    At a glance
                  </p>
                  <dl className="mt-4 space-y-4">
                    {sheet.map((row) => (
                      <div
                        key={row.label}
                        className="border-b border-mist-50/6 pb-4 last:border-0 last:pb-0"
                      >
                        <dt className="text-xs text-mist-500">{row.label}</dt>
                        <dd className="mt-1 text-sm font-medium text-mist-100">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
