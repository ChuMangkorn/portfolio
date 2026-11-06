// A wide capture scrolls sideways on a phone and not from sm up (components/scroll-region.tsx). While it scrolls it must be
// a named, focusable region, so a keyboard can reach it; once its content fits it must be neither a focus stop nor a region
// announced as scrolling. This loads the page at a phone width, waits for the page to take over, then resizes the same page
// across the sm breakpoint (639 and 640 px) in both directions, and checks that a region that has focus keeps it, with its
// attributes, when the window is widened, and gives them up when it loses focus.
// Usage: node scripts/check-scroll-region.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-scroll-region.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const problems = [];
await page.goto(base, { waitUntil: "networkidle" });

// Every region in the page, as the page now has it: whether it scrolls and which of the three attributes it carries.
const snapshot = () =>
  page.evaluate(() =>
    [...document.querySelectorAll("[data-scroll-region]")].map((el) => ({
      scrolls: el.scrollWidth > el.clientWidth + 1,
      tabindex: el.getAttribute("tabindex"),
      role: el.getAttribute("role"),
      named: Boolean(el.getAttribute("aria-label")),
    })),
  );
const isNamed = (r) => r.tabindex === "0" && r.role === "region" && r.named;
const isBare = (r) => r.tabindex === null && r.role === null && !r.named;

// Waits for every region to reach the state its width calls for, so a slow observer is not mistaken for a wrong state.
async function expect(width, scrolls, what) {
  await page.setViewportSize({ width, height: 844 });
  const want = scrolls ? isNamed : isBare;
  const deadline = Date.now() + 3000;
  let regions = await snapshot();
  while (Date.now() < deadline && !(regions.length > 0 && regions.every((r) => r.scrolls === scrolls && want(r)))) {
    await page.waitForTimeout(50);
    regions = await snapshot();
  }
  if (regions.length === 0) return problems.push(`${what}: no [data-scroll-region] box found`);
  const bad = regions.filter((r) => r.scrolls !== scrolls || !want(r));
  if (bad.length > 0) problems.push(`${what} (${width} px): ${JSON.stringify(bad[0])} is not ${scrolls ? "a named, focusable region" : "bare"}`);
}

await expect(390, true, "phone, after the page took over");
await expect(1280, false, "wide screen");
await expect(639, true, "just below sm, after widening and narrowing");
await expect(640, false, "from sm up");
await expect(639, true, "back below sm");

// A focused region survives the window being widened, and is released when it loses focus.
const frames = () => page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
const focused = await page.evaluate(() => {
  const el = document.querySelector("[data-scroll-region]");
  el.focus();
  return document.activeElement === el;
});
if (!focused) problems.push("a scrolling region could not take focus");
await page.setViewportSize({ width: 1280, height: 844 });
await frames();
const kept = await page.evaluate(() => {
  const el = document.querySelector("[data-scroll-region]");
  return document.activeElement === el && el.getAttribute("tabindex") === "0";
});
if (!kept) problems.push("widening the window while a region has focus dropped the focus");
await page.evaluate(() => document.querySelector("[data-scroll-region]").blur());
await frames();
const released = await snapshot();
if (!released.every(isBare)) problems.push("a region that fits and has lost focus is still a focus stop");

await browser.close();

if (problems.length > 0) {
  console.error(`check-scroll-region: FAIL\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("check-scroll-region: OK, a scrolling capture is a named focusable region, a fitting one is not, both ways across sm, and focus survives a resize");
