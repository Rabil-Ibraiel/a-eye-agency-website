import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { Eyebrow, TextLink } from "@/components/primitives";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <PageTransition>
      <section className="shell flex min-h-[72vh] flex-col justify-between py-16 lg:py-24">
        <Eyebrow>404 / Frame missing</Eyebrow>
        <div className="editorial-grid gap-y-8">
          <h1 className="display-xl col-span-full lg:col-span-8">
            This frame is outside the cut<span className="text-primary">.</span>
          </h1>
          <div className="col-span-full lg:col-span-4 lg:col-start-9">
            <p className="mb-6 text-base leading-7 text-muted-foreground">
              The page may have moved, or the link may be incomplete.
            </p>
            <TextLink href="/">Return home</TextLink>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
