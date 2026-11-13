// All page content lives here. Client names are never written (see docs/adr/0001).
import { worklogStats } from "./worklog-stats.ts";

// The Japanese line, phrase by phrase. Safari has no `word-break: auto-phrase`, so the hero breaks the line only between
// these phrases (a <wbr> after each) and never inside "納品まで".
const jpPhrases = ["日本語での", "要件ヒアリングから", "納品まで、", "一貫して", "担当します。"];

// The one place the evidence panel of the workflow case is named: the hero panel, the measured strip and the case itself
// all link to it, so a tap lands on the numbers and not on the card's title.
export const PROOF_ANCHOR = "workflow-proof";

// The bars that draw MeetRec's two results. The strip's first cell lands on them, not on the capture above them, so the
// numbers it quotes are on screen when the reader arrives.
export const COMPARE_ANCHOR = "meetrec-compare";

export const profile = {
  name: "Mangkorn Chulaprungrueang",
  shortName: "Mangkorn",
  title: "Software Engineer",
  // How the role reads in the browser tab and in a link preview (LINE, Slack and Chatwork show the title in bold).
  // `title` stays the plain job title for structured data.
  tabTitle: "AI-driven Software Engineer",
  city: "Bangkok",
  role: "AI-driven Software Engineer, Bangkok",
  // The part of the role line the hero marks in the accent colour, so "AI" is read in the first line of the page.
  roleEmphasis: "AI-driven",
  headline: "One engineer, end to end.",
  pipeline: [
    { ja: "要件ヒアリング", en: "Japanese brief" },
    { ja: "設計", en: "Design" },
    { ja: "実装", en: "Build" },
    { ja: "QA", en: "Test" },
    { ja: "納品", en: "Deliver" },
  ],
  tagline:
    "I take Japanese client briefs to delivery: Shopify, landing pages, WordPress and tracking, using AI agents I run and review.",
  // The phrase inside the tagline that the hero highlights: the part a hiring reader should not miss.
  taglineEmphasis: "AI agents",
  jpPhrases,
  jp: jpPhrases.join(""),
  // The certified level, shown beside the Japanese line so the claim and its qualifier are read together.
  jlpt: "JLPT N3",
  email: "chu.mangkorn@gmail.com",
  github: "https://github.com/ChuMangkorn",
  linkedin: "https://linkedin.com/in/chulaprungrueang-mangkorn",
  photo: "/profile-cutout-refined.png",
};

/* Two rows of the ledger come from the anonymised work log, through the committed snapshot (npm run worklog:stats). The
   range names the first and last months with entries, so it never claims a month the log does not cover. */
const shortMonth = (ym: string) =>
  new Date(`${ym.slice(0, 7)}-01T00:00:00Z`).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/* The facts a reader looks for first, set beside the career list. The story is in the hero, the work and the list; a
   paragraph of its own repeated them. */
export const facts = {
  ledger: [
    { key: "Brief language", value: `Japanese, ${profile.jlpt}` },
    { key: "Web work", value: "2019 to 2022, 2025 to now" },
    { key: "Work log", value: `${worklogStats.total} tasks, ${shortMonth(worklogStats.since)} to ${shortMonth(worklogStats.until)}` },
    { key: "Incidents fixed", value: String(worklogStats.byType.incident) },
    { key: "Daily stack", value: "Shopify, WordPress, Tailwind" },
    { key: "Tests", value: "Jest and Playwright in CI" },
    { key: "Based in", value: "Bangkok (UTC+7)" },
  ],
  // Said beside the two counts, not under them, so the claim and how it was kept are read together.
  ledgerNote:
    "The work log was written up in November 2026 from my session records, and is kept automatically since.",
};

/* The reviewer's score for each round of this page's build. The hero run and the case study chart both draw from it,
   so the two can never disagree. */
export const buildScores = [5.0, 6.0, 6.5, 6.7, 6.8, 7.0, 7.2, 7.5, 8.0, 8.3];

/* The run: a short scripted replay of how this page was made, played once in the hero. Every line is true of this build.
   `stage` is the index in profile.pipeline where the amber line is when that line completes, so the panel and the rail
   share one clock. The reviewer's score has no row of its own: it is the large number, drawn from buildScores. */
export type RunRow = { who: string; what: string; stage: number };

