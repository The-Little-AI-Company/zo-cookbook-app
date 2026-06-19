# Ideation — Workflow Automations expansion (TEMP, not shipped)

Status: ideation only. Nothing here is in the cookbook yet. We cut this list down together, then I append to `public/data/automations.json` (and a few apps/spaces) in a separate session with the manifest count bumped in the same commit.

Owner: Jeff. Editor: me. Created 2026-06-18.

---

## 1. Objective

Add a wave of recipes built around two underused angles:

1. **Named white-collar jobs, broken into their actual recurring tasks**, each reduced to first-principles steps a Zo automation can run end to end with a verifiable stop.
2. **The 1000+ Pipedream integration catalog**, which the current 285 automations almost never touch.

Plus a structural change: introduce the **loop pattern** (trigger, action, proof, memory, stop) borrowed and adapted from the Forward Future Loop Library, and a **Zo Computer 101** explainer page linked from the cookbook, with each blog post on its own page and real AEO/SEO scaffolding.

---

## 2. Dedup map (what already exists — do NOT repeat)

Pulled live from `public/data/*.json` on 2026-06-18. Counts: 275 apps, 175 spaces, 285 automations, 427 prompts.

**Already saturated — steer clear of near-duplicates:**

- **Indie-hacker devops:** Vercel build failures, Stripe MRR, NPM audit, Postgres slow queries, Cloudflare DNS, GitHub stars, Linear cycles, SEO rank slip, cron health, AWS cost, Sentry/Logfire errors, PR aging, stale branches. (Dozens of these. The dev-loop lane is full.)
- **Home/life:** trash day, library books, pantry/fridge, plant watering, birthday cards, school pickup, meal prep, mortgage/bill watch, subscription audits, DST clock sweep. (45 entries.)
- **Health/wellness:** medication, hydration, sleep, step goals, seizure logs, doctor prep. (25 entries.)
- **Personal CRM:** network ping, touch tracker, follow-up nudge, family group chat. (19 entries.)
- **Generic knowledge/content:** morning briefing, RSS digest, HN scout, reading list, blog first draft, content atomizer, newsletter summarizer.

**Integration usage in existing automations (the tell):** of 285, the only app tools used are Gmail (46), Calendar (16), Linear (8), Drive (6), plus one-offs of Notion/Spotify/Discord. **Nothing** uses QuickBooks, Salesforce, HubSpot, Zendesk, Shopify, Calendly, Slack, Asana, Trello, Airtable, Mailchimp, Typeform, Google Sheets, Stripe-as-data-source for non-indie use cases. **That is the whole opportunity.**

**Hard dedup rule for this wave:** if a candidate's core job is already named above, kill it or sharpen the angle so the role + integration + verifiable stop are the new thing. Role-organized + integration-driven + loop-structured is what makes these net-new even when the verb ("follow up", "reconcile") sounds familiar.

---

## 3. Design rules for this wave

1. **Zo is schedule-first.** The real automation model here is a scheduled Zo session that reads source data, reasons, writes outputs, and stops. Anything that sounds like a native event trigger is a shorthand and must be rewritten as a scheduled scan or a user-run brief before it ships. If a recipe needs instant event handling, it does not belong in this batch unless it can be rephrased as a scheduled reconciliation loop.
2. **Loop shape is editorial, not infrastructure.** The trigger/action/proof/memory/stop pattern is useful as a writing template because it makes the work legible and AEO-friendly, but it is not a separate runtime system. If it starts fighting the real Zo automation model, drop the loop language and keep only the schedule-compatible instructions.
3. **First-principles steps.** Break the job task to irreducible units: source -> transform -> verify -> output -> record. No "magic." Each step is a thing Zo can actually do (read file, call app tool, web_search, write file, send message).
4. **Integration-first where it earns it.** Name the real app and the real object. If the app is not connected, the recipe brief should say "connect X first" rather than pretend.
5. **Honesty.** No fake metrics, no "saves you 10 hours" puffery in the public copy. Describe the mechanism.
6. **Role clustering.** Group by job so a recruiter or bookkeeper lands on a coherent toolkit, not scattered one-offs. Consider a new `role` tag on these entries so the cookbook can filter by job later.
7. **Banned-word discipline** carries into the public copy when we write it (no delve/leverage/seamless/robust/empower etc.).

### 3.1 Implementation filter

Every final candidate must pass all three checks:

- **Schedule-safe:** it can run as a scheduled Zo automation without requiring a native instant event trigger.
- **Source-real:** it uses a real connected app, a file, or a web source that Zo can actually read.
- **Stop-checkable:** the run ends with a verifiable stop condition, not a vague vibe.

If a candidate needs a webhook, listener, or true push trigger, rewrite it into a scheduled scan or drop it.

---

## 4. Candidate pool — by white-collar role

Format per candidate: **Name** — one-line intent. `Trigger -> Action -> Proof -> Stop`. Integrations in brackets. Dedup note where there's adjacency risk.

### 4.1 Recruiter / Talent Acquisition
First principles of the role: intake a req, source candidates, screen, schedule, communicate, keep the pipeline warm, report.

