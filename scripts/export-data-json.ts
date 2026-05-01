import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { apps, automations, prompts, spaces } from "../src/data/cookbook-data";

const outDir = join(import.meta.dir, "..", "public", "data");

await mkdir(outDir, { recursive: true });

const datasets = {
  apps,
  spaces,
  automations,
  prompts,
};

for (const [name, items] of Object.entries(datasets)) {
  await Bun.write(join(outDir, `${name}.json`), `${JSON.stringify(items, null, 2)}\n`);
}

await Bun.write(
  join(outDir, "manifest.json"),
  `${JSON.stringify(
    {
      counts: {
        apps: apps.length,
        spaces: spaces.length,
        automations: automations.length,
        prompts: prompts.length,
        total: apps.length + spaces.length + automations.length + prompts.length,
      },
      files: {
        apps: "/data/apps.json",
        spaces: "/data/spaces.json",
        automations: "/data/automations.json",
        prompts: "/data/prompts.json",
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  )}\n`,
);

console.log(`Exported ${apps.length + spaces.length + automations.length + prompts.length} recipes to ${outDir}`);
