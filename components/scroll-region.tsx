"use client";

import { useEffect, useRef } from "react";

/* A box that scrolls sideways on a narrow screen and does not from sm up. It is written as a focusable, named region so a
   keyboard can scroll it, then loses those attributes whenever its content fits, so a wide screen has no focus stop that
   does nothing and no region that is announced as scrolling. Without script it keeps them, which is the safe side. */
export function ScrollRegion({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (el.scrollWidth > el.clientWidth + 1) {
        el.tabIndex = 0;
        el.setAttribute("role", "region");
        el.setAttribute("aria-label", label);
      } else {
        el.removeAttribute("tabindex");
        el.removeAttribute("role");
        el.removeAttribute("aria-label");
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [label]);
  return (
    <div ref={ref} tabIndex={0} role="region" aria-label={label} className={className}>
      {children}
    </div>
  );
}
