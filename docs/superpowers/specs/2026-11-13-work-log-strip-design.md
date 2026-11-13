# Work log strip: design (short)

Date: 2026-11-13. Size: a small change.

## Intent

The headline says "One engineer, end to end." Five cards show depth, nothing shows volume. The owner keeps an anonymised work log (one file per month in the Obsidian vault, `Work Log/work-log-2026-MM.md`). A strip that counts it turns the claim into a number a hiring reader can see in a second, and it is evidence few portfolios have.

## Goals

- One strip above the work cards: the total of logged jobs since March 2026, how many were case-sized, how many were incidents, and a single bar splitting the cases by type (build, incident, fix, ops, analysis, migration).
- Every number on the strip comes from a committed snapshot file, and a content test checks the page against it, as with the other numbers on the page.
- Honest label: "logged", with the start month, never "completed" or "per month".

## Non-goals

- No monthly chart. Logging density is uneven (March was backfilled from prompts only, November is the first month of automatic capture), so a chart would show how the log was kept, not how much work was done.
- No list of entries on the site (a later `/log` page is possible but needs a line-by-line edit first).

## Anti-goals

- Any client, brand, host or person name reaching the repo. The snapshot holds counts only, no text from the log.
- A number on the page that does not match the snapshot.

## Constraints

- Vercel builds from GitHub and cannot see the vault, so the counts are a snapshot committed to the repo, not read at build time.
- Existing content rules apply: no dashes, no placeholder text, no inflated claims; motion rules unchanged (the strip does not animate).

## Approaches considered

1. Totals strip with a type bar (picked): honest, one round of work, matches the page's rule that every number has a source.
2. Monthly contribution grid: most striking, but misleading because of uneven logging. Rejected.
3. A `/log` page with all 135 one-liners: strongest proof, highest leak and editing cost. Deferred.

## Design

- `scripts/worklog-stats.mjs <vault Work Log dir>`: counts `### ` case headings, `- type:` values and routine one-liners in the monthly files, writes `lib/worklog-stats.json` (`{ since, asOf, total, cases, routine, byType }`). Counts only. Run by hand when the log is curated each month, then commit.
- `lib/data.ts` imports the snapshot and exposes the strip's text.
- A small component above the work cards renders the figures and the bar, using the page's existing type and colour tokens.
- `tests/content.test.ts`: the strip's numbers equal the snapshot, the type counts add up to `cases`, and the label contains "logged".

## Left to the builder

Exact copy, spacing, and the bar's look within the existing design system; screenshots at 1440 and 390; `npm run check` must pass. Work on a branch; merging into `main` (which deploys) waits for the owner.
