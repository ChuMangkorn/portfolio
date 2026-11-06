import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import { about } from "@/lib/data";
import { Reveal } from "@/components/reveal";

/* Facts only. The story is in the hero, the work and Experience; a paragraph here repeated them. */
export function About() {
  return (
    <section id="about" className="border-t bg-bg-raised">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-x-12 md:py-28">
        <Reveal className="md:col-span-12">
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">About</h2>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-7">
          <dl className="divide-y divide-line border-y">
            {about.ledger.map((row) => (
              <div key={row.key} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <dt className="text-sm text-fg-muted">{row.key}</dt>
                <dd className="text-right font-mono text-sm text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={about.proofLink.href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-base text-fg underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
          >
            {about.proofLink.label}
            <ArrowDownIcon size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
