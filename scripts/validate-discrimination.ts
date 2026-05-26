#!/usr/bin/env bun
// validate-discrimination.ts
//
// Runs the validator across all four types and prints a pass-rate
// comparison between the originals (addedDate < 2026-05-20) and the
// 2026-05-25 batch (addedDate >= 2026-05-20). Use this to confirm the
// validator discriminates as expected before running the regeneration.

import { validateEntry, type RecipeType } from "./validator-lib";

const TYPES: Array<{ type: RecipeType; file: string }> = [
  { type: "app",        file: "public/data/apps.json" },
  { type: "space",      file: "public/data/spaces.json" },
  { type: "automation", file: "public/data/automations.json" },
  { type: "prompt",     file: "public/data/prompts.json" },
];
const THRESHOLD = "2026-05-20";

async function summarise(type: RecipeType, file: string) {
  const data = (await Bun.file(file).json()) as Array<Record<string, unknown>>;
  const older = data.filter((e) => !e.addedDate || (e.addedDate as string) < THRESHOLD);
  const recent = data.filter((e) => (e.addedDate as string | undefined) && (e.addedDate as string) >= THRESHOLD);
  const tally = (arr: typeof data) => {
    let pass = 0, fail = 0;
    for (const e of arr) {
      const r = validateEntry(type, e);
      if (r.ok) pass++; else fail++;
    }
    const total = pass + fail;
    const pct = total === 0 ? 0 : Math.round((pass / total) * 100);
    return { pass, fail, total, pct };
  };
  return { type, older: tally(older), recent: tally(recent) };
}

async function main() {
  console.log("Validator discrimination check");
  console.log("==============================");
  console.log("Threshold: addedDate < " + THRESHOLD + " = originals, >= " + THRESHOLD + " = recent batch\n");
  console.log("type        originals               recent batch            gap");
  console.log("----        -----------             -----------             ---");
  for (const { type, file } of TYPES) {
    const r = await summarise(type, file);
    const ol = `${r.older.pass}/${r.older.total} (${r.older.pct}%)`.padEnd(24);
    const rc = `${r.recent.pass}/${r.recent.total} (${r.recent.pct}%)`.padEnd(24);
    const gap = `${r.older.pct - r.recent.pct >= 0 ? "+" : ""}${r.older.pct - r.recent.pct}pt`;
    console.log(`${type.padEnd(12)}${ol}${rc}${gap}`);
  }
  console.log("\nRead: 'originals pass at X%, recent at Y%, gap = X - Y'.");
  console.log("Positive gap => validator correctly identifies the recent batch as weaker.");
  console.log("Negative gap => recent batch is actually better on this axis.");
}

main();
