import { worklog } from "@/lib/data";

/* How much the work log holds, above the cards that show a few of its entries in depth. Three figures, then one bar of
   the case types. The segments alternate two neutral shades so neighbours stay apart without amber, which the figures
   above use, seeming to mark one type; each type is named with its count under the bar, so nothing rests on colour.
   The strip has no motion of its own: it arrives with the heading's reveal. */
export function WorklogStrip() {
  const cases = worklog.bar.reduce((n, b) => n + b.count, 0);
  const shade = (i: number) => (i % 2 === 0 ? "bg-fg-muted" : "bg-fg-faint");
  return (
    <div className="mt-10 rounded-card bg-bg-tint px-(--card-x) py-6 sm:px-8">
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
        {worklog.figures.map((f) => (
          <li key={f.label}>
            <p className="flex flex-col gap-1">
              <span className="font-mono text-4xl tracking-tight text-accent tabular-nums">{f.value}</span>
              <span className="text-sm text-fg-muted">{f.label}</span>
            </p>
          </li>
        ))}
      </ul>

      <figure className="mt-6">
        <p className="mb-2 text-label font-medium text-fg-faint">{worklog.barTitle}</p>
        <div aria-hidden className="flex h-2 gap-0.5 [print-color-adjust:exact]">
          {worklog.bar.map((b, i) => (
            <div key={b.type} className={`h-full ${shade(i)}`} style={{ width: `${(b.count / cases) * 100}%` }} />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {worklog.bar.map((b, i) => (
            <li key={b.type} className="flex items-center gap-2">
              <span aria-hidden className={`size-2 ${shade(i)} [print-color-adjust:exact]`} />
              <span className="text-fg">{b.label}</span>
              <span className="tabular-nums text-fg-muted">{b.count}</span>
            </li>
          ))}
        </ul>
        <figcaption className="mt-4 text-label leading-relaxed text-fg-faint">{worklog.caption}</figcaption>
      </figure>
    </div>
  );
}
