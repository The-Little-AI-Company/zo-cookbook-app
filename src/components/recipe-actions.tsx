import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { App, Automation, Prompt, Space } from "@/data/cookbook-types";

type RecipeType = "app" | "space" | "automation" | "prompt";
type RecipeItem = App | Space | Automation | Prompt;

type RecipeActionsProps = {
  type: RecipeType;
  item: RecipeItem;
  accentColor?: string;
};

const ZO_APP_URL = "https://jeffkazzee.zo.computer";
const MAX_PROMPT_URL_LENGTH = 3500;
const IN_APP_BROWSER_REGEX = /FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\/|MicroMessenger|Twitter|TikTok/i;

type ToastState = { kind: "idle" | "copied" | "opened" | "error"; message: string };

function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

function detectInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return IN_APP_BROWSER_REGEX.test(navigator.userAgent || "");
}

// ----- Per-type labels (A1) -----

function getPrimaryLabel(type: RecipeType): string {
  if (type === "app") return "Build in Zo";
  if (type === "space") return "Deploy in Zo";
  if (type === "automation") return "Create automation";
  return "Open in Zo";
}

function getCopyLabel(type: RecipeType): string {
  if (type === "automation") return "Copy automation";
  if (type === "prompt") return "Copy prompt";
  return "Copy build brief";
}

function getReadLabel(type: RecipeType, open: boolean): string {
  if (type === "prompt") return open ? "Hide prompt" : "Read prompt";
  if (type === "automation") return open ? "Hide automation" : "Read automation";
  return open ? "Hide brief" : "Read brief";
}

function getReadHeader(type: RecipeType): string {
  if (type === "prompt") return "Prompt";
  if (type === "automation") return "Automation prompt";
  return "Build brief";
}

function getCopyNoun(type: RecipeType): string {
  if (type === "prompt") return "Prompt";
  if (type === "automation") return "Automation";
  return "Brief";
}

function getHandoffBlurb(type: RecipeType): string {
  if (type === "prompt") {
    return "Copies the full prompt, opens Zo, and attempts URL prefill when the prompt is short enough.";
  }
  if (type === "automation") {
    return "Copies the automation prompt and config, opens Zo, and attempts URL prefill when short enough.";
  }
  return "Copies the full build brief, opens Zo, and attempts URL prefill when the brief is short enough.";
}

// ----- Helpers used by templates (A2) -----

function extractPlaceholders(prompt: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const re = /\{\{([^}]+)\}\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(prompt)) !== null) {
    const key = m[1].trim();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  }
  return out;
}

function describeSpaceRouteShape(spaceType: string): string {
  const t = spaceType.toLowerCase();
  if (t.includes("page") && t.includes("api")) return "page and api routes under the same path prefix";
  if (t.includes("api")) return "api routes only";
  return "page routes";
}

// Personalization hooks per category. Empty array = no automatic personalization
// prompt for that category (the idea is generic enough that asking the user adds noise).
const PERSONALIZATION_BY_CATEGORY: Record<string, string[]> = {
  // Apps + automations + spaces share these keys via category strings.
  "Personal tools": [
    "How I track this today (if at all) and what's annoying about that.",
    "Whether I want notifications, a daily digest, or silent collection.",
    "Where the data should live (local file, DuckDB, a zo.space route, or a Skill).",
  ],
  "Content & writing": [
    "Paste a 200 to 400 word sample of my writing so the tone matches.",
    "Default output length (short / medium / long) and any forbidden words.",
    "Subjects or domains I want to focus on or specifically avoid.",
  ],
  "Money": [
    "My currency and timezone for any date math.",
    "Which accounts or sources count and which to ignore (filter rules).",
    "How sensitive this data is and whether anything should ever leave the Zo Computer.",
  ],
  "Solo business ops": [
    "Business name and a one-line brand voice description.",
    "Pricing model (hourly, flat project, retainer, or subscription).",
    "Existing tools I already pay for that this should integrate with instead of replacing.",
  ],
  "Productivity": [
    "Preferred delivery channel (email, SMS, Telegram, Zo chat).",
    "Schedule or cadence that fits my actual day, not a generic 9am default.",
    "What 'done' looks like for the daily/weekly cycle.",
  ],
  "Home & life": [
    "Who lives in the household and what they need from this.",
    "Recurring events to factor in (school year, work schedule, travel).",
    "Quiet hours when no notifications should fire.",
  ],
  "Local & community": [
    "My location (city or zip) and how far I'll travel.",
    "Whether the output is for me, for sharing, or for posting publicly.",
  ],
  "Creative & maker": [
    "Aesthetic references (links, screenshots, or named styles) before any styling decisions.",
    "Whether the output is private practice or destined for somewhere public.",
  ],
  "Health & body": [
    "How sensitive this data is and whether anything should ever leave the Zo Computer.",
    "What to capture verbatim vs. what to aggregate or anonymize.",
  ],
  "Learning & study": [
    "Subjects and current skill level.",
    "Study cadence (daily, weekly, sprint-based).",
    "Whether I want explanations, exercises, or both.",
  ],
  "Information & monitoring": [
    "The exact sources (URLs, feeds, accounts) that count as signal.",
    "What threshold or change is worth waking me up for.",
    "Delivery channel and quiet hours.",
  ],
  "AI content": [
    "Paste a sample of my voice so the output isn't generic.",
    "Subjects or angles I want to own and ones I want to avoid.",
  ],
};

