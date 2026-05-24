import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import type { App, Space, Automation, Prompt } from "@/data/cookbook-types";
import { loadIdeas, loadManifest, type Counts } from "@/lib/data-loader";
import { RecipeActions } from "@/components/recipe-actions";
import { NewBadge } from "@/components/new-badge";
import { getIdeaPath } from "@/lib/idea-slugs";
import { isNew } from "@/lib/is-new";

// ─── Types ────────────────────────────────────────────
type Tab = "apps" | "spaces" | "automations" | "prompts";
type AnyItem = App | Space | Automation | Prompt;
type View = "categories" | "items" | "discover";

// ─── Category normalization ───────────────────────────
// Raw categories are messy — normalize into clean groups
const categoryMap: Record<string, string> = {
  // Apps
  "Personal tools": "Personal Tools",
  "Commerce": "Commerce",
  "Creative tools": "Creative Tools",
  "Civic/public interest": "Civic & Public Interest",
  "Weird/experimental": "Weird & Experimental",
  "Weird/experimental / design": "Weird & Experimental",
  "Data/research tools": "Data & Research",
  "Content/media": "Content & Media",
  "Local/community tools": "Local & Community",
  "Health/wellness": "Health & Wellness",
  "Health & Wellness": "Health & Wellness",
  "Micro-SaaS": "Micro-SaaS",
  "Developer tools": "Developer Tools",
  "Developer tools / creator tools": "Developer Tools",
  "Developer tools / professional": "Developer Tools",
  "Developer tools / design": "Developer Tools",
  "Developer tools / weird": "Developer Tools",
  "Hobby/passion tools (tabletop gaming)": "Hobby & Passion",
  "Hobby/passion tools (fishing)": "Hobby & Passion",
  "Hobby/passion tools (gardening)": "Hobby & Passion",
  "Hobby/passion tools (birdwatching)": "Hobby & Passion",
  "Hobby/passion tools (cooking)": "Hobby & Passion",
  "Hobby/passion tools (baking)": "Hobby & Passion",
  "Hobby/passion tools (hiking/mountain biking)": "Hobby & Passion",
  "Hobby/passion tools (collectors/thrifters)": "Hobby & Passion",
  "Hobby/passion tools (gardening) / civic": "Hobby & Passion",
  "Niche professional tools (homeowners/property managers)": "Niche Professional",
  "Niche professional tools (therapists)": "Niche Professional",
  "Niche professional tools (resellers/flippers)": "Niche Professional",
  "Niche professional tools (freelancers)": "Niche Professional",
  "Niche professional tools (mechanics)": "Niche Professional",
  "Niche professional tools (nonprofits/artists)": "Niche Professional",
  "Niche professional tools (real estate agents)": "Niche Professional",
  "Niche professional tools (teachers)": "Niche Professional",
  "Niche professional tools (musicians)": "Niche Professional",
  "Niche professional tools (rural residents)": "Niche Professional",
  // Automations
  "Revenue generation": "Revenue & Commerce",
  "Content creation pipelines": "Content Pipelines",
  "Financial/business tracking": "Finance & Business",
  "Health/wellness reminders and logs": "Health & Wellness",
  "Self-improving systems": "Self-Improving Systems",
  "Integration workflows": "Integrations",
  "Research and learning": "Research & Learning",
  "Home/life management": "Home & Life",
  "Professional development": "Career & Professional",
  "Creative/writing": "Creative & Writing",
  "Personal CRM and relationship management": "Relationships & CRM",
  "Data collection and analysis": "Data & Research",
  "Morning/daily routines": "Daily Routines",
  "Email/inbox management": "Email & Communication",
  "Community/civic engagement": "Civic & Community",
  "Social media monitoring and posting": "Social Media",
  "Emergency/safety systems": "Home & Life",
  "Competitive intelligence and market monitoring": "Data & Research",
  "Generative/creative art and media pipelines": "Creative & Writing",
  // Prompts — the big mess
  "Meta/system": "Meta & System",
  "Meta / Zo-specific": "Meta & System",
  "Code & technical": "Code & Technical",
  "Code & Technical": "Code & Technical",
  "Code & Technical / Work": "Code & Technical",
  "Business & strategy": "Business & Strategy",
  "Business analysis": "Business & Strategy",
  "Business / Communication": "Business & Strategy",
  "Business / Side income": "Business & Strategy",
  "Business / Strategy": "Business & Strategy",
  "Home & life admin": "Home & Life",
  "Life / Logistics": "Home & Life",
  "Life / Cooking": "Home & Life",
  "Site/space building": "Building & Projects",
  "Building / Side projects": "Building & Projects",
  "Social media & marketing": "Marketing & Social",
  "Marketing / Content": "Marketing & Social",
  "Career / Marketing": "Marketing & Social",
  "Outreach": "Marketing & Social",
  "Writing & content": "Writing & Content",
  "Content curation": "Writing & Content",
  "Personal productivity": "Productivity",
  "Productivity": "Productivity",
  "Productivity / Mindset": "Productivity",
  "Mindset": "Productivity",
  "Design & visual": "Design & Visual",
  "File & data management": "Data & Files",
  "Data & datasets": "Data & Files",
  "Finance & money": "Finance & Money",
  "Finance": "Finance & Money",
  "Finance / Life admin": "Finance & Money",
  "Career & professional": "Career & Professional",
  "Career / Business": "Career & Professional",
  "Career / Communication": "Career & Professional",
  "Career": "Career & Professional",
  "Freelancing / Business": "Career & Professional",
  "Freelancing": "Career & Professional",
  "Research & analysis": "Research & Analysis",
  "Health & wellness": "Health & Wellness",
  "Habit building": "Health & Wellness",
  "Learning & skill-building": "Learning",
  "Learning": "Learning",
  "Creative projects": "Creative Projects",
  "Integration-specific": "Integrations",
  "Automation setup": "Automation Setup",
  "Email & communication": "Communication",
  "Communication / Work": "Communication",
  "Communication": "Communication",
  "Communication / Relationships": "Communication",
  "Decision-making": "Productivity",
  "Personal reflection": "Productivity",
  "Debugging / Emotional regulation": "Health & Wellness",
  "Relationships / Personal": "Communication",
  "Strategy / Blind spots": "Business & Strategy",
  "Open source maintenance": "Open Source",
  "System reliability": "System Reliability",
  "Pet care": "Pet Care",
  "Industry watch": "Industry Watch",
  "Cookbook helpers": "Cookbook Helpers",
};

