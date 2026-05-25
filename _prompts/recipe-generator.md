# Zo Cookbook Recipe Generator (workspace prompt)

**Purpose:** Add new recipe batches to the live cookbook at `Projects/zo-cookbook-app`. Run repeatedly until total recipes cross 1,000+.

**How to use:** Paste the full prompt below into a new Zo chat in this workspace. Edit the "Batch parameters" block at the top before sending. The agent writes directly to the JSON data files, updates the manifest, runs typecheck, and reports.

---

## The prompt

```
You are a Zo Cookbook recipe author. Generate one batch of new recipes for the cookbook at /home/workspace/Projects/zo-cookbook-app. Write directly to the JSON data files. Run validation. Report what changed.

## Batch parameters (EDIT BEFORE SENDING)

- Apps to add: 10
- Spaces to add: 10
- Automations to add: 15
- Prompts to add: 20
- Tier mix: 60% normie, 40% pro
- Theme nudges (optional, comma-separated): []

## Files to read first

- public/data/apps.json
- public/data/spaces.json
- public/data/automations.json
- public/data/prompts.json
- public/data/manifest.json
- src/data/cookbook-types.ts (for exact field shapes)

For each type, find the highest existing id and continue from there. New IDs are strictly increasing.

## Schemas (STRICT, no extra fields, no skipped required fields)

App: { id, name, category, description, howToBuild, monetization, difficulty }
Space: { id, name, category, description, route, keyTech, difficulty }
Automation: { id, name, category, schedule, delivery, tools, prompt, expectedOutput, customization, addedDate }
Prompt: { id, name, category, whenToUse, prompt, whatYouGet, addedDate }

addedDate is REQUIRED on every new Automation and Prompt. Use today's date in YYYY-MM-DD format. Apps and Spaces do not have addedDate.

## Tiers

NORMIE TIER (target ~60% of batch):
- Audience: a person who uses Gmail, Google Calendar, maybe Notion, doesn't code, wants their life less chaotic
- Good shapes: weekly review nudges, photo-to-list, birthday lead time, doctor follow-up reminders, "what's the actual weather", inbox triage with plain rules, grocery audit, kid logistics, pet routines, hobby practice trackers
- Bad shapes: anything mentioning APIs, webhooks, schemas, agents, multi-step orchestration, "leverage", or developer jargon

PRO TIER (target ~40% of batch):
- Audience: developer, indie founder, operator, marketer, designer with a real stack
- Good shapes: GitHub triage automations, Stripe failure recovery, multi-agent research (use /zo/ask spawn pattern), competitor watch, content repurposing, SEO posture monitoring, log spike detection, customer support SLA, deploy gate checks, A/B test post-mortems
- Embrace: tool chaining, structured output, conditional notifications, multi-step

## Quality bar

Each recipe MUST:
1. Solve a problem the named audience would recognize within 5 seconds
2. Be doable with the current Zo tool roster (below)
3. Have a name that is concrete and specific, not "Daily Helper" or "Smart Assistant"
4. Have a prompt or howToBuild that is detailed enough to actually run or build

Each recipe MUST NOT:
- Use any of these banned words: delve, utilize, leverage, robust, seamless, cutting-edge, game-changer, empower, holistic, paradigm, synergy
- Use em-dashes anywhere. Hyphens or commas only.
- Duplicate or thinly vary an existing recipe (check existing names and themes before adding)
- Hallucinate Zo tools. Only use tool names from the roster below.
- Be a thin variation on another recipe in the same batch

## Zo tool roster (use these EXACT names)

Communication: send_sms_to_user, send_email_to_user, send_telegram_message, send_discord_message
Apps: use_app_gmail, use_app_google_calendar, use_app_google_tasks, use_app_google_drive, use_app_google_sheets, use_app_notion, use_app_linear, use_app_spotify, use_app_x
Web: web_search, web_research, x_search, read_webpage, view_webpage, use_webpage, maps_search
Files: read_file, create_or_rewrite_file, edit_file, edit_file_llm, list_files, grep_search
Shell: run_bash_command, run_sequential_cmds, run_parallel_cmds
Media: generate_image, edit_image, generate_video, generate_d2_diagram, transcribe_audio, transcribe_video
Zo primitives: create_automation, edit_automation, list_automations, delete_automation, create_persona, set_active_persona, write_space_route, list_space_routes, register_user_service, list_user_services
Commerce: create_stripe_product, create_stripe_price, list_stripe_orders, update_stripe_orders
GitHub: gh CLI via run_bash_command

## Categories (extend if needed, do not force-fit)

Existing automation categories include: Morning/daily routines, Email/inbox management, Content creation pipelines, Social media monitoring, Financial/business tracking, Health/wellness, Self-improving systems, Open source maintenance, System reliability, Pet care, Learning, Industry watch, Cookbook helpers.

Existing prompt categories are broad (decision-making, debugging emotional regulation, strategy, communication, learning, etc.). New categories are fine when justified.

If you create a new category for Automations or Prompts, also add the mapping in src/pages/cookbook.tsx (categoryMap + groupMeta) so cards render with proper color.

## Output procedure

For each new recipe:
1. Build the JSON object matching the schema exactly
2. Append to the corresponding public/data/*.json file
3. Keep the file valid JSON throughout (use json.load/json.dump in Python, or careful array-edit logic)

After all recipes are appended:
4. Update public/data/manifest.json counts to match the new file lengths
5. Run: bunx tsc --noEmit (from project root). Fix any errors before reporting done.
6. Re-read each modified JSON. Parse it. Confirm valid.
7. Scan your additions for banned words and em-dashes. If any found, fix and re-validate.

## Report

When done, output:
- Total recipes BEFORE this batch
- Total recipes AFTER this batch
- Per-type added counts
- Per-tier added counts (normie / pro)
- New categories added (if any)
- 3-5 word theme summaries of what shipped
- Any validation issues you caught and fixed
- Confirm typecheck passes
- Suggest a commit message

Do NOT publish the site automatically. Jeff will review and publish.
```

---

## Notes for future runs

- Run this prompt once per session. Each run adds ~50-60 recipes.
- From 661 to 1000+ takes roughly 7 runs.
- Vary the theme nudges across runs to keep the cookbook diverse.
- The companion in-cookbook prompt "Cookbook Recipe Generator" (Prompt id 252) is the user-facing version for visitors who want recipes for their own situation.
