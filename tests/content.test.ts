import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { profile, facts, caseStudies, experience, contact, run, buildScores, receipts, COMPARE_ANCHOR } from "../lib/data.ts";
import { countWorkLog, CASE_TYPES } from "../lib/worklog-count.ts";
import { worklogStats } from "../lib/worklog-stats.ts";

// Generic rules live here. Real client names live in tests/banned.local.txt,
// which is gitignored so the repo itself never contains them (docs/adr/0001).
const GENERIC_BANNED = ["your-github", "your-linkedin", "Tech Company Bangkok", "Startup Studio", "\u2014", "\u2013"];
const LOCAL_LIST = new URL("./banned.local.txt", import.meta.url);
const CLIENT_BANNED = existsSync(LOCAL_LIST)
  ? readFileSync(LOCAL_LIST, "utf8").split("\n").map((l) => l.trim()).filter(Boolean)
  : [];
const BANNED = [...GENERIC_BANNED, ...CLIENT_BANNED];

function walk(v: unknown, path = "root"): string[] {
  if (typeof v === "string") return [`${path}: ${v}`];
  if (Array.isArray(v)) return v.flatMap((x, i) => walk(x, `${path}[${i}]`));
  if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => walk(x, `${path}.${k}`));
  return [];
}

const ALL = walk({ profile, facts, caseStudies, experience, contact, run, receipts });

const byAnchor = (anchor: string) => {
  const c = caseStudies.find((study) => study.anchor === anchor);
  assert.ok(c, `a case study has the anchor #${anchor}`);
  return c;
};

test("no client names, placeholders, inflated JLPT level, or dashes", () => {
  for (const s of ALL) {
    for (const b of BANNED) assert.ok(!s.includes(b), `banned "${b}" in ${s}`);
    assert.ok(!/\bN2\b/.test(s), `JLPT level must be stated as certified: ${s}`);
  }
});

test("client name list is present locally", { skip: CLIENT_BANNED.length === 0 && "tests/banned.local.txt missing" }, () => {
  assert.ok(CLIENT_BANNED.length > 0);
});

test("contact uses personal channels", () => {
  assert.equal(profile.email, "chu.mangkorn@gmail.com");
  assert.match(profile.github, /github\.com\/ChuMangkorn$/);
  assert.match(profile.linkedin, /linkedin\.com\/in\/chulaprungrueang-mangkorn$/);
});

test("exactly five case studies, each complete and anonymized", () => {
  assert.equal(caseStudies.length, 5);
  for (const c of caseStudies) {
    assert.ok(c.title && c.problem && c.outcome, c.title);
    assert.ok(c.stack.length >= 2, c.title);
    if (c.link) assert.ok(c.personal, `${c.title}: only personal projects may link`);
  }
});

test("experience is real and newest first", () => {
  assert.equal(experience[0].company, "Piala Partner");
  assert.ok(experience[0].period.includes("2025"));
  assert.ok(experience.some((e) => e.company.includes("Honda")));
});

test("hero copy obeys the hero rules", () => {
  assert.ok(profile.tagline.split(/\s+/).length <= 20, "subtext over 20 words");
  assert.ok(profile.jp.length > 0);
  assert.equal(profile.tagline.split(profile.taglineEmphasis).length, 2, "the highlighted phrase appears once in the tagline");
  assert.equal(profile.role.split(profile.roleEmphasis).length, 2, "the marked phrase appears once in the role line");
  assert.ok(/\bAI\b/.test(profile.role), "the first line of the page says AI");
  assert.ok(/\bAI\b/.test(profile.tabTitle), "the tab title and the link preview say AI");
  assert.ok(profile.tabTitle.includes(profile.title), "the tab title extends the plain job title");
});

test("the hero run and the case study tell the same story", () => {
  const study = caseStudies.find((c) => c.proof);
  assert.ok(study?.proof, "the workflow case study carries the build proof");
  assert.deepEqual(study.proof.scores, buildScores, "the run and the chart must draw from the same scores");
  assert.ok(buildScores.every((s) => s >= 0 && s <= 10), "scores are out of 10");
  assert.equal(run.link.href, `#${study.proof.anchor}`, "the run links to the evidence panel that holds the numbers");
  for (const row of run.rows) {
    assert.ok(Number.isInteger(row.stage) && row.stage >= 0 && row.stage < profile.pipeline.length, `run row "${row.who}" names a real stage`);
  }
});

