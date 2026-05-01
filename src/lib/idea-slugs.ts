import type { App, Automation, Prompt, Space } from "@/data/cookbook-types";

export type IdeaType = "apps" | "spaces" | "automations" | "prompts";
export type IdeaItem = App | Space | Automation | Prompt;

const suffixByType: Record<IdeaType, string> = {
  apps: "app",
  spaces: "space",
  automations: "automation",
  prompts: "prompt",
};

function baseSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[`'"“”‘’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function isIdeaType(type: string | undefined): type is IdeaType {
  return type === "apps" || type === "spaces" || type === "automations" || type === "prompts";
}

export function getIdeaSlug(type: IdeaType, item: IdeaItem) {
  return `${baseSlug("name" in item ? item.name : "idea")}-${item.id}-${suffixByType[type]}`;
}

export function getIdeaPath(type: IdeaType, item: IdeaItem) {
  return `/ideas/${type}/${getIdeaSlug(type, item)}`;
}
