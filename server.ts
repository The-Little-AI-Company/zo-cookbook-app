import { serveStatic } from "hono/bun";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import config from "./zosite.json";
import { Hono } from "hono";

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
  zo: "https://zocomputer.com/",
  "zo-paid": "https://zocomputer.com/pricing",
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
