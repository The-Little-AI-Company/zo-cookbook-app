# Plan: 500 New Zo Cookbook Recipe Ideas

Date: 2026-05-25
Project: zo-cookbook-app
Source ask: generate 500 new recipe ideas across apps, spaces, automations, prompts, following the existing schema, tone, and constraints.

## Objective

Produce one valid JSON object containing 500 new cookbook entries (75 apps, 75 spaces, 175 automations, 175 prompts), conforming to the exact schemas and writing rules in the brief, ready to merge into `public/data/*.json`.

## Current state (verified)

- `public/data/apps.json`: 200 entries
- `public/data/spaces.json`: 100 entries
- `public/data/automations.json`: 110 entries
- `public/data/prompts.json`: 252 entries
- Total in manifest: 662 (the brief said 662; aligned)

After this batch, totals would be: 275 apps, 175 spaces, 285 automations, 427 prompts = 1,162.

## Output strategy

500 entries at the required field depth is roughly 75-100k output tokens. That will not fit in a single chat response. The clean shape:

1. Generate the full JSON to a workspace file: `Projects/zo-cookbook-app/_recipes-500-batch.json`.
2. Validate programmatically (banned words, em-dashes, schema, category whitelist, name uniqueness vs existing JSON).
3. Report results in chat with stats, sample picks, and the file path.
4. Hold the actual append to `public/data/*.json` + manifest bump for a follow-up command, so nothing ships without sign-off.

## Distribution (with +/- 10 tolerance)

- Apps: 75 (45 normie, 30 pro)
- Spaces: 75 (45 normie, 30 pro)
- Automations: 175 (105 normie, 70 pro)
- Prompts: 175 (105 normie, 70 pro)
- Total normie: ~300 (60%)
- Total pro: ~200 (40%)

## Category seed map (sketch, not exhaustive)

Apps spread across all 30+ canonical app categories with extra weight on Personal tools, Hobby/passion subcategories, Niche professional tools, Developer tools, Local/community tools.

Spaces lean toward small useful tools: dev utilities, generators, trackers, single-purpose pages, lightweight APIs. Mix of public and private visibility.

Automations spread across all 22 canonical automation categories. Heavy on: Morning/daily routines, Home/life management, Personal CRM, Pet care, Email/inbox management, Health/wellness reminders, System reliability, Industry watch, Open source maintenance.

Prompts spread across all 38 canonical prompt categories. Heavy on: Cookbook helpers, Personal productivity, Decision-making, Writing & content, Research & analysis, Debugging / Emotional regulation, Habit building, Relationships / Personal.

## Phases

### Phase 1 - Generation
- Build the 500 entries in 8-10 named batches, each writing to the in-progress JSON file. Batches sized to stay safely under per-call output limits.
- Each batch is constrained to a specific type + category cluster + tier mix so I can keep the distribution targets honest.

### Phase 2 - Critique checkpoint
After the first 100 entries, stop and self-audit:
- 3 names per type checked against the existing sample names for tone match. Recalibrate if they read generic or too wild.
- Banned-word grep on the in-progress file.
- Em-dash grep on the in-progress file.
- Confirm category whitelist conformance.

### Phase 3 - Finish generation
Complete the remaining 400 with whatever recalibration phase 2 surfaced.

### Phase 4 - Final validation
Programmatic checks against `_recipes-500-batch.json`:
1. Zero em-dashes (`grep -c '\u2014'` returns 0).
2. Zero banned words (case-insensitive multi-pattern grep returns 0).
3. Per-entry required fields present and typed correctly.
4. Categories all in the canonical lists.
5. Names not present in existing `public/data/*.json`.
6. Counts inside +/- 10 of targets.
7. addedDate is `"2026-05-25"` on every entry.
8. No `id` field anywhere.
9. Automations include all 9 fields; Prompts 6; Apps 7; Spaces 7.

If any check fails, fix and re-run until clean.

### Phase 5 - Report and gate
Report in chat:
- Final counts per type and per tier.
- File path of the generated JSON.
- Sample picks (3 per type) so you can sanity check the voice.
- The exact diff plan for `public/data/*.json` + manifest, but do not execute it without your green light.

## Definition of done

- `_recipes-500-batch.json` exists, parses, passes all validations.
- Counts match within +/- 10 across all four types.
- 60/40 normie/pro mix held.
- Zero em-dashes, zero banned words, zero invented categories, zero fake Zo tools.
- No duplicates vs existing names.
- README.md updated with a one-line note about the pending batch and where it lives.
- Final commit on the project at the end of the round of edits.

## Risks / things I am watching

- **Tone drift**: 500 entries is enough volume to slip into generic naming. Critique checkpoint at 100 is the guard.
- **Category invention**: easy to hallucinate a near-miss like "Productivity tools" when the canonical is "Personal tools". Validation step 4 catches it.
- **Banned words sneaking in**: especially "robust", "seamless", "empower". Validation step 2 catches it.
- **Output truncation**: mitigated by writing to file, not chat.
- **Duplicate names**: validation step 5 against existing JSON.
- **Schema drift**: never adding `id`, always including `addedDate`. Validation step 7/8.

## What I will NOT do without sign-off

- Append into `public/data/*.json`.
- Bump `manifest.json`.
- Commit anything to git.
- Publish or restart the site.

All of that waits for you to look at the generated file and say go.
