import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Reveal } from "@/components/reveal";

/* Each case study gets its own tinted surface so the grid is not four identical text cards. */
const tones: Record<CaseStudy["tone"], string> = {
  a: "bg-[linear-gradient(135deg,#1b1a16_0%,#141418_60%)]",
  b: "bg-[linear-gradient(135deg,#151a1c_0%,#141418_60%)]",
  c: "bg-[linear-gradient(135deg,#1a1620_0%,#141418_60%)]",
  d: "bg-[linear-gradient(135deg,#1a1716_0%,#141418_60%)]",
};

export function Work() {
  return (
    <section id="work" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Selected work</h2>
          <p className="mt-3 max-w-[60ch] text-fg-muted">
            Client names are left out on purpose. Ask me about any of these in an interview.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {caseStudies.map((c, i) => {
            const wide = i === 0 || i === caseStudies.length - 1;
            return (
            <Reveal
              key={c.title}
              delay={(i % 2) * 0.08}
              className={wide ? "md:col-span-2" : undefined}
            >
              <article
                className={`flex h-full flex-col rounded-card border p-6 sm:p-8 ${tones[c.tone]} ${
                  wide ? "md:grid md:grid-cols-12 md:gap-10" : ""
                }`}
              >
                <div className={wide ? "md:col-span-5" : ""}>
                  <p className="text-sm text-fg-faint">{c.client}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
                    {c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1 hover:text-accent"
                      >
                        {c.title}
                        <ArrowUpRightIcon size={18} className="mt-1 shrink-0" />
                      </a>
                    ) : (
                      c.title
                    )}
                  </h3>
                  <p className="mt-4 leading-relaxed text-fg-muted">{c.problem}</p>
                </div>

                <div className={`mt-6 flex flex-1 flex-col ${wide ? "md:col-span-7 md:mt-0" : ""}`}>
                  <ul className="space-y-2 text-sm leading-relaxed text-fg">
                    {c.work.map((w) => (
                      <li key={w} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        {w}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-fg-muted">{c.outcome}</p>
                  <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 font-mono text-xs text-fg-faint">
                    {c.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
