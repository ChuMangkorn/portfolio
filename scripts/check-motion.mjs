// WCAG 2.2.2: nothing may move or blink on its own for more than five seconds.
// Looping animation is the mechanical way to break that, so any "infinite" in source fails the check.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components"];
const EXT = /\.(css|tsx|ts)$/;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (EXT.test(name)) {
      readFileSync(path, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/\binfinite\b|Infinity/.test(line)) hits.push(`${path}:${i + 1}: ${line.trim()}`);
        });
    }
  }
}

ROOTS.forEach(walk);
if (hits.length) {
  console.error("Looping animation found. Use a finite iteration count (under five seconds in total):");
  hits.forEach((h) => console.error("  " + h));
  process.exit(1);
}
console.log("check-motion: OK, no looping animation");
