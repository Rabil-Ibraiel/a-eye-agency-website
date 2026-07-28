import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ViewTransition } from "react";
import type { Project } from "@/types/content";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/motion/reveal";

export type ProjectCardData = Pick<
  Project,
  | "title"
  | "slug"
  | "publicLabel"
  | "conceptBrand"
  | "year"
  | "categories"
  | "cardDescription"
  | "heroMedia"
>;

export function ProjectCard({
  project,
  priority = false,
  index = 0,
  mediaSizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
}: {
  project: ProjectCardData;
  priority?: boolean;
  index?: number;
  mediaSizes?: string;
}) {
  return (
    <Reveal className="project-card-item" delay={Math.min(index, 3) * 0.06}>
      <article className="project-card group">
        <Link
          href={`/work/${project.slug}`}
          transitionTypes={["nav-forward"]}
          className="project-card-link focus-visible:outline-offset-8"
        >
          <ViewTransition
            name={`project-media-${project.slug}`}
            share="morph"
            default="none"
          >
            <div className="crop-frame overflow-hidden bg-card">
              <ProjectMedia
                media={project.heroMedia}
                priority={priority}
                sizes={mediaSizes}
                className="project-card-media transition-transform duration-[220ms] ease-[var(--ease-out)]"
              />
            </div>
          </ViewTransition>
          <div className="project-card-content mt-5 border-t border-border pt-4">
            <div className="project-card-title-block grid grid-cols-[1fr_auto] gap-x-5">
              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-primary uppercase">
                  {project.conceptBrand
                    ? `${project.conceptBrand} / ${project.publicLabel}`
                    : project.publicLabel}
                </p>
                <h3 className="mt-2 text-[clamp(1.5rem,2vw,2.25rem)] leading-[1.04] font-medium tracking-[-0.04em]">
                  {project.title}
                </h3>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="interactive-arrow mt-1 size-5 transition-transform duration-[220ms] ease-[var(--ease-out)]"
              />
            </div>
            <p className="mt-4 max-w-[52ch] text-sm leading-6 text-muted-foreground">
              {project.cardDescription}
            </p>
            <p className="mt-auto pt-5 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
              {project.categories.map((category) => category.replace("-", " ")).join(" · ")} / {project.year}
            </p>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
