// Link previews and search results depend on tags that regress silently. Reads the served HTML on stdin.
// Usage: curl -s localhost:3101 | node scripts/check-meta.mjs http://localhost:3101
import { readFileSync } from "node:fs";

const base = process.argv[2];
const html = readFileSync(0, "utf8");
const problems = [];

const tag = (re) => html.match(re)?.[1];
const meta = (key) => tag(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`));

const title = tag(/<title>([^<]*)<\/title>/);
const description = meta("description");
if (!title || title.length > 60) problems.push(`title missing or over 60 characters: ${title}`);
if (!description || description.length < 50 || description.length > 160) problems.push(`description should be 50 to 160 characters, got ${description?.length}`);
if (!tag(/<link rel="canonical" href="([^"]+)"/)) problems.push("canonical link missing");
if (meta("twitter:card") !== "summary_large_image") problems.push("twitter:card should be summary_large_image");
if (!meta("theme-color")) problems.push("theme-color missing");
if (!meta("og:image:alt")) problems.push("og:image:alt missing");
if (!/<link rel="icon"/.test(html) || !/<link rel="apple-touch-icon"/.test(html)) problems.push("icon or apple-touch-icon link missing");

const ld = tag(/<script type="application\/ld\+json">([^<]*)<\/script>/);
try {
  if (JSON.parse(ld ?? "")["@type"] !== "Person") problems.push("JSON-LD is not a Person");
} catch {
  problems.push("JSON-LD missing or not valid JSON");
}

// The preview image must be 1200x630 and small enough for chat apps.
const imageUrl = meta("og:image");
if (!imageUrl) problems.push("og:image missing");
else {
  const res = await fetch(base + new URL(imageUrl).pathname + new URL(imageUrl).search);
  const bytes = Buffer.from(await res.arrayBuffer());
  let width = 0;
  let height = 0;
  for (let i = 2; i < bytes.length; ) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    if (marker >= 0xc0 && marker <= 0xc3) {
      height = bytes.readUInt16BE(i + 5);
      width = bytes.readUInt16BE(i + 7);
      break;
    }
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  if (width !== 1200 || height !== 630) problems.push(`og:image is ${width}x${height}, expected 1200x630`);
  if (bytes.length > 300 * 1024) problems.push(`og:image is ${Math.round(bytes.length / 1024)}KB, keep it under 300KB`);
}

// Every in-page link lands on something. The content tests compare data with data, so a missing id would pass them.
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const fragment of new Set([...html.matchAll(/\shref="#([^"]+)"/g)].map((m) => m[1]))) {
  if (!ids.has(fragment)) problems.push(`a link to #${fragment} has no element with that id`);
}

for (const path of ["/robots.txt", "/sitemap.xml"]) {
  const res = await fetch(base + path);
  if (!res.ok) problems.push(`${path} returned ${res.status}`);
}
if ((await fetch(base + "/no-such-page")).status !== 404) problems.push("unknown paths should return 404");

if (problems.length) {
  console.error("check-meta: FAIL");
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}
console.log("check-meta: OK, preview image, tags, icons, JSON-LD, robots, sitemap, 404 and in-page links");
