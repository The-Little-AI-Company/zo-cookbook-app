import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeActions } from "@/components/recipe-actions";
import { NewBadge } from "@/components/new-badge";
import { isNew } from "@/lib/is-new";
import { getIdeaPath, getIdeaSlug, isIdeaType, type IdeaType } from "@/lib/idea-slugs";
import { loadIdeas } from "@/lib/data-loader";
import type { App, Automation, Prompt, Space } from "@/data/cookbook-types";

const accentByType: Record<IdeaType, string> = {
  apps: "var(--red)",
  spaces: "var(--blue)",
  automations: "var(--yellow)",
  prompts: "var(--teal)",
};

const labelByType: Record<IdeaType, string> = {
  apps: "App / Site Idea",
  spaces: "Space Recipe",
  automations: "Automation Recipe",
  prompts: "Prompt",
};

function itemName(item: App | Space | Automation | Prompt) {
  return "name" in item ? item.name : "Untitled";
}

function itemSummary(item: App | Space | Automation | Prompt) {
  if ("description" in item) return item.description;
  if ("whenToUse" in item) return item.whenToUse;
  if ("expectedOutput" in item) return item.expectedOutput;
  return "";
}

function DetailBody({ type, item }: { type: IdeaType; item: App | Space | Automation | Prompt }) {
  if (type === "apps") {
    const app = item as App;
    return (
      <div className="space-y-5">
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--red)]">How to build it on Zo</h2>
          <p className="mt-2 text-base leading-relaxed text-[var(--muted-foreground)]">{app.howToBuild}</p>
        </section>
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--yellow)]">Monetization</h2>
          <p className="mt-2 text-base leading-relaxed text-[var(--muted-foreground)]">{app.monetization}</p>
        </section>
        <RecipeActions type="app" item={app} accentColor="var(--red)" />
      </div>
    );
  }

  if (type === "spaces") {
    const space = item as Space;
    return (
      <div className="space-y-5">
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--blue)]">Route</h2>
          <code className="mt-2 block rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--blue)]">{space.route}</code>
        </section>
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--blue)]">Key tech</h2>
          <p className="mt-2 text-base leading-relaxed text-[var(--muted-foreground)]">{space.keyTech}</p>
        </section>
        <RecipeActions type="space" item={space} accentColor="var(--blue)" />
      </div>
    );
  }

  if (type === "automations") {
    const automation = item as Automation;
    return (
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Schedule</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">{automation.schedule}</p>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Delivery</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">{automation.delivery}</p>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Tools</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">{automation.tools}</p>
          </div>
        </div>
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--yellow)]">Prompt</h2>
          <pre className="mt-2 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--muted-foreground)]">{automation.prompt}</pre>
        </section>
        <section>
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Expected output</h2>
          <p className="mt-2 text-base leading-relaxed text-[var(--muted-foreground)]">{automation.expectedOutput}</p>
        </section>
        <RecipeActions type="automation" item={automation} accentColor="var(--yellow)" />
      </div>
    );
  }

  const prompt = item as Prompt;
  return (
    <div className="space-y-5">
      <section>
        <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--teal)]">Prompt</h2>
        <pre className="mt-2 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--muted-foreground)]">{prompt.prompt}</pre>
      </section>
      <section>
        <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">What you get</h2>
        <p className="mt-2 text-base leading-relaxed text-[var(--muted-foreground)]">{prompt.whatYouGet}</p>
      </section>
      <RecipeActions type="prompt" item={prompt} accentColor="var(--teal)" />
    </div>
  );
}

export default function IdeaDetailPage() {
  const { type, slug } = useParams();
  const [state, setState] = useState<{
    status: "loading" | "ready" | "missing";
    ideaType: IdeaType | null;
    item: App | Space | Automation | Prompt | null;
    siblings: (App | Space | Automation | Prompt)[];
  }>({ status: "loading", ideaType: null, item: null, siblings: [] });

  useEffect(() => {
    if (!isIdeaType(type) || !slug) {
      setState({ status: "missing", ideaType: null, item: null, siblings: [] });
      return;
    }

    let cancelled = false;
    setState({ status: "loading", ideaType: type, item: null, siblings: [] });

    loadIdeas(type).then((items) => {
      if (cancelled) return;
      const typedItems = items as (App | Space | Automation | Prompt)[];
      const item = typedItems.find((candidate) => getIdeaSlug(type, candidate) === slug) ?? null;
      setState({ status: item ? "ready" : "missing", ideaType: type, item, siblings: typedItems });
    }).catch(() => {
      if (!cancelled) setState({ status: "missing", ideaType: type, item: null, siblings: [] });
    });

    return () => {
      cancelled = true;
    };
  }, [type, slug]);

  if (state.status === "loading") {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-[var(--muted-foreground)]">
          Loading recipe…
        </div>
      </main>
    );
  }

  if (state.status === "missing" || !state.item || !state.ideaType) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl rounded-lg border border-[var(--border)] bg-[var(--card)] p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--red)]">Recipe not found</p>
          <h1 className="mt-3 font-display text-3xl font-bold">This idea wandered off.</h1>
          <p className="mt-3 text-[var(--muted-foreground)]">The route may be stale, or the idea moved during a content import.</p>
          <Link to="/" className="mt-6 inline-flex rounded-md border border-[var(--border)] px-4 py-2 text-sm font-mono hover:bg-[var(--secondary)]">
            Back to cookbook
          </Link>
        </div>
      </main>
    );
  }

  const ideaType = state.ideaType;
  const item = state.item;
  const accent = accentByType[ideaType];
  const index = state.siblings.findIndex((candidate) => candidate.id === item.id);
  const previous = index > 0 ? state.siblings[index - 1] : null;
  const next = index >= 0 && index < state.siblings.length - 1 ? state.siblings[index + 1] : null;

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <span>{labelByType[ideaType]}</span>
        </nav>

        <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl shadow-black/10 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ color: accent, background: `color-mix(in srgb, ${accent} 12%, transparent)` }}>
              {labelByType[ideaType]}
            </span>
            {"category" in item && <span className="rounded bg-[var(--secondary)] px-2 py-1 text-[10px] font-mono text-[var(--muted-foreground)]">{item.category}</span>}
            {"difficulty" in item && <span className="rounded bg-[var(--secondary)] px-2 py-1 text-[10px] font-mono text-[var(--muted-foreground)]">{item.difficulty}</span>}
            {"addedDate" in item && isNew((item as { addedDate?: string }).addedDate) && <NewBadge />}
          </div>

          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">{itemName(item)}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted-foreground)]">{itemSummary(item)}</p>

          <div className="my-7 h-px bg-[var(--border)]" />
          <DetailBody type={ideaType} item={item} />
        </article>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {previous && (
            <Link to={getIdeaPath(ideaType, previous)} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:bg-[var(--secondary)]">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Previous</p>
              <p className="mt-1 font-display font-semibold">{itemName(previous)}</p>
            </Link>
          )}
          {next && (
            <Link to={getIdeaPath(ideaType, next)} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:bg-[var(--secondary)] sm:text-right">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Next</p>
              <p className="mt-1 font-display font-semibold">{itemName(next)}</p>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
