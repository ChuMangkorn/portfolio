# Coding standards

Read during review. Mechanical rules are enforced by `npm run check`, not listed here.

## Content

- Every claim in `lib/data.ts` traces to another line in that file or to something the owner has said. Facts the owner has not supplied (availability, notice period, links to private work) are asked for, never filled in.
- Case studies never name clients (docs/adr/0001-anonymized-case-studies.md). Real names live only in the gitignored `tests/banned.local.txt`.

## Motion

- Entrance animation uses `EASE_OUT` from `lib/motion.ts`.
- Motion is finite and under five seconds in total. `npm run check:motion` rejects looping animation.
- Content stays visible without JS and under reduced motion: animated elements carry `data-reveal`.

## Type

- Display type (`font-display`) carries h1, h2 and case-study titles. Body and role lines use the sans.

## Release

- `lib/site.ts` is the only place the public address is written. Change it there if the Vercel project name differs.
- `app/opengraph-image.jpg` (also copied to `twitter-image.jpg`) embeds the headline, the Japanese line and the portrait. Re-render it from the live page at 1200x630 whenever any of those change. `npm run check` enforces the size and the tags, not the content.
- The portrait is shown in monochrome (`grayscale` in `hero.tsx`, same in the preview image). Remove both together to go back to colour.
