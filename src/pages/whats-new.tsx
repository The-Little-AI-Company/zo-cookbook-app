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
    for (const item of data[type]) {
      if (!("addedDate" in item) || !item.addedDate) continue;
      if (!isNew(item.addedDate)) continue;
      items.push({
        id: item.id,
        name: item.name,
        category: item.category,
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

  const grouped = useMemo(() => {
    const m: Record<IdeaType, NewItem[]> = { apps: [], spaces: [], automations: [], prompts: [] };
    for (const it of items) m[it.type].push(it);
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
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Added in the last 30 days</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            Everything below is fresh. Items roll off automatically after 30 days, so this page shows you what to actually look at this month.
          </p>
          {data && (
            <p className="mt-3 text-xs font-mono text-[var(--muted-foreground)]">
              {items.length} new across {Object.values(grouped).filter((g) => g.length > 0).length} type{Object.values(grouped).filter((g) => g.length > 0).length === 1 ? "" : "s"}
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

        {data && items.length > 0 && (
          <section className="mt-6 space-y-8">
            {(Object.keys(grouped) as IdeaType[]).map((type) => {
              const list = grouped[type];
              if (list.length === 0) return null;
              const meta = TYPE_META[type];
              return (
                <div key={type}>
                  <div className="mb-3 flex items-baseline gap-3">
                    <h2 className="font-display text-2xl font-bold" style={{ color: meta.color }}>
                      <span className="mr-2">{meta.icon}</span>
                      {meta.label}s
                    </h2>
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
                            <h3 className="font-display font-semibold text-base leading-tight group-hover:text-[var(--foreground)]">
                              {it.name}
                            </h3>
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
