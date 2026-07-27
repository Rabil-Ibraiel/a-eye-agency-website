import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { FocusField } from "@/components/motion/focus-field";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/page-transition";
import { Eyebrow, PageIntro } from "@/components/primitives";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Brand Lab",
  description: "Internal A-Eye design-system reference.",
  robots: { index: false, follow: false, nocache: true },
};

const swatches = [
  ["Black", "#000000"],
  ["White", "#FFFFFF"],
  ["Graphite", "#151716"],
  ["A-Eye Red", "#FF3B01"],
] as const;

const replacementSpecs = [
  {
    title: "Founder profile",
    example: "Example format: Maya Rahman — Creative Director",
    requirements: "Full name · exact role · 40–60 word bio · approved 4:5 portrait (1600 × 2000px) · profile link",
  },
  {
    title: "Client case study",
    example: "Example format: Northline Launch — Brand campaign / 2026",
    requirements: "Approved client name · industry · 1-sentence brief · 3–6 deliverables · verified outcomes · credits · image rights",
  },
  {
    title: "Contact channel",
    example: "Example format: projects@yourdomain.com",
    requirements: "Monitored inbox · response owner · webhook endpoint · fallback email · realistic response expectation",
  },
  {
    title: "Privacy details",
    example: "Use approved legal details, not sample copy",
    requirements: "Effective date · jurisdiction · processors · retention period · privacy contact · deletion request process",
  },
] as const;

export default function BrandLabPage() {
  return (
    <PageTransition>
      <div className="shell section-space-compact">
        <PageIntro
          eyebrow="Internal reference / Noindex"
          title="A-Eye perception system."
          copy="A working review surface for tokens, type, components, content replacements, and interaction. Noindex does not make this route private."
        />

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Color</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {swatches.map(([name, value]) => (
              <div key={name} className="border border-border p-3">
                <div className="aspect-square border border-white/10" style={{ background: value }} />
                <p className="mt-3 font-mono text-[0.62rem] tracking-[0.12em] uppercase">{name} / {value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Type scale</Eyebrow>
          <div className="mt-8 flex flex-col gap-10">
            <p className="display-xl">Perception</p>
            <p className="display-md">Every frame has a purpose.</p>
            <p className="body-lg text-muted-foreground">Human direction holds the idea together from the first decision to the final frame.</p>
            <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">Registration label / 01</p>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Controls</Eyebrow>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Static visual specimens; no actions are attached.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-none px-5"><span>Primary <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></span></Button>
            <Button asChild variant="outline" className="h-11 rounded-none px-5"><span>Outline</span></Button>
            <Button asChild variant="ghost" className="h-11 rounded-none px-5"><span>Ghost</span></Button>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Replacement map</Eyebrow>
          <div className="editorial-grid mt-8">
            {replacementSpecs.map((spec, index) => (
              <article key={spec.title} className="col-span-full border-t border-border py-6 sm:col-span-4 lg:col-span-6">
                <p className="font-mono text-xs tracking-[0.12em] text-primary">0{index + 1}</p>
                <h2 className="mt-4 text-2xl font-medium tracking-[-0.035em]">{spec.title}</h2>
                <p className="mt-3 text-sm font-medium">{spec.example}</p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Replace with: {spec.requirements}.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Signature interaction</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <FocusField />
            <div>
              <h2 className="display-md">Raw information, resolved through focus.</h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">Pointer motion follows directly. Keyboard and touch use an explicit focus shift. Reduced motion keeps a static resolved aperture.</p>
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8 lg:mt-16">
          <Eyebrow>Reveal behavior</Eyebrow>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Observe", "Frame", "Resolve"].map((label, index) => (
              <Reveal key={label} delay={index * 0.06} className="aspect-[4/3] border border-border bg-card p-5">
                <span className="font-mono text-[0.62rem] text-primary">0{index + 1}</span>
                <p className="mt-8 text-2xl font-medium tracking-[-0.04em]">{label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
