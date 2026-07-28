import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CaseStudyRenderer } from "@/components/case-study-renderer";
import { PageTransition } from "@/components/page-transition";
import { ProjectMedia } from "@/components/project-media";
import { Eyebrow, PageIntro, TextLink } from "@/components/primitives";
import { getNextProject, getProjectBySlug, publishedProjects } from "@/lib/content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.publicLabel}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  return (
    <PageTransition>
      <article>
        <header className="shell section-space-compact">
          <Link
            href="/work"
            transitionTypes={["nav-back"]}
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.13em] text-muted-foreground uppercase hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All work
          </Link>
          <PageIntro
            className="mt-8"
            eyebrow={`${project.conceptBrand ?? project.client ?? "A-Eye"} / ${project.publicLabel}`}
            title={project.title}
            copy={project.summary}
          />
          <dl className="mt-12 grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Project", project.conceptBrand ?? project.client ?? project.publicLabel],
              ["Year", String(project.year)],
              ["Sector", project.industry ?? "Creative concept"],
              ["Disciplines", project.categories.map((item) => item.replace("-", " ")).join(", ")],
            ].map(([term, value]) => (
              <div key={term} className="border-b border-border p-4 sm:border-r sm:[&:nth-child(n+3)]:border-b-0 sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <dt className="font-mono text-[0.58rem] tracking-[0.13em] text-muted-foreground uppercase">{term}</dt>
                <dd className="mt-3 text-sm capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="shell">
          <ProjectMedia
            media={project.heroMedia}
            priority
            sizes="(max-width: 90rem) 100vw, 85rem"
            className="aspect-[16/10]"
          />
          {project.heroMedia.caption ? (
            <p className="mt-3 font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase">
              {project.heroMedia.caption}
            </p>
          ) : null}
        </div>

        <section className="shell section-space">
          <div className="editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-2">
              <Eyebrow>Fictional brief</Eyebrow>
            </div>
            <div className="col-span-full flex max-w-4xl flex-col gap-10 lg:col-span-8 lg:col-start-3">
              {[
                ["The question", project.challenge],
                ["Creative approach", project.creativeApproach],
                ["Production", project.productionProcess],
              ].map(([heading, copy]) => (
                <div key={heading} className="border-t border-border pt-5">
                  <h2 className="text-2xl font-medium tracking-[-0.045em]">{heading}</h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell pb-[var(--section-space)]">
          <CaseStudyRenderer modules={project.modules} />
        </section>

        <section className="paper-section section-space">
          <div className="shell editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-6">
              <Eyebrow>Concept scope</Eyebrow>
              <h2 className="display-md mt-6">Proposed outputs</h2>
            </div>
            <ul className="col-span-full border-t border-border lg:col-span-6 lg:col-start-7">
              {project.deliverables.map((deliverable, index) => (
                <li key={deliverable} className="flex min-h-16 items-center gap-5 border-b border-border py-4">
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground">0{index + 1}</span>
                  <span className="text-lg tracking-[-0.025em]">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {nextProject ? (
          <section className="shell section-space">
            <p className="eyebrow">Next fictional project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              transitionTypes={["nav-forward"]}
              className="project-card group mt-8 grid gap-7 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-6 lg:row-start-1">
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-primary uppercase">
                  {nextProject.conceptBrand
                    ? `${nextProject.conceptBrand} / ${nextProject.publicLabel}`
                    : nextProject.publicLabel}
                </p>
                <h2 className="display-lg mt-4">{nextProject.title}</h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-muted-foreground lg:col-span-5 lg:col-start-7 lg:row-start-1">
                {nextProject.cardDescription}
              </p>
              <ArrowUpRight aria-hidden="true" className="interactive-arrow size-7 transition-transform duration-[220ms] ease-[var(--ease-out)] lg:col-start-12 lg:row-start-1 lg:justify-self-end" />
            </Link>
          </section>
        ) : (
          <div className="shell section-space">
            <TextLink href="/work" direction="back">Back to work</TextLink>
          </div>
        )}
      </article>
    </PageTransition>
  );
}
