"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";
import { useInViewport } from "@/hooks/useInViewport";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Travel distance in px. Positive rises from below. */
  y?: number;
  x?: number;
  duration?: number;
  as?: "div" | "li" | "span" | "p" | "article" | "section";
};

/**
 * Scroll-triggered entrance used by every section, so the whole page reveals
 * itself with one consistent motion.
 *
 * Reveal is driven by {@link useInViewport} (geometry, not IntersectionObserver)
 * and controlled through the `animate` prop rather than `whileInView`. That
 * makes it reliable in non-compositing contexts and gives deterministic
 * parent→child propagation for staggered lists.
 *
 * Reduced-motion visitors get the content immediately, with no transform or
 * blur.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.75,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewport(ref);
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y, x, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE_EXPO },
    },
  };

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
};

/** Parent for lists of `<StaggerItem>`s. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewport(ref);
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span" | "article" | "p";
};

/** Child of {@link Stagger}; inherits the parent's visible/hidden state. */
export function StaggerItem({
  children,
  className,
  y = 24,
  as = "div",
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE_EXPO },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
