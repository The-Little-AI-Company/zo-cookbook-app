import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { loadAllIdeas, type TypeMap } from "@/lib/data-loader";
import { getIdeaPath, type IdeaType } from "@/lib/idea-slugs";
import { isNew } from "@/lib/is-new";

type NewItem = {
  id: number;
  name: string;
  category: string;
  addedDate: string;
  type: IdeaType;
  href: string;
  snippet: string;
};

const TYPE_META: Record<IdeaType, { label: string; color: string; icon: string }> = {
  apps: { label: "App", color: "var(--red)", icon: "◆" },
  spaces: { label: "Space", color: "var(--blue)", icon: "●" },
  automations: { label: "Automation", color: "var(--yellow)", icon: "✦" },
  prompts: { label: "Prompt", color: "var(--teal)", icon: "▤" },
};

// Hand-picked standouts from the 2026-05-25 batch. Names must match exactly
// what is in public/data/*.json. Items not found in the loaded data are
// silently skipped (defensive against future renames).
const EDITORS_PICKS: Record<IdeaType, string[]> = {
  apps: [
    "The Subscription Cemetery",
    "The Webhook Replay Inspector",
    "The Wedding Vendor War Room",
    "Indie Hacker MRR Mirror",
    "Carpool Schedule Roulette",
    "The OSS Sponsor Wall Generator",
    "The Senior Parent Bill Concierge",
    "The Stale Pull Request Bot",
    "The Plant Watering Calendar",
    "Stripe Refund Postmortem",
  ],
  spaces: [
    "The OAuth Token Funeral",
    "The Lunch Decision Wheel",
    "Recipe Doubler",
    "The Did I Take My Meds Log",
    "The Grandma Letter Page",
    "The Failed Webhook Bin",
    "Permission Slip Stash",
    "The Bus-Factor Page",
    "Fridge Door Note",
    "The Open Graph Auditor",
  ],
  automations: [
    "The Camper Propane Check",
    "The Mystery Charge Detector",
    "The Hydration Nag",
    "Stripe MRR Drift Alarm",
    "Cloudflare DNS Record Drift",
    "Town Council Meeting Watch",
    "The Cold Email Reply Salvager",
    "Tomorrow's Outfit Weather Check",
    "The Sentry Noise Suppressor",
    "Lawn Mowing Weather Window",
  ],
  prompts: [
    "The Self-Permission Note",
    "The Postgres Index Detective",
    "The Apology That Lands",
    "The Bill Negotiation Script",
    "The Schema Migration Reviewer",
    "The 'Why Am I Tired?' Pattern Finder",
    "The Founder Sales Call Critic",
    "The Estranged Family Boundary Letter",
    "The TypeScript Error Untangler",
    "The \"Is This A Scam?\" Email Checker",
  ],
};

function snippetFor(type: IdeaType, item: any): string {
  if (type === "automations") return String(item.expectedOutput ?? "");
  if (type === "prompts") return String(item.whenToUse ?? "");
  return String(item.description ?? "");
}

function categoryFor(type: IdeaType, item: any): string {
  if (type === "spaces") return String(item.keyTech ?? "");
  return String(item.category ?? "");
}

