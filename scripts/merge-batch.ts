#!/usr/bin/env bun
// merge-batch.ts <type> [--dry-run]
//
// Reads staged entries from _regen-staging/entries/<types>/<id>.json,
// validates each one against the current validator, and merges into the
// live public/data/<types>.json. Per Jeff's decision §14.3:
// ship-what-passes (no atomic per-type abort).
//
// Originals (addedDate < 2026-05-20) are NEVER touched.
//
// Backs up the live file to public/data/<types>.json.bak.<timestamp>
// before writing.

import { validateEntry, type RecipeType } from "./validator-lib";
import { STAGING_ROOT } from "./regen-lib";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const PROJECT_ROOT = process.cwd();
const RECENT_THRESHOLD = "2026-05-20";

const TYPE_FILES: Record<RecipeType, string> = {
  app: "apps.json",
  space: "spaces.json",
  automation: "automations.json",
  prompt: "prompts.json",
};

async function loadLive(type: RecipeType): Promise<any[]> {
  const p = path.join(PROJECT_ROOT, "public/data", TYPE_FILES[type]);
  return JSON.parse(await fs.readFile(p, "utf8"));
}

async function loadStagedById(type: RecipeType): Promise<Map<number, any>> {
  const dir = path.join(STAGING_ROOT, "entries", `${type}s`);
  const out = new Map<number, any>();
  try {
    const files = await fs.readdir(dir);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const id = parseInt(f.replace(".json", ""), 10);
      const entry = JSON.parse(await fs.readFile(path.join(dir, f), "utf8"));
      out.set(id, entry);
    }
  } catch (e) {
    console.error(`no staging dir at ${dir}`);
  }
  return out;
}

async function main() {
  const argv = process.argv.slice(2);
  const type = argv[0] as RecipeType;
  const dryRun = argv.includes("--dry-run");
  if (!["app", "space", "automation", "prompt"].includes(type)) {
    console.error("usage: bun scripts/merge-batch.ts <app|space|automation|prompt> [--dry-run]");
    process.exit(2);
  }

  const live = await loadLive(type);
  const staged = await loadStagedById(type);

  let replaced = 0;
  let skippedNotStaged = 0;
  let skippedValidation = 0;
  let untouched = 0;
  const validationFailures: Array<{ id: number; errors: string[] }> = [];

  const merged = live.map((row: any) => {
    const isRecent = (row.addedDate || "") >= RECENT_THRESHOLD;
    if (!isRecent) {
      untouched++;
      return row;
    }
    const stagedEntry = staged.get(row.id);
    if (!stagedEntry) {
      skippedNotStaged++;
      return row;
    }
    const result = validateEntry(type, stagedEntry);
    if (!result.ok) {
      skippedValidation++;
      validationFailures.push({ id: row.id, errors: result.errors });
      return row;
    }
    replaced++;
    return { ...row, ...stagedEntry };
  });

  console.log(`\n=== merge ${type} ===`);
  console.log(`mode:               ${dryRun ? "DRY RUN (no write)" : "WRITE"}`);
  console.log(`live entries:       ${live.length}`);
  console.log(`untouched originals:${untouched}`);
  console.log(`replaced:           ${replaced}`);
  console.log(`skipped (no stage): ${skippedNotStaged}`);
  console.log(`skipped (invalid):  ${skippedValidation}`);

  if (validationFailures.length > 0) {
    console.log(`\nvalidation failures:`);
    for (const f of validationFailures) {
      console.log(`  id=${f.id}: ${f.errors.join("; ")}`);
    }
  }

  if (dryRun) {
    console.log(`\n(dry run — no file written)`);
    return;
  }

  const livePath = path.join(PROJECT_ROOT, "public/data", TYPE_FILES[type]);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = `${livePath}.bak.${ts}`;
  await fs.copyFile(livePath, backupPath);
  await fs.writeFile(livePath, JSON.stringify(merged, null, 2) + "\n");
  console.log(`\nbackup: ${path.relative(PROJECT_ROOT, backupPath)}`);
  console.log(`wrote:  ${path.relative(PROJECT_ROOT, livePath)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
