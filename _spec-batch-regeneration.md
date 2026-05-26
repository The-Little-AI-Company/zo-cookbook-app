# Spec: 2026-05-25 Batch Regeneration

**Project**: zo-cookbook-app
**Author**: 2026-05-25 session (Jeeves)
**Status**: validator built and calibrated against live data. Awaiting Jeff's review on exemplars and open questions before any generation runs.
**Supersedes**: the parallel /zo/ask generation approach used on 2026-05-25 (which is what produced the problem this spec exists to fix)

---

## TL;DR for the next agent

512 cookbook entries added on 2026-05-25 are measurably thinner than the older entries on the same site. They pass schema and tone checks but lose to the originals on technical specificity. The fix is to regenerate them with a different process, not to tune the parallel generator.

This spec defines:

- **What** counts as a good entry per type (acceptance criteria with regex/length checks, not vibes)
- **What** is banned (anti-slop blocklist and voice rules)
- **How** entries get authored (single-voice sequential with explicit two-pass + critique per entry, not 12 children in parallel)
- **How** the run is structured so it can resume after a crash without losing work
- **What** Jeff still has to answer before generation starts

Do not start the run until Jeff has approved the exemplars (§ 5) and answered the open questions (§ 14).

---

## 1. Scope

**In scope**: the 512 entries with `addedDate >= "2026-05-20"`:

| Type | Recent (in scope) | Originals (untouched) | Total |
| --- | --- | --- | --- |
| apps | 75 | 200 | 275 |
| spaces | 75 | 100 | 175 |
| automations | 185 | 100 | 285 |
| prompts | 177 | 250 | 427 |
| **total** | **512** | **650** | **1162** |

**Out of scope**:

- The 650 originals. They are the quality bar this spec is calibrated against. They do not get touched.
- The brief generator (`file src/components/recipe-actions.tsx`). Already rewritten in Phase A. This spec is about source data, not output formatting.
- Schema expansion (adding fields to App/Space/Automation/Prompt). Not needed if regeneration alone closes the gap. Revisit after this batch ships.
- Adding new categories or new entries. Replace-in-place only.

---

## 2. The depth gap (measured, not guessed)

These are the actual averages from `file public/data/*.json` as of 2026-05-25:

| Field | Recent avg (chars) | Originals avg | Gap |
| --- | --- | --- | --- |
| App `description` | 128 | 246 | \~2x |
| App `howToBuild` | 316 | 221 | inverted (recent is *longer* but vaguer) |
| App `monetization` | 23 | 69 | \~3x |
| Space `description` | 134 | 288 | \~2x |
| Space `keyTech` | 30 | 156 | **\~5x** |

The Space `keyTech` gap is the worst. A typical recent value is "React, Hono, SQLite, Twilio API". A typical original is a sentence naming the route shape, the data table, and the integration verb (e.g., "single Hono `/api/log` POST and `/api/list` GET, SQLite `entries` table, Twilio sends SMS on POST").

The App `howToBuild` field is a trap: the recent batch is on average *longer* by token count but vaguer in content. More words, fewer specifics. The regeneration must reverse that ratio.

---

## 3. Goal of the regeneration

For each in-scope entry, replace the source record with one that:

1. Is at least as specific as the matching field on a median original.
2. Names real Zo primitives, real libraries, and real APIs by name in any field where they apply.
3. Reads in Jeff's voice (or at least an honest functional voice), not in default-SaaS voice.
4. Only includes a `customization` hint when the idea has a real knob worth turning. Generic personalization filler is worse than no customization field.
5. Survives the validator in § 11 with zero errors.

The goal is **not** length. A 150-char `keyTech` that names a route, a table, and a verb beats a 300-char `keyTech` that lists frameworks without saying what they do.

---

## 4. Process changes from the failed batch

