# Plan: Cookbook Handoff Follow-up

Source: handoff document from 2026-05-25 session (Jeeves, previous turn).
Status: planning complete, awaiting Jeff's green light on Phase A and answers on Phase B questions.
Author of this plan: 2026-05-25 session (Jeeves, current turn).

## Objective

Address the five problems identified in the 2026-05-25 handoff in order of leverage and certainty, without doing speculative work on items that need Jeff's input.

## Verified facts from the handoff

- Brief generator in `file src/components/recipe-actions.tsx` (lines 22-87) is exactly the label-dump described. Each recipe type does a one-paragraph join of existing fields.
- Toast strings in `handleCopy` and `handlePrimary` say "Brief copied" / "Build brief copied" regardless of recipe type. Confirms section 4 terminology bug.
- Depth gap on the 2026-05-25 batch is measurable:
  - Spaces: `keyTech` 30 chars recent vs 156 older (\~5x). `description` 134 vs 288.
  - Apps: `monetization` 23 vs 69. `description` 128 vs 246. `howToBuild` 316 vs 221 (longer but more generic).
- Manifest: 1162 total. 275 apps, 175 spaces, 285 automations, 427 prompts.

## Pushback on the handoff sequencing

1. Section 3 (prefill contract verification) is the cheapest test in the entire document. Should be step zero, not third. The answer determines whether briefs need to fit in 3500 chars or can be clipboard-only.
2. Section 1 Option B (schema expansion) is recommended as the long-term answer but is the wrong first move. Ship Option A first (richer templates over existing fields). If Option A doesn't move the needle, source data is the ceiling and Option B is justified. If it does, Option B becomes a smaller targeted change.

## Phases

### Phase A: ship now, no questions

Acceptance: a paste-into-Zo session from any recipe type produces a more useful brief than today, the labels match the recipe type, and Facebook in-app browser visitors don't hit a silent clipboard failure.

#### A1. Type-aware labels and toasts (section 4)

- [ ] Update `getPrimaryLabel(type)` to keep current "Build in Zo" / "Deploy in Zo" / "Open in Zo".

- [ ] Add `getCopyLabel(type)` returning "Copy build brief" (app/space), "Copy automation" (automation), "Copy prompt" (prompt).

- [ ] Add `getReadLabel(type)` and `getReadHeader(type)` for "Read brief / Hide brief" vs "Read prompt / Hide prompt".

- [ ] Update `handleCopy` toast to use the type-specific noun.

- [ ] Update `handlePrimary` toasts to use the type-specific noun.

- [ ] Update FAQ entry in `file src/pages/faq.tsx` to acknowledge prompt vs brief distinction.

Risk: low. Mechanical. Test by viewing each of the four types in the cookbook.

#### A2. Richer brief templates (section 1, Option A)

Keep the schema unchanged. Rewrite `buildRecipeBrief` per type to wrap existing fields in a real structure.

Templates:

- **App**: Intent (from description), Build approach (from howToBuild), Monetization shape (from monetization), Stack (parse from howToBuild), Definition of done (synthesized: "smallest working version that proves the core concept, with X and Y observable"), closing sentence.
- **Space**: Intent (from description), Route + visibility, UX notes (synthesized from description + name), Data (parse from keyTech), API/page split, Stack (from keyTech), Out of scope (synthesized: "no auth beyond visibility, no multi-user, no notifications unless requested"), Definition of done (synthesized from description), closing.
- **Automation**: Intent (from name + category), Trigger (from schedule), Inputs (from tools), Steps (from prompt), Output shape (from expectedOutput), Delivery (from delivery), Customization notes (from customization), Definition of done, closing.
- **Prompt**: When to use, Inputs (extract placeholders from prompt body), Prompt body verbatim, Expected output (from whatYouGet), closing.

Acceptance: each template at least 2x the current output length on a representative sample, and reads like a brief a developer would respect, not a slot-filled form.

- [ ] Rewrite `buildRecipeBrief` with four per-type template functions.

- [ ] Manually inspect output for 5 entries per type (20 total) before merging.

- [ ] Eyeball the output against the example "Tonight's One Thing" target in the handoff. Aim for similar shape.