function normalizeCategory(raw: string): string {
  return categoryMap[raw] || raw;
}

function getItemCategory(item: AnyItem): string {
  if ("category" in item && item.category) return normalizeCategory(item.category);
  if ("type" in item && typeof (item as Space).type === "string") return (item as Space).type;
  return "Other";
}

// ─── Category metadata (colors, icons per group) ─────
const groupMeta: Record<string, { icon: string; color: string }> = {
  "Personal Tools": { icon: "◈", color: "var(--red)" },
  "Commerce": { icon: "◆", color: "var(--yellow)" },
  "Creative Tools": { icon: "✦", color: "var(--teal)" },
  "Creative Projects": { icon: "✦", color: "var(--teal)" },
  "Civic & Public Interest": { icon: "⬡", color: "var(--blue)" },
  "Weird & Experimental": { icon: "◎", color: "#c084fc" },
  "Data & Research": { icon: "▤", color: "var(--blue)" },
  "Content & Media": { icon: "▣", color: "var(--yellow)" },
  "Local & Community": { icon: "⌂", color: "var(--teal)" },
  "Health & Wellness": { icon: "✚", color: "#34d399" },
  "Micro-SaaS": { icon: "◆", color: "var(--red)" },
  "Developer Tools": { icon: "⌘", color: "var(--teal)" },
  "Hobby & Passion": { icon: "♦", color: "var(--yellow)" },
  "Niche Professional": { icon: "◫", color: "var(--blue)" },
  "Revenue & Commerce": { icon: "◆", color: "var(--yellow)" },
  "Content Pipelines": { icon: "▣", color: "var(--yellow)" },
  "Finance & Business": { icon: "▤", color: "var(--blue)" },
  "Self-Improving Systems": { icon: "◎", color: "#c084fc" },
  "Integrations": { icon: "⌘", color: "var(--teal)" },
  "Research & Learning": { icon: "▤", color: "var(--blue)" },
  "Home & Life": { icon: "⌂", color: "var(--teal)" },
  "Career & Professional": { icon: "◫", color: "var(--blue)" },
  "Creative & Writing": { icon: "✦", color: "var(--teal)" },
  "Relationships & CRM": { icon: "◈", color: "var(--red)" },
  "Daily Routines": { icon: "◈", color: "var(--yellow)" },
  "Email & Communication": { icon: "▣", color: "var(--blue)" },
  "Civic & Community": { icon: "⬡", color: "var(--blue)" },
  "Social Media": { icon: "◎", color: "#c084fc" },
  "Meta & System": { icon: "⌘", color: "var(--teal)" },
  "Code & Technical": { icon: "⌘", color: "var(--teal)" },
  "Business & Strategy": { icon: "◆", color: "var(--yellow)" },
  "Building & Projects": { icon: "▤", color: "var(--red)" },
  "Marketing & Social": { icon: "◎", color: "#c084fc" },
  "Writing & Content": { icon: "✦", color: "var(--teal)" },
  "Productivity": { icon: "◈", color: "var(--yellow)" },
  "Design & Visual": { icon: "✦", color: "var(--red)" },
  "Data & Files": { icon: "▤", color: "var(--blue)" },
  "Finance & Money": { icon: "◆", color: "var(--yellow)" },
  "Research & Analysis": { icon: "▤", color: "var(--blue)" },
  "Learning": { icon: "▤", color: "var(--teal)" },
  "Automation Setup": { icon: "⌘", color: "var(--yellow)" },
  "Communication": { icon: "▣", color: "var(--blue)" },
  "Open Source": { icon: "⌥", color: "var(--teal)" },
  "System Reliability": { icon: "◐", color: "var(--blue)" },
  "Pet Care": { icon: "❉", color: "#34d399" },
  "Industry Watch": { icon: "◬", color: "#c084fc" },
  "Cookbook Helpers": { icon: "✺", color: "var(--yellow)" },
  "Page": { icon: "▣", color: "var(--blue)" },
  "API": { icon: "⌘", color: "var(--teal)" },
  "Both": { icon: "◈", color: "var(--yellow)" },
  "Page + API": { icon: "◈", color: "var(--yellow)" },
};

