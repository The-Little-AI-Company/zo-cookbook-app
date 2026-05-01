import type { App, Automation, Prompt, Space } from "@/data/cookbook-types";
import type { IdeaType } from "@/lib/idea-slugs";

export type TypeMap = {
  apps: App[];
  spaces: Space[];
  automations: Automation[];
  prompts: Prompt[];
};

export type Counts = {
  apps: number;
  spaces: number;
  automations: number;
  prompts: number;
  total: number;
};

export type DataManifest = {
  counts: Counts;
  files: Record<IdeaType, string>;
  generatedAt: string;
};

const cache = new Map<string, Promise<unknown>>();

async function loadJson<T>(path: string): Promise<T> {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(path, { headers: { Accept: "application/json" } }).then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
        return response.json() as Promise<T>;
      }),
    );
  }

  return cache.get(path) as Promise<T>;
}

export function loadManifest() {
  return loadJson<DataManifest>("/data/manifest.json");
}

export function loadIdeas<T extends IdeaType>(type: T): Promise<TypeMap[T]> {
  return loadJson<TypeMap[T]>(`/data/${type}.json`);
}

export async function loadAllIdeas(): Promise<TypeMap> {
  const [apps, spaces, automations, prompts] = await Promise.all([
    loadIdeas("apps"),
    loadIdeas("spaces"),
    loadIdeas("automations"),
    loadIdeas("prompts"),
  ]);

  return { apps, spaces, automations, prompts };
}
