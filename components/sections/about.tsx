import { about } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-fg-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {about.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-snug text-fg-muted">{s.label}</dt>
                <dd className="font-mono text-4xl tracking-tight text-fg md:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
