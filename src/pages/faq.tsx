import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How many recipes are in the dev cookbook now?",
    answer: "The cookbook shows 661 total recipes: 200 Apps & Sites, 100 Spaces, 110 Automations, and 251 Prompts. If the header ever drifts from those numbers, the data merge or cached build needs verification.",
  },
  {
    question: "What counts as one idea?",
    answer: "One complete card counts as one idea: the concept name plus its category, explanation, build notes, difficulty, monetization or use case, and generated handoff brief. Individual fields inside a card do not count separately.",
  },
  {
    question: "Does the cookbook run things inside my Zo automatically?",
    answer: "No. The cookbook is public discovery. Your actual work happens privately inside your own Zo Computer. Recipe actions copy a complete brief, open Zo, and attempt URL prefill when the brief is short enough.",
  },
  {
    question: "Why not paste directly into Zo’s text box?",
    answer: "A public site cannot force-paste text into another domain’s input box because browsers block that for security. The safe handoff is copy-to-clipboard plus open Zo. If Zo exposes an official prefill URL parameter, the cookbook should use that exact contract.",
  },
  {
    question: "Where do new ideas live?",
    answer: "Markdown batches are the human-editable source in content/. The importer converts valid idea batches into src/data/generated/app-ideas.generated.json. The app imports that JSON and merges it with the original dataset.",
  },
  {
    question: "What is the point of the detail pages?",
    answer: "Each recipe can live at /ideas/:type/:slug. That gives humans a clean reading page and gives search/answer engines a stronger surface than one giant single-page list.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <Link to="/changelog" className="hover:text-[var(--foreground)]">Changelog</Link>
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
