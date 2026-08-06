"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/hooks/useFinePointer";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds the animated conic border on hover. */
  glow?: boolean;
  /** Adds a soft radial highlight that tracks the cursor. */
  spotlight?: boolean;
  /** Lifts the card on hover. */
  lift?: boolean;
  as?: "div" | "article" | "li";
};

/**
 * The site's default surface: frosted panel, hairline border, optional
 * cursor spotlight.
 *
 * The spotlight writes CSS custom properties straight to the node instead of
 * going through React state — pointer moves fire dozens of times a second and
 * a re-render per move would be visible.
 */
export function GlassCard({
  children,
  className,
  glow = true,
  spotlight = true,
  lift = true,
  as: Tag = "div",
}: GlassCardProps) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (!spotlight || !fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref as never}
      onPointerMove={handleMove}
      className={cn(
        "group/card glass relative isolate overflow-hidden rounded-3xl",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        lift &&
          "hover:-translate-y-1.5 hover:border-mist-50/16 motion-reduce:hover:translate-y-0",
        glow && "ring-glow",
        className,
      )}
    >
      {spotlight && fine && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0px), color-mix(in oklab, var(--color-iris-400) 16%, transparent), transparent 72%)",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