test("the strip's measurements match the case text they come from", () => {
  assert.equal(receipts.length, 3);
  const [meetrec, caught, finder] = receipts;
  // MeetRec: the figure is the better result, the label states both results with their "about".
  const m = byAnchor("meetrec");
  assert.match(m.outcome, /about 7 of 18/);
  assert.match(m.outcome, /about 16 of 18/);
  assert.equal(meetrec.figure, "16/18");
  assert.ok(meetrec.label.includes("About 16 of 18") && meetrec.label.includes("about 7 of 18"));
  // The defect the reviewer caught in round 8, before and after.
  const w = byAnchor("workflow");
  const round8 = w.proof?.caught.find((r) => r.label === "round 8");
  assert.ok(round8, "the workflow case lists round 8");
  assert.match(round8.value, /28 of 28 blocks hidden/);
  assert.match(round8.value, /Now none are/);
  assert.equal(caught.figure, "28 to 0");
  assert.ok(caught.label.includes("round 8"));
  // Client delivery: the store finder's lead number.
  const f = byAnchor("store-finder");
  assert.equal(finder.figure, f.metric?.value);
  // Every cell links to the case that holds its evidence, and nowhere else.
  assert.equal(meetrec.href, `#${COMPARE_ANCHOR}`, "the MeetRec cell lands on the bars that draw its numbers, not on the capture above them");
  assert.ok(m.comparison, "the bars the MeetRec cell lands on exist");
  assert.equal(caught.href, `#${w.proof?.anchor}`, "the defect cell lands on the panel that lists it, not on the card's title");
  assert.equal(finder.href, "#store-finder");
  for (const r of receipts) {
    const lands = (c: (typeof caseStudies)[number]) =>
      `#${c.anchor}` === r.href || (c.proof && `#${c.proof.anchor}` === r.href) || (c.comparison && `#${COMPARE_ANCHOR}` === r.href);
    assert.ok(caseStudies.some(lands), `${r.where} links to a case study or its evidence`);
  }
});

// The page prints this text as the reviewer's own words. Editing it is allowed only on purpose: change the hash with it.
const ROUND_8_QUOTE_SHA256 = "f589200aabf42785d1191f9beeb4435706de8d1b7e1c9f8e78f92ff3a5f53c63";

test("the reviewer's quoted words back the round they sit under", () => {
  const round8 = caseStudies.find((c) => c.proof)?.proof?.caught.find((r) => r.label === "round 8");
  assert.ok(round8?.quote, "round 8 carries the reviewer's own words");
  assert.match(round8.quote.text, /28 of 28/, "the quote holds the number the summary row states");
  assert.ok(round8.quote.source.includes("round 8"), "the source line names the round");
  assert.ok(round8.quote.source.includes("excerpt"), "the source line says it is an excerpt");
  assert.equal(
    createHash("sha256").update(round8.quote.text).digest("hex"),
    ROUND_8_QUOTE_SHA256,
    "the quote was edited: it is shown as the reviewer's own words, so change it only against the report and update the hash",
  );
});

