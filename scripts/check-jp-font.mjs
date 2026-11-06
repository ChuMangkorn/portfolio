// Every Japanese character on the page must be in the cut-down font (app/fonts/noto-sans-jp-subset.chars.txt), and every
// character in a heading must be in the display font (app/fonts/archivo-display-subset.chars.txt), or it would silently fall
// back to a system font. Reads the served HTML on stdin.
// Usage: curl -s localhost:3101 | node scripts/check-jp-font.mjs
import { readFileSync } from "node:fs";

const raw = readFileSync(0, "utf8");
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
const decode = (t) =>
  t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&rsquo;/g, "’");
const problems = [];

const onPage = new Set(strip(raw).match(/[　-ヿ㐀-鿿＀-￯]/g) ?? []);
const jp = new Set(readFileSync(new URL("../app/fonts/noto-sans-jp-subset.chars.txt", import.meta.url), "utf8").trim());
const missingJp = [...onPage].filter((c) => !jp.has(c));
if (missingJp.length) problems.push(`${missingJp.length} Japanese character(s) are not in the font subset: ${missingJp.join(" ")}  (run: node scripts/subset-jp-font.mjs)`);

const headings = [...raw.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/g)].map((m) => decode(strip(m[1])).replace(/\s+/g, " ").trim());
const display = new Set(readFileSync(new URL("../app/fonts/archivo-display-subset.chars.txt", import.meta.url), "utf8").replace(/\n$/, ""));
const missingDisplay = [...new Set(headings.join("").split("").filter((c) => !display.has(c)))];
if (missingDisplay.length) problems.push(`${missingDisplay.length} heading character(s) are not in the display font: ${missingDisplay.join(" ")}  (run: node scripts/subset-display-font.mjs after widening it)`);

if (problems.length) {
  console.error(`check-jp-font: FAIL\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-jp-font: OK, ${onPage.size} Japanese characters on the page, all in the font subset; ${headings.length} headings, all in the display font`);
