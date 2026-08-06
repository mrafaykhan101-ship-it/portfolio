"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";
import { useInViewport } from "@/hooks/useInViewport";

type AnimatedTextProps = {
  text: string;
  className?: string;
  /** Per-word offset in seconds. */
  stagger?: number;
  delay?: number;
  /** Class applied to a marked segment — wrap it in `*asterisks*`. */
  highlightClassName?: string;
};

/**
 * Reveals a headline word by word, each word sliding up from behind a
 * clipping mask.
 *
 * The visible words are `aria-hidden` and the full string is exposed once via
 * a visually-hidden span, so assistive tech reads a sentence rather than a
 * list of fragments.
 */
export function AnimatedText({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  highlightClassName,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewport(ref, { margin: 40 });
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => {
          const marked = word.startsWith("*") && word.endsWith("*");
          return (
            <span key={i} className={marked ? highlightClassName : undefined}>
              {marked ? word.slice(1, -1) : word}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => {
          const marked = word.startsWith("*") && word.endsWith("*");
          const label = marked ? word.slice(1, -1) : word;
          return (
            <span
              key={`${word}-${i}`}
              // `pb`/`-mb` give descenders room inside the clip mask.
              className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
            >
              <motion.span
                className={cn("inline-block", marked && highlightClassName)}
                variants={{
                  hidden: { y: "115%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.85, ease: EASE_EXPO },
                  },
                }}
              >
                {label}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </span>
  );
}