test("the MeetRec bars draw the numbers its case text states", () => {
  const m = byAnchor("meetrec");
  assert.ok(m.comparison, "the MeetRec case carries the comparison");
  const rows = m.comparison.rows;
  assert.equal(rows.length, 2);
  assert.equal(new Set(rows.map((r) => r.label)).size, 2, "each bar has its own label");
  assert.equal(new Set(rows.map((r) => r.of)).size, 1, "both rows are out of the same total, so one scale is honest");
  for (const r of rows) assert.ok(r.got >= 0 && r.got <= r.of, `${r.label}: the count is within the total`);
  // Each result is read out of the case text by its name, so swapped counts or a repeated row fail.
  const stated = (pattern: RegExp) => {
    const hit = m.outcome.match(pattern);
    assert.ok(hit, `the case text states ${pattern}`);
    return [Number(hit[1]), Number(hit[2])];
  };
  const byLabel = (label: string) => {
    const row = rows.find((r) => r.label === label);
    assert.ok(row, `a bar is labelled "${label}"`);
    return [row.got, row.of];
  };
  assert.deepEqual(byLabel("On-device translation"), stated(/on-device translation kept the meaning in about (\d+) of (\d+)/));
  assert.deepEqual(byLabel("Claude"), stated(/Claude's in about (\d+) of (\d+)/));
});

test("the restore card's figures are numbers its case text states", () => {
  const restore = byAnchor("restore");
  assert.ok(restore.metric && restore.excerpt, "the restore case carries its figure and its check");
  const { metric, excerpt } = restore;
  const text = [restore.problem, ...restore.work, restore.outcome].join(" ");
  // Each count is read out of the case text by its phrase, so a count moved to the wrong row fails.
  const stated = (pattern: RegExp) => {
    const hit = text.match(pattern);
    assert.ok(hit, `the case text states ${pattern}`);
    return hit[1];
  };
  const row = (label: string) => {
    const hit = excerpt.rows.find((x) => x.label === label);
    assert.ok(hit, `the check has a "${label}" row`);
    return hit.value;
  };
  const compared = stated(/all (\d+) SKUs with zero field differences/);
  assert.equal(metric.value, `${compared}/${compared}`);
  assert.ok(row("compared").startsWith(`${compared} of ${compared} SKUs`));
  assert.ok(row("deleted").includes(stated(/deleted the (\d+) older products/)));
  assert.ok(row("before the restore").includes(stated(/backed up the other (\d+) products/)));
  assert.ok(row("removed").includes(stated(/the (\d+) newer products removed/)));
  // And no number is shown anywhere on the figure or the check that the text does not state.
  const shown = [metric.value, metric.label, ...excerpt.rows.flatMap((x) => [x.label, x.value])].join(" ");
  for (const n of shown.match(/\d+/g) ?? []) assert.match(text, new RegExp(`\\b${n}\\b`), `${n} is shown but not stated in the case text`);
});

test("the build proof counts the content tests that exist", () => {
  const source = readFileSync(new URL("./content.test.ts", import.meta.url), "utf8");
  const count = (source.match(/^test\(/gm) ?? []).length;
  const checks = caseStudies.find((c) => c.proof)?.proof?.checks.find((c) => c.label === "every commit");
  assert.match(checks?.value ?? "", new RegExp(`\\b${count} content tests`), `the proof says ${checks?.value}, but there are ${count} tests`);
});

test("the work log counter reads cases, routine lines and types", () => {
  const files = [
    { month: "2026-02", text: "# Work log 2026-02\n\n## Cases\n\n## Routine\n" },
    {
      month: "2026-03",
      text: "## Routine\n- 2026-03-04 | W-001 | fix | a form broke > fixed > checked\n- 2026-03-09 | W-261113-1042 | ops | a backup > ran > checked\n",
    },
    {
      month: "2026-04",
      text: "## Cases\n### 2026-04-02 | W-002 | A shop went down\n- type: incident\n- problem: x\n### 2026-04-10..2026-04-12 | B-019 | A wrong delete, undone\n- type: fix\n\n## Routine\n- 2026-04-05 | W-003 | content | copy > updated > checked\n",
    },
  ];
  const s = countWorkLog(files, "2026-11-13");
  assert.equal(s.since, "2026-03");
  assert.equal(s.asOf, "2026-11-13");
  assert.equal(s.cases, 2);
  assert.equal(s.routine, 3);
  assert.equal(s.total, 5);
  assert.deepEqual(s.byType, { build: 0, incident: 1, fix: 1, ops: 0, analysis: 0, migration: 0 });
  assert.throws(() => countWorkLog([{ month: "2026-05", text: "### 2026-05-01 | W-004 | No type line\n- problem: x\n" }], "2026-11-13"));
});

test("the work log rows draw the snapshot's numbers and months", () => {
  const row = (key: string) => facts.ledger.find((r) => r.key === key)?.value ?? "";
  const short = (ym: string) => new Date(`${ym.slice(0, 7)}-01T00:00:00Z`).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
  assert.equal(row("Work log"), `${worklogStats.total} tasks, ${short(worklogStats.since)} to ${short(worklogStats.until)}`);
  assert.equal(row("Incidents fixed"), `${worklogStats.byType.incident} of those tasks`);
});

test("the work log snapshot adds up", () => {
  const typed = CASE_TYPES.reduce((n, t) => n + worklogStats.byType[t], 0);
  assert.equal(typed, worklogStats.cases);
  assert.equal(worklogStats.cases + worklogStats.routine, worklogStats.total);
});

test("the work log note says how the log was kept", () => {
  assert.match(facts.ledgerNote, /written up in [A-Z][a-z]+ \d{4} from my session records/);
  assert.match(facts.ledgerNote, /kept automatically since/);
  for (const s of walk(facts)) assert.ok(!/completed|per month|as I go/i.test(s), s);
});

test("the work log counter checks each case and skips fenced templates", () => {
  const twoTypes = "### 2026-06-01 | W-010 | One\n- type: ops\n- type: fix\n### 2026-06-02 | W-011 | Two\n- problem: x\n";
  assert.throws(() => countWorkLog([{ month: "2026-06", text: twoTypes }], "2026-11-13"), /W-010|One|2026-06/);
  assert.throws(() => countWorkLog([{ month: "2026-06", text: "## Routine\n- type: fix\n" }], "2026-11-13"));
  const fenced = "## Cases\n```\n### 2026-11-10 | W-xxx | <title>\n- type: incident | build\n```\n### 2026-06-03 | W-012 | Real\n- type: build\n";
  const s = countWorkLog([{ month: "2026-06", text: fenced }, { month: "2026-07", text: "" }], "2026-12-01");
  assert.equal(s.cases, 1);
  assert.equal(s.byType.build, 1);
  assert.equal(s.byType.incident, 0);
  assert.equal(s.until, "2026-06");
});