| Failure mode (2026-05-25 batch) | Fix in this spec |
| --- | --- |
| 12 parallel `/zo/ask` children, no shared voice | Single-voice sequential authoring (one model context per type, walks through all entries in order) |
| One-pass generation: concept and field expansion collapsed | Two-pass per entry: pass 1 locks the *concept* in 200-400 words, pass 2 expands to schema fields |
| No per-entry critique | Mandatory critique-then-rewrite pass on every shard before it's written |
| Exemplars given as a 20-name list | Full exemplar entries (3-5 per type) embedded in the prompt |
| No anti-slop enforcement | Phrase blocklist + regex patterns enforced by the validator before write |
| No resume semantics — a crash lost the work in flight | Per-entry staging file; merge into live data only at the end |

---

## 5. Exemplars (candidate, pending Jeff's approval)

Top-scored originals by field-depth + presence of specifics. **Jeff: please scan these and confirm or swap before the run starts.** Names of libraries, route shapes, and prices were the scoring tiebreakers.

**Apps**

- #100 Time Capsule
- #71 Meeting Cost Calculator (Live)
- #99 Emergency Contact Card Generator

**Spaces**

- #100 The 404 Page That's Worth Finding
- #40 Location-Aware Landing Page
- #61 Haiku Weather

**Automations**

- #100 The Meta-Agent: Monthly Automation Audit
- #34 Monthly Goal Review
- #89 Automated Proposal Generator

**Prompts**

- #238 The Procrastination Buster
- #250 The Zo Computer Power Move
- #249 The Personal Brand Audit

If any of these read as off-brand, swap them. The full text of each chosen exemplar will be embedded verbatim in the generation prompt for its type. Names alone don't transfer voice; the full bodies do.

---

## 6. Field-level acceptance criteria

Programmatic. Every check below runs in the validator (§ 11). An entry that fails an **error** check is rewritten before write, not shipped with a caveat. **Warnings** surface as soft signals but do not block.

### Apps

