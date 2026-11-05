import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { StaggerRows } from "@/components/stagger-rows";
import { ScoreChart } from "@/components/score-chart";

// Half the container at the lg breakpoint and above, full width below it.
const VISUAL_SIZES = "(min-width: 1024px) 50vw, 100vw"; // ds-allow-hardcode

function Visual({ c }: { c: CaseStudy }) {
  if (c.image) {
    return (
      <figure className="overflow-hidden rounded-card bg-bg-tint">
        <figcaption className="flex items-center justify-between gap-4 border-b px-4 py-1 font-mono text-label text-fg-faint sm:px-5">
          <span className="whitespace-nowrap">{c.image.label}</span>
          {/* On a phone the capture is drawn small; the full file opens in a tab where it can be pinched. */}
          <a
            href={c.image.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full size: ${c.image.label} capture`}
            className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-fg-muted transition-colors hover:text-accent"
          >
            <span className="sm:hidden">Full size</span>
            <span className="hidden sm:inline">Open full size</span>
            <ArrowUpRightIcon size={14} />
          </a>
        </figcaption>
        <Image
          src={c.image.src}
          alt={c.image.alt}
          width={c.image.width}
          height={c.image.height}
          sizes={VISUAL_SIZES}
          className="h-auto w-full"
        />
        {c.image.note && <figcaption className="border-t px-4 py-2.5 text-label text-fg-faint sm:px-5">{c.image.note}</figcaption>}
      </figure>
    );
  }
  if (c.proof) {
    const p = c.proof;
    return (
      <figure className="flex flex-col overflow-hidden rounded-card bg-bg-tint">
        <figcaption className="flex items-center justify-between gap-4 border-b px-5 py-1 font-mono text-label text-fg-faint sm:px-8">
          <span>{p.title}</span>
          {c.link && (
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-fg-muted transition-colors hover:text-accent"
            >
              Source
              <ArrowUpRightIcon size={14} />
            </a>
          )}
        </figcaption>
        <div className="space-y-6 p-5 sm:p-8">
          <div>
            <p className="mb-3 font-mono text-label text-fg-faint">{p.caughtTitle}</p>
            <dl className="space-y-3 text-sm leading-relaxed">
              {p.caught.map((r) => (
                <div key={r.label} className="grid gap-0.5 sm:grid-cols-[6rem_1fr] sm:gap-4">
                  <dt className="font-mono text-fg-faint">{r.label}</dt>
                  <dd className="text-fg">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t pt-6">
            <p className="mb-3 font-mono text-label text-fg-faint">{p.chartTitle}</p>
            <ScoreChart scores={p.scores} label={p.chartTitle} />
          </div>
          <StaggerRows rows={p.checks} caret={false} className="space-y-3 border-t pt-6 font-mono text-sm leading-relaxed" />
        </div>
        <figcaption className="border-t px-5 py-3 text-label leading-relaxed text-fg-faint sm:px-8">{p.caption}</figcaption>
      </figure>
    );
  }
  if (c.excerpt) {
    return (
      <figure className="flex flex-col overflow-hidden rounded-card bg-bg-tint">
        <div className="border-b px-5 py-3 font-mono text-label text-fg-faint sm:px-8">{c.excerpt.title}</div>
        <div className="p-5 sm:p-8">
          <StaggerRows rows={c.excerpt.rows} className="space-y-3 font-mono text-sm leading-relaxed sm:text-base lg:space-y-4" />
        </div>
        <figcaption className="border-t px-5 py-3 text-label text-fg-faint sm:px-8">{c.excerpt.caption}</figcaption>
      </figure>
    );
  }
  return null;
}

function Title({ c, lead = false }: { c: CaseStudy; lead?: boolean }) {
  return (
    <h3 className={`mt-2 font-display font-normal leading-tight tracking-normal ${lead ? "text-4xl" : "text-3xl"}`}>
      {c.link && !c.proof ? (
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

/* The labels are plain text, not headings: twelve one-word headings would crowd the page outline. */
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 break-after-avoid font-mono text-label text-fg-faint">{label}</p>
      {children}
    </div>
  );
}

function Metric({ c, className = "", size }: { c: CaseStudy; className?: string; size: string }) {
  if (!c.metric) return null;
  return (
    <p className={`flex items-baseline gap-3 ${className}`}>
      <CountUp value={c.metric.value} className={`font-mono tracking-tight text-accent ${size}`} />
      <span className="text-sm text-fg-muted">{c.metric.label}</span>
    </p>
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
          <li key={s} className="whitespace-nowrap">
            {s}
          </li>
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
          <h2 className="font-display text-4xl tracking-normal [word-spacing:0.06em] md:text-6xl">Selected work</h2>
          <p className="mt-3 max-w-[60ch] text-fg-muted">
            Client names are withheld. I can walk through any of this in detail.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {caseStudies.map((c, i) => {
            const lead = i === 0;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                {/* Two columns from lg. Below that the card is one column so tablets keep readable measures. */}
                <article id={c.anchor} className="flex scroll-mt-24 flex-col rounded-card border bg-bg-raised p-6 sm:p-8 lg:grid lg:grid-cols-12 lg:gap-10">
                  <div className="flex max-w-[34rem] flex-col lg:col-span-5 lg:max-w-none">
                    <p className="text-sm text-fg-faint">{c.client}</p>
                    <Title c={c} lead={lead} />
                    {/* The lead card shows its number large under the capture from lg; below that it sits here. */}
                    <Metric c={c} size="text-4xl" className={`mt-4 ${lead ? "lg:hidden" : ""}`} />
                    <div className="flex flex-1 flex-col">
                      <Details c={c} />
                    </div>
                  </div>
                  <div
                    className={`mt-6 lg:top-24 lg:col-span-7 lg:mt-0 lg:self-start lg:tall:sticky ${
                      c.image ? "max-lg:order-first max-lg:mb-5 max-lg:mt-0" : ""
                    } ${i % 2 === 1 ? "lg:order-first" : ""}`}
                  >
                    <Visual c={c} />
                    {lead && <Metric c={c} size="text-7xl" className="mt-6 hidden lg:flex" />}
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
