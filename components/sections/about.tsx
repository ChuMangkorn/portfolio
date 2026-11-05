import { about } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="border-t bg-bg-raised">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-x-12 md:gap-y-12 md:py-28">
        <Reveal className="md:col-span-12">
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">About</h2>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-7">
          <div className="max-w-[36rem] space-y-5 text-lg leading-relaxed text-fg-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5">
          <dl className="divide-y divide-line border-y">
            {about.ledger.map((row) => (
              <div key={row.key} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="text-sm text-fg-muted">{row.key}</dt>
                <dd className="text-right font-mono text-sm text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