- `description` (error): ≥ 170 chars. Names the user (who) and the trigger (what makes them open this) in the first two sentences.
- `howToBuild` (error): ≥ 150 chars **and** names at least two specific primitives from this list (case-insensitive substring match): `Skill`, `Automation`, `zo.space`, `Service`, `Gmail`, `Notion`, `Linear`, `Google Drive`, `Calendar`, `Stripe`, `Twilio`, `SQLite`, `DuckDB`, `Bun`, `Hono`, `Tailwind`, `create_automation`, `register_user_service`, `update_space_asset`, `connect_integration`. (Update list as Zo's surface grows.)
- `monetization` (error): ≥ 50 chars **and** contains at least one number (price point, conversion %, or count) **or** a recognized pricing-shape phrase: `one-time`, `per use`, `per month`, `subscription`, `pay what you want`, `tip jar`, `lead gen`, `affiliate`, `free`.
- `monetization` (**warning**): lacks an explicit objection or risk hedge ("won't work for...", "only worth it if...", "narrow audience...", etc.). Spec wants this, but the dictionary is narrow and 198/200 originals fail it. Soft signal, not a gate.

### Spaces

- `description` (error): ≥ 200 chars. Names the visitor (who lands on this) and what they leave with.
- `keyTech` (error): ≥ 120 chars **and** contains both:
  - A **runtime detail**: at least one of `Hono`, `Bun`, `route`, `POST`, `GET`, `fetch`, `useState`, `useEffect`, `page route`, `api route`, `lucide-react`, `Tailwind`.
  - A **data detail**: at least one of `SQLite`, `DuckDB`, `JSON`, `localStorage`, `KV`, `file`, `table`, `dataset`, `Asset`, `update_space_asset`, `read from /home/workspace`.
- `visibility` ∈ {`public`, `private`} and matches the description. (If the entry's description says "personal" anything, visibility should be `private` unless the entry is explicitly designed for public sharing.)

### Automations

- `prompt`: ≥ 300 chars **and** contains either an ordered list (matches `/^\s*\d+[.)]\s/m`) or explicit phase markers (`Phase 1`, `Step 1`, etc.).
- `prompt`: contains an explicit delivery instruction. Must match one of: `send to`, `email me`, `text me`, `SMS me`, `Telegram me`, `Discord`, `Slack`, `write to`, `save to`, `post to`.
- `schedule`: parseable into an rrule. If not parseable, regenerate.
- `customization`: optional. Only included when the idea has a real knob (see § 8). If included, names exactly one or two parameters the user might want to change, with one example value each.

### Prompts

- `prompt`: ≥ 300 chars.
- `prompt`: contains either `{{placeholder}}` syntax (at least one) **or** an explicit "paste your X here" instruction. Pure run-once prompts with no input slot are still allowed if `whenToUse` makes that clear, but they must explicitly state what the user supplies.
- `prompt`: contains an output-format instruction. Match one of: `respond with`, `return`, `output`, `format`, `as a list`, `as a table`, `numbered list`, `headed sections`, `markdown`.
- `whatYouGet`: ≥ 80 chars. Names the artifact shape, not just "a response."

---

## 6a. Calibration findings (live data, run on 2026-05-25)

The validator was run against both the originals (`addedDate < 2026-05-20`) and the recent batch (`addedDate >= 2026-05-20`) to confirm it discriminates correctly. Re-run anytime with `bun scripts/validate-discrimination.ts`.

| Type | Originals pass | Recent pass | Gap |
|------|---------------:|------------:|----:|
| app         | 40/200 (20%) | 0/75 (0%)   | +20pt |
| space       | 52/100 (52%) | 0/75 (0%)   | +52pt |
| automation  | 15/100 (15%) | 11/185 (6%) | +9pt  |
| prompt      | 70/250 (28%) | 172/177 (97%) | **-69pt** |

**Reads correctly for apps, spaces, and automations.** The recent batch fails at higher rates than the originals on every structural axis the validator measures.

**Inverts for prompts.** The recent prompt batch passes 97% of the validator's structural checks vs 28% for the originals. That means whatever quality concern the handoff raised about the recent prompts is **not** a structural issue (length, placeholders, output format) — it is a voice or slop issue, which the validator only partially catches via the banned-phrase list. Treat this as **strong evidence that the prompt slice of the regeneration may not need a full structural rewrite.** A pure anti-slop + voice pass on the 177 recent prompts may be enough.

**Em dashes dominate the originals' fail rate** across every type (42 apps, 38 spaces, 68 automations, 140 prompts). Per Jeff's rule, em dashes stay as a hard error for new entries; the legacy originals are not regenerated, so they're allowed to keep their em dashes for now.

---

## 7. Anti-slop policy

### Banned phrases (case-insensitive substring match)

Hard fail. If any of these appear anywhere in the generated entry, the entry is rewritten:

- `your X will never be the same`
- `imagine if`
- `imagine a world`
- `stop wasting time`
- `tracks your X automatically` (regex: `tracks your \w+ automatically`)
- `the smart way to`
- `powerful yet simple`
- `seamlessly`
- `unleash`
- `unlock`
- `empower`
- `elevate`
- `leverage` (as a verb)
- `game-changer`
- `game-changing`
- `revolutionize`
- `revolutionary`
- `next-level`
- `cutting-edge`
- `state-of-the-art`
- `in today's fast-paced world`
- `in today's digital landscape`
- `at the end of the day`
- `delve`
- `utilize` (use "use")
- `holistic`
- `synergy`

This list is enforced by `file scripts/validate-entry.ts` (§ 11), not by hope.

### Banned punctuation

- **Em dashes** (`—`). Use a regular hyphen `-` or rewrite the sentence. This is a Jeff rule, applies site-wide.
- **Exclamation points in body fields** (`description`, `howToBuild`, `keyTech`, `monetization`, `prompt`, `whatYouGet`, `expectedOutput`, `customization`). Allowed only in `name` if genuinely warranted, and only one max.

### Banned shapes

- The "Topic is broad-claim. Elaboration. Elaboration. Concluding restatement." cadence. Validator approximates this by flagging entries where ≥ 3 sentences in a row begin with `It`, `This`, `The`, `Your`, `You`.
- All-bullet bodies in `description`. Description must read as 2-4 sentences of prose.

---

## 8. Customization rule (Jeff's call, from 2026-05-25)

> "Don't make them with customization options unless the idea needs it. We have these to make users want to think and make their own things too. This site is just the starting point."

Operational reading:

- A `customization` field is **only added** when the idea has at least one knob a thoughtful builder would want to turn. Examples that qualify: a research brief's source list, a recurring schedule, a content prompt's tone profile, a money tracker's currency.
- Generic personalization filler ("customize the title!", "change the color!") does **not** qualify. If the only customization is renaming things, leave the field empty.
- For Apps and Spaces (which have no `customization` field in the schema), no change. The "Personalize before building" hooks in the brief generator already handle that surface.

This rule is enforced as a manual review checkpoint, not a regex, because the line between real and filler customization is judgment.

---

## 9. Voice rules

**Source of truth**: the originals. Read 10 of them before starting and keep that voice in your head.

**Specific guidance** (extracted from how the originals actually read):

- Plain, direct, faintly tired. Not selling, describing.
- Concrete nouns over abstract ones. "Gmail label" beats "email automation flow."
- Names tools by name. "Use `connect_integration` to surface the Gmail connect card" beats "wire up Gmail."
- One opinion per entry. The original entries say what the builder should *not* do as often as what they should. Keep that.
- No closing motivational sentence. The entry ends when the work is described.
- Use Jeff's punctuation conventions: plain hyphens, sparse exclamation points, no Oxford-comma drama either way.

---

## 10. Generation process

### Single-voice sequential

One `/zo/ask` invocation per **type**, not per entry. The invocation receives:

- The full spec (this document)
- The exemplars (full bodies)
- The list of IDs in scope for that type
- A handle to the staging directory (file paths to write to)

The child author processes its assigned IDs **in order**, holding the voice across entries.

If `/zo/ask` context limits don't allow the full list (likely for ≥ 100 entries), shard into chunks of \~25 IDs and run sequentially with the same prompt + exemplars each time. Pass the previous chunk's last 3 outputs as continuity context.

### Two-pass per entry

For each entry being regenerated:

**Pass 1 — Concept lock (200-400 words)**

Write a freeform concept document for the idea. Answer:

- Who is this for, specifically?
- What real problem does it solve, in one sentence?
- What is the smallest version that proves the concept?
- What are 2-3 specific risks or pitfalls?
- What's a realistic monetization shape, if any?
- What does "done" actually look like?

This document is **not** the entry. It's the substrate. Save it to staging for debugging but don't ship it.

**Pass 2 — Schema expansion**

Using the concept doc, write the schema fields. Each field draws from the concept doc and obeys § 6 acceptance criteria. Do not duplicate phrasing across `description` and `howToBuild` — they serve different purposes.

### Critique-then-rewrite (mandatory)

After pass 2, the author looks at its own output and answers:

1. Does `howToBuild` name at least two specific primitives? If no, name them.
2. Does `monetization` contain a number or a pricing-shape phrase **and** one realistic objection? If no, add them.
3. Does any field contain a banned phrase from § 7? If yes, replace it.
4. Does `description` read as prose, not a sales line? If it sounds like a tagline, rewrite.
5. Does this entry sound like the exemplars or like a default SaaS landing page? If the latter, rewrite.

Only after this self-critique passes does the entry get written to staging.

---

## 11. Validator

`file scripts/validate-entry.ts` (to be written before the run starts). Single CLI tool, used both by the author inside the loop and by the merge step at the end.

```markdown
bun scripts/validate-entry.ts <type> <entry.json>
```

Exit 0 on pass, exit 1 on fail with a list of which checks failed.

Checks:

1. **Schema**: required fields present, correct types.
2. **Field-level acceptance criteria** (§ 6): per type, programmatic.
3. **Banned phrases** (§ 7): substring match against the list.
4. **Banned punctuation**: no em dashes anywhere; no `!` in body fields.
5. **Cadence**: no ≥ 3 consecutive sentences starting with the same opener.
6. **Customization sanity**: if `customization` is present and ≤ 40 chars, flag as suspected filler.

A separate `bun scripts/validate-batch.ts` runs all of these across an entire shard and prints a summary.

---

## 12. Pipeline architecture

```markdown
_regen-staging/
  concepts/
    apps/<id>.md        # pass 1 concept docs
    spaces/<id>.md
    automations/<id>.md
    prompts/<id>.md
  entries/
    apps/<id>.json      # pass 2 entry, post-critique
    spaces/<id>.json
    automations/<id>.json
    prompts/<id>.json
  log/
    apps.jsonl          # one line per processed id with status: ok / failed / skipped
    spaces.jsonl
    automations.jsonl
    prompts.jsonl
```

After all entries land in `_regen-staging/entries/`, run `bun scripts/merge-batch.ts` which:

1. Loads the current `file public/data/<type>.json`.
2. For each in-scope ID, replaces the live record with the staged record **only if** the staged record passes the validator.
3. Writes the merged file back.
4. Reports counts: N replaced, N failed validation (left untouched, original 2026-05-25 record preserved), N missing.

The merge is **atomic per type**: if any entry in a type fails validation at merge time, the merge for that type aborts without writing. The user decides whether to fix-and-retry or skip the failed entries.

The originals (`addedDate < "2026-05-20"`) are never touched by merge.

---

## 13. Resume / safety

- Every author pass writes to staging *before* the next entry starts. If the run dies mid-stream, restart with `--skip-existing` and it picks up where it left off.
- Live `file public/data/*.json` is not written until the merge step. The site keeps serving the current (flawed) batch during the run.
- The merge step is reversible: each merge writes `public/data/<type>.json.bak.<timestamp>` before overwriting.
- Cost ceiling: 512 entries × (concept doc + schema expansion + critique) ≈ 1500-2500 tokens output per entry, plus \~3000 tokens of context (spec + exemplars + continuity) per call. Rough estimate at Opus 4.7 rates: ballparked at low double-digit dollars total. **Jeff: confirm this is in budget before the run starts.**

---

## 14. Open questions for Jeff

1. **Exemplars (§ 5)**: are the 12 candidates the right ones, or should some be swapped? Naming them now beats discovering mid-run that one is off-voice.
2. **Customization (§ 8)**: how strict? My read of "only when the idea needs it" is roughly "include for maybe 20-30% of in-scope entries." If you want it tighter ("10%, only when there's a real knob with a real tradeoff") or looser, say so.
3. **Failure handling at merge**: if 12 entries out of 512 fail validation after the rewrite loop, do we (a) ship the 500 that passed and leave the 12 as their current flawed version, or (b) hold the entire merge until all 512 pass?
4. **Budget**: realistic estimate is now $30-60 of model spend plus a few hours of agent wallclock. Acceptable?
5. **Verification step**: do you want to spot-read a sample (say 20 entries pulled at random) before the merge runs? Recommended.
6. **Concept replacement budget**: if a particular concept is fundamentally generic ("AI Email Sorter") and can't be saved by rewriting, do we get a budget to rename/replace it? Recommend 0%, 5%, or 10% of in-scope.
7. **Prompt scope reduction** (new, from §6a calibration): the recent prompt batch passes the validator at 97%. The structural rewrite may not be needed for the 177 prompts. Want to (a) do the full rewrite anyway, (b) restrict the prompt slice to a voice-only pass (anti-slop scrub, em-dash removal, exclamation cleanup), or (c) skip prompts entirely and regenerate only apps + spaces + automations (335 entries)?

---

## 15. Definition of done

- 512 in-scope entries have new source records that all pass the validator with zero errors.
- A spot-read of 20 random new entries by Jeff reads as recognizably the same voice as the originals.
- No banned phrases anywhere in the new corpus (validator confirms).
- The 650 originals are byte-identical to their pre-run state (script-checked via diff).
- `_regen-staging/` is preserved as run artifacts for one week, then can be deleted.
- `file _spec-batch-regeneration.md` (this file) is updated with: actual run date, model used, final pass/fail counts, and any lessons that would change the spec for a future regeneration.

---

## 16. Explicitly out of scope

- Rewriting any of the 650 originals "while we're at it."
- Adding new entries to fill thematic gaps.
- Expanding the schema (App/Space/Automation/Prompt type definitions).
- Generating new images, OG cards, or thumbnails.
- Touching the brief generator. That's Phase A and it shipped.
- Touching the cookbook UI (`file src/pages/cookbook.tsx`, the card components, the filters).

If during the run you discover that a fix in any of the above would dramatically improve the outcome, note it in `file _regen-staging/log/notes.md` and surface it to Jeff after the run, not during.