function getPersonalizationHooks(category: string): string[] {
  return PERSONALIZATION_BY_CATEGORY[category] ?? [];
}

// Scan source text for Zo primitive keywords so the brief can suggest where each
// piece of the work should live. Keeps suggestions in the same vocabulary the
// receiving Zo agent uses internally.
function detectZoPrimitives(text: string): string[] {
  const t = text.toLowerCase();
  const hits: string[] = [];
  if (/\b(skill|skills folder|skills\/)\b/.test(t)) hits.push("a Skill in Skills/<slug>/ with a SKILL.md and a scripts/ entrypoint");
  if (/\b(automation|recurring|daily|weekly|cron|schedule|every (day|week|morning|evening|hour))\b/.test(t)) hits.push("an Automation created with create_automation (capture the automation_id)");
  if (/\b(zo\.space|space route|site|page route|api route|landing page|dashboard page)\b/.test(t)) hits.push("zo.space page and/or api routes (default page routes to private unless the description says otherwise)");
  if (/\b(service|long-running|server|webhook|daemon|worker)\b/.test(t)) hits.push("a User Service via register_user_service (pick http / tcp / process based on what it needs to expose)");
  if (/\b(integration|gmail|notion|linear|drive|calendar|stripe|spotify|airtable|outlook|sheets|tasks|x|twitter)\b/.test(t)) hits.push("an existing Pipedream-backed integration via use_app_* (connect_integration first if not connected)");
  if (/\b(persona|jeeves|chief systems|the editor|money man)\b/.test(t)) hits.push("a Persona under /?t=settings&s=ai&d=personas, if the idea is fundamentally about how Zo behaves");
  return hits;
}

function renderPersonalizationSection(category: string, customization?: string): string {
  const hooks = getPersonalizationHooks(category);
  const hasCustomField = customization && customization.trim().length > 0;
  if (hooks.length === 0 && !hasCustomField) return "";
  const lines: string[] = ["", "Personalize before building", "Ask me about each of these before writing code. Do not assume defaults if I haven't answered."];
  for (const h of hooks) lines.push(`- ${h}`);
  if (hasCustomField) lines.push(`- Customization the cookbook entry calls out: ${customization}`);
  return lines.join("\n");
}

function renderPrimitivesSection(text: string): string {
  const hits = detectZoPrimitives(text);
  if (hits.length === 0) return "";
  const lines: string[] = ["", "Where the pieces live in Zo", "Use the smallest set that does the job. Don't fan out to all of them."];
  for (const h of hits) lines.push(`- ${h}`);
  return lines.join("\n");
}

// ----- Brief templates (A2) -----

