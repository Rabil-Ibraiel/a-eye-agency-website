"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ProjectMedia } from "@/components/project-media";
import type { ProjectCardData } from "@/components/project-card";

export function FeaturedWorkScrollScene({
  projects,
}: {
  projects: readonly ProjectCardData[];
}) {
  const storyRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const mapStops = [0, 0.25, 0.4, 0.59, 0.74, 1];
  const firstX = useTransform(
    scrollYProgress,
    mapStops,
    ["0%", "0%", "-40%", "-40%", "-40%", "-40%"],
  );
  const firstY = useTransform(
    scrollYProgress,
    mapStops,
    ["0%", "0%", "-31%", "-31%", "-31%", "-31%"],
  );
  const firstScale = useTransform(
    scrollYProgress,
    mapStops,
    [0.72, 0.72, 0.18, 0.18, 0.18, 0.18],
  );
  const firstOpacity = useTransform(
    scrollYProgress,
    mapStops,
    [1, 1, 0.58, 0.58, 0.48, 0.48],
  );

  const secondX = useTransform(
    scrollYProgress,
    mapStops,
    ["40%", "40%", "0%", "0%", "-40%", "-40%"],
  );
  const secondY = useTransform(
    scrollYProgress,
    mapStops,
    ["-31%", "-31%", "0%", "0%", "31%", "31%"],
  );
  const secondScale = useTransform(
    scrollYProgress,
    mapStops,
    [0.18, 0.18, 0.72, 0.72, 0.18, 0.18],
  );
  const secondOpacity = useTransform(
    scrollYProgress,
    mapStops,
    [0.58, 0.58, 1, 1, 0.58, 0.58],
  );

  const thirdX = useTransform(
    scrollYProgress,
    mapStops,
    ["40%", "40%", "40%", "40%", "0%", "0%"],
  );
  const thirdY = useTransform(
    scrollYProgress,
    mapStops,
    ["31%", "31%", "31%", "31%", "0%", "0%"],
  );
  const thirdScale = useTransform(
    scrollYProgress,
    mapStops,
    [0.18, 0.18, 0.18, 0.18, 0.72, 0.72],
  );
  const thirdOpacity = useTransform(
    scrollYProgress,
    mapStops,
    [0.48, 0.48, 0.58, 0.58, 1, 1],
  );

  const scanX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.59, 0.74, 1],
    ["-52%", "52%", "-52%", "52%", "-52%", "52%"],
  );
  const progressTransform = useMotionTemplate`scaleY(${scrollYProgress})`;
  const firstTransform = useMotionTemplate`translate3d(${firstX}, ${firstY}, 0) scale(${firstScale})`;
  const secondTransform = useMotionTemplate`translate3d(${secondX}, ${secondY}, 0) scale(${secondScale})`;
  const thirdTransform = useMotionTemplate`translate3d(${thirdX}, ${thirdY}, 0) scale(${thirdScale})`;
  const scanTransform = useMotionTemplate`translate3d(${scanX}, 0, 0)`;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (shouldReduceMotion) return;

    const currentIndex = activeIndexRef.current;
    let nextIndex = currentIndex;

    if (currentIndex === 0) {
      if (progress >= 0.675) nextIndex = 2;
      else if (progress >= 0.335) nextIndex = 1;
    } else if (currentIndex === 1) {
      if (progress < 0.305) nextIndex = 0;
      else if (progress >= 0.675) nextIndex = 2;
    } else {
      if (progress < 0.305) nextIndex = 0;
      else if (progress < 0.645) nextIndex = 1;
    }

    if (nextIndex !== currentIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  if (projects.length < 3) return null;

  const visibleProjects = projects.slice(0, 3);
  const activeProject = visibleProjects[activeIndex];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={storyRef}
        className="featured-work-story"
        aria-label="Selected fictional projects"
      >
        <div className="featured-work-sticky">
          <div className="featured-work-story-grid">
            <div className="featured-work-rail">
              <div>
                <div className="featured-work-progress" aria-hidden="true">
                  <span className="featured-work-progress-track">
                    <motion.span
                      className="featured-work-progress-fill"
                      style={{ transform: progressTransform }}
                    />
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                    Scroll to shift focus
                  </span>
                </div>

                <nav
                  className="featured-work-project-index"
                  aria-label="Open a selected project"
                >
                  <span
                    className="font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase"
                    aria-hidden="true"
                  >
                    Open
                  </span>
                  <div className="featured-work-index-links">
                    {visibleProjects.map((project, index) => (
                      <Link
                        key={project.slug}
                        href={`/work/${project.slug}`}
                        aria-label={`View ${project.title}`}
                        aria-current={activeIndex === index ? "true" : undefined}
                        className="featured-work-index-link"
                      >
                        0{index + 1}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="featured-work-copy-stack">
                <AnimatePresence initial={false}>
                  <motion.article
                    key={activeProject.slug}
                    className="featured-work-copy"
                    initial={{
                      opacity: 0,
                      transform: "translate3d(0, 0.5rem, 0)",
                    }}
                    animate={{
                      opacity: 1,
                      transform: "translate3d(0, 0, 0)",
                    }}
                    exit={{
                      opacity: 0,
                      transform: "translate3d(0, -0.375rem, 0)",
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="font-mono text-xs tracking-[0.13em] text-primary uppercase">
                      0{activeIndex + 1} / 03
                    </p>
                    <p className="mt-5 font-mono text-[0.68rem] leading-5 tracking-[0.13em] text-muted-foreground uppercase">
                      {activeProject.conceptBrand
                        ? `${activeProject.conceptBrand} / ${activeProject.publicLabel}`
                        : activeProject.publicLabel}
                    </p>
                    <h3 className="mt-3 text-[clamp(2rem,3.2vw,3.75rem)] leading-[0.96] font-medium tracking-[-0.05em]">
                      {activeProject.title}
                    </h3>
                    <p className="mt-5 max-w-[32ch] text-sm leading-6 text-muted-foreground">
                      {activeProject.cardDescription}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            <div className="featured-work-stage crop-frame">
              <div className="featured-work-coordinate-grid" aria-hidden="true" />
              <span className="featured-work-field-signal" aria-hidden="true">
                <span />
              </span>

              <motion.div
                className="featured-work-plane"
                data-active={activeIndex === 0 ? "true" : "false"}
                style={{
                  opacity: firstOpacity,
                  transform: firstTransform,
                }}
                aria-hidden="true"
              >
                <ProjectMedia
                  media={visibleProjects[0].heroMedia}
                  sizes="(min-width: 1024px) 75vw, 100vw"
                  className="h-full w-full"
                />
                <span className="featured-work-plane-tag">01 / SIGNAL</span>
              </motion.div>

              <motion.div
                className="featured-work-plane"
                data-active={activeIndex === 1 ? "true" : "false"}
                style={{
                  opacity: secondOpacity,
                  transform: secondTransform,
                }}
                aria-hidden="true"
              >
                <ProjectMedia
                  media={visibleProjects[1].heroMedia}
                  sizes="(min-width: 1024px) 75vw, 100vw"
                  className="h-full w-full"
                />
                <span className="featured-work-plane-tag">02 / SIGNAL</span>
              </motion.div>

              <motion.div
                className="featured-work-plane"
                data-active={activeIndex === 2 ? "true" : "false"}
                style={{
                  opacity: thirdOpacity,
                  transform: thirdTransform,
                }}
                aria-hidden="true"
              >
                <ProjectMedia
                  media={visibleProjects[2].heroMedia}
                  sizes="(min-width: 1024px) 75vw, 100vw"
                  className="h-full w-full"
                />
                <span className="featured-work-plane-tag">03 / SIGNAL</span>
              </motion.div>

              <motion.span
                className="featured-work-scan-line"
                style={{ transform: scanTransform }}
                aria-hidden="true"
              />

              <div className="featured-work-stage-chrome" aria-hidden="true">
                <span>A-EYE / FOCUS RELAY</span>
                <span>
                  0{activeIndex + 1} / {activeProject.publicLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
