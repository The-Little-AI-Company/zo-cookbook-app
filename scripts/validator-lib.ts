// Validator for cookbook entries per _spec-batch-regeneration.md.
//
// Pure functions. No filesystem, no process. CLI wrappers in
// validate-entry.ts and validate-batch.ts.

export type RecipeType = "app" | "space" | "automation" | "prompt";

export type ValidationResult = {
  ok: boolean;
  errors: string[];   // hard fails — block ship
  warnings: string[]; // soft signals — surface but don't block
};

// ----- Banned phrases (anti-slop §7) -----

// Plain substring matches (case-insensitive). Low context dependence.
const BANNED_SUBSTRINGS: string[] = [
  "imagine if",
  "imagine a world",
  "stop wasting time",
  "the smart way to",
  "powerful yet simple",
  "seamlessly",
  "game-changer",
  "game-changing",
  "revolutionize",
  "revolutionary",
  "next-level",
  "cutting-edge",
  "state-of-the-art",
  "in today's fast-paced world",
  "in today's digital landscape",
  "at the end of the day",
  "delve",
  "utilize",
  "holistic",
  "synergy",
];

// Patterned matches. "leverage", "unlock", "empower", "elevate" all have
// legitimate uses — only flag them when paired with the SaaS-tell objects.
const BANNED_PATTERNS: { name: string; re: RegExp }[] = [
  { name: "leverage-as-verb", re: /\bleverage\b\s+(your|the|our|its|a|an|my|this|these|those)\b/i },
  { name: "unlock-saas",       re: /\bunlock\b\s+(your|the|new|hidden|untapped|powerful|fresh)\b/i },
  { name: "empower-saas",      re: /\bempower\b\s+(your|the|users?|teams?|people|customers?)\b/i },
  { name: "elevate-saas",      re: /\belevate\b\s+(your|the|users?|teams?|brand|business|content)\b/i },
  { name: "unleash",           re: /\bunleash\b/i },
  { name: "tracks-x-automatically", re: /tracks?\s+your\s+\w+\s+automatically/i },
  { name: "your-x-never-the-same", re: /your\s+\w+\s+will\s+never\s+be\s+the\s+same/i },
];

const EM_DASH_RE = /—/g;

// Generic LLM-cadence detector: ≥ 3 consecutive sentences starting with the
// same opener from this set.
const CADENCE_OPENERS = ["It", "This", "The", "Your", "You"];

// ----- Zo primitives the apps' howToBuild should name (§6) -----

const ZO_PRIMITIVES = [
  "Skill", "Automation", "zo.space", "Service",
  "Gmail", "Notion", "Linear", "Google Drive", "Calendar", "Stripe", "Twilio",
  "SQLite", "DuckDB", "Bun", "Hono", "Tailwind",
  "create_automation", "register_user_service", "update_space_asset", "connect_integration",
  "use_app_gmail", "use_app_notion", "use_app_linear", "use_app_google_calendar",
  "use_app_google_drive", "send_email_to_user", "send_sms_to_user",
];

// Space keyTech detail requirements (§6)
const SPACE_RUNTIME_TOKENS = [
  "Hono", "Bun", "route", "POST", "GET", "fetch", "useState", "useEffect",
  "page route", "api route", "lucide-react", "Tailwind",
];
const SPACE_DATA_TOKENS = [
  "SQLite", "DuckDB", "JSON", "localStorage", "KV", "file", "table",
  "dataset", "Asset", "update_space_asset", "/home/workspace",
];

// Automation prompt delivery instructions (§6)
const DELIVERY_INSTRUCTIONS = [
  "send to", "email me", "text me", "sms me", "telegram me",
  "discord", "slack", "write to", "save to", "post to", "deliver to",
  "drop in", "ping me",
];

// Prompt output-format instructions (§6)
const OUTPUT_FORMATS = [
  "respond with", "return", "output", "format", "as a list", "as a table",
  "numbered list", "headed sections", "markdown", "bullet points",
  "in this format", "structured as", "reply with", "for each",
  "with the following", "with these", "give me", "section", "sections",
  "step by step", "in this order", "headings",
];

