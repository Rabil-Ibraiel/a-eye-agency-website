import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/page-transition";
import { Eyebrow, PageIntro } from "@/components/primitives";
import { ServiceIndex } from "@/components/service-index";
import { servicesPageContent } from "@/content";
import { publishedServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative direction, AI content production, motion design, post-production, brand, and visual design from A-Eye.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <div>
        <section className="shell section-space-compact">
          <PageIntro
            eyebrow={servicesPageContent.eyebrow}
            title={servicesPageContent.heading}
            copy={servicesPageContent.description}
          />
        </section>

        <section className="shell pb-[var(--section-space)]">
          <ServiceIndex services={publishedServices} />
        </section>

        <section className="paper-section section-space">
          <div className="shell editorial-grid items-center gap-y-12">
            <Reveal className="col-span-full lg:col-span-6">
              <div className="crop-frame relative aspect-[4/3] overflow-hidden bg-card">
                <Image
                  src="/art/process-perception-system.svg"
                  alt="A connected five-stage creative production system"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="col-span-full lg:col-span-6 lg:col-start-7">
              <Eyebrow>One production system</Eyebrow>
              <h2 className="display-md mt-6">Fewer handoffs. A clearer idea.</h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Strategy, design, AI-assisted production, and motion develop together. The team making the final frames understands the decision that started them.
              </p>
              <dl className="mt-8 border-t border-border">
                {[
                  ["01", "One point of creative ownership"],
                  ["02", "Systems designed for real formats"],
                  ["03", "Human review at every production stage"],
                ].map(([number, copy]) => (
                  <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-4">
                    <dt className="font-mono text-[0.62rem] text-muted-foreground">{number}</dt>
                    <dd>{copy}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <FinalCta
          eyebrow="Choose the right starting point"
          heading="Bring a defined need or a question still taking shape."
          description="We will help identify the right scope, sequence, and team around the work."
          label="Discuss a project"
        />
      </div>
    </PageTransition>
  );
}
