"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";
const MESSAGE: Record<Status, string> = { idle: "", copied: "Copied", failed: "Select it to copy" };

/* A row that copies the address. The status text is announced to screen readers through the live region. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2400);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      // Clipboard access can be refused. The address stays visible on the page, so say so instead of failing silently.
      setStatus("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
      className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
    >
      <span className="min-w-0">
        <span className="block text-sm text-fg-faint">Email</span>
        <span className="mt-1 block break-words font-mono text-base tracking-tight text-fg group-hover:text-accent">{email}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-sm text-fg-muted print:hidden">
        <span role="status" aria-live="polite">
          {MESSAGE[status]}
        </span>
        {status === "copied" ? <CheckIcon size={20} weight="bold" /> : <CopyIcon size={20} />}
      </span>
    </button>
  );
}