export const run = {
  title: `Built with AI, reviewed ${buildScores.length} times`,
  // What the title shortens to when the panel is too narrow to hold it.
  titleShort: "Built with AI",
  replay: "Replay the run",
  link: { label: "How it was built", href: `#${PROOF_ANCHOR}` },
  scoreLabel: "review score",
  rows: [
    { who: "builder", what: "writes code", stage: 2 },
    { who: "tests", what: "lint, axe", stage: 3 },
    { who: "me", what: "final call", stage: 4 },
  ] satisfies RunRow[],
};

/* The strip under the hero: three measurements from the work below it, each linking to the case that holds the evidence.
   The first leads and takes two columns: it is the best evidence on the page (an AI model compared with the on-device
   one, on a real meeting). Then a defect the reviewer caught, then client delivery. The reviewer's score is not repeated
   here: the hero panel and the chart already show it. A figure written "a to b" reads as before and after. A test ties
   every figure and label to the case text it comes from. */
export type Receipt = { figure: string; label: string; where: string; href: string };

export const receipts: Receipt[] = [
  {
    figure: "16/18",
    label: "About 16 of 18 sentences kept their meaning with Claude, about 7 of 18 with on-device translation.",
    where: "MeetRec, one 90 second meeting",
    href: `#${COMPARE_ANCHOR}`,
  },
  {
    figure: "28 to 0",
    label: "Sections of the page that stayed blank when scripts were blocked. The reviewer agent caught it in round 8.",
    where: "how it was built",
    href: `#${PROOF_ANCHOR}`,
  },
  {
    figure: "300+",
    label: "Drugstore locations in the store finder, searchable by chain and prefecture.",
    where: "store finder",
    href: "#store-finder",
  },
];

export type ExcerptRow = { label: string; value: string };

/* A row of what the reviewer caught. `quote` is the reviewer's own text for that round, so the claim can be read
   instead of taken on trust: an excerpt, with only formatting and a screenshot reference removed. */
export type CaughtRow = ExcerptRow & { quote?: { text: string; source: string } };

/* A comparison drawn as bars, from numbers the case study states in words. A test keeps the two in step. */
export type Comparison = { title: string; rows: { label: string; got: number; of: number }[]; caption: string };

/* Evidence about this page's own build. Every number is taken from the repository history, the reviewer reports or a
   measurement run on the finished build. Update them when they change (see CODING_STANDARDS.md). */
export type BuildProof = {
  anchor: string;
  title: string;
  caughtTitle: string;
  caught: CaughtRow[];
  chartTitle: string;
  scores: number[];
  checks: ExcerptRow[];
  // How the build ran, who did what. It is set in the case's text column, beside the panel.
  process: string;
};

