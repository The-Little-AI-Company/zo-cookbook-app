# Handoff: Cookbook Quality + Friction Fixes

**Date:** 2026-05-25
**Author of this handoff:** previous agent session (Jeeves)
**For:** the next agent who picks this up
**Status:** investigation complete, NO CODE CHANGED. This document is the deliverable from that session. Use it to plan the next round of work.

This is long on purpose. The user explicitly asked for depth here, because the surface fixes are easy and the underlying quality problems are not.

---

## TL;DR for the next agent

Five problems were identified in this session. Listed roughly by impact on the cookbook's actual usefulness:

1. **The "copy brief" output is shallow.** The `buildRecipeBrief` function in `src/components/recipe-actions.tsx` is a label-and-bullet dump. Whatever an end user pastes into Zo is much weaker than the underlying recipe data. This is the single biggest quality lever in the app.
2. **The 500-recipe batch from 2026-05-25 is lower depth than the original cookbook entries.** Parallel `/zo/ask` generation traded depth for speed. The new entries pass schema and tone checks but lose to the older ones on technical specificity, voice consistency, and runnable detail. Older entries name exact libraries and patterns; many new ones describe vibes.
3. **"Build in Zo" opens Zo but does not actually prefill the chat.** The current code sets `?prompt=...` on `jeffkazzee.zo.computer` and hopes. There is no confirmed contract that Zo reads that param.
4. **Terminology is wrong for prompts.** A Prompt entry is a prompt, not a spec or a brief. Labels like "Copy brief," "Read spec," "Build spec" should be type-aware. For Prompts: "Copy prompt" / "Read prompt" / "Open in Zo." For others, the spec/brief framing can stay.
5. **Facebook-referred visitors get a risky-site interstitial and a blocked clipboard.** Facebook flags new or low-reputation domains and routes them through its in-app browser, which has stricter permissions and often kills `navigator.clipboard.writeText` silently. This is partially fixable, partially a Facebook reputation problem.

The rest of this document walks through each one with specific file references, root cause, and a recommended fix path. No code is changed here.

---

## 1. The copy-to-clipboard output is the actual product, and it is thin

### What the user sees today

For a Space entry, the user just demonstrated this is the full copied text:

```
Build this zo.space project on my Zo Computer.

Name: Tonight's One Thing
Route: /one-thing
Type: Page
Visibility: private
Description: A single input every morning that asks for the one thing
that would make tonight feel okay. Saves a quiet history of those answers.
Key tech: React, SQLite, Tailwind

Use zo.space routes and make it production-quality. Confirm the final
route URLs and visibility settings.
```

That is a bullet list with a polite closing sentence. It tells the next AI almost nothing about how to make this actually good. The result will be a generic textarea with a SQLite table behind it, and the calm-emotional-tone the original recipe is reaching for will not survive the trip.

### Root cause

`src/components/recipe-actions.tsx`, function `buildRecipeBrief`. It does the same label-dump for every type:

- App: lists name, category, difficulty, description, howToBuild, monetization. Closes with "build the smallest real working version first."
- Space: lists name, route, type, visibility, description, keyTech. Closes with "make it production-quality."
- Automation: lists schedule, delivery, tools, expectedOutput, customization, then drops in `automation.prompt`. Closes with "use the appropriate Zo tools to build it for real."
- Prompt: lists category and whenToUse, then dumps `prompt.prompt`. Closes with "return the full output in chat."

For Prompts and Automations the body is mostly the embedded prompt text, so those are less bad. For Apps and especially Spaces, the entire output is just the JSON fields with a one-line closer. The next AI has to invent intent, design language, UX, edge cases, success criteria, and stack details from scratch.

### What a real brief should look like (Space example)

A respectable handoff for "Tonight's One Thing" reads something like this. Adapt the wording, do not copy it verbatim:

