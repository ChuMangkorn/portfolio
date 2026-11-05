"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onEngage } from "@/lib/reveal";

export const REPLAY_EVENT = "run:replay";

/* Wraps a part of the hero that plays once: the run. It plays at load, which is what a reader on a wide screen sees.
   A part that starts below the fold waits (data-run="wait") until it scrolls into view, so a phone reader does not
   miss it; while it waits it is inert, so a keyboard cannot land on something invisible. Nothing is held back before
   the reader's first scroll, so a renderer that never scrolls sees the finished state, and reduced motion never arms
   it. A replay or a late start sets data-soon, which skips the lead-in. The timing lives in globals.css. */
export function RunGate({
  as: Tag = "div",
  className = "",
  label,
  children,
}: {
  as?: "div" | "ol";
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  const el = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let observer: IntersectionObserver | undefined;
    const release = () => {
      observer?.disconnect();
      node.inert = false;
      node.dataset.soon = "";
      node.dataset.run = "play";
    };
    const hold = () => {
      observer?.disconnect();
      node.dataset.run = "wait";
      node.inert = true;
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) release();
        },
        { threshold: 0.35 },
      );
      observer.observe(node);
    };

    const stop = reduce.matches
      ? () => {}
      : onEngage(() => {
          // Mostly on screen at the first scroll: it has already played where the reader could see it.
          const box = node.getBoundingClientRect();
          const shown = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
          if (shown >= box.height * 0.35) return;
          hold();
        });

    const replay = () => {
      if (reduce.matches) return;
      observer?.disconnect();
      node.dataset.run = "wait";
      void node.offsetWidth; // commit the held state so the animations start again from the top
      release();
    };
    document.addEventListener(REPLAY_EVENT, replay);

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener(REPLAY_EVENT, replay);
    };
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        el.current = node;
      }}
      data-run="play"
      aria-label={label}
      className={`run ${className}`}
    >
      {children}
    </Tag>
  );
}
