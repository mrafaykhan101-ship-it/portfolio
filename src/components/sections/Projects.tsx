"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projectCategories, projects } from "@/lib/content";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  // Only show filters that actually match something.
  const categories = useMemo(
    () =>
      projectCategories.filter(
        (c) => c === "All" || projects.some((p) => p.category === c),
      ),
    [],
  );

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Things I&apos;m <span className="text-gradient">building</span>
          </>
        }
        lede="A working portfolio in progress. These are the projects I'm shipping as I go — placeholders today, live repositories soon. The grid is built to grow."
      />

      {/* Filter bar */}
      <Reveal delay={0.05} className="mt-10">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          <LayoutGroup id="project-filter">
            {categories.map((category) => {
              const isActive = filter === category;
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-mist-50"
                      : "text-mist-300 hover:text-mist-100",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mist-50/8 ring-1 ring-mist-50/12 ring-inset"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {category}
                  <span className="ml-1.5 text-xs text-mist-500 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </Reveal>

      {/* Grid */}
      <motion.ul
        layout={!reduce}
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Add-more hint */}
      <Reveal delay={0.1} className="mt-8">
        <p className="text-center text-sm text-mist-500">
          More projects are on the way as I complete them.
        </p>
      </Reveal>
    </Section>
  );
}