```
Build a small private zo.space project called "Tonight's One Thing" on my Zo Computer.

Intent
This is a calm daily check-in tool, not a productivity app. Each morning,
the user opens it and answers one question: "What is the one thing that
would make tonight feel okay?" The answer is saved with the date. Over
time, the user can read the quiet log of those answers. The point is
gentle continuity, not optimization, not streaks, not metrics.

Route
- /one-thing (page)
- /api/one-thing (api, same prefix)
- Visibility: private

Page UX
- One large input. Soft serif heading, not a sans-serif productivity vibe.
- Below the input, the previous 7 entries, listed by date, dimmed by age.
- No notifications. No streaks. No counts. No nudges. No empty-state pep talk.
- When the user submits, the input fades the prior entry up into the list.

Data
- SQLite via bun:sqlite. One table: entries(id INTEGER PRIMARY KEY, day DATE
  UNIQUE, text TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP).
- Unique constraint on day so re-submitting the same day overwrites instead
  of appending.

API
- GET /api/one-thing returns the last N entries (default 30) as JSON.
- POST /api/one-thing with { text } upserts today's entry.

Stack
- React (zo.space page route)
- Hono (zo.space api route)
- bun:sqlite (Database stored at a stable workspace path)
- Tailwind for layout, custom CSS for the typography mood

Out of scope
- Auth (private route already gates it)
- Multi-user
- Export
- Reminders or push

Definition of done
- I can visit /one-thing logged in, write one sentence, and see it in
  the log on the same page.
- Reloading the page shows today's entry already filled in if I have
  saved one today.
- Submitting again the same day overwrites today, does not duplicate.

Please confirm the final route URLs and visibility before finishing.
```

This is roughly 4x the size of the current output. It costs about a kilobyte of clipboard payload, which is still well inside the `MAX_PROMPT_URL_LENGTH = 3500` ceiling for short briefs and well inside clipboard size limits for the rest. The depth gain is large.

### Recommended fix path (no code yet)

The next agent should:

1. **Rewrite `buildRecipeBrief` in `src/components/recipe-actions.tsx`** so each type uses a richer template that includes Intent, UX, Data, Stack, Out of scope, and Definition of done sections (adjusted per type). Pull existing fields into those sections, do not just relabel them.
2. **Expand the underlying recipe data to support this.** Right now, `Space` only has `name`, `route`, `type`, `visibility`, `description`, `keyTech`. That is not enough source material to render a real brief. Two options:
   - **Option A (cheap, ship now):** keep the schema unchanged; have `buildRecipeBrief` generate the missing structure from the existing fields by writing scaffolding text around them. The brief will be more useful but still partially synthesized.
   - **Option B (expensive, the correct answer):** add optional fields per type: `intent`, `out_of_scope`, `definition_of_done`, `non_goals`, `ui_notes`, `data_model`. Backfill them lazily for the most-viewed recipes. Reject any new recipe that lacks them.
3. **Treat the underlying recipe entry as the source of truth, not the brief generator.** The cookbook should display the same depth on the detail page that the brief delivers. Do not invent in the brief generator. Invent in the recipe data, and let the brief generator faithfully serialize it.
4. **Test with a side-by-side.** Pick five existing low-depth entries and five upgraded ones, run them both through the new brief generator, paste each into a fresh Zo session, and compare what gets built. Acceptance is a clear quality lift on the upgraded set.

This is the highest-leverage change in this entire document. The brief is the actual product, not the cookbook page. Everything else is a delivery mechanism.

---

## 2. The 500-recipe batch shipped on 2026-05-25 is lower depth than the original library

### Honest assessment

Previous batches (the 662 entries that already existed) tend to:

- Name exact libraries, APIs, and patterns. Example from `src/data/cookbook-data.ts:1022`: `"API route uses ImageMagick via Bun.spawn(["convert", ...]) to extract dominant colors with -colors 8 -format '%c' histogram:info:"`. That is specific enough to start coding from.
- Reflect a single curator voice. They sound like the same person wrote them.
- Include real edge cases in the prompt and customization fields.

The 500 new entries from this session tend to:

- Describe what the recipe is for at the conceptual level, but not how the inside actually works.
- Use generic stack hints ("React, Hono, SQLite, Tailwind") without saying which Hono pattern, which SQLite shape, which Tailwind structure.
- Show stylistic variance because they were authored by 12 parallel child sessions, each calibrating its own voice off a 20-name sample.

The schema checks all passed. The banned-word and em-dash filters caught zero offenders. Names are concrete and unique. None of that fixes the underlying density problem. The new entries clear the bar; the older entries set a higher one.

### Root cause

The generation process used `/zo/ask` to spawn 12 children in parallel, each handling one shard of the 500. Each child got:

- The schema for its type.
- The canonical category list.
- About 20 sample names for tone calibration.
- The full existing-name list for that type, for dedup.
- The banned-word list, em-dash ban, and addedDate constraint.
- A target count and tier split.

What each child did not get:

- **Full sample entries** with their depth, not just sample names. A child saw "API Health Monitor" as a name, but never saw the actual fields of `API Health Monitor` so it could match that level of specificity.
- **A critique loop.** Each child generated its shard in one pass and shipped. No "draft, critique against the bar, rewrite the weak ones" cycle.
- **Awareness of the other 11 children.** Parallel children cannot see each other's output. This caused 9 within-batch duplicate names that had to be patched after the fact, and produces hidden duplication in concepts that the dedup script cannot catch (different names, same idea).
- **Field-level depth requirements.** The prompt said "prompt field must be a real runnable prompt" but did not say "howToBuild must name two or more specific libraries or APIs," "monetization must describe a real pricing shape and one realistic objection," "expectedOutput must describe the email/SMS/file contents in concrete enough terms that a downstream agent knows what to render."

