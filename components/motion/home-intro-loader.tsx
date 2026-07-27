"use client";

import { useEffect } from "react";

const introAttribute = "aeyeIntro";

export function HomeIntroLoader() {
  useEffect(() => {
    const root = document.documentElement;

    if (root.dataset[introAttribute] !== "run") return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.dataset[introAttribute] = "done";
    };

    const dismissOnKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") finish();
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dismissForReducedMotion = () => {
      if (reducedMotion.matches) finish();
    };

    window.setTimeout(finish, 1500);

    window.addEventListener("keydown", dismissOnKey, { capture: true });
    window.addEventListener("pointerdown", finish, { capture: true, passive: true });
    window.addEventListener("wheel", finish, { capture: true, passive: true });
    reducedMotion.addEventListener("change", dismissForReducedMotion);

    return () => {
      window.removeEventListener("keydown", dismissOnKey, { capture: true });
      window.removeEventListener("pointerdown", finish, { capture: true });
      window.removeEventListener("wheel", finish, { capture: true });
      reducedMotion.removeEventListener("change", dismissForReducedMotion);
    };
  }, []);

  return (
    <div className="home-intro" aria-hidden="true">
      <div className="home-intro__panel home-intro__panel--top" />
      <div className="home-intro__panel home-intro__panel--bottom" />
      <div className="home-intro__grid">
        <span className="home-intro__crop home-intro__crop--tl" />
        <span className="home-intro__crop home-intro__crop--tr" />
        <span className="home-intro__crop home-intro__crop--bl" />
        <span className="home-intro__crop home-intro__crop--br" />
        <span className="home-intro__aperture" aria-hidden="true">
          <span />
        </span>

        <div className="home-intro__identity">
          <p className="home-intro__kicker">Independent creative studio / 2026</p>
          <p className="home-intro__mark">
            A-Eye<span>.</span>
          </p>
          <div className="home-intro__track">
            <span className="home-intro__scan" />
          </div>
          <div className="home-intro__status">
            <span>Field / raw</span>
            <span>Signal acquired</span>
            <span>01: locked</span>
          </div>
        </div>

        <span className="home-intro__coordinate home-intro__coordinate--left">
          X 36.191 / Y 44.008
        </span>
        <span className="home-intro__coordinate home-intro__coordinate--right">
          Calibration / A-EYE
        </span>
      </div>
    </div>
  );
}
