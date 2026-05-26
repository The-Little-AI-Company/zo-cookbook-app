#!/usr/bin/env bun
// validate-batch.ts <type> <path-to-array.json> [--verbose] [--only-recent]
//
// Runs the validator across every entry in the JSON array and prints a
// summary. Use --verbose to also print per-entry errors. Use --only-recent
// to restrict to entries with addedDate >= 2026-05-20.

import { validateEntry, type RecipeType, type ValidationResult } from "./validator-lib";

const VALID_TYPES: RecipeType[] = ["app", "space", "automation", "prompt"];
const RECENT_THRESHOLD = "2026-05-20";

type Row = { id: number | string; name: string; result: ValidationResult; addedDate?: string };

async function main() {
  const argv = process.argv.slice(2);
  const verbose = argv.includes("--verbose");
  const onlyRecent = argv.includes("--only-recent");
  const onlyOlder = argv.includes("--only-older");
  const positional = argv.filter((a) => !a.startsWith("--"));
  const [typeArg, pathArg] = positional;

  if (!typeArg || !pathArg) {
    console.error("usage: bun scripts/validate-batch.ts <app|space|automation|prompt> <array.json> [--verbose] [--only-recent] [--only-older]");
    process.exit(2);
  }
  if (!VALID_TYPES.includes(typeArg as RecipeType)) {
    console.error(`invalid type "${typeArg}"`);
    process.exit(2);
  }

  const data = (await Bun.file(pathArg).json()) as Array<Record<string, unknown>>;
  if (!Array.isArray(data)) {
    console.error(`${pathArg} is not a JSON array`);
    process.exit(2);
  }

  const rows: Row[] = [];
  const errorTally = new Map<string, number>();
  let pass = 0, fail = 0, skipped = 0;

  for (const entry of data) {
    const addedDate = (entry.addedDate as string | undefined) ?? "";
    if (onlyRecent && addedDate < RECENT_THRESHOLD) { skipped++; continue; }
    if (onlyOlder && addedDate >= RECENT_THRESHOLD) { skipped++; continue; }

    const result = validateEntry(typeArg as RecipeType, entry);
    const row: Row = {
      id: (entry.id as number | string) ?? "?",
      name: (entry.name as string) ?? "?",
      result,
      addedDate,
    };
    rows.push(row);
    if (result.ok) pass++; else fail++;
    for (const e of result.errors) {
      // Group by leading phrase so "description too short: 128" and "description too short: 144" tally together.
      const key = e.replace(/:\s.*$/, ":").replace(/\d+/g, "N");
      errorTally.set(key, (errorTally.get(key) ?? 0) + 1);
    }
  }

  const total = pass + fail;
  const passPct = total === 0 ? 0 : Math.round((pass / total) * 100);
  console.log(`\n=== ${typeArg} batch summary ===`);
  console.log(`source: ${pathArg}`);
  if (onlyRecent) console.log(`scope: only recent (addedDate >= ${RECENT_THRESHOLD})`);
  if (onlyOlder) console.log(`scope: only originals (addedDate < ${RECENT_THRESHOLD})`);
  console.log(`evaluated: ${total}  pass: ${pass}  fail: ${fail}  pass-rate: ${passPct}%${skipped ? `  skipped: ${skipped}` : ""}`);

  if (errorTally.size > 0) {
    console.log(`\ntop error categories:`);
    const sorted = Array.from(errorTally.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15);
    const maxLen = Math.max(...sorted.map(([k]) => k.length));
    for (const [k, n] of sorted) {
      console.log(`  ${String(n).padStart(4)}  ${k.padEnd(maxLen)}`);
    }
  }

  if (verbose) {
    console.log(`\nper-entry detail (fails only):`);
    for (const r of rows) {
      if (r.result.ok) continue;
      console.log(`  FAIL  #${r.id} "${r.name}" (${r.addedDate || "no date"})`);
      for (const err of r.result.errors) console.log(`    ERR  ${err}`);
    }
  }

  process.exit(fail > 0 ? 1 : 0);
}

main();