### What the next round needs to do differently

These are recommendations the next agent should turn into a generation spec, not code yet:

#### Process changes

- **Author in one voice, not twelve.** Either run the whole batch sequentially in one Zo session, or run 4 shards (one per type), not 12 micro-shards. Sequential is slower but the voice stays coherent. If parallelism is needed for throughput, keep the per-type shard count low and have a final editing pass run by one session.
- **Two-pass per entry.** Pass 1: generate name + 1-paragraph concept. Pass 2: expand that concept into the full field set, knowing the concept is locked. This forces the slot-fill to be coherent, instead of letting the generator paper over a weak concept with verbose fields.
- **Critique-then-rewrite, mandatory.** After every shard, have the same model audit its own output for: shallow fields, generic phrasing, slop patterns, repetition. Rewrite the bottom 20 percent. Do not skip this step.
- **Read existing entries first, every session.** Each generation session should start by reading 15 to 25 random existing entries across all types, then state out loud what bar it is matching. This is cheap context that buys real consistency.

#### Prompt template improvements

Add these into the generator prompt:

- **Full exemplars, not just names.** Include 3 to 5 complete existing entries per type as gold-standard examples, not a 20-name list. Names show vibe; fields show depth.
- **Anti-slop pattern list.** Explicitly ban templates the model reaches for under pressure: "your X will never be the same," "imagine if Y," "stop wasting time on Z," "tracks your X automatically," "the smart way to," "powerful yet simple." Reject any entry containing them.
- **Field-level acceptance criteria.** For Apps: `howToBuild` must name at least two specific libraries, APIs, or code patterns by name. `monetization` must name a price point or pricing shape and one realistic objection. For Spaces: `keyTech` must include both a runtime detail (e.g., "Hono route", "Bun spawn") and a data detail (e.g., "SQLite with one entries table"). For Automations: `prompt` must include a numbered list of steps and a delivery instruction. For Prompts: `prompt` must include `{{placeholders}}` and explicit output formatting.
- **Reject the "default Saas" voice.** Add an instruction to vary sentence length, use fragments, and avoid the LLM cadence of "Topic is broad claim. Elaboration. Another elaboration. Concluding restatement." That cadence is the new Comic Sans of 2026.

#### Validation upgrades

The current `final_validate.py` checks schema, em-dash, banned words, category whitelist, name dedup, and addedDate. It should also check:

- **Field length floors per type.** A Space `description` under 80 characters or `keyTech` under 40 characters fails. An App `howToBuild` under 150 characters fails. Tune the numbers.
- **Lexical-similarity dedup.** Two entries with different names but 80 percent overlapping descriptions should fail. Use a small embedding pass or a cheap Jaccard on shingles. This catches the conceptual duplicates that name-dedup cannot.
- **Slop-phrase regex.** A blocklist of the slop templates from the anti-slop list above. One match fails the entry.
- **Concept clustering report.** Cluster the batch by description embedding and surface clusters with more than ~5 entries. Most of the time, those clusters are unintentional repetition. The human curator reviews and prunes.

#### Where to look in the workspace

- `/home/.z/workspaces/con_*/cookbook/` is gone with this conversation, but the scripts (`orchestrate.py`, `merge_and_validate.py`, `final_validate.py`, `fix_dupes.py`) are good starting points to copy and rewrite. Rewrite, do not reuse, because they baked in the parallel-shard model that is being deprecated.
- `src/data/cookbook-data.ts` is where the original high-depth entries live. The next generation session should read this file. It is the bar.
- `public/data/*.json` is the runtime data. Treat it as derived from a higher-quality authoring source, not as the source of truth itself.

---

## 3. "Build in Zo" opens Zo but does not actually prefill the chat

### What the code does today

In `src/components/recipe-actions.tsx`, `handlePrimary`:

1. Copies the brief to the clipboard. If clipboard fails, sets a flag.
2. Builds a URL: `https://jeffkazzee.zo.computer/?prompt=<urlencoded brief>` if the URL fits inside `MAX_PROMPT_URL_LENGTH = 3500`. Otherwise the URL is the plain workspace URL with no prompt param.
3. Opens that URL in a new tab.
4. Flashes one of four toast messages depending on which of (copied, prefill-attempted) succeeded.

