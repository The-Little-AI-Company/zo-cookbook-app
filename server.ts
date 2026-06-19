import { serveStatic } from "hono/bun";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import config from "./zosite.json";
import { Hono } from "hono";
import { appendFile, mkdir } from "node:fs/promises";

// AI agents: read README.md for navigation and contribution guidance.
type Mode = "development" | "production";
const app = new Hono();

app.use("*", async (c, next) => {
  if (c.req.method !== "HEAD") return next();

  const getRequest = new Request(c.req.url, {
    method: "GET",
    headers: c.req.raw.headers,
  });
  const response = await app.fetch(getRequest);
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
});

const outboundLinks: Record<string, string> = {
  zo: "https://zo-computer.cello.so/X9jcdFXqh9Z",
  "101": "https://zo-101-jeffkazzee.zocomputer.io",
  reddit: "https://www.reddit.com/r/ZoComputerClub/",
  facebook: "https://www.facebook.com/profile.php?id=61588689719800",
  substack: "https://salmonidaho.substack.com/",
  discord: "https://discord.gg/invite/zocomputer",
};

app.get("/go/:slug", (c) => {
  const target = outboundLinks[c.req.param("slug")];
  if (!target) return c.notFound();
  return c.redirect(target, 302);
});

function xmlText(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function getXmlTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? xmlText(match[1]) : "";
}

app.get("/api/blog", async (c) => {
  try {
    const response = await fetch("https://salmonidaho.substack.com/feed", {
      headers: { "User-Agent": "Zo-Cookbook/1.0" },
    });
    if (!response.ok) throw new Error(`Substack feed returned ${response.status}`);
    const xml = await response.text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 12).map((match) => {
      const item = match[1];
      return {
        title: getXmlTag(item, "title"),
        link: getXmlTag(item, "link"),
        pubDate: getXmlTag(item, "pubDate"),
        description: getXmlTag(item, "description"),
      };
    }).filter((post) => post.title && post.link);

    return c.json({ posts });
  } catch (error) {
    console.error("Blog feed failed", error);
    return c.json({ posts: [] }, 200);
  }
});

const mode: Mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

/**
 * Add any API routes here.
 */
app.get("/api/hello-zo", (c) => c.json({ msg: "Hello from Zo" }));

/**
 * Public submission endpoint.
 *
 * Visitors use /submit to send Jeff a recipe, automation, prompt, site,
 * or question. Each submission is appended to submissions/inbox.jsonl so
 * nothing is ever lost. If ZO_API_KEY is set, the endpoint also asks Zo
 * to email Jeff a copy.
 */
const SUBMISSIONS_PATH =
  "/home/workspace/Projects/zo-cookbook-app/submissions/inbox.jsonl";
const SUBMISSION_KINDS = new Set([
  "recipe",
  "site",
  "automation",
  "prompt",
  "question",
  "other",
]);
const submissionHits = new Map<string, { count: number; resetAt: number }>();
const SUBMISSION_WINDOW_MS = 10 * 60 * 1000;
const SUBMISSION_MAX_PER_WINDOW = 5;

