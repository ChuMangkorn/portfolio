# ADR-0002: Impact comes from one scripted run, not from loops or heavy libraries

**Date:** 2026-11-05
**Status:** Accepted

## Context

The first five seconds should read as "this person builds with AI and builds well": beautiful, smooth, fast. The usual routes to that feeling are a WebGL or particle hero, ambient motion that loops, and a smooth-scroll library. For this page they cost more than they give. They slow the load the page boasts about, they break WCAG 2.2.2 (nothing may move on its own for more than five seconds), which the page passes today, and the hiring reader at a Japanese-owned or international company tends to read decoration as show rather than substance.

## Decision

Impact comes from one scripted run in the hero, about four seconds long, that plays once and rests, plus a little depth that follows the reader's own scrolling. The run replays how this page was built, using the real review scores, so the spectacle is also the evidence.

Everything is CSS. A keyframe only names where an element starts; the element's own style is the finished page. The HTML is therefore complete without script, without scrolling and under reduced motion, and the entrances only apply where scripting is on. No animation library is added.

The rail is the clock. The amber line reaches each of the five stages at a fixed beat, and the panel's checks and its score land on the same beats, so the hero tells one story at once instead of two things moving.

## Alternatives considered

- **WebGL, shader or particle hero.** Rejected: weight, battery, WCAG 2.2.2, and a look that every template shares.
- **Ambient looping motion with a pause button.** Rejected: it still moves on its own, and a pause control patches a rule the page can simply meet.
- **A smooth-scroll library.** Rejected: it fights find-in-page, the keyboard and anchor links, and native scrolling is already smooth at this size.
- **Pointer-following effects (a grid that lights near the cursor, a glow on cards).** Built and removed: an independent review measured them at about 1.2:1 contrast, below what a reader can see, and they are the stock kit of every AI portfolio, which dilutes what is not stock (the ten-round log and the defects it caught).
- **A live AI chat.** Rejected when the old portfolio was cut: it needs a key, a server and a cost, and it can fail in front of the reader.

## Consequences

- The run is measured, not trusted. `scripts/check-run-length.mjs` reads the real animations in a browser and fails the build if the hero run ends after 4.5 seconds, any single animation plays for more than 5, or anything starts by itself under reduced motion.
- New motion follows the same shape: finite, resting style equals the finished page, a part that starts below the fold waits until it is seen (`RunGate`), timings are tokens in `app/globals.css`.
- More spectacle later means more real content for the run, such as another event from the build, not more effects.