function buildPromptBrief(item: Prompt): string {
  const placeholders = extractPlaceholders(item.prompt);
  const inputsBlock = placeholders.length
    ? placeholders.map((p) => `- {{${p}}}`).join("\n")
    : "- None. Paste and run as-is.";
  const hasPhases = /\bphase\s*\d|step\s*\d|round\s*\d/i.test(item.prompt);
  const customizationLines = hasPhases
    ? [
        "",
        "Customization (only if I ask)",
        "- Skip or merge phases / steps if a shorter run is more useful for the specific question.",
        "- Increase or decrease the depth of any single phase by saying so before that phase runs.",
      ].join("\n")
    : "";

  return [
    `Run this prompt on my Zo Computer.`,
    ``,
    `Name: ${item.name}`,
    `Category: ${item.category}`,
    ``,
    `When to use this`,
    item.whenToUse,
    ``,
    `Inputs to fill in before running`,
    inputsBlock,
    ``,
    `The prompt (treat the text below as the instruction, verbatim)`,
    `-----`,
    item.prompt,
    `-----`,
    ``,
    `Expected output`,
    item.whatYouGet,
    customizationLines,
    ``,
    `Constraints`,
    `- Use the prompt body above as the instruction. Do not paraphrase, summarize, or "improve" it.`,
    `- Replace any {{placeholders}} from my next message before running. If a required placeholder is missing, ask once and stop.`,
    `- Return the full output in chat. Save to a file only if the prompt explicitly asks for that.`,
    `- If the prompt implies a destructive action (sending email, posting, money), stop and confirm before acting.`,
  ].filter((x) => x !== null && x !== undefined).join("\n");
}

function buildAutomationBrief(item: Automation): string {
  const primitivesSection = renderPrimitivesSection(`${item.prompt} ${item.tools} ${item.delivery}`);
  const personalizationSection = renderPersonalizationSection(item.category, item.customization);

  return [
    `Create this automation on my Zo Computer.`,
    ``,
    `Name: ${item.name}`,
    `Category: ${item.category}`,
    `Schedule: ${item.schedule}`,
    `Delivery: ${item.delivery}`,
    `Tools likely needed: ${item.tools}`,
    ``,
    `What this automation does`,
    item.expectedOutput,
    ``,
    `Execution prompt (what the automation runs on each fire)`,
    `-----`,
    item.prompt,
    `-----`,
    personalizationSection,
    primitivesSection,
    ``,
    `Constraints`,
    `- Use the create_automation tool. Do not run the prompt now — create the schedule and confirm it.`,
    `- Convert the human schedule string above into a clean RRULE and surface the next fire timestamp in my timezone before saving.`,
    `- Use the listed delivery method exactly. Do not silently switch channels.`,
    `- If a tool above isn't connected, surface a Connect button via connect_integration rather than guessing credentials.`,
    `- If the automation could send messages or post publicly on each fire, the first run must be a dry-run / preview.`,
    ``,
    `Definition of done`,
    `- The automation exists, is active, and has a confirmed next-fire timestamp in my timezone.`,
    `- A dry-run produces output matching the "What this automation does" shape above.`,
    `- I have the automation_id so I can edit, pause, or delete it later.`,
    `- Any open personalization questions above are answered, or explicitly noted as "skipped on purpose".`,
  ].filter((x) => x !== null && x !== undefined).join("\n");
}

function buildSpaceBrief(item: Space): string {
  const routeShape = describeSpaceRouteShape(item.type);
  const visibilityNote = item.visibility === "private"
    ? "Owner-only behind Zo auth. Do not add a separate auth layer or login form."
    : "Public. Do not put any private data on this route — assume strangers will see it.";
  const primitivesSection = renderPrimitivesSection(`${item.description} ${item.keyTech} zo.space`);

  return [
    `Build this zo.space project on my Zo Computer.`,
    ``,
    `Name: ${item.name}`,
    `Route: ${item.route}`,
    `Type: ${item.type}`,
    `Visibility: ${item.visibility}`,
    ``,
    `What this is`,
    item.description,
    ``,
    `Route plan`,
    `- Primary route: ${item.route} (${item.visibility}).`,
    `- Use ${routeShape}. If the description implies persistence, add API routes for read/write and keep the page route free of secrets.`,
    `- If the route already exists in my zo.space, treat this as a redesign — confirm before overwriting.`,
    ``,
    `Stack to use`,
    item.keyTech,
    primitivesSection,
    ``,
    `Constraints`,
    `- ${visibilityNote}`,
    `- No additional npm packages — zo.space ships a fixed dependency set. For frontend-only packages not installed, import from a pinned esm.sh URL. If real backend deps are needed, recommend exporting to a Zo Site instead.`,
    `- Tailwind for layout. lucide-react for icons. Match existing zo.space conventions.`,
    `- Typography, color, and spacing must be deliberate. Default SaaS Inter + blue gradient is a fail.`,
    ``,
    `Out of scope unless I ask`,
    `- Multi-user, auth beyond the visibility setting, push notifications, exports, analytics, telemetry, paywalls.`,
    ``,
    `Definition of done`,
    `- I can visit ${item.route} and use the behavior described above end to end.`,
    `- Any data the description implies is persisted across reloads and across Zo restarts (so SQLite or a JSON file the API route owns, not in-memory state).`,
    `- The page looks intentional. If I screenshot it next to a generic shadcn template, mine should be obviously different.`,
    `- Confirm the final route URLs, visibility, and any new files before finishing.`,
  ].filter((x) => x !== null && x !== undefined).join("\n");
}

