"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import type { ProjectCardData } from "@/components/project-card";

type StoryScene = ComponentType<{
  projects: readonly ProjectCardData[];
}>;

const desktopMotionQuery =
  "(min-width: 64rem) and (min-height: 45rem) and (prefers-reduced-motion: no-preference)";

export function FeaturedWorkScrollStory({
  projects,
  children,
}: {
  projects: readonly ProjectCardData[];
  children: ReactNode;
}) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const hasEnoughProjects = projects.length >= 3;
  const [StoryScene, setStoryScene] = useState<StoryScene | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!hasEnoughProjects) return;

    const eligibility = window.matchMedia(desktopMotionQuery);
    let cancelled = false;
    let nearViewport = false;
    let scenePromise: Promise<StoryScene> | null = null;

    const updateExperience = () => {
      if (!eligibility.matches) {
        setStoryScene(null);
        setLoadFailed(false);
        return;
      }

      if (!nearViewport) return;

      scenePromise ??= import("@/components/motion/featured-work-scroll-scene").then(
        (module) => module.FeaturedWorkScrollScene,
      );

      void scenePromise.then((Scene) => {
        if (!cancelled && eligibility.matches) {
          const top = sequenceRef.current?.getBoundingClientRect().top;
          const canSwapWithoutJump = top === undefined || top >= window.innerHeight + 32;

          if (canSwapWithoutJump) {
            setStoryScene(() => Scene);
          } else {
            setLoadFailed(true);
          }
        }
      }).catch(() => {
        if (!cancelled && eligibility.matches) {
          setLoadFailed(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        nearViewport = true;
        observer.disconnect();
        updateExperience();
      },
      { rootMargin: "0px 0px 360px 0px" },
    );

    if (sequenceRef.current) observer.observe(sequenceRef.current);
    eligibility.addEventListener("change", updateExperience);

    return () => {
      cancelled = true;
      observer.disconnect();
      eligibility.removeEventListener("change", updateExperience);
    };
  }, [hasEnoughProjects]);

  return (
    <div
      ref={sequenceRef}
      className="featured-work-sequence"
      data-enhanced={StoryScene ? "true" : undefined}
      data-fallback={loadFailed ? "true" : undefined}
    >
      {StoryScene ? null : <div className="featured-work-static">{children}</div>}
      {StoryScene ? <StoryScene projects={projects} /> : null}
      <noscript>
        <style>{`.featured-work-sequence{min-height:0!important}.featured-work-static{display:block!important}`}</style>
      </noscript>
    </div>
  );
}
