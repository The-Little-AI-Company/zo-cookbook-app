#!/usr/bin/env bun
// regen-retry.ts <type>
//
// Reads the staging log for <type>, finds entries with status=validation_failed,
// re-calls /zo/ask with a targeted fix prompt that names the specific error,
// validates the result, and overwrites the staged JSON on success.
//
// One entry per /zo/ask call. Small, cheap, high-signal.

import { validateEntry, type RecipeType } from "./validator-lib";
import { STAGING_ROOT } from "./regen-lib";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const ZO_API = "https://api.zo.computer/zo/ask";
const MODEL = "anthropic:claude-opus-4-7";

type FailedRow = { id: number; status: string; errors: string[] };

async function loadFailed(type: RecipeType): Promise<FailedRow[]> {
  const logPath = path.join(STAGING_ROOT, "log", `${type}s.jsonl`);
  const text = await fs.readFile(logPath, "utf8");
  const out: FailedRow[] = [];
  for (const line of text.trim().split("\n")) {
    if (!line) continue;
    const r = JSON.parse(line);
    if (r.status === "validation_failed") out.push({ id: r.id, status: r.status, errors: r.errors });
  }
  return out;
}

async function loadStaged(type: RecipeType, id: number): Promise<Record<string, unknown>> {
  const p = path.join(STAGING_ROOT, "entries", `${type}s`, `${id}.json`);
  return JSON.parse(await fs.readFile(p, "utf8"));
}

async function saveStaged(type: RecipeType, id: number, entry: unknown): Promise<void> {
  const p = path.join(STAGING_ROOT, "entries", `${type}s`, `${id}.json`);
  await fs.writeFile(p, JSON.stringify(entry, null, 2));
}

function buildRetryPrompt(type: RecipeType, entry: Record<string, unknown>, errors: string[]): string {
  const errorList = errors.map((e, i) => `${i + 1}. ${e}`).join("\n");
  const fieldsToFix = type === "app"
    ? "description, howToBuild, monetization"
    : type === "space"
    ? "description, keyTech"
    : type === "automation"
    ? "prompt, expectedOutput, customization"
    : "prompt, whenToUse, whatYouGet";

  return [
    `You are fixing a single cookbook entry that failed validation. The entry's name and category are correct — do not change them. Fix ONLY the specific errors listed below.`,
    ``,
    `Type: ${type}`,
    `Errors to fix:`,
    errorList,
    ``,
    `Current entry:`,
    "```json",
    JSON.stringify(entry, null, 2),
    "```",
    ``,
    `Fix the errors with minimal surgery. Preserve the entry's voice, length, and structure where possible. Specifically:`,
    `- If an "ordered list" or "delivery instruction" is missing from a prompt, add a numbered execution list AND a concrete delivery line ("Email me the result", "Save to /home/workspace/Documents/...", "Send to Telegram", etc.). Do not pad with filler.`,
    `- If a field is "too short", expand the existing prose with specifics (libraries, route shapes, real numbers), not adjectives.`,
    `- If "lacks a number AND a pricing-shape phrase" in monetization, name a concrete price ($5/month, $19 one-time, pay what you want, etc.) AND keep or add an honest objection.`,
    `- If an exclamation point appears in a body field, replace it with a period.`,
    `- If an em dash appears (—), replace with a hyphen (-).`,
    `- Never introduce banned phrases: unleash, unlock, empower, elevate, seamlessly, leverage (verb), game-changer, revolutionary, cutting-edge, delve, utilize, holistic, synergy.`,
    ``,
    `Return ONLY the corrected ${fieldsToFix} fields. Do not include id, name, category, or any other fields.`,
  ].join("\n");
}

function buildSchema(type: RecipeType): Record<string, unknown> {
  if (type === "app") {
    return {
      type: "object",
      properties: {
        description: { type: "string" },
        howToBuild: { type: "string" },
        monetization: { type: "string" },
      },
      required: ["description", "howToBuild", "monetization"],
    };
  }
  if (type === "space") {
    return {
      type: "object",
      properties: {
        description: { type: "string" },
        keyTech: { type: "string" },
      },
      required: ["description", "keyTech"],
    };
  }
  if (type === "automation") {
    return {
      type: "object",
      properties: {
        prompt: { type: "string" },
        expectedOutput: { type: "string" },
        customization: { type: "string" },
      },
      required: ["prompt", "expectedOutput"],
    };
  }
  return {
    type: "object",
    properties: {
      prompt: { type: "string" },
      whenToUse: { type: "string" },
      whatYouGet: { type: "string" },
    },
    required: ["prompt", "whenToUse", "whatYouGet"],
  };
}

async function askZoFix(prompt: string, schema: Record<string, unknown>): Promise<Record<string, unknown>> {
  const token = process.env.ZO_CLIENT_IDENTITY_TOKEN;
  if (!token) throw new Error("ZO_CLIENT_IDENTITY_TOKEN not set");
  const res = await fetch(ZO_API, {
    method: "POST",
    headers: { authorization: token, "content-type": "application/json" },
    body: JSON.stringify({ input: prompt, model_name: MODEL, output_format: schema }),
  });
  if (!res.ok) throw new Error(`zo/ask ${res.status}: ${await res.text()}`);
  const data = await res.json() as { output: Record<string, unknown> };
  return data.output;
}

async function main() {
  const type = process.argv[2] as RecipeType;
  if (!["app", "space", "automation", "prompt"].includes(type)) {
    console.error("usage: bun scripts/regen-retry.ts <app|space|automation|prompt>");
    process.exit(2);
  }

  const failed = await loadFailed(type);
  console.log(`${failed.length} failed entries to retry for type=${type}`);
  let fixed = 0, stillFailing = 0;
  const stillFailingDetails: Array<{ id: number; errors: string[] }> = [];

  for (const row of failed) {
    process.stdout.write(`  id=${row.id} ... `);
    try {
      const entry = await loadStaged(type, row.id);
      const fixPrompt = buildRetryPrompt(type, entry, row.errors);
      const patch = await askZoFix(fixPrompt, buildSchema(type));
      const merged = { ...entry, ...patch };
      const result = validateEntry(type, merged);
      if (result.ok) {
        await saveStaged(type, row.id, merged);
        fixed++;
        process.stdout.write("fixed\n");
      } else {
        stillFailing++;
        stillFailingDetails.push({ id: row.id, errors: result.errors });
        process.stdout.write(`STILL FAILING: ${result.errors.join("; ")}\n`);
      }
    } catch (e) {
      stillFailing++;
      stillFailingDetails.push({ id: row.id, errors: [(e as Error).message] });
      process.stdout.write(`ERROR: ${(e as Error).message}\n`);
    }
  }

  console.log(`\n=== retry summary ===`);
  console.log(`fixed:         ${fixed}`);
  console.log(`still failing: ${stillFailing}`);
  if (stillFailingDetails.length > 0) {
    console.log(`\nremaining issues:`);
    for (const d of stillFailingDetails) console.log(`  id=${d.id}: ${d.errors.join("; ")}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
