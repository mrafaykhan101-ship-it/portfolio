/**
 * Tailwind can't build class names at runtime, so accent variants are
 * enumerated here. Every component that takes an `accent` prop reads from
 * this table, which keeps the three accent colours consistent site-wide.
 */
export type Accent = "iris" | "aqua" | "mint";

export const accentStyles: Record<
  Accent,
  {
    text: string;
    bg: string;
    softBg: string;
    border: string;
    ring: string;
    glow: string;
    gradient: string;
    shadow: string;
  }
> = {
  iris: {
    text: "text-iris-300",
    bg: "bg-iris-500",
    softBg: "bg-iris-500/10",
    border: "border-iris-500/30",
    ring: "ring-iris-500/40",
    glow: "bg-iris-500/25",
    gradient: "from-iris-500 to-iris-400",
    shadow: "shadow-[0_0_40px_-12px_var(--color-iris-500)]",
  },
  aqua: {
    text: "text-aqua-300",
    bg: "bg-aqua-500",
    softBg: "bg-aqua-500/10",
    border: "border-aqua-500/30",
    ring: "ring-aqua-500/40",
    glow: "bg-aqua-500/25",
    gradient: "from-aqua-500 to-aqua-400",
    shadow: "shadow-[0_0_40px_-12px_var(--color-aqua-500)]",
  },
  mint: {
    text: "text-mint-300",
    bg: "bg-mint-500",
    softBg: "bg-mint-500/10",
    border: "border-mint-500/30",
    ring: "ring-mint-500/40",
    glow: "bg-mint-500/25",
    gradient: "from-mint-500 to-mint-400",
    shadow: "shadow-[0_0_40px_-12px_var(--color-mint-500)]",
  },
};
