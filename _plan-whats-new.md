# What's New + Dynamic Counts + Safe Publish

**Status:** In progress
**Last updated:** 2026-05-24
**Companion docs:** `HANDOFF.md`, `README.md`, `_plan-recipes-expansion.md`

---

## Objective

Three things, in order:

1. Make all user-facing counts dynamic and accurate (no hardcoded numbers in active pages).
2. Add a `/whats-new` route that shows everything added in the last 30 days across all four types, sorted newest first.
3. Publish the site without breaking it. The published service must keep responding at `www.zo-cookbook.space` throughout.

---

## Non-negotiables (the do-not-break list)

1. Do not edit `zosite.json` system fields
2. Do not manually restart or recreate the cookbook service
3. Use `publish_site` tool, not `register_user_service`
4. Visual verify on dev preview before publishing
5. Visual verify on live URL after publishing
6. Keep the 4-type taxonomy (apps, spaces, automations, prompts). No 5th type.
7. Zero em-dashes
8. Zero banned words (delve, utilize, leverage, robust, seamless, etc.)

---

## Phases

### Phase 1 - Audit hardcoded counts
- [ ] Grep every user-facing page for hardcoded recipe counts
- [ ] Note which are dynamic vs hardcoded
- [ ] Confirm `faq.tsx` is the only active page with a hardcoded count

### Phase 2 - Dynamic count for FAQ
- [ ] Make the FAQ a React component that reads manifest at runtime
- [ ] Counts in changelog entries stay frozen (those are historical records)

### Phase 3 - /whats-new route
- [ ] Create `src/pages/whats-new.tsx`
- [ ] Fetch all 4 manifest types in parallel
- [ ] Filter to items where `isNew(addedDate)` returns true
- [ ] Sort by addedDate desc, then by id desc as tie-breaker
- [ ] Render with existing card components by type
- [ ] Empty state when nothing is within the 30-day window
- [ ] Add route to `App.tsx`
- [ ] Add nav link in cookbook header

### Phase 4 - README + commit (pre-publish)
- [ ] Update README: counts (650 to 661), What's New mechanism, addedDate field
- [ ] Commit all changes locally
- [ ] Typecheck clean

### Phase 5 - Visual verify on dev preview
- [ ] `agent-browser open http://localhost:50638`
- [ ] Screenshot homepage, verify "new" badges appear on automations 101-110
- [ ] Screenshot `/whats-new`, verify 11 items render
- [ ] Screenshot FAQ, verify count says 661
- [ ] Click an automation card, verify detail view shows "new" badge

### Phase 6 - Publish
- [ ] Run `publish_site(site_path="Projects/zo-cookbook-app")`
- [ ] Wait for status to become active
- [ ] `agent-browser open https://www.zo-cookbook.space`
- [ ] Screenshot to confirm new content rendered live
- [ ] Verify the custom domain still attached and serving
- [ ] Verify `/whats-new` resolves on live URL

### Phase 7 - Hygiene
- [ ] Update `memory/2026-05-24.md` with what shipped
- [ ] Commit any post-publish doc updates
- [ ] Report to Jeff

---

## Critique checkpoint

After Phase 5, before publishing, check:

1. **Empty state.** What does `/whats-new` show if zero items have a recent `addedDate`? Must be a designed empty state, not a blank page.
2. **Malformed addedDate.** What if a future contributor adds `addedDate: "not a date"` to an entry? `isNew()` already guards with `Number.isFinite`, so it returns false. No crash, no badge. Safe.
3. **Slow load.** What if one of the 4 JSON files fails to load? The route should partially render with the types that succeeded and surface the error for the failed one, not crash the page.
4. **Em-dash audit.** Run `grep "—"` across changed files. Must return zero hits.
5. **Banned word audit.** Run `grep -iE "delve|utilize|leverage|robust|seamless|cutting-edge|game-changer|empower|holistic|paradigm"` across changed files. Must return zero hits in new code.

---

## Definition of done

- All four numbers on the FAQ match the actual data shape
- A user visiting the live site can land on `/whats-new` from the homepage and see the 11 new items
- The "new" badge renders on cards in cookbook view, in `/whats-new`, and on detail pages
- The published service at `www.zo-cookbook.space` returns 200 and renders the updated UI
- The custom domain remains attached
- The site has not been restarted at the service level by my actions