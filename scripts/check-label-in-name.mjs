// WCAG 2.5.3 Label in Name: a control's visible text must be part of its accessible name. Lighthouse fails the page when it
// is not, and the design kit's axe gate does not run that rule, so this one does, on the served page at a small phone, a
// phone and a desktop width (the panel title switches to its short form below about 344 px). A label split across a text node and an inline span is the usual way to trip it.
// Usage: node scripts/check-label-in-name.mjs http://localhost:3101 <design-kit-root>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const [base, kitRoot] = process.argv.slice(2);
if (!base || !kitRoot) throw new Error("usage: node scripts/check-label-in-name.mjs <base-url> <design-kit-root>");
const { chromium } = createRequire(join(kitRoot, "/"))("playwright-core");
const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const browser = await chromium.launch();
const problems = [];
for (const [width, height] of [[320, 568], [390, 844], [1440, 900]]) {
  const page = await (await browser.newContext({ viewport: { width, height } })).newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(Number(process.env.SETTLE_MS ?? 4600)); // the hero run settles first
  await page.addScriptTag({ content: axeSource });
  const targets = await page.evaluate(async () => {
    const rule = "label-content-name-mismatch"; // experimental in axe, so it has to be switched on
    const result = await axe.run(document, { runOnly: { type: "rule", values: [rule] }, rules: { [rule]: { enabled: true } } });
    return result.violations.flatMap((v) => v.nodes.map((n) => n.target.join(" ")));
  });
  for (const target of targets) problems.push(`${width}px: ${target}`);
  await page.close();
}
await browser.close();

if (problems.length > 0) {
  console.error(`check-label-in-name: FAIL, the visible text is not part of the accessible name:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("check-label-in-name: OK, the visible text of every labelled control is part of its accessible name");
