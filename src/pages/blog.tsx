import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

function cleanExcerpt(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => {
        if (!response.ok) throw new Error("Blog fetch failed");
        return response.json();
      })
      .then((data: { posts: BlogPost[] }) => {
        setPosts(data.posts);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted-foreground)]">
          <Link to="/" className="hover:text-[var(--foreground)]">← Cookbook</Link>
          <a href="/go/substack" className="hover:text-[var(--foreground)]">Open Substack ↗</a>
        </nav>

        <header className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--yellow)]">Blog</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Field notes from Salmon, Idaho</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted-foreground)]">
            Jeff’s Substack sits next to the cookbook: practical AI development, Zo experiments, public-interest builds, and the boring reliability work that makes agentic software usable.
          </p>
        </header>

        <section className="mt-5 grid gap-3">
          {status === "loading" && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--muted-foreground)]">Loading posts…</div>
          )}
          {status === "error" && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
              <p className="text-[var(--muted-foreground)]">Could not load the feed right now.</p>
              <a href="/go/substack" className="mt-3 inline-flex text-sm font-mono text-[var(--yellow)] hover:underline">Read on Substack →</a>
            </div>
          )}
          {status === "ready" && posts.length === 0 && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
              <p className="text-[var(--muted-foreground)]">No posts found in the feed yet.</p>
              <a href="/go/substack" className="mt-3 inline-flex text-sm font-mono text-[var(--yellow)] hover:underline">Open Substack →</a>
            </div>
          )}
          {posts.map((post) => (
            <a key={post.link} href={post.link} className="group rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--yellow)]/50 hover:bg-[var(--secondary)]/50">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                {post.pubDate ? new Date(post.pubDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Substack"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-[var(--foreground)] group-hover:text-[var(--yellow)]">{post.title}</h2>
              {post.description && <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{cleanExcerpt(post.description)}</p>}
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