export type CaseStudy = {
  title: string;
  client: string;
  problem: string;
  work: string[];
  outcome: string;
  stack: string[];
  personal: boolean;
  anchor?: string;
  link?: string;
  image?: { src: string; alt: string; width: number; height: number; label: string; note?: string };
  excerpt?: { title: string; caption: string; rows: ExcerptRow[] };
  comparison?: Comparison;
  proof?: BuildProof;
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "MeetRec: screen recorder with live translated subtitles",
    client: "Personal project",
    problem:
      "Japanese meetings move faster than I can take notes. I wanted a recording with subtitles in my language and a summary I can send afterwards.",
    work: [
      "Captures screen and audio on macOS",
      "Streams speech to text and translates it as live subtitles",
      "Produces a structured summary and action items after the call",
    ],
    outcome:
      "Tested on a real 90 second meeting segment: Apple's on-device translation kept the meaning in about 7 of 18 sentences, Claude's in about 16 of 18. The app shows the quick one first, then swaps in the better one. A private-meeting switch keeps translation on the device and asks before any summary leaves it.",
    stack: ["Swift", "SwiftUI", "ScreenCaptureKit", "Apple Speech", "Claude"],
    personal: true,
    anchor: "meetrec",
    comparison: {
      title: "translation quality",
      rows: [
        { label: "Claude", got: 16, of: 18 },
        { label: "On-device translation", got: 7, of: 18 },
      ],
      caption: "Sentences that kept their meaning in one real 90 second meeting segment. Both counts are approximate.",
    },
    image: {
      src: "/work-meetrec-window.png",
      alt: "MeetRec live subtitle window: each Japanese line from the meeting with its Thai translation below it",
      width: 1290,
      height: 776,
      label: "live subtitles",
      note: "The live window during a meeting. Each Japanese line is grey with its Thai translation in white. At 00:28 speech recognition heard ランニングページ (running page); the amber chip shows the app correcting it to ランディングページ (landing page).",
    },
  },
  {
    title: "An AI engineering workflow that runs my day",
    client: "Personal tooling",
    problem:
      "I wanted an AI setup I could trust with real work. It keeps notes between sessions, follows my rules, and a second agent reviews everything before it goes out. I make the final call.",
    work: [
      "A task harness that sends each job to the right tool or agent",
      "Persistent project memory across sessions",
      "Independent review agents before anything ships",
      "Browser, Photoshop, and Premiere driven from the same workflow",
    ],
    outcome:
      "This page is the evidence: rebuilt in one day and reviewed ten times by a separate agent that found real defects, listed here with their fixes.",
    stack: ["Claude Code", "MCP", "Playwright", "Node.js"],
    personal: true,
    anchor: "workflow",
    proof: {
      anchor: PROOF_ANCHOR,
      title: "this page, built by the workflow",
      caughtTitle: "What the reviewer caught",
      caught: [
        {
          label: "round 8",
          value: "Every section below the first screen stayed invisible until JavaScript loaded: 28 of 28 blocks hidden with scripts blocked. Now none are.",
          quote: {
            text: "Everything below the hero is invisible until JavaScript hydrates, and the audits did not see it. All 28 reveal wrappers are server-rendered with opacity:0 (reveal.tsx:25, stagger-rows.tsx:30). With only the 9 script requests aborted, 28 of 28 stayed hidden and About and Work rendered as empty panels [screenshot omitted]. axe checked 28 contrast nodes on the gate snapshot and on the unscrolled live page, against 156 once everything was revealed. When revealed it reports 0 violations, so the accessibility claim holds. The method was blind to 82% of it.",
            source: "Reviewer agent, round 8, finding 3. An excerpt of its report. The markdown backticks and a screenshot file name are removed and a bracketed note marks where the screenshot was. The wording is its own.",
          },
        },
        {
          label: "round 9",
          value: "On a tablet held upright the workflow table was 92 px wide and one value wrapped onto six lines. Now 374 px.",
        },
        {
          label: "round 10",
          value: "In a 625 px tall laptop window the process rail sat below the fold. Now it fits.",
        },
      ],
      chartTitle: "Reviewer's score out of 10, by round",
      scores: buildScores,
      checks: [
        { label: "lighthouse", value: "100 accessibility, 100 best practices, 100 SEO" },
        { label: "axe-core", value: "0 WCAG 2.2 violations" },
        { label: "every commit", value: "type check, lint, 17 content tests, no looping motion" },
        { label: "whole page", value: "about 400 KB over the wire, fonts included" },
      ],
      process:
        "I decided who it is for, what stays private and what to cut. The builder agent wrote the code and the checks, in small commits. A separate reviewer agent, fresh each round, scored the rendered page out of 10. Its score is a judgement, not a benchmark. I stopped when the rest needed material only I can supply.",
    },
  },
  {
    title: "A wrong delete, undone field by field",
    client: "Japanese D2C cosmetics brand, before launch",
    problem:
      "After a spreadsheet import, the new store held 69 duplicate SKUs and 4 duplicate titles across two generations of products, and no up to date master file was at hand to say which set was right.",
    work: [
      "Wrote small scripts for duplicate SKUs, missing metadata and collection assignments before changing anything",
      "Took a full JSON backup, then deleted the 13 older products. I approved that without the client's master sheet, because the store had not launched. It was the wrong call: the deleted set held the fuller variant, barcode and option data",
      "The next day, asked the client which sheet was the source of truth, backed up the other 41 products, restored the 13 as drafts and compared 90 SKUs field by field",
    ],
    outcome:
      "The restore matched on all 90 SKUs with zero field differences, so the 13 were published and the 41 newer products removed. The catalogue was then trimmed to 70 SKUs, again with a backup taken first, and the store has since launched. The source sheet's stock data also turned out to be about 19 months old.",
    stack: ["Python", "Shopify API", "JSON backups"],
    personal: false,
    anchor: "restore",
    metric: { value: "90/90", label: "SKUs restored with zero field differences" },
    excerpt: {
      title: "restore check",
      caption: "The recovery, in the order it ran",
      rows: [
        { label: "before the delete", value: "full JSON backup" },
        { label: "deleted", value: "13 older products" },
        { label: "before the restore", value: "backup of the other 41" },
        { label: "restored as", value: "drafts, published after the check" },
        { label: "compared", value: "90 of 90 SKUs, zero differences" },
        { label: "removed", value: "the 41 newer products" },
      ],
    },
  },
  {
    title: "Online store with a nationwide store finder",
    client: "Japanese D2C cosmetics brand",
    problem:
      "The brand sells online and through drugstores across Japan. It needed shoppers to find a nearby shelf, seasonal bundles to launch on schedule, and one person to own all of it for a Japanese‑speaking client.",
    work: [
      "Migrated 40+ products and variants from the client master sheet",
      "Built a searchable directory of drugstore locations with chain and prefecture filters",
      "Wrote Jest and Playwright tests for the finder and wired them into CI",
      "Shipped bundle campaign pages, shipping rules for remote islands, and a staging to production release flow",
    ],
    outcome:
      "The list grew from 61 locations in the first build to over 300 as chains were added. Every release goes to a staging theme first, then to production on a date agreed with the client.",
    stack: ["Shopify", "Liquid", "Jest", "Playwright", "GitHub Actions"],
    personal: false,
    anchor: "store-finder",
    metric: { value: "300+", label: "locations today, searchable by chain and prefecture" },
    image: {
      src: "/work-store-finder-phone.png",
      alt: "The store finder on a phone after a search for Yokohama: three filters, a count of eight, a clear-filters link, and result cards from different drugstore chains, each with a chain tag, address and phone number",
      width: 1392,
      height: 2298,
      label: "store finder",
      note: "Rendered at phone width from the production section and its store list as of October 2026 (304 stores, six chains). Searching Yokohama returns eight stores from four chains.",
    },
  },
  {
    title: "Landing pages for Japanese consumer brands",
    client: "Food and consumer brands, via agency",
    problem:
      "Campaign landing pages arrive as Photoshop files and Japanese annotations, with tracking that must keep working after every edit.",
    work: [
      "Built responsive pages in Tailwind from design files",
      "Kept client tracking tags (GTM, GA4, ad pixels) intact across edits",
      "Debugged a GA4 over-counting issue on a client site and documented the fix",
      "Prepared image and video assets with Photoshop and Premiere",
    ],
    outcome:
      "Every page is checked on desktop and phone, with tracking confirmed intact, before it goes to the client.",
    stack: ["Tailwind CSS", "GTM", "GA4", "Photoshop", "Premiere"],
    personal: false,
    excerpt: {
      title: "handover check",
      caption: "Run before every page goes to the client",
      rows: [
        { label: "viewports", value: "PC 1440 and SP 390" },
        { label: "tracking", value: "GTM, GA4, pixels intact" },
        { label: "copy", value: "Japanese lines as supplied" },
        { label: "assets", value: "images and video prepared in Photoshop and Premiere" },
        { label: "release", value: "staging, then production" },
      ],
    },
  },
];

