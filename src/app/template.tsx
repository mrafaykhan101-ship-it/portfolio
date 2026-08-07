"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Page transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), so this
 * gives each route a short entrance instead of snapping into place — real
 * page loads that still feel continuous.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
