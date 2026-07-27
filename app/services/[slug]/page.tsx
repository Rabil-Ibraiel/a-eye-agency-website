import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { FinalCta } from "@/components/final-cta";
import { PageTransition } from "@/components/page-transition";
import { ProjectGrid } from "@/components/project-grid";
import { Eyebrow, PageIntro } from "@/components/primitives";
import {
  getRelatedProjects,
  getServiceBySlug,
  publishedServices,
} from "@/lib/content";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.title, description: service.shortDescription };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  const relatedProjects = getRelatedProjects(service);

  return (
    <PageTransition>
      <div>
        <header className="shell section-space-compact">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] tracking-[0.13em] text-muted-foreground uppercase hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All services
          </Link>
          <PageIntro
            className="mt-8"
            eyebrow={service.eyebrow}
            title={service.title}
            copy={service.openingStatement}
          />
        </header>

        <section className="paper-section section-space">
          <div className="shell editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-6">
              <Eyebrow>Who this is for</Eyebrow>
              <h2 className="display-md mt-6">A clearer answer to a real production pressure.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                {service.whoItIsFor}
              </p>
            </div>
            <div className="col-span-full lg:col-span-6 lg:col-start-7">
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">Common signals</p>
              <ul className="mt-5 border-t border-border">
                {service.problems.map((problem, index) => (
                  <li key={problem} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5">
                    <span className="font-mono text-[0.62rem] text-muted-foreground">0{index + 1}</span>
                    <span className="text-lg leading-7 tracking-[-0.025em]">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="shell section-space">
          <div className="editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-6">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="display-md mt-6">What we can build around the brief.</h2>
            </div>
            <div className="col-span-full grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.045em]">Capabilities</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.045em]">Typical deliverables</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/35 py-[var(--section-space)]">
          <div className="shell">
            <Eyebrow>A simple working sequence</Eyebrow>
            <ol className="mt-10 grid border-t border-border md:grid-cols-3">
              {service.process.map((step, index) => (
                <li key={step.title} className="border-b border-border py-6 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
                  <span className="font-mono text-[0.62rem] text-primary">0{index + 1}</span>
                  <h2 className="mt-8 text-2xl font-medium tracking-[-0.045em]">{step.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {relatedProjects.length > 0 ? (
          <section className="shell section-space">
            <Eyebrow>Related A-Eye concepts</Eyebrow>
            <h2 className="display-md mt-6 max-w-5xl">See the capability applied as a visual system.</h2>
            <div className="mt-12 lg:mt-16">
              <ProjectGrid projects={relatedProjects} />
            </div>
          </section>
        ) : null}

        <FinalCta
          eyebrow={service.eyebrow}
          heading={service.openingStatement}
          description="Share the context, the ambition, and what is already known. We will help define the useful next step."
          label={service.cta.label}
          href={service.cta.href}
        />
      </div>
    </PageTransition>
  );
}
