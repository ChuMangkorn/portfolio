// All page content lives here. Client names are never written (see docs/adr/0001).

export const profile = {
  name: "Mangkorn Chulaprungrueang",
  shortName: "Mangkorn",
  title: "Software Engineer",
  city: "Bangkok",
  role: "Software Engineer, Bangkok",
  headline: "One engineer, end to end.",
  pipeline: [
    { ja: "要件ヒアリング", en: "Brief, in Japanese" },
    { ja: "設計", en: "Design" },
    { ja: "実装", en: "Build" },
    { ja: "QA", en: "Test" },
    { ja: "納品", en: "Deliver" },
  ],
  tagline:
    "I take a Japanese client brief and ship the product myself: code, design, and media, in one AI-driven workflow.",
  jp: "日本語での要件ヒアリングから納品まで、一人で対応します。",
  email: "chu.mangkorn@gmail.com",
  github: "https://github.com/ChuMangkorn",
  linkedin: "https://linkedin.com/in/chulaprungrueang-mangkorn",
  photo: "/profile-cutout.png",
};

export const about = {
  paragraphs: [
    "At a Bangkok agency serving Japanese clients, I am the person between the client and the result. I read the brief in Japanese, decide what to build, build it, test it, and report back in Japanese.",
    "Most of my output goes through an AI agent workflow I built myself: a task harness, project memory, review agents, and browser automation. It lets one person cover work that used to need a small team.",
  ],
  ledger: [
    { key: "Brief language", value: "Japanese, JLPT N3" },
    { key: "Building for the web", value: "Since 2019" },
    { key: "Daily stack", value: "Shopify, WordPress, Tailwind" },
    { key: "Tests", value: "Jest and Playwright in CI" },
    { key: "Based in", value: "Bangkok" },
  ],
};

export type ExcerptRow = { label: string; value: string };

export type CaseStudy = {
  title: string;
  client: string;
  problem: string;
  work: string[];
  outcome: string;
  stack: string[];
  personal: boolean;
  link?: string;
  image?: { src: string; alt: string; width: number; height: number; label: string };
  excerpt?: { title: string; caption: string; rows: ExcerptRow[] };
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Online store with a nationwide store finder",
    client: "Japanese D2C cosmetics brand",
    problem:
      "The brand needed its online store, a nationwide store finder, and seasonal bundle campaigns, maintained by me alone for a Japanese-speaking client.",
    work: [
      "Migrated 40+ products and variants from the client master sheet",
      "Built a store finder covering 300+ drugstore locations with prefecture sort",
      "Wrote Jest and Playwright tests for the finder and wired them into CI",
      "Shipped bundle campaign pages, shipping rules for remote islands, and a staging to production release flow",
    ],
    outcome:
      "Every release goes to a staging theme first, then to production on a date agreed with the client.",
    stack: ["Shopify", "Liquid", "Jest", "Playwright", "GitHub Actions"],
    personal: false,
    metric: { value: "300+", label: "store locations in one searchable finder" },
    image: {
      src: "/work-storefinder.png",
      alt: "Store finder with chain and prefecture filters and a list of drugstore locations",
      width: 780,
      height: 440,
      label: "store finder",
    },
  },
  {
    title: "An AI engineering workflow that runs my day",
    client: "Personal tooling",
    problem:
      "Agent tools are only useful if they are reliable. I wanted a setup where the agent knows the client history, follows my rules, and checks its own work. In plain words: one AI assistant does the work, another reviews it, and I decide what ships.",
    work: [
      "Task harness that routes work to the right tool and sub-agent",
      "Persistent project memory across sessions",
      "Independent review agents before anything ships",
      "Browser, Photoshop, and Premiere driven from the same workflow",
    ],
    outcome:
      "I cover requirements, code, QA, images, and video for several clients at once.",
    stack: ["Claude Code", "MCP", "Playwright", "Node.js"],
    personal: true,
    excerpt: {
      title: "task routing",
      caption: "This is how every task enters my day",
      rows: [
        { label: "bug or slow", value: "diagnose first, then a second debugger" },
        { label: "new feature", value: "brainstorm, plan, tdd, code review" },
        { label: "check a page", value: "playwright, PC 1440 and SP 390 shots" },
        { label: "shopify store", value: "staging first, production on approval" },
        { label: "client history", value: "loaded from project memory every session" },
        { label: "before it ships", value: "an independent review agent reads the diff" },
        { label: "anything external", value: "ask first" },
      ],
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
      "Used in real client meetings. Thai transcription quality was tested and tuned on actual recordings.",
    stack: ["Swift", "macOS", "Apple Speech", "Claude API"],
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
      "Pages ship within days of the brief, mobile and desktop checked side by side before every handover.",
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
    period: "2025 - Present",
    company: "Piala Partner",
    location: "Bangkok",
    role: "Software Engineer / Bridge SE",
    summary:
      "The bridge between Japanese clients and the delivery team, owning the work end to end: Shopify, landing pages, WordPress, tracking, QA, and client communication in Japanese.",
  },
  {
    period: "2022 - 2025",
    company: "",
    location: "Japan",
    role: "Language study",
    summary: "Lived in Japan, studied Japanese, built side projects.",
  },
  {
    period: "2021 - 2022",
    company: "SAIJAI SOFT",
    location: "Chiang Mai",
    role: "Full-stack Engineer (contract)",
    summary:
      "University research platform: Next.js and NestJS, real-time chat with Socket.IO, scheduled jobs, PostgreSQL.",
  },
  {
    period: "2020",
    company: "TecTony",
    location: "Thailand",
    role: "Full-stack Engineer (contract)",
    summary:
      "Gold savings service on LINE LIFF: Vue 3 front end, Node and Express API, Omise payments, MongoDB.",
  },
  {
    period: "2019 - 2020",
    company: "Honda Automobile (Thailand)",
    location: "",
    role: "Software Engineer Intern",
    summary: "Insurance management system in PHP, jQuery, and MySQL.",
  },
];

export const education = {
  school: "Rajamangala University of Technology Lanna",
  degree: "B.Sc. Computer Information Systems",
  period: "2015 - 2020",
};

export const contact = {
  heading: "Looking for a new role.",
  body: "Open to engineering roles in Thailand or with international teams. Japanese-speaking environments welcome.",
  cta: "Email me",
  cvLabel: "Request CV",
};
