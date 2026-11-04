import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Reveal } from "@/components/reveal";

// Half the container above the md breakpoint, full width below it.
const VISUAL_SIZES = "(min-width: 768px) 50vw, 100vw"; // ds-allow-hardcode

function Visual({ c, large = false }: { c: CaseStudy; large?: boolean }) {
  if (c.image) {
    return (
      <div className="overflow-hidden rounded-card border bg-bg-tint">
        <Image
          src={c.image.src}
          alt={c.image.alt}
          width={c.image.width}
          height={c.image.height}
          sizes={VISUAL_SIZES}
          className="h-auto w-full"
        />
      </div>
    );
  }
  if (c.excerpt) {
    return (
      <figure className="rounded-card border bg-bg-tint p-5">
        <pre tabIndex={0} className={`overflow-x-auto whitespace-pre font-mono leading-relaxed text-fg-muted ${large ? "text-sm" : "text-xs"}`}>
          {c.excerpt.lines.join("\n")}
        </pre>
        <figcaption className="mt-3 text-xs text-fg-faint">{c.excerpt.caption}</figcaption>
      </figure>
    );
  }
  return null;
}

function Title({ c }: { c: CaseStudy }) {
  return (
    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
      {c.link ? (
        <a href={c.link} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-accent">
          {c.title}
          <ArrowUpRightIcon size={18} className="mt-1 shrink-0" />
        </a>
      ) : (
        c.title
      )}
    </h3>
  );
}

function Details({ c }: { c: CaseStudy }) {
  return (
    <>
      <ul className="space-y-2 text-sm leading-relaxed text-fg">
        {c.work.map((w) => (
          <li key={w} className="flex gap-3">
            <span aria-hidden className="mt-[0.65rem] h-0.5 w-3 shrink-0 bg-accent" />
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
    </>
  );
}

export function Work() {
  return (
    <section id="work" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Work I have shipped</h2>
          <p className="mt-3 max-w-[60ch] text-fg-muted">
            Client names are left out on purpose. Ask me about any of these in an interview.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {caseStudies.map((c, i) => {
            const wide = i < 2;
            return (
              <Reveal key={c.title} delay={i * 0.06} className={wide ? "md:col-span-2" : undefined}>
                <article
                  className={`flex h-full flex-col rounded-card border bg-bg-raised p-6 sm:p-8 ${
                    wide ? "md:grid md:grid-cols-12 md:gap-10" : ""
                  }`}
                >
                  {wide ? (
                    <>
                      <div className="flex flex-col md:col-span-5">
                        <p className="text-sm text-fg-faint">{c.client}</p>
                        <Title c={c} />
                        <p className="mt-4 leading-relaxed text-fg-muted">{c.problem}</p>
                        <div className="mt-6 flex flex-1 flex-col">
                          <Details c={c} />
                        </div>
                      </div>
                      <div className="mt-6 md:col-span-7 md:mt-0">
                        <Visual c={c} large />
                      </div>
                    </>
                  ) : (
                    <>
                      <Visual c={c} />
                      <p className="mt-6 text-sm text-fg-faint">{c.client}</p>
                      <Title c={c} />
                      <p className="mt-4 leading-relaxed text-fg-muted">{c.problem}</p>
                      <div className="mt-6 flex flex-1 flex-col">
                        <Details c={c} />
                      </div>
                    </>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
