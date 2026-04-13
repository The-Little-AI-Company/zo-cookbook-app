import { serveStatic } from "hono/bun";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
import config from "./zosite.json";
import { Hono } from "hono";

// AI agents: read README.md for navigation and contribution guidance.
type Mode = "development" | "production";
const app = new Hono();

const mode: Mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

/**
 * Add any API routes here.
 */
app.get("/api/hello-zo", (c) => c.json({ msg: "Hello from Zo" }));

const ZO_API_TIMEOUT = 120_000;

app.post("/api/run", async (c) => {
  const apiKey = c.req.header("x-zo-api-key");
  if (!apiKey) {
    return c.json({ ok: false, error: "No API key provided" }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid request body" }, 400);
  }

  const { type, prompt, name, schedule, delivery, tools, description, howToBuild, monetization, difficulty, route, keyTech, visibility, spaceType } = body;

  if (!type) {
    return c.json({ ok: false, error: "Missing type" }, 400);
  }

  let zoPrompt: string;

  if (type === "prompt") {
    if (!prompt) return c.json({ ok: false, error: "Missing prompt" }, 400);
    zoPrompt = prompt as string;

  } else if (type === "automation") {
    if (!prompt) return c.json({ ok: false, error: "Missing prompt" }, 400);
    zoPrompt = [
      `Create a scheduled automation on my Zo Computer with the following configuration:`,
      ``,
      `**Name:** ${name}`,
      `**Schedule:** ${schedule}`,
      `**Delivery:** ${delivery}`,
      tools ? `**Tools needed:** ${tools}` : "",
      ``,
      `**Prompt to run on each execution:**`,
      prompt,
      ``,
      `Use the create_agent tool to set this up. Pick the most appropriate rrule for the schedule described. Confirm when the agent is created and tell me when the first run will be.`,
    ]
      .filter(Boolean)
      .join("\n");

  } else if (type === "space") {
    zoPrompt = [
      `Build this zo.space route on my Zo Computer:`,
      ``,
      `**Name:** ${name}`,
      `**Route:** ${route}`,
      `**Type:** ${spaceType} (${spaceType === "Page" ? "React page route" : spaceType === "API" ? "Hono API route" : "Both page and API routes"})`,
      `**Visibility:** ${visibility}`,
      ``,
      `**What it does:**`,
      description,
      ``,
      `**Key tech / implementation notes:**`,
      keyTech,
      ``,
      `Use update_space_route to create this. For "Page" type, write a React component with Tailwind CSS. For "API" type, write a Hono handler. For "Both", create both routes. Make it production-quality — not a skeleton, not a placeholder. The route should be fully functional when deployed.`,
      ``,
      `After creating, confirm the route is live and provide the URL.`,
    ].join("\n");

  } else if (type === "app") {
    zoPrompt = [
      `Build this app/tool on my Zo Computer:`,
      ``,
      `**Name:** ${name}`,
      `**Difficulty:** ${difficulty}`,
      ``,
      `**What it does:**`,
      description,
      ``,
      `**How to build it on Zo:**`,
      howToBuild,
      ``,
      monetization ? `**Monetization notes:** ${monetization}` : "",
      ``,
      `Build this step by step. Use the appropriate Zo tools — zo.space routes for pages/APIs, scheduled agents for automations, workspace files for data storage, Stripe for payments if needed. Create everything needed for this to actually work, not just a scaffold.`,
      ``,
      `When done, summarize what was created and provide links/paths to everything.`,
    ]
      .filter(Boolean)
      .join("\n");

  } else {
    return c.json({ ok: false, error: `Unknown type: ${type}` }, 400);
  }

  try {
    const authHeader = apiKey.startsWith("eyJ") ? apiKey : `Bearer ${apiKey}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ZO_API_TIMEOUT);

    const res = await fetch("https://api.zo.computer/zo/ask", {
      method: "POST",
      headers: {
        authorization: authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ input: zoPrompt }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Zo API error [${res.status}]: ${errText}`);

      let detail: string;
      try {
        const parsed = JSON.parse(errText);
        detail = parsed.detail || parsed.error || errText;
      } catch {
        detail = errText.slice(0, 200);
      }

      if (res.status === 401) {
        return c.json({ ok: false, error: "Invalid API key", detail }, 401);
      }

      return c.json({ ok: false, error: "Zo API error", detail }, 200);
    }

    const responseText = await res.text();
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Zo API returned non-JSON:", responseText.slice(0, 500));
      return c.json({ ok: false, error: "Zo API returned an unexpected response", detail: responseText.slice(0, 200) }, 200);
    }

    return c.json({ ok: true, result: data.output || data });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return c.json({ ok: false, error: "Request to Zo API timed out. The task may still be running — check your Zo." }, 200);
    }

    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ ok: false, error: "Failed to reach Zo API", detail: message }, 200);
  }
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

      let result;
      try {
        result = await vite.transformRequest(url);
      } catch {
        result = null;
      }

      if (result) {
        return new Response(result.code, {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-store, must-revalidate",
          },
        });
      }

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