function getGroupMeta(name: string) {
  return groupMeta[name] || { icon: "●", color: "var(--muted-foreground)" };
}

// ─── Helpers ──────────────────────────────────────────
function matchesSearch(item: AnyItem, query: string): boolean {
  const q = query.toLowerCase();
  const searchable = [
    "name" in item ? item.name : "",
    "category" in item ? item.category : "",
    "description" in item ? item.description : "",
    "prompt" in item ? item.prompt : "",
    "howToBuild" in item ? item.howToBuild : "",
    "whenToUse" in item ? item.whenToUse : "",
    "whatYouGet" in item ? item.whatYouGet : "",
    "route" in item ? item.route : "",
    "keyTech" in item ? item.keyTech : "",
  ].join(" ").toLowerCase();
  return searchable.includes(q);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Tab config ───────────────────────────────────────
const tabConfigBase: Record<Tab, { label: string; color: string; icon: string }> = {
  apps: { label: "Apps & Sites", color: "var(--red)", icon: "◆" },
  spaces: { label: "Spaces", color: "var(--blue)", icon: "●" },
  automations: { label: "Automations", color: "var(--yellow)", icon: "▲" },
  prompts: { label: "Prompts", color: "var(--teal)", icon: "■" },
};

// ─── Copy button ──────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
        copied
          ? "bg-green-600/20 text-green-400 animate-copied"
          : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
      }`}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

// ─── Card Components ──────────────────────────────────
function AppCard({ item, expanded, onToggle }: { item: App; expanded: boolean; onToggle: () => void }) {
  const group = normalizeCategory(item.category);
  const meta = getGroupMeta(group);
  return (
    <div className="group border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--red)]/30 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4 cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-[var(--foreground)] text-base leading-tight">
              {item.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{item.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}>
              {group}
            </span>
            {item.difficulty && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--secondary)] text-[var(--muted-foreground)]">
                {item.difficulty}
              </span>
            )}
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)] pt-3 space-y-3 animate-fade-in">
          <div>
            <h4 className="text-xs font-mono text-[var(--red)] mb-1">How to build on Zo</h4>
            <p className="text-sm text-[var(--muted-foreground)]">{item.howToBuild}</p>
          </div>
          {item.monetization && (
            <div>
              <h4 className="text-xs font-mono text-[var(--yellow)] mb-1">Monetization</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{item.monetization}</p>
            </div>
          )}
          <RecipeActions type="app" item={item} accentColor="var(--red)" />
          <Link to={getIdeaPath("apps", item)} className="inline-flex text-xs font-mono text-[var(--red)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
    </div>
  );
}

function SpaceCard({ item, expanded, onToggle }: { item: Space; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="group border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--blue)]/30 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4 cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-[var(--foreground)] text-base leading-tight">
              {item.name}
            </h3>
            <code className="text-xs font-mono text-[var(--blue)] mt-0.5 block">{item.route}</code>
            <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{item.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--blue)]/10 text-[var(--blue)]">
              {item.type}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
              item.visibility === "public" ? "bg-green-600/10 text-green-400" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
            }`}>
              {item.visibility}
            </span>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)] pt-3 space-y-3 animate-fade-in">
          <div>
            <h4 className="text-xs font-mono text-[var(--blue)] mb-1">Key Tech</h4>
            <p className="text-sm text-[var(--muted-foreground)]">{item.keyTech}</p>
          </div>
          <RecipeActions type="space" item={item} accentColor="var(--blue)" />
          <Link to={getIdeaPath("spaces", item)} className="inline-flex text-xs font-mono text-[var(--blue)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
    </div>
  );
}

