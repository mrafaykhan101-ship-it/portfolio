import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Seconds for one full loop. Higher is slower. */
  duration?: number;
  separator?: ReactNode;
};

/**
 * Infinite horizontal ticker.
 *
 * The track is duplicated and translated -50%, so the second copy is exactly
 * where the first started when the loop restarts. The duplicate is hidden from
 * assistive tech to avoid reading every item twice.
 */
export function Marquee({ items, className, duration = 42, separator }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10">
          <span className="text-sm font-medium tracking-tight whitespace-nowrap text-mist-300">
            {item}
          </span>
          <span aria-hidden className="text-mist-500">
            {separator ?? "•"}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s` }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
