// Shared logic for the batch regeneration pipeline.
// See _spec-batch-regeneration.md.

import { validateEntry, type RecipeType, type ValidationResult } from "./validator-lib";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export type { RecipeType };

const ZO_API = "https://api.zo.computer/zo/ask";
const MODEL = "anthropic:claude-opus-4-7";

const PROJECT_ROOT = process.cwd();
export const STAGING_ROOT = path.join(PROJECT_ROOT, "_regen-staging");

export type StubEntry = { id: number; name: string; category?: string; [k: string]: unknown };

// ----- Exemplar selection -----

const EXEMPLAR_IDS: Record<RecipeType, number[]> = {
  app:        [100, 71, 99],
  space:      [100, 40, 61],
  automation: [100, 34, 89],
  prompt:     [238, 250, 249],
};

const TYPE_FILES: Record<RecipeType, string> = {
  app: "public/data/apps.json",
  space: "public/data/spaces.json",
  automation: "public/data/automations.json",
  prompt: "public/data/prompts.json",
};

export async function loadType(type: RecipeType): Promise<any[]> {
  const file = path.join(PROJECT_ROOT, TYPE_FILES[type]);
  return JSON.parse(await fs.readFile(file, "utf8"));
}

export async function loadExemplars(type: RecipeType): Promise<any[]> {
  const data = await loadType(type);
  return EXEMPLAR_IDS[type]
    .map((id) => data.find((e) => e.id === id))
    .filter(Boolean);
}

export function inScope(entry: any): boolean {
  return Boolean(entry.addedDate) && entry.addedDate >= "2026-05-20";
}

// ----- Per-type prompt builders -----

const COMMON_VOICE = `Voice rules:
- Plain, direct, faintly tired. Describing, not selling.
- Concrete nouns over abstract. "Gmail label" beats "email automation flow."
- Name tools, libraries, and Zo primitives by name when relevant.
- One opinion per entry. Saying what NOT to do is welcome.
- No closing motivational sentence. Stop when the work is described.
- No em dashes anywhere. Use a regular hyphen or rewrite the sentence.
- No exclamation points in body fields.
- Banned phrases (do not use, any case): imagine if, imagine a world, stop wasting time, the smart way to, powerful yet simple, seamlessly, unleash, unlock your, empower, elevate your, leverage as a verb, game-changer, revolutionize, revolutionary, next-level, cutting-edge, state-of-the-art, in today's fast-paced world, at the end of the day, delve, utilize, holistic, synergy.
- If a Zo primitive applies, name it precisely: Skill, Automation, zo.space page route, zo.space api route, User Service, create_automation, register_user_service, update_space_asset, connect_integration.`;

function appPromptTemplate(exemplars: any[], stubs: StubEntry[]): string {
  return `You are regenerating ${stubs.length} cookbook entries of type "app" for the Zo Cookbook. The current versions are too vague; replace them with specific, opinionated descriptions.

${COMMON_VOICE}

Acceptance criteria per entry:
- description: 170+ chars, prose, names who this is for and what triggers them to open it
- howToBuild: 150+ chars, names at least TWO specific primitives from this list by name: Skill, Automation, zo.space, Service, Gmail, Notion, Linear, Google Drive, Calendar, Stripe, Twilio, SQLite, DuckDB, Bun, Hono, Tailwind, create_automation, register_user_service, update_space_asset, connect_integration. Be concrete about WHERE each piece lives.
- monetization: 50+ chars, must contain either a number (price, %, count) OR a pricing-shape phrase (one-time, per use, per month, subscription, pay what you want, tip jar, lead gen, affiliate, free). Should also include an honest objection or constraint ("won't work for...", "only worth it if...", "narrow audience").

Exemplars (the voice and depth to match):
${exemplars.map((e) => JSON.stringify({ name: e.name, category: e.category, difficulty: e.difficulty, description: e.description, howToBuild: e.howToBuild, monetization: e.monetization }, null, 2)).join("\n\n")}

Entries to rewrite (keep the id, name, category, difficulty; rewrite description / howToBuild / monetization):
${stubs.map((s) => JSON.stringify({ id: s.id, name: s.name, category: s.category, difficulty: s.difficulty, currentDescription: s.description, currentHowToBuild: s.howToBuild, currentMonetization: s.monetization })).join("\n")}

For each entry produce a JSON object with: id, description, howToBuild, monetization. Output ALL ${stubs.length} entries. Match the voice of the exemplars. Do not pad with filler to hit length minimums. If a concept is generic (e.g., "AI Email Sorter"), make the body specific even if the name is not.`;
}

function spacePromptTemplate(exemplars: any[], stubs: StubEntry[]): string {
  return `You are regenerating ${stubs.length} cookbook entries of type "space" for the Zo Cookbook. The current versions are too vague.

${COMMON_VOICE}

Acceptance criteria per entry:
- description: 200+ chars, names who lands on this and what they leave with
- keyTech: 120+ chars, MUST include at least ONE runtime detail AND at least ONE data detail. Runtime examples: "Hono /api/log POST route", "Bun fetch", "page route at /", "useState + localStorage", "Tailwind for layout", "lucide-react icons". Data examples: "SQLite entries table", "DuckDB query against...", "JSON file at /home/workspace/...", "localStorage key 'foo'", "asset uploaded with update_space_asset".

Exemplars (voice and depth):
${exemplars.map((e) => JSON.stringify({ name: e.name, type: e.type, visibility: e.visibility, description: e.description, keyTech: e.keyTech }, null, 2)).join("\n\n")}

Entries to rewrite (keep id, name, type, visibility; rewrite description and keyTech):
${stubs.map((s) => JSON.stringify({ id: s.id, name: s.name, type: s.type, visibility: s.visibility, currentDescription: s.description, currentKeyTech: s.keyTech })).join("\n")}

For each entry produce a JSON object with: id, description, keyTech. Output ALL ${stubs.length} entries.`;
}

