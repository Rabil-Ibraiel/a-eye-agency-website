import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageTransition } from "@/components/page-transition";
import { PageIntro } from "@/components/primitives";
import { contactPageContent } from "@/content";
import { isInquiryTransportConfigured } from "@/lib/inquiry-transport";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with A-Eye. Share the goal, context, scope, and timeline for your creative brief.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="shell section-space-compact">
        <PageIntro
          eyebrow={contactPageContent.eyebrow}
          title={contactPageContent.heading}
          copy={contactPageContent.description}
        />

        <section className="editorial-grid mt-12 border-t border-border pt-10 lg:mt-16">
          <aside className="col-span-full lg:col-span-4">
            <p className="font-mono text-[0.63rem] tracking-[0.14em] text-muted-foreground uppercase">Useful context</p>
            <ol className="mt-5 flex flex-col gap-5 text-sm leading-6 text-muted-foreground">
              <li className="grid grid-cols-[2rem_1fr] gap-3"><span className="font-mono text-primary">01</span><span>What needs to change or become possible?</span></li>
              <li className="grid grid-cols-[2rem_1fr] gap-3"><span className="font-mono text-primary">02</span><span>Who needs to notice, understand, or act?</span></li>
              <li className="grid grid-cols-[2rem_1fr] gap-3"><span className="font-mono text-primary">03</span><span>What timing or constraints are already real?</span></li>
            </ol>
            <p className="mt-6 border-l border-primary pl-4 text-sm leading-6 text-muted-foreground">
              Rough references are welcome. Share links in the project note if they help explain the ambition or visual territory.
            </p>
          </aside>
          <div className="col-span-full mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <InquiryForm
              transportConfigured={isInquiryTransportConfigured()}
              contactEmail={process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
