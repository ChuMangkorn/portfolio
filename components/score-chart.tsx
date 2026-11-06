import type { CSSProperties } from "react";

/* One series over ordered rounds, drawn from a zero baseline: past rounds in the quiet grey, the latest in the accent,
   the first and last value printed in the axis row under the bars. Bars are capped at 24px with a 4px rounded top. The grid is two
   hairlines. Identity never rests on colour alone: a native tooltip names each bar, and screen readers get the same
   numbers as a table instead of the drawing. The table sits in a clipped wrapper because a `nowrap` table positioned
   absolutely still widens the page on a narrow screen when it is not inside a box that clips. The bars are fills, so
   they ask the browser to keep them when "background graphics" is off in the print dialog. The bars grow one after
   another when the chart scrolls into view (the `score-bar` rule in globals.css). The gap between bars is a share of the
   plot, not a size in rem, and the word "round" drops out of the two end labels when the chart is too narrow to hold
   both whole (a reader who enlarges the default text), so nothing is pushed out of the box that clips it. The values sit
   in that row, not above the bars: a label floating over a bar collided with its neighbour once the text was larger. */
export function ScoreChart({ scores, label, max = 10 }: { scores: number[]; label: string; max?: number }) {
  const last = scores.length - 1;
  const fmt = (n: number) => n.toFixed(1);
  const pct = (n: number) => (n / max) * 100;

  return (
    <div className="@container">
      <div aria-hidden className="grid grid-cols-[1.5rem_1fr] gap-x-3">
        <div className="relative h-36 font-mono text-label text-fg-faint">
          <span className="absolute right-0 top-0 -translate-y-1/2">{max}</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2">{max / 2}</span>
          <span className="absolute bottom-0 right-0 translate-y-1/2">0</span>
        </div>
        <div className="relative h-36 border-b border-line">
          <div className="absolute inset-x-0 top-0 border-t border-line" />
          <div className="absolute inset-x-0 top-1/2 border-t border-line" />
          <ol className="absolute inset-0 flex items-end gap-[2%]">
            {scores.map((score, i) => (
              <li
                key={i}
                title={`Round ${i + 1}: ${fmt(score)}`}
                style={{ "--i": i } as CSSProperties}
                className="relative flex h-full flex-1 items-end justify-center"
              >
                <div
                  className={`score-bar w-full max-w-[1.5rem] rounded-t-[0.25rem] [print-color-adjust:exact] ${i === last ? "bg-accent" : "bg-fg-faint"}`}
                  style={{ height: `${pct(score)}%` }}
                />
              </li>
            ))}
          </ol>
        </div>
        <span />
        <div className="mt-1 flex justify-between text-label font-medium text-fg-faint">
          <span className="inline-flex items-baseline gap-2">
            <span>
              <span className="hidden @min-[11rem]:inline">round </span>1
            </span>
            <span className="hidden font-mono text-fg @min-[7rem]:inline">{fmt(scores[0])}</span>
          </span>
          <span className="inline-flex items-baseline gap-2">
            <span>
              <span className="hidden @min-[11rem]:inline">round </span>
              {scores.length}
            </span>
            <span className="hidden font-mono text-fg @min-[7rem]:inline">{fmt(scores[last])}</span>
          </span>
        </div>
      </div>
      <div className="sr-only">
        <table>
          <caption>{label}</caption>
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{fmt(score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
