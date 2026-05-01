import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

type ImportedAppIdea = {
  id: number;
  name: string;
  category: string;
  description: string;
  howToBuild: string;
  monetization: string;
  difficulty: string;
  source: string;
};

const contentDir = join(import.meta.dir, "..", "content");
const outDir = join(import.meta.dir, "..", "src", "data", "generated");
const outFile = join(outDir, "app-ideas.generated.json");
const allowedDifficulties = new Set(["Beginner", "Intermediate", "Advanced"]);

function extractField(block: string, label: string) {
  const labels = ["Category", "What it does", "How to build it on Zo", "Monetization", "Difficulty"];
  const others = labels.filter((item) => item !== label).map((item) => `\\*\\*${item}:\\*\\*`).join("|");
  const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n(?:${others})|\\n### |$)`, "m");
  const match = block.match(pattern);
  return match?.[1]?.trim().replace(/\n+/g, " ") ?? "";
}

function parseBatch(markdown: string, source: string): Omit<ImportedAppIdea, "id">[] {
  const sections = markdown.split(/\n(?=###\s+\d+\.\s+)/g).filter((section) => section.startsWith("### "));

  return sections.map((section) => {
    const title = section.match(/^###\s+\d+\.\s+(.+)$/m)?.[1]?.trim();
    if (!title) throw new Error(`${source}: idea is missing numbered heading`);

    const idea = {
      name: title,
      category: extractField(section, "Category"),
      description: extractField(section, "What it does"),
      howToBuild: extractField(section, "How to build it on Zo"),
      monetization: extractField(section, "Monetization"),
      difficulty: extractField(section, "Difficulty"),
      source,
    };

    for (const [key, value] of Object.entries(idea)) {
      if (!value) throw new Error(`${source}: ${title} is missing ${key}`);
    }

    if (!allowedDifficulties.has(idea.difficulty)) {
      throw new Error(`${source}: ${title} has unsupported difficulty: ${idea.difficulty}`);
    }

    return idea;
  });
}

const files = (await readdir(contentDir))
  .filter((file) => file.endsWith(".md") && file.includes("ideas-batch"))
  .sort();

const imported = [] as ImportedAppIdea[];
const seenNames = new Map<string, string>();

for (const file of files) {
  const markdown = await Bun.file(join(contentDir, file)).text();
  for (const idea of parseBatch(markdown, file)) {
    const key = idea.name.toLowerCase();
    const previous = seenNames.get(key);
    if (previous) throw new Error(`Duplicate idea name: ${idea.name} in ${file} and ${previous}`);
    seenNames.set(key, file);
    imported.push({ ...idea, id: 10000 + imported.length + 1 });
  }
}

await mkdir(outDir, { recursive: true });
await Bun.write(outFile, `${JSON.stringify(imported, null, 2)}\n`);

console.log(`Imported ${imported.length} app ideas from ${files.length} markdown batch file(s).`);
console.log(outFile);
