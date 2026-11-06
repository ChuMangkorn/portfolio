import Image from "next/image";
import { ArrowUpRightIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { caseStudies, type CaseStudy, type CaughtRow, type Comparison } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { StaggerRows } from "@/components/stagger-rows";
import { ScoreChart } from "@/components/score-chart";

// Half the container at the lg breakpoint and above, full width below it.
const VISUAL_SIZES = "(min-width: 1024px) 50vw, 100vw"; // ds-allow-hardcode

/* Every card breaks a word that is longer than its box instead of overflowing it, and keeps its side padding in step
   with the screen rather than with the text size (--card-x), so a reader who enlarges the default text still gets the
   whole card. The figures inside clip their corners, so anything wider than the box would be cut off, not scrolled. */
const CARD = "scroll-mt-24 rounded-card border bg-bg-raised px-(--card-x) py-5 transition-colors hover:border-accent/40 sm:p-8 [overflow-wrap:anywhere]";

/* The reviewer's own words behind a claim, closed until opened so the card stays short. It is a native disclosure, so
   the keyboard and screen reader behaviour come with it. The attribution sits in a figcaption beside the blockquote,
   never inside it: the spec keeps the source outside the quoted words. */
function Quote({ quote }: { quote: NonNullable<CaughtRow["quote"]> }) {
  return (
    <details className="group mt-1">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-control font-mono text-label text-fg underline decoration-accent underline-offset-4 transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
        <CaretRightIcon aria-hidden size={12} weight="bold" className="transition-transform group-open:rotate-90" />
        Read the reviewer&rsquo;s own words
      </summary>
      <figure className="mb-2 mt-1 border-l-2 border-fg-faint pl-4">
        <blockquote>
          <p className="leading-relaxed text-fg-muted">{quote.text}</p>
        </blockquote>
        <figcaption className="mt-2 text-label leading-relaxed text-fg-faint">{quote.source}</figcaption>
      </figure>
    </details>
  );
}

/* Two results from one test drawn on one zero-based scale, each bar labelled with its own numbers, so nothing rests on
   colour. The better result is amber and the other grey; the text stays in text colours. The bars grow from the left
   when the block arrives. */
function CompareBars({ data }: { data: Comparison }) {
  const best = Math.max(...data.rows.map((r) => r.got / r.of));
  return (
    <figure className="mt-5 rounded-card bg-bg-tint px-(--card-x) py-4 sm:px-8">
      <p className="mb-3 font-mono text-label text-fg-faint">{data.title}</p>
      <Reveal>
        <ul className="space-y-4">
          {data.rows.map((r, i) => (
            <li key={r.label}>
              <p className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                <span className="text-fg">{r.label}</span> <span className="font-mono text-fg-muted">about {r.got} of {r.of}</span>
              </p>
              <div aria-hidden className="mt-1.5 h-2 bg-line">
                <div
                  className={`cmp-bar h-full rounded-r-[0.25rem] [print-color-adjust:exact] ${r.got / r.of === best ? "bg-accent" : "bg-fg-faint"}`}
                  style={{ width: `${(r.got / r.of) * 100}%`, "--i": i } as React.CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <figcaption className="mt-3 text-label leading-relaxed text-fg-faint">{data.caption}</figcaption>
    </figure>
  );
}

/* The picture or the evidence panel of a case. A figure holds one caption, the line on top; a note under a picture is a
   plain paragraph. */
function Visual({ c }: { c: CaseStudy }) {
  if (c.image) {
    return (
      <figure className="overflow-hidden rounded-card bg-bg-tint">
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-b px-4 py-1 font-mono text-label text-fg-faint sm:px-5">
          <span>{c.image.label}</span>
          {/* On a phone the capture is drawn small; the full file opens in a tab where it can be pinched. */}
          <a
            href={c.image.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full size: ${c.image.label} capture`}
            className="inline-flex min-h-11 items-center gap-1 text-fg-muted transition-colors hover:text-accent focus-visible:-outline-offset-4"
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
          className={`h-auto w-full ${c.image.height > c.image.width ? "mx-auto max-w-[24rem]" : ""}`}
        />
        {c.image.note && <p className="border-t px-4 py-2.5 text-label text-fg-faint sm:px-5">{c.image.note}</p>}
      </figure>
    );
  }
  if (c.proof) {
    const p = c.proof;
    return (
      <figure className="flex flex-col overflow-hidden rounded-card bg-bg-tint">
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 border-b px-(--card-x) py-1 font-mono text-label text-fg-faint sm:px-8">
          <span>{p.title}</span>
          {c.link && (
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-fg-muted transition-colors hover:text-accent focus-visible:-outline-offset-4"
            >
              Source
              <ArrowUpRightIcon size={14} />
            </a>
          )}
        </figcaption>
        <div className="space-y-6 px-(--card-x) py-5 sm:p-8">
          <div>
            <p className="mb-3 font-mono text-label text-fg-faint">{p.caughtTitle}</p>
            <dl className="space-y-3 text-sm leading-relaxed">
              {p.caught.map((r) => (
                <div key={r.label} className="grid gap-0.5 sm:grid-cols-[6rem_1fr] sm:gap-4">
                  <dt className="font-mono text-fg-faint">{r.label}</dt>
                  <dd className="text-fg">
                    {r.value}
                    {r.quote && <Quote quote={r.quote} />}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t pt-6">
            <p className="mb-3 font-mono text-label text-fg-faint">{p.chartTitle}</p>
            <Reveal>
              <ScoreChart scores={p.scores} label={p.chartTitle} />
            </Reveal>
          </div>
          <StaggerRows rows={p.checks} caret={false} className="space-y-3 border-t pt-6 font-mono text-sm leading-relaxed" />
        </div>
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

/* The labels are plain text, not headings: a dozen one-word headings would crowd the page outline. */
function Block({ label, children, className = "mt-6" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 break-after-avoid font-mono text-label text-fg-faint">{label}</p>
      {children}
    </div>
  );
}

function Metric({ c, className = "", size }: { c: CaseStudy; className?: string; size: string }) {
  if (!c.metric) return null;
  return (
    <p className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`font-mono tracking-tight text-accent ${size}`}>{c.metric.value}</span>
      <span className="text-sm text-fg-muted">{c.metric.label}</span>
    </p>
  );
}

/* The parts of a case's text. Each takes the class that places it, so a card can set them in one column or three. */
function Brief({ c, className }: { c: CaseStudy; className?: string }) {
  return (
    <Block label="brief" className={className}>
      <p className="leading-relaxed text-fg-muted">{c.problem}</p>
    </Block>
  );
}

function Built({ c, className }: { c: CaseStudy; className?: string }) {
  return (
    <Block label="built" className={className}>
      <ul className="space-y-2 leading-relaxed text-fg">
        {c.work.map((w) => (
          <li key={w} className="flex gap-3">
            <span aria-hidden className="mt-[0.7rem] h-0.5 w-3 shrink-0 bg-fg-faint" />
            {w}
          </li>
        ))}
      </ul>
    </Block>
  );
}

function Result({ c, className }: { c: CaseStudy; className?: string }) {
  return (
    <Block label="result" className={className}>
      <p className="leading-relaxed text-fg">{c.outcome}</p>
    </Block>
  );
}

function Stack({ c }: { c: CaseStudy }) {
  return (
    <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 font-mono text-label text-fg-faint">
      {c.stack.map((s) => (
        <li key={s} className="whitespace-nowrap">
          {s}
        </li>
      ))}
    </ul>
  );
}

/* A case with no picture says so: its checks are a plain list among the text, not a panel dressed as an artefact. */
function Checklist({ excerpt, className }: { excerpt: NonNullable<CaseStudy["excerpt"]>; className?: string }) {
  return (
    <Block label={excerpt.title} className={className}>
      <p className="text-fg-muted">{excerpt.caption}</p>
      <ul className="mt-3 space-y-2 leading-relaxed text-fg">
        {excerpt.rows.map((r) => (
          <li key={r.label}>
            <span className="mr-2 font-mono text-label text-fg-faint">{r.label}</span>
            {r.value}
          </li>
        ))}
      </ul>
    </Block>
  );
}

/* A case with a picture or an evidence panel. From lg the title sits over the text in one column and the visual spans
   both rows of the other, sticking while the text scrolls past; the columns swap sides on every other card. Below lg
   the cards stack, in the order they are written: a card with a picture shows its title and the picture straight after
   it, so a reader who jumps to a card from the strip knows where they landed; an evidence panel is long, so its text
   comes first. The source order is the reading order on a screen, in print and for a screen reader; from lg the grid
   places each part by its own column and row, so the order does not matter there. */
function VisualCard({ c, lead, flip }: { c: CaseStudy; lead: boolean; flip: boolean }) {
  const pictureFirst = Boolean(c.image);
  const side = flip ? "lg:col-start-8" : "lg:col-start-1";
  const header = (
    <header className={`flex max-w-[34rem] flex-col lg:col-span-5 lg:row-start-1 lg:max-w-none ${side}`}>
      <p className="text-sm text-fg-faint">{c.client}</p>
      <Title c={c} lead={lead} />
      {/* The lead card shows its number large under the capture from lg; below that it sits here. */}
      <Metric c={c} size="text-4xl" className={`mt-4 ${lead ? "lg:hidden" : ""}`} />
    </header>
  );
  const visual = (
    <div
      id={c.proof?.anchor}
      className={`scroll-mt-24 ${pictureFirst ? "max-lg:mt-5" : "max-lg:mt-6"} lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:top-24 lg:self-start lg:tall:sticky ${
        flip ? "lg:col-start-1" : "lg:col-start-6"
      }`}
    >
      <Visual c={c} />
      {c.comparison && <CompareBars data={c.comparison} />}
      {lead && <Metric c={c} size="text-7xl" className="mt-6 hidden lg:flex" />}
    </div>
  );
  const body = (
    <div className={`flex max-w-[34rem] flex-col lg:col-span-5 lg:row-start-2 lg:max-w-none ${side}`}>
      <Brief c={c} />
      <Built c={c} />
      <Result c={c} />
      {c.proof && (
        <Block label="how it ran">
          <p className="leading-relaxed text-fg-muted">{c.proof.process}</p>
        </Block>
      )}
      <Stack c={c} />
    </div>
  );
  return (
    <article id={c.anchor} className={`${CARD} flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10`}>
      {header}
      {pictureFirst ? (
        <>
          {visual}
          {body}
        </>
      ) : (
        <>
          {body}
          {visual}
        </>
      )}
    </article>
  );
}

/* A case with no picture: the text in three columns from lg (the brief over the result, what was built, then the
   checks), one column below it in reading order. */
function TextCard({ c }: { c: CaseStudy }) {
  return (
    <article id={c.anchor} className={`${CARD} flex flex-col`}>
      <header className="flex max-w-[34rem] flex-col">
        <p className="text-sm text-fg-faint">{c.client}</p>
        <Title c={c} />
        <Metric c={c} size="text-4xl" className="mt-4" />
      </header>
      <div className="mt-6 grid max-w-[34rem] gap-y-6 lg:max-w-none lg:grid-cols-3 lg:gap-x-10">
        <Brief c={c} className="lg:col-start-1 lg:row-start-1" />
        <Built c={c} className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />
        <Result c={c} className="lg:col-start-1 lg:row-start-2" />
        {c.excerpt && <Checklist excerpt={c.excerpt} className="lg:col-start-3 lg:row-span-2 lg:row-start-1" />}
      </div>
      <Stack c={c} />
    </article>
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

        <div className="mt-12 space-y-5 sm:space-y-8">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              {c.image || c.proof ? <VisualCard c={c} lead={i === 0 || Boolean(c.metric)} flip={i % 2 === 1} /> : <TextCard c={c} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
