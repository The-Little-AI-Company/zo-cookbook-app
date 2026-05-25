import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadManifest, type Counts } from "@/lib/data-loader";

function buildCountAnswer(counts: Counts | null): string {
  if (!counts) {
    return "Loading current counts...";
  }
  const { total, apps, spaces, automations, prompts } = counts;
  return `The cookbook currently has ${total} total recipes: ${apps} Apps & Sites, ${spaces} Spaces, ${automations} Automations, and ${prompts} Prompts. These numbers come directly from the manifest so they stay in sync with the data files automatically.`;
}

const STATIC_FAQS = [
  {
    question: "What counts as one idea?",
    answer:
      "One complete card counts as one idea: the concept name plus its category, explanation, build notes, difficulty, monetization or use case, and generated handoff brief. Individual fields inside a card do not count separately.",
  },
  {
    question: "Does the cookbook run things inside my Zo automatically?",
    answer:
      "No. The cookbook is public discovery. Your actual work happens privately inside your own Zo Computer. Recipe actions copy a complete brief, open Zo, and attempt URL prefill when the brief is short enough.",
  },
  {
    question: "Why not paste directly into Zo's text box?",
    answer:
      "A public site cannot force-paste text into another domain's input box because browsers block that for security. The safe handoff is copy-to-clipboard plus open Zo. If Zo exposes an official prefill URL parameter, the cookbook should use that exact contract.",
  },
  {
    question: "How do I see what was added recently?",
    answer:
      "Visit the What's New page. It lists everything added in the last 30 days across all four types, sorted by date. Items roll off automatically after the window passes, so the page is always current with no manual maintenance.",
  },
  {
    question: "Where do new ideas live?",
    answer:
      "Markdown batches are the human-editable source in content/. The importer converts valid idea batches into src/data/generated/app-ideas.generated.json. The app imports that JSON and merges it with the original dataset.",
  },
  {
    question: "What is the point of the detail pages?",
    answer:
      "Each recipe can live at /ideas/:type/:slug. That gives humans a clean reading page and gives search and answer engines a stronger surface than one giant single-page list.",
  },
];

export default function FAQPage() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadManifest()
      .then((m) => {
        if (!cancelled) setCounts(m.counts);
      })
      .catch(() => {
        if (!cancelled) setCounts(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const faqs = [
    {
      question: "How many recipes are in the cookbook right now?",
      answer: buildCountAnswer(counts),
    },
    ...STATIC_FAQS,
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <div className="flex gap-3">
            <Link to="/whats-new" className="hover:text-[var(--foreground)]">What's New</Link>
            <Link to="/changelog" className="hover:text-[var(--foreground)]">Changelog</Link>
          </div>
        </nav>

        <header className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--teal)]">FAQ</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">How Zo Cookbook works</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            The short version: browse public recipes, copy a useful brief, then build privately inside your own Zo Computer.
          </p>
        </header>

        <section className="mt-6 divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-[var(--card)]">
          {faqs.map((faq) => (
            <article key={faq.question} className="p-5">
              <h2 className="font-display text-xl font-bold">{faq.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{faq.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
