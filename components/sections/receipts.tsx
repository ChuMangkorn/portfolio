import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { receipts } from "@/lib/data";
import { Reveal } from "@/components/reveal";

/* A figure written "a to b" is a before and after: the first number stays plain, the arrow and the result are marked.
   Screen readers get the words, the eye gets the arrow. The arrow is an icon because the mono font has no arrow glyph and
   a fallback font draws it too wide. */
function Figure({ value }: { value: string }) {
  const [from, to] = value.split(" to ");
  if (to === undefined) return <>{value}</>;
  return (
    <>
      {from}
      <ArrowRightIcon aria-hidden weight="bold" size="0.6em" className="mx-[0.35em] inline-block text-accent" />
      <span className="sr-only"> to </span>
      <span className="text-accent">{to}</span>
    </>
  );
}

/* The first thing under the hero: three measurements from the work below, two about the AI workflow and one about
   client delivery. Every one links to the case that holds the evidence. The first cell leads: it takes two columns
   and a larger figure. The focus ring is drawn inside the cell because the list clips its corners. */
export function Receipts() {
  return (
    <section aria-label="Measured results" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-14">
        <Reveal>
          <p className="mb-3 font-mono text-label text-fg-faint">measured</p>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-card border bg-line sm:grid-cols-2 lg:grid-cols-4">
            {receipts.map((r, i) => (
              <li key={r.href + r.figure} className={`bg-bg-raised ${i === 0 ? "sm:col-span-2" : ""}`}>
                <a
                  href={r.href}
                  className="group flex h-full flex-col p-4 transition-colors hover:bg-bg-tint focus-visible:-outline-offset-4 sm:p-5"
                >
                  <span className={`font-mono leading-none text-fg ${i === 0 ? "text-5xl" : "text-score"}`}>
                    <Figure value={r.figure} />
                  </span>
                  <span className="mt-3 text-sm leading-snug text-fg-muted">{r.label}</span>
                  <span className="mt-auto pt-4 font-mono text-label text-fg-faint transition-colors group-hover:text-accent">{r.where}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
