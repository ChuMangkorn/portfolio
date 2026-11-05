"use client";

import { useEffect, useRef } from "react";
import { onEngage } from "@/lib/reveal";

const DURATION_MS = 1400;
// Fast start, long settle, like the easing used by the reveals.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/* Counts up to a value like "300+" once it scrolls into view. The final text is in the HTML. It is reset to zero only
   after the reader starts scrolling, and only if it is still below the fold, so nobody sees it jump. The number is
   written to the DOM directly: one text node changing 84 times needs no re-render. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const hasNumber = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasNumber) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let observer: IntersectionObserver | undefined;
    // Printing or saving as PDF must never catch a number mid-count (or still at zero): settle on the real value.
    const settle = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
    window.addEventListener("beforeprint", settle);
    const stop = onEngage(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: keep the final value
      el.textContent = `0${suffix}`;
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION_MS, 1);
            el.textContent = `${Math.round(target * easeOut(progress))}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.6 },
      );
      observer.observe(el);
    });
    return () => {
      window.removeEventListener("beforeprint", settle);
      stop();
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, target, suffix, hasNumber]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  );
}
