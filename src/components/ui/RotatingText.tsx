"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  items: readonly string[];
  className?: string;
  /** Milliseconds each item stays on screen. */
  interval?: number;
};

/**
 * Cycles through phrases in place.
 *
 * The container reserves the width of the longest phrase with an invisible
 * sizer, so surrounding layout never shifts as items swap — a rotating
 * headline that nudges the paragraph below it on every tick looks cheap and
 * costs CLS.
 */
export function RotatingText({
  items,
  className,
  interval = 2600,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [items.length, interval, reduce]);

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      {/* Invisible sizer: locks the box to the widest phrase. */}
      <span aria-hidden className="col-start-1 row-start-1 invisible whitespace-nowrap">
        {items.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>

      <span className="col-start-1 row-start-1 overflow-hidden">
        <span className="sr-only">{items[index]}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={items[index]}
            aria-hidden
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_EXPO }}
            className="block whitespace-nowrap"
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