function AutomationCard({ item, expanded, onToggle }: { item: Automation; expanded: boolean; onToggle: () => void }) {
  const group = normalizeCategory(item.category);
  const meta = getGroupMeta(group);
  const fresh = isNew(item.addedDate);
  return (
    <div className="group border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--yellow)]/30 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4 cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-[var(--foreground)] text-base leading-tight">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono text-[var(--muted-foreground)]">{item.schedule}</span>
              <span className="text-[var(--border)]">·</span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">{item.delivery}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {fresh && <NewBadge />}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}>
              {group}
            </span>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)] pt-3 space-y-3 animate-fade-in">
          <div>
            <h4 className="text-xs font-mono text-[var(--muted-foreground)] mb-1">Tools</h4>
            <p className="text-sm text-[var(--muted-foreground)]">{item.tools}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-mono text-[var(--yellow)]">Prompt</h4>
              <CopyButton text={item.prompt} />
            </div>
            <pre className="text-xs font-mono bg-[var(--background)] border border-[var(--border)] rounded-md p-3 overflow-x-auto whitespace-pre-wrap text-[var(--muted-foreground)] max-h-64 overflow-y-auto">
              {item.prompt}
            </pre>
          </div>
          {item.expectedOutput && (
            <div>
              <h4 className="text-xs font-mono text-[var(--muted-foreground)] mb-1">Expected Output</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{item.expectedOutput}</p>
            </div>
          )}
          {item.customization && (
            <div>
              <h4 className="text-xs font-mono text-[var(--muted-foreground)] mb-1">Customization</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{item.customization}</p>
            </div>
          )}
          <RecipeActions type="automation" item={item} accentColor="var(--yellow)" />
          <Link to={getIdeaPath("automations", item)} className="inline-flex text-xs font-mono text-[var(--yellow)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
    </div>
  );
}

function PromptCard({ item, expanded, onToggle }: { item: Prompt; expanded: boolean; onToggle: () => void }) {
  const group = normalizeCategory(item.category);
  const meta = getGroupMeta(group);
  const fresh = isNew(item.addedDate);
  return (
    <div className="group border border-[var(--border)] rounded-lg bg-[var(--card)] hover:border-[var(--teal)]/30 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4 cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-[var(--foreground)] text-base leading-tight">
              {item.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{item.whenToUse}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {fresh && <NewBadge />}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}>
              {group}
            </span>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border)] pt-3 space-y-3 animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-mono text-[var(--teal)]">Prompt</h4>
              <CopyButton text={item.prompt} />
            </div>
            <pre className="text-xs font-mono bg-[var(--background)] border border-[var(--border)] rounded-md p-3 whitespace-pre-wrap text-[var(--muted-foreground)] max-h-80 overflow-y-auto">
              {item.prompt}
            </pre>
          </div>
          {item.whatYouGet && (
            <div>
              <h4 className="text-xs font-mono text-[var(--muted-foreground)] mb-1">What you get</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{item.whatYouGet}</p>
            </div>
          )}
          <RecipeActions type="prompt" item={item} accentColor="var(--teal)" />
          <Link to={getIdeaPath("prompts", item)} className="inline-flex text-xs font-mono text-[var(--teal)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Spotlight Card (for discover mode) ───────────────
