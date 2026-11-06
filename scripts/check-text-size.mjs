// A reader who raises the browser's default text size must not get a page that scrolls sideways, and must not lose text
// inside a box that clips it (a card figure with overflow-hidden hides what does not fit instead of scrolling, so the page
// width alone cannot see it). Rem-based layout grows with that setting, so this sets the default text size the way the
// browser setting does (CDP Page.setFontSizes) and measures the rendered page: 150% and 200% from 320 px, at six widths, plus every second pixel from 320 to 420 at 200%.
// The clipped-text rule takes the glyph boxes of every text node (Range.getClientRects) and compares them with every
// ancestor that hides its overflow sideways, the text's own parent included. A box that scrolls (overflow auto or scroll)
// is skipped: its content is reachable. It looks sideways only: a box that clips lines vertically on purpose (the score
// ticker) is not a loss.
// Usage: node scripts/check-text-size.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-text-size.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const CASES = [
  { width: 320, height: 568, sizes: [24, 32] },
  { width: 345, height: 640, sizes: [32] },
  { width: 360, height: 740, sizes: [24, 32] },
  { width: 390, height: 844, sizes: [24, 32] },
  { width: 768, height: 1024, sizes: [24, 32] },
  { width: 1440, height: 900, sizes: [24, 32] },
]; // default size in px: 24 is 150%, 32 is 200%

const browser = await chromium.launch();
const problems = [];

// Sideways scroll, and text lost inside a box that clips it, on the page as it stands now.
async function measure(page, width, pct) {
  const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  if (scroll > client + 1) problems.push(`${width} px wide at ${pct}% text: the page is ${scroll} px wide`);
  const clipped = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.trim();
      const parent = node.parentElement;
      if (!text || !parent || parent.closest(".sr-only, script, style, noscript")) continue;
      // The glyph boxes of the text itself, not the box of the element that holds it: a block whose text is wider
      // than the block still measures as the block.
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
      if (rects.length === 0) continue;
      let lost = 0;
      for (let box = parent; box && box !== document.documentElement; box = box.parentElement) {
        const overflow = getComputedStyle(box).overflowX;
        if (overflow === "visible") continue;
        if (overflow === "auto" || overflow === "scroll") break; // a scroll box: the rest is reachable
        const b = box.getBoundingClientRect();
        const left = b.left + box.clientLeft;
        const right = left + box.clientWidth;
        for (const r of rects) lost = Math.max(lost, r.right - right, left - r.left);
      }
      if (lost > 1) out.push(`"${text.slice(0, 28)}" loses ${Math.round(lost)} px`);
    }
    return out;
  });
  if (clipped.length > 0) problems.push(`${width} px wide at ${pct}% text: text is cut off: ${clipped.slice(0, 4).join("; ")}${clipped.length > 4 ? ` (and ${clipped.length - 4} more)` : ""}`);
}

async function openPage(width, height, size, settle) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Page.setFontSizes", { fontSizes: { standard: size, fixed: Math.round((size * 13) / 16) } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(settle);
  return { context, page };
}

// The page as a reader first sees it, and then with every disclosure open (a closed one holds text a reader can open).
// The first state matters on its own: opening a disclosure lays the page out again, and that cleared a first-load layout
// that was 541 px wide at 356 px (a balanced heading with a word break anywhere).
async function measurePage(page, width, pct) {
  await measure(page, width, pct);
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await page.waitForTimeout(300);
  await measure(page, width, pct);
}

for (const { width, height, sizes } of CASES) {
  for (const size of sizes) {
    const { context, page } = await openPage(width, height, size, Number(process.env.SETTLE_MS ?? 4600));
    await measurePage(page, width, Math.round((size / 16) * 100));
    await context.close();
  }
}

// The narrowest phones at 200%, every second pixel from 320 to 420, each in a fresh browser context, eight at a time: a
// width (356 px) once laid out a heading far wider than its box, which the sample widths above did not see. It showed in
// Playwright's own Chromium 145 on a first load, and not after a resize, after a reload in the same context, or in the
// design kit's browser, which is why this measures the first-load state before it opens the disclosures. The layout does
// not depend on the hero run, so these loads do not wait for it.
{
  const widths = Array.from({ length: 51 }, (_, i) => 320 + 2 * i);
  for (let i = 0; i < widths.length; i += 8) {
    await Promise.all(
      widths.slice(i, i + 8).map(async (width) => {
        const { context, page } = await openPage(width, 740, 32, 700);
        await measurePage(page, width, 200);
        await context.close();
      }),
    );
  }
}
await browser.close();

if (problems.length > 0) {
  console.error(`check-text-size: FAIL, a larger default text size breaks the page:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("check-text-size: OK, no sideways scroll and no text cut off at 150% or 200% text on the sample widths from 320 px, or at 200% on every second width from 320 to 420 px");
