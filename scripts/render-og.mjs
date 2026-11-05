// Renders the 1200x630 share card (the preview shown when the link is pasted into LINE, Slack, Chatwork or an email) from
// lib/data.ts and the fonts of the running page, and writes app/opengraph-image.jpg and app/twitter-image.jpg.
// Run it whenever the role line, the headline, the Japanese line or the portrait changes, then look at the result.
// Usage: node scripts/render-og.mjs http://localhost:3100 <design-kit-root> [output-dir]
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { profile } from "../lib/data.ts";

const [base, kitRoot, outDir = new URL("../app/", import.meta.url).pathname] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/render-og.mjs <base-url> <design-kit-root> [output-dir]");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");

const [roleBefore, roleAfter] = profile.role.split(profile.roleEmphasis);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
await page.goto(base, { waitUntil: "networkidle" });

await page.evaluate(async ({ profile, roleBefore, roleAfter }) => {
  document.documentElement.style.overflow = "hidden";
  const text = (tag, css, content) => {
    const el = document.createElement(tag);
    el.style.cssText = css;
    el.textContent = content;
    return el;
  };
  const SANS = "font-family:var(--font-geist-sans),system-ui,sans-serif;";
  const INK = "color:#ececf1;";
  const MUTED = "color:#a0a0ab;";
  const AMBER = "#e2a640";

  document.body.replaceChildren();
  document.body.style.cssText = "margin:0;background:#0d0d10;width:1200px;height:630px;overflow:hidden;position:relative;";

  const glow = document.createElement("div");
  glow.style.cssText = `position:absolute;inset:0;background:radial-gradient(ellipse 520px 430px at 80% 40%, rgba(226,166,64,0.34) 0%, rgba(226,166,64,0) 70%);`;
  const photo = document.createElement("img");
  photo.src = profile.photo;
  photo.style.cssText =
    "position:absolute;right:56px;bottom:0;height:566px;width:auto;-webkit-mask-image:linear-gradient(to right,transparent,black 14%,black 86%,transparent),linear-gradient(to top,transparent,black 12%);-webkit-mask-composite:source-in;mask-composite:intersect;";

  const column = document.createElement("div");
  column.style.cssText = "position:absolute;left:72px;top:64px;bottom:60px;width:640px;display:flex;flex-direction:column;justify-content:space-between;";

  const role = text("div", `${SANS}font-size:34px;${MUTED}letter-spacing:0.01em;`, "");
  role.append(text("span", `color:${AMBER};font-weight:500;`, profile.roleEmphasis), document.createTextNode(`${roleAfter}`));
  if (roleBefore) role.prepend(document.createTextNode(roleBefore));

  const middle = document.createElement("div");
  middle.append(
    text("div", `font-family:var(--font-display-serif),Georgia,serif;font-size:122px;line-height:0.98;${INK}text-wrap:balance;word-spacing:0.06em;`, profile.headline),
    Object.assign(text("div", `margin-top:30px;font-family:var(--font-noto-jp),sans-serif;font-weight:500;font-size:25px;line-height:1.5;${INK}word-break:auto-phrase;text-wrap:balance;`, profile.jp), { lang: "ja" }),
  );

  const name = document.createElement("div");
  name.style.cssText = `display:flex;align-items:center;gap:18px;${SANS}font-size:30px;font-weight:500;${INK}`;
  const bar = document.createElement("span");
  bar.style.cssText = `display:inline-block;width:44px;height:4px;background:${AMBER};border-radius:2px;`;
  name.append(bar, document.createTextNode(profile.name));

  column.append(role, middle, name);
  document.body.append(glow, photo, column);

  await Promise.all([
    document.fonts.load('122px "Instrument Serif"', profile.headline),
    document.fonts.load('500 25px "Noto Sans JP"', profile.jp),
    document.fonts.load('34px "Geist"', profile.role),
    document.fonts.load('500 34px "Geist"', profile.roleEmphasis),
    document.fonts.load('500 30px "Geist"', profile.name),
  ]);
  await document.fonts.ready;
  await photo.decode();
  await new Promise((resolve) => setTimeout(resolve, 400));
}, { profile, roleBefore, roleAfter });

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "opengraph-image.jpg");
await page.screenshot({ path: target, type: "jpeg", quality: 90 });
copyFileSync(target, join(outDir, "twitter-image.jpg"));
await browser.close();
console.log(`render-og: wrote ${target} and twitter-image.jpg`);
