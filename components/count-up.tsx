"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Counts up to a value like "300+" once it scrolls into view. The final text is the initial render, so it is correct without JS. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const hasNumber = match !== null;
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!hasNumber || reduce || !inView) return;
    setN(0);
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, hasNumber]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {n}
        {suffix}
      </span>
    </span>
  );
}
