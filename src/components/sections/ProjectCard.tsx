"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Code2,
  GraduationCap,
  Landmark,
  Lock,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { accentStyles } from "@/lib/accents";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Category → glyph for the generated cover art. */
const categoryIcon: Record<string, typeof Code2> = {
  Python: Code2,
  "Machine Learning": BrainCircuit,
  FinTech: Landmark,
  "Data Analysis": BarChart3,
  University: GraduationCap,
};

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "In progress",
  planned: "Planned",
};

/**
 * Generated cover art.
 *
 * Real screenshots are ideal, but an empty grey box screams "unfinished".
 * Until `project.image` is set, this renders a per-accent gradient mesh with
 * the category glyph and a faint code-grid — distinct per card, and clearly
 * intentional rather than missing.
 */
function CoverArt({ project }: { project: Project }) {
  const Icon = categoryIcon[project.category] ?? Sparkles;
  const accent = accentStyles[project.accent];

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Mesh */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-110",
          "bg-[radial-gradient(circle_at_30%_25%,var(--tw-gradient-from),transparent_55%),radial-gradient(circle_at_75%_80%,var(--tw-gradient-to),transparent_50%)]",
          accent.gradient,
        )}
      />
      {/* Code grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(var(--color-mist-50)_1px,transparent_1px),linear-gradient(90deg,var(--color-mist-50)_1px,transparent_1px)] [background-size:26px_26px]"
      />
      {/* Glyph */}
      <div className="absolute inset-0 grid place-items-center">
        <Icon
          className={cn(
            "size-14 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-1 group-hover/card:scale-110",
            accent.text,
          )}
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const accent = accentStyles[project.accent];
  const hasGithub = Boolean(project.github);
  const hasDemo = Boolean(project.demo);

  return (
    <GlassCard as="article" className="flex h-full flex-col" spotlight>
      {/* Cover */}
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <CoverArt project={project} />

        {/* Status pill */}
        <span
          className={cn(
            "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium backdrop-blur-md",
            project.status === "live"
              ? "border-mint-500/30 bg-mint-500/12 text-mint-300"
              : "border-mist-50/12 bg-ink-950/50 text-mist-300",
          )}
        >
          {project.status === "live" ? (
            <span className="size-1.5 rounded-full bg-mint-400" />
          ) : (
            <Lock className="size-3" aria-hidden />
          )}
          {statusLabel[project.status]}
        </span>

        <span
          className={cn(
            "absolute top-3 right-3 rounded-full border border-mist-50/12 bg-ink-950/50 px-2.5 py-1 text-[0.6875rem] font-medium backdrop-blur-md",
            accent.text,
          )}
        >
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-mist-50">{project.title}</h3>
        <p className="mt-1.5 text-sm font-medium text-mist-300">{project.blurb}</p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-mist-400">
          {project.description}
        </p>

        {/* Tech */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-mist-50/8 bg-mist-50/4 px-2 py-1 font-mono text-[0.6875rem] text-mist-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Actions — pinned to the bottom so cards align */}
        <div className="mt-6 flex items-center gap-2.5 border-t border-mist-50/6 pt-4">
          <ActionButton
            href={project.github}
            enabled={hasGithub}
            label="Code"
            disabledLabel="Code soon"
            icon={<GithubIcon className="size-4" />}
            variant="ghost"
          />
          <ActionButton
            href={project.demo}
            enabled={hasDemo}
            label="Live demo"
            disabledLabel="Demo soon"
            icon={<ArrowUpRight className="size-4" />}
            variant="accent"
            accentClass={cn(accent.softBg, accent.text, accent.border)}
          />
        </div>
      </div>
    </GlassCard>
  );
}

type ActionButtonProps = {
  href: string | null;
  enabled: boolean;
  label: string;
  disabledLabel: string;
  icon: React.ReactNode;
  variant: "ghost" | "accent";
  accentClass?: string;
};

/**
 * Renders a real link when the URL exists, and an inert, clearly-labelled
 * "soon" chip otherwise — a disabled `<button>` communicates the roadmap
 * without pretending to be a dead link.
 */
function ActionButton({
  href,
  enabled,
  label,
  disabledLabel,
  icon,
  variant,
  accentClass,
}: ActionButtonProps) {
  const base =
    "group/action inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[0.8125rem] font-medium transition-all duration-300";

  if (!enabled) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className={cn(
          base,
          "cursor-not-allowed border border-dashed border-mist-50/10 text-mist-500",
        )}
      >
        {icon}
        {disabledLabel}
      </span>
    );
  }

  return (
    <a
      href={href!}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        variant === "ghost"
          ? "border border-mist-50/10 text-mist-200 hover:border-mist-50/20 hover:bg-mist-50/6 hover:text-mist-50"
          : cn("border", accentClass, "hover:brightness-125"),
      )}
    >
      {icon}
      {label}
    </a>
  );
}
