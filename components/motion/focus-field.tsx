"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Crosshair, ScanEye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FocusFieldTarget = Readonly<{
  title: string;
  meta: string;
  href: string;
}>;

type FocusFieldProps = Readonly<{
  homeMotion?: boolean;
  targets?: readonly FocusFieldTarget[];
}>;

const focusPoints = [
  { x: 68, y: 46 },
  { x: 34, y: 66 },
  { x: 72, y: 76 },
] as const;

export function FocusField({
  homeMotion = false,
  targets = [],
}: FocusFieldProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [shifted, setShifted] = useState(false);
  const [activeTargetIndex, setActiveTargetIndex] = useState(0);
  const visibleTargets = targets.slice(0, focusPoints.length);
  const safeActiveTargetIndex = Math.min(
    activeTargetIndex,
    Math.max(visibleTargets.length - 1, 0),
  );
  const activeTarget = visibleTargets[safeActiveTargetIndex];

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function applyFocus(x: number, y: number, allowReducedMotion = false) {
    if (prefersReducedMotion()) {
      if (allowReducedMotion && overlayRef.current) {
        overlayRef.current.style.clipPath = `circle(27% at ${x}% ${y}%)`;
      }
      return;
    }

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.style.clipPath = `circle(27% at ${x}% ${y}%)`;
      }
      frameRef.current = null;
    });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    applyFocus(
      Math.max(0, Math.min(100, x)),
      Math.max(0, Math.min(100, y)),
    );
  }

  function restoreActiveFocus() {
    if (activeTarget) {
      const point = focusPoints[safeActiveTargetIndex];
      applyFocus(point.x, point.y, true);
      return;
    }

    applyFocus(shifted ? 34 : 68, shifted ? 66 : 46, true);
  }

  function selectTarget(index: number) {
    const point = focusPoints[index];
    setActiveTargetIndex(index);
    applyFocus(point.x, point.y, true);
  }

  function shiftFocus() {
    const next = !shifted;
    setShifted(next);
    const x = next ? 34 : 68;
    const y = next ? 66 : 46;
    applyFocus(x, y, true);
  }

  return (
    <div className="focus-atlas relative">
      <div
        className={cn(
          "focus-atlas__viewport crop-frame relative aspect-[4/5] overflow-hidden border border-white/20 bg-[#151716] sm:aspect-[5/4]",
          homeMotion && "home-focus-field__art",
        )}
        onPointerMove={handlePointerMove}
        onPointerLeave={restoreActiveFocus}
      >
        <Image
          src="/art/focus-field-raw.svg"
          alt="Abstract raw composition made from offset frames and registration marks"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 42vw"
          className="object-cover"
        />
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="focus-field-resolved absolute inset-0"
        >
          <Image
            src="/art/focus-field-resolved.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-5 border border-white/15" />
        {homeMotion ? <span className="home-focus-field__scan" aria-hidden="true" /> : null}
        <div className="focus-atlas__label absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/78 px-2 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-white/70 uppercase backdrop-blur-sm">
          <Crosshair aria-hidden="true" className="size-3 text-primary" />
          Focus field / 01
        </div>
        <div className="focus-atlas__state absolute right-4 bottom-4 z-10 bg-black/78 px-2 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-white/70 uppercase backdrop-blur-sm">
          Raw → Resolved
        </div>

        {visibleTargets.length > 0 ? (
          <div
            className="focus-atlas__targets absolute inset-0 z-20"
            role="group"
            aria-label="Choose a project signal"
          >
            {visibleTargets.map((target, index) => {
              const point = focusPoints[index];
              const isActive = safeActiveTargetIndex === index;

              return (
                <button
                  key={`${target.href}-${index}`}
                  type="button"
                  aria-label={`Focus ${target.title}: ${target.meta}`}
                  aria-pressed={isActive}
                  data-active={isActive ? "" : undefined}
                  onClick={() => selectTarget(index)}
                  onFocus={() => selectTarget(index)}
                  className={cn(
                    "focus-atlas__target absolute grid size-11 place-items-center border font-mono text-[0.58rem] tracking-[0.08em] transition-[color,background-color,border-color,box-shadow] duration-150 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#151716]",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0.25rem_1rem_rgba(211,255,61,0.2)]"
                      : "border-white/35 bg-black/78 text-white hover:border-primary hover:text-primary",
                  )}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: "translate3d(-50%, -50%, 0)",
                  }}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="focus-atlas__controls mt-3 border-y border-white/15 py-3">
        <p className="focus-atlas__instruction flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.12em] text-white/55 uppercase">
          <ScanEye aria-hidden="true" className="size-3.5 text-primary" />
          Move to scan · Tap a signal
        </p>

        {activeTarget ? (
          <div
            className="focus-atlas__active mt-3 flex items-end justify-between gap-4"
            aria-live="polite"
          >
            <div className="min-w-0">
              <p className="font-mono text-[0.58rem] tracking-[0.12em] text-primary uppercase">
                Signal 0{safeActiveTargetIndex + 1}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-white">
                {activeTarget.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-white/55">
                {activeTarget.meta}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="focus-atlas__link h-9 shrink-0 rounded-none border-white/20 bg-transparent px-3 text-[0.62rem] tracking-[0.1em] text-white uppercase hover:bg-white/10 hover:text-white"
            >
              <Link href={activeTarget.href} prefetch={false}>
                Open case
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={shiftFocus}
            aria-pressed={shifted}
            className="focus-atlas__shift mt-3 h-11 rounded-none border-white/20 bg-transparent px-4 text-[0.7rem] tracking-[0.1em] text-white uppercase hover:bg-white/10 hover:text-white"
          >
            <ScanEye data-icon="inline-start" aria-hidden="true" />
            Shift focus
          </Button>
        )}
      </div>
    </div>
  );
}
