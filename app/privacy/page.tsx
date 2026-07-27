import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PageIntro } from "@/components/primitives";
import { privacyPageContent } from "@/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How information submitted through the A-Eye inquiry form is intended to be handled.",
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <article className="shell section-space-compact">
        <PageIntro
          eyebrow={privacyPageContent.eyebrow}
          title={privacyPageContent.heading}
          copy={privacyPageContent.introduction}
        />

        {!privacyPageContent.effectiveDate && process.env.NODE_ENV === "development" ? (
          <div className="editorial-grid mt-6">
            <p className="col-span-full border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100 lg:col-span-4 lg:col-start-9">
              Preview note: add the approved effective date, providers, retention period, jurisdiction, and privacy contact before launch.
            </p>
          </div>
        ) : null}

        <div className="editorial-grid mt-12 lg:mt-16">
          <div className="col-span-full max-w-[68ch] lg:col-span-8 lg:col-start-3">
            {privacyPageContent.sections.map((section, index) => (
              <section key={section.heading} className="grid gap-5 border-t border-border py-7 last:border-b sm:grid-cols-[3rem_1fr] lg:py-8">
                <span className="font-mono text-[0.62rem] text-primary">0{index + 1}</span>
                <div>
                  <h2 className="text-2xl font-medium tracking-[-0.045em]">{section.heading}</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-7 text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
