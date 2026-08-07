import { cn } from "@/lib/utils";

/**
 * Small, purpose-built SVG figures.
 *
 * Deliberately hand-built rather than pulled from a charting library: each one
 * renders a single reported number, so a 40KB dependency would buy nothing.
 *
 * Every figure here plots a figure that was actually measured. Where a project
 * reported no numeric result, it gets stat tiles instead of an invented chart.
 *
 * Colour comes from --color-chart-1/2, which pass the palette checks (lightness
 * band, chroma floor, CVD and normal-vision separation, contrast) against the
 * dark chart surface. Values and labels wear text tokens, never the mark colour.
 */

/* ------------------------------------------------------------- stat tile */

export function StatTile({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-mist-50/8 bg-mist-50/3 p-4">
      <p className="text-2xl leading-none font-semibold tracking-tight text-mist-50 tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-[0.8125rem] font-medium text-mist-200">{label}</p>
      {note && <p className="mt-0.5 text-xs leading-snug text-mist-500">{note}</p>}
    </div>
  );
}

/* --------------------------------------------------- two-bar comparison */

type CompareProps = {
  title: string;
  caption?: string;
  a: { label: string; value: number; display: string };
  b: { label: string; value: number; display: string };
  /** Upper bound of the axis. */
  max?: number;
};

/**
 * Compares a measured result against its baseline. Two bars, one axis, direct
 * labels on both — no legend needed because each bar is labelled in place.
 */
export function CompareBars({ title, caption, a, b, max = 100 }: CompareProps) {
  const rows = [
    { ...a, fill: "var(--color-chart-1)", primary: true },
    { ...b, fill: "var(--color-chart-track)", primary: false },
  ];

  return (
    <figure className="rounded-2xl border border-mist-50/8 bg-mist-50/3 p-5">
      <figcaption className="text-[0.8125rem] font-medium text-mist-200">
        {title}
      </figcaption>

      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  "text-xs",
                  row.primary ? "text-mist-200" : "text-mist-400",
                )}
              >
                {row.label}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  row.primary ? "text-mist-50" : "text-mist-400",
                )}
              >
                {row.display}
              </span>
            </div>
            {/* 6px track, 3px radius on the data end, anchored at the baseline */}
            <div className="h-1.5 overflow-hidden rounded-full bg-mist-50/6">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(row.value / max) * 100}%`,
                  backgroundColor: row.fill,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {caption && <p className="mt-4 text-xs leading-relaxed text-mist-500">{caption}</p>}
    </figure>
  );
}

/* ------------------------------------------------------- dot matrix (n of m) */

/**
 * Exact counts as discrete cells — 13 of 15 quarters reads instantly and, unlike
 * a percentage bar, doesn't imply precision the underlying count doesn't have.
 */
export function DotMatrix({
  title,
  filled,
  total,
  caption,
  filledLabel,
  emptyLabel,
}: {
  title: string;
  filled: number;
  total: number;
  caption?: string;
  filledLabel: string;
  emptyLabel: string;
}) {
  return (
    <figure className="rounded-2xl border border-mist-50/8 bg-mist-50/3 p-5">
      <figcaption className="text-[0.8125rem] font-medium text-mist-200">
        {title}
      </figcaption>

      <div
        className="mt-4 flex flex-wrap gap-1.5"
        role="img"
        aria-label={`${filled} of ${total} ${filledLabel}`}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="size-5 rounded-[4px]"
            style={{
              backgroundColor:
                i < filled ? "var(--color-chart-1)" : "var(--color-chart-track)",
            }}
          />
        ))}
      </div>

      {/* Legend: two categories, so identity is never colour-alone */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-xs text-mist-300">
          <span
            className="size-2.5 rounded-[3px]"
            style={{ backgroundColor: "var(--color-chart-1)" }}
          />
          {filledLabel} ({filled})
        </span>
        <span className="flex items-center gap-2 text-xs text-mist-400">
          <span
            className="size-2.5 rounded-[3px]"
            style={{ backgroundColor: "var(--color-chart-track)" }}
          />
          {emptyLabel} ({total - filled})
        </span>
      </div>

      {caption && <p className="mt-3 text-xs leading-relaxed text-mist-500">{caption}</p>}
    </figure>
  );
}

/* ----------------------------------------------------------- proportion */

/**
 * A single share of a whole (e.g. variance explained). One segment plus its
 * remainder, with a 2px gap so the two fills never touch.
 */
export function ProportionBar({
  title,
  percent,
  partLabel,
  restLabel,
  caption,
}: {
  title: string;
  percent: number;
  partLabel: string;
  restLabel: string;
  caption?: string;
}) {
  return (
    <figure className="rounded-2xl border border-mist-50/8 bg-mist-50/3 p-5">
      <figcaption className="text-[0.8125rem] font-medium text-mist-200">
        {title}
      </figcaption>

      <p className="mt-3 text-3xl leading-none font-semibold tracking-tight text-mist-50 tabular-nums">
        {percent}%
      </p>

      <div
        className="mt-4 flex h-2.5 gap-0.5 overflow-hidden rounded-full"
        role="img"
        aria-label={`${percent}% ${partLabel}, ${100 - percent}% ${restLabel}`}
      >
        <div
          className="rounded-l-full"
          style={{ width: `${percent}%`, backgroundColor: "var(--color-chart-1)" }}
        />
        <div
          className="flex-1 rounded-r-full"
          style={{ backgroundColor: "var(--color-chart-track)" }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-xs text-mist-300">
          <span
            className="size-2.5 rounded-[3px]"
            style={{ backgroundColor: "var(--color-chart-1)" }}
          />
          {partLabel}
        </span>
        <span className="flex items-center gap-2 text-xs text-mist-400">
          <span
            className="size-2.5 rounded-[3px]"
            style={{ backgroundColor: "var(--color-chart-track)" }}
          />
          {restLabel}
        </span>
      </div>

      {caption && <p className="mt-3 text-xs leading-relaxed text-mist-500">{caption}</p>}
    </figure>
  );
}

/* -------------------------------------------------------------- timeline */

/** Ordered stages — structure, not measured data. */
export function StepTimeline({
  title,
  steps,
  caption,
}: {
  title: string;
  steps: string[];
  caption?: string;
}) {
  return (
    <figure className="rounded-2xl border border-mist-50/8 bg-mist-50/3 p-5">
      <figcaption className="text-[0.8125rem] font-medium text-mist-200">
        {title}
      </figcaption>

      <ol className="mt-4 space-y-2.5">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[0.625rem] font-semibold text-white tabular-nums"
              style={{ backgroundColor: "var(--color-chart-1)" }}
            >
              {i + 1}
            </span>
            <span className="text-[0.8125rem] leading-snug text-mist-300">{step}</span>
          </li>
        ))}
      </ol>

      {caption && <p className="mt-4 text-xs leading-relaxed text-mist-500">{caption}</p>}
    </figure>
  );
}