// Pricing-shape phrases (§6 apps)
const PRICING_SHAPES = [
  "one-time", "per use", "per month", "per year", "per seat", "subscription",
  "pay what you want", "tip jar", "lead gen", "affiliate", "free",
  "freemium", "donation", "sponsored",
];

// Objection / hedge phrases (§6 apps)
const OBJECTION_HEDGES = [
  "won't work for", "wont work for", "only worth it if", "small audience",
  "narrow audience", "niche", "limited to", "not for", "depends on",
  "early-stage", "early stage", "doesn't scale", "low ceiling",
  "skeptical buyer", "hard sell", "weak market", "not a fit for",
  "isn't a fit", "tough sell",
];

// ----- Utility helpers -----

function countChars(s: unknown): number {
  return typeof s === "string" ? s.length : 0;
}

function hasAny(text: string, needles: string[], caseInsensitive = true): string | null {
  const t = caseInsensitive ? text.toLowerCase() : text;
  for (const n of needles) {
    if (t.includes(caseInsensitive ? n.toLowerCase() : n)) return n;
  }
  return null;
}

function countMatching(text: string, needles: string[]): number {
  const t = text.toLowerCase();
  let n = 0;
  for (const needle of needles) {
    if (t.includes(needle.toLowerCase())) n++;
  }
  return n;
}

function splitSentences(text: string): string[] {
  // Cheap sentence split. Good enough for cadence detection.
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function detectBannedCadence(text: string): string | null {
  const sentences = splitSentences(text);
  if (sentences.length < 3) return null;
  let run = 1;
  let lastOpener: string | null = null;
  for (const s of sentences) {
    const first = s.split(/\s+/)[0]?.replace(/[^\w]/g, "");
    if (!first) { run = 1; lastOpener = null; continue; }
    if (CADENCE_OPENERS.includes(first) && first === lastOpener) {
      run++;
      if (run >= 3) return first;
    } else {
      run = 1;
    }
    lastOpener = first;
  }
  return null;
}

function hasNumber(text: string): boolean {
  return /\d/.test(text);
}

// ----- Cross-field checks -----

function checkBannedContent(allText: string, errors: string[]): void {
  const hit = hasAny(allText, BANNED_SUBSTRINGS);
  if (hit) errors.push(`banned phrase present: "${hit}"`);
  for (const p of BANNED_PATTERNS) {
    if (p.re.test(allText)) {
      const match = allText.match(p.re);
      errors.push(`banned pattern present (${p.name}): "${match?.[0] ?? ""}"`);
    }
  }
  if (EM_DASH_RE.test(allText)) {
    errors.push("em dash present (—). Use a regular hyphen or rewrite.");
    EM_DASH_RE.lastIndex = 0;
  }
}

function checkExclamationInBodyFields(entry: Record<string, unknown>, bodyFields: string[], errors: string[]): void {
  for (const f of bodyFields) {
    const v = entry[f];
    if (typeof v === "string" && v.includes("!")) {
      errors.push(`exclamation point in body field "${f}"`);
    }
  }
}

function checkCadence(text: string, fieldName: string, warnings: string[]): void {
  const hit = detectBannedCadence(text);
  if (hit) warnings.push(`cadence: ≥3 consecutive sentences starting with "${hit}" in ${fieldName}`);
}

// ----- Type-specific validators -----

type App = {
  id?: number; name?: string; category?: string; description?: string;
  howToBuild?: string; monetization?: string; difficulty?: string; addedDate?: string;
};

type Space = {
  id?: number; name?: string; description?: string; keyTech?: string;
  type?: string; visibility?: string; addedDate?: string;
};

type Automation = {
  id?: number; name?: string; category?: string; schedule?: string;
  prompt?: string; expectedOutput?: string; customization?: string;
  tools?: string; delivery?: string; addedDate?: string;
};

type Prompt = {
  id?: number; name?: string; category?: string; whenToUse?: string;
  prompt?: string; whatYouGet?: string; addedDate?: string;
};

function validateApp(item: App): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const required = ["name", "category", "description", "howToBuild", "monetization", "difficulty"];
  for (const f of required) {
    if (!item[f as keyof App] || typeof item[f as keyof App] !== "string") {
      errors.push(`missing or non-string required field: ${f}`);
    }
  }
  if (errors.length) return { ok: false, errors, warnings };

  const description = item.description as string;
  const howToBuild = item.howToBuild as string;
  const monetization = item.monetization as string;

  if (countChars(description) < 170) {
    errors.push(`description too short: ${countChars(description)} chars, need ≥ 170`);
  }
  if (countChars(howToBuild) < 150) {
    errors.push(`howToBuild too short: ${countChars(howToBuild)} chars, need ≥ 150`);
  }
  const primCount = countMatching(howToBuild, ZO_PRIMITIVES);
  if (primCount < 2) {
    errors.push(`howToBuild names only ${primCount} Zo primitives; spec requires ≥ 2 from the canonical list`);
  }
  if (countChars(monetization) < 50) {
    errors.push(`monetization too short: ${countChars(monetization)} chars, need ≥ 50`);
  }
  const hasShape = hasAny(monetization, PRICING_SHAPES) !== null;
  if (!hasNumber(monetization) && !hasShape) {
    errors.push(`monetization lacks a number AND a pricing-shape phrase`);
  }
  if (!hasAny(monetization, OBJECTION_HEDGES)) {
    warnings.push(`monetization lacks an explicit objection/hedge (dictionary-detected). Soft signal; the spec wants this but the dictionary is narrow.`);
  }

  const allText = [item.name, description, howToBuild, monetization].filter(Boolean).join("\n");
  checkBannedContent(allText, errors);
  checkExclamationInBodyFields(item as Record<string, unknown>, ["description", "howToBuild", "monetization"], errors);
  checkCadence(description, "description", warnings);
  checkCadence(howToBuild, "howToBuild", warnings);

  return { ok: errors.length === 0, errors, warnings };
}

