# Mangkorn Chulaprungrueang: portfolio

A single-page portfolio for a software engineer in Bangkok who takes a Japanese client brief to a shipped product alone, with an AI agent workflow.

This repository is also the evidence for that claim. It was rebuilt from scratch in one day, in small commits you can read, with [Claude Code](https://claude.com/claude-code). A pre-commit hook runs the fast checks, and a separate reviewing agent judged the rendered page ten times.

## How it was built

| Who | What |
|---|---|
| Me | Decide who the page is for, what stays anonymous ([ADR-0001](docs/adr/0001-anonymized-case-studies.md)), what to cut, and what looks wrong. |
| The builder agent | Writes the code and the checks, and fixes what the reviewer finds. |
| A reviewer agent | A separate agent with a fresh context each round. It renders the page at desktop, tablet and phone sizes and scores it. |

Reviewer score by round, out of 10:

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Score | 5.0 | 6.0 | 6.5 | 6.7 | 6.8 | 7.0 | 7.2 | 7.5 | 8.0 | 8.3 |

These scores are an AI reviewer's judgement. They are shown to document the loop, not as a certificate. I stopped when the remaining points needed material only I can supply: a new photo, public repositories for my personal projects, and an availability date.

## What "done" means here

`npm run check:fast` runs anywhere:

- type check and lint
- content tests: no client names, no placeholder text, no inflated language level, no dashes, and every number drawn on the page (the strip, the MeetRec bars) matches the case text it comes from; the quoted reviewer words are pinned by hash, so an edit has to be deliberate
- a motion rule: nothing on the page loops (WCAG 2.2.2)

`npm run check` is the full local pipeline and needs the design-check plugin I use with Claude Code. It adds a production build, share-card and metadata checks (preview image, icons, JSON-LD, robots, sitemap, 404), contrast, target size, overflow and reduced-motion checks on a rendered snapshot, axe-core, and writes receipts that a hook reads before the agent may call work finished. Four checks run in a real browser against the build: the hero run must end within 4.5 seconds, no animation may play longer than 5, and nothing may start by itself under reduced motion; every Japanese character on the page must be in the cut-down font; the visible text of every labelled control must be part of its accessible name (the rule Lighthouse calls label-content-name-mismatch); and when the reader raises the browser's default text size to 150% or 200% (from a 320 px phone up) the page must not scroll sideways and no text may be cut off sideways inside a box that clips it.

Measured on the finished build:

- Lighthouse, mobile and desktop: 100 accessibility, 100 best practices, 100 SEO
- axe-core: 0 WCAG 2.2 A/AA violations
- about 400 KB per page load (the project images are the heaviest part, about 35 KB each on a desktop), of which 77 KB is fonts (the Japanese font and the display font are each cut down to the glyphs the page uses); largest paint under 100 ms and layout shift under 0.002 on a local run with no network delay
- the hero run, a scripted opening that replays how the page was built, ends at 4.0 seconds, then everything rests

## Decisions worth reading

- [`docs/adr/0001-anonymized-case-studies.md`](docs/adr/0001-anonymized-case-studies.md): why no client is ever named
- [`docs/adr/0002-impact-from-one-run-not-loops.md`](docs/adr/0002-impact-from-one-run-not-loops.md): why the first screen gets one scripted run instead of loops, WebGL or a scroll library
- [`docs/research/portfolio-evidence.md`](docs/research/portfolio-evidence.md): what first-party sources say about how a hiring reader reads a page, what AI employers ask candidates for, and which browser features are safe to rely on (each claim cited, with what could not be verified)
- [`CODING_STANDARDS.md`](CODING_STANDARDS.md): the judgement calls a check cannot make
- [`GLOSSARY.md`](GLOSSARY.md): the vocabulary the content uses
- [`AGENTS.md`](AGENTS.md): what the agent reads before it touches the code

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # content tests
npm run check:fast
```

Stack: Next.js 16, React 19, Tailwind CSS 4. Entrance animation is plain CSS plus a small observer, with no animation library, and the page is fully visible without JavaScript.

## Notes

- Client names do not appear anywhere in this repository.
- The code is published so it can be read and reviewed. The text and images are not licensed for reuse.
