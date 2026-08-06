"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max px the element drifts toward the cursor. */
  strength?: number;
  /** Extra drift applied to the inner content for a subtle parallax. */
  innerStrength?: number;
};

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 *
 * Deliberately restrained — 12px of travel reads as "responsive"; 40px reads
 * as a gimmick and makes buttons hard to hit.
 */
export function Magnetic({
  children,
  className,
  strength = 12,
  innerStrength = 5,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const config = { stiffness: 220, damping: 18, mass: 0.5 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);
  const innerSpringX = useSpring(innerX, config);
  const innerSpringY = useSpring(innerY, config);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // -1..1 relative to the element's centre
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    innerX.set(dx * innerStrength);
    innerY.set(dy * innerStrength);
  }

  function reset() {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  }

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      // A cancelled pointer (scroll, tab-out) never fires `leave`.
      onPointerCancel={reset}
    >
      <motion.div style={{ x: innerSpringX, y: innerSpringY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
