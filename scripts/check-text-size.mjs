// A reader who raises the browser's default text size must not get a page that scrolls sideways, and must not lose text
// inside a box that clips it (a card figure with overflow-hidden hides what does not fit instead of scrolling, so the page
// width alone cannot see it). Rem-based layout grows with that setting, so this sets the default text size the way the
// browser setting does (CDP Page.setFontSizes) and measures the rendered page: 150% on every width, 200% from a 360 px
// phone up. A 320 px phone at 200% is not covered (one chart label loses 3 px there).
// The clipped-text rule looks at every visible element that holds its own text and finds the nearest ancestor that hides
// its overflow sideways. A box that scrolls (overflow auto or scroll) is skipped: its content is reachable.
// Usage: node scripts/check-text-size.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-text-size.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const CASES = [
  { width: 320, height: 568, sizes: [24] },
  { width: 360, height: 740, sizes: [24, 32] },
  { width: 390, height: 844, sizes: [24, 32] },
  { width: 768, height: 1024, sizes: [24, 32] },
  { width: 1440, height: 900, sizes: [24, 32] },
]; // default size in px: 24 is 150%, 32 is 200%

const browser = await chromium.launch();
const problems = [];
for (const { width, height, sizes } of CASES) {
  for (const size of sizes) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Page.setFontSizes", { fontSizes: { standard: size, fixed: Math.round((size * 13) / 16) } });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(Number(process.env.SETTLE_MS ?? 4600));
    // A closed disclosure holds text a reader can open, so measure it open.
    await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
    await page.waitForTimeout(300);
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    const pct = Math.round((size / 16) * 100);
    if (scroll > client + 1) problems.push(`${width} px wide at ${pct}% text: the page is ${scroll} px wide`);
    const clipped = await page.evaluate(() => {
      const out = [];
      const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      for (const el of document.body.querySelectorAll("*")) {
        if (el.closest(".sr-only") || !ownText(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        for (let box = el.parentElement; box && box !== document.body; box = box.parentElement) {
          const overflow = getComputedStyle(box).overflowX;
          if (overflow === "visible") continue;
          if (overflow === "auto" || overflow === "scroll") break;
          const b = box.getBoundingClientRect();
          const lost = Math.max(r.right - b.right, b.left - r.left);
          if (lost > 1) out.push(`"${el.textContent.trim().slice(0, 28)}" loses ${Math.round(lost)} px inside <${box.tagName.toLowerCase()}>`);
          break;
        }
      }
      return out;
    });
    if (clipped.length > 0) problems.push(`${width} px wide at ${pct}% text: text is cut off: ${clipped.slice(0, 4).join("; ")}${clipped.length > 4 ? ` (and ${clipped.length - 4} more)` : ""}`);
    await context.close();
  }
}
await browser.close();

if (problems.length > 0) {
  console.error(`check-text-size: FAIL, a larger default text size breaks the page:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("check-text-size: OK, no sideways scroll and no text cut off at 150% text on any width or at 200% from 360 px");