function SpotlightCard({ item, tab }: { item: AnyItem; tab: Tab }) {
  const group = getItemCategory(item);
  const meta = getGroupMeta(group);

  return (
    <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg" style={{ color: meta.color }}>{meta.icon}</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}>
          {group}
        </span>
        {"difficulty" in item && item.difficulty && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--secondary)] text-[var(--muted-foreground)]">
            {(item as App).difficulty}
          </span>
        )}
      </div>
      <h2 className="font-display font-bold text-2xl text-[var(--foreground)] mb-2">
        {"name" in item ? item.name : ""}
      </h2>
      {"route" in item && (
        <code className="text-sm font-mono text-[var(--blue)] block mb-2">{(item as Space).route}</code>
      )}
      <p className="text-[var(--muted-foreground)] font-body leading-relaxed mb-4">
        {"description" in item ? item.description : "whenToUse" in item ? (item as Prompt).whenToUse : ""}
      </p>

      {tab === "apps" && (
        <div className="space-y-3 border-t border-[var(--border)] pt-4">
          <div>
            <h4 className="text-xs font-mono text-[var(--red)] mb-1">How to build on Zo</h4>
            <p className="text-sm text-[var(--muted-foreground)]">{(item as App).howToBuild}</p>
          </div>
          {(item as App).monetization && (
            <div>
              <h4 className="text-xs font-mono text-[var(--yellow)] mb-1">Monetization</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{(item as App).monetization}</p>
            </div>
          )}
          <RecipeActions type="app" item={item as App} accentColor="var(--red)" />
          <Link to={getIdeaPath("apps", item as App)} className="inline-flex text-xs font-mono text-[var(--red)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
      {tab === "spaces" && (
        <div className="space-y-3 border-t border-[var(--border)] pt-4">
          <div>
            <h4 className="text-xs font-mono text-[var(--blue)] mb-1">Key Tech</h4>
            <p className="text-sm text-[var(--muted-foreground)]">{(item as Space).keyTech}</p>
          </div>
          <RecipeActions type="space" item={item as Space} accentColor="var(--blue)" />
          <Link to={getIdeaPath("spaces", item as Space)} className="inline-flex text-xs font-mono text-[var(--blue)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
      {tab === "automations" && (
        <div className="space-y-3 border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted-foreground)]">
            <span>{(item as Automation).schedule}</span>
            <span className="text-[var(--border)]">·</span>
            <span>{(item as Automation).delivery}</span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-mono text-[var(--yellow)]">Prompt</h4>
              <CopyButton text={(item as Automation).prompt} />
            </div>
            <pre className="text-xs font-mono bg-[var(--background)] border border-[var(--border)] rounded-md p-3 whitespace-pre-wrap text-[var(--muted-foreground)] max-h-64 overflow-y-auto">
              {(item as Automation).prompt}
            </pre>
          </div>
          <RecipeActions type="automation" item={item as Automation} accentColor="var(--yellow)" />
          <Link to={getIdeaPath("automations", item as Automation)} className="inline-flex text-xs font-mono text-[var(--yellow)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
      {tab === "prompts" && (
        <div className="space-y-3 border-t border-[var(--border)] pt-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-mono text-[var(--teal)]">Prompt</h4>
              <CopyButton text={(item as Prompt).prompt} />
            </div>
            <pre className="text-xs font-mono bg-[var(--background)] border border-[var(--border)] rounded-md p-3 whitespace-pre-wrap text-[var(--muted-foreground)] max-h-80 overflow-y-auto">
              {(item as Prompt).prompt}
            </pre>
          </div>
          {(item as Prompt).whatYouGet && (
            <div>
              <h4 className="text-xs font-mono text-[var(--muted-foreground)] mb-1">What you get</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{(item as Prompt).whatYouGet}</p>
            </div>
          )}
          <RecipeActions type="prompt" item={item as Prompt} accentColor="var(--teal)" />
          <Link to={getIdeaPath("prompts", item as Prompt)} className="inline-flex text-xs font-mono text-[var(--teal)] hover:underline">
            View full recipe →
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Category Tile ────────────────────────────────────
function CategoryTile({ name, count, tabColor, onClick }: { name: string; count: number; tabColor: string; onClick: () => void }) {
  const meta = getGroupMeta(name);
  return (
    <button
      onClick={onClick}
      className="text-left border border-[var(--border)] rounded-lg bg-[var(--card)] p-4 hover:border-current transition-colors cursor-pointer group"
      style={{ "--tw-border-opacity": "0.3", borderColor: undefined } as React.CSSProperties}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `color-mix(in srgb, ${meta.color} 40%, transparent)`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl" style={{ color: meta.color }}>{meta.icon}</span>
        <span className="font-mono text-xs text-[var(--muted-foreground)] bg-[var(--secondary)] px-2 py-0.5 rounded">
          {count}
        </span>
      </div>
      <h3 className="font-display font-semibold text-[var(--foreground)] text-sm leading-tight">
        {name}
      </h3>
    </button>
  );
}

// ─── Main App ─────────────────────────────────────────
export default function CookbookApp() {
  const [activeTab, setActiveTab] = useState<Tab>("apps");
  const [counts, setCounts] = useState<Counts>({ apps: 0, spaces: 0, automations: 0, prompts: 0, total: 0 });
  const [itemsByTab, setItemsByTab] = useState<Record<Tab, AnyItem[]>>({ apps: [], spaces: [], automations: [], prompts: [] });
  const [loadingTabs, setLoadingTabs] = useState<Record<Tab, boolean>>({ apps: true, spaces: false, automations: false, prompts: false });
  const [view, setView] = useState<View>("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [discoverIndex, setDiscoverIndex] = useState(0);
  const [discoverItems, setDiscoverItems] = useState<AnyItem[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const tabConfig = useMemo(() => ({
    apps: { ...tabConfigBase.apps, count: counts.apps },
    spaces: { ...tabConfigBase.spaces, count: counts.spaces },
    automations: { ...tabConfigBase.automations, count: counts.automations },
    prompts: { ...tabConfigBase.prompts, count: counts.prompts },
  }), [counts]);

  const allItemsForTab = itemsByTab[activeTab];

  const ensureTabLoaded = useCallback((tab: Tab) => {
    if (itemsByTab[tab].length || loadingTabs[tab]) return;
    setLoadingTabs((current) => ({ ...current, [tab]: true }));
    loadIdeas(tab)
      .then((items) => {
        setItemsByTab((current) => ({ ...current, [tab]: items as AnyItem[] }));
      })
      .finally(() => {
        setLoadingTabs((current) => ({ ...current, [tab]: false }));
      });
  }, [itemsByTab, loadingTabs]);

  useEffect(() => {
    loadManifest().then((manifest) => setCounts(manifest.counts));
    loadIdeas("apps").then((items) => {
      setItemsByTab((current) => ({ ...current, apps: items as AnyItem[] }));
      setLoadingTabs((current) => ({ ...current, apps: false }));
    });
  }, []);

  useEffect(() => {
    ensureTabLoaded(activeTab);
  }, [activeTab, ensureTabLoaded]);

  // Reset on tab change
  useEffect(() => {
    setView("categories");
    setSelectedCategory(null);
    setSearch("");
    setExpandedId(null);
    setVisibleCount(24);
  }, [activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        if (view === "discover") {
          setView("categories");
        } else if (view === "items" && !search) {
          setView("categories");
          setSelectedCategory(null);
        }
        setExpandedId(null);
        searchRef.current?.blur();
      }
      if (view === "discover") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          setDiscoverIndex((i) => Math.min(i + 1, discoverItems.length - 1));
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          setDiscoverIndex((i) => Math.max(i - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, search, discoverItems.length]);

  // Build categories with counts
  const categoryGroups = useMemo(() => {
    const groups: Record<string, number> = {};
    allItemsForTab.forEach((item) => {
      const cat = getItemCategory(item);
      groups[cat] = (groups[cat] || 0) + 1;
    });
    return Object.entries(groups)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [allItemsForTab]);

  // Items for the current view
  const currentItems = useMemo(() => {
    let items = allItemsForTab;
    if (selectedCategory) {
      items = items.filter((item) => getItemCategory(item) === selectedCategory);
    }
    if (search.trim()) {
      items = items.filter((item) => matchesSearch(item, search.trim()));
    }
    return items;
  }, [allItemsForTab, selectedCategory, search]);

  // 3 random featured items for the category view
  const featured = useMemo(() => {
    return shuffle(allItemsForTab).slice(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const displayedItems = currentItems.slice(0, visibleCount);
  const hasMore = currentItems.length > visibleCount;

  const toggleExpand = useCallback(
    (id: number) => setExpandedId((prev) => (prev === id ? null : id)),
    []
  );

  const enterCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setView("items");
    setExpandedId(null);
    setVisibleCount(24);
  }, []);

  const enterDiscover = useCallback(() => {
    const shuffled = shuffle(allItemsForTab);
    setDiscoverItems(shuffled);
    setDiscoverIndex(0);
    setView("discover");
  }, [allItemsForTab]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    if (value.trim()) {
      setView("items");
      setSelectedCategory(null);
    }
  }, []);

  const totalItems = counts.total;

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="geo-circle" style={{ width: 400, height: 400, top: -120, right: -80, background: "var(--red)" }} />
      <div className="geo-circle" style={{ width: 250, height: 250, bottom: 100, left: -60, background: "var(--blue)" }} />
      <div className="geo-square" style={{ width: 180, height: 180, top: 300, right: 60, background: "var(--yellow)" }} />

      {/* Compact Header */}
      <header className="relative z-10 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--foreground)]">
                Zo Cookbook
              </h1>
              <p className="text-[var(--muted-foreground)] text-sm font-body mt-0.5">
                {totalItems} recipes for building with your Zo Computer
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block max-w-xs text-right">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  Public cookbook, private execution
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Pick a recipe and hand it off.
                </p>
              </div>
              <button
                onClick={enterDiscover}
                className="px-4 py-2 text-sm font-mono rounded-md border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
              >
                ✦ Discover
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 border-b border-[var(--border)] bg-[var(--card)]/65">
        <div className="max-w-5xl mx-auto px-4 py-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--red)]">1 — Pick a recipe</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">Browse by tab, category, search, or discover mode.</p>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--yellow)]">2 — Copy the brief</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">Each action turns the recipe into something Zo can actually act on.</p>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--blue)]">3 — Run it in Zo</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">The cookbook is public. The work happens inside your own Zo.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 py-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
          <span className="mr-1 uppercase tracking-[0.16em] text-[10px]">More Zo</span>
          <a href="/go/zo" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Get Zo</a>
          <Link to="/faq" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">FAQ</Link>
          <Link to="/changelog" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Changelog</Link>
          <Link to="/blog" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Blog</Link>
          <a href="/go/substack" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Substack</a>
          <a href="/go/reddit" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Reddit</a>
          <a href="/go/facebook" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Facebook</a>
          <a href="/go/discord" className="rounded border border-[var(--border)] px-2 py-1 hover:text-[var(--foreground)] hover:border-[var(--foreground)]">Discord</a>
        </div>
      </section>

      {/* Tabs + Search bar */}
      <div className="relative z-10 sticky top-0 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-0 overflow-x-auto -mb-px">
              {(["apps", "spaces", "automations", "prompts"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-body font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? "border-current text-[var(--foreground)]"
                      : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                  style={activeTab === tab ? { color: tabConfig[tab].color, borderColor: tabConfig[tab].color } : {}}
                >
                  <span className="text-xs">{tabConfig[tab].icon}</span>
                  <span className="hidden sm:inline">{tabConfig[tab].label}</span>
                  <span className="sm:hidden">{tabConfig[tab].label.split(" ")[0]}</span>
                  <span className="text-[10px] font-mono opacity-50">{tabConfig[tab].count}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-48 sm:w-64 shrink-0">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-md px-3 py-1.5 text-sm font-body text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--ring)] transition-colors"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--muted-foreground)] bg-[var(--background)] border border-[var(--border)] rounded px-1 py-0.5 hidden sm:inline">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb when drilled in */}
      {(view === "items" || view === "discover") && (
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
            <button
              onClick={() => { setView("categories"); setSelectedCategory(null); setSearch(""); }}
              className="hover:text-[var(--foreground)] cursor-pointer transition-colors"
            >
              {tabConfig[activeTab].label}
            </button>
            {selectedCategory && (
              <>
                <span className="text-[var(--border)]">/</span>
                <span className="text-[var(--foreground)]">{selectedCategory}</span>
              </>
            )}
            {search && (
              <>
                <span className="text-[var(--border)]">/</span>
                <span className="text-[var(--foreground)]">"{search}"</span>
              </>
            )}
            {view === "discover" && (
              <>
                <span className="text-[var(--border)]">/</span>
                <span className="text-[var(--foreground)]">Discover</span>
              </>
            )}
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-5">
        {loadingTabs[activeTab] && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 text-sm text-[var(--muted-foreground)]">
            Loading {tabConfig[activeTab].label.toLowerCase()}…
          </div>
        )}

        {!loadingTabs[activeTab] && (
        <>
        {/* ─── CATEGORY VIEW ─── */}
        {view === "categories" && (
          <>
            {/* Featured picks */}
            <div className="mb-6">
              <h2 className="text-xs font-mono text-[var(--muted-foreground)] mb-3 uppercase tracking-wider">
                Random picks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {featured.map((item) => {
                  const group = getItemCategory(item);
                  const meta = getGroupMeta(group);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        enterCategory(group);
                        setTimeout(() => setExpandedId(item.id), 50);
                      }}
                      className="text-left border border-[var(--border)] rounded-lg bg-[var(--card)] p-3.5 hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded mb-2 inline-block" style={{ background: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}>
                        {group}
                      </span>
                      <h3 className="font-display font-semibold text-sm text-[var(--foreground)] leading-tight">
                        {"name" in item ? item.name : ""}
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">
                        {"description" in item ? item.description : "whenToUse" in item ? (item as Prompt).whenToUse : ""}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category tiles */}
            <h2 className="text-xs font-mono text-[var(--muted-foreground)] mb-3 uppercase tracking-wider">
              Browse by category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categoryGroups.map(({ name, count }) => (
                <CategoryTile
                  key={name}
                  name={name}
                  count={count}
                  tabColor={tabConfig[activeTab].color}
                  onClick={() => enterCategory(name)}
                />
              ))}
            </div>

            {/* "View All" shortcut */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => { setView("items"); setSelectedCategory(null); }}
                className="px-4 py-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                View all {tabConfig[activeTab].count} {tabConfig[activeTab].label.toLowerCase()} →
              </button>
            </div>
          </>
        )}

        {/* ─── ITEMS VIEW ─── */}
        {view === "items" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                {currentItems.length} {currentItems.length === 1 ? "item" : "items"}
                {search && ` matching "${search}"`}
              </span>
              {!search && (
                <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  <button
                    onClick={() => { setSelectedCategory(null); }}
                    className={`px-2 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                      !selectedCategory ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    All
                  </button>
                  {categoryGroups.map(({ name }) => (
                    <button
                      key={name}
                      onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                      className={`px-2 py-1 text-[10px] font-mono rounded transition-colors whitespace-nowrap cursor-pointer ${
                        selectedCategory === name ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedItems.map((item) => {
                const id = item.id;
                const isExpanded = expandedId === id;
                const toggle = () => toggleExpand(id);

                if (activeTab === "apps") return <AppCard key={id} item={item as App} expanded={isExpanded} onToggle={toggle} />;
                if (activeTab === "spaces") return <SpaceCard key={id} item={item as Space} expanded={isExpanded} onToggle={toggle} />;
                if (activeTab === "automations") return <AutomationCard key={id} item={item as Automation} expanded={isExpanded} onToggle={toggle} />;
                return <PromptCard key={id} item={item as Prompt} expanded={isExpanded} onToggle={toggle} />;
              })}
            </div>

            {displayedItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[var(--muted-foreground)] font-body">No matches found.</p>
                <button
                  onClick={() => { setSearch(""); setSelectedCategory(null); }}
                  className="mt-2 text-sm text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 24)}
                  className="px-5 py-2 font-body text-sm rounded-md bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)] transition-colors cursor-pointer"
                >
                  Load more ({currentItems.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── DISCOVER VIEW ─── */}
        {view === "discover" && discoverItems.length > 0 && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                {discoverIndex + 1} / {discoverItems.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDiscoverIndex((i) => Math.max(i - 1, 0))}
                  disabled={discoverIndex === 0}
                  className="px-3 py-1.5 text-sm font-mono rounded-md bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setDiscoverIndex((i) => Math.min(i + 1, discoverItems.length - 1))}
                  disabled={discoverIndex >= discoverItems.length - 1}
                  className="px-3 py-1.5 text-sm font-mono rounded-md bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
            <SpotlightCard item={discoverItems[discoverIndex]} tab={activeTab} />
            <p className="text-center text-xs font-mono text-[var(--muted-foreground)] mt-4">
              Arrow keys to navigate · Esc to go back
            </p>
          </div>
        )}
        </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] mt-8">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
            Built on Zo Computer · 2026
          </span>
          <nav className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[var(--muted-foreground)]">
            <Link to="/faq" className="hover:text-[var(--foreground)]">FAQ</Link>
            <Link to="/changelog" className="hover:text-[var(--foreground)]">Changelog</Link>
            <Link to="/blog" className="hover:text-[var(--foreground)]">Blog</Link>
            <a href="/go/zo" className="hover:text-[var(--foreground)]">Get Zo</a>
            <span>{totalItems} recipes</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
