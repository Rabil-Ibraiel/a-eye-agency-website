import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { PageTransition } from "@/components/page-transition";
import { PageIntro } from "@/components/primitives";
import { WorkFilterGrid } from "@/components/work-filter";
import { projectFilters, workPageContent } from "@/content";
import { publishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore clearly labelled fictional A-Eye projects across creative direction, AI content, motion, design, and campaigns.",
};

export default function WorkPage() {
  const projectCards = publishedProjects.map((project) => ({
    title: project.title,
    slug: project.slug,
    publicLabel: project.publicLabel,
    conceptBrand: project.conceptBrand,
    year: project.year,
    categories: project.categories,
    cardDescription: project.cardDescription,
    heroMedia: project.heroMedia,
  }));

  return (
    <PageTransition>
      <div>
        <section className="shell section-space-compact">
          <PageIntro
            eyebrow={workPageContent.eyebrow}
            title={workPageContent.heading}
            copy={workPageContent.description}
          />
        </section>

        <WorkFilterGrid filters={projectFilters} projects={projectCards} />

        <FinalCta
          eyebrow="Bring the next brief"
          heading="Bring the next brief into focus."
          description="Tell us what you are building and what the work needs to change."
          label="Start a project"
        />
      </div>
    </PageTransition>
  );
}
