"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * `scaleX` on a spring keeps it smooth without re-rendering React on every
 * scroll event, and `transform-origin: left` means the whole thing is one
 * compositor-only property.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-90 h-[2px] origin-left bg-linear-to-r from-iris-500 via-iris-400 to-aqua-400 shadow-[0_0_16px_-2px_var(--color-iris-400)]"
    />
  );
}
