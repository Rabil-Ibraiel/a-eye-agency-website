import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/content";

export function ServiceIndex({ services }: { services: readonly Service[] }) {
  return (
    <div className="border-t border-border">
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          data-home-reveal=""
          className="service-link group editorial-grid min-h-40 items-start border-b border-border py-6 transition-colors duration-200 hover:bg-foreground/[0.035] focus-visible:bg-foreground/[0.035] lg:items-center"
        >
          <span className="home-service-row__number col-span-1 row-start-1 font-mono text-xs tracking-[0.13em] text-muted-foreground">
            0{index + 1}
          </span>
          <span className="home-service-row__title col-span-2 col-start-2 row-start-1 text-[clamp(1.5rem,2.8vw,3.25rem)] leading-[1.02] font-medium tracking-[-0.045em] md:col-span-6 md:col-start-2 lg:col-span-6">
            {service.title}
          </span>
          <span className="home-service-row__copy col-span-3 col-start-2 row-start-2 max-w-xl text-sm leading-6 text-muted-foreground md:col-span-7 md:col-start-2 lg:col-span-4 lg:col-start-8 lg:row-start-1">
            {service.shortDescription}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="home-service-row__arrow interactive-arrow col-start-4 row-start-1 size-5 justify-self-end transition-transform duration-[180ms] ease-[var(--ease-out)] md:col-start-8 lg:col-start-12"
          />
        </Link>
      ))}
    </div>
  );
}
