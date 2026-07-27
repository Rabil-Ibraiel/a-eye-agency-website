"use client";

import { useLayoutEffect } from "react";

const revealSelector = "[data-scroll-reveal]";
const visibleClass = "is-scroll-reveal-visible";

export function ScrollRevealController() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("scroll-reveal-enabled");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(visibleClass);
          revealObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const observeTree = (node: Node) => {
      if (!(node instanceof Element)) return;

      if (node.matches(revealSelector) && !node.classList.contains(visibleClass)) {
        revealObserver.observe(node);
      }

      node.querySelectorAll(revealSelector).forEach((element) => {
        if (!element.classList.contains(visibleClass)) {
          revealObserver.observe(element);
        }
      });
    };

    document.querySelectorAll(revealSelector).forEach((element) => {
      revealObserver.observe(element);
    });

    const contentRoot = document.querySelector("#main-content") ?? document.body;
    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach(observeTree);
      }
    });

    mutationObserver.observe(contentRoot, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      root.classList.remove("scroll-reveal-enabled");
    };
  }, []);

  return null;
}
