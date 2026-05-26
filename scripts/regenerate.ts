#!/usr/bin/env bun
// regenerate.ts <type> [--limit N] [--chunk N] [--skip-existing]
//
// type: app | space | automation
// --limit N: only process the first N in-scope IDs (pilot)
// --chunk N: how many entries per /zo/ask call (default 12)
// --skip-existing: skip IDs already present in _regen-staging/entries/

import {
  loadType, loadExemplars, inScope, buildPrompt, askZo,
  ensureStagingDirs, loadStaged, saveStaged, appendLog,
  mergeFields, validate, type RecipeType,
} from "./regen-lib";

const VALID: RecipeType[] = ["app", "space", "automation"];

async function main() {
  const argv = process.argv.slice(2);
  const type = argv[0] as RecipeType;
  if (!VALID.includes(type)) {
    console.error("usage: bun scripts/regenerate.ts <app|space|automation> [--limit N] [--chunk N] [--skip-existing]");
    process.exit(2);
  }
  const limitArg = argv.indexOf("--limit");
  const limit = limitArg >= 0 ? parseInt(argv[limitArg + 1], 10) : Infinity;
  const chunkArg = argv.indexOf("--chunk");
  const chunkSize = chunkArg >= 0 ? parseInt(argv[chunkArg + 1], 10) : 12;
  const skipExisting = argv.includes("--skip-existing");

  await ensureStagingDirs();

  const allEntries = await loadType(type);
  const exemplars = await loadExemplars(type);
  let inScopeEntries = allEntries.filter(inScope);
  if (Number.isFinite(limit)) inScopeEntries = inScopeEntries.slice(0, limit);

  if (skipExisting) {
    const filtered: any[] = [];
    for (const e of inScopeEntries) {
      const s = await loadStaged(type, e.id);
      if (!s) filtered.push(e);
    }
    console.log(`skip-existing: ${inScopeEntries.length - filtered.length} already staged, ${filtered.length} remain`);
    inScopeEntries = filtered;
  }

  console.log(`type: ${type}`);
  console.log(`exemplars: ${exemplars.map((e) => `#${e.id} ${e.name}`).join(", ")}`);
  console.log(`in-scope: ${inScopeEntries.length} entries  chunk: ${chunkSize}`);
  if (inScopeEntries.length === 0) {
    console.log("nothing to do");
    return;
  }

  const chunks: any[][] = [];
  for (let i = 0; i < inScopeEntries.length; i += chunkSize) {
    chunks.push(inScopeEntries.slice(i, i + chunkSize));
  }

  let okCount = 0;
  let failCount = 0;
  let warningCount = 0;

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunk = chunks[ci];
    const ids = chunk.map((e) => e.id);
    process.stdout.write(`chunk ${ci + 1}/${chunks.length} (${chunk.length} entries: ${ids.slice(0, 4).join(",")}${ids.length > 4 ? ",..." : ""}) ... `);

    let rewrittenList: any[];
    try {
      const prompt = buildPrompt(type, exemplars, chunk);
      rewrittenList = await askZo(type, prompt, chunk.length);
    } catch (err) {
      console.log(`zo/ask FAILED: ${(err as Error).message}`);
      for (const e of chunk) {
        await appendLog(type, { id: e.id, status: "ask_failed", err: (err as Error).message, t: new Date().toISOString() });
        failCount++;
      }
      continue;
    }

    let chunkOk = 0;
    let chunkFail = 0;
    for (const original of chunk) {
      const rewritten = rewrittenList.find((r) => r.id === original.id);
      if (!rewritten) {
        await appendLog(type, { id: original.id, status: "missing_in_response", t: new Date().toISOString() });
        failCount++; chunkFail++;
        continue;
      }
      const merged = mergeFields(original, rewritten);
      const v = validate(type, merged);
      if (v.ok) {
        await saveStaged(type, original.id, merged);
        await appendLog(type, { id: original.id, status: "ok", warnings: v.warnings, t: new Date().toISOString() });
        okCount++; chunkOk++;
        if (v.warnings.length > 0) warningCount++;
      } else {
        await saveStaged(type, original.id, merged); // save anyway for inspection
        await appendLog(type, { id: original.id, status: "validation_failed", errors: v.errors, warnings: v.warnings, t: new Date().toISOString() });
        failCount++; chunkFail++;
      }
    }
    console.log(`ok=${chunkOk} fail=${chunkFail}`);
  }

  console.log(`\n=== summary ===`);
  console.log(`type:      ${type}`);
  console.log(`processed: ${inScopeEntries.length}`);
  console.log(`ok:        ${okCount}`);
  console.log(`fail:      ${failCount}`);
  console.log(`with warnings: ${warningCount}`);
  console.log(`pass-rate: ${Math.round(100 * okCount / Math.max(1, inScopeEntries.length))}%`);
  console.log(`staging:   _regen-staging/entries/${type}s/`);
  console.log(`log:       _regen-staging/log/${type}s.jsonl`);
}

main().catch((err) => { console.error(err); process.exit(1); });
