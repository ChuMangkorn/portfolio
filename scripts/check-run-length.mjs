// WCAG 2.2.2: nothing may move on its own for more than five seconds. check-motion.mjs bans looping in the source; this
// measures the real animations in a browser. The hero run must be over within 4.5 seconds of load, no single animation
// may play for more than five seconds, and a reader who asks for reduced motion gets none that starts by itself.
// Usage: node scripts/check-run-length.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const HERO_LIMIT_MS = 4500;
const SINGLE_LIMIT_MS = 5000;

const measure = () => {
  const own = document.getAnimations().filter((a) => a.timeline instanceof DocumentTimeline);
  const hero = document.querySelector("main > section");
  const timing = (a) => a.effect.getComputedTiming();
  const heroEnds = own.filter((a) => hero.contains(a.effect.target)).map((a) => timing(a).endTime);
  return {
    total: own.length,
    heroEnd: Math.max(0, ...heroEnds),
    longest: Math.max(0, ...own.map((a) => timing(a).activeDuration)),
  };
};

const browser = await chromium.launch();
const problems = [];
let summary = "";

{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  const m = await page.evaluate(measure);
  if (m.total === 0) problems.push("no animations found: the hero run did not start");
  if (m.heroEnd > HERO_LIMIT_MS) problems.push(`the hero run ends at ${Math.round(m.heroEnd)} ms, over the ${HERO_LIMIT_MS} ms limit`);
  if (m.longest > SINGLE_LIMIT_MS) problems.push(`an animation plays for ${Math.round(m.longest)} ms, over the ${SINGLE_LIMIT_MS} ms limit`);
  summary = `the hero run ends at ${Math.round(m.heroEnd)} ms, longest single animation ${Math.round(m.longest)} ms`;
}

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  const m = await page.evaluate(measure);
  if (m.total !== 0) problems.push(`${m.total} animation(s) still run under reduced motion`);
}

await browser.close();

if (problems.length) {
  console.error("check-run-length: FAIL");
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}
console.log(`check-run-length: OK, ${summary}, none under reduced motion`);
