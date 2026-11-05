import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { profile, about, caseStudies, experience, contact } from "../lib/data.ts";

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

const ALL = walk({ profile, about, caseStudies, experience, contact });

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
});