function clientIp(c: { req: { header: (k: string) => string | undefined } }) {
  const fwd = c.req.header("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return c.req.header("x-real-ip") || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissionHits.get(ip);
  if (!entry || entry.resetAt < now) {
    submissionHits.set(ip, { count: 1, resetAt: now + SUBMISSION_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > SUBMISSION_MAX_PER_WINDOW) return true;
  return false;
}

function clamp(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function relayToZo(payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.ZO_API_KEY;
  if (!key) return { ok: false, error: "ZO_API_KEY not set" };
  const summary = [
    `Kind: ${payload.kind}`,
    `Title: ${payload.title}`,
    payload.link ? `Link: ${payload.link}` : null,
    payload.name ? `From: ${payload.name}` : null,
    payload.email ? `Reply to: ${payload.email}` : null,
    "",
    "Description:",
    String(payload.description ?? ""),
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = [
    "A visitor just submitted something to the Zo Cookbook public submission form.",
    "Send Jeff an email to jeffkazzee@gmail.com with the subject:",
    `"Cookbook submission: ${payload.kind} — ${payload.title}"`,
    "and the body below. Do not reply to me in chat, just send the email.",
    "",
    summary,
  ].join("\n");

  try {
    const res = await fetch("https://api.zo.computer/zo/ask", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ input: prompt }),
    });
    if (!res.ok) return { ok: false, error: `zo/ask ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

app.post("/api/submissions", async (c) => {
  const ip = clientIp(c);
  if (rateLimited(ip)) {
    return c.json({ error: "Too many submissions. Try again later." }, 429);
  }

  const raw = await c.req.text();
  if (raw.length > 20_000) {
    return c.json({ error: "Submission too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return c.json({ error: "Invalid JSON." }, 400);
  }

  // Honeypot — bots fill the hidden "website" field; humans never see it.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return c.json({ ok: true });
  }

  const kind = clamp(body.kind, 32).toLowerCase();
  const title = clamp(body.title, 200);
  const description = clamp(body.description, 8000);
  const link = clamp(body.link, 500);
  const name = clamp(body.name, 120);
  const email = clamp(body.email, 200);

  if (!SUBMISSION_KINDS.has(kind)) {
    return c.json({ error: "Pick a submission type." }, 400);
  }
  if (title.length < 2) {
    return c.json({ error: "Give it a title." }, 400);
  }
  if (description.length < 10) {
    return c.json({ error: "Tell Jeff a little more — at least a sentence." }, 400);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "That email doesn't look right." }, 400);
  }

  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: c.req.header("user-agent") || null,
    kind,
    title,
    description,
    link: link || null,
    name: name || null,
    email: email || null,
  };

  try {
    await mkdir("/home/workspace/Projects/zo-cookbook-app/submissions", { recursive: true });
    await appendFile(SUBMISSIONS_PATH, JSON.stringify(record) + "\n");
  } catch (err) {
    console.error("Failed to persist submission", err);
    return c.json({ error: "Server failed to save your submission. Try again later." }, 500);
  }

  const relay = await relayToZo(record);
  if (!relay.ok) {
    console.warn("Submission saved but email relay skipped:", relay.error);
  }

  return c.json({ ok: true, id: record.id, emailed: relay.ok });
});

if (mode === "production") {
  configureProduction(app);
} else {
  await configureDevelopment(app);
}

/**
 * Determine port based on mode. In production, use the published_port if available.
 * In development, always use the local_port.
 * Ports are managed by the system and injected via the PORT environment variable.
 */
const port = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : mode === "production"
    ? (config.publish?.published_port ?? config.local_port)
    : config.local_port;

export default { fetch: app.fetch, port, idleTimeout: 255 };

/**
 * Configure routing for production builds.
 *
 * - Streams prebuilt assets from `dist`.
 * - Static files from `public/` are copied to `dist/` by Vite and served at root paths.
 * - Falls back to `index.html` for any other GET so the SPA router can resolve the request.
 */
function configureProduction(app: Hono) {
  app.use("/assets/*", serveStatic({ root: "./dist" }));
  app.get("/favicon.ico", (c) => c.redirect("/favicon.svg", 302));
  app.use(async (c, next) => {
    if (c.req.method !== "GET") return next();

    const path = c.req.path;
    if (path.startsWith("/api/") || path.startsWith("/assets/")) return next();

    const file = Bun.file(`./dist${path}`);
    if (await file.exists()) {
      const stat = await file.stat();
      if (stat && !stat.isDirectory()) {
        return new Response(file);
      }
    }

    return serveStatic({ path: "./dist/index.html" })(c, next);
  });
}

/**
 * Configure routing for development builds.
 *
 * - Boots Vite in middleware mode for transforms.
 * - Static files from `public/` are served at root paths (matching Vite convention).
 * - Mirrors production routing semantics so SPA routes behave consistently.
 */
async function configureDevelopment(app: Hono): Promise<ViteDevServer> {
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });

  app.use("*", async (c, next) => {
    if (c.req.path.startsWith("/api/")) return next();
    if (c.req.path === "/favicon.ico") return c.redirect("/favicon.svg", 302);

    const url = c.req.path;
    try {
      if (url === "/" || url === "/index.html") {
        let template = await Bun.file("./index.html").text();
        template = await vite.transformIndexHtml(url, template);
        return c.html(template, {
          headers: { "Cache-Control": "no-store, must-revalidate" },
        });
      }

      const publicFile = Bun.file(`./public${url}`);
      if (await publicFile.exists()) {
        const stat = await publicFile.stat();
        if (stat && !stat.isDirectory()) {
          return new Response(publicFile, {
            headers: { "Cache-Control": "no-store, must-revalidate" },
          });
        }
      }

      const transformed = await transformViaVite(url, vite);
      if (transformed) return transformed;

      let template = await Bun.file("./index.html").text();
      template = await vite.transformIndexHtml("/", template);
      return c.html(template, {
        headers: { "Cache-Control": "no-store, must-revalidate" },
      });
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error(error);
      return c.text("Internal Server Error", 500);
    }
  });

  return vite;
}

async function transformViaVite(url: string, vite: ViteDevServer) {
  let result;
  try {
    result = await vite.transformRequest(url);
  } catch {
    result = null;
  }

  if (!result) return null;

  return new Response(result.code, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
