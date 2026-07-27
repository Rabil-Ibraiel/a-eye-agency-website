import Image from "next/image";
import type { ProcessItem } from "@/types/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ProcessSteps({
  steps,
  homeMotion = false,
}: {
  steps: readonly ProcessItem[];
  homeMotion?: boolean;
}) {
  return (
    <div className="editorial-grid gap-y-12">
      <Reveal className={cn("col-span-full lg:col-span-6", homeMotion && "home-process__visual")}>
        <div className="crop-frame relative aspect-[4/3] overflow-hidden bg-card">
          <Image
            src="/art/process-perception-system.svg"
            alt="Five connected stages in the A-Eye creative process"
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="object-cover"
          />
          {homeMotion ? (
            <span className="home-process__focus" aria-hidden="true">
              <span />
            </span>
          ) : null}
        </div>
      </Reveal>
      <ol className="col-span-full border-t border-border lg:col-span-6 lg:col-start-7">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.number} delay={index * 0.05}>
            <div
              className={cn(
                "grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[3.5rem_9rem_1fr] sm:items-start",
                homeMotion && "home-process__step",
              )}
              data-home-reveal={homeMotion ? "" : undefined}
            >
              <span className="font-mono text-xs tracking-[0.12em] text-primary">
                {step.number}
              </span>
              <h3 className="text-xl leading-none font-medium tracking-[-0.04em] sm:text-2xl">
                {step.title}
              </h3>
              <p className="col-start-2 text-sm leading-6 text-muted-foreground sm:col-start-auto">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
