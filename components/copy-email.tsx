"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

/* A row that copies the address. The status text is announced to screen readers through the live region. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be refused; the address stays visible and selectable on the page.
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
          {copied ? "Copied" : ""}
        </span>
        {copied ? <CheckIcon size={20} weight="bold" /> : <CopyIcon size={20} />}
      </span>
    </button>
  );
}
