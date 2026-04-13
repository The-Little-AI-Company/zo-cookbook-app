import { useCallback, useMemo, useState } from "react";
import type { App, Automation, Prompt, Space } from "@/data/cookbook-data";

type RecipeType = "app" | "space" | "automation" | "prompt";

type RecipeItem = App | Space | Automation | Prompt;

type RecipeActionsProps = {
  type: RecipeType;
  item: RecipeItem;
  accentColor?: string;
};

const ZO_URL = "https://zo.computer";

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

function getOpenLabel() {
  return "Open Zo";
}

export function RecipeActions({ type, item, accentColor = "var(--blue)" }: RecipeActionsProps) {
  const [toast, setToast] = useState<ToastState>({ kind: "idle", message: "" });
  const brief = useMemo(() => buildRecipeBrief(type, item), [type, item]);

  const flash = useCallback((kind: ToastState["kind"], message: string) => {
    setToast({ kind, message });
    window.clearTimeout((flash as unknown as { timeout?: number }).timeout);
    (flash as unknown as { timeout?: number }).timeout = window.setTimeout(() => {
      setToast({ kind: "idle", message: "" });
    }, 2600);
  }, []);

  const handleCopy = useCallback(async () => {
    await copyText(brief);
    flash("copied", "Recipe brief copied.");
  }, [brief, flash]);

  const handleOpen = useCallback(async () => {
    await copyText(brief);
    window.open(ZO_URL, "_blank", "noopener,noreferrer");
    flash("opened", "Recipe copied. Zo opened in a new tab.");
  }, [brief, flash]);

  const handlePrimary = useCallback(async () => {
    await copyText(brief);
    window.open(ZO_URL, "_blank", "noopener,noreferrer");
    flash("opened", `${getPrimaryLabel(type)} brief copied. Paste it into Zo.`);
  }, [brief, flash, type]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleOpen}
          className="px-3 py-1.5 text-xs font-mono rounded-md border transition-all cursor-pointer hover:-translate-y-px"
          style={{
            color: accentColor,
            borderColor: `color-mix(in srgb, ${accentColor} 35%, transparent)`,
            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
          }}
        >
          ↗ {getOpenLabel()}
        </button>
        <button
          onClick={handlePrimary}
          className="px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer hover:-translate-y-px"
          style={{
            color: "#0a0a0a",
            background: accentColor,
          }}
        >
          ✦ {getPrimaryLabel(type)}
        </button>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-mono rounded-md border border-[var(--border)] bg-[var(--secondary)] text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] hover:border-[var(--foreground)] cursor-pointer"
        >
          Copy recipe
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
          Copies the brief and opens Zo.
        </p>
      </div>
    </div>
  );
}
