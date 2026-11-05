/* One series over ordered rounds, drawn from a zero baseline: past rounds in the quiet grey, the latest in the accent,
   a value printed only on the first and last bar. Bars are capped at 24px with a 4px rounded top. The grid is two
   hairlines. Identity never rests on colour alone: a native tooltip names each bar, and screen readers get the same
   numbers as a table instead of the drawing. The table sits in a clipped wrapper because a `nowrap` table positioned
   absolutely still widens the page on a narrow screen when it is not inside a box that clips. The bars are fills, so
   they ask the browser to keep them when "background graphics" is off in the print dialog. */
export function ScoreChart({ scores, label, max = 10 }: { scores: number[]; label: string; max?: number }) {
  const last = scores.length - 1;
  const fmt = (n: number) => n.toFixed(1);

  return (
    <div>
      <div aria-hidden className="grid grid-cols-[1.5rem_1fr] gap-x-3">
        <div aria-hidden className="relative h-36 font-mono text-label text-fg-faint">
          <span className="absolute right-0 top-0 -translate-y-1/2">{max}</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2">{max / 2}</span>
          <span className="absolute bottom-0 right-0 translate-y-1/2">0</span>
        </div>
        <div aria-hidden className="relative h-36 border-b border-line">
          <div className="absolute inset-x-0 top-0 border-t border-line" />
          <div className="absolute inset-x-0 top-1/2 border-t border-line" />
          <ol className="absolute inset-0 flex items-end gap-1.5 sm:gap-2">
            {scores.map((score, i) => (
              <li key={i} title={`Round ${i + 1}: ${fmt(score)}`} className="flex h-full flex-1 items-end justify-center">
                <div
                  className={`relative w-full max-w-[1.5rem] rounded-t-[0.25rem] [print-color-adjust:exact] ${i === last ? "bg-accent" : "bg-fg-faint"}`}
                  style={{ height: `${(score / max) * 100}%` }}
                >
                  {(i === 0 || i === last) && (
                    <span className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 font-mono text-label text-fg">{fmt(score)}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <span aria-hidden />
        <div aria-hidden className="mt-1 flex justify-between font-mono text-label text-fg-faint">
          <span>round 1</span>
          <span>round {scores.length}</span>
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