function validateSpace(item: Space): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const required = ["name", "description", "keyTech", "type", "visibility"];
  for (const f of required) {
    if (!item[f as keyof Space] || typeof item[f as keyof Space] !== "string") {
      errors.push(`missing or non-string required field: ${f}`);
    }
  }
  if (errors.length) return { ok: false, errors, warnings };

  const description = item.description as string;
  const keyTech = item.keyTech as string;
  const visibility = item.visibility as string;

  if (countChars(description) < 200) {
    errors.push(`description too short: ${countChars(description)} chars, need ≥ 200`);
  }
  if (countChars(keyTech) < 120) {
    errors.push(`keyTech too short: ${countChars(keyTech)} chars, need ≥ 120`);
  }
  const hasRuntime = countMatching(keyTech, SPACE_RUNTIME_TOKENS) >= 1;
  const hasData = countMatching(keyTech, SPACE_DATA_TOKENS) >= 1;
  if (!hasRuntime && !hasData) {
    errors.push(`keyTech lacks both a runtime detail and a data detail; need at least one of each ideally, but at minimum one`);
  } else if (!hasRuntime) {
    warnings.push(`keyTech has a data detail but no runtime detail (Hono, Bun, route, POST, etc.)`);
  } else if (!hasData) {
    warnings.push(`keyTech has a runtime detail but no data detail (SQLite, JSON, table, file, etc.)`);
  }
  if (!["public", "private"].includes(visibility)) {
    errors.push(`visibility must be "public" or "private", got "${visibility}"`);
  }

  const allText = [item.name, description, keyTech].filter(Boolean).join("\n");
  checkBannedContent(allText, errors);
  checkExclamationInBodyFields(item as Record<string, unknown>, ["description", "keyTech"], errors);
  checkCadence(description, "description", warnings);

  return { ok: errors.length === 0, errors, warnings };
}

