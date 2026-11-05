# Coding standards

Read during review. Mechanical rules are enforced by `npm run check`, not listed here.

## Content

- Every claim in `lib/data.ts` traces to another line in that file or to something the owner has said. Facts the owner has not supplied (availability, notice period, links to private work) are asked for, never filled in.
- The build log in `lib/data.ts` (`proof`) states numbers about this page: reviewer scores, check results, size. Each one must come from the git history, a reviewer report or a measurement of the finished build. Change the number when the build changes, and never round up.
- Case studies never name clients (docs/adr/0001-anonymized-case-studies.md). Real names live only in the gitignored `tests/banned.local.txt`.

## Motion

- Entrance timing and easing are tokens in `globals.css` (`--dur-reveal`, `--dur-row`, `--ease-out`, and the `--run-*` and `--hero-*` set for the hero run). `lib/reveal.ts` arms blocks only after the reader's first scroll, so a page that never scrolls still shows everything.
- Motion is finite. The hero run ends within 4.5 seconds of load and no animation plays longer than 5; `npm run check` measures both in a browser (`scripts/check-run-length.mjs`) and `check:motion` rejects looping in the source. Impact comes from the run, not from effects (docs/adr/0002-impact-from-one-run-not-loops.md).
- A keyframe only names where an element starts; the element's own style is the finished page. Content stays visible without JS and under reduced motion. When two animations set the same property on one element, give the later one an explicit `to`: an implicit end inherits the earlier animation's filled value and the element never returns to rest.
- A part of the run that starts below the fold sits inside `RunGate`, which holds it (and makes it inert, so a keyboard cannot land on something invisible) until it is seen. Entrance animations are wrapped in `@media (scripting: enabled)`, so a reader without script gets the finished page at once. Scroll-driven effects sit behind `@supports (animation-timeline: ...)` and inside `prefers-reduced-motion: no-preference`, and never hide content. They change fill, opacity or scale; the hero's 1.5rem recede is the only displacement, because WCAG 2.3.3 names scroll-triggered movement as a vestibular risk and technique C39 is the reduced-motion answer. Check the pixels, not the computed style: in Playwright's WebKit 26 build a scroll-driven transform or background-size reports the animated value in `getComputedStyle` while the paint stays at the resting state, so anything a reader must see goes through the `data-pending` release (`lib/reveal.ts`) instead. Give scroll-driven keyframes an explicit `from` as well as `to`: with an implicit `from`, WebKit drew the progress hairline at a quarter of its length at the halfway point. Time everything in the run off the rail (`--run-lead`, `--run-unit`) rather than inventing a second clock.
- Effects must be perceptible. Do not add a decoration whose contrast or movement a reader cannot see: it costs code, dilutes the parts that are distinctive, and an independent review will measure it.
- A control that only makes sense with motion (the replay button) is not rendered under reduced motion. Do not hide it with CSS: `verify_reduced_motion` reads that as content lost.

## Accessibility

- A link's visible label is one whole run of text. Splitting it across a text node and an inline span (to hide the tail in a narrow container, say) makes Lighthouse's label-in-name audit fail even when the `aria-label` starts with the same words; show one of two whole labels instead. `scripts/check-label-in-name.mjs` runs that rule on the served page, because the design kit's axe gate leaves it out.
- A focus ring must stay visible: inside a container that clips (`overflow-hidden`), draw it inward with `focus-visible:-outline-offset-4`.
- On screen the root font size is set in percentages of the reader's own default, never in pixels (print sets its own). The page must not scroll sideways at 150% default text on any width, or at 200% from a 390 px phone up; `scripts/check-text-size.mjs` sets the default text size through the browser protocol and measures it. A 320 to 360 px phone at 200% is a known gap: the card padding is in rem and takes most of the width.

## Type

- Display type (`font-display`) carries h1, h2 and case-study titles. Body and role lines use the sans.
- Japanese text uses a cut-down Noto Sans JP (`app/fonts/noto-sans-jp-subset.woff2`, about 30 KB) holding only the glyphs the page needs, instead of the full font's dozen slices (about 260 KB). When Japanese copy changes, run `node scripts/subset-jp-font.mjs`; `npm run check` fails if a character on the page is missing from the subset, so nothing silently falls back to a system font.
- Viewport height matters as much as width: the `short` and `tall` variants (46rem) tune the hero and the sticky visuals. A new hero element must keep the stage rail above the fold on a 1366x625 window.

## Release

- `lib/site.ts` is the only place the public address is written. Change it there if the Vercel project name differs.
- `app/opengraph-image.jpg` (also copied to `twitter-image.jpg`) embeds the role line, the headline, the Japanese line and the portrait. Re-render it with `node scripts/render-og.mjs http://localhost:3100 <design-kit-root>` (it reads `lib/data.ts` and the running page's fonts) whenever any of those change, then look at the result. `npm run check` enforces the size and the tags, not the content.
- The two project images are renders, not screenshots of a live site. `work-store-finder-phone.png` is the production store-finder section run against the theme stylesheet and the store list of a local theme pull, at phone width and 3x, in a device frame (nothing was requested from the client's store, and nothing that names the brand may be in frame: no logo, no header). `work-meetrec-window.png` is a capture of the app window on a dark stage. When either changes, rename the file as well: Next caches an optimised image by its URL, so an overwritten file keeps being served in its old form.
- The portrait is shown in its original colour, in the page and in the preview image. A monochrome version and a grain overlay were both tried and rejected: the owner did not like the black and white, and the grain made the skin look washed out.
