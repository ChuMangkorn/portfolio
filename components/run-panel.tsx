import type { CSSProperties } from "react";
import { ArrowDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { buildScores, run } from "@/lib/data";
import { RunGate } from "@/components/run-gate";
import { ReplayButton } from "@/components/replay-button";

const FINAL = buildScores[buildScores.length - 1];

/* The reviewer's score, large, stepping through every round of the build and stopping on the last. The column holds
   all the scores one under another; the run slides it up one line at a time, from the second station to the last, so it
   lands as the amber line reaches the end. At rest it shows the final score. */
function Score() {
  return (
    <div>
      <p className="flex items-end gap-1.5">
        <span className="run-ticker run-ticker--score text-score text-accent">
          <span aria-hidden className="run-ticker-col" style={{ "--n": buildScores.length - 1 } as CSSProperties}>
            {buildScores.map((score, i) => (
              <span key={i}>{score.toFixed(1)}</span>
            ))}
          </span>
          <span className="sr-only">
            {FINAL.toFixed(1)} out of 10 after {buildScores.length} rounds
          </span>
        </span>
        <span aria-hidden className="pb-2 text-fg-faint">
          /10
        </span>
      </p>
      <p className="mt-0.5 text-fg-faint">{run.scoreLabel}</p>
    </div>
  );
}

/* A step that finishes: a dot while it works (drawn by the stylesheet, so it only exists during the run), a tick once it
   is done. At rest only the tick is left. */
function Done() {
  return (
    <span className="run-done relative inline-flex h-5 w-5 items-center justify-center">
      <CheckIcon aria-hidden size={14} weight="bold" className="run-check text-accent" />
      <span className="sr-only">done</span>
    </span>
  );
}

/* The hero's second act: how this page was made, as a short run that ends on the real final score. The score is the
   large number; three lines name who did the rest. Each line completes when the amber line reaches its stage. The
   layout answers to the panel's own width, so it works in a narrow column and in a wide one. The title links to the
   case study that holds the same numbers in full. */
export function RunPanel({ className = "" }: { className?: string }) {
  return (
    <RunGate className={`run-panel run-part @container rounded-card border bg-bg-raised px-4 pb-3 pt-2 font-mono text-label @max-[17rem]:text-xs ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b pb-1.5">
        <a
          href={run.link.href}
          aria-label={`${run.title}, ${run.link.label.toLowerCase()}`}
          className="-my-2.5 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-fg-muted transition-colors hover:text-accent"
        >
          {run.title}
          <ArrowDownIcon aria-hidden size={12} weight="bold" />
        </a>
        <ReplayButton label={run.replay} />
      </div>
      <div className="grid gap-x-4 gap-y-2.5 pt-3 @min-[17rem]:grid-cols-[auto_1fr] @min-[17rem]:items-center">
        <Score />
        <ul>
          {run.rows.map((row) => (
            <li
              key={row.who}
              style={{ "--s": row.stage } as CSSProperties}
              className="run-row grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-2"
            >
              <span className="text-fg-faint">{row.who}</span>
              <span className="text-fg-muted">{row.what}</span>
              <Done />
            </li>
          ))}
        </ul>
      </div>
    </RunGate>
  );
}
