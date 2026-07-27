import { ProjectCard, type ProjectCardData } from "@/components/project-card";

export function ProjectGrid({
  projects,
  priorityFirst = false,
  mediaSizes,
}: {
  projects: readonly ProjectCardData[];
  priorityFirst?: boolean;
  mediaSizes?: string;
}) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
          priority={priorityFirst && index === 0}
          mediaSizes={mediaSizes}
        />
      ))}
    </div>
  );
}
