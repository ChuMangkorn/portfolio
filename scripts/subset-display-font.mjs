// The headlines are set in Archivo at 87.5% width (SemiCondensed) and weight 600, but the full variable font is about 90 KB
// for two axes the page never moves. This asks the Google Fonts API for exactly that named instance, cut to printable
// ASCII (a heading is English), and writes it to app/fonts/, about 8 KB. Only the named widths and weights (a width of 75,
// 87.5, 100 and a weight in steps of 100) come back as a small static file: an in-between value such as 84 or 640 comes
// back as a 59 KB variable subset. Run it if the display face, its width or its weight changes:
//   node scripts/subset-display-font.mjs
// `npm run check` fails (scripts/check-jp-font.mjs) when a character in a heading is outside the subset.
import { writeFileSync } from "node:fs";

const ascii = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join("");
const css = await (
  await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@87.5,600&display=swap&text=${encodeURIComponent(ascii)}`, {
    // A current browser user agent makes the API answer with woff2.
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" },
  })
).text();
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
if (urls.length !== 1) throw new Error(`expected one font file, got ${urls.length}`);

const res = await fetch(urls[0]);
if (!res.ok) throw new Error(`the font request answered ${res.status}`);
const file = Buffer.from(await res.arrayBuffer());
// A woff2 file starts with "wOF2"; anything else (an error page, an empty body) must not overwrite the font.
if (file.length < 1024 || file.subarray(0, 4).toString("latin1") !== "wOF2") throw new Error(`the answer is not a woff2 font (${file.length} bytes)`);
// An in-between width or weight comes back as a variable font of about 59 KB, not the 8 KB named instance this file is for.
if (file.length > 20 * 1024) throw new Error(`${(file.length / 1024).toFixed(0)} KB is a variable file: use a named width (75, 87.5, 100) and a weight in steps of 100`);
writeFileSync(new URL("../app/fonts/archivo-display-subset.woff2", import.meta.url), file);
writeFileSync(new URL("../app/fonts/archivo-display-subset.chars.txt", import.meta.url), ascii + "\n");
console.log(`display subset written: printable ASCII, ${(file.length / 1024).toFixed(1)} KB`);