function validateAutomation(item: Automation): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const required = ["name", "category", "schedule", "prompt", "expectedOutput"];
  for (const f of required) {
    if (!item[f as keyof Automation] || typeof item[f as keyof Automation] !== "string") {
      errors.push(`missing or non-string required field: ${f}`);
    }
  }
  if (errors.length) return { ok: false, errors, warnings };

  const prompt = item.prompt as string;

  if (countChars(prompt) < 300) {
    errors.push(`prompt too short: ${countChars(prompt)} chars, need ≥ 300`);
  }
  const numbered = /^\s*\d+[.)]\s/m.test(prompt);
  const phased = /\b(?:phase|step)\s*\d+\b/i.test(prompt);
  if (!numbered && !phased) {
    errors.push(`prompt has no ordered list (1. or 1)) or phase markers (Phase 1, Step 1)`);
  }
  if (!hasAny(prompt, DELIVERY_INSTRUCTIONS)) {
    errors.push(`prompt has no delivery instruction (send to, email me, write to, save to, post to, etc.)`);
  }
  if (typeof item.customization === "string" && item.customization.length > 0 && item.customization.length < 40) {
    warnings.push(`customization is suspiciously short (${item.customization.length} chars); may be filler`);
  }

  const allText = [item.name, item.prompt, item.expectedOutput, item.customization].filter(Boolean).join("\n");
  checkBannedContent(allText, errors);
  checkExclamationInBodyFields(item as Record<string, unknown>, ["prompt", "expectedOutput", "customization"], errors);
  checkCadence(prompt, "prompt", warnings);

  return { ok: errors.length === 0, errors, warnings };
}

function validatePrompt(item: Prompt): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const required = ["name", "category", "whenToUse", "prompt", "whatYouGet"];
  for (const f of required) {
    if (!item[f as keyof Prompt] || typeof item[f as keyof Prompt] !== "string") {
      errors.push(`missing or non-string required field: ${f}`);
    }
  }
  if (errors.length) return { ok: false, errors, warnings };

  const prompt = item.prompt as string;
  const whatYouGet = item.whatYouGet as string;

  if (countChars(prompt) < 300) {
    errors.push(`prompt too short: ${countChars(prompt)} chars, need ≥ 300`);
  }
  const hasPlaceholder = /\{\{[^}]+\}\}/.test(prompt);
  const hasPasteInstruction = /paste\s+(your|the|in|below|here)/i.test(prompt);
  if (!hasPlaceholder && !hasPasteInstruction) {
    errors.push(`prompt has no {{placeholder}} and no explicit "paste your X" instruction`);
  }
  const hasBulletList = /^\s*[-*•]\s+\S/m.test(prompt);
  const hasNumberedList = /^\s*\d+[.)]\s+\S/m.test(prompt);
  const hasFormatKeyword = hasAny(prompt, OUTPUT_FORMATS) !== null;
  if (!hasBulletList && !hasNumberedList && !hasFormatKeyword) {
    errors.push(`prompt has no visible output structure (no bulleted list, no numbered list, no format keyword like "respond with", "for each", "section")`);
  }
  if (countChars(whatYouGet) < 60) {
    errors.push(`whatYouGet too short: ${countChars(whatYouGet)} chars, need ≥ 60`);
  }

  const allText = [item.name, item.whenToUse, prompt, whatYouGet].filter(Boolean).join("\n");
  checkBannedContent(allText, errors);
  checkExclamationInBodyFields(item as Record<string, unknown>, ["whenToUse", "prompt", "whatYouGet"], errors);
  checkCadence(prompt, "prompt", warnings);
  checkCadence(whatYouGet, "whatYouGet", warnings);

  return { ok: errors.length === 0, errors, warnings };
}

export function validateEntry(type: RecipeType, entry: unknown): ValidationResult {
  if (!entry || typeof entry !== "object") {
    return { ok: false, errors: ["entry is not an object"], warnings: [] };
  }
  switch (type) {
    case "app":        return validateApp(entry as App);
    case "space":      return validateSpace(entry as Space);
    case "automation": return validateAutomation(entry as Automation);
    case "prompt":     return validatePrompt(entry as Prompt);
  }
}
