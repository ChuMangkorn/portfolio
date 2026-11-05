// All page content lives here. Client names are never written (see docs/adr/0001).

export const profile = {
  name: "Mangkorn Chulaprungrueang",
  shortName: "Mangkorn",
  title: "Software Engineer",
  city: "Bangkok",
  role: "Software Engineer, Bangkok",
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
  jp: "日本語での要件ヒアリングから納品まで、一貫して担当します。",
  email: "chu.mangkorn@gmail.com",
  github: "https://github.com/ChuMangkorn",
  linkedin: "https://linkedin.com/in/chulaprungrueang-mangkorn",
  photo: "/profile-cutout.png",
};

export const about = {
  proofLink: { label: "See how this page was built", href: "#workflow" },
  paragraphs: [
    "I work at a Bangkok agency for Japanese clients. A request arrives in Japanese; I work out what is being asked, build it, test it, and report back in Japanese.",
    "Most of my output goes through an AI agent workflow I set up and run: a task harness, notes that carry between sessions, review agents, and browser automation. I review what it produces before anything goes out.",
  ],
  ledger: [
    { key: "Brief language", value: "Japanese, JLPT N3" },
    { key: "Web work", value: "2019 to 2022, 2025 to now" },
    { key: "Daily stack", value: "Shopify, WordPress, Tailwind" },
    { key: "Tests", value: "Jest and Playwright in CI" },
    { key: "Based in", value: "Bangkok (UTC+7)" },
  ],
};

export type ExcerptRow = { label: string; value: string };

/* Evidence about this page's own build. Every number is taken from the repository history, the reviewer reports or a
   measurement run on the finished build. Update them when they change (see CODING_STANDARDS.md). */
export type BuildProof = {
  title: string;
  caughtTitle: string;
  caught: ExcerptRow[];
  chartTitle: string;
  scores: number[];
  checks: ExcerptRow[];
  caption: string;
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
  proof?: BuildProof;
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
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
    metric: { value: "300+", label: "locations today, searchable by chain and prefecture" },
    image: {
      src: "/work-storefinder.png",
      alt: "Early build of the store finder with chain and prefecture filters and a list of drugstore locations",
      width: 780,
      height: 440,
      label: "store finder",
      note: "Early build with 61 locations. The live list has since grown past 300.",
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
      "This page is the evidence: rebuilt in one day and reviewed ten times by a separate agent that found real defects, listed here with their fixes. Lighthouse scores it 100 for accessibility, best practices and SEO.",
    stack: ["Claude Code", "MCP", "Playwright", "Node.js"],
    personal: true,
    anchor: "workflow",
    proof: {
      title: "this page, built by the workflow",
      caughtTitle: "What the reviewer caught",
      caught: [
        {
          label: "round 8",
          value: "Every section below the first screen stayed invisible until JavaScript loaded: 28 of 28 blocks hidden with scripts blocked. Now 0 of 28.",
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
      scores: [5.0, 6.0, 6.5, 6.7, 6.8, 7.0, 7.2, 7.5, 8.0, 8.3],
      checks: [
        { label: "lighthouse", value: "100 accessibility, 100 best practices, 100 SEO" },
        { label: "axe-core", value: "0 WCAG 2.2 violations" },
        { label: "every commit", value: "type check, lint, 6 content tests, no looping motion" },
        { label: "whole page", value: "about 630 KB over the wire" },
      ],
      caption:
        "Rebuilt in one day, in small commits. I decided who it is for, what stays private and what to cut. The builder agent wrote the code and the checks. A separate reviewer agent, fresh each round, scored the rendered page, and I stopped when the rest needed material only I can supply.",
    },
  },
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
    image: {
      src: "/work-meetrec.png",
      alt: "MeetRec live subtitle window: each Japanese line from the meeting with its Thai translation below it",
      width: 1186,
      height: 665,
      label: "live subtitles",
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
