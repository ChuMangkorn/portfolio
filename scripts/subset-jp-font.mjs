// The page sets its Japanese text in Noto Sans JP, but only about thirty of the font's thousands of glyphs are ever used.
// This asks the Google Fonts API for a file holding exactly the glyphs the content needs (printable ASCII plus every CJK
// character in lib/data.ts) and writes it to app/fonts/, with the list of characters beside it. It is about 30 KB where
// the full font arrived as a dozen slices of roughly 260 KB. Run it whenever Japanese copy changes:
//   node scripts/subset-jp-font.mjs
// `npm run check` fails (scripts/check-jp-font.mjs) when a character on the page is missing from the subset.
import { writeFileSync } from "node:fs";
import * as data from "../lib/data.ts";

const CJK = /[　-ヿ㐀-鿿＀-￯]/g;
const strings = [];
(function walk(v) {
  if (typeof v === "string") strings.push(v);
  else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === "object") Object.values(v).forEach(walk);
})(data);

const cjk = [...new Set(strings.join("").match(CJK) ?? [])].sort();
const ascii = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join("");
const text = ascii + cjk.join("");

const css = await (
  await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap&text=${encodeURIComponent(text)}`, {
    // A current browser user agent makes the API answer with woff2.
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" },
  })
).text();
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
if (urls.length !== 1) throw new Error(`expected one variable font file for weights 400 to 500, got ${urls.length}`);

const file = Buffer.from(await (await fetch(urls[0])).arrayBuffer());
writeFileSync(new URL("../app/fonts/noto-sans-jp-subset.woff2", import.meta.url), file);
writeFileSync(new URL("../app/fonts/noto-sans-jp-subset.chars.txt", import.meta.url), cjk.join("") + "\n");
console.log(`subset written: ${cjk.length} CJK characters plus ASCII, ${(file.length / 1024).toFixed(1)} KB`);
