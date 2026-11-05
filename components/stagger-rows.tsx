"use client";

import { motion, useReducedMotion } from "motion/react";

type Row = { label: string; value: string };

/* Label and value rows that appear one after another when scrolled into view. Stacked on narrow screens so nothing is cut off. */
export function StaggerRows({ rows, className }: { rows: Row[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.dl
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: reduce ? 0 : 0.18, delayChildren: 0.15 }}
    >
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          data-reveal
          className="grid gap-0.5 md:grid-cols-[11rem_1fr] md:gap-6"
          variants={{
            hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -8 },
            shown: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <dt className="text-fg-faint">{row.label}</dt>
          <dd className="text-fg-muted">
            {row.value}
            {i === rows.length - 1 && <span aria-hidden className="caret" />}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
