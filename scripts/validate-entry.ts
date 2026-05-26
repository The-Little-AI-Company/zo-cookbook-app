#!/usr/bin/env bun
// validate-entry.ts <type> <path-to-entry.json>
// Exits 0 on pass, 1 on fail. Prints errors and warnings to stdout.

import { validateEntry, type RecipeType } from "./validator-lib";

const VALID_TYPES: RecipeType[] = ["app", "space", "automation", "prompt"];

async function main() {
  const [typeArg, pathArg] = process.argv.slice(2);
  if (!typeArg || !pathArg) {
    console.error("usage: bun scripts/validate-entry.ts <app|space|automation|prompt> <entry.json>");
    process.exit(2);
  }
  if (!VALID_TYPES.includes(typeArg as RecipeType)) {
    console.error(`invalid type "${typeArg}". must be one of: ${VALID_TYPES.join(", ")}`);
    process.exit(2);
  }
  let entry: unknown;
  try {
    entry = await Bun.file(pathArg).json();
  } catch (e) {
    console.error(`failed to read ${pathArg}: ${(e as Error).message}`);
    process.exit(2);
  }

  const result = validateEntry(typeArg as RecipeType, entry);
  const id = (entry as { id?: number; name?: string })?.id ?? "?";
  const name = (entry as { name?: string })?.name ?? "?";
  console.log(`${result.ok ? "PASS" : "FAIL"}  ${typeArg}#${id} "${name}"`);
  for (const err of result.errors) console.log(`  ERR  ${err}`);
  for (const w of result.warnings) console.log(`  WARN ${w}`);
  process.exit(result.ok ? 0 : 1);
}

main();
