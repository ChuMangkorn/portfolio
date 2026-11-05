"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ExcerptRow } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";

/* The caret sits in a no-wrap span with the final word, so it can never wrap onto a line of its own. */
function LastWords({ value, landed }: { value: string; landed: boolean }) {
  const cut = value.lastIndexOf(" ") + 1;
  return (
    <>
      {value.slice(0, cut)}
      <span className="whitespace-nowrap">
        {value.slice(cut)}
        {landed && <span aria-hidden className="caret" />}
      </span>
    </>
  );
}

/* Label and value rows that appear one after another when scrolled into view. Stacked on narrow screens so nothing is cut off.
   The caret is added once the last row has landed, so its blinking is the part a reader actually sees. */
export function StaggerRows({ rows, className }: { rows: ExcerptRow[]; className?: string }) {
  const reduce = useReducedMotion();
  const [landed, setLanded] = useState(false);
  return (
    <motion.dl
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: reduce ? 0 : 0.18, delayChildren: 0.15 }}
    >
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <motion.div
            key={row.label}
            data-reveal
            className="grid gap-0.5 md:grid-cols-[11rem_1fr] md:gap-6"
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -8 },
              shown: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            onAnimationComplete={last ? () => setLanded(true) : undefined}
          >
            <dt className="text-fg-faint">{row.label}</dt>
            <dd className="text-fg-muted">
              {last ? <LastWords value={row.value} landed={landed} /> : row.value}
            </dd>
          </motion.div>
        );
      })}
    </motion.dl>
  );
}
