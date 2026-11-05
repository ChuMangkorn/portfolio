import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="font-mono text-sm text-fg-faint">404</p>
      <h1 className="mt-4 font-display text-6xl leading-[1.02] tracking-normal [word-spacing:0.06em] sm:text-7xl">
        That page is not here.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-fg-muted">
        This portfolio is a single page, so everything lives at the top level.
      </p>
      <div className="mt-9">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-transform hover:brightness-105 active:scale-[0.98]"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