function buildAppBrief(item: App): string {
  const personalizationSection = renderPersonalizationSection(item.category);
  const primitivesSection = renderPrimitivesSection(`${item.description} ${item.howToBuild}`);

  return [
    `Build this app on my Zo Computer.`,
    ``,
    `Name: ${item.name}`,
    `Category: ${item.category}`,
    `Difficulty: ${item.difficulty}`,
    ``,
    `What this is`,
    item.description,
    ``,
    `The first milestone (do this before anything else)`,
    `Get the smallest possible end-to-end loop working: one real input goes in, the described output comes out, even if every detail is rough. No mocks. No stubbed branches. Once that runs, layer features on top.`,
    ``,
    `Build approach`,
    item.howToBuild,
    personalizationSection,
    primitivesSection,
    ``,
    `Monetization shape (only if I'm going to charge for this)`,
    item.monetization,
    ``,
    `Constraints`,
    `- Real Zo primitives only — Skills, Automations, integrations, zo.space routes, User Services. No pseudocode, no placeholder functions in the critical path.`,
    `- If a required integration isn't connected, surface a Connect button via connect_integration rather than asking me to paste credentials.`,
    `- Stop and ask before any destructive or public-facing action: sending messages, posting publicly, charging money, exposing a service, deleting anything I own.`,
    `- If you find yourself writing more than ~50 lines without running anything, stop and run what you have first.`,
    ``,
    `Definition of done`,
    `- The smallest end-to-end loop runs with real input and real output.`,
    `- I know where every piece lives — skill path, automation_id, route URL, or service_id — and how to trigger each piece manually.`,
    `- Anything unfinished is listed explicitly as "still TODO", not silently mocked to look complete.`,
    `- Report what was built, where it lives, what still needs configuration on my end, and your top suggestion for v2 if I want to extend it.`,
  ].filter((x) => x !== null && x !== undefined).join("\n");
}

function buildRecipeBrief(type: RecipeType, item: RecipeItem): string {
  if (type === "prompt") return buildPromptBrief(item as Prompt);
  if (type === "automation") return buildAutomationBrief(item as Automation);
  if (type === "space") return buildSpaceBrief(item as Space);
  return buildAppBrief(item as App);
}

function buildZoUrl(brief: string) {
  const url = new URL(ZO_APP_URL);
  url.searchParams.set("prompt", brief);
  const withPrompt = url.toString();
  return withPrompt.length <= MAX_PROMPT_URL_LENGTH ? withPrompt : ZO_APP_URL;
}

