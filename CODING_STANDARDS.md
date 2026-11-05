# Coding standards

Read during review. Mechanical rules are enforced by `npm run check`, not listed here.

## Content

- Every claim in `lib/data.ts` traces to another line in that file or to something the owner has said. Facts the owner has not supplied (availability, notice period, links to private work) are asked for, never filled in.
- The build log in `lib/data.ts` (`proof`) states numbers about this page: reviewer scores, check results, size. Each one must come from the git history, a reviewer report or a measurement of the finished build. Change the number when the build changes, and never round up.
- Case studies never name clients (docs/adr/0001-anonymized-case-studies.md). Real names live only in the gitignored `tests/banned.local.txt`.

## Motion

- Entrance timing and easing are tokens in `globals.css` (`--dur-reveal`, `--dur-row`, `--ease-out`). `lib/reveal.ts` arms blocks only after the reader's first scroll, so a page that never scrolls still shows everything.
- Motion is finite and under five seconds in total. `npm run check:motion` rejects looping animation.
- Content stays visible without JS and under reduced motion: animated elements carry `data-reveal`.

## Type

- Display type (`font-display`) carries h1, h2 and case-study titles. Body and role lines use the sans.
- Viewport height matters as much as width: the `short` and `tall` variants (46rem) tune the hero and the sticky visuals. A new hero element must keep the stage rail above the fold on a 1366x625 window.

## Release

- `lib/site.ts` is the only place the public address is written. Change it there if the Vercel project name differs.
- `app/opengraph-image.jpg` (also copied to `twitter-image.jpg`) embeds the headline, the Japanese line and the portrait. Re-render it from the live page at 1200x630 whenever any of those change. `npm run check` enforces the size and the tags, not the content.
- The portrait is shown in its original colour, in the page and in the preview image. A monochrome version and a grain overlay were both tried and rejected: the owner did not like the black and white, and the grain made the skin look washed out.
