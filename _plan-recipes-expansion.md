# Cookbook Recipe Expansion + Interview Template

**Status:** Complete, committed
**Last updated:** 2026-05-24
**Companion docs:** `HANDOFF.md` (hosting safety), `_plan.md` (action-model rewrite, complete)

---

## Objective

Two deliverables landing in the same change:

1. **10 new automation recipes** added to `public/data/automations.json`, in the same shape and quality as the existing 100. Each tagged with an `addedDate` field. Manifest count updated to 110.
2. **One interview-style prompt template** added to `public/data/prompts.json` that a user takes to their own Zo, has a conversation with their agent about their life and friction points, and walks away with 3-5 personalized automation recipes drafted for them. Tagged as new.

Both deliverables ship with a **"new" badge UI** that appears on cards when `addedDate` is within 30 days of today, and disappears automatically after 30 days. No cron, no manual cleanup, no stale flags.

---

## Why this matters

Cookbook is the durable authority asset. Adding recipes is the cheapest, highest-leverage way to grow it. The "new" badge gives returning visitors a reason to come back. The interview template is the front door for users who do not know what they want yet, which is most of them.

---

## Constraints

- Do **not** touch hosting, service config, or `zosite.json` system fields. Edit code only.
- Do **not** edit `Projects/zo-cookbook-app-dev/*` (trashed on 2026-05-01, do not restore).
- New recipes must follow the existing voice rules: no banned words (delve, utilize, leverage, robust, seamless, cutting-edge, game-changer, empower, holistic, paradigm), no em-dashes, direct opinionated voice.
- No private personal context in any recipe (no mention of city, health, pets by name, etc). Recipes must work for any user.
- Every new recipe must be **reliably automatable in Zo Computer today**, using tools that actually exist.

---

## Phases

### Phase 1 - Type and data model
- [x] Add optional `addedDate?: string` (ISO date) to `Automation` and `Prompt` types in `src/data/cookbook-types.ts`
- [x] Add a small helper `src/lib/is-new.ts` that returns true when `addedDate` is within 30 days of `Date.now()`

### Phase 2 - UI badge rendering
- [x] Locate every place that renders an automation or prompt card (cookbook.tsx, idea-detail.tsx)
- [x] Insert a small `<NewBadge />` element when `isNew(item.addedDate)` returns true
- [x] Badge style: small, opinionated, not generic SaaS. Use existing accent color tokens
- [x] Extracted NewBadge to its own component file `src/components/new-badge.tsx` so cookbook.tsx and idea-detail.tsx both consume it

### Phase 3 - Generate 10 new automation recipes
- [x] Draft 10 recipes covering category gaps (domain expiry, AI spend, OSS triage, backup checks, pet care, tax estimates, learning, launch day, client re-engagement, AI tool watch)
- [x] Each recipe: full Automation shape (name, category, schedule, delivery, tools, prompt, expectedOutput, customization)
- [x] Add `addedDate: "2026-05-24"` on all 10
- [x] Append to `public/data/automations.json` with IDs 101 through 110
- [x] Update `public/data/manifest.json`: automations 100 -> 110, total 650 -> 661

### Phase 4 - Interview template prompt
- [x] Write the "Automation Interviewer" prompt
- [x] Append to `public/data/prompts.json` with id 251
- [x] Update manifest: prompts 250 -> 251, total 660 -> 661
- [x] Tag with `addedDate: "2026-05-24"`

### Phase 5 - Critique checkpoint
- [x] Three real problems found and fixed (see Critique findings below)

### Phase 6 - Verify
- [x] TypeScript check passes (`bunx tsc --noEmit` clean)
- [x] JSON files parse cleanly (110 automations, 251 prompts)
- [x] Manifest total reads 661
- [ ] Visual render check skipped: did not restart dev server per HANDOFF guidance ("avoid raw service recreation"). Live site will pick up changes on next publish.

---

## Critique findings (Phase 5)

Three real problems were caught before shipping:

1. **Hardcoded "650" in FAQ and Changelog pages.** The header on the main cookbook reads from manifest counts (dynamic, correct), but the FAQ answer and the most recent changelog entry both hardcoded the old number. Updated FAQ to 661, added a new changelog entry for the bump.

2. **New categories had no entries in `categoryMap` or `groupMeta`.** Five new categories (Open Source, System Reliability, Pet Care, Industry Watch, Cookbook Helpers) would have fallen through to a default muted color and `●` icon. Added explicit normalize map entries and meta entries with distinct icons and colors that fit the existing palette.

3. **NewBadge was originally defined locally inside `cookbook.tsx` only.** That would have meant duplicated JSX in `idea-detail.tsx` or missing badge on the detail page. Extracted NewBadge to its own component file before integrating in both surfaces.

---

## Definition of done

- 10 new automations live in the JSON, displaying with a "new" badge on the cookbook
- 1 new interviewer prompt live in the JSON, also badged
- Manifest counts updated
- No broken types, no console errors
- Header on the live page reads "660 recipes" (was "650 recipes")
- Committed to git with a clear message

---

## Out of scope for this session

- Backfilling `addedDate` on the existing 650 recipes. Existing recipes have no badge, which is correct (they are not new).
- The automated research/curation pipeline for ongoing recipe generation. That is a separate project.
- Substack syndication of the recipes.
- SEO/social metadata updates.

If this session runs out of energy mid-phase, leave the plan checkboxes accurate so the next session picks up cleanly.
