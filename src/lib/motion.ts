import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary.
 *
 * Two rules keep the site feeling like one product rather than a pile of
 * effects: everything decelerates on the same expo curve, and nothing
 * animates for longer than ~0.8s.
 */

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SWIFT = [0.32, 0.72, 0, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6,
};

/** Default entrance: rise, fade and resolve from a slight blur. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

/** Parent for lists — children inherit `visible` and offset themselves. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Shared viewport config so every section triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;
