import { Link } from "react-router-dom";

const changes = [
  {
    date: "2026-05-24",
    title: "Recipes 101 through 110 plus Automation Interviewer",
    items: [
      "Added 10 new automation recipes: Domain & Cert Expiry Watcher, AI API Spend Tracker, Stale GitHub Issue Resurrector, Backup Sanity Check, Pet Care Reminder Loop, Quarterly Tax Estimate Nudge, Reading Highlight Extractor, Launch Day War Room, Inactive Client Re-engagement, Daily AI Tool Watch.",
      "Added the Automation Interviewer prompt: take it to your own Zo, answer a short interview, walk away with 3 to 5 ready-to-deploy automation recipes drafted for you.",
      "Added a small \"new\" badge that appears on cards added in the last 30 days and disappears automatically after the window closes. No cron, no manual cleanup.",
      "Five new categories surfaced in the UI: Open Source, System Reliability, Pet Care, Industry Watch, Cookbook Helpers.",
      "Counts updated: 200 Apps & Sites, 100 Spaces, 110 Automations, 251 Prompts, 661 total recipes.",
    ],
  },
  {
    date: "2026-04-30",
    title: "Dev copy content expansion",
    items: [
      "Created a safe dev copy so the live cookbook stays untouched.",
      "Added a Markdown-to-JSON import pipeline for new app idea batches.",
      "Imported 100 new mind-expanding app ideas across two batches.",
      "Added dedicated recipe routes at /ideas/:type/:slug.",
      "Added compact Read spec panels so full handoff briefs do not bloat cards.",
      "Repaired app counts: 200 Apps & Sites, 100 Spaces, 100 Automations, 250 Prompts, 650 total recipes.",
    ],
  },
  {
    date: "2026-04-29",
    title: "Public discovery, private execution",
    items: [
      "Removed the old public Connect + Run model.",
      "Kept the cookbook as a launchpad instead of a public proxy for someone else’s Zo.",
      "Recipe actions now copy/open handoff briefs for private execution inside the user’s own Zo Computer.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <Link to="/faq" className="hover:text-[var(--foreground)]">FAQ</Link>
        </nav>

        <header className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--yellow)]">Changelog</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">What changed in Zo Cookbook</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            A plain record of what changed, why it matters, and what still needs verification before the dev version replaces anything live.
          </p>
        </header>

        <section className="mt-6 space-y-4">
          {changes.map((change) => (
            <article key={`${change.date}-${change.title}`} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <time className="text-xs font-mono text-[var(--muted-foreground)]">{change.date}</time>
                <h2 className="font-display text-xl font-bold">{change.title}</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {change.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--yellow)]">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
