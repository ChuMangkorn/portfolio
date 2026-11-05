import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { profile, about, caseStudies, experience, contact, run, buildScores, receipts } from "../lib/data.ts";

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

const ALL = walk({ profile, about, caseStudies, experience, contact, run, receipts });

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

test("exactly four case studies, each complete and anonymized", () => {
  assert.equal(caseStudies.length, 4);
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
  assert.equal(run.link.href, `#${study.anchor}`, "the run links to the case study that holds the numbers");
  for (const row of run.rows) {
    assert.ok(Number.isInteger(row.stage) && row.stage >= 0 && row.stage < profile.pipeline.length, `run row "${row.who}" names a real stage`);
  }
});

test("the strip's measurements match the case text they come from", () => {
  const byAnchor = (anchor: string) => {
    const c = caseStudies.find((study) => study.anchor === anchor);
    assert.ok(c, `a case study has the anchor #${anchor}`);
    return c;
  };
  const [meetrec, caught, score, finder] = receipts;
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
  assert.match(round8.value, /Now 0 of 28/);
  assert.equal(caught.figure, "28 to 0");
  assert.ok(caught.label.includes("round 8"));
  // The score and the round count come from buildScores, the same list the hero and the chart draw.
  assert.equal(score.figure, `${buildScores[0].toFixed(1)} to ${buildScores[buildScores.length - 1].toFixed(1)}`);
  assert.ok(score.label.includes(`${buildScores.length} rounds`));
  // Client delivery: the store finder's lead number.
  const f = byAnchor("store-finder");
  assert.equal(finder.figure, f.metric?.value);
  // Every cell links to a case that exists.
  for (const r of receipts) {
    assert.ok(r.href.startsWith("#") && caseStudies.some((c) => `#${c.anchor}` === r.href), `${r.where} links to a case study`);
  }
});

test("the build proof counts the content tests that exist", () => {
  const source = readFileSync(new URL("./content.test.ts", import.meta.url), "utf8");
  const count = (source.match(/^test\(/gm) ?? []).length;
  const checks = caseStudies.find((c) => c.proof)?.proof?.checks.find((c) => c.label === "every commit");
  assert.ok(checks?.value.includes(`${count} content tests`), `the proof says ${checks?.value}, but there are ${count} tests`);
});
