// The headings are set in one cut-down instance of Archivo (app/fonts/archivo-display-subset.woff2, printable ASCII). A
// character outside it would silently fall back to a system font. This reads the text of every element that carries the
// display face (the class font-display, whatever its tag) on the page and on the 404 page, in a real browser, and fails when
// one is missing from app/fonts/archivo-display-subset.chars.txt. Headings that are not set in the display face (the
// career list uses the text face) are not its business.
// Usage: node scripts/check-display-font.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-display-font.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const covered = new Set(readFileSync(new URL("../app/fonts/archivo-display-subset.chars.txt", import.meta.url), "utf8").replace(/\n$/, ""));
const browser = await chromium.launch();
const problems = [];
let elements = 0;
for (const path of ["/", "/no-such-page"]) {
  const page = await browser.newPage();
  await page.goto(base + path, { waitUntil: "networkidle" });
  const texts = await page.evaluate(() => [...document.querySelectorAll(".font-display")].map((el) => el.textContent ?? ""));
  elements += texts.length;
  for (const text of texts) {
    const missing = [...new Set(text.split("").filter((c) => !covered.has(c)))];
    if (missing.length) problems.push(`${path}: "${text.trim().slice(0, 40)}" has ${missing.join(" ")} outside the display font`);
  }
  await page.close();
}
await browser.close();

if (problems.length > 0) {
  console.error(`check-display-font: FAIL\n  ${problems.join("\n  ")}\n  Widen scripts/subset-display-font.mjs, or set that text in the text face.`);
  process.exit(1);
}
console.log(`check-display-font: OK, ${elements} display-face elements on the page and the 404, every character in the subset`);
