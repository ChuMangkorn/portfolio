"use client";

import { useSyncExternalStore } from "react";
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { REPLAY_EVENT } from "@/components/run-gate";

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

/* Plays the run again for a reader who looked away. It only exists once the page is running in a browser that allows
   motion: there is nothing to replay without script or under reduced motion, and a dead button would be worse than none.
   The icon is small but the target is 44px; the negative margins keep it from making the panel header taller. */
export function ReplayButton({ label }: { label: string }) {
  const motionAllowed = useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(REDUCE).matches,
    () => false,
  );
  if (!motionAllowed) return null;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => document.dispatchEvent(new Event(REPLAY_EVENT))}
      className="-my-3 -mr-3 inline-flex h-11 w-11 items-center justify-center rounded-control text-fg-faint transition-colors hover:text-accent print:hidden"
    >
      <ArrowClockwiseIcon size={16} weight="bold" />
    </button>
  );
}
