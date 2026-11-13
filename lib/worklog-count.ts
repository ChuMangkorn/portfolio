// Counts the owner's anonymised work log: one Markdown file per month, case entries under "### <date> | <id> | <title>"
// with one "- type:" line each, routine entries as "- <date> | <id> | ...". Only counts leave this module, never log text.

export const CASE_TYPES = ["build", "incident", "fix", "ops", "analysis", "migration"] as const;
export type CaseType = (typeof CASE_TYPES)[number];

export type WorklogStats = {
  since: string; // first month with an entry, "YYYY-MM"
  until: string; // last month with an entry, "YYYY-MM": the page's end month, so a late run never claims an empty month
  asOf: string; // the day the snapshot was taken, "YYYY-MM-DD"
  total: number;
  cases: number;
  routine: number;
  byType: Record<CaseType, number>;
};

// A date, or a range written "2026-05-01..2026-05-03".
const DATE = String.raw`\d{4}-\d{2}-\d{2}(?:\.\.\d{4}-\d{2}-\d{2})?`;
const CASE = new RegExp(`^### ${DATE} \\|`);
const ROUTINE = new RegExp(`^- ${DATE} \\|`);
const TYPE = /^- type: (\w+)/;
const FENCE = /^```/;

const isCaseType = (t: string): t is CaseType => (CASE_TYPES as readonly string[]).includes(t);

export function countWorkLog(files: { month: string; text: string }[], asOf: string): WorklogStats {
  const byType = Object.fromEntries(CASE_TYPES.map((t) => [t, 0])) as Record<CaseType, number>;
  let cases = 0;
  let routine = 0;
  const months: string[] = [];

  for (const { month, text } of files) {
    let entries = 0;
    let fenced = false;
    // The case being read: its line number and the type lines seen under it. A case ends at the next "#" heading.
    let open: { line: number; types: string[] } | null = null;
    const close = () => {
      if (open && open.types.length !== 1)
        throw new Error(`${month}, case at line ${open.line}: ${open.types.length} "- type:" lines, every case needs exactly one`);
      if (open) byType[open.types[0] as CaseType]++;
      open = null;
    };

    text.split("\n").forEach((line, i) => {
      if (FENCE.test(line)) fenced = !fenced;
      if (fenced || FENCE.test(line)) return;
      if (CASE.test(line)) {
        close();
        open = { line: i + 1, types: [] };
        cases++;
        entries++;
      } else if (line.startsWith("#")) {
        close();
      } else if (ROUTINE.test(line)) {
        routine++;
        entries++;
      } else {
        const m = TYPE.exec(line);
        if (!m) return;
        if (!open) throw new Error(`${month}, line ${i + 1}: a "- type:" line outside a case`);
        if (!isCaseType(m[1])) throw new Error(`${month}, line ${i + 1}: unknown case type "${m[1]}"`);
        open.types.push(m[1]);
      }
    });
    close();
    if (entries > 0) months.push(month);
  }

  if (months.length === 0) throw new Error("the work log has no entries");
  months.sort();
  return { since: months[0], until: months[months.length - 1], asOf, total: cases + routine, cases, routine, byType };
}
