// A reader who raises the browser's default text size must not get a page that scrolls sideways. Rem-based layout grows
// with that setting, so this sets the default text size the way the browser setting does (CDP Page.setFontSizes) and
// measures the rendered page: 150% on every width, 200% from a 390 px phone up. A 320 to 360 px phone at 200% is not
// covered: the card padding alone takes most of the width there.
// Usage: node scripts/check-text-size.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-text-size.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const CASES = [
  { width: 320, height: 568, sizes: [24] },
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
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    if (scroll > client + 1) problems.push(`${width} px wide at ${Math.round((size / 16) * 100)}% text: the page is ${scroll} px wide`);
    await context.close();
  }
}
await browser.close();

if (problems.length > 0) {
  console.error(`check-text-size: FAIL, the page scrolls sideways at a larger default text size:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("check-text-size: OK, no sideways scroll at 150% text on any width or at 200% from 390 px");
