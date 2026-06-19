import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

type Kind = "recipe" | "site" | "automation" | "prompt" | "question" | "other";

const KINDS: { value: Kind; label: string; hint: string; accent: string }[] = [
  {
    value: "recipe",
    label: "Recipe / App",
    hint: "A buildable idea: name, what it does, who it's for.",
    accent: "var(--red)",
  },
  {
    value: "site",
    label: "Site / Space",
    hint: "A page or zo.space you'd want a recipe for.",
    accent: "var(--blue)",
  },
  {
    value: "automation",
    label: "Automation",
    hint: "A scheduled job worth running on a Zo.",
    accent: "var(--yellow)",
  },
  {
    value: "prompt",
    label: "Prompt",
    hint: "A prompt worth keeping. Inputs in {{double_braces}} get auto-detected.",
    accent: "var(--teal)",
  },
  {
    value: "question",
    label: "Question",
    hint: "Ask Jeff anything about Zo, the cookbook, or building solo.",
    accent: "var(--foreground)",
  },
  {
    value: "other",
    label: "Something else",
    hint: "Bug, idea, kind note, hate mail. All read.",
    accent: "var(--muted-foreground)",
  },
];

export default function SubmitPage() {
  const [kind, setKind] = useState<Kind>("recipe");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const activeKind = KINDS.find((k) => k.value === kind) ?? KINDS[0];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ kind, title, description, link, name, email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(typeof data?.error === "string" ? data.error : "Something went wrong.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Network error. Try again in a minute.");
    }
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
        <div className="mx-auto max-w-2xl">
          <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
            <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
            <Link to="/whats-new" className="hover:text-[var(--foreground)]">What's New</Link>
          </nav>

          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--teal)]">
              Submitted
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight">
              Got it. Filed.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              Jeff reads every submission. If it's good and you left an email, you'll
              hear back. If it's great, it'll show up in the cookbook with credit
              (unless you said otherwise).
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono">
              <button
                onClick={() => {
                  setKind("recipe");
                  setTitle("");
                  setDescription("");
                  setLink("");
                  setStatus("idle");
                }}
                className="rounded border border-[var(--border)] px-3 py-2 hover:border-[var(--foreground)]"
              >
                Submit another
              </button>
              <Link
                to="/"
                className="rounded border border-[var(--border)] px-3 py-2 hover:border-[var(--foreground)]"
              >
                Back to cookbook
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <div className="flex gap-3">
            <Link to="/whats-new" className="hover:text-[var(--foreground)]">What's New</Link>
            <Link to="/faq" className="hover:text-[var(--foreground)]">FAQ</Link>
          </div>
        </nav>

        <header className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--teal)]">
            Submit
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">
            Send Jeff a recipe.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
            Got an app, a space, an automation, or a prompt worth adding to the
            cookbook? Drop it here. Want to ask a question or flag a bug? Same form.
            Goes straight to Jeff's inbox. No accounts. No CAPTCHAs that hate you.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="mt-6 space-y-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
        >
          {/* Honeypot — hidden from humans, irresistible to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website (leave blank)
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <fieldset>
            <legend className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              What is this?
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {KINDS.map((k) => {
                const selected = k.value === kind;
                return (
                  <button
                    key={k.value}
                    type="button"
                    onClick={() => setKind(k.value)}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                      selected
                        ? "border-[var(--foreground)] bg-[var(--background)]"
                        : "border-[var(--border)] hover:border-[var(--foreground)]"
                    }`}
                    style={selected ? { boxShadow: `inset 3px 0 0 ${k.accent}` } : undefined}
                  >
                    <span className="font-display font-bold">{k.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">{activeKind.hint}</p>
          </fieldset>

          <label className="block">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Title
            </span>
            <input
              type="text"
              required
              maxLength={200}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                kind === "question"
                  ? "What's your question, in one line?"
                  : "One-line name for the thing."
              }
              className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-base outline-none focus:border-[var(--foreground)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Details
            </span>
            <textarea
              required
              maxLength={8000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              placeholder={
                kind === "recipe" || kind === "site"
                  ? "What it does, who it's for, why it matters. Stack notes welcome."
                  : kind === "automation"
                    ? "What it runs, on what schedule, and what it produces."
                    : kind === "prompt"
                      ? "Paste the prompt. Use {{double_braces}} for inputs."
                      : "Say more. Plain text is fine."
              }
              className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm leading-relaxed outline-none focus:border-[var(--foreground)]"
            />
            <span className="mt-1 block text-right text-[10px] font-mono text-[var(--muted-foreground)]">
              {description.length} / 8000
            </span>
          </label>

          <label className="block">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Link <span className="opacity-60">(optional)</span>
            </span>
            <input
              type="url"
              maxLength={500}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--foreground)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Your name <span className="opacity-60">(optional)</span>
              </span>
              <input
                type="text"
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="So Jeff knows who to credit."
                className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--foreground)]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Email <span className="opacity-60">(only if you want a reply)</span>
              </span>
              <input
                type="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--foreground)]"
              />
            </label>
          </div>

          {error && (
            <p className="rounded-md border border-[var(--red)] bg-[var(--red)]/10 px-3 py-2 text-sm text-[var(--red)]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-mono text-[var(--muted-foreground)]">
              No tracking. No newsletter. Just your submission to Jeff.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2 text-sm font-mono font-bold uppercase tracking-[0.14em] text-[var(--background)] transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send to Jeff"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