function automationPromptTemplate(exemplars: any[], stubs: StubEntry[]): string {
  return `You are regenerating ${stubs.length} cookbook entries of type "automation" for the Zo Cookbook. The current prompts are too short and miss delivery instructions or numbered steps.

${COMMON_VOICE}

Acceptance criteria per entry:
- prompt: 300+ chars. Must contain a numbered list (1., 2., 3.) OR explicit phase markers (Phase 1, Step 1). Must contain an explicit delivery instruction matching one of: "send to", "email me", "text me", "SMS me", "Telegram me", "Discord", "Slack", "write to", "save to", "post to", "deliver to", "drop in", "ping me".
- expectedOutput: clear about the artifact shape (a markdown brief, a bullet list, a JSON file, etc.).
- customization: only include this field if the idea has a real tradeoff knob (cadence, source list, tone, filter rules). Skip it otherwise. Roughly 1 in 5 entries should have it.

Exemplars (voice and depth):
${exemplars.map((e) => JSON.stringify({ name: e.name, category: e.category, schedule: e.schedule, delivery: e.delivery, prompt: e.prompt, expectedOutput: e.expectedOutput, customization: e.customization }, null, 2)).join("\n\n")}

Entries to rewrite (keep id, name, category, schedule, delivery, tools; rewrite prompt, expectedOutput, customization):
${stubs.map((s) => JSON.stringify({ id: s.id, name: s.name, category: s.category, schedule: s.schedule, delivery: s.delivery, tools: s.tools, currentPrompt: s.prompt, currentExpectedOutput: s.expectedOutput, currentCustomization: s.customization })).join("\n")}

For each entry produce a JSON object with: id, prompt, expectedOutput, and optionally customization (omit the field entirely if not warranted). Output ALL ${stubs.length} entries.`;
}

export function buildPrompt(type: RecipeType, exemplars: any[], stubs: StubEntry[]): string {
  if (type === "app") return appPromptTemplate(exemplars, stubs);
  if (type === "space") return spacePromptTemplate(exemplars, stubs);
  if (type === "automation") return automationPromptTemplate(exemplars, stubs);
  throw new Error(`buildPrompt: type "${type}" not supported in this runner`);
}

// ----- /zo/ask invocation -----

const FIELDS_BY_TYPE: Record<RecipeType, string[]> = {
  app:        ["description", "howToBuild", "monetization"],
  space:      ["description", "keyTech"],
  automation: ["prompt", "expectedOutput", "customization"],
  prompt:     ["prompt", "whatYouGet", "whenToUse"],
};

export async function askZo(type: RecipeType, prompt: string, n: number): Promise<any> {
  const requiredFields = FIELDS_BY_TYPE[type].filter((f) => f !== "customization");
  const itemProps: Record<string, any> = { id: { type: "number" } };
  for (const f of FIELDS_BY_TYPE[type]) itemProps[f] = { type: "string" };

  const output_format = {
    type: "object",
    properties: {
      entries: {
        type: "array",
        items: {
          type: "object",
          properties: itemProps,
          required: ["id", ...requiredFields],
        },
      },
    },
    required: ["entries"],
  };

  const body = {
    input: prompt,
    model_name: MODEL,
    output_format,
  };

  const token = process.env.ZO_CLIENT_IDENTITY_TOKEN;
  if (!token) throw new Error("ZO_CLIENT_IDENTITY_TOKEN missing");

  const res = await fetch(ZO_API, {
    method: "POST",
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`zo/ask ${res.status}: ${text.slice(0, 500)}`);
  }
  const json = await res.json() as any;
  const out = json.output;
  if (out && typeof out === "object" && Array.isArray(out.entries)) return out.entries;
  if (typeof out === "string") {
    try {
      const parsed = JSON.parse(out);
      if (Array.isArray(parsed.entries)) return parsed.entries;
    } catch {}
  }
  throw new Error(`unexpected zo/ask shape: ${JSON.stringify(json).slice(0, 500)}`);
}

// ----- Staging IO -----

export async function ensureStagingDirs(): Promise<void> {
  for (const t of ["apps", "spaces", "automations", "prompts"]) {
    await fs.mkdir(path.join(STAGING_ROOT, "entries", t), { recursive: true });
    await fs.mkdir(path.join(STAGING_ROOT, "log"), { recursive: true });
  }
}

function pluralDir(type: RecipeType): string {
  return type + "s";
}

export function stagingPath(type: RecipeType, id: number): string {
  return path.join(STAGING_ROOT, "entries", pluralDir(type), `${id}.json`);
}

export async function loadStaged(type: RecipeType, id: number): Promise<any | null> {
  try {
    const s = await fs.readFile(stagingPath(type, id), "utf8");
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export async function saveStaged(type: RecipeType, id: number, entry: any): Promise<void> {
  await fs.writeFile(stagingPath(type, id), JSON.stringify(entry, null, 2));
}

export async function appendLog(type: RecipeType, row: object): Promise<void> {
  const file = path.join(STAGING_ROOT, "log", pluralDir(type) + ".jsonl");
  await fs.appendFile(file, JSON.stringify(row) + "\n");
}

// ----- Merge original + rewritten -----

export function mergeFields(original: any, rewritten: any): any {
  const merged = { ...original };
  for (const k of Object.keys(rewritten)) {
    if (k === "id") continue;
    if (rewritten[k] === null || rewritten[k] === undefined) continue;
    merged[k] = rewritten[k];
  }
  return merged;
}

// ----- Validate one staged entry -----

export function validate(type: RecipeType, entry: any): ValidationResult {
  return validateEntry(type, entry);
}