- **Req Intake Brief Builder** — turn a hiring-manager email/Slack thread into a structured job brief + scorecard. `New email tagged "req" -> extract must-haves/nice-to-haves, draft scorecard + boolean search string -> Proof: brief has all 6 scorecard fields filled -> Stop: draft saved + manager pinged.` [Gmail/Slack, file]
- **Candidate Pipeline Stale-Stage Sweep** — find candidates stuck in a stage too long. `Daily 8am -> read ATS/Sheet pipeline, flag anyone >N days in stage -> Proof: each flagged row has owner + last-contact date -> Stop: digest sent.` [Airtable/Google Sheets, Slack]
- **Interview Scheduling Loop** — propose times, hold them, confirm. `Candidate reaches "schedule" stage -> read interviewer Calendars, find 3 mutual slots, draft Calendly/email with options -> Proof: 3 conflict-free slots verified against all calendars -> Stop: invite sent or candidate replied.` [Calendly/Google Calendar, Gmail]
- **Post-Interview Debrief Collector** — chase scorecards after interviews. `2h after an interview event ends -> DM each interviewer for their scorecard, collect into one sheet -> Proof: all panelists submitted or 2 nudges sent -> Stop: consolidated debrief posted.` [Calendar, Slack, Sheets]
- **Candidate Re-engagement Drip** — warm the silver-medalist pool. `Weekly -> pull "rejected-but-strong" candidates, draft personalized check-in per new open req that fits -> Proof: each draft references a specific matching role -> Stop: drafts staged for review.` [ATS/Sheet, Gmail] (dedup: distinct from existing "Inactive Client Re-engagement" — that's clients, this is candidates)
- **Offer-to-Start Onboarding Runbook** — fire the pre-boarding checklist on accept. `Candidate marked "accepted" -> create onboarding task list, draft welcome email, schedule day-1 calendar holds -> Proof: checklist + 3 calendar holds exist -> Stop: IT/manager notified.` [Calendar, Linear/Asana, Gmail]

### 4.2 Sales AE / SDR
Source -> qualify -> follow up -> update CRM -> forecast -> renew.

- **CRM Hygiene Nightly Sweep** — the one rule reps never follow. `Nightly -> find deals with no next-step, stale close dates, or missing amounts -> Proof: each flagged deal listed with the exact missing field -> Stop: rep digest sent + optional auto-fill of close date.` [HubSpot/Pipedrive/Salesforce, Slack]
- **Follow-Up Salvager** — catch threads that went quiet. `Daily -> scan deals where last contact >7 days and stage != closed, draft a context-aware follow-up per deal -> Proof: each draft cites the last message's content -> Stop: drafts saved.` [CRM, Gmail] (dedup: existing "Cold Email Reply Salvager" is reply-rescue; this is deal-stage follow-up driven by CRM data)
- **Pre-Call Account Brief** — 3-minute prep, automatic. `30 min before a meeting with an external contact -> pull CRM history + recent news + LinkedIn-ish public context, draft a one-pager -> Proof: brief has last-touch, open deal, and one fresh news item -> Stop: brief texted/emailed.` [Calendar, CRM, web_search] (dedup: existing "Meeting Prep Bot/Smart Digest of Calendar Attendees" is generic; this is CRM-deal-aware sales prep)
- **Weighted Pipeline Forecast** — Friday number without the spreadsheet. `Fri 4pm -> read pipeline, compute weighted forecast by stage probability, diff vs last week -> Proof: math shown per stage, total reconciles -> Stop: forecast posted with week-over-week delta.` [CRM/Sheets, Slack]
- **Lost-Deal Reason Miner** — learn from the no. `Weekly -> pull closed-lost deals, cluster reasons, surface the top 3 objections -> Proof: each cluster cites 2+ deals -> Stop: summary to sales lead.` [CRM]
- **Quote/Proposal Drafter from Deal** — turn a won-ish deal into a proposal draft. `Deal hits "proposal" stage -> pull deal fields, generate proposal doc from template -> Proof: all merge fields populated, no {{placeholders}} left -> Stop: doc saved + rep notified.` [CRM, Drive] (dedup: existing "Automated Proposal Generator" is generic freelancer; this is CRM-deal-triggered)

### 4.3 Account Manager / Customer Success
Health monitoring, QBRs, renewals, expansion, escalation.

- **Account Health Drift Alarm** — catch churn before it's a meeting. `Daily -> read usage/support/invoice signals per account, score health, flag drops -> Proof: each flagged account shows the 2 signals that moved -> Stop: at-risk list to CSM.` [Zendesk/Stripe/Sheets, Slack] (dedup: existing "Silent Churn Detector" app is generic; this is multi-signal CSM scoring as a recurring loop)
- **QBR Deck Auto-Assembler** — quarterly review prep. `5 business days before a QBR-tagged event -> pull the account's quarter of usage/tickets/wins, draft the deck outline -> Proof: deck has usage trend + open issues + renewal date -> Stop: outline saved.` [Calendar, data sources, Drive]
- **Renewal Runway Watch** — never miss a renewal. `Daily -> find contracts renewing in 90/60/30 days, escalate at each gate -> Proof: each renewal has owner + last touch -> Stop: gated alerts sent.` [CRM/Sheets, Slack] (dedup: existing "SaaS Renewal Calendar" app is a static board; this is a gated escalation loop)
- **Support Ticket Sentiment Sweep** — find the angry-but-quiet accounts. `Daily -> pull yesterday's tickets, flag negative sentiment + repeat openers -> Proof: each flag quotes the ticket -> Stop: digest to CS lead.` [Zendesk/Intercom, Slack]
- **Expansion Signal Spotter** — surface upsell openings. `Weekly -> read usage approaching plan limits or feature-gate hits, list accounts ripe for expansion -> Proof: each cites the limit being hit -> Stop: list to AM.` [product data/Sheets]

### 4.4 Bookkeeper / Accountant
The month-end close, broken to irreducible steps (from research: record -> reconcile -> review -> statements -> review -> close).

- **Daily Transaction Categorizer** — keep the books current. `Daily -> read new bank/card transactions, propose a category per txn using prior-month patterns, flag unknowns -> Proof: >80% auto-categorized, unknowns listed separately -> Stop: categorized file written + unknowns queued.` [Plaid-style feed/Sheets/QuickBooks]
- **Bank Reconciliation Matcher** — match book entries to statements. `Weekly -> compare ledger vs statement, surface unmatched items both ways -> Proof: matched total reconciles to the penny, exceptions listed -> Stop: exception report to bookkeeper.` [QuickBooks/Xero/Sheets]
- **Month-End Close Checklist Runner** — drive the close. `1st business day of month -> run the close checklist (accruals, depreciation, prepaid, AR/AP review), check off each, flag blockers -> Proof: every checklist line is done or blocked-with-reason -> Stop: close status posted.` [Sheets/QuickBooks] (this is the marquee one — directly from FloQast/CPACharge close research)
- **AR Aging Chaser** — get paid. `Weekly -> pull invoices past due, draft tiered reminders (gentle/firm/final) by days-late -> Proof: each draft matches the right tier -> Stop: drafts staged.` [QuickBooks/Stripe, Gmail] (dedup: existing "Invoice Chaser" prompt is one-shot; this is an aging-tiered recurring loop)
- **Expense Receipt Reconciler** — kill the shoebox. `On receipt email/photo -> OCR, extract vendor/amount/date, match to a card txn or flag missing -> Proof: extracted fields match a txn or are queued -> Stop: matched/queued.` [Gmail, Sheets/QuickBooks]
- **Cash Flow Runway Snapshot** — the number that matters. `Weekly -> compute cash in/out trend + weeks of runway -> Proof: math reconciles to current balance -> Stop: snapshot sent.` [QuickBooks/Sheets] (dedup: existing "Weekly Financial Forecast" is generic; this is runway-specific from accounting data)

### 4.5 Paralegal / Legal Assistant
Intake, deadlines, document assembly, e-filing prep, discovery.

- **Matter Deadline Docketing** — court dates don't forgive. `On new matter / weekly -> compute deadlines from rules + filing dates, add to calendar with lead-time alerts -> Proof: each deadline has the rule it derives from -> Stop: calendar populated.` [Calendar, Sheets]
- **Document Assembly from Intake** — draft the boilerplate. `Intake form submitted -> merge client facts into the right template (engagement letter, complaint shell) -> Proof: no unfilled merge fields -> Stop: draft saved for attorney review.` [Typeform/Forms, Drive]
- **Discovery Document Indexer** — tame the dump. `On doc batch -> OCR + extract date/author/type, build a privilege-flag candidate list -> Proof: every doc indexed with 4 fields -> Stop: index written + privilege candidates flagged.` [Drive, file]
- **Conflict-of-Interest Pre-Check** — before you take the matter. `New client name received -> search existing matter/client records for adverse parties -> Proof: search covered all prior matters -> Stop: clear/conflict report.` [Sheets/Drive]
- **Billing Time-Entry Reconstructor** — recover lost hours. `Daily 6pm -> read calendar + email + doc edits, propose billable time entries by matter -> Proof: each entry ties to an artifact -> Stop: draft entries for review.` [Calendar, Gmail, Drive]

### 4.6 Real Estate Agent
Leads, listings, showings, transactions, past-client nurture.

- **New Lead Speed-to-Lead Responder** — first contact in minutes. `New lead (form/portal email) -> draft a personalized reply + log to CRM + schedule a follow-up task -> Proof: reply references the property/area they asked about -> Stop: draft staged + CRM updated.` [Gmail/Forms, CRM]
- **Listing Launch Checklist** — nothing falls through. `New listing created -> fire the checklist (photos, MLS fields, descriptions draft, social posts) -> Proof: each item done or assigned -> Stop: status posted.` [Sheets, social]
- **Showing Feedback Collector** — close the loop with sellers. `After a showing event -> request feedback from the buyer agent, summarize into the seller update -> Proof: feedback logged per showing -> Stop: seller digest drafted.` [Calendar, Gmail]
- **Transaction Milestone Watchdog** — escrow has a calendar. `Daily -> track each active deal's contingency/inspection/closing dates, alert at lead times -> Proof: each deal shows next milestone + days left -> Stop: alerts sent.` [Sheets/CRM, Calendar]
- **Past-Client Anniversary Touch** — referrals come from memory. `Daily -> find purchase anniversaries/birthdays, draft a genuine check-in -> Proof: each note is personalized, not templated -> Stop: drafts staged.` [CRM] (dedup: distinct from personal-CRM entries — this is real-estate-client specific with transaction context)

### 4.7 HR Generalist / People Ops
Onboarding, PTO, reviews, compliance, engagement.

- **New-Hire Onboarding Orchestrator** — day one ready. `Offer accepted -> create accounts checklist, schedule orientation, assign buddy, send welcome packet -> Proof: all 4 streams created -> Stop: manager + IT notified.` [Asana/Linear, Calendar, Gmail]
- **PTO Balance & Conflict Watch** — coverage gaps before they hurt. `Weekly -> read approved PTO, flag overlapping absences on the same team -> Proof: each conflict names the team + dates -> Stop: manager alert.` [BambooHR/Sheets, Calendar]
- **Review Cycle Nudge Engine** — chase the laggards. `During review window, every 3 days -> find managers/employees with incomplete reviews, nudge -> Proof: completion % shown, only incompletes pinged -> Stop: cycle complete or window closed.` [Sheets, Slack]
- **Policy Acknowledgment Tracker** — compliance paper trail. `On new policy -> track who's signed, chase who hasn't -> Proof: signed list reconciles to roster -> Stop: 100% or escalation.` [Forms/Sheets]
- **Anniversary & Milestone Spotter** — culture, automated honestly. `Daily -> surface work anniversaries/birthdays for the team channel -> Proof: each pulled from the roster -> Stop: posted/drafted.` [Sheets, Slack]

### 4.8 Project / Program Manager
Status, risk, standups, dependencies, reporting.

- **Cross-Tool Status Roll-Up** — one status, many tools. `Weekly -> pull task states from Asana/Linear/Jira + a Sheet, assemble a RAG status report -> Proof: every workstream has a status + owner -> Stop: report posted.` [Asana/Linear/Jira, Slack] (dedup: existing "Client Project Status Board Generator" is client-facing; this is internal cross-tool PM roll-up)
- **Blocked-Task Escalator** — surface the jams. `Daily -> find tasks marked blocked or overdue with no update, ping owners -> Proof: each has owner + age -> Stop: escalation digest.` [Asana/Linear]
- **Dependency Slip Detector** — when A moves, B is at risk. `On task date change -> recompute downstream dependency dates, flag new conflicts -> Proof: affected tasks listed with new dates -> Stop: PM alerted.` [Jira/Linear]
- **Meeting Action-Item Extractor + Assigner** — notes that become tasks. `After a meeting w/ notes/transcript -> extract action items, create tasks with owners/dates -> Proof: each task ties to a line in the notes -> Stop: tasks created.` [Drive/transcript, Asana/Linear] (dedup: existing prompt "Meeting Summary & Action Items" is one-shot; this auto-creates tasks in a PM tool)
- **Sprint Burn Honesty Check** — are we actually going to make it. `Daily during sprint -> compute remaining scope vs days left, flag if off-pace -> Proof: math shown -> Stop: burn note posted.` [Linear/Jira] (dedup: existing "Linear Cycle Burn Pulse" exists — only add if we generalize across Jira/Asana, otherwise drop)

### 4.9 Executive Assistant
Calendar defense, travel, inbox, briefings, expenses.

- **Calendar Defense Loop** — protect the exec's focus. `Daily -> detect double-books, no-buffer back-to-backs, and meetings missing agendas, propose fixes -> Proof: each issue has a suggested action -> Stop: digest to EA.` [Calendar] (dedup: existing "Calendar Conflict Preventer/Gap Finder" — sharpen to exec-defense bundle or drop the overlap)
- **Travel Itinerary Assembler** — one clean doc. `On flight/hotel confirmation emails -> parse and merge into a single itinerary with times in local TZ -> Proof: every leg has confirmation # + local time -> Stop: itinerary built.` [Gmail, file]
- **Inbox VIP Triage** — the exec sees only what matters. `Hourly during work hours -> sort inbox by VIP sender + urgency, draft holding replies -> Proof: VIP list applied, each draft matches the thread -> Stop: triaged + drafts staged.` [Gmail] (dedup: existing "Founder Inbox VIP Tier Sort" — only add as EA-for-exec variant or merge)
- **Expense Report Compiler** — month-end without the pain. `Monthly -> gather card txns + receipts, group by category/trip, draft the report -> Proof: each line has a receipt or is flagged -> Stop: draft report.` [Gmail, Sheets]
- **Daily Exec Brief** — but the EA version. `6:30am -> schedule + VIP inbox + prep notes for each meeting in one place -> Proof: every meeting has a prep line -> Stop: brief sent.` (dedup: morning briefing exists — only if the EA-managing-someone-else framing is distinct; likely DROP or fold)

### 4.10 Marketing / Content Manager
Calendar, repurposing, performance, competitive, email.

- **Content Performance Triage** — what to do more of. `Weekly -> pull post/page analytics, rank by engagement, recommend repurpose/retire -> Proof: each rec cites the metric -> Stop: report posted.` [GA/Sheets/social] (dedup: existing "Content Performance Analyzer" prompt is one-shot; this is recurring + recommendation loop)
- **Campaign UTM + Link Hygiene** — clean attribution. `On new campaign links -> validate UTM params, flag missing/malformed -> Proof: each link checked -> Stop: clean set returned.` [Sheets] (dedup: existing "UTM Source Cleaner" app — only add if scheduled-loop adds value; else drop)
- **Newsletter Send Readiness Check** — before you hit send. `Pre-send (scheduled) -> check links, subject length, preview text, broken images, unsub link -> Proof: every check pass/fail listed -> Stop: go/no-go.` [Mailchimp/ESP]
- **Editorial Calendar Gap Filler** — never stare at a blank week. `Weekly -> read the calendar, find empty slots, propose topics from trends + past winners -> Proof: each slot filled with a topic + angle -> Stop: calendar updated.` [Sheets/Notion]
- **Competitor Content Cadence Watch** — know their drumbeat. `Daily -> check competitor blogs/socials for new posts, log cadence + topics -> Proof: new posts since last run listed -> Stop: digest.` [web/RSS] (dedup: existing "Competitor Content Tracker" — only add if multi-competitor cadence analytics is the new bit; else drop)

### 4.11 Customer Support Lead
Queue health, macros, escalation, knowledge gaps.

- **Queue SLA Breach Predictor** — fix it before it breaches. `Hourly -> read open tickets vs SLA clocks, flag at-risk -> Proof: each at-risk ticket shows time-to-breach -> Stop: alert to lead.` [Zendesk/Intercom]
- **Repeat-Issue Knowledge-Gap Finder** — write the doc that stops the tickets. `Weekly -> cluster tickets by topic, surface the top unanswered themes -> Proof: each cluster cites ticket count -> Stop: KB-gap list.` [Zendesk]
- **Macro Suggestion from Resolved Tickets** — turn good replies into reusable macros. `Weekly -> find frequently-typed manual replies, propose macros -> Proof: each proposal cites N similar replies -> Stop: macro drafts.` [Zendesk]
- **CSAT Drop Responder** — catch a bad week early. `Daily -> read CSAT, flag drops, pull the offending tickets -> Proof: each flag links the ticket -> Stop: alert.` [Zendesk/Sheets]

### 4.12 Data Analyst / Ops
Pipeline freshness, anomaly, reporting, dictionary.

- **Dashboard Freshness Watchdog** — stale data lies. `Daily -> check last-updated timestamps on key tables/dashboards, flag stale -> Proof: each source shows last-refresh -> Stop: alert.` [warehouse/Sheets]
- **Metric Anomaly Sentinel** — catch the spike/drop. `Daily -> compute key metrics vs trailing baseline, flag >N sigma moves -> Proof: each anomaly shows expected vs actual -> Stop: digest.` [Sheets/warehouse] (dedup: existing "AWS Cost Anomaly" is cost-specific; this is general business-metric anomaly)
- **Scheduled Report Distributor** — the Monday numbers, automatically. `Weekly -> run the query set, render charts, send to stakeholders -> Proof: every report section populated -> Stop: sent.` [Sheets, Gmail] (dedup: existing "Scheduled Report Generator" prompt is one-shot build; this is a recurring run+distribute loop)
- **Data Dictionary Drift Detector** — schema changed, docs didn't. `Weekly -> diff live schema vs documented dictionary, flag new/changed/removed fields -> Proof: each diff listed -> Stop: drift report.` [warehouse, file]

### 4.13 Procurement / Office Manager / Operations
Vendors, renewals, inventory, approvals.

- **Vendor Contract Renewal Net** — no surprise auto-renews. `Daily -> track contract end + notice-period dates, alert before the notice window closes -> Proof: each contract shows notice deadline -> Stop: alerts.` [Sheets] (dedup: existing "Domain & Cert Expiry" is technical; this is vendor/SaaS contract ops)
- **Purchase Approval Router** — unblock spending. `On a request (form) -> route by amount thresholds to the right approver, chase if stalled -> Proof: each request has approver + status -> Stop: approved/denied.` [Forms/Sheets, Slack]
- **Supply Reorder Trigger** — never run out. `Daily -> read inventory levels, flag below-reorder-point items, draft POs -> Proof: each flagged item shows level vs threshold -> Stop: PO drafts.` [Sheets]
- **SaaS Spend Consolidator** — find the duplicate tools. `Monthly -> pull software charges, group by category, flag overlaps + unused -> Proof: each flag cites the charge -> Stop: report.` [Stripe/card/Sheets] (dedup: existing "Subscription Audit" is personal; this is org SaaS-stack ops)

### 4.14 Grant Writer / Nonprofit Ops (bonus, underserved niche)
- **Grant Deadline Radar** — never miss a cycle. `Daily -> watch funder pages/databases for new RFPs matching the org's focus, log deadlines -> Proof: each opportunity has deadline + fit note -> Stop: digest.` [web, Sheets] (dedup: existing "Tiny Grant Radar / Grant Deadline Tracker" apps — only add as a recurring funder-watch automation, not a static tracker)
- **Report-Back Deadline Tracker** — keep the funders happy. `Weekly -> track grant reporting deadlines, draft report skeletons from program data -> Proof: each grant shows next report date -> Stop: alerts + skeletons.` [Sheets]
- **Donor Thank-You Loop** — gratitude that ships. `On new donation (Stripe/email) -> draft a personalized acknowledgment + log -> Proof: each references the gift amount/designation -> Stop: drafts staged.` [Stripe, Gmail]

---

## 5. Adapted loops from the Forward Future Loop Library

The library is mostly agentic-engineering loops, and we already cover that lane heavily. The useful part for Zo is the **shape of the writing**, not a new runtime model. Adapt, don't copy.

- **Overnight Docs Sweep -> "Workspace Docs Drift Sweep"** — but we already have "The Docs Drift Detector." SKIP unless we widen it to any project's README/AGENTS set with a verifiable "docs match implementation" stop.
- **Production Error Sweep -> already covered** (Sentry/Logfire/Vercel). SKIP.
- **SEO/GEO Visibility Loop -> "AEO Visibility Loop"** — KEEP, reframed as a scheduled audit and repair cycle: run an SEO+AEO audit on a site (crawlability, titles, schema, answer-readiness, citations), rank gaps by impact, fix the top one, re-run the benchmark, stop when no high-impact gap remains. This is a documentation pattern, not a trigger model. [own site, web]
- **Nightly Changelog Loop -> already covered** ("Automated Changelog"). SKIP.
- **Repository Cleanup Loop -> partially covered** ("Stale Branch GC"). Could generalize to a full "Repo Hygiene Loop" with a verifiable "every branch/PR is owned or removed" stop. MAYBE.
- **Full Product Evaluation Loop -> "Release Readiness Eval Loop"** — KEEP as a generalized QA loop: define N scenarios + pass/fail rubric, run, fix root cause, re-run full set, stop when all pass. Net-new framing. [own project]
- **Production Data Cleanup Loop -> "Data Quality Cleanup Loop"** — KEEP: review records, remove anything outside the allowed definition, improve the classifier, verify, stop when every remaining record is valid. Pairs with the Data Analyst cluster. [warehouse/Sheets]

**Bigger idea:** adopt the **trigger/action/proof/stop** spec as the canonical writing shape for new automation recipes, but do not force a separate loop schema into the app unless it clearly improves the cookbook UI. If the UI change adds confusion or makes the recipe sound more theoretical than runnable, leave it out. The point is schedule-compatible clarity.

---

## 6. The 1000+ integration angle (the headline)

Rather than (or in addition to) role clusters, consider an **"Integration Recipes" lane**: one strong recipe per major catalog app, each showing a workflow Zo can run against it. This directly sells the "1000+ connections" story.

Priority apps that are now confirmed in the catalog or native integrations:

- **Slack** — standup collector, channel digest, alert router, on-call ping. Native channel, not catalog.
- **Asana / Trello / Jira** — status roll-up, blocked-task escalator, sprint burn.
- **HubSpot / Salesforce / Pipedrive** — CRM hygiene, follow-up salvager, forecast.
- **QuickBooks / Xero** — categorizer, reconciliation, AR aging, close runner.
- **Zendesk / Intercom** — SLA predictor, KB-gap finder, CSAT responder.
- **Shopify** — abandoned-cart digest, low-stock reorder, daily sales recap, review responder.
- **Calendly** — meeting prep brief, no-show follow-up, round-robin load check.
- **Mailchimp** — send-readiness check, list hygiene, re-engagement segment.
- **Typeform** — response router, lead scorer, intake-to-doc.
- **Google Sheets / Airtable** — the universal glue; many recipes above use them as the data layer. Google Sheets is native; Airtable is the connected `airtable_oauth` integration.
- **Stripe** — failed-payment dunning, refund triage, MRR for a service business. Use the native Stripe tools/Connect flow rather than pretending it is a catalog app.
- **Notion** — meeting-notes-to-tasks, weekly roll-up, knowledge-base gap finder.
- **BambooHR** — onboarding, PTO, reviews, roster hygiene.

Note: the cookbook copy should always name the app honestly and avoid overselling long-tail catalog reliability. The exact Pipedream slug may differ from the public app name, so the recipe brief should say "connect via Plugins -> Integrations" and use the app name the user recognizes.

---

## 7. Page architecture, Zo 101, and AEO/SEO

### 7.1 Zo Computer 101 page (`/zo-101`)
A linked explainer page (route in `src/App.tsx`, like `/faq`, `/blog`). Purpose: orient a newcomer and feed answer engines.

- Format: **question-first H2s** with a one-to-three-sentence answer-first paragraph under each, then detail. (AEO research: extractable Q->A blocks are what get cited.[^1][^2])
- Core questions: What is Zo Computer? What's an automation? What's a Space vs a Site vs a Service? What can the 1000+ integrations do? How do I run a cookbook recipe? What does a "loop" mean here?
- Ship **FAQPage JSON-LD** + a **HowTo** schema block for the "run a recipe" steps.
- Internal links: every answer links to the relevant cookbook category and to 2-3 specific recipes. Internal linking is a ranking + citation signal.
- Honest framing per Jeff's public stance: independent power-user explainer, not official Zo docs.

### 7.2 Each blog post on its own page
Currently `/blog` is a single feed pulling the Substack RSS. For SEO/AEO, posts need **individual indexable routes** with real content (not just a link out), e.g. `/blog/:slug`, rendering the post body, with:
- `<title>` + meta description + canonical per post.
- **Article JSON-LD** (headline, author, datePublished, dateModified).
- Open Graph per post (the project already has an OG generator pattern).
- Answer-first opening paragraph.
- **Decision needed:** mirror Substack content into per-post pages (canonical pointing to Substack to avoid dup-content), or treat the cookbook blog as canonical. Recommend canonical -> Substack to keep Jeff's SEO equity consolidated, while still getting internal indexable pages.

### 7.3 Per-recipe pages (already exist — harden them)
`/ideas/:type/:slug` already gives each recipe a page. To make them AEO-ready:
- Add **HowTo or FAQPage JSON-LD** generated from the recipe's trigger/action/proof/stop fields.
- Title pattern: "How to [recipe intent] with Zo Computer" — matches the "how do I..." query shape answer engines reward.
- Add a one-line **answer-first** summary at the top of each detail page ("This automation does X by Y, and stops when Z.").
- Ensure `sitemap.xml` + `robots.txt` + `llms.txt` exist and list every recipe + the new pages. (Check current state — README mentions HEAD support but verify sitemap/llms.txt coverage of the new routes.)

### 7.4 Site-wide AEO
- Adopt the visible "Verify / Stop" field on cards (from §5) — clean structure both humans and crawlers parse.
- Keep counts dynamic from manifest (already the rule).
- One canonical "what changed" surface (`/whats-new`) already exists — make sure new batches set `addedDate`.

---

## 8. Open decisions for Jeff (need your call before I build)

1. **Volume:** how many net-new recipes this wave? My recommendation: **60-80 automations** across the role clusters + integration lane. That is enough to meaningfully expand the cookbook without turning it into a pile of half-baked entries.
2. **New `role` tag + filter?** Adds a "browse by job" axis to the cookbook. I think yes — it's the organizing idea that makes this wave coherent. Confirm.
3. **Loop fields on cards:** make them optional editorial fields, not a required schema. Only add them if they clearly improve the UI and don't create a fake second automation model. My recommendation: **do not add a separate loop schema** unless the UI test proves it helps.
4. **Integration lane** as its own category/section vs. folded into role clusters? Recommend a dedicated "Integrations" view since it's the headline.
5. **Zo 101 page** scope: just the explainer, or also a "start here" path that routes newcomers into 5 starter recipes? Recommend the latter.
6. **Blog per-post pages:** canonical -> Substack (my rec) or cookbook-canonical?
7. **Which roles to ship first?** My priority order: Bookkeeper, Sales AE, Recruiter, Customer Success, Project Manager (highest pain + clearest integration story + least dedup risk).

---

## 9. Critique (required pass before this becomes a build plan)

**Audit against intent.** Jeff asked for: (a) automations built on workflows + the 1000+ connections, (b) no dupes, (c) common white-collar jobs broken to first principles, (d) loops from Forward Future adapted only if they fit Zo, (e) Zo 101 + per-post pages + AEO/SEO, (f) an ideation file first. This doc hits all six. Good.

**Three real problems:**

1. **Dedup risk is still live in several clusters.** EA (calendar conflict, VIP inbox), PM (Linear burn), Marketing (content performance, UTM, competitor content), and Grant (trackers) all have adjacent existing entries. If we ship the obvious version we'll create the double-posts Jeff explicitly warned against. **Fix:** every flagged candidate must justify itself by role + named integration + verifiable stop, or get cut. I've marked the riskiest ones "DROP/MAYBE" already; we enforce that at the cut.

2. **Schedule-first constraint changes a lot of the draft wording.** Several entries still read like instant event automations, but Zo automations run as scheduled sessions. If we leave the event language in place, the cookbook will promise a behavior Zo cannot actually do natively. **Fix:** rewrite every candidate as a scheduled scan or a user-run brief, and drop any workflow that only makes sense as true push-triggered automation.

3. **The loop concept can turn into overdesign.** The trigger/action/proof/stop framing is useful, but if we turn it into a new schema or UI gospel, we risk building a clever layer that makes the cookbook feel more theoretical than runnable. **Fix:** keep the loop language as optional editorial structure unless it clearly improves the page and the receiving AI brief. Favor the plain schedule-compatible format if there is any doubt.

**Challenge to Jeff:** the role-organized + integration-named approach is the right direction, but the temptation is to dress every recipe in a fancy loop costume and call that quality. That would be style over mechanics. **Recommendation: keep the recipes brutally implementable, keep the loop language optional, and let the 60-80 best schedule-safe recipes do the work.**

---

## 10. Definition of done (for this ideation phase)
- [x] Dedup map built from live data.
- [x] Loop library reviewed; keep/adapt/skip decided.
- [x] Candidate pool by role, each reduced to trigger/action/proof/stop.
- [x] Integration lane drafted.
- [x] Page/AEO/SEO architecture proposed.
- [x] Critique pass done.
- [x] Jeff answers §8 decisions (this session: 70 recipes, loop=editorial-only, expand integrations).
- [x] Cut list finalized AND BUILT: 70 recipes (ids 286-355) merged into public/data/automations.json, manifest 285->355 / 1162->1232, README updated, tsc clean, live on /whats-new. Track B (Zo 101 page, per-post blog, JSON-LD) still pending — separate session.

---

# === BUILD CUT (2026-06-18) — decisions locked, this is what ships ===

## 11. Decisions locked (Jeff, this session)

- **Volume:** 70 net-new automations. Quality over count. 285 -> 355.
- **Loop vs Zo reality (the important one):** Zo automations are **schedule-triggered only** — an RRULE + an instruction run by a full Zo session. There is **no native instant event trigger** (no "on new email", "on form submit", "on deal stage change"). So the Forward Future loop is kept ONLY as a **prompt-writing discipline**, not a schema change:
  - The trigger is always a **schedule** (the automation's RRULE).
  - Action / Proof / Memory / Stop all live **inside the prompt text**, exactly like the existing "Morning Briefing" prompt already embeds numbered steps + an explicit output contract.
  - **No new card fields.** `automations.json` schema is unchanged: `name, category, schedule, delivery, tools, prompt, expectedOutput, customization, addedDate`. This kills the schema-conflict risk entirely.
  - Every event-triggered candidate from §4 is **rewritten as a scheduled scan** (e.g. "on new lead" -> "every 30 min during work hours, scan for leads logged since last run").
- **Integration spread:** the whole point. `tools` lists real Zo tool names. Catalog apps use `use_integration` and the prompt says "connect <App> first via Plugins -> Integrations." Verified-real slugs this session: `hubspot`, `salesforce_rest_api`, `pipedrive`, `quickbooks`, `xero_accounting_api`, `zendesk`, `intercom`, `shopify`, `calendly_v2`, `typeform`, `mailchimp`, `asana`, `trello`, `jira`, `bamboohr`. Curated: `use_app_gmail/google_calendar/google_tasks/google_drive/notion/linear`, `airtable_oauth`, Stripe (native Connect). Slack = native channel (Settings -> Channels), not catalog.
- **Category:** reuse existing `Integration workflows` + add role context in the name. No new taxonomy needed for JSON; a `role` browse axis is a Track-B page feature, deferred.
- **Sequencing:** Track A = these 70 recipes (this build). Track B = Zo 101 page + per-post blog + JSON-LD (separate session, after A ships). Confirmed.
- **Ship-first roles:** Bookkeeper, Sales AE, Recruiter, Customer Success, PM.

## 12. Integration coverage target (so we stop repeating 4 apps)

Each app below gets at least one recipe in the cut. Count in parens = recipes touching it.

QuickBooks (4), Xero (1), Stripe (3), HubSpot (4), Salesforce (1), Pipedrive (1), Zendesk (4), Intercom (1), Shopify (4), Calendly (3), Typeform (3), Mailchimp (3), Asana (4), Trello (1), Jira (2), BambooHR (2), Airtable (5), Google Sheets (many, glue), Google Drive (4), Notion (3), Gmail (many), Google Calendar (many), Google Tasks (2), web_search/read_webpage (many). That's 20+ distinct integrations vs the current 6.

## 13. FINAL CUT — 70 recipes (schedule-safe, dedup-checked)

Format: **Name** | `category` | sched | `tools` | loop one-liner (full prompt written at build time). All event triggers already rewritten to scheduled scans.

### Bookkeeper / Accountant (6)
1. **The Daily Books Categorizer** | Financial/business tracking | daily 6pm | `use_integration:quickbooks, use_app_google_drive` | Scan txns added since last run, propose a category each from prior-month patterns, write categorized sheet, queue unknowns. Stop: every new txn categorized or queued.
2. **The Reconciliation Exception Report** | Financial/business tracking | weekly Mon 7am | `use_integration:quickbooks, use_integration:xero_accounting_api, use_app_gmail` | Compare ledger vs statement balances, surface unmatched both directions. Stop: matched total reconciles or exceptions emailed.
3. **The Month-End Close Runner** | Financial/business tracking | 1st business day 8am | `use_app_google_drive, use_integration:quickbooks` | Walk the close checklist (accruals, prepaid, depreciation, AR/AP), mark each done/blocked-with-reason. Stop: every line resolved, status posted.
4. **The AR Aging Chaser** | Revenue generation | weekly Tue 9am | `use_integration:quickbooks, use_app_gmail` | Pull past-due invoices, draft gentle/firm/final reminders by days-late tier. Stop: a correctly-tiered draft staged per overdue invoice. (dedup: existing Invoice Chaser is one-shot; this is aging-tiered.)
5. **The Receipt-to-Txn Matcher** | Financial/business tracking | daily 7pm | `use_app_gmail, use_integration:quickbooks, use_app_google_drive` | Scan receipt emails since last run, OCR vendor/amount/date, match to a txn or flag missing. Stop: each receipt matched or queued.
6. **The Cash Runway Snapshot** | Financial/business tracking | weekly Fri 8am | `use_integration:quickbooks, use_app_google_drive` | Compute cash in/out trend + weeks of runway, reconcile to current balance. Stop: snapshot sent with the math shown.

### Sales AE / SDR (7)
7. **The CRM Hygiene Nightly Sweep** | Integration workflows | nightly 10pm | `use_integration:hubspot` | Flag deals missing next-step, amount, or with stale close dates; list the exact missing field each. Stop: rep digest written.
8. **The Quiet-Deal Follow-Up Salvager** | Revenue generation | daily 8am | `use_integration:hubspot, use_app_gmail` | Find deals with last-contact >7 days and stage != closed, draft a follow-up citing the last message. Stop: a context-aware draft per stalled deal.
9. **The Pre-Call Account Brief** | Integration workflows | daily 7am | `use_app_google_calendar, use_integration:salesforce_rest_api, web_search` | For each external meeting today, assemble CRM history + open deal + one fresh news item into a one-pager. Stop: a brief per external meeting.
10. **The Friday Pipeline Forecast** | Financial/business tracking | Fri 4pm | `use_integration:pipedrive, use_app_google_drive` | Weighted forecast by stage probability, week-over-week delta, per-stage math reconciles to total. Stop: forecast posted.
11. **The Lost-Deal Reason Miner** | Competitive intelligence and market monitoring | weekly Mon 9am | `use_integration:hubspot` | Cluster closed-lost deals by reason, surface top 3 objections, each cluster cites 2+ deals. Stop: summary to sales lead.
12. **The Proposal Drafter from Deal** | Revenue generation | daily 9am | `use_integration:hubspot, use_app_google_drive` | Scan deals that reached "proposal" since last run, merge fields into the template, verify no placeholders remain. Stop: proposal draft saved + rep notified.
13. **The New-Lead Speed Responder** | Revenue generation | every 30 min, work hours | `use_app_gmail, use_integration:hubspot` | Scan leads logged since last run, draft a reply referencing their stated interest, log a follow-up task. Stop: draft staged + CRM task created per lead.

### Recruiter / Talent Acquisition (6)
14. **The Req Intake Brief Builder** | Integration workflows | daily 8am | `use_app_gmail, use_app_google_drive` | Turn req emails received since last run into a structured brief + scorecard + boolean search string; all 6 scorecard fields filled. Stop: brief saved, manager pinged.
15. **The Stale-Stage Pipeline Sweep** | Integration workflows | daily 8am | `use_integration:airtable_oauth` | Flag candidates >N days in stage, each row shows owner + last-contact. Stop: digest written.
16. **The Interview Scheduler** | Integration workflows | daily 7am | `use_app_google_calendar, use_integration:calendly_v2, use_app_gmail` | For candidates at "schedule" stage, find 3 conflict-free interviewer slots verified against all calendars, draft the options email. Stop: options sent per candidate.
17. **The Post-Interview Debrief Collector** | Integration workflows | daily 9am | `use_app_google_calendar, use_integration:airtable_oauth` | For interviews that ended yesterday, request scorecards from panelists, consolidate; nudge twice max. Stop: debrief posted or nudges sent.
18. **The Silver-Medalist Re-engagement** | Personal CRM and relationship management | weekly Wed 9am | `use_integration:airtable_oauth, use_app_gmail` | Match rejected-but-strong candidates to new open reqs, draft a check-in citing the specific role. Stop: drafts staged. (dedup: candidates, not clients.)
19. **The Offer-Accept Onboarding Runbook** | Integration workflows | daily 8am | `use_app_google_calendar, use_integration:asana, use_app_gmail` | For candidates marked accepted since last run, create the onboarding task list + day-1 calendar holds + welcome draft. Stop: checklist + 3 holds exist.

### Account Manager / Customer Success (6)
20. **The Account Health Drift Alarm** | Integration workflows | daily 8am | `use_integration:zendesk, use_app_google_drive` | Score each account on usage/support/invoice signals, flag drops, name the 2 signals that moved. Stop: at-risk list to CSM.
21. **The QBR Deck Assembler** | Integration workflows | daily 7am | `use_app_google_calendar, use_integration:zendesk, use_app_google_drive` | For QBR-tagged events 5 business days out, draft the deck outline with usage trend + open issues + renewal date. Stop: outline saved.
22. **The Renewal Runway Watch** | Revenue generation | daily 8am | `use_integration:hubspot` | Find contracts renewing in 90/60/30 days, escalate at each gate with owner + last touch. Stop: gated alerts sent. (dedup: existing SaaS Renewal Calendar is static; this is gated escalation.)
23. **The Ticket Sentiment Sweep** | Integration workflows | daily 8am | `use_integration:zendesk` | Pull yesterday's tickets, flag negative sentiment + repeat openers, quote the ticket each. Stop: digest to CS lead.
24. **The Expansion Signal Spotter** | Revenue generation | weekly Mon 9am | `use_integration:intercom, use_app_google_drive` | List accounts hitting plan limits / feature gates, each cites the limit hit. Stop: list to AM.
25. **The Onboarding Stall Detector** | Integration workflows | daily 9am | `use_integration:zendesk, use_integration:airtable_oauth` | Flag new accounts that haven't hit activation milestones on schedule, name the missed step. Stop: stalled-account list.

### Project / Program Manager (5)
26. **The Cross-Tool Status Roll-Up** | Integration workflows | weekly Mon 8am | `use_integration:asana, use_integration:jira, use_app_google_drive` | Pull task states across tools, assemble a RAG report, every workstream has status + owner. Stop: report posted. (dedup: existing board is client-facing.)
27. **The Blocked-Task Escalator** | Integration workflows | daily 9am | `use_integration:asana` | Find blocked/overdue tasks with no recent update, each shows owner + age. Stop: escalation digest.
28. **The Dependency Slip Detector** | Integration workflows | daily 8am | `use_integration:jira` | Recompute downstream dates for tasks whose dates changed since last run, flag new conflicts. Stop: affected tasks listed with new dates.
29. **The Meeting-Notes-to-Tasks** | Integration workflows | daily 6pm | `use_app_google_drive, use_integration:asana` | Extract action items from meeting notes added today, create tasks with owners/dates, each ties to a line. Stop: tasks created. (dedup: existing summary prompt is one-shot.)
30. **The Standup Collector** | Integration workflows | weekdays 9:30am | `use_integration:trello, use_app_gmail` | Pull each member's in-progress/done/blocked from the board, assemble an async standup. Stop: standup posted.

### HR / People Ops (5)
31. **The New-Hire Onboarding Orchestrator** | Integration workflows | daily 8am | `use_integration:bamboohr, use_app_google_calendar, use_app_gmail` | For offers accepted since last run, create accounts checklist + orientation holds + buddy + welcome packet. Stop: all 4 streams created.
32. **The PTO Coverage Conflict Watch** | Integration workflows | weekly Thu 8am | `use_integration:bamboohr, use_app_google_calendar` | Flag overlapping approved absences on the same team, name team + dates. Stop: manager alert.
33. **The Review Cycle Nudge** | Integration workflows | every 3 days in window | `use_integration:airtable_oauth` | Ping only employees/managers with incomplete reviews, show completion %. Stop: cycle complete or window closed.
34. **The Policy Acknowledgment Tracker** | Integration workflows | weekly Mon 9am | `use_integration:typeform, use_app_google_drive` | Reconcile signed list vs roster, chase the unsigned. Stop: 100% or escalation list.
35. **The Work-Anniversary Spotter** | Community/civic engagement | daily 8am | `use_integration:bamboohr` | Surface today's work anniversaries/birthdays from the roster for the team channel. Stop: drafted/posted.

### Executive Assistant (4)
36. **The Calendar Defense Brief** | Integration workflows | daily 7am | `use_app_google_calendar` | Detect double-books, no-buffer back-to-backs, agenda-less meetings; each issue gets a suggested fix. Stop: digest to EA. (dedup: sharpened to exec-defense bundle vs generic conflict finder.)
37. **The Travel Itinerary Assembler** | Integration workflows | daily 6am | `use_app_gmail, use_app_google_drive` | Parse flight/hotel confirmations received since last run, merge into one itinerary, each leg has confirmation # + local time. Stop: itinerary built.
38. **The Expense Report Compiler** | Financial/business tracking | monthly 1st 9am | `use_app_gmail, use_integration:airtable_oauth` | Gather card txns + receipts, group by category/trip, each line has a receipt or is flagged. Stop: draft report.
39. **The VIP Inbox Triage** | Email/inbox management | hourly, work hours | `use_app_gmail` | Sort inbox by VIP sender + urgency, draft holding replies matching each thread. Stop: triaged + drafts staged. (dedup: EA-for-exec framing, distinct from founder self-triage.)

### Marketing / Content Manager (5)
40. **The Newsletter Send-Readiness Check** | Content creation pipelines | pre-send scheduled | `use_integration:mailchimp` | Check links, subject length, preview text, broken images, unsub link; each check pass/fail. Stop: go/no-go verdict.
41. **The Editorial Gap Filler** | Content creation pipelines | weekly Fri 10am | `use_app_notion, web_search` | Find empty calendar slots, propose a topic + angle each from trends + past winners. Stop: every slot filled.
42. **The List Hygiene Sweep** | Integration workflows | weekly Mon 9am | `use_integration:mailchimp` | Flag hard bounces, never-opens, and dupes; propose a re-engagement segment. Stop: cleaned list + segment proposed.
43. **The Campaign UTM Validator** | Data collection and analysis | daily 8am | `use_integration:airtable_oauth` | Validate UTM params on links added since last run, flag missing/malformed. Stop: clean set returned. (dedup: scheduled-loop vs one-shot UTM cleaner.)
44. **The Form Response Router** | Integration workflows | every 30 min, work hours | `use_integration:typeform, use_app_gmail` | Score and route form responses logged since last run to the right owner/list. Stop: each response routed.

### Customer Support Lead (4)
45. **The SLA Breach Predictor** | Integration workflows | hourly, work hours | `use_integration:zendesk` | Read open tickets vs SLA clocks, flag at-risk with time-to-breach. Stop: alert to lead.
46. **The Knowledge-Gap Finder** | Integration workflows | weekly Wed 9am | `use_integration:zendesk` | Cluster tickets by topic, surface top unanswered themes with ticket counts. Stop: KB-gap list.
47. **The Macro Suggester** | Integration workflows | weekly Fri 9am | `use_integration:zendesk` | Find frequently typed manual replies, propose macros each citing N similar replies. Stop: macro drafts.
48. **The CSAT Drop Responder** | Integration workflows | daily 8am | `use_integration:intercom, use_app_google_drive` | Flag CSAT drops, link the offending tickets. Stop: alert with linked tickets.

### Ecommerce / Shopify operator (5)
49. **The Daily Sales Recap** | Revenue generation | daily 8am | `use_integration:shopify` | Yesterday's orders, revenue, AOV, top SKUs, vs trailing-7 average. Stop: recap sent.
50. **The Low-Stock Reorder Flag** | Integration workflows | daily 7am | `use_integration:shopify, use_app_google_drive` | Flag SKUs below reorder point, each shows level vs threshold, draft POs. Stop: PO drafts. (dedup: ecommerce inventory, not generic supply.)
51. **The Abandoned-Cart Digest** | Revenue generation | daily 10am | `use_integration:shopify, use_app_gmail` | Summarize carts abandoned since last run by value, draft a recovery note per high-value cart. Stop: drafts staged.
52. **The Review Response Drafter** | Integration workflows | daily 9am | `use_integration:shopify` | Draft on-brand replies to product reviews posted since last run, flag anything needing a human. Stop: a reply draft per new review.
53. **The Refund/Dispute Triage** | Financial/business tracking | daily 8am | Stripe (native), `use_integration:shopify` | Group new refunds/disputes by reason, flag patterns, draft evidence packets for disputes. Stop: triaged list + draft packets.

### Data Analyst / Ops (4)
54. **The Dashboard Freshness Watchdog** | System reliability | daily 7am | `use_integration:airtable_oauth, use_app_google_drive` | Check last-updated timestamps on key tables, flag stale, each shows last-refresh. Stop: alert.
55. **The Metric Anomaly Sentinel** | Data collection and analysis | daily 7am | `use_app_google_drive` | Compute key metrics vs trailing baseline, flag >N-sigma moves with expected vs actual. Stop: digest. (dedup: general business metrics, not AWS cost.)
56. **The Monday Report Distributor** | Data collection and analysis | weekly Mon 7am | `use_app_google_drive, use_app_gmail` | Run the query set, render charts, every section populated. Stop: sent to stakeholders. (dedup: recurring run+distribute vs one-shot build.)
57. **The Data Dictionary Drift Detector** | System reliability | weekly Wed 8am | `use_app_google_drive` | Diff live schema vs documented dictionary, flag new/changed/removed fields. Stop: drift report.

### Procurement / Office / Ops (4)
58. **The Contract Renewal Net** | Financial/business tracking | daily 7am | `use_integration:airtable_oauth` | Track contract end + notice-period dates, alert before the notice window closes, each shows the deadline. Stop: alerts. (dedup: vendor/SaaS ops, not domain/cert.)
59. **The Purchase Approval Router** | Integration workflows | every 2h, work hours | `use_integration:typeform, use_app_gmail` | Route requests submitted since last run by amount threshold to the right approver, chase stalled ones. Stop: each request has approver + status.
60. **The SaaS Spend Consolidator** | Financial/business tracking | monthly 1st 9am | Stripe (native), `use_app_google_drive` | Group software charges by category, flag overlaps + unused. Stop: report with each flag citing the charge. (dedup: org stack, not personal subscriptions.)
61. **The Vendor Insurance/COI Tracker** | System reliability | weekly Mon 8am | `use_integration:airtable_oauth, use_app_gmail` | Flag vendor certificates of insurance expiring in 30 days, draft the request. Stop: alerts + draft requests.

### Real Estate Agent (4)
62. **The Listing Launch Checklist** | Integration workflows | daily 8am | `use_integration:trello, use_app_google_drive` | For listings created since last run, fire the checklist (photos, MLS fields, description draft, social), each item done/assigned. Stop: status posted.
63. **The Transaction Milestone Watchdog** | Integration workflows | daily 7am | `use_integration:airtable_oauth, use_app_google_calendar` | Track each active deal's contingency/inspection/closing dates, each shows next milestone + days left. Stop: lead-time alerts.
64. **The Showing Feedback Loop** | Integration workflows | daily 9am | `use_app_google_calendar, use_app_gmail` | For showings that ended yesterday, request buyer-agent feedback, summarize into the seller update. Stop: seller digest drafted.
65. **The Past-Client Anniversary Touch** | Personal CRM and relationship management | daily 8am | `use_integration:airtable_oauth, use_app_gmail` | Find purchase anniversaries/birthdays, draft a personalized check-in. Stop: drafts staged. (dedup: transaction-context, not generic CRM.)

### Legal / Paralegal (3)
66. **The Matter Deadline Docketing** | Integration workflows | daily 7am | `use_app_google_calendar, use_integration:airtable_oauth` | Compute deadlines from rules + filing dates for active matters, each deadline cites the rule it derives from. Stop: calendar populated with lead-time alerts.
67. **The Intake-to-Document Assembler** | Integration workflows | every 1h, work hours | `use_integration:typeform, use_app_google_drive` | Merge intake responses submitted since last run into the right template, no unfilled fields. Stop: draft saved for attorney review.
68. **The Conflict-of-Interest Pre-Check** | Integration workflows | daily 9am | `use_integration:airtable_oauth, use_app_google_drive` | For new client names logged since last run, search prior matters for adverse parties. Stop: clear/conflict report per name.

### Nonprofit / Grants (2)
69. **The Grant Deadline Radar** | Research and learning | daily 8am | `web_search, use_integration:airtable_oauth` | Watch funder pages/databases for new RFPs matching the org focus, each opportunity has deadline + fit note. Stop: digest. (dedup: recurring funder-watch, not a static tracker.)
70. **The Donor Thank-You Loop** | Revenue generation | daily 9am | Stripe (native), `use_app_gmail` | For donations received since last run, draft a personalized acknowledgment referencing gift amount/designation, log it. Stop: drafts staged.

## 14. Build-phase contract (next session, not now)
- Write the full `prompt` for each (the loop lives here: numbered steps, explicit Proof + Stop, "connect <App> first" line where catalog).
- Set `expectedOutput` + `customization` per existing house style.
- Set `addedDate` to build date so `/whats-new` + `<NewBadge>` pick them up.
- Assign sequential `id`s after current max.
- Append to `public/data/automations.json`, run `scripts/export-data-json.ts`, bump `manifest.json` automations 285 -> 355 and total 1162 -> 1232 in the SAME commit.
- Verify: `jq length` == 355, manifest matches, no duplicate names (`jq -r '.[].name' | sort | uniq -d` empty).
- Stop before publishing. Jeff triggers any publish.

## 15. Critique of the cut (required)
1. **Catalog reliability still the top risk.** 15 long-tail apps named. Mitigation baked in: every catalog recipe's prompt opens with "connect <App> via Plugins -> Integrations; if a step's tool errors, report which and stop" — so a flaky integration fails honestly instead of faking success. Recipes lead with the Zo-side mechanism (read/transform/verify/write), which holds even if the specific app action varies.
2. **"Since last run" needs state.** Many scheduled scans say "since last run." Zo automations don't keep state between runs automatically. Fix at build time: each such prompt instructs the agent to write a tiny watermark file (last-seen timestamp/id) to the workspace and read it next run. This is schedule-safe and uses only the file tools. Flagging now so it's not forgotten.
3. **Some stops are soft.** "Drafts staged" is only verifiable if the prompt says where (Gmail drafts vs a workspace file). Build-time rule: every Stop names the concrete artifact + location.

**Challenge to Jeff:** 70 deep recipes with real prompts is a large build — realistically a dedicated session, possibly chunked. I recommend building in role-batches (the 5 ship-first roles = ~30 recipes first, verify, then the rest) rather than one 70-recipe dump, so we catch prompt-quality drift early. Say the word and I start the build with the Bookkeeper + Sales batches.
