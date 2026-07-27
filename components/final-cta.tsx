import { Eyebrow, TextLink } from "@/components/primitives";
import { cn } from "@/lib/utils";

export function FinalCta({
  eyebrow,
  heading,
  description,
  label,
  href = "/contact",
  homeMotion = false,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  label: string;
  href?: string;
  homeMotion?: boolean;
}) {
  return (
    <section
      className={cn(
        "paper-section section-space border-t border-border",
        homeMotion && "home-final-cta",
      )}
    >
      {homeMotion ? <span className="home-final-cta__cover" aria-hidden="true" /> : null}
      {homeMotion ? <span className="home-final-cta__lock" aria-hidden="true">01: LOCKED</span> : null}
      <div
        className="shell editorial-grid relative z-10 items-start gap-y-8"
        data-home-reveal={homeMotion ? "" : undefined}
      >
        <Eyebrow className="col-span-full md:col-span-2 lg:col-span-2">{eyebrow}</Eyebrow>
        <div className="col-span-full md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3">
          <h2 className="display-lg">{heading}</h2>
        </div>
        <div className="col-span-full flex h-full flex-col items-start md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9">
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <TextLink href={href} className="mt-8">
            {label}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