export function RecipeActions({ type, item, accentColor = "var(--blue)" }: RecipeActionsProps) {
  const [toast, setToast] = useState<ToastState>({ kind: "idle", message: "" });
  const [specOpen, setSpecOpen] = useState(false);
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const fallbackTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const flashTimeoutRef = useRef<number | null>(null);

  const brief = useMemo(() => buildRecipeBrief(type, item), [type, item]);
  const copyNoun = getCopyNoun(type);

  useEffect(() => {
    setInAppBrowser(detectInAppBrowser());
  }, []);

  const flash = useCallback((kind: ToastState["kind"], message: string) => {
    setToast({ kind, message });
    if (flashTimeoutRef.current !== null) {
      window.clearTimeout(flashTimeoutRef.current);
    }
    flashTimeoutRef.current = window.setTimeout(() => {
      setToast({ kind: "idle", message: "" });
    }, 3200);
  }, []);

  const selectFallback = useCallback(() => {
    requestAnimationFrame(() => {
      const el = fallbackTextareaRef.current;
      if (el) {
        el.focus();
        el.select();
      }
    });
  }, []);

  const handleCopy = useCallback(async () => {
    if (inAppBrowser) {
      setSpecOpen(true);
      flash("copied", `Tap and hold the text below to copy the ${copyNoun.toLowerCase()}.`);
      selectFallback();
      return;
    }
    try {
      await copyText(brief);
      flash("copied", `${copyNoun} copied.`);
    } catch {
      setSpecOpen(true);
      flash("error", "Clipboard blocked. Use the text below.");
      selectFallback();
    }
  }, [brief, copyNoun, flash, inAppBrowser, selectFallback]);

  const handlePrimary = useCallback(async () => {
    if (inAppBrowser) {
      setSpecOpen(true);
      flash("opened", "In-app browser detected. Open this page in your real browser, then copy the text below.");
      selectFallback();
      return;
    }

    let copied = false;
    try {
      await copyText(brief);
      copied = true;
    } catch {
      copied = false;
    }

    const zoUrl = buildZoUrl(brief);
    const attemptedPrefill = zoUrl !== ZO_APP_URL;
    window.open(zoUrl, "_blank", "noopener,noreferrer");

    if (attemptedPrefill && copied) {
      flash("opened", `Zo opened. ${copyNoun} copied, and prefill was attempted.`);
      return;
    }
    if (attemptedPrefill) {
      flash("opened", `Zo opened with a prefill attempt. If empty, use ${getReadLabel(type, false)} here.`);
      return;
    }
    if (copied) {
      flash("opened", `Zo opened. ${copyNoun} copied for manual paste.`);
      return;
    }
    setSpecOpen(true);
    flash("opened", "Zo opened. Clipboard was blocked, so use the text below.");
    selectFallback();
  }, [brief, copyNoun, flash, inAppBrowser, selectFallback, type]);

  const openInRealBrowser = useCallback(() => {
    if (typeof window === "undefined") return;
    const href = window.location.href;
    // Best-effort. Some in-app browsers honor _system or intent URIs.
    try {
      window.open(href, "_system");
    } catch {
      window.open(href, "_blank");
    }
  }, []);

  return (
    <div className="space-y-2">
      {inAppBrowser && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
          <p className="mb-1 font-mono uppercase tracking-[0.16em] text-[var(--foreground)]">In-app browser detected</p>
          <p>
            Clipboard and new-tab behavior are restricted here. For the cleanest handoff,{" "}
            <button onClick={openInRealBrowser} className="underline hover:text-[var(--foreground)]" style={{ color: accentColor }}>
              open this page in your real browser
            </button>
            . Otherwise, use the text below to copy manually.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handlePrimary}
          className="px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer hover:-translate-y-px"
          style={{ color: "#0a0a0a", background: accentColor }}
        >
          ✦ {getPrimaryLabel(type)}
        </button>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-mono rounded-md border border-[var(--border)] bg-[var(--secondary)] text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] hover:border-[var(--foreground)] cursor-pointer"
        >
          {getCopyLabel(type)}
        </button>
        <button
          onClick={() => setSpecOpen((value) => !value)}
          className="px-3 py-1.5 text-xs font-mono rounded-md border border-[var(--border)] bg-transparent text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] hover:border-[var(--foreground)] cursor-pointer"
        >
          {getReadLabel(type, specOpen)}
        </button>
      </div>

      <div className="recipe-handoff-panel rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Handoff mode
          </p>
          {toast.kind !== "idle" && (
            <p
              className="text-[11px] font-mono"
              style={{
                color:
                  toast.kind === "copied"
                    ? "var(--teal)"
                    : toast.kind === "error"
                    ? "var(--destructive, #ef4444)"
                    : accentColor,
              }}
            >
              {toast.message}
            </p>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {getHandoffBlurb(type)}
        </p>
      </div>

      {specOpen && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              {getReadHeader(type)}
            </p>
            <button onClick={handleCopy} className="text-[11px] font-mono hover:underline" style={{ color: accentColor }}>
              {getCopyLabel(type)}
            </button>
          </div>
          {inAppBrowser ? (
            <textarea
              ref={fallbackTextareaRef}
              readOnly
              value={brief}
              onFocus={(e) => e.currentTarget.select()}
              className="block max-h-72 w-full overflow-auto whitespace-pre-wrap rounded border border-[var(--border)] bg-[var(--card)] p-3 text-xs leading-relaxed text-[var(--muted-foreground)] font-mono"
              rows={12}
            />
          ) : (
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded border border-[var(--border)] bg-[var(--card)] p-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
              {brief}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
