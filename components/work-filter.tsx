"use client";

import { useEffect, useState } from "react";
import { ProjectGrid } from "@/components/project-grid";
import type { ProjectCardData } from "@/components/project-card";
import type { ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

type FilterValue = ProjectCategory | "all";
type WorkFilter = { value: FilterValue; label: string };

function filterFromLocation(filters: readonly WorkFilter[]): FilterValue {
  const value = new URLSearchParams(window.location.search).get("discipline");
  return filters.some((filter) => filter.value === value)
    ? (value as FilterValue)
    : "all";
}

export function WorkFilterGrid({
  filters,
  projects,
}: {
  filters: readonly WorkFilter[];
  projects: readonly ProjectCardData[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  useEffect(() => {
    const syncFromUrl = () => setActiveFilter(filterFromLocation(filters));
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [filters]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  function selectFilter(value: FilterValue) {
    if (value === activeFilter) return;
    const scrollPosition = { x: window.scrollX, y: window.scrollY };
    setActiveFilter(value);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          left: scrollPosition.x,
          top: scrollPosition.y,
          behavior: "auto",
        });
      });
    });
  }

  return (
    <>
      <section className="border-y border-border">
        <div
          className="shell flex min-h-16 items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filter work by discipline"
        >
          {filters.map((filter) => {
            const active = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={active}
                onClick={() => selectFilter(filter.value)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center border px-4 font-mono text-xs tracking-[0.11em] uppercase transition-[color,background-color,border-color] duration-[160ms] ease-[var(--ease-out)]",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/45 hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="shell section-space-compact">
        <p className="sr-only" aria-live="polite">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}.
        </p>
        <ProjectGrid projects={filteredProjects} />
      </section>
    </>
  );
}
