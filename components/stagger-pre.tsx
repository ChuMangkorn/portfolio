"use client";

import { motion, useReducedMotion } from "motion/react";

/* Monospace block whose lines appear one after another when it scrolls into view, like a log being written. */
export function StaggerPre({ lines, className }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.pre
      tabIndex={0}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: reduce ? 0 : 0.22, delayChildren: 0.15 }}
    >
      {lines.map((line, i) => (
        <motion.span
          key={line}
          data-reveal
          className="block"
          variants={{
            hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -8 },
            shown: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
          {i === lines.length - 1 && <span aria-hidden className="caret" />}
        </motion.span>
      ))}
    </motion.pre>
  );
}
