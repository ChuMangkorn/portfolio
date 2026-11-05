"use client";

import type { CSSProperties } from "react";
import type { ExcerptRow } from "@/lib/data";
import { armReveal } from "@/lib/reveal";

/* The caret sits in a no-wrap span with the final word, so it can never wrap onto a line of its own. */
function LastWords({ value }: { value: string }) {
  const cut = value.lastIndexOf(" ") + 1;
  return (
    <>
      {value.slice(0, cut)}
      <span className="whitespace-nowrap">
        {value.slice(cut)}
        <span aria-hidden className="caret" />
      </span>
    </>
  );
}

/* Label and value rows that appear one after another as the block scrolls into view. Stacked on narrow screens so
   nothing is cut off. The timing lives in globals.css; each row only says which place in the order it holds. */
export function StaggerRows({ rows, className }: { rows: ExcerptRow[]; className?: string }) {
  return (
    <dl ref={armReveal} className={className} style={{ "--rows": rows.length } as CSSProperties}>
      {rows.map((row, i) => (
        <div
          key={row.label}
          data-row
          style={{ "--i": i } as CSSProperties}
          className="grid gap-0.5 md:grid-cols-[11rem_1fr] md:gap-6"
        >
          <dt className="text-fg-faint">{row.label}</dt>
          <dd className="text-fg-muted">{i === rows.length - 1 ? <LastWords value={row.value} /> : row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
