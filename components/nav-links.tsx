"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

/* Marks the section the reader is in. A thin band across the middle of the viewport decides which section counts as current. */
export function NavLinks({ links }: { links: NavLink[] }) {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Above the first section (the hero) nothing is current.
        setCurrent(ids.find((id) => inBand.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [links]);

  return (
    <ul className="flex items-center gap-2 text-xs text-fg-muted sm:gap-6 sm:text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            aria-current={current === l.href.slice(1) ? "location" : undefined}
            className="inline-flex min-h-11 items-center transition-colors hover:text-fg aria-[current=location]:text-accent"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