export const experience = [
  {
    period: "Aug 2025 to now",
    company: "Piala Partner",
    location: "Bangkok",
    role: "Software Engineer / Bridge SE",
    summary:
      "Bridge SE means the engineer between a Japanese client and the team. I run each request from the Japanese brief to delivery: Shopify, landing pages, WordPress, tracking, QA, and the client conversation in Japanese.",
  },
  {
    period: "2022 to 2025",
    company: "",
    location: "Japan",
    role: "Language study",
    summary: "Lived in Japan, studied Japanese, built side projects.",
  },
  {
    period: "Mar 2021 to Mar 2022",
    company: "SAIJAI SOFT",
    location: "Chiang Mai",
    role: "Full-stack Engineer (contract)",
    summary:
      "University research platform: Next.js and NestJS, real‑time chat with Socket.IO, scheduled jobs, PostgreSQL.",
  },
  {
    period: "Mar 2020 to Nov 2020",
    company: "TecTony",
    location: "Thailand",
    role: "Full-stack Engineer (contract)",
    summary:
      "Gold savings service on LINE LIFF: Vue 3 front end, Node and Express API, Omise payments, MongoDB.",
  },
  {
    period: "Jun 2019 to Feb 2020",
    company: "Honda Automobile (Thailand)",
    location: "",
    role: "Software Engineer Intern",
    summary: "Insurance management system in PHP, jQuery, and MySQL.",
  },
];

export const education = {
  school: "Rajamangala University of Technology Lanna",
  degree: "B.Sc. Computer Information Systems",
  period: "2015 to 2020",
};

export const contact = {
  heading: "Looking for a new role.",
  body: "Open to engineering roles in Thailand, at Japanese-owned companies, or with international teams.",
  cta: "Email me",
  cvLabel: "Request CV",
};