function daysAgo(dateStr: string): string {
  const then = Date.parse(dateStr);
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

function collectNew(data: TypeMap): NewItem[] {
  const items: NewItem[] = [];
  (Object.keys(data) as IdeaType[]).forEach((type) => {
    for (const item of data[type] as any[]) {
      if (!("addedDate" in item) || !item.addedDate) continue;
      if (!isNew(item.addedDate)) continue;
      items.push({
        id: item.id,
        name: item.name,
        category: categoryFor(type, item),
        addedDate: item.addedDate,
        type,
        href: getIdeaPath(type, item),
        snippet: snippetFor(type, item),
      });
    }
  });
  items.sort((a, b) => {
    const diff = Date.parse(b.addedDate) - Date.parse(a.addedDate);
    if (diff !== 0) return diff;
    return b.id - a.id;
  });
  return items;
}

function collectPicks(data: TypeMap): Record<IdeaType, NewItem[]> {
  const out: Record<IdeaType, NewItem[]> = { apps: [], spaces: [], automations: [], prompts: [] };
  (Object.keys(out) as IdeaType[]).forEach((type) => {
    const byName = new Map<string, any>();
    for (const item of data[type] as any[]) byName.set(item.name, item);
    for (const name of EDITORS_PICKS[type]) {
      const hit = byName.get(name);
      if (!hit) continue;
      out[type].push({
        id: hit.id,
        name: hit.name,
        category: categoryFor(type, hit),
        addedDate: hit.addedDate ?? "",
        type,
        href: getIdeaPath(type, hit),
        snippet: snippetFor(type, hit),
      });
    }
  });
  return out;
}

export default function WhatsNewPage() {
  const [data, setData] = useState<TypeMap | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadAllIdeas()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => (data ? collectNew(data) : []), [data]);
  const picks = useMemo(() => (data ? collectPicks(data) : null), [data]);

  const grouped = useMemo(() => {
    const m: Record<IdeaType, NewItem[]> = { apps: [], spaces: [], automations: [], prompts: [] };
    for (const it of items) m[it.type].push(it);
    return m;
  }, [items]);

  const totals = useMemo(() => {
    const m: Record<IdeaType, number> = { apps: 0, spaces: 0, automations: 0, prompts: 0 };
    for (const it of items) m[it.type] += 1;
    return m;
  }, [items]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <div className="flex gap-3">
            <Link to="/changelog" className="hover:text-[var(--foreground)]">Changelog</Link>
            <Link to="/faq" className="hover:text-[var(--foreground)]">FAQ</Link>
          </div>
        </nav>

        <header className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--green)]">What's New</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">
            500 new recipes landed on 2026-05-25
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            75 apps, 75 spaces, 175 automations, 175 prompts. Coming up with names this specific,
            this varied, and this consistent in tone is the actual work behind a cookbook expansion
            of this size. Picks below are the ones that earned their place. The full new list is
            further down. Items roll off automatically after 30 days.
          </p>
          {data && (
            <p className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-[var(--muted-foreground)]">
              <span><span className="text-[var(--red)]">◆</span> {totals.apps} apps</span>
              <span><span className="text-[var(--blue)]">●</span> {totals.spaces} spaces</span>
              <span><span className="text-[var(--yellow)]">✦</span> {totals.automations} automations</span>
              <span><span className="text-[var(--teal)]">▤</span> {totals.prompts} prompts</span>
              <span>= {items.length} total in window</span>
            </p>
          )}
        </header>

        {error && (
          <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-sm text-[var(--muted-foreground)]">Could not load recipes: {error}</p>
          </section>
        )}

        {!data && !error && (
          <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
            <p className="text-sm text-[var(--muted-foreground)]">Loading...</p>
          </section>
        )}

        {data && items.length === 0 && (
          <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
            <p className="font-display text-xl font-bold">Nothing new this month yet.</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Check the <Link to="/changelog" className="underline">changelog</Link> for what shipped previously, or browse the <Link to="/" className="underline">full cookbook</Link>.
            </p>
          </section>
        )}

        {data && picks && items.length > 0 && (
          <section className="mt-10">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-display text-3xl font-black tracking-tight">Editor's Picks</h2>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                ~10 per type, hand-picked
              </span>
            </div>
            <div className="space-y-10">
              {(Object.keys(picks) as IdeaType[]).map((type) => {
                const list = picks[type];
                if (list.length === 0) return null;
                const meta = TYPE_META[type];
                return (
                  <div key={`picks-${type}`}>
                    <div className="mb-3 flex items-baseline gap-3">
                      <h3 className="font-display text-xl font-bold" style={{ color: meta.color }}>
                        <span className="mr-2">{meta.icon}</span>
                        {meta.label}s
                      </h3>
                      <span className="text-xs font-mono text-[var(--muted-foreground)]">
                        {list.length} picked of {totals[type]} new
                      </span>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {list.map((it) => (
                        <li key={`pick-${it.type}-${it.id}`}>
                          <Link
                            to={it.href}
                            className="group block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--foreground)]/40"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-display font-semibold text-base leading-tight group-hover:text-[var(--foreground)]">
                                {it.name}
                              </h4>
                              <span
                                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider"
                                style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)`, color: meta.color }}
                              >
                                Pick
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] font-mono text-[var(--muted-foreground)]">{it.category}</p>
                            {it.snippet && (
                              <p className="mt-2 line-clamp-3 text-sm leading-snug text-[var(--muted-foreground)]">
                                {it.snippet}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data && items.length > 0 && (
          <section className="mt-12 space-y-8">
            <div className="flex items-baseline justify-between border-t border-[var(--border)] pt-8">
              <h2 className="font-display text-3xl font-black tracking-tight">Everything new in this batch</h2>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                {items.length} total
              </span>
            </div>
            {(Object.keys(grouped) as IdeaType[]).map((type) => {
              const list = grouped[type];
              if (list.length === 0) return null;
              const meta = TYPE_META[type];
              return (
                <div key={type}>
                  <div className="mb-3 flex items-baseline gap-3">
                    <h3 className="font-display text-2xl font-bold" style={{ color: meta.color }}>
                      <span className="mr-2">{meta.icon}</span>
                      {meta.label}s
                    </h3>
                    <span className="text-xs font-mono text-[var(--muted-foreground)]">
                      {list.length} new
                    </span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {list.map((it) => (
                      <li key={`${it.type}-${it.id}`}>
                        <Link
                          to={it.href}
                          className="group block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--foreground)]/40"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-display font-semibold text-base leading-tight group-hover:text-[var(--foreground)]">
                              {it.name}
                            </h4>
                            <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                              {daysAgo(it.addedDate)}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{it.category}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
