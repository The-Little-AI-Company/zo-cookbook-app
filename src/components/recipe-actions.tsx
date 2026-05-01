import { useCallback, useMemo, useState } from "react";
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

type ToastState = { kind: "idle" | "copied" | "opened"; message: string };

function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

function buildRecipeBrief(type: RecipeType, item: RecipeItem): string {
  if (type === "prompt") {
    const prompt = item as Prompt;
    return [
      `Run this prompt on my Zo Computer.`,
      ``,
      `Name: ${prompt.name}`,
      `Category: ${prompt.category}`,
      `When to use: ${prompt.whenToUse}`,
      ``,
      `Prompt:`,
      prompt.prompt,
      ``,
      `Return the full output in chat.`,
    ].join("\n");
  }

  if (type === "automation") {
    const automation = item as Automation;
    return [
      `Create this automation on my Zo Computer.`,
      ``,
      `Name: ${automation.name}`,
      `Category: ${automation.category}`,
      `Schedule: ${automation.schedule}`,
      `Delivery: ${automation.delivery}`,
      `Tools: ${automation.tools}`,
      `Expected output: ${automation.expectedOutput}`,
      `Customization notes: ${automation.customization}`,
      ``,
      `Execution prompt:`,
      automation.prompt,
      ``,
      `Use the appropriate Zo tools to build it for real, not as a sketch. Confirm what you created and what still needs configuration.`,
    ].join("\n");
  }

  if (type === "space") {
    const space = item as Space;
    return [
      `Build this zo.space project on my Zo Computer.`,
      ``,
      `Name: ${space.name}`,
      `Route: ${space.route}`,
      `Type: ${space.type}`,
      `Visibility: ${space.visibility}`,
      `Description: ${space.description}`,
      `Key tech: ${space.keyTech}`,
      ``,
      `Use zo.space routes and make it production-quality. Confirm the final route URLs and visibility settings.`,
    ].join("\n");
  }

  const app = item as App;
  return [
    `Build this app on my Zo Computer.`,
    ``,
    `Name: ${app.name}`,
    `Category: ${app.category}`,
    `Difficulty: ${app.difficulty}`,
    `Description: ${app.description}`,
    `How to build: ${app.howToBuild}`,
    `Monetization: ${app.monetization}`,
    ``,
    `Build the smallest real working version first, then tell me what was created and where it lives.`,
  ].join("\n");
}

function getPrimaryLabel(type: RecipeType) {
  if (type === "app") return "Build in Zo";
  if (type === "space") return "Deploy in Zo";
  if (type === "automation") return "Deploy in Zo";
  return "Open in Zo";
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
  const brief = useMemo(() => buildRecipeBrief(type, item), [type, item]);

  const flash = useCallback((kind: ToastState["kind"], message: string) => {
    setToast({ kind, message });
    window.clearTimeout((flash as unknown as { timeout?: number }).timeout);
    (flash as unknown as { timeout?: number }).timeout = window.setTimeout(() => {
      setToast({ kind: "idle", message: "" });
    }, 3200);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await copyText(brief);
      flash("copied", "Build brief copied.");
    } catch {
      flash("copied", "Clipboard blocked. Open the spec and copy manually.");
    }
  }, [brief, flash]);

  const handlePrimary = useCallback(async () => {
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
      flash("opened", "Zo opened. Brief copied, and prefill was attempted.");
      return;
    }

    if (attemptedPrefill) {
      flash("opened", "Zo opened with a prefill attempt. If empty, use Read spec here.");
      return;
    }

    if (copied) {
      flash("opened", "Zo opened. Brief copied for manual paste.");
      return;
    }

    flash("opened", "Zo opened. Clipboard was blocked, so use Read spec here.");
  }, [brief, flash]);

  return (
    <div className="space-y-2">
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
          Copy brief
        </button>
        <button
          onClick={() => setSpecOpen((value) => !value)}
          className="px-3 py-1.5 text-xs font-mono rounded-md border border-[var(--border)] bg-transparent text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] hover:border-[var(--foreground)] cursor-pointer"
        >
          {specOpen ? "Hide spec" : "Read spec"}
        </button>
      </div>

      <div className="recipe-handoff-panel rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Handoff mode
          </p>
          {toast.kind !== "idle" && (
            <p className="text-[11px] font-mono" style={{ color: toast.kind === "copied" ? "var(--teal)" : accentColor }}>
              {toast.message}
            </p>
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          Copies the full build brief, opens Zo, and attempts URL prefill when the brief is short enough.
        </p>
      </div>

      {specOpen && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Build spec</p>
            <button onClick={handleCopy} className="text-[11px] font-mono hover:underline" style={{ color: accentColor }}>
              Copy spec
            </button>
          </div>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded border border-[var(--border)] bg-[var(--card)] p-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            {brief}
          </pre>
        </div>
      )}
    </div>
  );
}
