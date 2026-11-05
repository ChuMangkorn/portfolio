import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { StaggerRows } from "@/components/stagger-rows";

// Half the container above the md breakpoint, full width below it.
const VISUAL_SIZES = "(min-width: 768px) 50vw, 100vw"; // ds-allow-hardcode

function Visual({ c }: { c: CaseStudy }) {
  if (c.image) {
    return (
      <figure className="overflow-hidden rounded-card bg-bg-tint">
        <figcaption className="flex items-center justify-between gap-4 border-b px-4 py-2.5 font-mono text-label text-fg-faint md:px-5">
          {c.image.label}
          {/* On a phone the capture is drawn small; the full file opens in a tab where it can be pinched. */}
          <a
            href={c.image.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the ${c.image.label} capture at full size`}
            className="inline-flex min-h-11 items-center gap-1 text-fg-muted transition-colors hover:text-accent"
          >
            Open full size
            <ArrowUpRightIcon size={14} />
          </a>
        </figcaption>
        <div className="p-3 md:p-4">
          <Image
            src={c.image.src}
            alt={c.image.alt}
            width={c.image.width}
            height={c.image.height}
            sizes={VISUAL_SIZES}
            className="h-auto w-full rounded-control"
          />
        </div>
      </figure>
    );
  }
  if (c.excerpt) {
    return (
      <figure className="flex flex-col overflow-hidden rounded-card bg-bg-tint">
        <div className="border-b px-5 py-3 font-mono text-label text-fg-faint md:px-8">{c.excerpt.title}</div>
        <div className="p-5 md:p-8">
          <StaggerRows rows={c.excerpt.rows} className="space-y-3 font-mono text-sm leading-relaxed md:space-y-4 md:text-base" />
        </div>
        <figcaption className="border-t px-5 py-3 text-label text-fg-faint md:px-8">{c.excerpt.caption}</figcaption>
      </figure>
    );
  }
  return null;
}

function Title({ c, lead = false }: { c: CaseStudy; lead?: boolean }) {
  return (
    <h3 className={`mt-2 font-display font-normal leading-tight tracking-normal ${lead ? "text-4xl" : "text-3xl"}`}>
      {c.link ? (
        <a href={c.link} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-accent">
          {c.title}
          <ArrowUpRightIcon size={20} className="mt-1.5 shrink-0" />
        </a>
      ) : (
        c.title
      )}
    </h3>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h4 className="mb-2 font-mono text-label text-fg-faint">{label}</h4>
      {children}
    </div>
  );
}

function Details({ c }: { c: CaseStudy }) {
  return (
    <>
      <Block label="brief">
        <p className="leading-relaxed text-fg-muted">{c.problem}</p>
      </Block>
      <Block label="built">
        <ul className="space-y-2 leading-relaxed text-fg">
          {c.work.map((w) => (
            <li key={w} className="flex gap-3">
              <span aria-hidden className="mt-[0.7rem] h-0.5 w-3 shrink-0 bg-accent" />
              {w}
            </li>
          ))}
        </ul>
      </Block>
      <Block label="result">
        <p className="leading-relaxed text-fg">{c.outcome}</p>
      </Block>
      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 font-mono text-label text-fg-faint">
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
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">Work I have shipped</h2>
          <p className="mt-3 max-w-[60ch] text-fg-muted">
            Client names are withheld. I can walk through any of this in detail.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="flex flex-col rounded-card border bg-bg-raised p-6 sm:p-8 md:grid md:grid-cols-12 md:gap-10">
                <div className="flex flex-col md:col-span-5">
                  <p className="text-sm text-fg-faint">{c.client}</p>
                  <Title c={c} lead={i === 0} />
                  {c.metric && (
                    <p className="mt-4 flex items-baseline gap-3">
                      <CountUp value={c.metric.value} className="font-mono text-4xl tracking-tight text-accent" />
                      <span className="text-sm text-fg-muted">{c.metric.label}</span>
                    </p>
                  )}
                  <div className="flex flex-1 flex-col">
                    <Details c={c} />
                  </div>
                </div>
                <div
                  className={`mt-6 md:sticky md:top-24 md:col-span-7 md:mt-0 md:self-start ${
                    c.image ? "max-md:order-first max-md:mb-5 max-md:mt-0" : ""
                  } ${i % 2 === 1 ? "md:order-first" : ""}`}
                >
                  <Visual c={c} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