Risk: medium. Quality regression possible if the templates feel verbose without being useful. Mitigation: actual sample inspection before commit.

#### A3. Facebook in-app browser fallback (section 5b)

- [ ] Add `isInAppBrowser()` helper that checks `navigator.userAgent` for `FBAN|FBAV|Messenger|Instagram|Line/|MicroMessenger`.

- [ ] In `handleCopy` and `handlePrimary`, when in-app browser is detected: skip the silent clipboard write and open the spec panel automatically with a textarea pre-selected.

- [ ] Add a small banner above the action row when in-app browser detected: "Tap to open in your browser for the best experience" with a button that tries `window.open` with a target that some in-app browsers honor.

Risk: low. Defensive code path only fires when UA matches.

### Phase B: needs Jeff's input

#### B1. Verify Zo prefill contract (section 3)

Jeff opens `https://jeffkazzee.zo.computer/?prompt=hello%20world` in his browser and reports what happens.

- If the chat input contains "hello world": document the contract in README Project Notes. Keep current behavior. Phase A briefs can stay under 3500 chars for the URL path.
- If nothing happens: remove the URL prefill code path, treat clipboard as the only mechanism, and update FAQ to stop suggesting prefill works.
- If something weird happens (e.g. shows a modal, drops the param): document the actual behavior and decide based on that.

#### B2. Schema expansion (section 1, Option B)

Only after Phase A ships and we have signal on whether the source data is now the bottleneck. If yes, add optional fields per type (intent, definition_of_done, out_of_scope, ui_notes, data_model) and backfill the top-N most-viewed entries.

#### B3. Regenerate weak entries from the 500-batch (section 2)

Only after writing and dogfooding a new authoring spec. The spec needs:

- Single-voice sequential authoring, not 12 parallel children.
- Two-pass per entry (concept lock, then field expansion).
- Mandatory critique-then-rewrite on every shard.
- Full exemplar entries in the prompt, not just names.
- Anti-slop phrase blocklist and slop-phrase regex in the validator.
- Field-length floors per type in the validator.
- Lexical-similarity dedup in the validator (Jaccard on shingles or small embedding pass).

Once the spec is written and produces visibly-better entries on a 20-entry trial, we regenerate the lowest-depth 50-100 entries from the May 25 batch, not all 500.

### Phase C: out of scope unless Jeff drives it

#### C1. Facebook reputation (section 5a)   (USER NOTE: FACEBOOK IS ASOURCE OF TRAFFIC!)

Trend Micro re-rating, custom domain reputation building, Zo platform-level fix for `*.zocomputer.io`. Skip unless Facebook is a meaningful traffic channel.

## Critique checkpoint

Before merging Phase A:

1. Audit against intent: does this actually make a copied brief more useful when pasted into Zo, or does it just make the brief longer? If it's longer but not better, fix it.
2. Find three problems: voice consistency across the four templates, generic-sounding synthesized sections that the model will recognize as slop, accidental duplication between sections.
3. Propose fixes: tune wording, drop synthesized sections that don't add specificity, consolidate redundant sections.
4. Challenge Jeff if any Phase A item is producing output he wouldn't paste himself.

## Definition of done

Phase A is shipped when:

- All four recipe types have type-correct labels everywhere ("Copy prompt" for prompts, "Copy build brief" for apps and spaces, "Copy automation" for automations).
- A paste-into-Zo brief for at least one entry per type is at least 2x its current length and contains explicit Intent / Stack / Definition of done sections appropriate to the type.
- Facebook in-app browser detection works, and the spec panel auto-opens with copyable text when detected.
- `bunx tsc --noEmit` passes.
- README Project Notes updated.
- Commit message: "Phase A: richer briefs, type-aware labels, in-app browser fallback."

## Open questions for Jeff

1. Green light on Phase A as one combined commit?
2. Does `https://jeffkazzee.zo.computer/?prompt=hello%20world` actually prefill the chat? (B1) (USER NOTE: YES, IT DOES!)
3. Regenerate the 500-batch tail now, or leave it and fix the generator for next time? (B3)
4. How much of the cookbook's traffic comes from Facebook right now? Decides whether C1 is worth chasing.