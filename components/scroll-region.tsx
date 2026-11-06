"use client";

import { useEffect, useRef } from "react";

/* A box that scrolls sideways on a narrow screen and does not from sm up. It is written as a focusable, named region so a
   keyboard can scroll it, then loses those attributes whenever its content fits, so a wide screen has no focus stop that
   does nothing and no region that is announced as scrolling. Without script it keeps them, which is the safe side. A region
   that has focus keeps them until it loses it, so widening the window does not throw the reader's place to the top of the
   page. scripts/check-scroll-region.mjs holds all of this, and finds the box by data-scroll-region. */
export function ScrollRegion({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (el.scrollWidth > el.clientWidth + 1 || document.activeElement === el) {
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
    el.addEventListener("blur", update);
    return () => {
      observer.disconnect();
      el.removeEventListener("blur", update);
    };
  }, [label]);
  return (
    <div ref={ref} data-scroll-region="" tabIndex={0} role="region" aria-label={label} className={className}>
      {children}
    </div>
  );
}
