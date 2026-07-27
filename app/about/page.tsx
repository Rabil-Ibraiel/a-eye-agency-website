import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/final-cta";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/page-transition";
import { Eyebrow, PageIntro } from "@/components/primitives";
import { aboutPageContent } from "@/content";
import { publicFounders } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A-Eye is a small creative team combining human direction, AI production, motion, and design.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div>
        <header className="shell section-space-compact">
          <PageIntro
            eyebrow={aboutPageContent.eyebrow}
            title={aboutPageContent.heading}
            copy={aboutPageContent.introduction}
          />
        </header>

        <section className="shell pb-[var(--section-space)]">
          <div className="crop-frame relative aspect-[4/5] overflow-hidden border border-border bg-card sm:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src="/art/studio-grid-texture.svg"
              alt="A structured abstract grid representing A-Eye's connected studio model"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 grid gap-2 sm:grid-cols-3">
              {["Human direction", "Expanded production", "Controlled craft"].map((label, index) => (
                <div key={label} className="border border-white/20 bg-[#0b0c0c]/78 p-4 text-white backdrop-blur-sm">
                  <p className="font-mono text-[0.58rem] tracking-[0.14em] text-primary">0{index + 1}</p>
                  <p className="mt-3 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="paper-section section-space">
          <div className="shell editorial-grid gap-y-12">
            <Reveal className="col-span-full lg:col-span-6">
              <Eyebrow>Studio thesis</Eyebrow>
              <h2 className="display-md mt-6">{aboutPageContent.philosophy.heading}</h2>
            </Reveal>
            <div className="col-span-full flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              {aboutPageContent.philosophy.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06}>
                  <p className="text-lg leading-8 text-muted-foreground">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="shell section-space">
          <div className="editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-6">
              <Eyebrow>Purpose</Eyebrow>
              <h2 className="display-md mt-6">{aboutPageContent.purpose.heading}</h2>
            </div>
            <p className="body-lg col-span-full text-muted-foreground lg:col-span-6 lg:col-start-7">
              {aboutPageContent.purpose.body}
            </p>
          </div>
          <ol className="mt-12 border-t border-border lg:mt-16">
            {aboutPageContent.principles.map((principle, index) => (
              <Reveal as="li" key={principle.title} delay={index * 0.04}>
                <div className="editorial-grid border-b border-border py-7">
                  <span className="col-span-1 font-mono text-[0.62rem] text-primary">0{index + 1}</span>
                  <h3 className="col-span-3 text-xl font-medium tracking-[-0.035em] sm:col-span-4 lg:col-span-5 lg:col-start-2">
                    {principle.title}
                  </h3>
                  <p className="col-span-4 mt-3 text-sm leading-6 text-muted-foreground sm:col-span-7 sm:col-start-2 lg:col-span-6 lg:col-start-7 lg:mt-0">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="border-y border-border bg-card/35 py-[var(--section-space)]">
          <div className="shell">
            <div className="editorial-grid gap-y-12">
              <div className="col-span-full lg:col-span-6">
                <Eyebrow>Collaboration model</Eyebrow>
                <h2 className="display-md mt-6">{aboutPageContent.collaboration.heading}</h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                  {aboutPageContent.collaboration.description}
                </p>
              </div>
              <div className="col-span-full border-t border-border lg:col-span-6 lg:col-start-7">
                {aboutPageContent.collaboration.points.map((point, index) => (
                  <div key={point.title} className="border-b border-border py-6">
                    <p className="font-mono text-[0.6rem] text-primary">0{index + 1}</p>
                    <h3 className="mt-4 text-xl font-medium tracking-[-0.035em]">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {publicFounders.length > 0 ? (
        <section className="shell section-space">
          <div className="editorial-grid gap-y-12">
            <div className="col-span-full lg:col-span-6">
              <Eyebrow>Founding team</Eyebrow>
              <h2 className="display-md mt-6">{aboutPageContent.team.heading}</h2>
            </div>
            <div className="col-span-full lg:col-span-6 lg:col-start-7">
              <p className="text-base leading-7 text-muted-foreground">{aboutPageContent.team.description}</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {publicFounders.map((founder) => (
                <article key={founder.id}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-card">
                    <Image src={founder.portrait.src} alt={founder.portrait.alt} fill className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em]">{founder.name}</h3>
                  <p className="mt-1 font-mono text-[0.62rem] tracking-[0.13em] text-primary uppercase">{founder.role}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{founder.bio}</p>
                </article>
            ))}
          </div>
        </section>
        ) : null}

        <FinalCta
          eyebrow="Work with A-Eye"
          heading={aboutPageContent.cta.heading}
          description={aboutPageContent.cta.description}
          label={aboutPageContent.cta.link.label}
          href={aboutPageContent.cta.link.href}
        />
      </div>
    </PageTransition>
  );
}