The current FAQ entry in `src/pages/faq.tsx:27` already concedes that the prefill is best-effort and depends on whether Zo reads the param.

### Likely root causes

- **There is no confirmed contract that `https://jeffkazzee.zo.computer/?prompt=` does anything.** This was wired speculatively. It needs to be tested live. If Zo does not consume the param, the prefill is theater.
- **URL length is a hard ceiling.** Long Automation prompts and good detailed briefs blow through 3500 characters easily. When they do, the URL silently falls back to the bare workspace URL and the user gets nothing but a clipboard copy.
- **In-app browsers and link-warning interstitials break the user-activation chain.** Even if the URL works, when Facebook routes a click through its interstitial, the in-app browser loads the destination as a separate navigation, which can lose URL params if the click was rewritten.
- **The opener is `window.open(url, "_blank", "noopener,noreferrer")`.** Some browsers will treat this as a popup and block it if not directly triggered by a user gesture. That is mostly OK here since it is inside a click handler, but worth keeping in mind.

### Recommended fix path

In priority order:

1. **Verify the prefill contract.** Ask the Zo platform team (or test directly) whether `https://jeffkazzee.zo.computer/?prompt=...` actually populates the chat input. If yes, document the exact contract (param name, encoding, length limit) in `README.md` Project Notes. If no, stop pretending and remove the prefill attempt or replace it with the official mechanism.
2. **If there is no prefill contract, build one.** Two reasonable shapes:
   - **A Zo API call.** The cookbook posts the brief to a Zo endpoint that returns a one-time short URL like `https://jeffkazzee.zo.computer/draft/abc123`. The link opens Zo with the draft pre-attached. This unlocks long briefs and is the right long-term shape.
   - **Web Share Target or postMessage to a Zo bookmarklet.** Lower-effort. Higher friction per user.
3. **Stop fitting briefs into the URL.** Once the contract is server-side, the 3500-char limit goes away and briefs can be as detailed as they need to be.
4. **Improve the fallback messaging.** When clipboard is blocked AND prefill is unverified, the cookbook should surface a one-button "Read prompt" modal that displays the prompt with a real Copy button, instead of a tiny toast and a "Read spec" link that the user has to discover.

---

## 4. Terminology is wrong for Prompts

### What is wrong

A Prompt entry in this cookbook is a paste-ready prompt. Calling it a "spec" or a "brief" forces a frame that does not fit.

Current labels in `src/components/recipe-actions.tsx`:

- Primary button label for Prompts: "Open in Zo"
- Secondary copy button: "Copy brief"
- Tertiary read button: "Read spec" / "Hide spec"
- Inside the read panel: "Build spec" header, "Copy spec" link

These work for Apps and Spaces, where the underlying entry really is a spec or brief. They do not work for Prompts.

### Recommended fix path

Make the labels type-aware. Suggested copy per type:

| Type        | Primary action       | Copy action       | Read action            | Read panel header   |
|-------------|----------------------|-------------------|------------------------|---------------------|
| App         | Build in Zo          | Copy build brief  | Read brief / Hide brief| Build brief         |
| Space       | Deploy in Zo         | Copy build brief  | Read brief / Hide brief| Build brief         |
| Automation  | Create automation    | Copy automation   | Read prompt / Hide prompt| Automation prompt |
| Prompt      | Open in Zo           | Copy prompt       | Read prompt / Hide prompt| Prompt            |

The toast strings inside `handleCopy` and `handlePrimary` should follow the same per-type language: "Prompt copied" not "Brief copied," "Build brief copied" not "Brief copied," etc.

The FAQ entry on `src/pages/faq.tsx:27` should be reworded to say "the safe handoff is copy-to-clipboard plus open Zo, and the copy contains a brief, a build brief, an automation prompt, or a prompt depending on the recipe type."

This is mechanical work, low risk, and noticeably improves trust because the labels stop lying about what is in the clipboard.

---

## 5. Facebook-referred visitors hit a risky-site warning and clipboard is blocked

### What is happening

There are two layered issues here. Worth keeping them separate.

#### 5a. The "this link may not be safe" interstitial

Facebook routes external links through `l.facebook.com/l.php?u=...&h=...`. For domains Facebook trusts, the redirect is silent. For low-reputation domains, Facebook shows a yellow or red interstitial saying the link may be unsafe.

Reputation signals Facebook uses (combination of Trend Micro, internal heuristics, and Web of Trust):

