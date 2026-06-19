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
};

const TYPE_META: Record<IdeaType, { label: string; color: string; icon: string }> = {
  apps: { label: "App", color: "var(--red)", icon: "◆" },
  spaces: { label: "Space", color: "var(--blue)", icon: "●" },
  automations: { label: "Automation", color: "var(--yellow)", icon: "✦" },
  prompts: { label: "Prompt", color: "var(--teal)", icon: "▤" },
};

const TYPE_ORDER: IdeaType[] = ["apps", "spaces", "automations", "prompts"];

function categoryFor(type: IdeaType, item: any): string {
  if (type === "spaces") return String(item.keyTech ?? "");
  return String(item.category ?? "");
}

function prettyDate(dateStr: string): string {
  const t = Date.parse(dateStr);
  if (!Number.isFinite(t)) return dateStr;
  return new Date(t).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function daysAgo(dateStr: string): string {
  const then = Date.parse(dateStr);
  if (!Number.isFinite(then)) return "";
  const days = Math.floor((Date.now() - then) / (24 * 60 * 60 * 1000));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days}d ago`;
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

// Group new items into dated batches (newest first), and within each batch
// keep a stable type order. Entirely driven by the addedDate field in the
// data files, so future releases show up with no code change.
function groupByDate(items: NewItem[]): { date: string; total: number; byType: Record<IdeaType, NewItem[]> }[] {
  const map = new Map<string, NewItem[]>();
  for (const it of items) {
    const arr = map.get(it.addedDate) ?? [];
    arr.push(it);
    map.set(it.addedDate, arr);
  }
  return [...map.entries()]
    .sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]))
    .map(([date, list]) => {
      const byType: Record<IdeaType, NewItem[]> = { apps: [], spaces: [], automations: [], prompts: [] };
      for (const it of list) byType[it.type].push(it);
      return { date, total: list.length, byType };
    });
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
  const batches = useMemo(() => groupByDate(items), [items]);

  const totals = useMemo(() => {
    const m: Record<IdeaType, number> = { apps: 0, spaces: 0, automations: 0, prompts: 0 };
    for (const it of items) m[it.type] += 1;
    return m;
  }, [items]);

  const latestDate = batches[0]?.date ?? null;

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
            {items.length > 0
              ? `${items.length} new ${items.length === 1 ? "recipe" : "recipes"} in the last 30 days`
              : "What's new in the cookbook"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            Everything added in the last 30 days, grouped by the day it shipped. This list builds
            itself from the recipe data, so it is always current and items roll off automatically
            after the window closes. For the full release history, see the{" "}
            <Link to="/changelog" className="underline hover:text-[var(--foreground)]">changelog</Link>.
          </p>
          {data && items.length > 0 && (
            <p className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-[var(--muted-foreground)]">
              <span><span className="text-[var(--red)]">◆</span> {totals.apps} apps</span>
              <span><span className="text-[var(--blue)]">●</span> {totals.spaces} spaces</span>
              <span><span className="text-[var(--yellow)]">✦</span> {totals.automations} automations</span>
              <span><span className="text-[var(--teal)]">▤</span> {totals.prompts} prompts</span>
              {latestDate && <span>· latest batch {prettyDate(latestDate)}</span>}
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

        {data && batches.length > 0 && (
          <section className="mt-10 space-y-12">
            {batches.map((batch) => (
              <div key={batch.date}>
                <div className="mb-6 flex items-baseline justify-between border-t border-[var(--border)] pt-6">
                  <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
                    {prettyDate(batch.date)}
                  </h2>
                  <span className="text-xs font-mono text-[var(--muted-foreground)]">
                    {batch.total} {batch.total === 1 ? "recipe" : "recipes"} · {daysAgo(batch.date)}
                  </span>
                </div>
                <div className="space-y-8">
                  {TYPE_ORDER.map((type) => {
                    const list = batch.byType[type];
                    if (list.length === 0) return null;
                    const meta = TYPE_META[type];
                    return (
                      <div key={`${batch.date}-${type}`}>
                        <div className="mb-3 flex items-baseline gap-3">
                          <h3 className="font-display text-xl font-bold" style={{ color: meta.color }}>
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
                                <h4 className="font-display font-semibold text-base leading-tight group-hover:text-[var(--foreground)]">
                                  {it.name}
                                </h4>
                                {it.category && (
                                  <p className="mt-1 text-[11px] font-mono text-[var(--muted-foreground)]">{it.category}</p>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
