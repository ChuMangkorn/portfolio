// Every Japanese character on the page must be in the cut-down font (app/fonts/noto-sans-jp-subset.chars.txt), or it
// would silently fall back to a system font. Reads the served HTML on stdin.
// Usage: curl -s localhost:3101 | node scripts/check-jp-font.mjs
import { readFileSync } from "node:fs";

const html = readFileSync(0, "utf8")
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, " ");
const onPage = new Set(html.match(/[　-ヿ㐀-鿿＀-￯]/g) ?? []);
const covered = new Set(readFileSync(new URL("../app/fonts/noto-sans-jp-subset.chars.txt", import.meta.url), "utf8").trim());
const missing = [...onPage].filter((c) => !covered.has(c));

if (missing.length) {
  console.error(`check-jp-font: FAIL, ${missing.length} character(s) are not in the font subset: ${missing.join(" ")}`);
  console.error("  Run: node scripts/subset-jp-font.mjs");
  process.exit(1);
}
console.log(`check-jp-font: OK, ${onPage.size} Japanese characters on the page, all in the font subset`);