- Domain age. `*.zocomputer.io` subdomains are new and not whitelisted as a known good parent.
- Traffic shape. Sites with very few inbound Facebook clicks look low-reputation by default.
- User reports. If anyone reports a `zocomputer.io` subdomain, it can flag every subdomain.
- TLS and domain hygiene. This site is fine on that axis.
- Outbound link patterns. Cookbooks that link to many external services can look spammy to automated raters.

Fix path:

- **Submit `zo-cookbook-app-jeffkazzee.zocomputer.io` (and `www.zo-cookbook.space` when it points there) to the Trend Micro Site Safety Center for re-rating.** Free service. Facebook honors Trend Micro ratings.
- **Encourage the user to share through the custom domain `www.zo-cookbook.space`, not the raw `*.zocomputer.io` subdomain.** Custom domains have their own reputation. Once the custom domain has real traffic and clean signals, Facebook will rate it independently of the parent.
- **Ask Zo whether they have a known-good registration with Facebook / Trend Micro for `*.zocomputer.io`.** If not, that is a platform-level fix that benefits everyone, not just this user.
- **In the meantime, do not rely on Facebook click-through traffic.** Direct-link channels (email, RSS, X, LinkedIn) are not gated by Facebook's interstitial.

#### 5b. The clipboard does not work inside Facebook's in-app browser

When a user clicks through the interstitial, Facebook opens the destination inside its in-app browser (Facebook Lite or the Messenger-embedded browser on mobile, sometimes on desktop too). Those browsers run a stripped WebView with a stricter Permissions-Policy. `navigator.clipboard.writeText` often silently rejects, or returns a NotAllowedError without a visible prompt.

There is no app-side way to force the Facebook in-app browser to allow clipboard writes. There are a few things this site can do:

- **Detect the in-app browser** by sniffing `navigator.userAgent` for "FBAN", "FBAV", "Messenger". When detected, do not even attempt the silent clipboard write. Instead, render a textarea with the brief pre-selected and a one-tap Select All button. The user can long-press and copy with the platform's native gesture. This is uglier than the silent copy, but it actually works.
- **Add an "Open in your real browser" banner** on the cookbook for FB in-app browser visitors. Clicking it tries `intent://...#Intent;...` on Android or a `window.open` with target rules that some in-app browsers honor for opening Safari/Chrome.
- **Show the prompt text inline by default for in-app browsers.** Skip the Copy/Read steps when the platform makes them unreliable, and surface the raw text where the user can see and copy it.

The right primary fix is detection + visible fallback. Do not silently fail.

---

## 6. Suggested order of operations for the next agent

If the next agent has 1 to 2 hours: do **section 1 (rich briefs)** and **section 4 (terminology).** Those two together transform the perceived quality of the cookbook without touching the recipe data.

If the next agent has half a day: add **section 3 (verify and rewire the Zo prefill contract).**

If the next agent has more time: take on **section 2 (regenerate the worst-performing entries in the 500-batch),** using the new generation spec. Do not regenerate everything; cherry-pick the lowest-depth entries by description length and run them through the upgraded process.

Section 5 (Facebook) is partially out of scope: the in-app browser detection plus visible fallback is in-scope and worth doing, but the reputation fix is a platform problem and the user should drive it through Zo support or Trend Micro directly.

---

## 7. Open questions for the user

A few things this session did not have enough info to decide. The next agent should ask before committing to a direction:

1. **Schema expansion vs scaffold-only briefs.** Section 1 offered Option A (keep the schema, fake the depth in the brief generator) and Option B (expand the schema, backfill). B is the correct answer long-term. A ships today. Which does the user want first?
2. **Regenerate the bottom of the 500 batch, or leave it alone and improve the generator for the next round?** Some users prefer "fix it now," some prefer "don't touch what's live."
3. **For the Zo prefill contract: is there an official param the platform supports, or does this need to be built?** That decides whether section 3 is a one-line documentation fix or a real piece of new infrastructure.
4. **For Facebook traffic: how much of the audience comes from FB right now?** If it is a major channel, prioritize section 5. If it is incidental, deprioritize.

---

## 8. Files referenced by this handoff

- `src/components/recipe-actions.tsx` — brief generator, action labels, clipboard logic, URL handoff. Central to sections 1, 3, and 4.
- `src/pages/faq.tsx` — already concedes the prefill is best-effort. Update copy when sections 3 and 4 land.
- `src/data/cookbook-data.ts` — the original high-depth entries. Reference for the quality bar in section 2.
- `src/data/cookbook-types.ts` — the type definitions. Section 1 Option B requires expanding these.
- `public/data/*.json` — runtime data. Derived from cookbook-data.ts and the batch JSON. Do not edit directly when regenerating.
- `README.md` — Project Notes section should be updated when sections 1, 3, or 4 ship.

End of handoff.
