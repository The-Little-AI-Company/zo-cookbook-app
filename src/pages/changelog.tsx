import { Link } from "react-router-dom";

const changes = [
  {
    date: "2026-06-18",
    title: "70 workflow automations across 14 white-collar roles",
    items: [
      "Added 70 automation recipes built around real recurring work for bookkeepers, sales reps, recruiters, customer success, project managers, HR, executive assistants, marketers, support leads, ecommerce operators, data analysts, procurement, real estate agents, paralegals, and grant writers.",
      "Each one is broken to first-principles steps: read a source, reason, verify the work, write an output, stop on a checkable condition. The full step list, the proof gate, and the stop condition live in every recipe's prompt.",
      "This batch deliberately widened integration coverage. The old library leaned on Gmail, Calendar, and Linear; these reach QuickBooks, Xero, HubSpot, Salesforce, Pipedrive, Zendesk, Intercom, Shopify, Calendly, Typeform, Mailchimp, Asana, Trello, Jira, BambooHR, Airtable, and Stripe. Roughly 20 distinct connections instead of 6.",
      "Every recipe is schedule-first to match how Zo automations actually run. There is no instant event trigger in Zo, so anything that sounded like \"on new lead\" is written as a scheduled scan with a watermark file so it never reprocesses the same record twice.",
      "Catalog apps are named honestly. Each brief says to connect the app via Plugins, and tells the run to stop and report if a tool errors instead of faking a result.",
      "Automation count 285 -> 355. Cookbook total 1162 -> 1232. Manifest, FAQ, homepage, and the /whats-new feed pick this up at runtime.",
    ],
  },
  {
    date: "2026-05-25",
    title: "Massive batch: 500 new recipes",
    items: [
      "Added 75 apps, 75 spaces, 175 automations, and 175 prompts in a single batch.",
      "Cookbook total moved from 662 to 1162. Manifest, FAQ, and homepage counts pick this up automatically at runtime.",
      "Every entry was validated for schema, banned writing patterns, and uniqueness against the existing library before merge.",
      "The /whats-new page now leads with an Editor's Picks section: roughly 10 hand-selected standouts per type, followed by the full new list.",
      "Curating this many specific, varied names that hold a consistent tone is the real work behind the cookbook. The picks are the ones that earned their place.",
    ],
  },
  {
    date: "2026-05-25",
    title: "Cookbook Recipe Generator prompt + workspace recipe-author prompt",
    items: [
      "Added prompt 252: Cookbook Recipe Generator. Visitors can take this to their own Zo, answer three questions, and get 3-5 deploy-ready recipes in cookbook shape.",
      "Shipped a workspace-only recipe-author prompt at _prompts/recipe-generator.md. Run it repeatedly to grow the cookbook past 1,000 recipes; each batch adds ~50-60 and writes directly to the JSON data files.",
      "Manifest count 661 -> 662. Prompt count 251 -> 252.",
    ],
  },
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
          <div className="flex gap-3">
            <Link to="/whats-new" className="hover:text-[var(--foreground)]">What's New</Link>
            <Link to="/faq" className="hover:text-[var(--foreground)]">FAQ</Link>
          </div>
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
