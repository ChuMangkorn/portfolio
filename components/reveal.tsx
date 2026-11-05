"use client";

import type { CSSProperties, ReactNode } from "react";
import { armReveal } from "@/lib/reveal";

/* Brings a block in as the reader reaches it. The delay staggers neighbours. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Tag ref={armReveal} data-reveal className={className} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
