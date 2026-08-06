"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] " +
  "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-45 select-none";

const variants: Record<Variant, string> = {
  primary:
    "overflow-hidden bg-linear-to-r from-iris-500 to-iris-600 text-white " +
    "shadow-[0_10px_36px_-12px_var(--color-iris-500)] " +
    "hover:shadow-[0_16px_48px_-10px_var(--color-iris-500)] hover:brightness-110",
  secondary:
    "glass text-mist-100 hover:bg-mist-50/10 hover:border-mist-50/20 " +
    "hover:shadow-[0_16px_44px_-20px_rgba(0,0,0,0.9)]",
  ghost:
    "text-mist-300 hover:text-mist-50 hover:bg-mist-50/6 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Wrap in a magnetic container. Off for dense UI like filter chips. */
  magnetic?: boolean;
  /** Rendered after the label — usually an arrow that shifts on hover. */
  trailing?: ReactNode;
  /** Rendered before the label. */
  leading?: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentProps<"button">, "children" | "className"> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<ComponentProps<"a">, "children" | "className" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * One button, three weights. Renders an `<a>` when given `href` (with
 * `target`/`rel` filled in automatically for external URLs) and a `<button>`
 * otherwise, so the semantics always match the behaviour.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    magnetic = true,
    trailing,
    leading,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {/* Sheen sweep — primary only, and purely decorative. */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-full motion-reduce:hidden"
        />
      )}
      {leading}
      <span className="relative">{children}</span>
      {trailing}
    </>
  );

  const element =
    "href" in props && props.href !== undefined ? (
      isExternal(props.href) ? (
        <a
          {...(rest as ComponentProps<"a">)}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      ) : (
        <Link
          {...(rest as Omit<ComponentProps<"a">, "href">)}
          href={props.href}
          className={classes}
        >
          {inner}
        </Link>
      )
    ) : (
      <button {...(rest as ComponentProps<"button">)} className={classes}>
        {inner}
      </button>
    );

  if (!magnetic) return element;

  return <Magnetic className="inline-flex">{element}</Magnetic>;
}

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);
}
