import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Renders a fading hairline across the top of the band. */
  divider?: boolean;
};

/** Standard page band: consistent id anchor, gutter and vertical rhythm. */
export function Section({ id, children, className, divider = true }: SectionProps) {
  return (
    <section id={id} className={cn("relative section-y", className)}>
      {divider && (
        <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline" />
      )}
      <div className="shell">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + title + optional lede, animated as one unit. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border border-mist-50/10 bg-mist-50/4 px-3.5 py-1.5",
            "font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-mist-300 uppercase",
          )}
        >
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-linear-to-br from-iris-400 to-aqua-400"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08] font-semibold text-mist-50">
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "mt-5 text-[1.0625rem] leading-relaxed text-mist-300 md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
