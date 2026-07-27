"use client";

import { useLayoutEffect } from "react";

const revealSelector = "[data-home-reveal]";

export function HomeMotionController() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: Array<() => void> = [];
    const orientationLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-home-orientation-link]"),
    );
    const orientationSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-home-section]"),
    );

    if (orientationLinks.length && orientationSections.length) {
      const setCurrentSection = (sectionId: string) => {
        for (const link of orientationLinks) {
          const isCurrent =
            link.dataset.homeOrientationLink === sectionId;
          if (isCurrent) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      };
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          if (current) {
            const sectionId = (current.target as HTMLElement).dataset.homeSection;
            if (sectionId) setCurrentSection(sectionId);
          }
        },
        {
          rootMargin: "-42% 0px -48% 0px",
          threshold: 0,
        },
      );

      orientationSections.forEach((section) => sectionObserver.observe(section));
      cleanups.push(() => sectionObserver.disconnect());
    }

    if (reducedMotion.matches) {
      return () => cleanups.forEach((cleanup) => cleanup());
    }

    root.classList.add("home-motion-enabled");

    const supportsViewTimelines =
      CSS.supports("animation-timeline: view()") &&
      CSS.supports("animation-range: entry 0% cover 32%");
    const supportsScrollTimelines = CSS.supports("animation-timeline: scroll()");
    if (supportsViewTimelines) {
      root.classList.add("home-view-timelines");
    } else {
      root.classList.add("home-motion-fallback");

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-home-visible");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      document.querySelectorAll(revealSelector).forEach((element) => {
        observer.observe(element);
      });

      cleanups.push(() => observer.disconnect());
    }

    if (!supportsScrollTimelines) {
      const progress = document.querySelector<HTMLElement>(".home-scroll-progress");

      if (progress) {
        let frame = 0;
        const updateProgress = () => {
          frame = 0;
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const value = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
          progress.style.transform = `scaleX(${value})`;
        };
        const requestUpdate = () => {
          if (!frame) frame = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate, { passive: true });
        cleanups.push(() => {
          window.removeEventListener("scroll", requestUpdate);
          window.removeEventListener("resize", requestUpdate);
          if (frame) window.cancelAnimationFrame(frame);
        });
      }
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove(
        "home-motion-enabled",
        "home-view-timelines",
        "home-motion-fallback",
      );
    };
  }, []);

  return null;
}
