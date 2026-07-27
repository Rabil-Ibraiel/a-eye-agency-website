import type { CaseStudyModule } from "@/types/content";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/motion/reveal";

export function CaseStudyRenderer({ modules }: { modules: readonly CaseStudyModule[] }) {
  return (
    <div className="flex flex-col gap-14 lg:gap-20">
      {modules.map((module, index) => {
        if (module.type === "full-media") {
          return (
            <Reveal key={`${module.type}-${index}`}>
              <ProjectMedia media={module.media} className="aspect-[16/10]" />
              {module.media.caption ? (
                <p className="mt-3 font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {module.media.caption}
                </p>
              ) : null}
            </Reveal>
          );
        }

        if (module.type === "media-pair") {
          return (
            <div key={`${module.type}-${index}`} className="grid gap-5 md:grid-cols-2">
              {module.media.map((media, mediaIndex) => (
                <Reveal key={`${media.type}-${mediaIndex}`} delay={mediaIndex * 0.06}>
                  <ProjectMedia media={media} className="aspect-[16/10]" />
                  {media.caption ? (
                    <p className="mt-3 font-mono text-[0.6rem] leading-5 tracking-[0.12em] text-muted-foreground uppercase">
                      {media.caption}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          );
        }

        if (module.type === "before-after") {
          return (
            <div key={`${module.type}-${index}`} className="grid gap-5 md:grid-cols-2">
              {[
                { media: module.before, label: module.beforeLabel },
                { media: module.after, label: module.afterLabel },
              ].map((item, itemIndex) => (
                <Reveal key={item.label} delay={itemIndex * 0.06}>
                  <p className="mb-3 font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <ProjectMedia media={item.media} className="aspect-[16/10]" />
                  {item.media.caption ? (
                    <p className="mt-3 font-mono text-[0.6rem] leading-5 tracking-[0.12em] text-muted-foreground uppercase">
                      {item.media.caption}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          );
        }

        if (module.type === "pull-quote") {
          return (
            <Reveal key={`${module.type}-${index}`} className="editorial-grid">
              <blockquote className="col-span-full border-l border-primary pl-6 text-[clamp(1.75rem,3.5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.045em] lg:col-span-8 lg:col-start-3">
                “{module.quote}”
                {module.attribution ? (
                  <footer className="mt-6 font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {module.attribution}
                  </footer>
                ) : null}
              </blockquote>
            </Reveal>
          );
        }

        if (module.type === "process") {
          return (
            <Reveal key={`${module.type}-${index}`}>
              <h2 className="display-md max-w-4xl">{module.heading}</h2>
              <ol className="mt-10 grid border-t border-border md:grid-cols-3">
                {module.steps.map((step) => (
                  <li key={step.number} className="border-b border-border py-6 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-primary">
                      {step.number}
                    </span>
                    <h3 className="mt-8 text-2xl font-medium tracking-[-0.045em]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          );
        }

        return (
          <Reveal key={`${module.type}-${index}`} className="paper-section p-6 sm:p-8 lg:p-10">
            <div className="editorial-grid gap-y-8">
              <div className="col-span-full lg:col-span-6">
                <h2 className="display-md">{module.heading}</h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                  {module.description}
                </p>
              </div>
              <div className="col-span-full grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
                {module.swatches.map((swatch) => (
                  <div key={swatch.name} className="border border-border p-3">
                    <div className="aspect-[3/2] border border-black/10" style={{ backgroundColor: swatch.value }} />
                    <p className="mt-3 font-mono text-[0.62rem] tracking-[0.12em] uppercase">
                      {swatch.name} / {swatch.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
