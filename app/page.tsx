import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/final-cta";
import { FeaturedWorkScrollStory } from "@/components/motion/featured-work-scroll-story";
import { FocusField } from "@/components/motion/focus-field";
import { HomeIntroLoader } from "@/components/motion/home-intro-loader";
import { HomeMotionController } from "@/components/motion/home-motion-controller";
import { PageTransition } from "@/components/page-transition";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectGrid } from "@/components/project-grid";
import type { ProjectCardData } from "@/components/project-card";
import { Eyebrow, SectionHeading, TextLink } from "@/components/primitives";
import { ServiceIndex } from "@/components/service-index";
import { cn } from "@/lib/utils";
import {
  homePageContent,
  services,
  studioProcess,
} from "@/content";
import { publishedProjects } from "@/lib/content";

export default function HomePage() {
  const selectedProjects = homePageContent.selectedWork.projectSlugs
    .map((slug) => publishedProjects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const selectedProjectCards: readonly ProjectCardData[] = selectedProjects.map(
    (project) => ({
      title: project.title,
      slug: project.slug,
      publicLabel: project.publicLabel,
      conceptBrand: project.conceptBrand,
      year: project.year,
      categories: project.categories,
      cardDescription: project.cardDescription,
      heroMedia: project.heroMedia,
    }),
  );

  return (
    <PageTransition>
      <div className="home-landing">
        <HomeMotionController />
        <HomeIntroLoader />
        <span className="home-scroll-progress" aria-hidden="true" />

        <section className="home-hero" id="top">
          <div className="home-hero__sticky">
            <div className="shell editorial-grid items-center gap-y-10 py-[clamp(3rem,6vw,5.5rem)]">
              <div className="home-hero__copy-motion col-span-full lg:col-span-5">
                <div className="home-hero__copy-enter">
                  <Eyebrow className="home-hero__eyebrow">
                    {homePageContent.hero.eyebrow}
                  </Eyebrow>
                  <h1
                    className="display-xl mt-6 max-w-[10ch]"
                    aria-label={homePageContent.hero.headline}
                  >
                    <span className="home-hero__line" aria-hidden="true">
                      <span className="home-hero__line-inner">
                        We don’t make
                      </span>
                    </span>
                    <span className="home-hero__line" aria-hidden="true">
                      <span className="home-hero__line-inner">
                        content<span className="text-primary">.</span>
                      </span>
                    </span>
                    <span className="home-hero__line" aria-hidden="true">
                      <span className="home-hero__line-inner">We make</span>
                    </span>
                    <span className="home-hero__line" aria-hidden="true">
                      <span className="home-hero__line-inner editorial-accent text-primary">
                        impact<span className="text-primary">.</span>
                      </span>
                    </span>
                  </h1>
                </div>
                <div className="home-hero__support mt-6 max-w-xl">
                  <p className="body-lg text-muted-foreground">
                    {homePageContent.hero.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild size="lg" className="h-11 rounded-none px-5 text-xs tracking-[0.1em] uppercase">
                      <Link href={homePageContent.hero.primaryCta.href} prefetch={false}>
                        {homePageContent.hero.primaryCta.label}
                        <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-11 rounded-none px-5 text-xs tracking-[0.1em] uppercase">
                      <Link href={homePageContent.hero.secondaryCta.href}>
                        {homePageContent.hero.secondaryCta.label}
                        <ArrowDownRight data-icon="inline-end" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                  <p className="home-hero__scroll-cue mt-9 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                    <span aria-hidden="true" />
                    Scroll / acquire signal
                  </p>
                </div>
              </div>
              <div className="home-hero__visual-motion col-span-full lg:col-span-5 lg:col-start-8">
                <div className="home-hero__visual-enter">
                  <FocusField
                    homeMotion
                    targets={selectedProjectCards.map((project) => ({
                      title: project.title,
                      meta: `${
                        project.conceptBrand ?? project.publicLabel
                      } / ${project.year}`,
                      href: `/work/${project.slug}`,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-positioning relative border-y border-border bg-card/25">
          <div className="shell editorial-grid relative">
            <span className="home-positioning__signal" aria-hidden="true" />
            {homePageContent.positioning.stages.map((stage, index) => (
              <div
                key={stage.label}
                data-home-reveal=""
                className={cn(
                  "home-positioning__stage col-span-full grid min-h-28 grid-cols-[2.5rem_1fr] gap-3 border-border py-5 sm:col-span-2 sm:block sm:px-4 md:min-h-32 lg:col-span-3",
                  index < 3 && "border-b",
                  index < 2 ? "sm:border-b" : "sm:border-b-0",
                  index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:border-r-0 sm:pr-0",
                  "md:border-b-0 md:px-4",
                  index < 3 ? "md:border-r" : "md:border-r-0",
                  index === 0 && "md:pl-0",
                  index === 3 && "md:pr-0",
                )}
              >
                <p className="home-positioning__number font-mono text-xs tracking-[0.12em] text-primary">0{index + 1}</p>
                <div>
                  <h2 className="home-positioning__title text-lg font-medium tracking-[-0.03em] sm:mt-5">{stage.label}</h2>
                  <p className="home-positioning__copy mt-2 text-sm leading-6 text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          data-home-section="work"
          className="home-selected-work section-space scroll-mt-20 border-t border-border"
        >
          <div className="shell">
            <div className="home-section-heading" data-home-reveal="">
              <SectionHeading
                eyebrow={homePageContent.selectedWork.eyebrow}
                title={homePageContent.selectedWork.heading}
                copy={homePageContent.selectedWork.description}
              />
            </div>
            <div className="mt-12 lg:mt-16">
              <FeaturedWorkScrollStory projects={selectedProjectCards}>
                <ProjectGrid
                  projects={selectedProjectCards}
                  mediaSizes="(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference) 75vw, (max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </FeaturedWorkScrollStory>
            </div>
            <div className="editorial-grid mt-12 lg:mt-16" data-home-reveal="">
              <TextLink href="/work" className="col-span-full justify-self-end md:col-span-2 md:col-start-7 lg:col-span-2 lg:col-start-11">
                View all work
              </TextLink>
            </div>
          </div>
        </section>

        <section
          id="services"
          data-home-section="services"
          className="home-services section-space scroll-mt-20"
        >
          <div className="shell">
            <div className="home-section-heading" data-home-reveal="">
              <SectionHeading
                eyebrow={homePageContent.services.eyebrow}
                title={homePageContent.services.heading}
                copy={homePageContent.services.description}
              />
            </div>
            <div className="home-service-index mt-12 lg:mt-16">
              <ServiceIndex services={services} />
            </div>
          </div>
        </section>

        <section
          id="process"
          data-home-section="process"
          className="home-process section-space scroll-mt-20 border-y border-border bg-card/35"
        >
          <div className="shell">
            <div className="home-section-heading" data-home-reveal="">
              <SectionHeading
                eyebrow={homePageContent.process.eyebrow}
                title={homePageContent.process.heading}
                copy={homePageContent.process.description}
              />
            </div>
            <div className="mt-12 lg:mt-16">
              <ProcessSteps steps={studioProcess} homeMotion />
            </div>
          </div>
        </section>

        <section
          id="studio"
          data-home-section="studio"
          className="home-about section-space scroll-mt-20 overflow-hidden"
        >
          <div className="shell editorial-grid items-center gap-y-12">
            <div className="home-about__copy col-span-full lg:col-span-6" data-home-reveal="">
              <Eyebrow>{homePageContent.aboutPreview.eyebrow}</Eyebrow>
              <h2 className="display-md mt-6">
                {homePageContent.aboutPreview.heading}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                {homePageContent.aboutPreview.description}
              </p>
              <TextLink href={homePageContent.aboutPreview.cta.href} className="mt-6">
                {homePageContent.aboutPreview.cta.label}
              </TextLink>
            </div>
            <div className="home-about__visual col-span-full lg:col-span-6 lg:col-start-7" data-home-reveal="">
              <div className="home-about__media crop-frame relative aspect-[5/4] overflow-hidden border border-border bg-card">
                <Image
                  src="/art/studio-grid-texture.svg"
                  alt="Abstract studio grid representing three connected creative disciplines"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="home-about__connector" aria-hidden="true" />
                <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2">
                  {["Direction", "Production", "Motion"].map((label, index) => (
                    <div key={label} className="home-about__discipline border border-white/20 bg-black/75 p-3 backdrop-blur-sm">
                      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-primary uppercase">0{index + 1}</p>
                      <p className="mt-2 text-xs text-white/76">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCta
          eyebrow={homePageContent.finalCta.eyebrow}
          heading={homePageContent.finalCta.heading}
          description={homePageContent.finalCta.description}
          label={homePageContent.finalCta.cta.label}
          href={homePageContent.finalCta.cta.href}
          homeMotion
        />
      </div>
    </PageTransition>
  );
}
