// Counts the owner's anonymised work log: one Markdown file per month, case entries under "### <date> | <id> | <title>"
// with a "- type:" line, routine entries as "- <date> | <id> | ...". Only counts leave this module, never log text.

export const CASE_TYPES = ["build", "incident", "fix", "ops", "analysis", "migration"] as const;
export type CaseType = (typeof CASE_TYPES)[number];

export type WorklogStats = {
  since: string; // first month with an entry, "YYYY-MM"
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

const isCaseType = (t: string): t is CaseType => (CASE_TYPES as readonly string[]).includes(t);

export function countWorkLog(files: { month: string; text: string }[], asOf: string): WorklogStats {
  const byType = Object.fromEntries(CASE_TYPES.map((t) => [t, 0])) as Record<CaseType, number>;
  let cases = 0;
  let routine = 0;
  const months: string[] = [];

  for (const { month, text } of files) {
    let entries = 0;
    for (const line of text.split("\n")) {
      if (CASE.test(line)) {
        cases++;
        entries++;
      } else if (ROUTINE.test(line)) {
        routine++;
        entries++;
      } else {
        const m = TYPE.exec(line);
        if (m) {
          if (!isCaseType(m[1])) throw new Error(`${month}: unknown case type "${m[1]}"`);
          byType[m[1]]++;
        }
      }
    }
    if (entries > 0) months.push(month);
  }

  const typed = CASE_TYPES.reduce((n, t) => n + byType[t], 0);
  if (typed !== cases) throw new Error(`${cases} cases but ${typed} type lines: every case needs exactly one "- type:" line`);
  if (months.length === 0) throw new Error("the work log has no entries");

  return { since: months.sort()[0], asOf, total: cases + routine, cases, routine, byType };
}
