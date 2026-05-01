import generatedAppIdeas from "./generated/app-ideas.generated.json";
// Auto-generated from Zo Cookbook markdown content files
// Generated on 2026-04-11

export type App = {
  id: number;
  name: string;
  category: string;
  description: string;
  howToBuild: string;
  monetization: string;
  difficulty: string;
};

export type Space = {
  id: number;
  name: string;
  route: string;
  type: string;
  visibility: 'public' | 'private';
  description: string;
  keyTech: string;
};

export type Automation = {
  id: number;
  name: string;
  category: string;
  schedule: string;
  delivery: string;
  tools: string;
  prompt: string;
  expectedOutput: string;
  customization: string;
};

export type Prompt = {
  id: number;
  name: string;
  category: string;
  whenToUse: string;
  prompt: string;
  whatYouGet: string;
};

export const baseApps: App[] = [
  {
    id: 1,
    name: `Invoice Autopilot`,
    category: `Personal tools`,
    description: `Watches your Gmail for invoices and bills (using subject line patterns and sender filters), extracts amounts and due dates, writes them to a DuckDB dataset, and sends you a weekly SMS digest of upcoming payments with totals. Flags anything over a threshold you set.`,
    howToBuild: `Scheduled agent (daily) polling Gmail integration for invoices → Python script to parse amounts/dates → DuckDB dataset for history → SMS via \`send_sms_to_user\` for weekly summary → zo.space dashboard page for full history view.`,
    monetization: `Personal use. Could package as a Zo Skill others install.`,
    difficulty: `Intermediate`,
  },
  {
    id: 2,
    name: `Bookmark Brain`,
    category: `Personal tools`,
    description: `A personal link archive with full-text search. Send a URL to your Zo email or Telegram, and it fetches the page, saves a clean markdown version, generates a one-paragraph summary, and tags it with auto-detected topics. Browse and search everything from a zo.space page.`,
    howToBuild: `Scheduled agent checking Telegram/email for URLs → \`read_webpage\` to fetch and convert → markdown files in workspace → API route for full-text search via \`grep_search\` → React page with search UI and tag filtering.`,
    monetization: `Free / personal. Publishable as a Zo Skill.`,
    difficulty: `Beginner`,
  },
  {
    id: 3,
    name: `Client Portal Generator`,
    category: `Micro-SaaS`,
    description: `Freelancers create a private, password-protected page per client at \`handle.zo.space/clients/clientname\`. Each portal shows project status, shared files (via zo.pub links), invoice history, and a simple message form that emails the freelancer. Clients get a clean, branded experience instead of scattered emails.`,
    howToBuild: `zo.space pages (one per client, private with bearer auth) → JSON config files per client in workspace → API routes for message submission (triggers \`send_email_to_user\`) → zo.pub collections for file sharing → Stripe payment links for invoices.`,
    monetization: `Use free, sell as a template/skill (\$29-49 one-time).`,
    difficulty: `Intermediate`,
  },
  {
    id: 4,
    name: `RSS Digest Machine`,
    category: `Personal tools`,
    description: `Aggregates 10-20 RSS feeds you care about, runs each new post through a summarization prompt, scores relevance against your stated interests, and delivers a ranked morning briefing via email or Telegram. Includes "deep read" links and one-line summaries.`,
    howToBuild: `Scheduled agent (6am daily) → Bun script fetching RSS feeds → \`/zo/ask\` API for parallel summarization of new posts → scoring logic in TypeScript → \`send_email_to_user\` or \`send_telegram_message\` for delivery → workspace JSON for feed config and read-state tracking.`,
    monetization: `Personal use. Could sell curated topic-specific digests via Stripe (\$3/mo).`,
    difficulty: `Intermediate`,
  },
  {
    id: 5,
    name: `Meeting Prep Bot`,
    category: `Personal tools`,
    description: `Runs 30 minutes before each Google Calendar event. Pulls the attendee list, searches your Gmail for recent threads with those people, checks LinkedIn profiles via web research, and sends you a Telegram message with context: what you last discussed, their role, and any open threads.`,
    howToBuild: `Scheduled agent (every 15 min) → Google Calendar integration to check upcoming events → Gmail search for attendee email threads → \`web_research\` for attendee background → \`send_telegram_message\` with formatted briefing.`,
    monetization: `Personal productivity. Skill template for \$19.`,
    difficulty: `Intermediate`,
  },
  {
    id: 6,
    name: `Micro-Course Platform`,
    category: `Commerce`,
    description: `Host and sell short courses (5-10 lessons each) as a series of zo.space pages. Lessons are markdown with embedded images and video links. Students buy access via Stripe payment link, receive a bearer token, and access gated content. Progress tracked per-token in a JSON file.`,
    howToBuild: `zo.space pages per lesson (private, bearer-auth gated) → API routes for progress tracking → Stripe Connect for payments → webhook route to generate and email access tokens on purchase → workspace markdown files for course content → \`generate_image\` for lesson illustrations.`,
    monetization: `Direct sales. \$19-99 per course.`,
    difficulty: `Intermediate`,
  },
  {
    id: 7,
    name: `Competitive Price Tracker`,
    category: `Data/research tools`,
    description: `Monitors competitor pricing pages on a schedule. Uses browser automation to visit up to 20 URLs daily, extracts pricing info, diffs against previous snapshots, and alerts you via SMS when a competitor changes their pricing. Stores full history in DuckDB for trend analysis.`,
    howToBuild: `Scheduled agent (daily) → \`open_webpage\`/\`view_webpage\` to scrape pricing pages → Python diff logic → DuckDB dataset for price history → \`send_sms_to_user\` on changes → zo.space dashboard showing price timeline charts.`,
    monetization: `Personal/business use. Could sell as a service for e-commerce shops (\$9/mo per 20 URLs).`,
    difficulty: `Advanced`,
  },
  {
    id: 8,
    name: `Daily Standup Collector`,
    category: `Local/community tools`,
    description: `For small remote teams without Slack. Each team member texts or emails their standup to a shared Zo address. A scheduled agent compiles all responses into a formatted daily digest and emails it to the whole team. Standups are archived and searchable.`,
    howToBuild: `API route as email/SMS webhook receiver → workspace markdown files per day → scheduled agent (10am) to compile and send digest via Gmail integration → zo.space page for standup archive with date browsing → DuckDB for search/analytics on standup themes.`,
    monetization: `Free for small teams. \$5/user/mo for archival and analytics features.`,
    difficulty: `Intermediate`,
  },
  {
    id: 9,
    name: `Font Pairing Tester`,
    category: `Creative tools`,
    description: `A zo.space page where you type in any two Google Fonts names and instantly preview them together across common UI patterns: hero section, article body, card component, pricing table. Saves favorite pairings to your workspace and exports CSS variables.`,
    howToBuild: `Single zo.space page with React → Google Fonts API for dynamic font loading → localStorage for favorites → API route to save pairings to workspace JSON → export button generating CSS/Tailwind config snippets.`,
    monetization: `Free tool, drive traffic to a design service or portfolio.`,
    difficulty: `Beginner`,
  },
  {
    id: 10,
    name: `Warranty Vault`,
    category: `Personal tools`,
    description: `Photograph or forward receipts to your Zo email. An agent extracts the product name, purchase date, and warranty period (using vision for images, text parsing for emails). Stores everything in DuckDB. Sends you a reminder 30 days before each warranty expires.`,
    howToBuild: `Scheduled agent checking Gmail for receipts → \`read_file\` with image support for photos → \`/zo/ask\` for extraction → DuckDB dataset → scheduled agent (daily) checking upcoming expirations → \`send_sms_to_user\` for reminders → zo.space page for browsing all warranties.`,
    monetization: `Personal use. Skill template.`,
    difficulty: `Intermediate`,
  },
  {
    id: 11,
    name: `Local Event Aggregator`,
    category: `Local/community tools`,
    description: `Scrapes event listings from 5-10 local sources (library calendar, city website, Facebook pages, Eventbrite) for a specific town or region. Deduplicates, categorizes, and publishes a clean weekly events page at your zo.space. Sends a Friday SMS/email digest to subscribers.`,
    howToBuild: `Scheduled agent (daily) → browser automation for Facebook/local sites → \`read_webpage\` for simpler sources → DuckDB for event storage and dedup → zo.space public page with filterable event list → API route for email subscription → scheduled agent (Fridays) sending digest via Gmail.`,
    monetization: `Free, sponsored by local businesses (\$25-50/mo per sponsor listing). Or \$2/mo subscriber newsletter.`,
    difficulty: `Advanced`,
  },
  {
    id: 12,
    name: `Screenshot-to-Code Converter`,
    category: `Creative tools`,
    description: `Upload a screenshot of any UI to a zo.space page. An API route sends the image to your LLM via \`/zo/ask\` with a detailed prompt to generate React + Tailwind code that replicates the design. Returns editable code you can copy or save to your workspace.`,
    howToBuild: `zo.space page with file upload → API route receiving the image → \`update_space_asset\` for temp storage → \`/zo/ask\` with the image path and code-generation prompt → returns JSX/Tailwind code → React page displays with syntax highlighting and copy button.`,
    monetization: `Free tool for portfolio traffic. Or gated behind Stripe (\$5/mo for unlimited conversions).`,
    difficulty: `Intermediate`,
  },
  {
    id: 13,
    name: `Podcast Show Notes Generator`,
    category: `Content/media`,
    description: `Upload an audio file. Zo transcribes it, identifies key topics and timestamps, generates a structured summary with chapter markers, pulls out quotable moments, and creates a shareable zo.space page with an embedded audio player. One command, full show notes.`,
    howToBuild: `\`transcribe_audio\` for transcript → \`/zo/ask\` for structured summary extraction (chapters, quotes, key points) → \`create_or_rewrite_file\` for markdown → zo.space public page with HTML5 audio player + show notes → \`update_space_asset\` for the audio file.`,
    monetization: `Offer as a service to podcasters. \$5 per episode or \$29/mo unlimited.`,
    difficulty: `Intermediate`,
  },
  {
    id: 14,
    name: `Stripe Revenue Dashboard`,
    category: `Commerce`,
    description: `A private zo.space page that displays your Stripe Connect revenue in real-time: daily/weekly/monthly totals, top products, recent orders, and a simple line chart of revenue over time. Auto-refreshes. No third-party analytics tool needed.`,
    howToBuild: `zo.space private page → API route querying Stripe via \`list_stripe_orders\` → JavaScript charting (inline SVG or canvas) → auto-refresh with \`setInterval\` → bearer-auth protected API endpoints → DuckDB for historical aggregation beyond what Stripe API returns.`,
    monetization: `Personal use. Template for other Zo sellers (\$19).`,
    difficulty: `Intermediate`,
  },
  {
    id: 15,
    name: `Cold Email Research Assistant`,
    category: `Micro-SaaS`,
    description: `Give it a company name. It researches the company (website, recent news, funding, team), finds likely decision-maker contacts via LinkedIn/web research, drafts a personalized cold email referencing specific company details, and saves everything to a workspace folder. Batch-process a CSV of targets.`,
    howToBuild: `Python script → \`web_research\` (category: company) for company intel → \`web_research\` (category: linkedin_profile) for contacts → \`/zo/ask\` for email drafting with company context → CSV input/output → workspace folder per company → optional Gmail draft creation via integration.`,
    monetization: `Use personally. Sell as a Zo Skill (\$49 one-time). Or charge per batch via Stripe (\$0.50/company).`,
    difficulty: `Intermediate`,
  },
  {
    id: 16,
    name: `Neighborhood Watch Board`,
    category: `Local/community tools`,
    description: `A public zo.space page where neighbors can report and view local incidents, lost pets, and community alerts. Simple form submission, no login required (honeypot spam protection). Posts display on a reverse-chronological feed. Admin (you) moderates via a private page.`,
    howToBuild: `Public zo.space page for the feed → API route for form submissions (writes to workspace JSON) → private admin page for moderation (approve/delete) → \`send_sms_to_user\` when new posts arrive for moderation → optional \`generate_image\` for a community-branded header.`,
    monetization: `Free community tool. Accept donations or local business sponsorships.`,
    difficulty: `Beginner`,
  },
  {
    id: 17,
    name: `Writing Voice Analyzer`,
    category: `Creative tools`,
    description: `Paste in 3-5 samples of your writing. The tool analyzes sentence length distribution, vocabulary complexity, tone markers, recurring phrases, and structural patterns. Outputs a "voice profile" you can save and reference — or use as a system prompt for AI writing tools to match your style.`,
    howToBuild: `zo.space page with textarea input → API route sending samples to \`/zo/ask\` with detailed analysis prompt → Python script for quantitative metrics (sentence length histogram, vocabulary stats, readability scores) → returns both the LLM qualitative profile and hard metrics → save to workspace as a reusable voice profile markdown file.`,
    monetization: `Free tool for writers. Premium: compare your voice against published authors (\$3/analysis).`,
    difficulty: `Intermediate`,
  },
  {
    id: 18,
    name: `Substack Backup & Mirror`,
    category: `Content/media`,
    description: `Automatically backs up all your Substack posts to your Zo workspace as markdown files. Optionally mirrors them as a searchable archive on zo.space — your content, your server, independent of any platform. Runs weekly to catch new posts.`,
    howToBuild: `Scheduled agent (weekly) → browser automation logged into Substack → scrape post list and content → \`read_webpage\` for each post → save as markdown to workspace → zo.space public page rendering the archive with search → DuckDB index for full-text search API route.`,
    monetization: `Personal backup. Skill template for other Substack writers (\$15).`,
    difficulty: `Intermediate`,
  },
  {
    id: 19,
    name: `API Health Monitor`,
    category: `Micro-SaaS`,
    description: `Pings a list of API endpoints every 5 minutes, checks response codes and latency. If anything goes down or gets slow, sends an immediate SMS alert. Logs all checks to DuckDB. Displays a public or private status page on zo.space showing uptime percentages and response time charts.`,
    howToBuild: `Scheduled agent (every 5 min) → Bun script hitting endpoints with \`fetch\` → DuckDB dataset for check history → \`send_sms_to_user\` on failures → zo.space status page with uptime bars and latency sparklines → API route serving JSON for external consumption.`,
    monetization: `Free for 3 endpoints. \$5/mo for 25 endpoints via Stripe.`,
    difficulty: `Intermediate`,
  },
  {
    id: 20,
    name: `Recipe Scaler & Meal Planner`,
    category: `Personal tools`,
    description: `Paste a recipe URL. Zo fetches it, strips the SEO garbage, extracts the actual recipe, and saves a clean version to your workspace. Scale servings up or down with auto-adjusted quantities. Plan a week of meals and generate a consolidated grocery list as a checkable zo.space page.`,
    howToBuild: `zo.space page with URL input → \`read_webpage\` to fetch recipe → \`/zo/ask\` to extract structured recipe data (ingredients with quantities, steps) → workspace JSON per recipe → meal planner page with drag-and-drop weekly view → API route that aggregates and deduplicates ingredient lists → printable grocery list page.`,
    monetization: `Free personal tool. Share recipes via zo.pub links.`,
    difficulty: `Intermediate`,
  },
  {
    id: 21,
    name: `Client Testimonial Collector`,
    category: `Commerce`,
    description: `Generate a unique link per client. They visit a clean zo.space form, type their testimonial, optionally upload a headshot. You get an SMS notification, approve it from a private admin page, and approved testimonials auto-appear on a public testimonial wall you can embed or link from your portfolio.`,
    howToBuild: `zo.space public form page (dynamic route \`/testimonial/:token\`) → API route for submission → workspace JSON storage → \`send_sms_to_user\` on new submission → private admin page for approve/reject → public wall page rendering approved testimonials → \`update_space_asset\` for headshot uploads.`,
    monetization: `Free for personal use. Sell as a white-label service for agencies (\$9/mo).`,
    difficulty: `Intermediate`,
  },
  {
    id: 22,
    name: `Domain Name Generator & Checker`,
    category: `Creative tools`,
    description: `Describe your project in a sentence. Zo generates 50 domain name ideas using multiple strategies (portmanteau, metaphor, prefix/suffix, foreign words), then checks availability via WHOIS lookups. Returns a ranked list with availability status, estimated price, and registration links.`,
    howToBuild: `zo.space page with text input → API route calling \`/zo/ask\` for name generation → Bun script running \`whois\` CLI checks in parallel → results sorted by availability and quality score → links to Namecheap/Porkbun for registration → save searches to workspace for reference.`,
    monetization: `Free tool that drives affiliate registrar links. Or \$1 per search via Stripe.`,
    difficulty: `Beginner`,
  },
  {
    id: 23,
    name: `Personal CRM`,
    category: `Personal tools`,
    description: `Track every person who matters to your work or life. Add contacts with context (how you met, what you discussed, follow-up dates). A scheduled agent reminds you when it's time to reach out to someone you haven't contacted in a while. Pulls in recent Gmail threads with each contact automatically.`,
    howToBuild: `DuckDB dataset for contacts and interaction log → zo.space private pages (contact list, individual contact detail) → Gmail integration to pull recent threads by email address → scheduled agent (weekly) checking for stale contacts → \`send_telegram_message\` for follow-up reminders → API routes for CRUD operations.`,
    monetization: `Personal use. Package as a Zo Skill.`,
    difficulty: `Intermediate`,
  },
  {
    id: 24,
    name: `Changelog Publisher`,
    category: `Content/media`,
    description: `Keep a \`changelog.md\` in your project folder. A zo.space page automatically renders it as a beautiful, public-facing changelog with dates, version numbers, and categorized entries (Added, Fixed, Changed). Optional RSS feed API route so users can subscribe. Update the markdown, the page updates instantly.`,
    howToBuild: `zo.space public page reading \`/home/workspace/Projects/myproject/changelog.md\` at request time → markdown parser in the page component → API route serving RSS/Atom XML → styled with custom typography (Instrument Serif headers, JetBrains Mono for code) → optional \`send_email_to_user\` notification when the file changes.`,
    monetization: `Free. Drives credibility for your product.`,
    difficulty: `Beginner`,
  },
  {
    id: 25,
    name: `AI Art Prompt Library`,
    category: `Creative tools`,
    description: `A searchable, tagged collection of image generation prompts you've tested and liked. Save prompts with their output images, rate them, add notes on what worked. Browse by style, subject, or mood. One-click regenerate with variations. Your personal prompt engineering notebook.`,
    howToBuild: `zo.space pages (gallery view + detail view) → workspace JSON for prompt metadata and ratings → \`generate_image\` for regeneration and variations → \`update_space_asset\` for storing output images → API routes for search and CRUD → DuckDB for advanced filtering and tag queries.`,
    monetization: `Free personal tool. Sell curated prompt packs via Stripe (\$9 for 100 tested prompts).`,
    difficulty: `Intermediate`,
  },
  {
    id: 26,
    name: `Open Source Alternatives Finder`,
    category: `Data/research tools`,
    description: `Enter a paid SaaS tool name. Zo searches GitHub, web, and comparison sites to find open-source alternatives, ranks them by stars/activity/features, and presents a comparison table. Saves results as a workspace markdown file. Updated monthly by a scheduled agent for tools you're tracking.`,
    howToBuild: `zo.space page with search input → API route calling \`web_research\` (category: github) + \`web_search\` → \`/zo/ask\` for comparison analysis → zo.space results page with comparison table → workspace markdown archive → scheduled agent (monthly) re-checking tracked tools for new alternatives.`,
    monetization: `Free tool for developer traffic. Affiliate links to hosting/services.`,
    difficulty: `Intermediate`,
  },
  {
    id: 27,
    name: `Markdown Resume Builder`,
    category: `Personal tools`,
    description: `Write your resume in markdown in your Zo workspace. A zo.space page renders it with professional typography, proper spacing, and print-friendly CSS. An API route generates a PDF version via Pandoc. Switch between 3-4 distinct visual themes. Always current — edit the markdown, the page updates.`,
    howToBuild: `Workspace markdown file for resume content → zo.space page rendering it with custom CSS (Newsreader for body, Syne for headings) → API route running \`pandoc\` to generate PDF → \`update_space_asset\` for the PDF → theme switcher via URL param → print stylesheet for direct browser printing.`,
    monetization: `Free. Offer custom theme design for \$49.`,
    difficulty: `Beginner`,
  },
  {
    id: 28,
    name: `Weekly Expense Report Generator`,
    category: `Personal tools`,
    description: `Forward receipts to your Zo email all week. Every Friday, a scheduled agent compiles them into a formatted expense report with categories, totals, and attached receipt images. Emails you the report as a PDF and saves it to Google Drive.`,
    howToBuild: `Scheduled agent (daily) polling Gmail for receipts → extract data via \`/zo/ask\` with image reading → workspace JSON accumulating the week's expenses → Friday scheduled agent compiling report → Pandoc for PDF generation → Google Drive integration to upload → \`send_email_to_user\` with summary.`,
    monetization: `Personal use. Template for freelancers (\$19).`,
    difficulty: `Intermediate`,
  },
  {
    id: 29,
    name: `Link-in-Bio Builder`,
    category: `Content/media`,
    description: `A single zo.space page at your root (\`/\`) that serves as your link-in-bio. Edit a workspace JSON file to update links, and the page reflects changes instantly. Tracks click counts via an API route. Custom design — not another Linktree clone with rounded rectangles.`,
    howToBuild: `zo.space public page at \`/\` → workspace JSON for link config → API route logging clicks before redirecting → click analytics stored in DuckDB → private analytics dashboard page → custom design with asymmetric layout, distinctive typography (Syne), and intentional color palette.`,
    monetization: `Free personal use. Sell custom designs for others (\$39 setup + \$5/mo hosting on their Zo).`,
    difficulty: `Beginner`,
  },
  {
    id: 30,
    name: `Competitor Blog Monitor`,
    category: `Data/research tools`,
    description: `Track RSS feeds or sitemaps of competitor blogs. When they publish something new, Zo summarizes it, identifies the target keywords, estimates the content strategy angle, and sends you a Telegram briefing. Weekly digest compares publishing frequency and topic trends across all competitors.`,
    howToBuild: `Scheduled agent (every 6 hours) → Bun script fetching RSS/sitemaps → \`read_webpage\` for new post content → \`/zo/ask\` for summary and keyword analysis → \`send_telegram_message\` for immediate alerts → DuckDB for historical tracking → weekly scheduled agent for trend analysis digest.`,
    monetization: `Personal/business use. Sell as a service to marketing teams (\$19/mo per 10 competitors).`,
    difficulty: `Intermediate`,
  },
  {
    id: 31,
    name: `Micro-Consulting Booking Page`,
    category: `Commerce`,
    description: `A public zo.space page advertising 30-minute consulting calls. Visitors select a time slot (pulled from your Google Calendar availability), pay via Stripe, and the event is auto-created on both calendars. You get an SMS confirmation with the buyer's details and any pre-call notes they submitted.`,
    howToBuild: `zo.space public page with time picker → Google Calendar integration for availability → Stripe payment link for booking → webhook API route handling \`checkout.session.completed\` → Google Calendar integration to create event → \`send_sms_to_user\` with booking details → confirmation email to buyer via Gmail.`,
    monetization: `Direct revenue. \$50-200 per session.`,
    difficulty: `Advanced`,
  },
  {
    id: 32,
    name: `GitHub Stars Tracker`,
    category: `Data/research tools`,
    description: `Track star counts for a list of GitHub repos over time. Scheduled agent logs daily counts to DuckDB. A zo.space page displays growth charts, highlights repos gaining momentum, and alerts you when a repo crosses a threshold (useful for spotting emerging tools before they blow up).`,
    howToBuild: `Scheduled agent (daily) → \`web_research\` (category: github) or direct GitHub API via Bun fetch → DuckDB dataset for time series → zo.space page with SVG sparkline charts → SMS alerts when repos cross configurable thresholds → workspace JSON for repo watchlist config.`,
    monetization: `Free tool. Curated "rising repos" newsletter via Stripe subscription (\$3/mo).`,
    difficulty: `Intermediate`,
  },
  {
    id: 33,
    name: `Invoice Generator`,
    category: `Commerce`,
    description: `Fill in a zo.space form: client name, line items, rates, tax. It generates a professional PDF invoice via Pandoc, saves it to your workspace, optionally emails it to the client via Gmail, and tracks payment status. A dashboard shows outstanding, paid, and overdue invoices.`,
    howToBuild: `zo.space private page with invoice form → API route generating invoice markdown → Pandoc for PDF → \`update_space_asset\` to serve the PDF → Gmail integration to send → DuckDB for invoice tracking (status, dates, amounts) → dashboard page with aging report → scheduled agent reminding you about overdue invoices via SMS.`,
    monetization: `Personal use. Sell template (\$29). Or charge per invoice (\$0.50) via Stripe.`,
    difficulty: `Intermediate`,
  },
  {
    id: 34,
    name: `Spotify Listening Journal`,
    category: `Personal tools`,
    description: `A scheduled agent logs your recently played Spotify tracks daily. Over time, builds a personal music history with listening patterns, top genres by month, and discovery timeline. A zo.space page shows your music journey — what you were listening to on any given date.`,
    howToBuild: `Scheduled agent (daily, evening) → Spotify integration for recently played → DuckDB dataset for listening history → zo.space private page with calendar view and genre breakdowns → monthly digest comparing listening habits → \`generate_d2_diagram\` for genre flow visualization.`,
    monetization: `Personal nostalgia tool. Publish yearly listening reports via zo.pub.`,
    difficulty: `Intermediate`,
  },
  {
    id: 35,
    name: `Freelancer Rate Calculator`,
    category: `Creative tools`,
    description: `A public zo.space calculator where freelancers input their desired salary, working hours, vacation days, expenses, and tax bracket. It calculates the hourly/project rate they should charge, with breakdowns and comparisons to industry averages pulled from BLS data. Shareable results URL.`,
    howToBuild: `zo.space public page with input form → client-side calculation logic in React → \`market-research\` skill for BLS wage data by occupation → shareable results via URL params → styled with distinctive design (not a generic calculator) → optional PDF export via API route + Pandoc.`,
    monetization: `Free tool driving traffic to a freelancing blog or community. Affiliate links to freelance platforms.`,
    difficulty: `Beginner`,
  },
  {
    id: 36,
    name: `Notion Backup System`,
    category: `Personal tools`,
    description: `Weekly scheduled agent exports your entire Notion workspace (or specific databases) to markdown files in your Zo workspace. Maintains folder structure, downloads images. You own your data independent of Notion. Diff reports show what changed week over week.`,
    howToBuild: `Scheduled agent (weekly) → Notion integration to list and fetch all pages → convert blocks to markdown → save to workspace maintaining Notion's hierarchy → Git-style diff against previous backup → \`send_telegram_message\` with change summary → zo.pub for shareable backups if desired.`,
    monetization: `Personal data sovereignty. Zo Skill template (\$19).`,
    difficulty: `Intermediate`,
  },
  {
    id: 37,
    name: `Local Business Directory`,
    category: `Local/community tools`,
    description: `A curated directory of businesses in your town or region. Not Yelp — a handpicked, opinionated guide by someone who actually lives there. Categories, short reviews, operating hours, map links. Businesses can pay for featured listings. Submit form for new businesses.`,
    howToBuild: `zo.space public pages (directory home, category pages, individual listings) → workspace JSON/DuckDB for business data → \`maps_search\` to verify details → submission form with API route → \`send_sms_to_user\` for new submissions → Stripe payment links for featured listings → scheduled agent verifying business hours monthly.`,
    monetization: `Featured listings \$10-25/mo per business. Affiliate links to booking/ordering platforms.`,
    difficulty: `Intermediate`,
  },
  {
    id: 38,
    name: `Color Palette Generator from Photos`,
    category: `Creative tools`,
    description: `Upload a photo. A Python script using PIL extracts the dominant colors via k-means clustering. Displays the palette with hex codes, Tailwind class names, WCAG contrast ratios for text combinations, and a preview of the palette applied to a sample UI component. Export as CSS variables.`,
    howToBuild: `zo.space page with image upload → API route saving image and calling Python script → \`pip install pillow scikit-learn\` for color extraction → return palette JSON → React page displaying swatches, contrast matrix, and live UI preview → copy buttons for hex/Tailwind/CSS → save favorites to workspace.`,
    monetization: `Free tool for designers. Premium: batch process multiple images (\$2/batch via Stripe).`,
    difficulty: `Intermediate`,
  },
  {
    id: 39,
    name: `Newsletter Landing Page Kit`,
    category: `Content/media`,
    description: `A conversion-optimized newsletter signup page on zo.space. Includes headline, value prop, social proof counter, and email capture form. Submissions are saved to a DuckDB subscriber list and forwarded to your Gmail. When you publish, a scheduled agent sends the latest post to all subscribers.`,
    howToBuild: `zo.space public page (custom design, not template) → API route for email capture → DuckDB subscriber table → double opt-in flow via Gmail integration → workspace markdown for newsletter drafts → scheduled agent for sending (Gmail batch, respecting rate limits) → unsubscribe API route → zo.space analytics page showing subscriber growth.`,
    monetization: `Build your audience. Sell premium tiers via Stripe (\$5/mo).`,
    difficulty: `Intermediate`,
  },
  {
    id: 40,
    name: `Git Commit Analyzer`,
    category: `Data/research tools`,
    description: `Point it at a public GitHub repo. It clones the repo, analyzes commit patterns (frequency, time of day, message quality, file churn), and generates a health report. Identifies bus factor, most active areas, stale files, and commit message consistency. Useful for evaluating open source projects before depending on them.`,
    howToBuild: `zo.space page with repo URL input → API route cloning repo to temp dir → Python/Bun script analyzing \`git log\` output → DuckDB for commit data aggregation → \`/zo/ask\` for qualitative analysis of commit messages → zo.space results page with charts and scores → clean up temp clone after analysis.`,
    monetization: `Free for public repos. \$3/analysis for private repos (authenticated via GitHub).`,
    difficulty: `Advanced`,
  },
  {
    id: 41,
    name: `Digital Product Delivery System`,
    category: `Commerce`,
    description: `Sell digital files (ebooks, templates, presets, datasets) through Stripe. On purchase, a webhook generates a unique, time-limited download link and emails it to the buyer. Tracks downloads per purchase. Product pages live on zo.space with previews and purchase buttons.`,
    howToBuild: `zo.space public product pages → Stripe payment links → webhook API route on \`checkout.session.completed\` → generate unique token, store in DuckDB with expiry → download API route validating token → workspace file storage for products → Gmail integration to email download link → admin dashboard showing sales and download counts.`,
    monetization: `Direct product sales. Keep 97%+ (only Stripe fees).`,
    difficulty: `Intermediate`,
  },
  {
    id: 42,
    name: `Daily Writing Prompt Generator`,
    category: `Creative tools`,
    description: `Every morning, a scheduled agent generates a unique writing prompt based on your configured genres/themes, drawing from a curated seed bank plus creative recombination. Sends it via SMS or Telegram. A zo.space page shows the full archive with a "write now" textarea that saves entries to your journal.`,
    howToBuild: `Scheduled agent (7am daily) → workspace JSON seed bank of themes, settings, constraints → \`/zo/ask\` with creative generation prompt → \`send_sms_to_user\` or \`send_telegram_message\` → zo.space page showing today's prompt and archive → API route saving writing entries to \`Persona/Journal/\` files.`,
    monetization: `Free personal use. Sell premium genre-specific prompt packs (\$5/mo).`,
    difficulty: `Beginner`,
  },
  {
    id: 43,
    name: `Tax Document Organizer`,
    category: `Personal tools`,
    description: `Forward tax-related documents (W-2s, 1099s, receipts, statements) to your Zo email year-round. A scheduled agent categorizes them, extracts key numbers, and files them in a structured workspace folder. Come tax time, you have a zo.space summary page with all documents organized by type and totals pre-calculated.`,
    howToBuild: `Scheduled agent (daily) → Gmail integration filtering tax-related emails → \`/zo/ask\` with document images/text for data extraction → workspace folder structure (\`Taxes/2026/W2/\`, \`Taxes/2026/1099/\`, etc.) → DuckDB for extracted financial data → zo.space private summary page with document links and running totals → zo.pub for sharing with your accountant.`,
    monetization: `Personal use. Skill template for freelancers (\$25).`,
    difficulty: `Intermediate`,
  },
  {
    id: 44,
    name: `Idea Capture → Linear Pipeline`,
    category: `Personal tools`,
    description: `Text an idea to your Zo number. A scheduled agent parses it, categorizes it (feature, bug, content, research), and creates a properly formatted Linear issue in the right project with appropriate labels. Reply "priority" to the confirmation SMS and it gets marked urgent. No more lost ideas.`,
    howToBuild: `Telegram/SMS → scheduled agent (every 15 min) checking for new messages → \`/zo/ask\` to categorize and structure the idea → Linear integration to create issue → \`send_sms_to_user\` with confirmation and issue link → workspace log for idea history.`,
    monetization: `Personal productivity. Package as a Zo Skill.`,
    difficulty: `Intermediate`,
  },
  {
    id: 45,
    name: `Public Bookshelf`,
    category: `Content/media`,
    description: `A curated, opinionated page of books you've read. Each entry has your rating, a short review (not a summary — your actual take), and genre tags. Searchable, filterable, sorted by "changed how I think" rather than star ratings. Add books by editing a workspace YAML file.`,
    howToBuild: `Workspace YAML/JSON file for book data → zo.space public page with custom design (Instrument Serif for titles, Newsreader for reviews) → filter by genre/rating/year → API route for search → \`web_research\` to auto-fill book metadata (cover image, author, year) when you add just a title → \`update_space_asset\` for cover images.`,
    monetization: `Affiliate links to Bookshop.org. Drives personal brand.`,
    difficulty: `Beginner`,
  },
  {
    id: 46,
    name: `Contract Template Library`,
    category: `Commerce`,
    description: `A collection of freelancer contract templates (NDA, SOW, service agreement, licensing) stored as markdown in your workspace. A zo.space form lets you fill in client-specific details, and an API route merges the template into a formatted PDF via Pandoc. Track which contracts are out and their signing status.`,
    howToBuild: `Workspace markdown templates with \`{{placeholder}}\` variables → zo.space private page with template selector and variable form → API route for merge + Pandoc PDF generation → \`update_space_asset\` for the PDF → Gmail integration to send → DuckDB tracking contract status → scheduled agent reminding about unsigned contracts.`,
    monetization: `Sell template packs via Stripe (\$19-49). Or free templates driving consulting leads.`,
    difficulty: `Intermediate`,
  },
  {
    id: 47,
    name: `Donation/Tip Page`,
    category: `Commerce`,
    description: `A clean, personal page for accepting tips or donations for your open source work, writing, or community projects. Custom amounts, a thank-you message, and a public supporter wall (opt-in). Not Ko-fi — yours, with zero platform fees beyond Stripe's cut.`,
    howToBuild: `zo.space public page with amount selector → Stripe payment link integration → webhook API route logging donations to DuckDB → optional public supporter wall (names of those who opt in) → \`send_sms_to_user\` on each donation → thank-you email via Gmail → monthly revenue summary on a private dashboard page.`,
    monetization: `Direct donations/tips. 97%+ goes to you.`,
    difficulty: `Beginner`,
  },
  {
    id: 48,
    name: `Research Paper Summarizer`,
    category: `Data/research tools`,
    description: `Paste an arXiv URL or upload a PDF. Zo extracts the full text, generates a structured summary (problem, approach, key findings, limitations, relevance to your field), and saves it to a searchable research library in your workspace. Batch-process a reading list overnight.`,
    howToBuild: `zo.space page with URL/upload input → \`read_webpage\` for arXiv or \`read_file\` for PDF → \`/zo/ask\` with academic summarization prompt → workspace markdown per paper → DuckDB index for search → zo.space library page with search and tag filtering → scheduled agent for batch processing a URL list overnight.`,
    monetization: `Personal research tool. Sell access to curated summaries by field (\$5/mo).`,
    difficulty: `Intermediate`,
  },
  {
    id: 49,
    name: `Emergency Contact Card`,
    category: `Local/community tools`,
    description: `A mobile-optimized zo.space page with your critical emergency information: blood type, allergies, medications, emergency contacts, doctor info, insurance. Password-protected but accessible from your phone's home screen. Updated by editing a workspace file. Potentially life-saving.`,
    howToBuild: `zo.space private page (bearer-auth) → workspace JSON for medical data → mobile-optimized responsive design → large, high-contrast typography for readability in emergencies → QR code generation (via \`generate-custom-qr-code\` skill) linking to the page → printable card version via API route.`,
    monetization: `Free. One of those tools that justifies the entire platform.`,
    difficulty: `Beginner`,
  },
  {
    id: 50,
    name: `Weekly Wins Journal`,
    category: `Personal tools`,
    description: `Every Friday at 4pm, Zo texts you: "What were your wins this week?" You reply with a few bullet points. The agent saves them to a dated workspace file, appends them to a running DuckDB log, and once a month generates a "month in review" summary. Tracks patterns in what you accomplish. An antidote to feeling like you're not making progress.`,
    howToBuild: `Scheduled agent (Friday 4pm) → \`send_sms_to_user\` with prompt → monitor for reply (second agent or check within window) → save to \`Persona/Journal/wins/YYYY-MM-DD.md\` → DuckDB for searchable win history → monthly scheduled agent synthesizing wins via \`/zo/ask\` → \`send_email_to_user\` with monthly review → zo.space private page showing win timeline.`,
    monetization: `Personal tool. Soul-level ROI.`,
    difficulty: `Beginner`,
  },
  {
    id: 51,
    name: `Permit Pulse`,
    category: `Civic/public interest`,
    description: `Scrapes your county's building permit feed daily and alerts you when new permits are filed within a radius of your address. See who's building what next door before the bulldozers show up. Displays a map view with permit details, contractor info, and project scope.`,
    howToBuild: `Scheduled agent fetches county permit RSS/API daily, geocodes addresses with a free geocoding API, filters by radius, stores in DuckDB dataset. zo.space page renders the map using Leaflet. SMS alert for permits within 500ft.`,
    monetization: `Freemium — free for your own address, paid tier for real estate investors monitoring multiple zones (\$5/mo)`,
    difficulty: `Intermediate`,
  },
  {
    id: 52,
    name: `Therapy Session Prep`,
    category: `Niche professional tools (therapists)`,
    description: `A private intake form that clients fill out before each session. Collects mood rating, what happened since last session, what they want to focus on today. Therapist gets a formatted summary emailed 30 minutes before the appointment, with flags for crisis language.`,
    howToBuild: `zo.space page route for the client-facing form (public, no auth needed — uses a unique per-client token in the URL). API route stores submissions as markdown files. Scheduled agent checks Google Calendar for upcoming therapy appointments, matches client tokens, emails the therapist a summary via Gmail integration. Crisis keyword detection runs in the API route handler.`,
    monetization: `\$10/mo per therapist — saves 15 minutes per session`,
    difficulty: `Intermediate`,
  },
  {
    id: 53,
    name: `Tide Table + Bite Forecast`,
    category: `Hobby/passion tools (fishing)`,
    description: `Combines NOAA tide data, lunar phase, barometric pressure trends, and water temperature for your specific fishing spots. Outputs a daily "bite score" from 1-10 with reasoning. Texts you at 5am if tomorrow scores 8+.`,
    howToBuild: `Scheduled agent pulls NOAA CO-OPS tide API, Open-Meteo weather API, and moon phase calculations (Python ephem library). Stores historical scores in DuckDB. zo.space page shows the week ahead with tide charts rendered via a canvas component. SMS integration for high-score alerts.`,
    monetization: `Free for one location, \$3/mo for unlimited spots + historical bite correlation data`,
    difficulty: `Intermediate`,
  },
  {
    id: 54,
    name: `Garage Sale Autopilot`,
    category: `Niche professional tools (resellers/flippers)`,
    description: `You photograph items, it generates titles, descriptions, and suggested prices based on eBay sold listings. Produces a printable price tag sheet, a Craigslist-ready post, and a shareable catalog page for texting to neighbors.`,
    howToBuild: `zo.space API route accepts image uploads, uses AI to identify items and generate copy. Web research agent checks eBay sold prices for comps. zo.space page route renders the catalog with grid layout. Generate printable PDF price tags via a Bun script using pdf-lib. Share link via SMS.`,
    monetization: `Free tier (10 items), \$5 one-time for unlimited items per sale event`,
    difficulty: `Intermediate`,
  },
  {
    id: 55,
    name: `The Dead Internet Detector`,
    category: `Weird/experimental`,
    description: `Paste any URL and it scores how "alive" the content feels — checking for AI-generated text patterns, stock photo fingerprints, engagement-to-follower ratios, and comment authenticity signals. Returns a "Dead Internet Score" from 0-100 with a breakdown of what triggered each flag.`,
    howToBuild: `zo.space page with URL input. API route fetches the page via read_webpage, runs heuristic analysis (sentence structure entropy, cliché density, image reverse-search via web_search, comment sentiment uniformity). Stores results in workspace files for trend tracking. Could add a browser extension endpoint.`,
    monetization: `Free public tool — monetize through attention/audience building, affiliate to privacy tools`,
    difficulty: `Advanced`,
  },
  {
    id: 56,
    name: `Plot Garden Companion`,
    category: `Hobby/passion tools (gardening)`,
    description: `You draw your garden bed layout on a grid, drop in plants, and it tells you what's companion-planted wrong, what's too close, what needs more sun based on your bed's orientation, and generates a watering/fertilizing schedule synced to your local weather forecast.`,
    howToBuild: `zo.space site with interactive grid (React state + canvas or SVG). Plant database stored as a JSON asset. API route calculates spacing, companion conflicts, and sun exposure from bed orientation input. Scheduled agent pulls Open-Meteo forecast weekly, adjusts watering schedule, sends SMS reminders. Google Calendar integration for planting/harvest dates.`,
    monetization: `Free for one bed, \$4/mo for unlimited beds + weather-adjusted schedules`,
    difficulty: `Advanced`,
  },
  {
    id: 57,
    name: `Invoice Shame Clock`,
    category: `Niche professional tools (freelancers)`,
    description: `Tracks unpaid invoices and displays a live "time since invoice sent" counter on a private dashboard. At configurable intervals (7, 14, 30 days), it drafts progressively firmer follow-up emails in your voice and queues them for your approval. The dashboard shows total outstanding, average days-to-pay per client, and a "worst offenders" leaderboard.`,
    howToBuild: `zo.space page for the dashboard. Invoice data stored in DuckDB (manual entry via form or CSV import). Scheduled agent checks daily for overdue invoices, drafts follow-up emails, sends you a Telegram message with the draft for approval. On approval, sends via Gmail. Tracks payment dates to build client reliability scores over time.`,
    monetization: `Free for 5 clients, \$8/mo for unlimited + payment analytics`,
    difficulty: `Intermediate`,
  },
  {
    id: 58,
    name: `Bird Call Identifier Journal`,
    category: `Hobby/passion tools (birdwatching)`,
    description: `Upload audio recordings from your morning walk. It transcribes the audio, isolates bird call segments by frequency analysis, cross-references with regional species databases for your GPS coordinates and time of year, and builds a personal life list with date/location/recording for each species.`,
    howToBuild: `zo.space upload form → API route saves audio to workspace. Python script using librosa for frequency analysis and segmentation. Web research for species matching against eBird/Xeno-canto regional data. DuckDB dataset for the life list. zo.space page renders the journal with embedded audio players and species cards. Transcribe_audio for any spoken field notes in the recording.`,
    monetization: `Free personal tool — sell as a template for \$15`,
    difficulty: `Advanced`,
  },
  {
    id: 59,
    name: `The Landlord Paper Trail`,
    category: `Civic/public interest`,
    description: `A structured log for renters to document maintenance requests, landlord responses (or non-responses), and lease violations. Timestamps everything, stores photos, generates a formatted PDF "evidence packet" ready for tenant's rights organizations or small claims court. Privately hosted — your landlord never sees it.`,
    howToBuild: `zo.space private page with forms for logging incidents (text + image upload via space assets). DuckDB for structured data. API route generates a PDF evidence packet using pdf-lib with chronological entries and embedded images. All data stays on the user's personal server. SMS integration to log quick entries ("Texted landlord about leak, no response").`,
    monetization: `Free — civic tool. Monetize through donations or a "pro" version that auto-sends certified mail reminders`,
    difficulty: `Intermediate`,
  },
  {
    id: 60,
    name: `Recipe Scaler + Substitution Engine`,
    category: `Hobby/passion tools (cooking)`,
    description: `Paste any recipe URL. It extracts ingredients and steps, lets you scale to any serving size with proper ratio adjustments (not just linear — it knows you don't double the salt when you double a cake), and suggests substitutions for allergens or missing ingredients based on what's actually in your pantry (which you maintain as a simple list).`,
    howToBuild: `zo.space page with URL input. API route uses read_webpage to fetch recipe, AI extraction for structured ingredient/step parsing. Pantry stored as a workspace markdown file editable via a zo.space form. Scaling logic in TypeScript with non-linear adjustment rules for leaveners, salt, spices. Substitution database as a JSON asset.`,
    monetization: `Free — audience builder. Add Stripe tip jar or "buy me ingredients" payment link`,
    difficulty: `Intermediate`,
  },
  {
    id: 61,
    name: `Mechanic's Diagnostic Notepad`,
    category: `Niche professional tools (mechanics)`,
    description: `A voice-first diagnostic tool. Mechanic describes symptoms into their phone, it transcribes and cross-references against TSB (Technical Service Bulletin) databases and common failure patterns for that year/make/model. Returns ranked probable causes with repair time estimates and parts needed.`,
    howToBuild: `zo.space page with audio recording via browser MediaRecorder API. API route saves audio, transcribe_audio extracts text. Web research agent searches for TSBs and known issues for the specified vehicle. Results rendered on the same page. DuckDB stores diagnostic history per vehicle VIN for pattern tracking across visits.`,
    monetization: `\$15/mo per shop — saves diagnostic time and catches things mechanics might miss`,
    difficulty: `Advanced`,
  },
  {
    id: 62,
    name: `Neighborhood Noise Map`,
    category: `Civic/public interest`,
    description: `Residents submit noise complaints with location, time, type (construction, barking, bass, traffic), and severity. Builds a heat map over time showing noise patterns by hour and day. Useful for people apartment-hunting or filing complaints with city council with actual data.`,
    howToBuild: `zo.space public page with a submission form (no login required). DuckDB dataset for complaint storage. zo.space page renders a Leaflet heat map with time-of-day filtering. Scheduled agent generates weekly summary reports. Could integrate with local government complaint APIs where available.`,
    monetization: `Free civic tool. Sponsored by real estate agents who want to show "quiet" neighborhoods`,
    difficulty: `Intermediate`,
  },
  {
    id: 63,
    name: `The Fridge Door`,
    category: `Weird/experimental`,
    description: `A digital fridge door for your family or friend group. People can pin notes, drawings, photos, and magnets to a shared virtual fridge surface. Items decay and yellow over time like real paper. You can "magnet" important things to keep them pinned. No accounts — just a shared link and a name.`,
    howToBuild: `zo.space page with drag-and-drop positioning (React DnD or pointer events). Items stored via API route in workspace JSON files. CSS filters for aging effects based on timestamp. Image uploads via space assets. Real-time-ish updates via polling (no WebSocket needed — check every 30 seconds). Each fridge gets a unique URL path.`,
    monetization: `Free — viral sharing tool. Premium fridges with custom backgrounds and more pins for \$2/mo`,
    difficulty: `Intermediate`,
  },
  {
    id: 64,
    name: `Grant Deadline Tracker`,
    category: `Niche professional tools (nonprofits/artists)`,
    description: `Aggregates grant deadlines from foundations relevant to your field (arts, social justice, community development, etc.) by scraping foundation websites weekly. Shows upcoming deadlines in a calendar view with eligibility requirements, award amounts, and direct links. Sends reminders 30 and 7 days before deadlines.`,
    howToBuild: `Scheduled agent uses web_research weekly to find grant deadlines for configured categories. DuckDB stores grant data. zo.space page renders a calendar view with filters by field, amount, and deadline. Google Calendar integration adds deadlines. SMS/email reminders via scheduled agent.`,
    monetization: `Free for one category, \$8/mo for all categories + personalized eligibility matching`,
    difficulty: `Intermediate`,
  },
  {
    id: 65,
    name: `Dungeon Master's Session Recorder`,
    category: `Hobby/passion tools (tabletop gaming)`,
    description: `Record your D&D session audio. It transcribes the whole thing, identifies speakers, extracts key plot points, NPC interactions, loot acquired, and combat outcomes. Generates a "session recap" in narrative prose and a structured data update (HP changes, inventory, quest log) that players can reference next session.`,
    howToBuild: `Upload audio to zo.space. transcribe_audio with speaker diarization. AI processes transcript to extract structured game events. zo.space page shows the narrative recap and structured data side by side. Campaign state stored in workspace markdown files that update incrementally. Players access via a shared public zo.space page.`,
    monetization: `Free for 3 sessions/mo, \$5/mo unlimited. Sell premium "narrator voice" recap styles`,
    difficulty: `Advanced`,
  },
  {
    id: 66,
    name: `Contractor Quote Comparator`,
    category: `Niche professional tools (homeowners/property managers)`,
    description: `Upload photos of contractor quotes (often handwritten or PDF). It extracts line items, normalizes them into comparable categories, and displays a side-by-side comparison showing where each contractor is higher or lower. Flags suspiciously low bids and missing line items that might become change orders.`,
    howToBuild: `zo.space page with multi-file upload. API route processes images via AI vision extraction for line items and amounts. Stores parsed quotes in DuckDB. Comparison page renders a table with color-coded price differences. Web research checks average costs for each line item in the user's zip code for reality-checking.`,
    monetization: `Free for 2 quotes, \$3 per additional comparison. Or \$10/mo for property managers`,
    difficulty: `Intermediate`,
  },
  {
    id: 67,
    name: `Plant Obituary Garden`,
    category: `Weird/experimental`,
    description: `A memorial site for houseplants that didn't make it. Upload a photo of your dead plant, write a short eulogy, and it gets a headstone in a procedurally generated cemetery garden. Visitors can leave flowers (emoji reactions). The cemetery grows over time as more plants are memorialized. Surprisingly cathartic.`,
    howToBuild: `zo.space public page. Submission form uploads photo (space asset) and eulogy text. API route stores entries and assigns a plot position in the garden grid. Cemetery rendered with CSS grid and subtle animations (wilting flowers, gentle wind). Each headstone links to the full memorial. Reactions stored in DuckDB.`,
    monetization: `Free — viral/shareable. Premium custom headstone styles for \$1 each via Stripe`,
    difficulty: `Beginner`,
  },
  {
    id: 68,
    name: `Open Source License Audit`,
    category: `Developer tools`,
    description: `Point it at a GitHub repo URL. It clones the repo, parses every dependency tree (package.json, Cargo.toml, requirements.txt, go.mod), resolves transitive dependencies, and generates a license compatibility report. Flags GPL contamination in MIT projects, missing license files, and AGPL landmines.`,
    howToBuild: `zo.space API route accepts a repo URL. Bash script clones the repo to a temp directory, runs language-specific dependency resolution (npm ls, pip-licenses, cargo-license). Python script aggregates and cross-references license types against a compatibility matrix (stored as JSON asset). zo.space page renders the report with severity levels.`,
    monetization: `Free for public repos, \$10/mo for private repo scanning via GitHub token`,
    difficulty: `Advanced`,
  },
  {
    id: 69,
    name: `Real Estate Comp Analyzer`,
    category: `Niche professional tools (real estate agents)`,
    description: `Enter an address. It pulls recent sales data from public county records, calculates price-per-sqft for comparable properties within configurable radius and date range, adjusts for bedroom/bathroom count, lot size, and year built. Generates a one-page PDF comp report branded with the agent's logo — the kind of thing that normally costs \$50/report from a service.`,
    howToBuild: `Scheduled agent scrapes county assessor/recorder sites (varies by county — browser automation for the ones without APIs). DuckDB dataset for property records. zo.space page with address input and filter controls. API route runs the comp algorithm and generates a branded PDF via pdf-lib. Agent's logo uploaded as a space asset.`,
    monetization: `\$20/mo per agent — cheaper than per-report services`,
    difficulty: `Advanced`,
  },
  {
    id: 70,
    name: `Sourdough Starter Log`,
    category: `Hobby/passion tools (baking)`,
    description: `Track your sourdough starter's feeding schedule, hydration ratio, ambient temperature, rise times, and bake outcomes. Over time, it correlates your best loaves with specific feeding patterns and conditions. Sends feeding reminders at your preferred schedule. Generates a "starter profile" showing its personality — when it's most active, what flour ratios it prefers, seasonal patterns.`,
    howToBuild: `zo.space page with quick-entry form (optimized for phone — big buttons, minimal fields). DuckDB for all data points. Scheduled agent sends SMS feeding reminders. Analytics page shows correlation charts (rise time vs temperature, hydration vs crumb quality). Open-Meteo integration for automatic temperature logging.`,
    monetization: `Free — sell as a template for \$8. Or bundle with a sourdough course`,
    difficulty: `Beginner`,
  },
  {
    id: 71,
    name: `Meeting Cost Calculator (Live)`,
    category: `Developer tools / professional`,
    description: `A live dashboard that shows the running cost of the current meeting based on attendee salaries (or estimates by title). Share the URL in Zoom chat. Displays a ticking dollar counter, cost-per-minute, and "this meeting has cost more than [relatable comparison]" milestones. Passive-aggressive productivity theater that actually works.`,
    howToBuild: `zo.space public page with a form to configure meeting (number of attendees, average salary or individual titles). Salary estimates via BLS data (market-research skill). React component with a ticking counter using requestAnimationFrame. Shareable URL with meeting config encoded in the path or query params. No persistence needed — runs entirely client-side after initial config.`,
    monetization: `Free viral tool. Premium: integrates with Google Calendar to auto-populate attendee count and estimate costs for all meetings this week`,
    difficulty: `Beginner`,
  },
  {
    id: 72,
    name: `Trail Conditions Aggregator`,
    category: `Hobby/passion tools (hiking/mountain biking)`,
    description: `Monitors trail condition reports from AllTrails, MTBProject, local ranger district sites, and social media for your saved trails. Aggregates into a single dashboard showing current conditions, recent reports, snow level, and fire/closure alerts. Texts you Saturday morning with a "best trails this weekend" pick based on conditions and weather.`,
    howToBuild: `Scheduled agent runs daily: browser automation for AllTrails/MTBProject condition pages, web_search for ranger district updates, x_search for social media reports. DuckDB stores condition data by trail. zo.space page renders dashboard with trail cards sorted by current quality score. Saturday SMS via scheduled agent combines conditions with Open-Meteo weekend forecast.`,
    monetization: `Free for 5 trails, \$5/mo unlimited + weekend picks`,
    difficulty: `Intermediate`,
  },
  {
    id: 73,
    name: `Mic Check (Podcast Audio QA)`,
    category: `Developer tools / creator tools`,
    description: `Upload a podcast recording before publishing. It analyzes audio levels, detects clipping, flags sections where one speaker is significantly quieter than another, finds long silences, identifies mouth clicks and background noise spikes, and generates a timestamped QA report with severity levels. Catches problems before your audience does.`,
    howToBuild: `zo.space upload form. Python script using librosa and numpy for audio analysis: RMS levels per speaker segment, peak detection, silence detection, spectral analysis for clicks/noise. Transcribe_audio for speaker identification. Results stored in workspace, rendered on zo.space page as a timeline with flagged segments. Direct links to timestamp positions.`,
    monetization: `Free for episodes under 30 min, \$5/mo unlimited`,
    difficulty: `Advanced`,
  },
  {
    id: 74,
    name: `Council Vote Tracker`,
    category: `Civic/public interest`,
    description: `Monitors your city council's voting records by scraping meeting minutes and agendas. Shows how each council member voted on every issue, tracks voting patterns, flags when they vote against their stated platform positions, and sends you alerts when topics you care about (housing, parks, zoning) are on the agenda.`,
    howToBuild: `Scheduled agent scrapes city council website weekly (browser automation — most council sites are badly built). AI extracts vote records and agenda items from PDFs/HTML. DuckDB stores voting data by member and topic. zo.space page with member profiles, voting history, and topic filters. Email alerts via Gmail for agenda items matching user's interests.`,
    monetization: `Free civic tool. Could be sponsored by local news outlets`,
    difficulty: `Advanced`,
  },
  {
    id: 75,
    name: `Font Pairing Playground`,
    category: `Developer tools / design`,
    description: `Enter a mood, brand description, or reference URL. It generates 5 typographic pairings (display + body) with live preview text, size/weight recommendations, and CSS/Tailwind snippets ready to copy. Uses Google Fonts API so everything is free and production-ready. Remembers your favorites and learns your taste over time.`,
    howToBuild: `zo.space page that loads Google Fonts dynamically. API route takes the mood/description input, AI selects pairings from a curated database (JSON asset of 200+ font combinations with mood tags). Preview renders live with adjustable size, weight, and sample text. Favorites stored in DuckDB. The learning component re-ranks suggestions based on save patterns.`,
    monetization: `Free — audience builder for a design-focused brand. Premium: export as Figma tokens or design system starter`,
    difficulty: `Intermediate`,
  },
  {
    id: 76,
    name: `Sleep Debt Ledger`,
    category: `Health/wellness`,
    description: `Log your bedtime and wake time daily (via SMS — just text "slept 11-7" or "bed 1am up 8am"). It calculates your running sleep debt against your target, shows weekly/monthly trends, and correlates your self-reported energy levels with actual sleep data. When debt exceeds a threshold, it blocks your evening calendar and texts you "go to bed."`,
    howToBuild: `SMS parsing via scheduled agent (or inbound message handling). DuckDB for sleep data. zo.space private dashboard with charts. Google Calendar integration to check/block evening events when sleep debt is high. Scheduled agent for bedtime reminders calibrated to your target. Weekly email summary via Gmail.`,
    monetization: `Free personal tool, sell as a template for \$5`,
    difficulty: `Beginner`,
  },
  {
    id: 77,
    name: `Stash Spot (Private Dead Drop)`,
    category: `Weird/experimental`,
    description: `Create encrypted dead drops at URLs that self-destruct after being read once (or after a time limit). No accounts, no logs. The content is encrypted client-side before hitting the server — even Zo can't read it. The URL is the only key. Perfect for sharing passwords, sensitive info, or secret messages.`,
    howToBuild: `zo.space page with client-side AES encryption (Web Crypto API). The encryption key is appended as a URL fragment (never sent to server). API route stores only the encrypted blob with a UUID and read/expiry flag. On first read, returns the blob and deletes it. Cleanup agent removes expired drops hourly.`,
    monetization: `Free — include a "powered by Zo" footer. Premium: file attachments, custom expiry times`,
    difficulty: `Intermediate`,
  },
  {
    id: 78,
    name: `Teacher's Rubric Generator`,
    category: `Niche professional tools (teachers)`,
    description: `Describe an assignment in plain language ("persuasive essay about climate change, 9th grade, 5 paragraphs"). It generates a detailed scoring rubric aligned to Common Core standards with criteria, point values, and exemplar descriptions for each performance level. Exports as a printable PDF or Google Docs format.`,
    howToBuild: `zo.space page with assignment description form (grade level, subject, type, length). API route generates rubric using AI with Common Core standards reference data (stored as JSON assets). PDF generation via pdf-lib. Google Drive integration to export directly to the teacher's Drive. DuckDB stores generated rubrics for reuse and modification.`,
    monetization: `Free for 5 rubrics/mo, \$6/mo unlimited + rubric library`,
    difficulty: `Beginner`,
  },
  {
    id: 79,
    name: `Vintage Price Oracle`,
    category: `Hobby/passion tools (collectors/thrifters)`,
    description: `Photograph a vintage item at a thrift store. It identifies the item, era, maker marks, and cross-references current market prices from eBay sold listings, Etsy, and collector forums. Returns a "buy/skip" verdict with price range and resale potential. Tracks your finds and running profit/loss.`,
    howToBuild: `zo.space page optimized for mobile camera input. API route processes image via AI for identification, then web_research for current market prices across platforms. Results page shows price comps with links. DuckDB tracks your purchases (cost) and sales (revenue) for P&L. Weekly email digest of your best finds.`,
    monetization: `Free for 10 lookups/mo, \$8/mo unlimited + profit tracking`,
    difficulty: `Intermediate`,
  },
  {
    id: 80,
    name: `Argument Mapper`,
    category: `Weird/experimental`,
    description: `Paste any opinion piece, editorial, or Twitter thread. It diagrams the argument structure — claims, evidence, logical fallacies, unsupported assertions, and rhetorical techniques. Outputs a visual node graph showing how the argument holds together (or doesn't). Not political bias detection — structural analysis.`,
    howToBuild: `zo.space page with text/URL input. API route fetches content (read_webpage for URLs), AI decomposes the argument into structured nodes (claim, evidence, inference, fallacy) with relationships. D2 diagram generation for the visual graph. zo.space page renders the interactive diagram. Could also show a "strength score" for each claim based on evidence backing.`,
    monetization: `Free — educational tool. Premium: batch analysis, save history, export for academic citation`,
    difficulty: `Intermediate`,
  },
  {
    id: 81,
    name: `Appliance Lifespan Tracker`,
    category: `Niche professional tools (homeowners/property managers)`,
    description: `Register your home appliances with make, model, and purchase/install date. It pulls average lifespan data, maintenance schedules, and common failure patterns. Sends you alerts when an appliance is approaching end-of-life so you can budget for replacement. Tracks maintenance history and warranty expiration.`,
    howToBuild: `zo.space private page with appliance registry form. Web research for lifespan data and common issues by make/model. DuckDB stores appliance data, maintenance logs, and lifespan estimates. Scheduled agent checks monthly for upcoming expirations and maintenance due dates. SMS/email alerts. Google Calendar integration for maintenance reminders.`,
    monetization: `Free for 10 appliances, \$4/mo for unlimited + replacement cost budgeting`,
    difficulty: `Beginner`,
  },
  {
    id: 82,
    name: `Dialect Translator`,
    category: `Weird/experimental`,
    description: `Paste text and translate it between English dialects and registers — academic to casual, Southern to Midwestern, corporate to human, legal to plain English, British to American. Not a joke translator — a genuine register-shifting tool that preserves meaning while changing voice. Useful for writers, immigrants navigating code-switching, and anyone who's gotten a legal letter they can't parse.`,
    howToBuild: `zo.space page with text input and dialect/register dropdowns. API route handles the translation via AI with carefully crafted system prompts for each register (stored as text assets — one per dialect). Side-by-side display of original and translated text with highlighted changes. Saved translations in DuckDB.`,
    monetization: `Free — viral sharing potential. Premium: API access for apps, bulk translation`,
    difficulty: `Beginner`,
  },
  {
    id: 83,
    name: `Mutual Aid Board`,
    category: `Civic/public interest`,
    description: `A hyperlocal mutual aid board for your neighborhood. People post what they need (ride to doctor, help moving, meals during illness) and what they can offer (lawn mower, truck, time). No accounts — just name and contact. Posts expire after 14 days. Designed to be printed as a QR code flyer for laundromats and coffee shops.`,
    howToBuild: `zo.space public page with post/offer forms. API route stores listings in workspace JSON files with expiry timestamps. Cleanup agent removes expired posts daily. QR code generation (generate-custom-qr-code skill) pointing to the board URL. Responsive design optimized for phone. Optional SMS notification when someone responds to your post.`,
    monetization: `Free — community tool. Could accept donations via Stripe tip jar`,
    difficulty: `Beginner`,
  },
  {
    id: 84,
    name: `Screenplay Formatter`,
    category: `Developer tools / creator tools`,
    description: `Write your screenplay in plain markdown. It converts to industry-standard screenplay format (Courier 12pt, proper margins, scene headings, action lines, dialogue with character cues). Exports as a properly formatted PDF that won't get your script thrown out for looking amateur. Handles sluglines, parentheticals, transitions, and dual dialogue.`,
    howToBuild: `zo.space page with a markdown editor (textarea with preview). API route parses the markdown using pattern matching for screenplay elements (INT./EXT. for sluglines, character names in caps before dialogue, etc.). PDF generation via a Python script using reportlab with exact screenplay format specs (1.5" left margin, 1" right, Courier). Stored scripts in workspace for versioning.`,
    monetization: `Free for scripts under 30 pages, \$5/mo unlimited + revision tracking`,
    difficulty: `Intermediate`,
  },
  {
    id: 85,
    name: `Ingredient Conflict Checker`,
    category: `Health/wellness`,
    description: `Photograph a supplement bottle or food label. It extracts all ingredients, cross-references them against your medication list and health conditions (which you maintain privately), and flags known interactions, contraindications, and allergen overlaps. Sources its warnings from NIH, Mayo Clinic, and FDA databases.`,
    howToBuild: `zo.space private page with camera input for label photos. AI vision extracts ingredient lists. User's medication/condition profile stored in encrypted workspace file. Web research cross-references against NIH DailyMed, drug interaction databases. API route returns a traffic-light report (green/yellow/red per ingredient). DuckDB logs checked products for quick re-lookup.`,
    monetization: `Free for personal use — the liability concerns make commercial monetization tricky. Sell as a self-hosted template with medical disclaimer for \$15`,
    difficulty: `Intermediate`,
  },
  {
    id: 86,
    name: `Band Merch Profit Calculator`,
    category: `Niche professional tools (musicians)`,
    description: `Input your merch items (t-shirts, vinyl, stickers), unit costs, and selling prices. It calculates break-even quantities, profit margins, and optimal pricing. Simulates different show sizes and sell-through rates. Tracks actual sales per show and adjusts projections based on your real data. Tells you which merch items to drop and which to reorder.`,
    howToBuild: `zo.space page with product entry form and show-logging form. DuckDB stores products, costs, and per-show sales data. Dashboard shows margin analysis, break-even charts, and trend lines. Scheduled agent sends a pre-show reminder to restock items running low. Post-show SMS prompt to log sales ("How many shirts did you sell tonight?").`,
    monetization: `Free — audience builder for music industry brand. Premium: multi-band support for managers`,
    difficulty: `Beginner`,
  },
  {
    id: 87,
    name: `DNS Propagation Watcher`,
    category: `Developer tools`,
    description: `Enter a domain and DNS record type. It checks propagation status across 20+ global DNS resolvers every 5 minutes and sends you a notification when propagation is complete (or if it stalls). Shows a world map with green/red dots for each resolver. Because refreshing whatsmydns.net for an hour is not how you should spend your life.`,
    howToBuild: `Scheduled agent runs dig queries against a list of global resolvers (stored as JSON asset). DuckDB tracks propagation state over time. zo.space page shows the live status map (SVG world map with colored dots). SMS notification when all resolvers agree. Auto-stops monitoring after 48 hours or full propagation.`,
    monetization: `Free — dev tool for audience building. Premium: monitoring for multiple domains, historical propagation times`,
    difficulty: `Intermediate`,
  },
  {
    id: 88,
    name: `Grief Timeline`,
    category: `Health/wellness`,
    description: `A private journaling space structured around grief — not generic journaling, but specifically designed for loss. Prompts adapt to where you are in the process. Tracks hard dates (anniversaries, birthdays, holidays) and sends gentle check-ins around them. Never tries to fix anything. Just holds space and keeps a record you can look back on.`,
    howToBuild: `zo.space private page with a warm, minimal design (deliberate typography and muted palette). DuckDB stores journal entries with date and optional mood tag. Scheduled agent watches for approaching hard dates and sends a simple SMS check-in. Prompts rotate based on time since loss and previous entries (not a chatbot — just a prompt at the top of the page). All data stays on personal server.`,
    monetization: `Free — this shouldn't be monetized. Open source the template`,
    difficulty: `Beginner`,
  },
  {
    id: 89,
    name: `FOIA Request Generator`,
    category: `Civic/public interest`,
    description: `Select a government agency (federal, state, or local), describe what records you want in plain language, and it generates a properly formatted FOIA/public records request with the correct legal citations, agency-specific requirements, fee waiver language, and the right mailing/email address. Tracks your requests and follow-up deadlines.`,
    howToBuild: `zo.space page with agency selector and plain-language description input. API route uses AI with a reference database of FOIA requirements by agency (federal agencies + 50 state laws — stored as JSON assets, seeded via web research). Generates the request letter as downloadable PDF. DuckDB tracks submitted requests with statutory response deadlines. Scheduled agent sends follow-up reminders.`,
    monetization: `Free civic tool. Could offer a "journalist pro" tier with batch requests and response tracking`,
    difficulty: `Intermediate`,
  },
  {
    id: 90,
    name: `Color Palette From Place`,
    category: `Weird/experimental / design`,
    description: `Enter a place name — "Salmon, Idaho in October" or "Tokyo subway at rush hour" or "a Norwegian fjord in winter." It generates a 5-color palette extracted from the dominant visual character of that place, with hex codes, Tailwind classes, and a mood description. Uses image search and color analysis, not random generation.`,
    howToBuild: `zo.space page with place input. API route uses image_search to find representative photos, downloads them, runs Python color extraction (colorthief or sklearn KMeans on pixel data) to pull dominant colors. AI writes the mood description. zo.space page renders swatches with copy-to-clipboard hex/tailwind values. DuckDB stores generated palettes for a browsable gallery.`,
    monetization: `Free — designer audience builder. Premium: export as design tokens, Figma plugin, ASE files`,
    difficulty: `Intermediate`,
  },
  {
    id: 91,
    name: `Bail Fund Tracker`,
    category: `Civic/public interest`,
    description: `A transparent dashboard for community bail funds showing total raised, total disbursed, number of people helped, and fund balance. Accepts donations via Stripe, sends receipts, and publishes a monthly transparency report automatically. Designed so small mutual aid groups don't need to build their own infrastructure.`,
    howToBuild: `zo.space public page with Stripe integration for donations. DuckDB tracks transactions. API route handles Stripe webhooks for payment confirmation. Scheduled agent generates monthly transparency report (markdown → PDF), emails it to subscribers via Gmail, and publishes to the dashboard. Admin page (private) for logging disbursements.`,
    monetization: `Free — take no cut. This is infrastructure for mutual aid`,
    difficulty: `Intermediate`,
  },
  {
    id: 92,
    name: `Commit Message Therapist`,
    category: `Developer tools`,
    description: `Paste a git diff and it writes a commit message that actually explains *why* the change was made, not just what changed. Follows conventional commits format, detects the type (feat/fix/refactor/docs), and asks one clarifying question if the intent isn't obvious from the diff. Also roasts bad commit messages you paste in ("fix stuff" gets the treatment it deserves).`,
    howToBuild: `zo.space page with a diff paste area (monospace, syntax highlighted). API route analyzes the diff structure, detects affected systems, and generates a message. The "roast" mode runs separately — analyzing message quality against conventional commits standards and returning feedback with dry humor. No persistence needed.`,
    monetization: `Free — dev tool for brand building. Premium: GitHub integration that suggests messages on push`,
    difficulty: `Beginner`,
  },
  {
    id: 93,
    name: `Power Outage Predictor`,
    category: `Niche professional tools (rural residents)`,
    description: `Monitors weather forecasts, historical outage data from your utility, and local wind/ice/lightning risk. When conditions match past outage patterns, it alerts you 6-24 hours ahead so you can charge devices, fill water, and prep food. After an outage, it estimates restoration time based on utility crew patterns and severity.`,
    howToBuild: `Scheduled agent checks Open-Meteo hourly for wind/ice/storm conditions. Historical outage data scraped from utility websites (browser automation) stored in DuckDB. Pattern matching correlates weather conditions with past outages. SMS alert when risk exceeds threshold. zo.space page shows current risk level and prep checklist.`,
    monetization: `Free for one location, \$3/mo for alerts + prep automation`,
    difficulty: `Intermediate`,
  },
  {
    id: 94,
    name: `TTRPG Character Voice Coach`,
    category: `Hobby/passion tools (tabletop gaming)`,
    description: `Describe a character (grizzled dwarf blacksmith, nervous elvish diplomat, cocky teenage pirate). It generates a voice guide: accent notes, speech patterns, vocabulary to use and avoid, sample phrases, and a "verbal tic" to make the character memorable. Includes an audio sample generated from the description so you can hear the character before you play them.`,
    howToBuild: `zo.space page with character description form. API route generates the voice guide via AI. Text-to-speech for the audio sample via a TTS API or edge-tts Python package. Audio saved as space asset. zo.space page renders the guide with embedded audio player. DuckDB stores character voices for a personal library. Exportable as a one-page PDF for the game table.`,
    monetization: `Free for 3 characters, \$4/mo unlimited + voice library`,
    difficulty: `Beginner`,
  },
  {
    id: 95,
    name: `Parking Ticket Audit`,
    category: `Civic/public interest`,
    description: `Upload a photo of your parking ticket. It extracts the violation details, cross-references against your city's parking code, and identifies common grounds for dismissal — incorrect sign placement, expired meter regulations, missing required ticket fields, or time-zone-between-signs ambiguities. Generates a contest letter if it finds grounds.`,
    howToBuild: `zo.space page with ticket photo upload. AI vision extracts ticket details. Web research for the specific city's parking code and known dismissal patterns. API route analyzes the violation against applicable regulations. Contest letter generated as downloadable PDF. DuckDB tracks success rates by violation type and city for improving advice over time.`,
    monetization: `Free analysis, \$5 per generated contest letter via Stripe`,
    difficulty: `Intermediate`,
  },
  {
    id: 96,
    name: `Plant Swap Coordinator`,
    category: `Hobby/passion tools (gardening) / civic`,
    description: `Organize neighborhood plant swaps. People list cuttings, seeds, and divisions they have to offer with photos. Others browse and request swaps. The coordinator page auto-generates a swap-day schedule that minimizes everyone standing around waiting. Prints name tags with plant names and care instructions.`,
    howToBuild: `zo.space public page with listing form (plant name, photo, care notes). DuckDB stores listings and swap requests. Matching algorithm pairs compatible swaps. zo.space page shows the catalog with search/filter. PDF generation for name tags and care cards. Email notifications via Gmail when someone requests your plant. Event scheduling via Google Calendar for swap day.`,
    monetization: `Free — community tool. Tip jar via Stripe for the organizer`,
    difficulty: `Intermediate`,
  },
  {
    id: 97,
    name: `One-Sentence Journal`,
    category: `Health/wellness`,
    description: `Every day at a time you choose, it texts you: "One sentence about today." You reply. That's it. Over months and years, it builds into something unexpectedly powerful — a single-line-per-day record of your life. The dashboard shows a scrollable timeline, word clouds by month, and a "this day last year" feature.`,
    howToBuild: `Scheduled agent sends daily SMS prompt. Inbound SMS reply is parsed and stored in DuckDB with date. zo.space private page renders the timeline — one line per day, organized by month. Word frequency analysis via Python for word clouds. "This day in history" feature queries previous years' entries. Annual export as a printable PDF booklet.`,
    monetization: `Free personal tool, sell as a template for \$5`,
    difficulty: `Beginner`,
  },
  {
    id: 98,
    name: `Code Review Bingo`,
    category: `Developer tools / weird`,
    description: `Paste a PR diff. It scans for common code review tropes and checks them off on a bingo card: "TODO without a ticket," "commented-out code," "magic number," "variable named \`data\`," "function longer than 50 lines," "catch block that swallows errors." Get five in a row and it generates a sharable bingo card image. Technically useful, spiritually unhinged.`,
    howToBuild: `zo.space page with diff paste input. API route analyzes the diff against a pattern library (25 common code smells, each as a regex or AST heuristic). Generates a 5x5 bingo card image using canvas/imagemagick with detected patterns highlighted. Sharable via a public URL with the card state encoded. DuckDB tracks team-wide "most common" patterns for leaderboards.`,
    monetization: `Free — viral dev tool. Premium: Slack integration that auto-posts bingo cards on PR creation`,
    difficulty: `Intermediate`,
  },
  {
    id: 99,
    name: `Emergency Contact Card Generator`,
    category: `Health/wellness`,
    description: `Enter your emergency contacts, medical conditions, allergies, medications, blood type, and insurance info. It generates a wallet-sized printable card, a phone lock screen image with critical info visible, and a private URL (PIN-protected) with full details that first responders can access. Updates propagate to all formats when you change info.`,
    howToBuild: `zo.space private page with info form. API route generates: (1) PDF wallet card via pdf-lib, (2) lock screen image via imagemagick with high-contrast design, (3) PIN-protected public page that shows full details. QR code on the wallet card links to the PIN-protected page. All outputs update when source data changes. SMS to emergency contacts when profile is created, so they know they're listed.`,
    monetization: `Free — genuinely useful public service. Sell premium: family plan, auto-update notifications to contacts`,
    difficulty: `Intermediate`,
  },
  {
    id: 100,
    name: `Time Capsule`,
    category: `Weird/experimental`,
    description: `Write a message to your future self. Attach files, photos, links, predictions, goals. Set a delivery date — 1 month, 1 year, 5 years from now. On that date, you receive it via email, SMS, and a private zo.space page that recreates the look and feel of the web from the year you wrote it (complete with era-appropriate fonts and design patterns). A personal internet archaeology experience.`,
    howToBuild: `zo.space page with capsule creation form (text, file uploads to space assets, date picker). DuckDB stores capsule metadata. Scheduled agent checks daily for capsules ready to deliver. On delivery date: sends email via Gmail with contents, SMS notification, and generates a time-period-styled zo.space page (CSS that mimics web aesthetics from the creation year — geocities for 2024, brutalist for 2025, etc.). Capsule page becomes permanently viewable after delivery.`,
    monetization: `Free for 1 capsule, \$3/mo for unlimited capsules + group capsules (multiple contributors)`,
    difficulty: `Intermediate`,
  },
];

export const apps: App[] = [...baseApps, ...(generatedAppIdeas as App[])];

export const spaces: Space[] = [
  {
    id: 1,
    name: `Mood-Responsive Landing Page`,
    route: `/`,
    type: `Page`,
    visibility: `public` as const,
    description: `Your homepage shifts its color palette, typography weight, and greeting text based on the time of day in the visitor's timezone. Dawn gets warm ambers and a soft "good morning," midnight gets deep indigo and "you're up late." Not a gimmick — it makes your personal site feel alive.`,
    keyTech: `\`useEffect\` with \`new Date().getHours()\`, CSS custom properties for theme switching, Tailwind arbitrary values for palette injection.`,
  },
  {
    id: 2,
    name: `/now Page with Live Workspace Pulse`,
    route: `/now`,
    type: `Page + API`,
    visibility: `public` as const,
    description: `A public \`/now\` page (à la nownownow.com) that pulls its content from a markdown file in your workspace (\`/home/workspace/Persona/now.md\`). An API route reads the file at request time, so you update the markdown and the page reflects it instantly. Shows what you're working on, reading, listening to, and thinking about.`,
    keyTech: `API route uses \`Bun.file()\` to read workspace markdown, page fetches from \`/api/now\` and renders with a simple markdown-to-JSX parser.`,
  },
  {
    id: 3,
    name: `Personal API Key Gateway`,
    route: `/api/v1/:service`,
    type: `API`,
    visibility: `public` as const,
    description: `A single authenticated API gateway that proxies requests to your own micro-services. Hit \`/api/v1/bookmarks\` and it reads your bookmarks file; hit \`/api/v1/status\` and it returns your current availability. One token, one entry point, multiple internal routes. Your own personal API.`,
    keyTech: `Bearer token auth via \`process.env\`, dynamic \`/:service\` param, \`switch\` dispatch to different workspace file reads or external fetches.`,
  },
  {
    id: 4,
    name: `Receipt Scanner Results Page`,
    route: `/receipts`,
    type: `Page`,
    visibility: `private` as const,
    description: `A private dashboard showing receipts you've photographed and processed through a scheduled agent. The agent OCRs receipt images dropped into a workspace folder, extracts merchant/amount/date, and writes JSON. This page reads that JSON and shows a searchable, sortable table with monthly totals.`,
    keyTech: `API route reads \`/home/workspace/Datasets/receipts/data.json\`, \`useState\` for search/filter, \`useMemo\` for totals aggregation.`,
  },
  {
    id: 5,
    name: `Webring Node`,
    route: `/webring`,
    type: `Both`,
    visibility: `public` as const,
    description: `Brings back the webring. A page shows the ring members (pulled from a shared JSON file or API), with "← Previous" and "Next →" navigation. The API route (\`/api/webring\`) returns the ring data as JSON so other members can consume it. You maintain your segment of the ring in a workspace file.`,
    keyTech: `API reads a local \`webring.json\` with member URLs, page uses \`useEffect\` to fetch and render the ring with navigation links that redirect to adjacent members.`,
  },
  {
    id: 6,
    name: `Stripe-Powered Tip Jar`,
    route: `/tip`,
    type: `Page`,
    visibility: `public` as const,
    description: `A minimal, beautiful tip page with preset amounts (\$3, \$5, \$10) and a custom amount field. Each button creates a Stripe Checkout session via an API route and redirects the visitor to pay. A thank-you page shows after successful payment. No storefront overhead — just a direct way for people to support your work.`,
    keyTech: `Stripe SDK (\`new Stripe(process.env.STRIPE_SECRET_KEY)\`), \`/api/tip\` creates checkout sessions with \`mode: 'payment'\`, success/cancel URL redirects.`,
  },
  {
    id: 7,
    name: `DNS Lookup Tool`,
    route: `/tools/dns`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public utility page where anyone can type a domain and see its A, AAAA, MX, TXT, NS, and CNAME records. The API route runs \`Bun.spawn\` to call \`dig\` under the hood and parses the output. Clean table layout with record type tabs. Useful enough to bookmark.`,
    keyTech: `API route uses \`Bun.spawn(["dig", domain, recordType, "+short"])\`, page uses \`useState\` for domain input and record type selection, tabbed results display.`,
  },
  {
    id: 8,
    name: `Color Palette Generator from Image`,
    route: `/tools/palette`,
    type: `Both`,
    visibility: `public` as const,
    description: `Upload an image, and the page extracts the dominant 5–8 colors using quantization. Shows the palette as swatches with hex/RGB/HSL values, a CSS variables snippet, and a Tailwind config snippet. The API route handles the image processing server-side.`,
    keyTech: `API route uses ImageMagick via \`Bun.spawn(["convert", ...])\` to extract dominant colors with \`-colors 8 -format '%c' histogram:info:\`), page renders swatches and copy-to-clipboard buttons.`,
  },
  {
    id: 9,
    name: `Markdown Résumé with PDF Export`,
    route: `/resume`,
    type: `Both`,
    visibility: `public` as const,
    description: `Your résumé lives as a markdown file in your workspace. The page route renders it with typographic care — proper hierarchy, print-optimized CSS, and a "Download PDF" button. The API route uses Pandoc to convert the markdown to PDF on the fly and streams it back.`,
    keyTech: `API reads \`/home/workspace/Documents/resume.md\`, uses \`Bun.spawn(["pandoc", ...])\` to generate PDF, page renders the markdown with \`@media print\` styles and a download link to the API.`,
  },
  {
    id: 10,
    name: `Webhook Relay for GitHub → Telegram`,
    route: `/api/github-webhook`,
    type: `API`,
    visibility: `public` as const,
    description: `Receives GitHub webhook payloads (push, PR, issue events), verifies the \`X-Hub-Signature-256\` header against your secret, formats a concise message, and posts it to your Telegram via the Zo API. You get a ping on your phone every time something happens in your repos.`,
    keyTech: `HMAC-SHA256 signature verification with \`node:crypto\`, payload parsing for event type, fetch to Zo's \`/zo/ask\` API with a "send me a Telegram message" prompt.`,
  },
  {
    id: 11,
    name: `Personal Link Shortener`,
    route: `/go/:slug`,
    type: `API`,
    visibility: `public` as const,
    description: `A URL shortener backed by a JSON file in your workspace. Hit \`yourhandle.zo.space/go/gh\` and get redirected to your GitHub. An authenticated API route at \`/api/links\` lets you add/remove/list shortened URLs. The JSON file is your database — no external dependencies.`,
    keyTech: `Dynamic \`/:slug\` route reads \`links.json\`, returns 302 redirect. CRUD API route with bearer auth for management. \`Map\` lookup for O(1) resolution.`,
  },
  {
    id: 12,
    name: `Spotify "Currently Playing" Widget`,
    route: `/playing`,
    type: `Both`,
    visibility: `public` as const,
    description: `A small, embeddable widget showing what you're currently listening to on Spotify. The API route checks your Spotify connection via Zo's app tools and caches the result for 30 seconds. The page shows album art, track name, artist, and a progress bar. Returns "Nothing playing" gracefully.`,
    keyTech: `API calls Zo's Spotify integration to get current playback, in-memory cache with TTL, page uses \`useEffect\` with 30s polling interval, CSS animation for the progress bar.`,
  },
  {
    id: 13,
    name: `QR Code Generator`,
    route: `/tools/qr`,
    type: `Both`,
    visibility: `public` as const,
    description: `Type any URL or text, get an instant QR code rendered as SVG. Customizable size, error correction level, and foreground/background colors. The API route generates the QR and returns SVG, the page provides the UI with live preview and download button.`,
    keyTech: `\`qrcode\` generation via a lightweight algorithm in TypeScript (no npm needed — QR encoding is well-documented), SVG path output, page uses controlled inputs with live \`useEffect\` regeneration.`,
  },
  {
    id: 14,
    name: `Expense Tracker Dashboard`,
    route: `/money`,
    type: `Page`,
    visibility: `private` as const,
    description: `A private dashboard reading from a DuckDB dataset of your bank transactions (imported via the Zo Datasets feature). Shows monthly spending by category, top merchants, burn rate, and trend lines. Filterable by date range and category. Your financial pulse at a glance.`,
    keyTech: `API route queries DuckDB via \`Bun.spawn(["duckdb", ...])\` with SQL aggregations, page uses \`useState\` for filters and renders bar/line charts with pure SVG (no charting library needed).`,
  },
  {
    id: 15,
    name: `Digital Garden / Wiki`,
    route: `/garden/:slug`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public digital garden where each page is a markdown file in \`/home/workspace/Projects/garden/\`. The dynamic \`:slug\` route loads the corresponding \`.md\` file. Supports \`[[wiki-links]]\` between notes — the renderer converts them to internal links. An index page at \`/garden\` lists all notes sorted by last modified.`,
    keyTech: `API reads workspace files with \`Bun.file()\`, regex replaces \`[[links]]\` with anchor tags, \`/api/garden/index\` uses \`readdir\` to list files with \`stat\` for modification times.`,
  },
  {
    id: 16,
    name: `Open Graph Image Generator`,
    route: `/api/og`,
    type: `API`,
    visibility: `public` as const,
    description: `Pass \`?title=Hello&subtitle=World&theme=dark\` and get back a 1200×630 PNG suitable for social sharing. Uses ImageMagick to compose text onto a template background. Now every blog post, project, or page you share has a branded, dynamic preview image instead of a blank card.`,
    keyTech: `\`Bun.spawn(["convert", ...])\` with ImageMagick's \`-annotate\` for text rendering, \`-resize\` for dimensions, query param parsing for customization, returns image/png response.`,
  },
  {
    id: 17,
    name: `Pomodoro Timer with Session Log`,
    route: `/pomodoro`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private Pomodoro timer with 25/5/15 intervals. Tracks completed sessions and appends them to a workspace log file with timestamps and optional task labels. Over time, you build a dataset of your deep work patterns. Plays a browser notification sound on interval completion.`,
    keyTech: `\`useState\` + \`useEffect\` with \`setInterval\` for the timer, \`useRef\` for audio, POST to \`/api/pomodoro/log\` which appends to a JSONL file in the workspace.`,
  },
  {
    id: 18,
    name: `Email Signup with Drip Sequence Trigger`,
    route: `/subscribe`,
    type: `Both`,
    visibility: `public` as const,
    description: `A clean email signup form for a newsletter or course. On submit, the API route validates the email, appends it to a subscriber list in the workspace, and triggers a Zo scheduled agent to send the first drip email via Gmail. No Mailchimp needed — it's all on your server.`,
    keyTech: `API appends to \`subscribers.jsonl\`, calls \`/zo/ask\` to trigger a welcome email via Gmail tools, page uses \`useState\` for form state and a success/error message after submission.`,
  },
  {
    id: 19,
    name: `Habit Streak Tracker`,
    route: `/habits`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private page showing your daily habits as a GitHub-style contribution grid. Each habit gets its own row of cells colored by completion. Tap a cell to toggle it. Data persists in a JSON file. A companion API route lets scheduled agents auto-mark habits (e.g., "exercised" marked if Apple Health data arrives via webhook).`,
    keyTech: `CSS Grid for the contribution graph, \`useState\` for toggle state, API reads/writes \`habits.json\`, date math with \`Temporal\` or manual ISO date manipulation.`,
  },
  {
    id: 20,
    name: `Status Page for Your Services`,
    route: `/status`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public status page showing uptime for your Zo services, sites, and external APIs you depend on. A scheduled agent pings each endpoint every 5 minutes and writes results to a JSON log. The page shows current status (green/yellow/red), response times, and a 24-hour incident timeline.`,
    keyTech: `API reads \`status-checks.json\` (written by a scheduled agent), page renders status indicators with Tailwind bg-green-500/bg-red-500, timeline uses CSS grid with time-based column positioning.`,
  },
  {
    id: 21,
    name: `Invoice Generator`,
    route: `/invoice/:id`,
    type: `Both`,
    visibility: `private` as const,
    description: `Generate professional invoices from a JSON template in your workspace. Each invoice has a unique ID, client details, line items, tax calculation, and total. The page renders a print-ready invoice. The API route can generate a PDF via Pandoc. A POST endpoint creates new invoices from structured data.`,
    keyTech: `API reads/writes to \`/home/workspace/Documents/invoices/\`, Pandoc for PDF generation, \`@media print\` CSS for the page, dynamic \`/:id\` routing.`,
  },
  {
    id: 22,
    name: `Bookmark Dump with Tags`,
    route: `/bookmarks`,
    type: `Both`,
    visibility: `public` as const,
    description: `A curated, tagged bookmark collection. You save bookmarks by sending them to a Zo agent (via SMS or Telegram), which extracts the title and stores them in a JSONL file. The page renders them in a filterable grid with tag chips. Think Pinboard but yours, on your domain, with zero subscription fees.`,
    keyTech: `API reads \`bookmarks.jsonl\`, supports \`?tag=\` query filter, page uses \`useState\` for tag filtering, \`useMemo\` for tag extraction and counting.`,
  },
  {
    id: 23,
    name: `Weather Dashboard for Your Location`,
    route: `/weather`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private weather dashboard pulling data from a free weather API (Open-Meteo, no key needed). Shows current conditions, 7-day forecast, and sunrise/sunset for Salmon, Idaho (or whatever you configure). Minimal, glanceable design — not a cluttered weather app.`,
    keyTech: `API fetches from \`api.open-meteo.com\` with lat/long params, caches for 30 minutes in a workspace temp file, page renders with weather-appropriate icons from lucide-react (Sun, Cloud, CloudRain, etc.).`,
  },
  {
    id: 24,
    name: `Freelance Rate Calculator`,
    route: `/tools/rate`,
    type: `Page`,
    visibility: `public` as const,
    description: `Input your target annual income, desired vacation weeks, hours per week, and overhead percentage. It calculates your minimum hourly rate, day rate, weekly rate, and project rate (with a profit margin slider). Shows the math transparently. Useful for other freelancers — shareable as a public tool.`,
    keyTech: `Pure client-side calculation with \`useState\` for inputs, \`useMemo\` for derived values, range sliders for hours and margin, formatted currency output.`,
  },
  {
    id: 25,
    name: `Cron Job Status Dashboard`,
    route: `/crons`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private dashboard listing all your Zo scheduled agents with their last run time, next scheduled run, success/failure status, and a snippet of their last output. One place to see if your automations are healthy. The API route queries Zo's agent system for status data.`,
    keyTech: `API calls Zo's agent listing tools, page renders a table with status badges (green for success, red for failure, gray for pending), relative time formatting ("3 hours ago").`,
  },
  {
    id: 26,
    name: `WHOIS Lookup Tool`,
    route: `/tools/whois`,
    type: `Both`,
    visibility: `public` as const,
    description: `Enter a domain, get back registrar, creation/expiry dates, nameservers, and registrant info (where available). The API route runs \`whois\` via \`Bun.spawn\` and parses the output into structured JSON. Cleaner than any ad-riddled WHOIS site.`,
    keyTech: `\`Bun.spawn(["whois", domain])\`, regex parsing for key fields, page with \`useState\` for input and tabular results display.`,
  },
  {
    id: 27,
    name: `Personal Changelog`,
    route: `/changelog`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public log of notable things you've shipped, learned, or changed — structured as dated entries with tags (shipped, learned, personal, meta). Reads from a \`changelog.jsonl\` file in your workspace. Each entry has a date, title, body, and tags. Shows your trajectory over time.`,
    keyTech: `API reads and filters \`changelog.jsonl\`, supports \`?tag=\` query param, page renders entries chronologically with tag chips and a simple date grouping header.`,
  },
  {
    id: 28,
    name: `Contact Form with Spam Filtering`,
    route: `/contact`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public contact form that sends submissions to your email (or Telegram, or SMS). The API route applies basic spam filtering: honeypot field, rate limiting by IP, and a minimum time-to-submit check. Legitimate messages get forwarded; spam gets silently dropped.`,
    keyTech: `Honeypot hidden field, \`Map\` for rate-limit tracking by IP from \`c.req.header('x-forwarded-for')\`, time check via a hidden timestamp field, forwards via \`/zo/ask\` to send email/SMS.`,
  },
  {
    id: 29,
    name: `Font Pairing Preview Tool`,
    route: `/tools/fonts`,
    type: `Page`,
    visibility: `public` as const,
    description: `Pick two Google Fonts and see them paired together instantly across heading, subheading, body, and caption samples. Includes a dark/light toggle, adjustable sizes, and sample paragraphs. Outputs a CSS snippet and Google Fonts \`<link>\` tag you can copy. Opinionated defaults showcase non-generic pairings.`,
    keyTech: `Dynamic Google Fonts loading via injected \`<link>\` tags in \`useEffect\`, \`useState\` for font selections and size/weight controls, CSS custom properties for live preview.`,
  },
  {
    id: 30,
    name: `RSS Feed from Workspace Files`,
    route: `/api/feed.xml`,
    type: `API`,
    visibility: `public` as const,
    description: `An auto-generated RSS/Atom feed from markdown files in a workspace directory (e.g., \`/home/workspace/Projects/blog/posts/\`). The API reads the directory, extracts frontmatter (title, date, description), and returns valid XML. Now any blog, changelog, or note collection has a subscribable feed with zero config.`,
    keyTech: `\`readdir\` + \`Bun.file()\` for each \`.md\` file, frontmatter regex parsing, XML string template for Atom feed format, \`Content-Type: application/atom+xml\` response header.`,
  },
  {
    id: 31,
    name: `Personal Health Dashboard`,
    route: `/health`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private dashboard tracking health metrics you log via SMS or a workspace JSON file. Shows medication adherence, seizure log, sleep quality, energy levels, and notes — all as simple time-series visualizations. Designed for someone who needs to manage energy and health proactively, not reactively.`,
    keyTech: `API reads \`health-log.jsonl\`, page renders sparkline SVGs for trends, color-coded calendar cells for adherence, \`useMemo\` for streak calculations.`,
  },
  {
    id: 32,
    name: `Open Source Project Directory`,
    route: `/projects`,
    type: `Both`,
    visibility: `public` as const,
    description: `A curated showcase of your GitHub repos and side projects. The API fetches your repos from the GitHub API (or reads a curated \`projects.json\`), enriches them with descriptions and tags you've written, and the page renders them as cards with language badges, star counts, and demo links.`,
    keyTech: `Optional GitHub API fetch with \`fetch('https://api.github.com/users/yourname/repos')\`, merged with local \`projects.json\` for custom descriptions and ordering, page uses CSS grid for card layout.`,
  },
  {
    id: 33,
    name: `Dead Link Checker`,
    route: `/tools/deadlinks`,
    type: `Both`,
    visibility: `public` as const,
    description: `Paste a URL, and the tool crawls the page (one level deep), finds all links, and checks each one for 404s, timeouts, and redirects. Returns a report showing healthy, broken, and redirected links with status codes. Useful for site owners, writers, and anyone maintaining a link collection.`,
    keyTech: `API uses \`fetch\` with \`HEAD\` requests in parallel (\`Promise.allSettled\`), timeout handling, page renders results as a categorized list with color-coded status indicators.`,
  },
  {
    id: 34,
    name: `Micro-Journal Timeline`,
    route: `/journal`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private, scrollable timeline of short journal entries. Each entry is 1–3 sentences with a timestamp. Reads from your existing journal files at \`/home/workspace/Persona/Journal/\`. The design feels like a private Twitter — minimal, chronological, focused on the words.`,
    keyTech: `API reads and parses journal markdown files, extracts entries by time dividers, page renders as a vertical timeline with \`border-l\` styling and relative date grouping.`,
  },
  {
    id: 35,
    name: `IBAN/Bank Account Validator`,
    route: `/tools/iban`,
    type: `Both`,
    visibility: `public` as const,
    description: `Enter an IBAN and get instant validation: country code detection, check digit verification, bank identification, and formatting. The math is well-documented (mod-97 check) and runs entirely server-side. Useful for anyone doing international transfers.`,
    keyTech: `IBAN validation algorithm in TypeScript (rearrange, convert letters to digits, mod-97 check), country code to bank format mapping, page with input field and validation result display.`,
  },
  {
    id: 36,
    name: `Meeting Cost Calculator`,
    route: `/tools/meeting-cost`,
    type: `Page`,
    visibility: `public` as const,
    description: `Input the number of attendees, average salary tier, and meeting duration. It calculates the real cost of that meeting in dollars — total, per-minute, and annualized if recurring. A sobering tool for anyone who's ever sat through a meeting that should have been an email.`,
    keyTech: `\`useState\` for inputs (attendees, salary band dropdown, duration), \`useMemo\` for cost derivation, visual comparison ("this meeting costs as much as...").`,
  },
  {
    id: 37,
    name: `Stripe Payment Dashboard`,
    route: `/sales`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private dashboard showing your Stripe revenue: recent transactions, monthly recurring revenue, total lifetime revenue, and a revenue chart. Pulls data through the Stripe SDK using your connected account. One private page instead of navigating the full Stripe dashboard.`,
    keyTech: `API uses \`new Stripe(process.env.STRIPE_SECRET_KEY)\` to list charges and subscriptions, aggregation logic for MRR/LTV, page renders summary cards and a bar chart with pure SVG.`,
  },
  {
    id: 38,
    name: `File Drop Box`,
    route: `/drop`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public file upload page where anyone can drop files for you — up to a size limit you set. Files land in a workspace directory. An API route handles \`multipart/form-data\` uploads and writes to \`/home/workspace/Inbox/drops/\`. Optional: notify you via Telegram when a file arrives.`,
    keyTech: `API handles multipart parsing with \`c.req.parseBody()\`, writes to workspace with \`Bun.write()\`, size validation, page uses drag-and-drop with \`onDragOver\`/\`onDrop\` handlers.`,
  },
  {
    id: 39,
    name: `Plain Text Paste Bin`,
    route: `/paste/:id`,
    type: `Both`,
    visibility: `public` as const,
    description: `Create and share plain text snippets with syntax highlighting. POST to \`/api/paste\` with text content, get back a unique URL. Each paste is a file in the workspace. Optional expiry (auto-deleted by a scheduled agent). Like a personal Pastebin that you own.`,
    keyTech: `\`crypto.randomUUID()\` for paste IDs, API writes to \`/home/workspace/Data/pastes/\`, dynamic \`/:id\` route reads and renders with a \`<pre>\` block, optional language detection for syntax class hints.`,
  },
  {
    id: 40,
    name: `Location-Aware Landing Page`,
    route: `/local`,
    type: `Both`,
    visibility: `public` as const,
    description: `A landing page for your freelance business that adapts based on the visitor's approximate location (derived from their IP via a free GeoIP API). If they're in Idaho, it says "web design for Idaho businesses." If they're in Montana, "serving the Northern Rockies." Generic fallback for everywhere else. Local SEO without separate pages.`,
    keyTech: `API calls a free GeoIP service with the visitor's IP, returns region/state, page conditionally renders location-specific copy and testimonials from a local \`regions.json\` config.`,
  },
  {
    id: 41,
    name: `Substack Archive Mirror`,
    route: `/writing/:slug`,
    type: `Both`,
    visibility: `public` as const,
    description: `Mirrors your Substack posts on your own domain. A scheduled agent periodically fetches your Substack RSS feed, downloads new posts as markdown, and stores them in the workspace. The zo.space page renders them with your own typography and design — not Substack's. You own the presentation.`,
    keyTech: `API reads from \`/home/workspace/Projects/writing/posts/\`, dynamic \`/:slug\` routing, markdown rendering, index page at \`/writing\` with post list sorted by date.`,
  },
  {
    id: 42,
    name: `WiFi QR Code Generator`,
    route: `/tools/wifi-qr`,
    type: `Both`,
    visibility: `public` as const,
    description: `Input your network name, password, and encryption type. Get a QR code that guests can scan to instantly connect to your WiFi. Uses the \`WIFI:T:WPA;S:NetworkName;P:Password;;\` format that iOS and Android both support. No app needed.`,
    keyTech: `WiFi QR string format encoding, same QR generation approach as #13, page with three input fields and instant SVG preview.`,
  },
  {
    id: 43,
    name: `Uptime Ping Endpoint`,
    route: `/api/ping`,
    type: `API`,
    visibility: `public` as const,
    description: `Returns \`{"status":"ok","timestamp":"...","uptime":12345}\` — a health check endpoint for external monitoring services (UptimeRobot, Healthchecks.io, etc.). Also checks that your workspace is readable and returns basic system stats. Two lines of code, permanently useful.`,
    keyTech: `\`process.uptime()\`, \`Date.now()\`, optional \`Bun.file()\` existence check on a workspace canary file to verify filesystem health.`,
  },
  {
    id: 44,
    name: `JSON Formatter and Validator`,
    route: `/tools/json`,
    type: `Page`,
    visibility: `public` as const,
    description: `Paste messy JSON, get it pretty-printed with syntax highlighting. Shows validation errors with line numbers if the JSON is malformed. Includes a minify toggle, a tree view, and a path copier (click any key to copy its JSONPath). Entirely client-side — nothing leaves the browser.`,
    keyTech: `\`JSON.parse()\` with try/catch for validation, \`JSON.stringify(data, null, 2)\` for formatting, recursive tree component with \`useState\` for expand/collapse, click-to-copy with \`navigator.clipboard\`.`,
  },
  {
    id: 45,
    name: `Daily Standup Logger`,
    route: `/standup`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private page with three text fields: "Yesterday," "Today," "Blockers." Submit and it appends to a daily standup log in your workspace. The page also shows your last 5 standups for continuity. If you work solo, this is your accountability partner. If you freelance, it's client-ready documentation.`,
    keyTech: `API appends to \`standups.jsonl\` with ISO date, page uses \`useEffect\` to load recent entries and \`useState\` for form fields.`,
  },
  {
    id: 46,
    name: `Timezone Converter`,
    route: `/tools/tz`,
    type: `Page`,
    visibility: `public` as const,
    description: `Pick a time in one timezone, see it in up to 6 others simultaneously. Drag a slider to scrub through the day and watch all the clocks move together. Pre-loaded with popular pairs (US timezones, UTC, IST, JST) but fully customizable. Solves the "what time is it there?" problem without Googling every time.`,
    keyTech: `\`Intl.DateTimeFormat\` with \`timeZone\` option for all conversions, \`useState\` for selected time and timezone list, range input for time scrubbing, \`useMemo\` for formatted outputs.`,
  },
  {
    id: 47,
    name: `Client Project Portal`,
    route: `/client/:slug`,
    type: `Both`,
    visibility: `private` as const,
    description: `A private portal for each freelance client. Shows their project status, deliverables with download links, invoices, and a simple message thread. Each client gets a unique URL and access token. Data lives in workspace folders organized by client. Professional-grade client management with no SaaS subscription.`,
    keyTech: `Bearer auth per client from a \`clients.json\` config, dynamic \`/:slug\` routing, API reads from \`/home/workspace/Projects/clients/:slug/\`, file listing for deliverables.`,
  },
  {
    id: 48,
    name: `Markdown Preview Tool`,
    route: `/tools/markdown`,
    type: `Page`,
    visibility: `public` as const,
    description: `A split-pane markdown editor and preview. Paste or type markdown on the left, see rendered output on the right in real time. Supports GFM (tables, task lists, strikethrough). Includes a "Copy HTML" button for the rendered output. Faster than opening a separate app.`,
    keyTech: `\`useState\` for editor content, regex-based markdown-to-HTML conversion (or a lightweight parser), \`dangerouslySetInnerHTML\` with sanitization for preview pane, \`useRef\` for synchronized scroll position.`,
  },
  {
    id: 49,
    name: `Reading List with Progress Tracking`,
    route: `/reading`,
    type: `Both`,
    visibility: `public` as const,
    description: `A public reading list showing books you're reading, finished, and want to read. Each entry has title, author, your rating, a one-sentence take, and a progress bar for in-progress books. Data lives in \`reading.json\` in your workspace. Updated via a Zo agent when you text "finished [book title]."`,
    keyTech: `API reads \`reading.json\`, supports \`?status=reading|finished|queued\` filter, page renders three sections with progress bars using Tailwind \`w-[percentage]\` and star ratings.`,
  },
  {
    id: 50,
    name: `API Usage Meter`,
    route: `/api/usage`,
    type: `API`,
    visibility: `private` as const,
    description: `Tracks how many times your other API routes get hit. Middleware-style: each API route calls a shared \`logUsage(routePath)\` function that appends to a JSONL file. This endpoint returns aggregated stats — requests per route per day, top callers by IP, and total monthly usage. Your own analytics without third-party scripts.`,
    keyTech: `Shared \`logUsage()\` function writing to \`api-usage.jsonl\`, aggregation with \`Map\` counters, bearer auth, response includes daily/weekly/monthly breakdowns.`,
  },
  {
    id: 51,
    name: `Cellular Automata Lab`,
    route: `/lab/automata`,
    type: `Page`,
    visibility: `public` as const,
    description: `Interactive Conway's Game of Life variant where visitors can paint initial states, choose rulesets (Life, Highlife, Seeds, Day & Night), and watch them evolve on a canvas. Preloaded with famous patterns — glider guns, puffers, spaceships. Shares patterns via URL hash encoding.`,
    keyTech: `\`useRef\` for canvas, \`requestAnimationFrame\` loop, \`useSearchParams\` for pattern sharing, typed arrays for grid state`,
  },
  {
    id: 52,
    name: `Ephemeral Dead Drop`,
    route: `/api/drop and /drop/:id`,
    type: `Both`,
    visibility: `public` as const,
    description: `POST a text message to \`/api/drop\`, get back a one-time-read URL. First GET to \`/drop/:id\` renders the message and permanently deletes it from a workspace JSON file. Second visit gets "This message has been burned." Rate-limited to prevent abuse. No accounts, no history.`,
    keyTech: `Hono \`c.req.json()\`, \`crypto.randomUUID()\`, workspace file read/write at \`/home/workspace/.drops.json\`, bearer token for admin purge endpoint`,
  },
  {
    id: 53,
    name: `Git Contribution Heatmap`,
    route: `/commits`,
    type: `Page`,
    visibility: `public` as const,
    description: `Reads a workspace JSON file (populated by a scheduled agent running \`git log\` across all your repos nightly) and renders a GitHub-style contribution grid — but for ALL your projects, not just GitHub. Hover shows commit messages. Click a day to see that day's work summary.`,
    keyTech: `\`useEffect\` + \`fetch\` to an API route reading \`/home/workspace/Records/commit-heatmap.json\`, CSS grid for the calendar, \`useState\` for selected day detail panel`,
  },
  {
    id: 54,
    name: `Personal Colophon`,
    route: `/colophon`,
    type: `Page`,
    visibility: `public` as const,
    description: `A single beautiful page listing every tool, font, color, framework, and service you use to build your stuff — with links, version numbers, and one-sentence opinions on each. The anti-"uses" page: opinionated, specific, and updated by editing a workspace markdown file that the page reads via API.`,
    keyTech: `API route parsing \`/home/workspace/Persona/colophon.md\` with frontmatter, React rendering with typography-forward layout, Instrument Serif + JetBrains Mono pairing`,
  },
  {
    id: 55,
    name: `ASCII Art API`,
    route: `/api/ascii`,
    type: `API`,
    visibility: `public` as const,
    description: `Send a query param \`?text=hello&font=block\` and get back plain text ASCII art. Implements 6 built-in fonts (block, shadow, slant, banner, small, mini) using character matrices defined in the route itself. Returns \`Content-Type: text/plain\`. Useful for CLI tools, READMEs, and terminal splash screens.`,
    keyTech: `Hono \`c.req.query()\`, character map objects for each font, \`c.text()\` response, no external dependencies`,
  },
  {
    id: 56,
    name: `Generative Wallpaper Factory`,
    route: `/wallpaper`,
    type: `Page`,
    visibility: `public` as const,
    description: `Generates unique abstract wallpapers using seeded randomness — flow fields, voronoi tessellations, or gradient meshes. Each visit produces a new pattern. Lock a seed you like, pick a resolution (phone, desktop, ultrawide), and download as PNG via canvas \`toBlob()\`. Visitors can make wallpapers without signing up for anything.`,
    keyTech: `\`<canvas>\` with 2D context, seeded PRNG (mulberry32), \`useState\` for seed/resolution/style controls, \`toBlob\` + download link generation`,
  },
  {
    id: 57,
    name: `Decision Roulette`,
    route: `/decide`,
    type: `Page`,
    visibility: `private` as const,
    description: `Paste in a list of options (or load saved lists from workspace). Spin a weighted roulette wheel with satisfying CSS animation. Saves decision history to a workspace file so you can review what you decided and when. For the chronically indecisive — restaurants, task priority, what to work on next.`,
    keyTech: `CSS \`transform: rotate()\` with cubic-bezier easing, \`useState\` for options/weights, API route writing to \`/home/workspace/Records/decisions.json\``,
  },
  {
    id: 58,
    name: `Invoice Generator`,
    route: `/tools/invoice`,
    type: `Page`,
    visibility: `private` as const,
    description: `Fill in client name, line items, rates, and hours. Renders a clean, printable invoice with your business details pulled from a workspace config file. Generates a unique invoice number, saves a copy to workspace, and offers print/PDF via \`window.print()\` with a print-optimized stylesheet. No SaaS subscription for something this simple.`,
    keyTech: `\`@media print\` CSS, \`useRef\` for form state, API route reading \`/home/workspace/Persona/business.json\` for your details, workspace file write for archive`,
  },
  {
    id: 59,
    name: `Color Contrast Checker`,
    route: `/tools/contrast`,
    type: `Both`,
    visibility: `public` as const,
    description: `Page mode: pick two colors with input fields, see real-time WCAG AA/AAA pass/fail for normal and large text, plus a live preview of text on background. API mode: \`GET /api/contrast?fg=ffffff&bg=000000\` returns JSON with ratio, AA/AAA booleans, and suggestions for the nearest passing color if it fails.`,
    keyTech: `Relative luminance calculation per WCAG 2.1, \`useState\` for live updates, hex-to-RGB conversion, API route at \`/api/contrast\``,
  },
  {
    id: 60,
    name: `Mood Ring Homepage`,
    route: `/`,
    type: `Page`,
    visibility: `public` as const,
    description: `Your homepage shifts its entire color palette based on time of day and day of week. Dawn is warm amber. Midday is crisp white. Evening is deep indigo. Weekends get a looser, more playful layout. Content stays the same — but the vibe changes. Visitors at 2am see a different site than visitors at 2pm.`,
    keyTech: `\`new Date()\` with timezone offset to \`Etc/GMT+7\`, CSS custom properties set via \`useEffect\`, HSL color interpolation between time-of-day keyframes`,
  },
  {
    id: 61,
    name: `Haiku Weather`,
    route: `/haiku`,
    type: `Page`,
    visibility: `public` as const,
    description: `Displays current weather for Salmon, Idaho as a haiku. A scheduled agent runs every 3 hours, fetches weather data, writes a haiku to a workspace file, and the page renders it with minimal typography on a color field that matches conditions (grey for overcast, pale blue for clear, dark for storms). That's it. Weather as poetry.`,
    keyTech: `API route reading \`/home/workspace/Records/weather-haiku.json\`, agent uses \`web_search\` for weather + writes haiku, single \`<p>\` element with Instrument Serif at 3rem`,
  },
  {
    id: 62,
    name: `QR Code Vcard`,
    route: `/card`,
    type: `Page`,
    visibility: `public` as const,
    description: `A digital business card page with your info, styled distinctively — but the real move is the giant QR code that encodes a vCard. Someone scans it at a conference and your contact info drops straight into their phone. No app, no NFC, no "let me find you on LinkedIn." Config lives in a workspace file so you update once, everywhere.`,
    keyTech: `QR code generation via canvas (qrcode algorithm in-route), vCard 3.0 string encoding, config read from \`/home/workspace/Persona/contact.json\``,
  },
  {
    id: 63,
    name: `Markdown Slide Deck`,
    route: `/slides/:deck`,
    type: `Page`,
    visibility: `public` as const,
    description: `Write slides as a markdown file in your workspace (separated by \`---\`). This page renders them as a full-screen presentation with keyboard navigation, slide counter, and speaker notes (anything after \`???\` on a slide). No Keynote, no Google Slides, no RevealJS CDN. Your server, your slides.`,
    keyTech: `API route parsing markdown from \`/home/workspace/Presentations/:deck.md\`, \`useParams\` for deck name, \`useEffect\` for keyboard listeners (ArrowLeft/Right), CSS \`100vh\` slides with scroll-snap`,
  },
  {
    id: 64,
    name: `Pantone of the Day`,
    route: `/color`,
    type: `Page`,
    visibility: `public` as const,
    description: `Each day, a deterministic hash of the date picks a color from a curated 365-color palette stored in the route. The entire page is that color — full bleed — with the hex code, a poetic name, and the date in small type at the bottom. Bookmarkable. Shareable. Strangely satisfying to check daily.`,
    keyTech: `Date string → simple hash → index into color array, \`document.body.style\`, \`useMemo\` for hash computation, Fraunces for the color name`,
  },
  {
    id: 65,
    name: `Freelance Rate Calculator`,
    route: `/tools/rate`,
    type: `Page`,
    visibility: `private` as const,
    description: `Input your target annual income, desired time off, estimated non-billable hours percentage, and monthly expenses. Outputs your minimum hourly rate, day rate, weekly rate, and project rate (with a margin buffer). Shows the math transparently. Saves your last calculation to workspace so you can revisit it.`,
    keyTech: `Pure arithmetic in \`useState\` callbacks, no API needed, \`localStorage\` for persistence across visits, print-friendly layout`,
  },
  {
    id: 66,
    name: `Link Rot Monitor`,
    route: `/tools/linkrot`,
    type: `Page`,
    visibility: `private` as const,
    description: `Reads a list of important URLs from a workspace file (your portfolio links, blog post references, documentation links). A scheduled agent checks them weekly, logs status codes, and flags dead links. This page shows the dashboard: green/yellow/red per link, last-checked timestamp, and a diff of what changed.`,
    keyTech: `Agent runs \`curl -sI\` on each URL, writes results to \`/home/workspace/Records/linkrot.json\`, page fetches via API route, color-coded status badges`,
  },
  {
    id: 67,
    name: `Standup Log`,
    route: `/standup`,
    type: `Both`,
    visibility: `private` as const,
    description: `Private page with three text fields: yesterday, today, blockers. Submit and it appends to a dated markdown file in your workspace. Below the form, it shows your last 7 standups. Simple, fast, no Slack thread, no Jira ticket — just the record. Optional: a scheduled agent reads the latest standup and posts it to a Linear comment or sends it via email.`,
    keyTech: `\`POST /api/standup\` writes to \`/home/workspace/Records/Standups/YYYY-MM-DD.md\`, \`GET\` reads recent files, React form with \`onSubmit\``,
  },
  {
    id: 68,
    name: `Timezone Overlap Finder`,
    route: `/tools/timezones`,
    type: `Page`,
    visibility: `public` as const,
    description: `Add people by name and timezone. Renders a 24-hour horizontal bar chart showing everyone's working hours (configurable) with overlap zones highlighted. Drag to adjust work windows. Shows "best meeting time" as the widest overlap. Useful for freelancers working with international clients.`,
    keyTech: `\`Intl.DateTimeFormat\` for timezone math, \`useState\` for people list, SVG or div-based bar chart, drag handlers for work window adjustment`,
  },
  {
    id: 69,
    name: `IFTTT-Style Webhook Relay`,
    route: `/api/hook/:name`,
    type: `API`,
    visibility: `public` as const,
    description: `Generic webhook receiver. When a POST hits \`/api/hook/github-star\` or \`/api/hook/stripe-payment\`, it logs the payload to a workspace JSON file and triggers a notification (SMS, email, or Telegram) based on a config file. Your own personal webhook-to-notification bridge without Zapier.`,
    keyTech: `Bearer token auth, \`c.req.param("name")\` for routing, config at \`/home/workspace/Config/webhooks.json\` mapping names to notification channels, \`fetch\` to Zo API for notifications`,
  },
  {
    id: 70,
    name: `Plant Watering Tracker`,
    route: `/plants`,
    type: `Both`,
    visibility: `private` as const,
    description: `List your plants with watering schedules. Tap "watered" to log it. The page shows days since last watering with color indicators (green = fine, yellow = due soon, red = overdue). A scheduled agent sends you an SMS each morning listing which plants need water today. For the attentive plant parent who forgets anyway.`,
    keyTech: `API route CRUD on \`/home/workspace/Records/plants.json\`, \`Date.now()\` diff for overdue calculation, agent reads same file and calls \`send_sms_to_user\``,
  },
  {
    id: 71,
    name: `Personal API Documentation`,
    route: `/api-docs`,
    type: `Page`,
    visibility: `public` as const,
    description: `Auto-generates documentation for all your public zo.space API routes. A scheduled agent runs \`list_space_routes\`, filters API routes, and writes a structured JSON file. This page renders it as clean, browsable API docs with method, path, description, and example curl commands. Your APIs, documented automatically.`,
    keyTech: `Agent calls \`list_space_routes\` + \`get_space_route\`, extracts JSDoc-style comments, writes \`/home/workspace/Records/api-docs.json\`, page renders with code blocks and copy buttons`,
  },
  {
    id: 72,
    name: `Emergency Info Page`,
    route: `/ice`,
    type: `Page`,
    visibility: `public` as const,
    description: `"In Case of Emergency" — a minimal page with your name, blood type, allergies, medications, emergency contacts, and medical conditions. Designed to be accessed quickly on a phone. No login required (public), high-contrast, large type, works offline once loaded. Link it from your phone's lock screen.`,
    keyTech: `Static data from workspace config, semantic HTML for accessibility, \`<meta name="theme-color">\` for status bar, minimal CSS for fast load, no JavaScript required for core content`,
  },
  {
    id: 73,
    name: `Git Changelog Generator`,
    route: `/api/changelog`,
    type: `API`,
    visibility: `public` as const,
    description: `\`POST\` with a repo path and date range. Runs \`git log\` with conventional commit parsing, groups by type (feat/fix/chore/docs), and returns formatted markdown. Call it from CI, a scheduled agent, or curl. Outputs a ready-to-paste changelog section.`,
    keyTech: `\`child_process.exec\` running \`git log --format\` on workspace repos, regex parsing for conventional commits, markdown template rendering`,
  },
  {
    id: 74,
    name: `Pomodoro Focus Page`,
    route: `/focus`,
    type: `Page`,
    visibility: `private` as const,
    description: `Full-screen timer with 25/5 pomodoro cycles. No settings bloat — just start. The background color slowly shifts from cool (focus) to warm (break approaching). Plays a gentle tone via Web Audio API when the interval ends. Logs completed pomodoros to a workspace file. Shows your weekly count in the corner.`,
    keyTech: `\`useEffect\` interval, Web Audio API oscillator for notification tone, CSS transition on background HSL, API route logging to \`/home/workspace/Records/pomodoros.json\``,
  },
  {
    id: 75,
    name: `Reading Speed Tester`,
    route: `/tools/reading-speed`,
    type: `Page`,
    visibility: `public` as const,
    description: `Presents a ~300-word passage (randomly selected from 10 built-in passages across genres). Hit start, read, hit done. Calculates WPM, shows percentile ranking, and asks 3 comprehension questions to verify you actually read it. Honest, no-gamification reading speed measurement.`,
    keyTech: `\`Date.now()\` delta for timing, \`useState\` for passage selection and quiz state, word count via \`.split(/\\s+/).length\``,
  },
  {
    id: 76,
    name: `Open Graph Preview Tool`,
    route: `/tools/og-preview`,
    type: `Page`,
    visibility: `private` as const,
    description: `Paste a URL. The page calls an API route that fetches the URL's HTML, parses \`<meta property="og:*">\` tags, and renders a preview of how the link will appear on Twitter, Facebook, LinkedIn, Slack, and iMessage. Shows missing tags in red. Instant feedback when you're setting up meta tags for a new page.`,
    keyTech: `API route using \`fetch\` + regex/DOM parsing for OG tags, React preview cards mimicking each platform's layout, \`useDebounce\` on URL input`,
  },
  {
    id: 77,
    name: `Spotify Listening Dashboard`,
    route: `/music`,
    type: `Page`,
    visibility: `public` as const,
    description: `A scheduled agent queries your Spotify recently played and top tracks weekly, writes results to workspace. This page renders a visual dashboard: top artists this month, genre breakdown as a radial chart, listening hours per day, and your current "sound." More personal than Spotify Wrapped, and it runs year-round.`,
    keyTech: `Agent uses \`use_app_spotify\` for \`spotify-get-recently-played\` + \`spotify-get-top-items\`, writes to \`/home/workspace/Records/spotify-stats.json\`, SVG charts in React`,
  },
  {
    id: 78,
    name: `Micro-Journal Timeline`,
    route: `/timeline`,
    type: `Page`,
    visibility: `private` as const,
    description: `Reads all your journal files from \`/home/workspace/Persona/Journal/\` and renders them as a vertical timeline. Each entry is a card with date, time, and content. Search across entries. Filter by month. A private, visual way to browse your journal without opening files. Your diary as a single-page app.`,
    keyTech: `API route using \`fs.readdir\` + \`fs.readFile\` on journal directory, markdown parsing, \`useState\` for search/filter, infinite scroll with \`IntersectionObserver\``,
  },
  {
    id: 79,
    name: `HTTP Status Code Reference`,
    route: `/tools/http-codes`,
    type: `Both`,
    visibility: `public` as const,
    description: `Page shows all HTTP status codes with plain-English explanations, common causes, and how to fix them. API mode: \`GET /api/http-code/418\` returns JSON with code, name, description, and a dry one-liner. Searchable, bookmarkable, and actually useful when you're staring at a 422 at 1am.`,
    keyTech: `Status code data as a typed object in the route, \`useParams\` for direct code linking, \`c.req.param("code")\` for API, search via \`Array.filter\``,
  },
  {
    id: 80,
    name: `Personal RSS Feed`,
    route: `/api/feed.xml`,
    type: `API`,
    visibility: `public` as const,
    description: `Generates a valid RSS 2.0 XML feed from markdown files in a workspace directory (e.g., \`/home/workspace/Writing/\`). Anyone can subscribe to your writing in their RSS reader — no Medium, no Substack, no platform. You write markdown files, the feed updates automatically.`,
    keyTech: `\`fs.readdir\` + frontmatter parsing, RFC 822 date formatting, XML string construction, \`c.header("Content-Type", "application/rss+xml")\``,
  },
  {
    id: 81,
    name: `Expense Splitter`,
    route: `/tools/split`,
    type: `Page`,
    visibility: `private` as const,
    description: `Add people and expenses. Handles uneven splits, tax, tip, and who-paid-what. Outputs a minimal "who owes whom" settlement with the fewest possible transactions (graph-based debt simplification). Copy result as text to paste into a group chat. No app download, no Venmo account linking.`,
    keyTech: `Debt simplification algorithm (net balances + greedy matching), \`useReducer\` for complex state, clipboard API for copy-to-text`,
  },
  {
    id: 82,
    name: `DNS Lookup Tool`,
    route: `/tools/dns`,
    type: `Both`,
    visibility: `public` as const,
    description: `Page: enter a domain, see A, AAAA, CNAME, MX, TXT, NS records rendered cleanly. API: \`GET /api/dns?domain=example.com&type=MX\` returns JSON. Useful for debugging email delivery, verifying DNS propagation, or checking if someone's domain is actually configured.`,
    keyTech: `\`Bun.dns.resolve()\` or \`dns.promises.resolve\` from Node compat, \`c.req.query()\` for API params, tabbed UI for record types`,
  },
  {
    id: 83,
    name: `Conference Badge Page`,
    route: `/badge`,
    type: `Page`,
    visibility: `public` as const,
    description: `When you're at a conference, set this as your "digital badge" — your name, title, one-sentence bio, photo, QR code to your vCard, and links to your projects. Designed to be shown on a phone screen. Update it per event by editing a workspace file. Better than a paper badge with "JEFF" in Sharpie.`,
    keyTech: `Config from workspace file, full-viewport mobile-first layout, large type, QR canvas generation, \`<meta name="apple-mobile-web-app-capable">\``,
  },
  {
    id: 84,
    name: `Cron Expression Explainer`,
    route: `/tools/cron`,
    type: `Both`,
    visibility: `public` as const,
    description: `Page: type a cron expression, see a plain-English explanation and the next 10 run times in your timezone. API: \`GET /api/cron?expr=0 9 * * 1-5\` returns JSON with description and next runs. Because nobody actually remembers if the fifth field is day-of-week or day-of-month.`,
    keyTech: `Cron parsing logic built in-route (minute/hour/dom/month/dow), \`Intl.DateTimeFormat\` for timezone display, iteration algorithm for next-N runs`,
  },
  {
    id: 85,
    name: `Generative Poem Machine`,
    route: `/poem`,
    type: `Page`,
    visibility: `public` as const,
    description: `A scheduled agent writes one short poem per day — pulled from a theme list or inspired by the current weather/season — and saves it to workspace. The page renders today's poem in beautiful typography on a solid color background. Archive accessible via \`/poem/archive\`. An automated poetry installation.`,
    keyTech: `Agent uses Zo API for generation + \`web_search\` for weather context, writes to \`/home/workspace/Records/poems/YYYY-MM-DD.md\`, Newsreader at 2.5rem, single-poem-per-page layout`,
  },
  {
    id: 86,
    name: `WHOIS Lookup`,
    route: `/tools/whois`,
    type: `Both`,
    visibility: `public` as const,
    description: `Enter a domain, see registration date, expiry, registrar, nameservers, and status codes — parsed into readable format instead of raw WHOIS dump. API returns structured JSON. Handy for checking if a domain you want is squatted, when your own domains expire, or vetting a sketchy link.`,
    keyTech: `\`child_process.exec("whois domain")\` in API route, regex parsing of WHOIS output into structured fields, React table display`,
  },
  {
    id: 87,
    name: `WiFi QR Generator`,
    route: `/tools/wifi`,
    type: `Page`,
    visibility: `private` as const,
    description: `Enter your WiFi network name and password. Generates a QR code that, when scanned by a phone, auto-connects to the network. Print it, tape it to your router, or show it to guests. No more spelling out passwords. Supports WPA/WPA2/WEP/none.`,
    keyTech: `\`WIFI:T:WPA;S:networkname;P:password;;\` encoding format, canvas QR generation, print-optimized CSS, all client-side (password never leaves the browser)`,
  },
  {
    id: 88,
    name: `Idea Graveyard`,
    route: `/graveyard`,
    type: `Page`,
    visibility: `public` as const,
    description: `A public page listing project ideas you had but killed — with a one-paragraph obituary for each explaining what it was, why you killed it, and what you learned. Reverse-portfolio energy. Shows you think critically about what to build, not just what you ship. Reads from a workspace markdown file.`,
    keyTech: `API route parsing \`/home/workspace/Persona/graveyard.md\`, each entry as a \`## heading\` with metadata in frontmatter-style block, tombstone-inspired card design`,
  },
  {
    id: 89,
    name: `Uptime Monitor Dashboard`,
    route: `/status`,
    type: `Page`,
    visibility: `public` as const,
    description: `Public status page for your projects. A scheduled agent pings your sites every 5 minutes, logs response times and status codes. This page shows 90-day uptime percentage, response time sparklines, and current status per service. Your own Statuspage.io without the \$29/month.`,
    keyTech: `Agent runs \`curl -w "%{http_code} %{time_total}"\` per URL, appends to \`/home/workspace/Records/uptime/\`, page renders sparklines via SVG polyline, green/red status dots`,
  },
  {
    id: 90,
    name: `Regex Tester`,
    route: `/tools/regex`,
    type: `Page`,
    visibility: `public` as const,
    description: `Enter a regex pattern and test string. See matches highlighted in real-time, capture groups listed, and a plain-English explanation of what the regex does (generated by parsing the regex AST). Shows common patterns as quick-insert buttons. No ads, no account, no cookie banners.`,
    keyTech: `\`new RegExp()\` with \`matchAll\`, regex-to-English parser built from token types, \`contentEditable\` div for highlight overlay, \`useState\` with debounce`,
  },
  {
    id: 91,
    name: `Seasonal Landing Page Switcher`,
    route: `/`,
    type: `Page`,
    visibility: `public` as const,
    description: `Your homepage auto-switches its visual theme based on season — not just colors, but layout emphasis and featured content. Spring highlights new projects. Summer shows your availability. Fall features your writing. Winter goes minimal and reflective. Reads season from date + a config file mapping season to featured content.`,
    keyTech: `\`Date\` month → season mapping, config from workspace, CSS custom properties per season, \`useEffect\` for theme application, content blocks conditionally rendered`,
  },
  {
    id: 92,
    name: `Markdown to PDF API`,
    route: `/api/md2pdf`,
    type: `API`,
    visibility: `public` as const,
    description: `POST markdown text, receive a styled PDF. Uses pandoc on the server with a custom LaTeX template for clean typography. Useful for converting notes, proposals, or docs to PDF without installing anything locally. Your personal document conversion microservice.`,
    keyTech: `\`child_process.exec("pandoc")\` with \`--pdf-engine=tinylatex\`, temp file write/read, \`c.body(pdfBuffer)\` with PDF content-type headers`,
  },
  {
    id: 93,
    name: `IP Address Info`,
    route: `/api/myip`,
    type: `API`,
    visibility: `public` as const,
    description: `Returns the caller's IP address, approximate geolocation (via a free GeoIP database on the server), user agent, and request headers as clean JSON. The simplest possible "what's my IP" API. Useful for debugging, curl one-liners, and network diagnostics.`,
    keyTech: `\`c.req.header("x-forwarded-for")\`, GeoIP lookup via \`geoip-lite\` or MaxMind DB, \`c.json()\` response`,
  },
  {
    id: 94,
    name: `Wedding RSVP Page`,
    route: `/wedding`,
    type: `Both`,
    visibility: `public` as const,
    description: `A single-page wedding (or event) RSVP site. Guests see event details, location map embed, and an RSVP form (name, attending yes/no, dietary restrictions, plus-one). Submissions go to a workspace JSON file. A companion private page at \`/wedding/admin\` shows the guest list, headcount, and dietary summary.`,
    keyTech: `Form POST to \`/api/wedding/rsvp\`, file append to workspace, admin page with bearer auth check, responsive single-column layout`,
  },
  {
    id: 95,
    name: `Anchor Text Link Analyzer`,
    route: `/tools/links`,
    type: `Page`,
    visibility: `private` as const,
    description: `Paste HTML or a URL. The page extracts every \`<a>\` tag, lists the anchor text, href, whether it's internal/external, and flags potential SEO issues (generic anchor text like "click here", broken patterns, nofollow usage). Quick SEO audit for your own sites without paying for Ahrefs.`,
    keyTech: `API route fetching URL HTML, DOM-style regex parsing for \`<a>\` tags, classification logic for internal/external/nofollow, sortable React table`,
  },
  {
    id: 96,
    name: `Teach Me Anything Flashcard System`,
    route: `/cards/:deck`,
    type: `Page`,
    visibility: `private` as const,
    description: `Load flashcard decks from workspace markdown files (front/back separated by \`---\` within each card block). Implements spaced repetition (SM-2 algorithm) with review state stored in a companion JSON file. Keyboard-driven: space to flip, 1-4 to rate recall. Your own Anki without the 2003 UI.`,
    keyTech: `SM-2 algorithm for interval/ease calculation, \`useParams\` for deck routing, keyboard event listeners, API route for state persistence, card flip via CSS \`transform: rotateY\``,
  },
  {
    id: 97,
    name: `Personal Changelog`,
    route: `/changelog`,
    type: `Page`,
    visibility: `public` as const,
    description: `A public page documenting changes to your life and work — new projects launched, skills learned, tools adopted, cities visited, milestones hit. Not a blog. Not a resume. A versioned log of your own evolution. Entries from a workspace markdown file, rendered as a vertical timeline with version numbers.`,
    keyTech: `API route parsing \`/home/workspace/Persona/changelog.md\`, semver-style version numbers (v2026.4.1), timeline CSS with alternating left/right cards, Syne for headings`,
  },
  {
    id: 98,
    name: `Browser Fingerprint Viewer`,
    route: `/tools/fingerprint`,
    type: `Page`,
    visibility: `public` as const,
    description: `Shows visitors exactly what their browser reveals about them: user agent, screen resolution, timezone, installed fonts (via canvas fingerprinting), WebGL renderer, language, do-not-track status, and a rough uniqueness estimate. Educational — makes tracking tangible. No data is stored or sent anywhere.`,
    keyTech: `\`navigator\` API, \`canvas.getContext("2d")\` for font detection, \`WebGLRenderingContext.getParameter\` for GPU info, all computation client-side, results never leave the browser`,
  },
  {
    id: 99,
    name: `Self-Documenting Route Index`,
    route: `/map`,
    type: `Page`,
    visibility: `public` as const,
    description: `A meta-page that lists every route on your zo.space with its path, type (page/api), visibility (public/private), and a one-line description extracted from a comment at the top of each route's code. A scheduled agent regenerates the index nightly. The site that documents itself.`,
    keyTech: `Agent calls \`list_space_routes\` + \`get_space_route\`, parses \`// @desc\` comment from first line of each route, writes to workspace JSON, page renders as categorized directory`,
  },
  {
    id: 100,
    name: `The 404 Page That's Worth Finding`,
    route: `/404 (catch-all)`,
    type: `Page`,
    visibility: `public` as const,
    description: `Instead of a generic "page not found," this page shows a random interesting fact, a random project from your portfolio, or a random poem from your poem archive — different each visit. Includes a search bar and sitemap links. Turns a dead end into a reason to stay. The page nobody means to visit but everyone remembers.`,
    keyTech: `\`Math.random()\` selection from content arrays (fetched via API from workspace files), \`useEffect\` for random selection on mount, search input linking to \`/map\`, warm color palette distinct from main site`,
  },
];

export const automations: Automation[] = [
  {
    id: 1,
    name: `The Morning Briefing`,
    category: `Morning/daily routines`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `Email`,
    tools: `web_search, use_app_gmail, use_app_google_calendar`,
    prompt: `Build my morning briefing. Do these in parallel:

1. Check my Google Calendar for today's events and tomorrow's early events
2. Search for top 3 headlines in tech and AI from the last 24 hours
3. Check my Gmail for any unread emails marked important or from known contacts
4. Get today's weather for my location

Combine into a clean briefing email with these sections:
- 🗓 Today's Schedule (chronological, include prep time notes for meetings)
- 📰 Headlines (3 bullets, linked, with 1-sentence take on each)
- 📧 Inbox Priority (sender + subject for anything urgent)
- 🌤 Weather (temperature, conditions, "jacket or no jacket" verdict)

Send this to me via email with subject "Morning Briefing — [today's date]". Keep it scannable — no fluff.`,
    expectedOutput: `A concise email arriving at 7am with schedule, news, inbox highlights, and weather — everything needed to start the day without opening 5 apps.`,
    customization: `Change the news topics (replace "tech and AI" with your interests) and location for weather.`,
  },
  {
    id: 2,
    name: `Inbox Zero Digest`,
    category: `Email/inbox management`,
    schedule: `0 18 * * 1-5 (weekdays at 6pm)`,
    delivery: `SMS`,
    tools: `use_app_gmail`,
    prompt: `Check my Gmail inbox. Find all unread emails from today. Categorize them:

- ACTION NEEDED: emails requiring a reply or task from me
- FYI ONLY: newsletters, notifications, receipts, confirmations
- POSSIBLE SPAM: marketing emails I didn't opt into, cold outreach

For ACTION NEEDED emails, draft a reply for each one. Save drafts in Gmail.

Send me a text with:
- Count of each category
- List of ACTION NEEDED items (sender + subject)
- "Drafted replies for X emails — review in Gmail"

If there are no unread emails, text me "Inbox clear 🧹" and nothing else.`,
    expectedOutput: `An end-of-day SMS summarizing what's in your inbox and confirming draft replies are staged for quick review.`,
    customization: `Adjust the schedule for your end-of-workday time. Add specific senders to always flag as ACTION NEEDED.`,
  },
  {
    id: 3,
    name: `Weekly Content Planner`,
    category: `Content creation pipelines`,
    schedule: `0 9 * * 0 (Sundays at 9am)`,
    delivery: `File`,
    tools: `web_search, x_search, create_or_rewrite_file`,
    prompt: `Research what performed well on X/Twitter this week in the AI tools and indie dev space. Use x_search to find:
- Tweets with 500+ likes about AI tools, solo development, or building in public
- Trending topics and hashtags in the maker/builder community
- Any viral threads about personal projects or side hustles

Based on what's getting traction, create a 7-day content calendar for next week. For each day, provide:
- Platform (X, Substack, or both)
- Content type (thread, single post, article, screenshot walkthrough)
- Topic + specific angle
- Hook (opening line)
- Key points to cover (3-5 bullets)
- Best posting time

Write this to /home/workspace/Records/content-calendar-[next week's date range].md

Focus on angles that are personal, specific, and opinionated — not generic "5 tips for productivity" garbage.`,
    expectedOutput: `A complete week of content planned out, informed by what's actually working on the platform right now, saved as a markdown file.`,
    customization: `Change the niche (replace "AI tools and indie dev" with your area). Add your Substack URL for cross-promotion angles.`,
  },
  {
    id: 4,
    name: `Competitor Price Monitor`,
    category: `Financial/business tracking`,
    schedule: `0 10 * * 1 (Mondays at 10am)`,
    delivery: `Email`,
    tools: `web_search, read_webpage, send_email_to_user`,
    prompt: `I track competitors in the web design and AI tools space. Check the pricing pages for these URLs:
- https://www.squarespace.com/pricing
- https://www.wix.com/premium-purchase-plan/dynamo
- https://webflow.com/pricing
- https://carrd.co/pro

For each, record:
- Plan names and prices
- Any changes from last week (compare against /home/workspace/Records/competitor-prices.json if it exists)
- Any new features mentioned on the pricing page
- Any active promotions or discounts

Update /home/workspace/Records/competitor-prices.json with current data (include a timestamp).

If ANY prices changed, email me with subject "💰 Price Change Alert" and list what changed. If nothing changed, don't email — just update the JSON silently.`,
    expectedOutput: `A weekly silent price tracker that only alerts you when something actually changes — no noise, just signal.`,
    customization: `Replace the URLs with your actual competitors. Add or remove tracked services as needed.`,
  },
  {
    id: 5,
    name: `Daily Journal Prompt`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 21 * * * (daily at 9pm)`,
    delivery: `SMS`,
    tools: `web_search, send_sms_to_user`,
    prompt: `Generate a single journaling prompt for tonight. It should NOT be generic self-help ("What are you grateful for?"). Instead, pick from these styles randomly:

- A specific memory trigger ("Describe the last meal that surprised you")
- A future scenario ("Write a letter from yourself 5 years from now")
- An observation prompt ("What sound have you heard most today and what does it mean?")
- A values probe ("What rule do you follow that you've never explained to anyone?")
- A creative constraint ("Describe today using only 50 words")

Text me just the prompt. No preamble, no explanation. Just the question or instruction.`,
    expectedOutput: `A single, thoughtful journaling prompt delivered as a text message at 9pm — personal enough to actually make you think.`,
    customization: `Change the time to match your journaling window. Add your own prompt styles to the list.`,
  },
  {
    id: 6,
    name: `Freelance Lead Hunter`,
    category: `Financial/business tracking`,
    schedule: `0 8 * * 1,3,5 (Mon/Wed/Fri at 8am)`,
    delivery: `Email`,
    tools: `web_search, web_research, send_email_to_user`,
    prompt: `Search for freelance web design and development opportunities posted in the last 48 hours. Check:

1. web_search for "freelance web developer needed" and "hiring web designer freelance" with time_range="week"
2. web_research with category="tweet" for people tweeting about needing a website built
3. web_search for "small business website help" on Reddit (include_domains: ["reddit.com"])

Filter results to find leads that match:
- Small businesses or individuals (not agencies)
- Budget likely \$500+ (not "\$50 logo" type posts)
- Located in the US (preferred) or remote-friendly
- Actually need a website or web app (not just social media help)

For each qualified lead, provide:
- Source URL
- What they need (1 sentence)
- Why it's a fit (1 sentence)
- Suggested outreach approach (1 sentence)

Email me the top 5 leads with subject "🎣 Fresh Leads — [date]". If nothing good, send "Dry day — nothing worth pitching" and I'll know to skip.`,
    expectedOutput: `A curated list of 5 real freelance opportunities that match your skills and price range, delivered 3x/week.`,
    customization: `Adjust search terms to match your specific services. Change frequency based on how actively you're looking.`,
  },
  {
    id: 7,
    name: `Subscription Audit`,
    category: `Financial/business tracking`,
    schedule: `0 10 1 * * (1st of every month at 10am)`,
    delivery: `Email`,
    tools: `use_app_gmail, send_email_to_user`,
    prompt: `Search my Gmail for all subscription-related emails from the past 30 days. Look for:
- Receipts and payment confirmations
- "Your subscription has been renewed" emails
- Billing notifications from services (Stripe, PayPal, Apple, Google Play, etc.)

For each subscription found:
- Service name
- Amount charged
- Date charged
- Whether I've actually used this service in the past month (check if I have emails FROM this service that aren't just billing)

Compile into a report:
- Total monthly subscription spend
- Services I'm paying for but NOT using (no non-billing emails = not using)
- Services to review (charged but minimal usage signals)
- Estimated annual cost at current rate

Email me with subject "📊 Subscription Audit — [month]".`,
    expectedOutput: `A monthly breakdown of every subscription hitting your accounts, flagging ones you're paying for but not using.`,
    customization: `Works automatically with Gmail — no setup needed beyond having subscription receipts in your inbox.`,
  },
  {
    id: 8,
    name: `Social Proof Collector`,
    category: `Social media monitoring and posting`,
    schedule: `0 12 * * * (daily at noon)`,
    delivery: `File`,
    tools: `x_search, web_search, create_or_rewrite_file`,
    prompt: `Search for mentions of my work and brand across the web:

1. x_search for mentions of "jeffkazzee" or "jeff kazzee" or "backroad dev" or "worldfactbook.xyz" or "dumpling cafe"
2. web_search for the same terms, time_range="day"

For any NEW mentions found (compare against /home/workspace/Records/social-proof.json):
- Source URL
- What they said (quote or summary)
- Sentiment (positive/neutral/negative)
- Engagement metrics if visible

Append new mentions to /home/workspace/Records/social-proof.json with today's date.

If there are positive mentions, also append them to /home/workspace/Records/testimonials.md in a clean format I can use on my portfolio.

Only notify me (via SMS) if there's something negative that needs a response. Otherwise, silently log everything.`,
    expectedOutput: `A running log of every time you or your projects are mentioned online, with positive quotes auto-formatted for testimonial use.`,
    customization: `Replace the search terms with your own name, brand, and project names.`,
  },
  {
    id: 9,
    name: `Pet Expense Tracker`,
    category: `Financial/business tracking`,
    schedule: `0 20 * * 0 (Sundays at 8pm)`,
    delivery: `SMS`,
    tools: `use_app_gmail, send_sms_to_user`,
    prompt: `Search my Gmail for pet-related expenses this week. Look for:
- Receipts from pet stores (Chewy, Petco, PetSmart, local vet clinics)
- Veterinary bills or appointment confirmations
- Pet insurance correspondence
- Any email containing "pet", "vet", "dog", "puppy" in context of a purchase

Calculate this week's pet spending and compare to the running monthly total in /home/workspace/Records/pet-expenses.json (create if it doesn't exist).

Text me: "Lucky cost \$[amount] this week. Monthly total: \$[total]. [On track / Over budget] vs \$50/mo target."

If over budget, add a one-liner about what drove the overage.`,
    expectedOutput: `Weekly pet expense summary via text, tracking against a monthly budget target.`,
    customization: `Change the pet name, budget target, and store names. Add your specific vet clinic name.`,
  },
  {
    id: 10,
    name: `Stale Project Detector`,
    category: `Content creation pipelines`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `SMS`,
    tools: `run_bash_command, send_sms_to_user`,
    prompt: `Check my workspace for projects that might be going stale. For every directory under /home/workspace/Projects/:

1. Find the most recently modified file
2. Calculate days since last modification
3. Check if there's a _plan.md and read its status

Flag any project where:
- No file has been modified in 7+ days
- The _plan.md has unchecked items but nothing has been touched

Text me a summary like:
"🧊 Stale projects:
- zo-cookbook: last touched 3 days ago, 4 open tasks
- [project]: last touched 12 days ago ⚠️

🔥 Active:
- [project]: touched today"

Keep it short. Just the project names, days dormant, and a nudge.`,
    expectedOutput: `A Monday morning nudge showing which projects are gathering dust and which are active.`,
    customization: `Adjust the staleness threshold (7 days) to match your work rhythm.`,
  },
  {
    id: 11,
    name: `Weekly Revenue Dashboard`,
    category: `Financial/business tracking`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `Email`,
    tools: `use_app_gmail, web_search, send_email_to_user`,
    prompt: `Compile my weekly revenue report by checking:

1. Gmail for Stripe payment notifications from the past 7 days
2. Gmail for any PayPal or Venmo payment receipts
3. Gmail for any freelance invoice payment confirmations

For each payment found:
- Source/client name
- Amount
- What it was for (product, service, subscription)

Calculate:
- This week's total revenue
- Running monthly total
- Projected monthly total (if this week's rate continues)
- Gap to \$500/mo passive income goal

Email me with subject "💵 Weekly Revenue — [date range]" with the breakdown and a one-line assessment of whether I'm on track.`,
    expectedOutput: `A clean weekly revenue report tracking progress toward the \$500/mo passive income goal.`,
    customization: `Add your specific payment processors and client email domains for better detection.`,
  },
  {
    id: 12,
    name: `Daily Medication Reminder with Confirmation`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 8 * * * (daily at 8am)`,
    delivery: `SMS`,
    tools: `send_sms_to_user, read_file, create_or_rewrite_file`,
    prompt: `This is a medication adherence tracker. 

Check /home/workspace/Persona/medication-log.json for yesterday's entry:
- If yesterday shows "confirmed": true, good — just send today's reminder
- If yesterday shows "confirmed": false or missing, note the gap

Text me: "Morning meds reminder 💊 [streak count] days consistent. Reply 'done' when taken."

Log today's entry in the JSON as {"date": "[today]", "reminded": true, "confirmed": false}.

If there's a gap yesterday, add to the text: "⚠️ Missed yesterday's confirmation — did you take them?"`,
    expectedOutput: `A daily SMS reminder that tracks your medication streak and flags missed days.`,
    customization: `Adjust the time for your medication schedule. Add a second agent for evening meds if needed.`,
  },
  {
    id: 13,
    name: `Blog Post First Draft Generator`,
    category: `Content creation pipelines`,
    schedule: `0 6 * * 2 (Tuesdays at 6am)`,
    delivery: `File`,
    tools: `web_search, web_research, create_or_rewrite_file`,
    prompt: `Read /home/workspace/Records/content-ideas.md for the next unwritten topic (marked with [ ]). If no file exists or all are checked, pick a topic by:

1. Searching x_search for what indie devs and AI builders are discussing this week
2. Finding a gap — something people are asking about that nobody has written a clear answer to

Write a first draft blog post:
- 800-1200 words
- Written in first person, conversational, opinionated tone
- Include at least one specific personal example or anecdote placeholder marked [PERSONAL EXAMPLE: topic]
- Include 2-3 relevant links found via web_search
- End with a clear takeaway, not a generic conclusion

Save to /home/workspace/Projects/zo-cookbook/drafts/[slugified-title]-draft.md

Mark the topic as [~] in progress in the content-ideas file.`,
    expectedOutput: `A weekly first draft blog post, researched and structured, waiting in your workspace for editing.`,
    customization: `Change the day/time to match your writing schedule. Point it at your actual content ideas file.`,
  },
  {
    id: 14,
    name: `Hacker News Scout`,
    category: `Social media monitoring and posting`,
    schedule: `0 11 * * * (daily at 11am)`,
    delivery: `Email`,
    tools: `read_webpage, send_email_to_user`,
    prompt: `Fetch the current Hacker News front page from https://news.ycombinator.com. Parse the top 30 stories.

Filter for stories relevant to: AI tools, indie development, personal computing, open source, developer experience, or remote work.

For each relevant story (max 10):
- Title + HN link
- Points and comment count
- One-sentence summary of why it's relevant to an indie dev building with AI
- Whether I should comment (based on: is there an angle from my experience I could add?)

Email me with subject "HN Radar — [date]". If nothing relevant today, send "🫥 Quiet day on HN".`,
    expectedOutput: `A daily curated HN digest filtered for your specific interests, with commentary suggestions for visibility building.`,
    customization: `Change the filter topics to match your niche. Adjust the relevance threshold.`,
  },
  {
    id: 15,
    name: `Client Follow-Up Nudge`,
    category: `Financial/business tracking`,
    schedule: `0 10 * * 3 (Wednesdays at 10am)`,
    delivery: `SMS`,
    tools: `use_app_gmail, send_sms_to_user`,
    prompt: `Check my Gmail sent folder for emails to clients in the past 14 days. For each sent email:
- Check if there's been a reply
- Calculate days since I sent it

Find any emails where:
- I sent something 5+ days ago with no reply
- The email looked like it needed a response (proposal, question, deliverable, invoice)

Text me:
"📬 Follow-up needed:
- [Client name]: sent [what] [X] days ago, no reply
- [Client name]: sent [what] [X] days ago, no reply

Total: [N] pending follow-ups"

If all sent emails have replies, text "All caught up — no follow-ups needed 👍"`,
    expectedOutput: `A weekly nudge to follow up with clients who haven't responded, preventing opportunities from going cold.`,
    customization: `Adjust the days threshold and which sent emails count as "needing a response."`,
  },
  {
    id: 16,
    name: `Weekly Inspiration Feed`,
    category: `Content creation pipelines`,
    schedule: `0 8 * * 6 (Saturdays at 8am)`,
    delivery: `File`,
    tools: `web_search, x_search, image_search, create_or_rewrite_file`,
    prompt: `Curate a weekend inspiration feed by searching for:

1. 3 beautiful personal websites launched this week (web_search "portfolio site of the week" OR "personal website inspiration")
2. 3 interesting open source projects trending on GitHub this week (web_research category="github")
3. 3 thought-provoking tweets about building, creating, or indie business (x_search)
4. 2 design references — striking visual work (web_search "design inspiration" time_range="week")

For each item:
- URL
- Why it's interesting (1 sentence, be specific — not "nice design")
- One thing I could steal/adapt for my own work

Save to /home/workspace/Records/inspiration/[date]-feed.md

End with a "Pick of the Week" — the single item I should spend 10 minutes studying.`,
    expectedOutput: `A curated inspiration file every Saturday morning to fuel weekend creative work.`,
    customization: `Change the categories to match what inspires you. Add specific designers/developers you want to track.`,
  },
  {
    id: 17,
    name: `Email Newsletter Summarizer`,
    category: `Email/inbox management`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `File`,
    tools: `use_app_gmail, create_or_rewrite_file`,
    prompt: `Search my Gmail for newsletter emails received in the last 24 hours. Identify newsletters by looking for:
- Unsubscribe links in the email
- Sent via known newsletter platforms (Substack, Mailchimp, ConvertKit, Beehiiv, Buttondown)
- "Newsletter" or "digest" in the subject

For each newsletter found:
- Publication name
- Subject line
- 3-bullet summary of the key points
- One "worth clicking" link if any are included
- Rating: 🔥 Must-read | 📎 Skim | 🗑️ Skip

Save the digest to /home/workspace/Records/newsletter-digests/[date].md

Mark newsletters rated 🗑️ three times in a row with a note: "Consider unsubscribing from [name]"`,
    expectedOutput: `A daily file that distills all your newsletters into 3-bullet summaries so you can skip the ones that aren't worth your time.`,
    customization: `Add specific newsletters you always want marked as 🔥 Must-read regardless of content.`,
  },
  {
    id: 18,
    name: `Automated Invoice Generator`,
    category: `Financial/business tracking`,
    schedule: `0 9 1 * * (1st of every month at 9am)`,
    delivery: `File + Email`,
    tools: `use_app_gmail, use_app_google_calendar, create_or_rewrite_file, send_email_to_user`,
    prompt: `Generate monthly invoices for my freelance clients.

1. Check Google Calendar for client meetings/work sessions last month
2. Check Gmail for any project-related correspondence that indicates completed work
3. Read /home/workspace/Business/clients.json for client rates and billing info (create template if missing)

For each active client:
- Calculate hours worked (from calendar events tagged with client name)
- List deliverables completed (from email threads about finished work)
- Generate invoice at the client's hourly/project rate
- Save as /home/workspace/Business/invoices/[month]-[client-name].md

Email me a summary: "📄 [N] invoices generated for [month]. Total: \$[amount]. Review in workspace before sending."

Do NOT send invoices to clients — only generate and notify me.`,
    expectedOutput: `Monthly invoices auto-generated from your calendar and email activity, ready for review before sending.`,
    customization: `Set up clients.json with your client info. Adjust how hours are detected based on how you name calendar events.`,
  },
  {
    id: 19,
    name: `Motivation Text When It's Cold`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `SMS (conditional)`,
    tools: `web_search, send_sms_to_user`,
    prompt: `Check the current weather in Salmon, Idaho.

If the temperature is below 20°F (-6°C):
- Text me something warm and encouraging. Not corny affirmations. Something real, like:
  - A specific reason today matters based on what day it is
  - A reminder about what I'm building and why it's worth leaving the warm bed
  - A practical suggestion for the cold (hot drink recipe, podcast recommendation for the cold walk)

If the temperature is above 20°F, do nothing. Don't text. Silence is fine.

Keep the text under 160 characters if possible. Make it feel like it came from a friend who knows how cold Idaho gets.`,
    expectedOutput: `A warm text only on genuinely cold mornings — not daily noise, just when it actually matters.`,
    customization: `Change the location and temperature threshold. Adjust the tone to match what motivates you.`,
  },
  {
    id: 20,
    name: `Weekly Skill Gap Analyzer`,
    category: `Content creation pipelines`,
    schedule: `0 10 * * 0 (Sundays at 10am)`,
    delivery: `File`,
    tools: `web_search, web_research, create_or_rewrite_file`,
    prompt: `Analyze the current job market and trending skills for full-stack developers and AI builders:

1. web_search for "most in-demand developer skills 2026" time_range="month"
2. web_research category="github" for trending repositories this week
3. web_search for "hiring full stack developer" to see what companies are asking for

Compare against my known stack: React, Next.js, TypeScript, Tailwind, Supabase, Python, Bun, AI tooling.

Identify:
- Skills I already have that are in high demand (confidence boost)
- Skills I'm missing that keep appearing in listings (gap)
- Emerging tools/frameworks gaining traction (watch list)

For each gap, suggest:
- One specific resource (tutorial, repo, or docs) to start learning
- Estimated time to basic competency
- Whether it's worth learning NOW or just watching

Save to /home/workspace/Records/skill-analysis/[date].md`,
    expectedOutput: `A weekly reality check on where your skills stand relative to the market, with actionable learning suggestions.`,
    customization: `Update your current skill list as you learn new things. Focus the search on your target job market.`,
  },
  {
    id: 21,
    name: `Dream Client Research Dossier`,
    category: `Financial/business tracking`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `File`,
    tools: `web_search, web_research, read_webpage, create_or_rewrite_file`,
    prompt: `Read /home/workspace/Business/dream-clients.md for the next unresearched prospect (create with 5 example businesses if missing).

For that prospect:
1. Find their current website and screenshot/analyze it
2. Identify obvious problems (slow, outdated, not mobile-friendly, poor SEO, missing features)
3. Check their social media presence and recent activity
4. Look for their competitors' websites for comparison
5. Search for any reviews or public feedback about their business

Write a research dossier:
- Business overview (what they do, where they're located, estimated size)
- Current web presence grade (A-F with specific reasons)
- Top 3 improvements I could pitch
- Estimated value of those improvements to their business
- Suggested outreach angle (what would make them respond to a cold email)

Save to /home/workspace/Business/prospects/[business-name].md
Mark as researched in dream-clients.md.`,
    expectedOutput: `A thorough research dossier on one prospect per week, with specific pain points you can reference in outreach.`,
    customization: `Populate dream-clients.md with businesses in your area or niche you want to work with.`,
  },
  {
    id: 22,
    name: `Substack Performance Tracker`,
    category: `Content creation pipelines`,
    schedule: `0 8 * * 1 (Mondays at 8am)`,
    delivery: `Email`,
    tools: `read_webpage, web_search, send_email_to_user`,
    prompt: `Check my Substack analytics by reading my Substack dashboard (use the browser — I'm logged in on substack.com).

Gather:
- Total subscribers (free + paid)
- New subscribers this week
- Unsubscribes this week
- Most-read post this week
- Open rate trend

Also check:
- web_search for any external links to my Substack
- x_search for mentions of my Substack posts

Compile a weekly report:
- 📈 Growth: +X subscribers (net after unsubs)
- 📊 Engagement: [open rate]% average this week
- 🏆 Top post: [title] — [views]
- 🔗 External mentions: [count] (list sources)
- 💡 One suggestion for next week's post based on what performed

Email with subject "Substack Weekly — [date range]"`,
    expectedOutput: `A weekly Substack performance digest with growth metrics and content strategy suggestions.`,
    customization: `Works if you're logged into Substack in Zo's browser. Replace with your blog platform if not using Substack.`,
  },
  {
    id: 23,
    name: `Recipe Meal Planner`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 10 * * 0 (Sundays at 10am)`,
    delivery: `File + SMS`,
    tools: `web_search, create_or_rewrite_file, send_sms_to_user`,
    prompt: `Plan my meals for the week. Constraints:
- Budget: \$50-60 for groceries
- Cooking setup: Small camper kitchen (2-burner stove, mini oven, no dishwasher)
- Diet: No specific restrictions, but prefer whole foods over processed
- Batch cooking preferred (make once, eat 2-3 times)
- Must be realistic for one person

Search for recipes that fit these constraints. Plan:
- 3 batch-cook meals (dinner + next-day lunch)
- 2 simple dinners
- Breakfast: keep simple (eggs, oatmeal, fruit rotation)
- Snacks: 2-3 options

For each meal:
- Recipe name + link
- Ingredients
- Cook time
- Estimated cost

Generate a shopping list organized by store section (produce, dairy, protein, pantry).

Save to /home/workspace/Persona/meal-plans/week-of-[date].md

Text me just the shopping list so I have it on my phone.`,
    expectedOutput: `A complete weekly meal plan with a budget-optimized shopping list texted to your phone for the grocery run.`,
    customization: `Adjust budget, dietary restrictions, and kitchen constraints. Add favorite recipes or ingredients to always include.`,
  },
  {
    id: 24,
    name: `GitHub Activity Report`,
    category: `Content creation pipelines`,
    schedule: `0 8 * * 1 (Mondays at 8am)`,
    delivery: `File`,
    tools: `run_bash_command, create_or_rewrite_file`,
    prompt: `Check my GitHub activity for the past week. Run these commands:
- List all repos I've pushed to in the last 7 days
- Count total commits across all repos
- Identify which files/directories I changed most
- Check if any of my repos received new stars, forks, or issues

Compile a developer activity report:
- Total commits: [N]
- Repos touched: [list]
- Most active areas: [directories/files]
- Community activity: [stars, forks, issues]
- Streak: [consecutive days with commits]

Compare to the previous week (read /home/workspace/Records/github-activity/last.json if it exists).

Save this week's data to /home/workspace/Records/github-activity/last.json
Save the human-readable report to /home/workspace/Records/github-activity/week-of-[date].md

Include a "highlight" — the single most interesting thing I shipped this week, stated in one sentence I could tweet.`,
    expectedOutput: `A weekly GitHub activity report with trends, streaks, and a tweetable highlight of your best work.`,
    customization: `Requires GitHub to be connected. Adjust repos tracked if you want to focus on specific projects.`,
  },
  {
    id: 25,
    name: `Daily Standup to Myself`,
    category: `Morning/daily routines`,
    schedule: `0 9 * * 1-5 (weekdays at 9am)`,
    delivery: `File`,
    tools: `run_bash_command, read_file, create_or_rewrite_file`,
    prompt: `Generate my personal daily standup by checking:

1. What I worked on yesterday:
   - Check git log across all project repos for yesterday's commits
   - Check /home/workspace/Persona/Journal/ for yesterday's entry
   - Check recently modified files in /home/workspace/Projects/

2. What's planned for today:
   - Read any _plan.md files for active projects and find the next unchecked task
   - Check Google Calendar for today's events

3. Blockers:
   - Any _plan.md items marked [!] blocked
   - Any project files with TODO or FIXME comments added yesterday

Write a standup note:
Yesterday: [2-3 bullets]
Today: [2-3 bullets, with the first being the single most important task]
Blockers: [list or "None"]

Save to /home/workspace/Records/standups/[date].md`,
    expectedOutput: `A daily standup written for yourself, generated from actual activity — not what you think you did, but what the file system proves.`,
    customization: `Adjust the project directories scanned. Add specific task management tools if you use them.`,
  },
  {
    id: 26,
    name: `Weekly Backup Verification`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 2 * * 0 (Sundays at 2am)`,
    delivery: `Email (on failure only)`,
    tools: `run_bash_command, send_email_to_user`,
    prompt: `Perform a weekly workspace health check:

1. Check disk usage: how much space is used vs available
2. Count total files in workspace
3. Find the 10 largest files and check if any are unnecessary (temp files, .log files, node_modules)
4. Verify critical files exist:
   - /home/workspace/AGENTS.md
   - /home/workspace/SOUL.md
   - /home/workspace/Persona/IDENTITY.md
5. Check for any files modified in the last week that are unusually large (>50MB)

If everything looks healthy:
- Save a brief report to /home/workspace/Records/health-checks/[date].md
- Do NOT email me

If there are issues (low disk space, missing critical files, suspicious large files):
- Email me with subject "⚠️ Workspace Health Alert" with specifics`,
    expectedOutput: `A silent weekly health check that only bothers you when something is actually wrong.`,
    customization: `Add your own critical files to the verification list. Adjust the large file threshold.`,
  },
  {
    id: 27,
    name: `New Tool Discovery Digest`,
    category: `Content creation pipelines`,
    schedule: `0 12 * * 3 (Wednesdays at noon)`,
    delivery: `Email`,
    tools: `web_search, web_research, x_search, send_email_to_user`,
    prompt: `Find new developer tools, AI products, and indie projects launched this week:

1. web_search "launched this week" AND ("developer tool" OR "AI tool" OR "open source") time_range="week"
2. web_research category="github" for repos created this week with 100+ stars
3. web_search on Product Hunt for this week's top launches (include_domains: ["producthunt.com"])
4. x_search for "just launched" OR "just shipped" from indie dev accounts

Filter for tools relevant to: web development, AI-assisted coding, content creation, small business, solo developers.

For each discovery (max 10):
- Name + URL
- What it does (1 sentence)
- Why it's interesting (1 sentence)
- Free tier? (yes/no + limits)
- Could I build something like this on Zo? (yes/no + how)

Email with subject "🧪 Tool Radar — Week of [date]"`,
    expectedOutput: `A weekly roundup of new tools and projects in your space, with notes on which ones you could replicate on Zo.`,
    customization: `Adjust the filter categories. Add specific Product Hunt collections or GitHub topics.`,
  },
  {
    id: 28,
    name: `Sleep Pattern Logger`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 6 * * * (daily at 6am)`,
    delivery: `SMS`,
    tools: `send_sms_to_user, read_file, create_or_rewrite_file`,
    prompt: `This is a sleep tracking prompt. Text me:

"Good morning. When did you fall asleep last night and when did you wake up? (Example: 11pm-6:30am)"

Wait for my reply. When I respond with a time range:
- Parse the sleep and wake times
- Calculate total hours
- Log to /home/workspace/Persona/sleep-log.json with date, bedtime, wake time, total hours
- Calculate my 7-day sleep average
- Text back: "[hours]h last night. 7-day avg: [avg]h. [Assessment]"

Assessment rules:
- 7-8h avg: "On track 🟢"
- 6-7h avg: "Slipping — prioritize sleep tonight 🟡"
- <6h avg: "Sleep debt building. Consider an early night. 🔴"`,
    expectedOutput: `A daily sleep check-in via text that builds a rolling average and warns when sleep debt is accumulating.`,
    customization: `Adjust assessment thresholds based on your ideal sleep range. For epilepsy management, this data can be cross-referenced with seizure logs.`,
  },
  {
    id: 29,
    name: `Weekly Reading List Curator`,
    category: `Content creation pipelines`,
    schedule: `0 10 * * 5 (Fridays at 10am)`,
    delivery: `File`,
    tools: `web_search, web_research, read_webpage, create_or_rewrite_file`,
    prompt: `Build my weekend reading list. Search for long-form articles and essays published this week on:

1. AI and its impact on individual creators (not enterprise AI)
2. Independent software development and bootstrapping
3. Rural technology and digital access
4. Political technology and civic tech
5. Personal essays about unconventional career paths

For each piece (aim for 7-10 total):
- Title + URL
- Author
- Estimated read time
- 2-sentence preview
- Why I'd care (connected to my interests/work)

Rank them: top 3 are "Read this weekend," next 3-4 are "Save for later," rest are "Skim the intro."

Save to /home/workspace/Records/reading-lists/week-of-[date].md`,
    expectedOutput: `A curated weekend reading list matched to your interests, ranked by priority.`,
    customization: `Change the topic areas. Add specific publications or authors you always want included.`,
  },
  {
    id: 30,
    name: `Local Event Scanner`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 10 * * 4 (Thursdays at 10am)`,
    delivery: `SMS`,
    tools: `web_search, maps_search, send_sms_to_user`,
    prompt: `Search for events happening this weekend in and around Salmon, Idaho (and within 1 hour drive: Challis, Leadore, North Fork, Lemhi Valley area).

Check:
- web_search "[Salmon Idaho events this weekend]" time_range="week"
- web_search "[Lemhi County events]" time_range="week"
- maps_search for any venues, community centers, or event spaces in Salmon, ID

Look for:
- Community events (farmers markets, festivals, fundraisers)
- Outdoor activities (group hikes, fishing derbies, trailwork)
- Music or art events
- Free or cheap activities

Text me a short list:
"This weekend in Salmon:
🎪 [Event] — [where], [when]
🎪 [Event] — [where], [when]
Nothing? → 'Quiet weekend. Good for building.'"`,
    expectedOutput: `A Thursday text with local weekend events so you can plan ahead without having to search Facebook groups.`,
    customization: `Change the location and search radius. Add specific event types you prefer.`,
  },
  {
    id: 31,
    name: `API Uptime Monitor`,
    category: `Financial/business tracking`,
    schedule: `*/15 * * * * (every 15 minutes)`,
    delivery: `SMS (on failure only)`,
    tools: `run_bash_command, send_sms_to_user`,
    prompt: `Check if my public services are responding:

1. curl -s -o /dev/null -w "%{http_code}" https://jeffkazzee.zo.space/ (expect 200)
2. curl -s -o /dev/null -w "%{http_code}" https://worldfactbook.xyz/ (expect 200)

For each service:
- If status is 200: log "up" to /home/workspace/Records/uptime/[service].json
- If status is NOT 200: 
  - Check if it was down 15 minutes ago too (consecutive failure)
  - If first failure: log but don't alert (might be transient)
  - If consecutive failure: TEXT ME immediately "🔴 [service] is down. Status: [code]. Down since [time]."

When a service recovers after being down, text me "🟢 [service] is back up. Was down for [duration]."

Keep uptime percentage in the JSON (trailing 7 days).`,
    expectedOutput: `Silent monitoring of your public sites, with SMS alerts only on real outages (not transient blips).`,
    customization: `Add or remove URLs. Adjust the check interval (every 15 min is aggressive — every hour might be enough).`,
  },
  {
    id: 32,
    name: `Gratitude-Free Evening Reflection`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 20 * * * (daily at 8pm)`,
    delivery: `File`,
    tools: `read_file, run_bash_command, create_or_rewrite_file`,
    prompt: `Generate an evening reflection prompt that is NOT about gratitude. Check what I actually did today:

1. Read today's standup from /home/workspace/Records/standups/[today].md if it exists
2. Check git log for today's commits
3. Check recently modified files in the workspace

Based on what I actually worked on, generate a reflection that's one of:
- A hard question about the work ("You refactored X twice today. Are you avoiding the real problem?")
- A pattern observation ("Three days in a row of infrastructure work. When do you ship something a user sees?")
- A calibration check ("You planned 4 things this morning. You did 2. Was the plan wrong or the execution?")
- A creative prompt connected to the work ("The thing you built today — what if it had to work for 1000 people?")

Append to today's journal at /home/workspace/Persona/Journal/[date].md under a "## Evening Reflection" heading.

Do not text or email. This is private.`,
    expectedOutput: `A daily evening reflection written to your journal, grounded in what you actually did — not generic self-help.`,
    customization: `Adjust the tone. You can make it harsher (drill sergeant) or gentler (therapist) by changing the prompt style.`,
  },
  {
    id: 33,
    name: `Weather-Triggered Outdoor Reminder`,
    category: `Health/wellness reminders and logs`,
    schedule: `0 11 * * * (daily at 11am)`,
    delivery: `SMS (conditional)`,
    tools: `web_search, send_sms_to_user`,
    prompt: `Check today's weather in Salmon, Idaho.

Only text me if ALL of these are true:
- Temperature is between 45°F and 85°F
- No rain or snow expected
- Wind under 20mph
- It's not already past 3pm

If conditions are good, text me ONE suggestion:
- If it's been 3+ days since the last good-weather text: "Lucky needs a long walk and so do you. [temperature]°F, [conditions]. Go."
- If recent: "Another good one. Even 15 minutes outside counts."

If conditions aren't good, do nothing. Silence means stay in.

Keep a log of texts sent at /home/workspace/Persona/outdoor-log.json to track the "3+ days" rule.`,
    expectedOutput: `A nudge to go outside only when the weather is genuinely pleasant — respecting that you live somewhere with extreme weather.`,
    customization: `Adjust temperature range and conditions for your climate. Change the dog's name.`,
  },
  {
    id: 34,
    name: `Monthly Goal Review`,
    category: `Morning/daily routines`,
    schedule: `0 10 L * * (last day of every month at 10am)`,
    delivery: `File + Email`,
    tools: `read_file, run_bash_command, use_app_gmail, send_email_to_user, create_or_rewrite_file`,
    prompt: `Perform an end-of-month review by checking:

1. Revenue data from /home/workspace/Records/ (any revenue/payment tracking files)
2. Git activity across all repos for the month
3. Content published (check Substack via browser, check workspace for draft/published content)
4. Project progress (read all _plan.md files, compare checked vs unchecked items)
5. Journal entries from /home/workspace/Persona/Journal/ this month

Compile a monthly review:

## [Month] Review

### Revenue
- Total: \$[amount]
- Sources: [breakdown]
- vs \$500/mo goal: [gap or surplus]

### Shipped
- [List of things actually completed/launched]

### In Progress
- [List of things started but not finished]

### Dropped
- [Things I said I'd do but didn't]

### Key Insight
[One honest observation about the month — a pattern, a breakthrough, or a hard truth]

### Next Month Priority
[The single most important thing to focus on, based on this review]

Save to /home/workspace/Records/monthly-reviews/[month]-[year].md
Email me with subject "📋 [Month] Review" with the full report.`,
    expectedOutput: `An honest end-of-month review compiled from real data — not what you think happened, but what actually happened.`,
    customization: `Add specific goals or metrics you want tracked. Point it at your actual tracking files.`,
  },
  {
    id: 35,
    name: `Auto-Research Any Topic You're Curious About`,
    category: `Research and learning`,
    schedule: `0 6 * * * (daily at 6am)`,
    delivery: `File`,
    tools: `read_file, web_search, web_research, create_or_rewrite_file`,
    prompt: `Read /home/workspace/Records/curiosity-queue.md. Take the top unresearched topic (marked [ ]).

Spend real effort researching it:
1. web_search for overviews and explainers
2. web_research for academic/deep sources if the topic is technical
3. Find the single best resource (article, paper, video) on this topic

Write a research brief:
- What this is (2-3 paragraphs, assume I know nothing)
- Why it matters (1 paragraph, connected to something I care about)
- The one source I should actually read: [URL + why]
- 3 follow-up questions this raises
- Connections to my work or interests (if any)

Save to /home/workspace/Records/research/[slugified-topic].md
Mark the topic [x] in curiosity-queue.md.`,
    expectedOutput: `Wake up to a well-researched brief on whatever you were curious about yesterday. Just add topics to the queue before bed.`,
    customization: `Populate curiosity-queue.md with topics anytime. The agent works through them FIFO.`,
  },
  {
    id: 36,
    name: `Grocery Price Comparison`,
    category: `Home/life management`,
    schedule: `0 9 * * 6 (Saturdays at 9am)`,
    delivery: `SMS`,
    tools: `web_search, send_sms_to_user`,
    prompt: `I need to compare grocery prices for my weekly staples. Search for current prices at stores that deliver to or are near Salmon, Idaho:

Staples to check:
- Eggs (dozen)
- Milk (gallon)
- Chicken breast (per lb)
- Rice (5lb bag)
- Canned beans
- Bananas (per lb)
- Bread (loaf)
- Butter
- Coffee (12oz bag)
- Dog food (large bag, any quality brand)

Check Walmart, Albertsons/Safeway, and any local options via web_search.

Text me: "Best deals this week: [store] wins on [items]. Save ~\$[amount] vs [other store]. [Any notable sales or coupons found]"

Keep it under 3 texts worth of content. Just the actionable stuff.`,
    expectedOutput: `A Saturday morning text telling you where to shop this week to save the most on your regular groceries.`,
    customization: `Update the staples list. Change stores based on what's available in your area.`,
  },
  {
    id: 37,
    name: `Wikipedia Rabbit Hole`,
    category: `Research and learning`,
    schedule: `0 12 * * 6,0 (weekends at noon)`,
    delivery: `File`,
    tools: `read_webpage, create_or_rewrite_file`,
    prompt: `Take me on a Wikipedia rabbit hole. Start from a random interesting topic — NOT technology. Think: obscure historical events, weird biology, forgotten inventors, unusual geography, bizarre cultural practices.

1. Pick a starting article (something genuinely surprising)
2. Read it and find the most interesting link within it
3. Follow that link, read, find the next interesting connection
4. Do this 5 times (5 hops total)

For each stop:
- Article title + URL
- The most surprising fact (1-2 sentences)
- Why you followed the link you did (the connection)

End with: "The thread connecting all of these: [one sentence tying the whole journey together]"

Save to /home/workspace/Records/rabbit-holes/[date].md`,
    expectedOutput: `A weekend treat — a curated knowledge journey through Wikipedia that's actually interesting, not random.`,
    customization: `Change the exclusion (currently "NOT technology") to whatever you want to avoid. Add preferred starting topics.`,
  },
  {
    id: 38,
    name: `Bill Due Date Watchdog`,
    category: `Home/life management`,
    schedule: `0 8 * * * (daily at 8am)`,
    delivery: `SMS (conditional)`,
    tools: `use_app_gmail, read_file, send_sms_to_user`,
    prompt: `Check for upcoming bills:

1. Search Gmail for bill notifications, payment reminders, and "due date" emails from the last 14 days
2. Read /home/workspace/Persona/bills.json for known recurring bills (create with common ones if missing)
3. Cross-reference: are any bills due in the next 3 days?

If bills are due in 3 days or less:
Text me: "💸 Due soon: [Bill name] — \$[amount] due [date]. [Pay link if found in email]"

If bills are due TODAY:
Text me: "⚠️ DUE TODAY: [Bill name] — \$[amount]. Pay now."

If nothing due in the next 3 days, do nothing. Update bills.json with any new recurring bills detected from email.`,
    expectedOutput: `Timely bill payment reminders that come from scanning your actual email — no manual entry needed after initial setup.`,
    customization: `Seed bills.json with your known recurring bills for better accuracy from day one.`,
  },
  {
    id: 39,
    name: `Learn One Thing Before Bed`,
    category: `Research and learning`,
    schedule: `0 21 * * * (daily at 9pm)`,
    delivery: `SMS`,
    tools: `web_search, send_sms_to_user`,
    prompt: `Teach me one interesting thing I probably don't know. Rules:

- Must be a verifiable fact, not an opinion
- Should be surprising or counterintuitive
- Related to one of these rotating topics (pick based on day of week):
  Monday: History
  Tuesday: Science
  Wednesday: Geography
  Thursday: Language/linguistics
  Friday: Economics/business
  Saturday: Nature/biology
  Sunday: Art/music/culture

- Must NOT start with "Did you know..."
- Maximum 2 texts long
- Include the source URL at the end

Format: "[The fact, stated directly and interestingly.] — [source URL]"`,
    expectedOutput: `A nightly text with one genuinely interesting fact, rotating across topics so you build breadth.`,
    customization: `Change the topic rotation to subjects you want to learn about. Adjust the time.`,
  },
  {
    id: 40,
    name: `Pet Care Reminder Cycle`,
    category: `Home/life management`,
    schedule: `0 8 * * * (daily at 8am)`,
    delivery: `SMS (conditional)`,
    tools: `read_file, send_sms_to_user, create_or_rewrite_file`,
    prompt: `Check Lucky's care schedule in /home/workspace/Persona/pet-care.json (create with defaults if missing):

Defaults:
- Flea/tick treatment: monthly (1st of month)
- Heartworm pill: monthly (15th of month)
- Nail trim: every 3 weeks
- Vet checkup: every 6 months
- Teeth cleaning: every 6 months
- Food reorder: every 4 weeks (30lb bag)

Check if anything is due today or in the next 2 days.

If something is due:
Text: "🐕 Lucky reminder: [task] is due [today/tomorrow/in 2 days]. Last done: [date]."

If multiple things, combine into one text.
If nothing due, do nothing.

After any reminder is acknowledged (or 3 days pass), mark it done and calculate the next due date.`,
    expectedOutput: `Automatic pet care scheduling that tracks when treatments, vet visits, and supplies are due.`,
    customization: `Update the care schedule with your pet's specific needs. Add vaccinations, grooming, etc.`,
  },
  {
    id: 41,
    name: `Resume Tailor-on-Demand`,
    category: `Professional development`,
    schedule: `On-demand (not scheduled — run manually)`,
    delivery: `File`,
    tools: `read_file, read_webpage, create_or_rewrite_file`,
    prompt: `I found a job listing I want to apply to. The listing is at: {{job_listing_url}}

1. Read the job listing thoroughly
2. Read my base resume at /home/workspace/Business/resume-base.md
3. Analyze the gap between what they want and what my resume emphasizes

Tailor my resume:
- Reorder experience bullets to lead with the most relevant ones
- Adjust skill emphasis to match the listing's priorities
- Tweak project descriptions to highlight aspects relevant to this role
- Add a 2-sentence summary at the top customized to this specific position
- Flag any hard requirements I don't meet (be honest)

Save the tailored version to /home/workspace/Business/resumes/[company-name]-[role].md

Also generate a cover letter draft in the same directory: [company-name]-cover.md
- Address specific things mentioned in the listing
- Connect my background to their specific needs
- Keep it under 250 words
- Make it sound human, not templated`,
    expectedOutput: `A tailored resume and cover letter matched to a specific job listing, with honest gap analysis.`,
    customization: `Create resume-base.md with your full experience. Run this prompt manually whenever you find a listing.`,
  },
  {
    id: 42,
    name: `Daily Vocabulary Builder`,
    category: `Research and learning`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `SMS`,
    tools: `web_search, send_sms_to_user, create_or_rewrite_file`,
    prompt: `Teach me one uncommon but genuinely useful English word. Requirements:
- Not obscure for obscurity's sake — it should fill a gap where no common word does the job cleanly
- Include: the word, pronunciation, definition, and a real-world example sentence using it naturally
- The example should be from a context relevant to tech, writing, or building things
- NOT: SAT vocab, archaic terms, or words nobody uses in conversation

Text me: "[word] (pronunciation): [definition]. Example: '[sentence]'"

Log the word to /home/workspace/Persona/vocabulary.json with date and usage status.

Avoid repeating any word already in the log.`,
    expectedOutput: `A daily vocabulary word that's actually useful in professional writing and conversation.`,
    customization: `Change the context focus (tech/writing/building) to your field.`,
  },
  {
    id: 43,
    name: `Portfolio Auto-Updater`,
    category: `Professional development`,
    schedule: `0 10 * * 1 (Mondays at 10am)`,
    delivery: `File`,
    tools: `run_bash_command, read_file, list_space_routes, create_or_rewrite_file`,
    prompt: `Check for portfolio-worthy updates from the past week:

1. New zo.space routes created (list_space_routes)
2. New commits to public repos (check git log in workspace projects)
3. New files in /home/workspace/Projects/ that represent shipped work
4. New content published (check for recent blog/article files)

If anything new and portfolio-worthy was shipped:
- Generate a project card entry with: title, description (2 sentences), tech used, link (if public)
- Append to /home/workspace/Business/portfolio-updates.md
- Note which items should be added to the live portfolio at jeffkazzee.zo.space

If nothing shipped this week, write: "No new portfolio items this week. Last shipped: [most recent item and date]."`,
    expectedOutput: `A weekly check that catches anything you shipped and formats it for your portfolio — no manual tracking needed.`,
    customization: `Adjust what counts as "portfolio-worthy." Add specific project directories to monitor.`,
  },
  {
    id: 44,
    name: `Idea Capture to Structured Backlog`,
    category: `Creative/writing`,
    schedule: `On-demand (triggered by SMS)`,
    delivery: `File`,
    tools: `read_file, create_or_rewrite_file`,
    prompt: `I just texted you an idea. Take it and:

1. Clean it up into a structured idea entry:
   - Title: [concise name for the idea]
   - Category: [product | content | business | feature | experiment]
   - Core concept: [2-3 sentences, what it is and why it matters]
   - Effort estimate: [weekend project | week-long | multi-week | ongoing]
   - Potential value: [personal use | could monetize | social capital | learning]
   - Next step: [the single smallest action to explore this idea]

2. Append to /home/workspace/Startup Ideas DB/ideas.md

3. Reply: "Captured: [title]. Next step: [action]. Added to the backlog."

Don't over-think it. Fast capture is the goal. I can refine later.`,
    expectedOutput: `Raw ideas texted on the go get structured and filed into your idea backlog automatically.`,
    customization: `Change the categories to match your idea taxonomy. Add a scoring rubric if you want auto-prioritization.`,
  },
  {
    id: 45,
    name: `Weekly Network Ping`,
    category: `Professional development`,
    schedule: `0 10 * * 2 (Tuesdays at 10am)`,
    delivery: `Email (draft)`,
    tools: `use_app_gmail, read_file`,
    prompt: `Help me stay in touch with my professional network.

Read /home/workspace/Business/network.json (create a template if missing) for contacts with a "last_contacted" date.

Find 2-3 people I haven't contacted in 30+ days.

For each person, draft a short, personal email:
- Reference something specific about them (their work, a project they mentioned, their company)
- Keep it under 100 words
- Don't be fake — no "just checking in" or "hope this finds you well"
- Give them something useful: a link they'd find interesting, a compliment on something they shipped, or a genuine question
- Save as a Gmail DRAFT (do NOT send)

Log the contacts I drafted to in the JSON with today's date.

Don't pick the same people two weeks in a row. Rotate through the full list.`,
    expectedOutput: `2-3 personal email drafts queued in Gmail, ready for you to review and send — maintaining your network without the guilt of forgetting people.`,
    customization: `Populate network.json with your contacts. Add notes about each person for more personalized drafts.`,
  },
  {
    id: 46,
    name: `Notion Inbox Processor`,
    category: `Integration workflows`,
    schedule: `0 8,14,20 * * * (three times daily)`,
    delivery: `Silent`,
    tools: `use_app_notion`,
    prompt: `Check my Notion inbox (the database or page I use for quick captures).

For each unprocessed item:
1. Read the content
2. Determine what type it is: task, idea, reference, meeting note, or random thought
3. Move it to the appropriate Notion database/page:
   - Tasks → my Tasks database (add a due date if implied in the text)
   - Ideas → Ideas database
   - References → a References page
   - Meeting notes → relevant project page
   - Random thoughts → a "Fleeting Notes" page
4. Mark the inbox item as processed

Log a summary to /home/workspace/Records/notion-processing.log:
"[timestamp] Processed [N] items: [X] tasks, [Y] ideas, [Z] references"

Do this silently. No notifications unless an item can't be categorized (then SMS me asking where to put it).`,
    expectedOutput: `Your Notion inbox automatically triaged 3x/day — dump anything in, it gets sorted.`,
    customization: `Requires Notion connected. Set up your database structure first, then point the agent at the right pages.`,
  },
  {
    id: 47,
    name: `Gmail to Linear Ticket Creator`,
    category: `Integration workflows`,
    schedule: `0 */2 * * * (every 2 hours)`,
    delivery: `Silent`,
    tools: `use_app_gmail, use_app_linear`,
    prompt: `Check my Gmail for emails labeled "to-linear" (I'll apply this label manually to emails that need to become tasks).

For each labeled email:
1. Extract the key information: who sent it, what they need, any deadlines mentioned
2. Create a Linear issue:
   - Title: [sender name] — [subject, shortened]
   - Description: summarize the email's ask in 2-3 bullets, include original email date and sender
   - Priority: estimate based on urgency signals in the email (deadlines = urgent, "when you get a chance" = low)
3. Remove the "to-linear" label and add a "ticketed" label
4. Reply to the email thread with a draft: "Created ticket for this — will follow up by [estimated date based on priority]" (save as DRAFT, don't send)

Log: "[timestamp] Created [N] Linear tickets from Gmail"`,
    expectedOutput: `Label an email "to-linear" and it becomes a tracked ticket with a draft reply — no context switching.`,
    customization: `Requires Gmail and Linear connected. Change the label names to match your workflow.`,
  },
  {
    id: 48,
    name: `Calendar Gap Finder`,
    category: `Integration workflows`,
    schedule: `0 8 * * 1 (Mondays at 8am)`,
    delivery: `SMS`,
    tools: `use_app_google_calendar, send_sms_to_user`,
    prompt: `Look at my Google Calendar for this week (Monday through Friday).

Find:
- Total hours of meetings/events scheduled
- Longest uninterrupted free block each day
- Any back-to-back meetings with no buffer
- Days with the most free time
- Any events that overlap (double-booked)

Text me:
"This week: [N]h scheduled, [N]h free.
Best deep work blocks:
[Day]: [time range] ([hours]h)
[Day]: [time range] ([hours]h)
⚠️ [any warnings: double-bookings, back-to-backs, overloaded days]"

If my week is more than 60% booked, add: "Heavy week. Protect your free blocks."
If my week is less than 30% booked, add: "Light week. Good time to tackle something big."`,
    expectedOutput: `A Monday morning text showing your week's free blocks so you can plan deep work before the calendar fills up.`,
    customization: `Adjust the "heavy" and "light" thresholds. Add specific calendar names if you use multiple.`,
  },
  {
    id: 49,
    name: `Writing Streak Tracker`,
    category: `Creative/writing`,
    schedule: `0 22 * * * (daily at 10pm)`,
    delivery: `SMS`,
    tools: `run_bash_command, read_file, send_sms_to_user, create_or_rewrite_file`,
    prompt: `Check if I wrote anything today:

1. Look for new or modified files in:
   - /home/workspace/Persona/Journal/
   - /home/workspace/Projects/ (any .md files)
   - Any blog draft directories
2. Check git commits for today that touch .md files
3. Read /home/workspace/Persona/writing-streak.json for current streak

If I wrote today (any file modified with >100 words of content):
- Increment streak
- Text: "Day [N] ✍️" (just the number and emoji, nothing else)

If I did NOT write today:
- If streak was 0 already: don't text (no guilt trip for non-writers)
- If streak was 1-6: text "Streak ended at [N] days. Start fresh tomorrow."
- If streak was 7+: text "Lost a [N]-day streak. That stings. But you'll start again."
- Reset streak to 0

Update writing-streak.json.`,
    expectedOutput: `A minimal daily nudge that tracks your writing streak — celebrates consistency without being annoying about breaks.`,
    customization: `Adjust the word count threshold. Add or remove directories to monitor.`,
  },
  {
    id: 50,
    name: `Google Drive Cleanup Radar`,
    category: `Integration workflows`,
    schedule: `0 10 1 * * (1st of every month)`,
    delivery: `Email`,
    tools: `use_app_google_drive, send_email_to_user`,
    prompt: `Audit my Google Drive for cleanup opportunities:

1. Find files I own that haven't been opened in 6+ months
2. Find duplicate file names (same name in different folders)
3. Find large files (>50MB) and check if they're still relevant
4. Find files shared with people who might no longer need access (ex-collaborators, old clients)

Compile a report:
- Total Drive usage
- [N] files untouched for 6+ months (list top 10 by size)
- [N] potential duplicates
- [N] large files worth reviewing
- [N] files with stale sharing permissions

Email with subject "🧹 Drive Cleanup — [month]"

Include a "Quick wins" section: the 5 files that would free the most space if deleted.
Do NOT delete anything — just report.`,
    expectedOutput: `A monthly Google Drive audit that finds the cleanup opportunities without you having to dig through folders.`,
    customization: `Adjust the "stale" threshold (6 months). Add specific folders to exclude from the audit.`,
  },
  {
    id: 51,
    name: `Poetry Generator from Daily Life`,
    category: `Creative/writing`,
    schedule: `0 18 * * 5 (Fridays at 6pm)`,
    delivery: `File`,
    tools: `web_search, read_file, create_or_rewrite_file`,
    prompt: `Write an original poem based on this week's reality. Source material:

1. Read this week's journal entries from /home/workspace/Persona/Journal/
2. Check the weather this week in Salmon, Idaho
3. Read any recent git commit messages for what I built

Write a poem that:
- Is grounded in specific details from the week (not generic)
- Is 8-20 lines
- Has a consistent form (pick one: free verse with internal rhyme, haiku sequence, prose poem, or sonnet)
- Does NOT sound like a greeting card
- Treats the mundane seriously (code commits, dog walks, cold mornings can all be poetry)

Save to /home/workspace/Persona/poems/week-of-[date].md

No commentary. Just the poem and a one-line note about what inspired it.`,
    expectedOutput: `A weekly poem generated from the raw material of your actual life — not AI slop, but something rooted in specifics.`,
    customization: `Change the tone (darker, funnier, more experimental). Add specific life events you want reflected.`,
  },
  {
    id: 52,
    name: `Smart Shopping List Deduplicator`,
    category: `Home/life management`,
    schedule: `On-demand`,
    delivery: `SMS`,
    tools: `read_file, send_sms_to_user`,
    prompt: `I just added items to /home/workspace/Persona/shopping-list.md (or texted you a list).

1. Read the current shopping list
2. Remove exact duplicates
3. Merge similar items (e.g., "chicken breast" and "chicken" → "chicken breast")
4. Group by store section: Produce, Dairy, Meat, Pantry, Frozen, Household, Other
5. Check my meal plan (/home/workspace/Persona/meal-plans/) and add anything missing that's needed for this week's recipes
6. Estimate the total cost based on recent price data

Text me the clean, organized list:
"🛒 Shopping list ([N] items, ~\$[estimate]):
🥬 Produce: [items]
🥛 Dairy: [items]
🥩 Meat: [items]
📦 Pantry: [items]"`,
    expectedOutput: `A deduplicated, organized, cost-estimated shopping list texted to your phone when you're heading to the store.`,
    customization: `Works best when paired with the meal planner recipe (#23). Edit the store sections to match your grocery store layout.`,
  },
  {
    id: 53,
    name: `Tech Debt Tracker`,
    category: `Data collection and analysis`,
    schedule: `0 9 * * 5 (Fridays at 9am)`,
    delivery: `File`,
    tools: `run_bash_command, create_or_rewrite_file`,
    prompt: `Scan my active projects for tech debt signals:

For each directory under /home/workspace/Projects/:
1. Count TODO, FIXME, HACK, and XXX comments in code files
2. Find package.json/requirements.txt and check for outdated dependencies (compare version numbers against latest via web_search)
3. Look for files over 300 lines (complexity signal)
4. Check for console.log/print statements left in production code
5. Find any hardcoded URLs, API keys, or credentials (security debt)

Generate a tech debt report:
- Total debt items across all projects
- Severity breakdown: 🔴 Critical (security), 🟡 Warning (outdated deps, long files), 🟢 Minor (TODOs, console.logs)
- Top 5 items to fix this weekend (prioritized by impact)
- Week-over-week trend (compare to /home/workspace/Records/tech-debt/last.json)

Save to /home/workspace/Records/tech-debt/[date].md and update last.json`,
    expectedOutput: `A weekly tech debt inventory across all projects, prioritized so you can chip away at it systematically.`,
    customization: `Add project-specific rules (e.g., ignore certain TODO patterns). Adjust severity thresholds.`,
  },
  {
    id: 54,
    name: `Spotify Listening Report`,
    category: `Integration workflows`,
    schedule: `0 10 * * 0 (Sundays at 10am)`,
    delivery: `File`,
    tools: `use_app_spotify, create_or_rewrite_file`,
    prompt: `Check my Spotify listening activity for the past week:

1. Get my recently played tracks
2. Get my current top tracks and artists (short-term)
3. Check if I have any new Discover Weekly or Release Radar tracks

Compile a listening report:
- Most played artist this week
- Most played track this week
- Total unique artists listened to
- Genre distribution (estimate from artist info)
- New discoveries: tracks I played this week that I hadn't played before
- "Mood signature": based on the music patterns, what was my vibe this week? (upbeat, mellow, intense, nostalgic, etc.)

Save to /home/workspace/Persona/music/week-of-[date].md

If there's a noticeable shift in listening patterns (genre change, new artist dominating), note it as "🎵 Shift: [description]"`,
    expectedOutput: `A weekly music listening report that captures what you listened to and reads your mood from the patterns.`,
    customization: `Requires Spotify connected. Add specific playlists you want tracked.`,
  },
  {
    id: 55,
    name: `Daily Coding Challenge`,
    category: `Research and learning`,
    schedule: `0 9 * * 1-5 (weekdays at 9am)`,
    delivery: `File`,
    tools: `web_search, create_or_rewrite_file`,
    prompt: `Generate a daily coding challenge appropriate for a self-taught full-stack developer who builds with TypeScript, React, and Bun.

The challenge should:
- Be completable in 15-30 minutes
- Focus on one of: algorithms, data structures, system design patterns, TypeScript tricks, React patterns, API design
- Rotate topics across the week (don't repeat the same area two days in a row)
- Include: problem statement, input/output examples, constraints, and a hint (hidden behind a "Hint:" label)
- NOT be a LeetCode-style algorithm puzzle unless it has practical applications
- Prefer challenges that build skills relevant to real projects

Save to /home/workspace/Records/challenges/[date].md

Include a "Why this matters" section explaining when you'd actually use this skill.
At the bottom, include a solution (but encourage attempting before reading).`,
    expectedOutput: `A daily coding challenge delivered to your workspace, focused on practical skills rather than algorithmic trivia.`,
    customization: `Adjust difficulty level and topic areas. Add specific technologies you're learning.`,
  },
  {
    id: 56,
    name: `Camper Maintenance Tracker`,
    category: `Home/life management`,
    schedule: `0 9 1 * * (1st of every month)`,
    delivery: `SMS`,
    tools: `read_file, send_sms_to_user, create_or_rewrite_file`,
    prompt: `Check the camper maintenance schedule in /home/workspace/Persona/camper-maintenance.json (create with these defaults if missing):

- Propane check: monthly
- Water filter: every 3 months
- Roof seal inspection: every 6 months (spring and fall)
- Battery check: monthly in winter, quarterly otherwise
- Tire pressure: monthly
- Winterization: October
- De-winterization: April
- Deep clean: quarterly
- Pest inspection: monthly (spring through fall)
- Generator service: every 6 months

Check what's due this month. Text me:
"🏕️ Camper checklist for [month]:
- [Task] (last done: [date] / never)
- [Task] (last done: [date])

[Seasonal note if applicable, e.g., 'April = de-winterization month']"

If nothing is due, text "Camper's good this month 👍"`,
    expectedOutput: `A monthly camper maintenance reminder that prevents things from falling through the cracks.`,
    customization: `Update the maintenance items for your specific camper setup. Adjust seasonal items for your climate.`,
  },
  {
    id: 57,
    name: `Automated Client Testimonial Request`,
    category: `Professional development`,
    schedule: `0 10 15 * * (15th of every month)`,
    delivery: `Email (draft)`,
    tools: `use_app_gmail, read_file`,
    prompt: `Check my Gmail for any projects completed in the last 30 days (look for "project complete", "site is live", "looks great", positive client responses).

For each completed project:
1. Identify the client and what was delivered
2. Draft a testimonial request email:
   - Reference the specific work done
   - Make it easy: suggest 2-3 specific questions they could answer instead of asking for a generic testimonial
   - Include: "Even a 2-sentence response would be huge for my portfolio"
   - Offer to write a draft they can edit (based on their positive emails about the work)
   - Keep it under 150 words

Save as Gmail DRAFTS. Do NOT send.

Log which clients were drafted for in /home/workspace/Business/testimonial-requests.json to avoid re-asking.`,
    expectedOutput: `Monthly testimonial request drafts queued in Gmail for completed projects — the ask most freelancers forget to make.`,
    customization: `Adjust the trigger criteria for "completed project." Add specific client email domains to watch.`,
  },
  {
    id: 58,
    name: `Dependency Update Scout`,
    category: `Data collection and analysis`,
    schedule: `0 8 * * 3 (Wednesdays at 8am)`,
    delivery: `File`,
    tools: `run_bash_command, web_search, create_or_rewrite_file`,
    prompt: `Check all package.json and requirements.txt files in /home/workspace/Projects/ for outdated dependencies.

For each project:
1. List current dependency versions
2. Search for the latest version of each
3. Check changelogs/release notes for anything breaking or security-related

Generate a report:
- [Project name]: [N] deps outdated, [N] with security advisories
  - [package]: [current] → [latest] | [severity: patch/minor/major] | [breaking changes: yes/no]
  - ...

Prioritize:
🔴 Security patches: update immediately
🟡 Minor versions with useful features
🟢 Major versions (review before updating)

Save to /home/workspace/Records/dep-updates/[date].md

Only flag items where the version difference is significant (skip patch-level bumps with no security implications).`,
    expectedOutput: `A weekly dependency health check that prioritizes security updates and filters out noise.`,
    customization: `Exclude specific projects or dependencies that you intentionally keep pinned.`,
  },
  {
    id: 59,
    name: `Daily Commit Message Improver`,
    category: `Creative/writing`,
    schedule: `0 18 * * 1-5 (weekdays at 6pm)`,
    delivery: `File`,
    tools: `run_bash_command, create_or_rewrite_file`,
    prompt: `Review my git commits from today across all projects.

For each commit:
- Original message
- Files changed (count and names)
- Diff size (rough lines added/removed)

Assess each commit message:
- Is it descriptive enough that someone else could understand what changed and why?
- Does it follow conventional commit patterns? (feat:, fix:, refactor:, docs:, etc.)
- Is it too vague? ("update stuff", "fix bug", "wip")

Rewrite any weak commit messages and save to /home/workspace/Records/commit-reviews/[date].md:

Original: "fix bug"
Suggested: "fix(auth): resolve token expiry check that allowed stale sessions past 24h"
Why: [what makes the new version better]

End with a "Commit hygiene score: [X/10]" for today.`,
    expectedOutput: `A daily review of your commit messages with suggested improvements — building better documentation habits over time.`,
    customization: `Change the scoring criteria. Add your project's specific commit conventions.`,
  },
  {
    id: 60,
    name: `Email Unsubscribe Advisor`,
    category: `Email/inbox management`,
    schedule: `0 10 1 * * (1st of every month)`,
    delivery: `Email`,
    tools: `use_app_gmail, send_email_to_user`,
    prompt: `Analyze my email patterns over the last 30 days:

1. Find all newsletters and marketing emails (identify by unsubscribe links)
2. For each sender:
   - How many emails they sent this month
   - How many I actually opened (check if I replied or interacted)
   - Whether I ever click links in their emails
   - Whether I've ever marked them as read without opening

Categorize each sender:
- 📬 Engaged: I regularly open and read these (keep)
- 😐 Passive: I sometimes skim these (review)
- 🗑️ Noise: I never open these or always mark-read (unsubscribe)

Email me:
"📧 Email audit — [month]
[N] regular senders found
[N] recommended unsubscribes (saving ~[N] emails/month)

Unsubscribe candidates:
[List with sender name, frequency, and open rate]

Action: Reply 'yes' and I'll draft unsubscribe actions for each."`,
    expectedOutput: `A monthly email audit that identifies which newsletters you actually read vs. ignore, with unsubscribe recommendations.`,
    customization: `Add specific senders to a "never unsubscribe" list. Adjust the engagement thresholds.`,
  },
  {
    id: 61,
    name: `Linear Sprint Review`,
    category: `Integration workflows`,
    schedule: `0 9 * * 5 (Fridays at 9am)`,
    delivery: `Email`,
    tools: `use_app_linear, send_email_to_user`,
    prompt: `Review my Linear activity for the week:

1. List all issues I moved to "Done" this week
2. List all issues still "In Progress"
3. List all issues created this week
4. Check for any issues that have been "In Progress" for more than 5 days (stale)

Compile a sprint review:
## This Week
✅ Completed: [N] issues
🔄 In Progress: [N] issues
📝 Created: [N] issues
⚠️ Stale (5+ days): [N] issues

### Completed
[List each with title and date completed]

### Still Open
[List each with title, days in progress, and priority]

### Stale Items
[List with suggested action: break into smaller tasks, reprioritize, or drop]

### Velocity Note
[Compare to last week if /home/workspace/Records/sprint-reviews/last.json exists]

Email with subject "Sprint Review — Week of [date]"
Save to /home/workspace/Records/sprint-reviews/ and update last.json.`,
    expectedOutput: `A Friday sprint review that shows what you shipped, what's stuck, and how your velocity compares to last week.`,
    customization: `Requires Linear connected. Adjust the "stale" threshold and add specific project filters.`,
  },
  {
    id: 62,
    name: `RSS Feed Digest Builder`,
    category: `Data collection and analysis`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `File`,
    tools: `read_webpage, create_or_rewrite_file`,
    prompt: `Check these RSS/Atom feeds for new posts from the last 24 hours:

- https://hnrss.org/newest?points=100 (top HN stories)
- https://www.theverge.com/rss/index.xml
- https://feeds.arstechnica.com/arstechnica/index
- https://blog.pragmaticengineer.com/rss/

For each feed:
1. Fetch the feed URL using read_webpage
2. Parse for items published in the last 24 hours
3. Summarize each new item in 1-2 sentences

Compile into a clean daily digest:
## Feed Digest — [date]

### Hacker News (100+ points)
- [Title]: [summary] ([link])
...

### The Verge
...

Save to /home/workspace/Records/feed-digests/[date].md

If a total of 0 new items across all feeds, save a note: "Quiet day across feeds" and skip the file.`,
    expectedOutput: `A daily digest of your favorite feeds, pre-summarized, waiting in your workspace each morning.`,
    customization: `Replace the feed URLs with your own favorites. Add or remove feeds as interests change.`,
  },
  {
    id: 63,
    name: `Client Project Status Board Generator`,
    category: `Professional development`,
    schedule: `0 8 * * 1,4 (Mon & Thu at 8am)`,
    delivery: `zo.space update`,
    tools: `read_file, list_space_routes, update_space_route`,
    prompt: `Read client project data from /home/workspace/Business/client-projects.json (create template if missing).

For each active project:
- Client name
- Project description
- Current phase
- Completion percentage (estimate from _plan.md if available)
- Next milestone
- Any blockers

Update the zo.space page at /clients (private, owner-only) with a clean status dashboard:
- Card per project showing status, progress bar, and next milestone
- Color-coded: 🟢 On track, 🟡 At risk, 🔴 Blocked
- Last updated timestamp

This page serves as my private client dashboard — I can check it from my phone to know where everything stands.`,
    expectedOutput: `A live private dashboard on your zo.space showing all client project statuses, updated twice weekly.`,
    customization: `Populate client-projects.json with your actual projects. Adjust update frequency.`,
  },
  {
    id: 64,
    name: `Calendar Conflict Preventer`,
    category: `Integration workflows`,
    schedule: `0 20 * * 0 (Sundays at 8pm)`,
    delivery: `SMS`,
    tools: `use_app_google_calendar, send_sms_to_user`,
    prompt: `Look at my Google Calendar for the entire upcoming week.

Check for:
1. Double-bookings (overlapping events)
2. Back-to-back meetings with no travel/transition time
3. Meetings during times I've blocked for deep work (any event labeled "focus" or "deep work")
4. Days with 4+ meetings (overloaded)
5. Meetings without a location or video link

Text me ONLY if problems are found:
"📅 Week ahead — [N] conflicts:
⚠️ [Day]: [Event A] overlaps with [Event B] at [time]
⚠️ [Day]: Back-to-back [Event A] → [Event B], no buffer
⚠️ [Day]: [N] meetings — heavy day

Fix these before Monday?"

If the week is clean, don't text. Silence means all clear.`,
    expectedOutput: `A Sunday evening text if your upcoming week has scheduling conflicts — giving you time to fix them before Monday.`,
    customization: `Adjust what counts as a conflict. Add your "deep work" event labels.`,
  },
  {
    id: 65,
    name: `Automated Screenshot Archive`,
    category: `Data collection and analysis`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `File`,
    tools: `run_bash_command, create_or_rewrite_file`,
    prompt: `Take screenshots of my public-facing properties for archival:

1. jeffkazzee.zo.space (homepage)
2. worldfactbook.xyz (if it's still up)
3. My Substack page
4. My GitHub profile (github.com/jeffkazzee)
5. My X/Twitter profile

Use agent-browser to visit each URL and capture a full-page screenshot.

Save screenshots to /home/workspace/Records/screenshots/[date]/
- [service-name]-[date].png

Also save a text snapshot of key metrics visible on each page (follower counts, post counts, subscriber counts if visible).

Append metrics to /home/workspace/Records/screenshots/metrics.json with today's date.

This creates a visual and data record of how my web presence evolves over time.`,
    expectedOutput: `Weekly screenshots and metrics snapshots of all your public profiles — useful for tracking visual changes and growth.`,
    customization: `Add or remove URLs. Change frequency (monthly might be enough for slow-changing profiles).`,
  },
  {
    id: 66,
    name: `Smart Google Drive to Workspace Sync`,
    category: `Integration workflows`,
    schedule: `0 */4 * * * (every 4 hours)`,
    delivery: `Silent`,
    tools: `use_app_google_drive, create_or_rewrite_file`,
    prompt: `Check my Google Drive folder called "Zo Sync" (or create a note to set one up if it doesn't exist).

For any new or modified files in that folder:
1. Download the file content
2. Convert Google Docs to markdown
3. Save to /home/workspace/Documents/drive-sync/[filename].md
4. Log the sync to /home/workspace/Records/drive-sync.json

This lets me drop files into a Drive folder from any device and have them appear in my Zo workspace automatically.

If no changes detected, do nothing silently.
If sync fails for a file, log the error but don't notify unless it fails 3 times in a row.`,
    expectedOutput: `A silent bridge between Google Drive and your Zo workspace — drop a file in Drive, it appears in your workspace.`,
    customization: `Change the Drive folder name. Adjust sync frequency. Add specific file type handling rules.`,
  },
  {
    id: 67,
    name: `End-of-Day Context Capture`,
    category: `Creative/writing`,
    schedule: `0 17 * * 1-5 (weekdays at 5pm)`,
    delivery: `File`,
    tools: `run_bash_command, read_file, create_or_rewrite_file`,
    prompt: `Capture my end-of-day context so tomorrow-me can pick up where today-me left off.

Check:
1. All files modified today across /home/workspace/Projects/
2. Git status of all repos (uncommitted changes, branch names)
3. Any running services or active agents
4. Open _plan.md files and their current state
5. Today's standup notes if they exist

Write a "context dump":
## End of Day — [date]

### Where I Left Off
[The specific file/function/task I was last touching, based on most recent modification timestamps]

### Uncommitted Work
[List any unstaged or uncommitted changes and which project they belong to]

### Open Threads
[Anything in-progress from _plan.md files]

### Tomorrow's First Move
[Based on what's in progress, the single best thing to start with tomorrow morning]

Save to /home/workspace/Records/context/[date].md

This is my "pick up where I left off" breadcrumb trail.`,
    expectedOutput: `A daily context capture that eliminates the "where was I?" problem every morning.`,
    customization: `Adjust the directories scanned. Add specific projects to always check.`,
  },
  {
    id: 68,
    name: `Competitor Content Tracker`,
    category: `Competitive intelligence and market monitoring`,
    schedule: `0 8 * * 1,4 (Mon/Thu at 8am)`,
    delivery: `File`,
    tools: `web_search, x_search, read_webpage, create_or_rewrite_file`,
    prompt: `Monitor my competitors' content and product moves:

Read /home/workspace/Business/competitors.json for tracked companies (create template if missing with 5 placeholder entries).

For each competitor:
1. Check their blog/website for new posts (read_webpage on their blog URL)
2. x_search for their brand name and any announcements
3. web_search for "[competitor name] launch" or "[competitor name] update" time_range="week"

Report:
## Competitor Intel — [date]

### [Competitor 1]
- New content: [title + URL] or "Nothing new"
- Social activity: [summary of X presence]
- Notable moves: [any product changes, pricing changes, partnerships]

### [Competitor 2]
...

### Patterns
[1-2 sentences on what the market is doing collectively]

### Opportunities
[1-2 things none of them are doing that I could do]

Save to /home/workspace/Business/competitor-intel/[date].md`,
    expectedOutput: `Twice-weekly competitive intelligence digests that track what your competitors are shipping and saying.`,
    customization: `Populate competitors.json with real competitors, their website URLs, and X handles.`,
  },
  {
    id: 69,
    name: `Personal CRM Touch Tracker`,
    category: `Personal CRM and relationship management`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `Email`,
    tools: `use_app_gmail, use_app_google_calendar, read_file, send_email_to_user`,
    prompt: `Manage my personal CRM:

1. Read /home/workspace/Business/crm.json for all contacts and their last interaction dates
2. Check Gmail for any emails exchanged with these contacts in the past 7 days
3. Check Google Calendar for any meetings with these contacts
4. Update last interaction dates based on email/calendar activity

Generate a relationship health report:

🟢 Active (contact in last 14 days): [list with last interaction type]
🟡 Cooling (14-30 days): [list — these need a touch]
🔴 Cold (30+ days): [list — these need attention]
🆕 New contacts detected in email this week: [list — ask if they should be added to CRM]

For each 🟡 contact, suggest a specific reason to reach out (based on their industry, last conversation topic, or recent news about them).

Email with subject "CRM Weekly — [N] contacts need attention"
Update crm.json with current states.`,
    expectedOutput: `A weekly CRM health check that prevents relationships from going cold and suggests specific outreach reasons.`,
    customization: `Build crm.json over time by adding contacts. Include notes about each person for better outreach suggestions.`,
  },
  {
    id: 70,
    name: `AI Art Daily Challenge`,
    category: `Generative/creative art and media pipelines`,
    schedule: `0 12 * * * (daily at noon)`,
    delivery: `File + zo.space update`,
    tools: `generate_image, web_search, create_or_rewrite_file, update_space_route`,
    prompt: `Generate a daily AI art piece based on a creative constraint:

Rotate through these themes (by day of week):
- Monday: Landscape inspired by today's weather in Salmon, Idaho
- Tuesday: Abstract representation of a programming concept
- Wednesday: "A border collie in the style of [random art movement]"
- Thursday: Reimagine a mundane object as beautiful
- Friday: Visual metaphor for this week's biggest news story
- Saturday: Pure experimentation — combine 3 random words into an image
- Sunday: Idaho wilderness in an unexpected medium (watercolor, pixel art, ukiyo-e, etc.)

For each image:
1. Generate a thoughtful prompt (not generic)
2. Generate the image using generate_image
3. Save metadata: prompt used, theme, date
4. Upload the image as a zo.space asset at /images/daily-art/[date].png
5. Update a gallery page at /art on zo.space showing the last 7 days

Log the full history to /home/workspace/Records/daily-art/log.json`,
    expectedOutput: `A daily AI-generated art piece with a rotating creative theme, displayed on a public gallery page.`,
    customization: `Change the themes. Add your own creative constraints. Make the gallery public or private.`,
  },
  {
    id: 71,
    name: `Revenue Per Hour Optimizer`,
    category: `Revenue generation`,
    schedule: `0 10 * * 5 (Fridays at 10am)`,
    delivery: `Email`,
    tools: `use_app_gmail, use_app_google_calendar, read_file, send_email_to_user`,
    prompt: `Calculate my revenue per hour for each active income stream this week:

1. Check Gmail for payment notifications and invoice confirmations
2. Check Google Calendar for time spent on each client/project
3. Read /home/workspace/Business/ for any tracked project data

For each income source:
- Revenue this week
- Hours spent (from calendar)
- Revenue per hour
- Trend vs last week

Report:
## Revenue per Hour — Week of [date]

| Source | Revenue | Hours | \$/hr | Trend |
|--------|---------|-------|------|-------|
| [Client A] | \$X | Xh | \$X/hr | ↑/↓/→ |
| [Product] | \$X | Xh | \$X/hr | ↑/↓/→ |

**Best \$/hr:** [source] at \$[amount]/hr
**Worst \$/hr:** [source] at \$[amount]/hr
**Weighted average:** \$[X]/hr

**Insight:** [One specific recommendation — should I raise rates somewhere? Drop a low-value client? Double down on the highest \$/hr source?]

Email with subject "💰 \$/hr Report — Week of [date]"`,
    expectedOutput: `A weekly breakdown of which work is most profitable per hour, with actionable recommendations on where to focus.`,
    customization: `Set up calendar events with client names for automatic tracking. Add project rate data to Business/ files.`,
  },
  {
    id: 72,
    name: `Automated Changelog for Shipped Features`,
    category: `Revenue generation`,
    schedule: `0 17 * * 5 (Fridays at 5pm)`,
    delivery: `File + zo.space update`,
    tools: `run_bash_command, read_file, create_or_rewrite_file, update_space_route`,
    prompt: `Generate a weekly changelog from my git activity:

1. For each project in /home/workspace/Projects/, get this week's git log
2. Group commits by project
3. Translate technical commit messages into user-facing changelog entries
4. Categorize: ✨ New, 🔧 Improved, 🐛 Fixed, 🗑️ Removed

Format as a clean changelog:
## Week of [date range]

### [Project Name]
✨ **New:** [feature description in plain language]
🔧 **Improved:** [what got better]
🐛 **Fixed:** [what was broken, now works]

Save to /home/workspace/Records/changelogs/week-of-[date].md

Also update a public changelog page at /changelog on zo.space with the latest entries.
This builds a public record of what you're shipping — useful for building trust with clients and followers.`,
    expectedOutput: `A weekly changelog auto-generated from commits, published publicly to show you're actively shipping.`,
    customization: `Exclude personal/private projects from the public changelog. Adjust the commit-to-changelog translation style.`,
  },
  {
    id: 73,
    name: `Smart Bookmark Manager`,
    category: `Personal CRM and relationship management`,
    schedule: `0 20 * * * (daily at 8pm)`,
    delivery: `File`,
    tools: `read_file, web_search, create_or_rewrite_file`,
    prompt: `Process my bookmark queue.

Read /home/workspace/Records/bookmarks-queue.md for any URLs added today (I'll append URLs to this file throughout the day).

For each URL:
1. Fetch the page and read it
2. Categorize: article, tool, reference, inspiration, video, resource
3. Write a 2-sentence summary
4. Extract 1-3 tags
5. Rate relevance to my interests (1-5 stars)

Move processed bookmarks to the appropriate section in /home/workspace/Records/bookmarks.md:
- Organized by category, then by date
- Include: URL, title, summary, tags, and rating

Clear the queue file.

If any bookmark is rated 5 stars, add it to /home/workspace/Records/bookmarks-best.md with a note about why it's exceptional.`,
    expectedOutput: `A daily bookmark processor that turns a messy URL dump into an organized, searchable reference library.`,
    customization: `Add your own categories and tagging rules. Integrate with the reading list recipe (#29) for overlap.`,
  },
  {
    id: 74,
    name: `Passive Income Opportunity Scanner`,
    category: `Revenue generation`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `Email`,
    tools: `web_search, web_research, x_search, send_email_to_user`,
    prompt: `Search for passive income opportunities that match my skills (React, TypeScript, AI tools, web design, content creation):

1. web_search "developer passive income ideas 2026" time_range="month"
2. web_research category="tweet" for devs sharing revenue numbers from side projects
3. web_search "sell digital products developer" time_range="month"
4. web_search for marketplaces where developers sell templates, tools, or components

Filter for opportunities where:
- Initial build time < 2 weeks
- Has evidence of people paying (not just theoretical)
- Matches my tech stack
- Doesn't require a large audience to start

For each opportunity (max 5):
- What it is
- Evidence it works (specific revenue numbers from real people)
- How I could build it on Zo
- Estimated build time
- Revenue potential (conservative estimate)

Email with subject "💡 Passive Income Radar — [date]"

This is a research tool, not a get-rich-quick scanner. Only surface things with real evidence.`,
    expectedOutput: `A weekly scan of passive income opportunities filtered for your specific skills and constraints.`,
    customization: `Adjust the skill filter and build time constraint. Add specific marketplaces to always check.`,
  },
  {
    id: 75,
    name: `Agent Health Monitor`,
    category: `Self-improving systems`,
    schedule: `0 */6 * * * (every 6 hours)`,
    delivery: `SMS (on failure only)`,
    tools: `run_bash_command, read_file, send_sms_to_user`,
    prompt: `Check the health of all my running automations:

1. List all active scheduled agents
2. For each agent, check:
   - Last run time (is it running on schedule?)
   - Last output (did it succeed or error?)
   - Output size (empty output = probable failure)
3. Check /dev/shm/ for any error logs from space routes or services

Report:
- Total agents: [N]
- Healthy: [N]
- Missed last run: [N] (list them)
- Errored last run: [N] (list with error summary)

If ALL healthy: do nothing (silence = healthy)
If ANY unhealthy: text me "[N] automations need attention: [names]. Check agent dashboard."

Save full health report to /home/workspace/Records/agent-health/[date-time].json`,
    expectedOutput: `Silent monitoring of all your automations — you only hear about it when something breaks.`,
    customization: `Adjust check frequency. Add specific agents to always monitor closely.`,
  },
  {
    id: 76,
    name: `Auto-Generate Social Proof Screenshots`,
    category: `Revenue generation`,
    schedule: `0 10 * * 1 (Mondays at 10am)`,
    delivery: `File`,
    tools: `run_bash_command, read_file, generate_image, create_or_rewrite_file`,
    prompt: `Generate social proof images for my portfolio and social media:

1. Read /home/workspace/Records/social-proof.json for recent positive mentions
2. Read /home/workspace/Records/testimonials.md for client quotes
3. Check this week's metrics: followers, subscribers, revenue milestones

For any new positive mentions or milestones:
1. Generate a clean, branded screenshot-style image with:
   - The quote or metric
   - Attribution (who said it or where it's from)
   - My brand colors and typography (Syne + Space Grotesk)
   - Clean dark background

Save generated images to /home/workspace/Images/social-proof/[date]-[type].png
Log which proofs were generated to /home/workspace/Records/social-proof-images.json

These images are ready to post on X, LinkedIn, or embed in my portfolio.`,
    expectedOutput: `Auto-generated social proof images from real testimonials and metrics, ready for posting.`,
    customization: `Adjust brand colors and typography. Add specific templates for different social platforms.`,
  },
  {
    id: 77,
    name: `Knowledge Base Auto-Builder`,
    category: `Self-improving systems`,
    schedule: `0 22 * * 0 (Sundays at 10pm)`,
    delivery: `File`,
    tools: `run_bash_command, read_file, create_or_rewrite_file`,
    prompt: `Compile this week's learning into a searchable knowledge base:

1. Read all files created/modified this week in /home/workspace/Records/
2. Read this week's research briefs, reading list notes, and challenge solutions
3. Extract key concepts, tools, and techniques learned

Update /home/workspace/Records/Knowledge/knowledge-index.md:
- Add new entries in format: **[Topic]**: [1-sentence explanation] | Source: [file path] | Date: [date]
- Organize alphabetically by topic
- Tag each with category: #code, #design, #business, #writing, #personal
- Remove duplicate entries

Also update /home/workspace/Records/Knowledge/weekly-learnings/[date].md:
- What I learned this week (5-10 key items)
- What I want to explore next
- Connections between this week's learnings

This builds a personal knowledge graph over time.`,
    expectedOutput: `A weekly update to your personal knowledge base, making everything you learn searchable and connected.`,
    customization: `Add specific directories to scan. Change the taxonomy categories to match your interests.`,
  },
  {
    id: 78,
    name: `Emergency Seizure Log`,
    category: `Emergency/safety systems`,
    schedule: `On-demand (triggered by SMS with keyword "seizure" or "episode")`,
    delivery: `File + SMS confirmation`,
    tools: `read_file, create_or_rewrite_file, send_sms_to_user`,
    prompt: `I'm logging a seizure episode. When I text "seizure" or "episode":

1. Log the timestamp (in my timezone) to /home/workspace/Persona/health/seizure-log.json
2. Ask via text: "Duration? (short/medium/long) Any triggers you noticed?"
3. When I reply, add the details to the log entry
4. Cross-reference with:
   - Sleep data from /home/workspace/Persona/sleep-log.json (was sleep low?)
   - Medication log (was a dose missed?)
   - Weather data (was there a pressure change?)

Text back: "Logged. [Duration]. Last episode was [N] days ago. [Any pattern notes: sleep was low, dose was missed, barometric pressure dropped, etc.]"

Keep a running summary at /home/workspace/Persona/health/seizure-summary.md:
- Total episodes by month
- Average time between episodes
- Most common triggers (based on correlation data)
- Trend: improving / stable / worsening`,
    expectedOutput: `Quick seizure logging via text with automatic correlation to sleep, medication, and environmental data.`,
    customization: `Add your specific triggers to watch for. Adjust the cross-reference data sources. Share the summary with your neurologist.`,
  },
  {
    id: 79,
    name: `Micro-SaaS Revenue Monitor`,
    category: `Revenue generation`,
    schedule: `0 8 * * * (daily at 8am)`,
    delivery: `SMS (on milestone only)`,
    tools: `use_app_gmail, read_file, send_sms_to_user, create_or_rewrite_file`,
    prompt: `Track revenue across all my products and income streams:

1. Check Gmail for Stripe payment notifications from the last 24 hours
2. Check for any other payment confirmations (PayPal, direct transfers)
3. Update /home/workspace/Business/revenue-tracker.json with:
   - Date, amount, source, type (one-time/recurring)

Calculate:
- Today's revenue
- This month's total
- Monthly recurring revenue (MRR)
- Progress toward \$500/mo goal: [X]% ([gap or surplus])
- Projected end-of-month total at current rate

Only text me if:
- New payment received: "💰 +\$[amount] from [source]. Monthly total: \$[X] ([Y]% of goal)"
- Monthly milestone hit: "🎯 Hit \$[100/200/300/400/500] this month!"
- Goal achieved: "🏆 \$500/mo goal reached! Total: \$[amount]"

If no new payments, update the tracker silently.`,
    expectedOutput: `Silent revenue tracking with milestone-based SMS celebrations — only texts you when money comes in or goals are hit.`,
    customization: `Adjust the goal amount. Add specific payment sources to track.`,
  },
  {
    id: 80,
    name: `Automated Project Post-Mortem`,
    category: `Self-improving systems`,
    schedule: `On-demand (triggered when a project _plan.md has all tasks checked)`,
    delivery: `File`,
    tools: `read_file, run_bash_command, create_or_rewrite_file`,
    prompt: `A project just finished. Generate a post-mortem:

1. Read the project's _plan.md for what was planned
2. Check git log for the project's full commit history
3. Calculate: time from first commit to last commit
4. Count: total commits, files created, lines of code
5. Read any critique checkpoints or notes in the plan

Write a post-mortem:
## [Project Name] — Post-Mortem

### What was built
[2-3 sentences, what shipped]

### Timeline
- Planned: [what the plan estimated]
- Actual: [how long it actually took]
- Deviation: [faster/slower and why]

### What went well
[3 specific things]

### What went wrong
[3 specific things — be honest]

### What I'd do differently
[2-3 actionable items for next time]

### Key learning
[The single most important thing this project taught me]

Save to /home/workspace/Records/post-mortems/[project-name].md`,
    expectedOutput: `An honest post-mortem for every completed project, building a library of lessons learned.`,
    customization: `Run this manually when you finish a project. The questions can be customized per project type.`,
  },
  {
    id: 81,
    name: `Community Event Generator`,
    category: `Community/civic engagement`,
    schedule: `0 10 1 * * (1st of every month)`,
    delivery: `File + Email`,
    tools: `web_search, maps_search, create_or_rewrite_file, send_email_to_user`,
    prompt: `Help me contribute to the Salmon, Idaho community:

1. Search for community needs:
   - web_search "[Salmon Idaho community events volunteer]" time_range="month"
   - web_search "[Lemhi County community needs]"
   - maps_search for community centers, libraries, and nonprofits in Salmon, ID

2. Based on my skills (web design, development, AI tools), identify:
   - Local organizations that could use a website upgrade (check their current sites)
   - Community events I could volunteer tech skills at
   - Pro bono project opportunities
   - Local businesses that might benefit from my services

Report:
## Community Opportunities — [month]

### Pro Bono Possibilities
[Organizations with bad/no websites that I could help]

### Volunteer Opportunities
[Events or ongoing needs]

### Potential Clients
[Businesses that might pay for web work]

### Community Need I Could Build
[One idea for a tool or site that would serve the Salmon community]

Save to /home/workspace/Records/community/[month].md
Email me the highlights.`,
    expectedOutput: `A monthly scan of how you could contribute to your local community, combining altruism with business development.`,
    customization: `Change the location. Add specific causes or organizations you care about.`,
  },
  {
    id: 82,
    name: `Personal API for Life Data`,
    category: `Self-improving systems`,
    schedule: `0 0 * * * (daily at midnight)`,
    delivery: `zo.space update`,
    tools: `read_file, run_bash_command, update_space_route`,
    prompt: `Aggregate today's life data into a personal API endpoint:

Read from all available tracking files:
- Sleep: /home/workspace/Persona/sleep-log.json
- Writing: /home/workspace/Persona/writing-streak.json
- Revenue: /home/workspace/Business/revenue-tracker.json
- Health: /home/workspace/Persona/health/ (any tracking files)
- Git activity: run git log for today's commits
- Outdoor time: /home/workspace/Persona/outdoor-log.json

Compile into a JSON summary:
{
  "date": "[today]",
  "sleep_hours": X,
  "writing_streak": X,
  "revenue_today": X,
  "revenue_mtd": X,
  "commits_today": X,
  "went_outside": true/false,
  "mood_signals": "[derived from available data]"
}

Save to /home/workspace/Records/daily-data/[date].json

Update the API route at /api/me (private, bearer-token protected) to serve the latest data.
This is your personal quantified-self API — query it from any device or integration.`,
    expectedOutput: `A private API endpoint that serves your life metrics, updated daily from all your tracking data.`,
    customization: `Add or remove data sources. Build a private dashboard page that reads from this API.`,
  },
  {
    id: 83,
    name: `Strategic Follow-Up After Events`,
    category: `Personal CRM and relationship management`,
    schedule: `On-demand (run after attending any event, meetup, or conference)`,
    delivery: `File + Email drafts`,
    tools: `read_file, web_search, use_app_gmail, create_or_rewrite_file`,
    prompt: `I just attended {{event_name}}. Help me follow up strategically.

Read /home/workspace/Business/event-contacts.md for people I met (I'll add names and brief notes).

For each person:
1. web_search and web_research to find their online presence (LinkedIn, X, personal site)
2. Find something specific about their work to reference
3. Draft a personalized follow-up email:
   - Reference something specific we discussed (from my notes)
   - Mention something I found interesting about their work
   - Offer one specific way I could be useful to them
   - Keep it under 100 words
   - Save as Gmail DRAFT

Create a follow-up tracker at /home/workspace/Business/event-followups/[event-name].md:
- Person name, their info, draft status, follow-up sent (yes/no)
- Set a 2-week reminder to check who hasn't responded

Log contacts to the main CRM at /home/workspace/Business/crm.json.`,
    expectedOutput: `Personalized follow-up drafts for everyone you met at an event, with research on each person to make the outreach genuine.`,
    customization: `Run this within 48 hours of any event. Add your notes about each person for better personalization.`,
  },
  {
    id: 84,
    name: `Automated A/B Test for Subject Lines`,
    category: `Revenue generation`,
    schedule: `On-demand`,
    delivery: `File`,
    tools: `web_search, create_or_rewrite_file`,
    prompt: `I need to send an email about: {{email_topic}}

Generate 5 subject line variants, each using a different psychological angle:
1. Curiosity gap ("The thing about X that nobody talks about")
2. Specificity ("How I did X in Y minutes using Z")
3. Contrarian ("Why X is actually wrong")
4. Social proof ("What 1000 users taught me about X")
5. Direct benefit ("Get X without Y")

For each subject line:
- The subject line text (under 60 characters)
- Which psychological principle it uses
- Predicted open rate relative to the others (rank 1-5)
- Best audience for this angle

Also generate:
- Preview text for each (the text that shows after the subject in inbox)
- Best send time based on the audience

Save to /home/workspace/Business/email-tests/[date]-[topic-slug].md

Recommend: "Send #[X] for this audience because [reason]."`,
    expectedOutput: `Five psychologically distinct subject line options with preview text and send time recommendations.`,
    customization: `Add your actual audience info for more accurate recommendations. Track which approaches work over time.`,
  },
  {
    id: 85,
    name: `Daily Gratitude-Free Reflection (For People Who Hate Gratitude Journals)`,
    category: `Personal CRM and relationship management`,
    schedule: `0 21 * * * (daily at 9pm)`,
    delivery: `File`,
    tools: `read_file, create_or_rewrite_file`,
    prompt: `Write tonight's reflection. No gratitude lists. No toxic positivity. Instead, one of these (rotate daily):

Monday — TENSION: What felt off today? Name the friction without resolving it.
Tuesday — OBSERVATION: Describe one thing you noticed today that most people would miss.
Wednesday — CONTRADICTION: Name something you believe that contradicts something else you believe.
Thursday — REGRET: One thing you'd do differently if you could replay today.
Friday — ENERGY: Map your energy today. When were you alive? When were you coasting? When were you dead?
Saturday — CONNECTION: Who did you interact with? How did it go? (Include Lucky.)
Sunday — DIRECTION: Are you headed where you want to go? Zoom out.

Write the reflection question to /home/workspace/Persona/Journal/[date].md under "## Evening Prompt"

Keep it to one paragraph of honest prompting. No fluff. No "remember you're doing great." Just the question and space to answer.`,
    expectedOutput: `A daily rotating reflection prompt that's more honest and useful than a gratitude journal.`,
    customization: `Rewrite the daily themes to match what you actually want to reflect on.`,
  },
  {
    id: 86,
    name: `Automated Landing Page Tester`,
    category: `Revenue generation`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `File`,
    tools: `run_bash_command, read_webpage, create_or_rewrite_file`,
    prompt: `Audit my public landing pages:

1. Fetch https://jeffkazzee.zo.space/ and any other public space routes
2. For each page, check:
   - Load time (curl timing)
   - Whether all images load
   - Whether links work (no 404s)
   - Meta tags present (title, description, OG tags)
   - Mobile-friendliness (viewport meta tag present)
   - Accessibility basics (alt text on images, heading hierarchy)

3. Read the copy and evaluate:
   - Is the value proposition clear within 5 seconds?
   - Is there a clear call to action?
   - Does it sound human or AI-generated?

Report:
## Landing Page Audit — [date]

### [Page URL]
- Performance: [load time]ms — [fast/acceptable/slow]
- Broken links: [N]
- SEO: [score/10] — [what's missing]
- Copy: [assessment]
- Top 3 improvements: [actionable items]

Save to /home/workspace/Records/page-audits/[date].md`,
    expectedOutput: `A weekly automated audit of your public pages, catching broken links, slow loads, and copy issues.`,
    customization: `Add all your public URLs. Adjust the evaluation criteria for your specific needs.`,
  },
  {
    id: 87,
    name: `Smart Digest of Calendar Attendees`,
    category: `Personal CRM and relationship management`,
    schedule: `0 7 * * 1-5 (weekdays at 7am, before meetings)`,
    delivery: `Email`,
    tools: `use_app_google_calendar, web_search, web_research, send_email_to_user`,
    prompt: `Check my Google Calendar for today's meetings.

For each meeting with external attendees (people I don't meet with daily):
1. Identify attendees by email
2. Search for each attendee: name, title, company, recent work
3. Check if we've met before (search Gmail for prior correspondence)

Generate a pre-meeting brief for each meeting:

## [Meeting name] — [time]
### Attendees
- [Name] | [Title] at [Company] | [LinkedIn URL if found]
  - What they do: [1 sentence]
  - Last interaction: [date and context, or "First meeting"]
  - Talking point: [one specific thing about them I could reference]

Email with subject "Meeting Prep — [date]"

If all meetings today are internal/solo, don't send anything.`,
    expectedOutput: `Pre-meeting dossiers on everyone you're meeting with today, so you walk in prepared.`,
    customization: `Define what counts as "internal" vs "external." Add specific domains to always research.`,
  },
  {
    id: 88,
    name: `Auto-Publish Blog From Drafts`,
    category: `Revenue generation`,
    schedule: `0 9 * * 2,5 (Tue/Fri at 9am)`,
    delivery: `zo.space update + SMS`,
    tools: `read_file, run_bash_command, update_space_route, send_sms_to_user`,
    prompt: `Check /home/workspace/Projects/zo-cookbook/drafts/ for any files marked as ready to publish (look for "status: ready" in frontmatter or a "READY" tag).

For each ready draft:
1. Read the content
2. Generate SEO metadata (title, description, keywords)
3. Format for web display (add reading time estimate, publication date)
4. Publish to a blog page on zo.space at /blog/[slug] (public)
5. Update the blog index page at /blog with the new post
6. Move the draft to /home/workspace/Projects/zo-cookbook/published/

Text me: "📝 Published: '[title]' at https://jeffkazzee.zo.space/blog/[slug]"

If no ready drafts, do nothing.`,
    expectedOutput: `Drafts marked "ready" auto-publish to your zo.space blog, with SEO metadata and an updated index.`,
    customization: `Change the drafts directory. Adjust the publish schedule. Add social sharing steps.`,
  },
  {
    id: 89,
    name: `Automated Proposal Generator`,
    category: `Revenue generation`,
    schedule: `On-demand`,
    delivery: `File`,
    tools: `read_file, read_webpage, web_search, create_or_rewrite_file`,
    prompt: `Generate a client proposal for: {{client_name}} at {{client_website}}

1. Read and analyze their current website
2. Research their industry and competitors (3-5 competitor sites)
3. Read my portfolio and services at /home/workspace/Business/services.md
4. Read my rate card at /home/workspace/Business/rates.md

Generate a professional proposal:

## Proposal for [Client Name]
**Prepared by:** Jeff Kazzee | jeffkazzee.dev
**Date:** [today]

### Understanding Your Needs
[2-3 paragraphs based on website analysis — what works, what doesn't, what's missing]

### Competitive Landscape
[What competitors are doing that [client] isn't]

### Proposed Solution
[Specific deliverables, phased approach]

### Investment
[Price tiers: Basic / Standard / Premium with specific deliverables for each]
[Based on my rate card, adjusted for project scope]

### Timeline
[Realistic timeline for each tier]

### Why Me
[2-3 sentences, specific to what this client needs]

Save to /home/workspace/Business/proposals/[client-name]-[date].md`,
    expectedOutput: `A professional, researched proposal generated from analyzing the client's current site and their competitive landscape.`,
    customization: `Create services.md and rates.md with your offerings. Run this whenever a lead looks promising.`,
  },
  {
    id: 90,
    name: `Dog Walk Podcast Recommender`,
    category: `Community/civic engagement`,
    schedule: `0 7 * * * (daily at 7am)`,
    delivery: `SMS`,
    tools: `web_search, read_file, send_sms_to_user`,
    prompt: `Recommend one podcast episode for today's dog walk. Requirements:

1. Length: 20-45 minutes (typical walk length)
2. Topic rotation (check /home/workspace/Persona/podcast-log.json for recent listens):
   - Tech/AI (but not corporate keynotes)
   - History or science (storytelling, not lectures)
   - Business/indie (real stories, not hustle bros)
   - Culture/society (long-form journalism)
   - Wild card (something I'd never pick myself)

3. Search for recently published episodes (this week preferred)
4. Prefer episodes from shows I've liked before (check log) but mix in new shows

Text me: "🎧 Walk pick: [Show Name] — '[Episode Title]' ([length]min). [1-sentence hook]. [Link if findable]"

Log the recommendation to podcast-log.json.`,
    expectedOutput: `A daily podcast recommendation sized for your dog walk, rotating across topics you care about.`,
    customization: `Adjust episode length for your walk. Add specific shows you love. Remove topics you don't want.`,
  },
  {
    id: 91,
    name: `Personal Brand Consistency Checker`,
    category: `Self-improving systems`,
    schedule: `0 10 1 * * (1st of every month)`,
    delivery: `File`,
    tools: `read_webpage, run_bash_command, create_or_rewrite_file`,
    prompt: `Audit my personal brand consistency across all public touchpoints:

1. Screenshot and read: jeffkazzee.zo.space, GitHub profile, X profile, LinkedIn, Substack
2. Check each for:
   - Bio/description: are they consistent? Same key messages?
   - Profile photo: same across platforms?
   - Links: do they all cross-reference each other?
   - Recent activity: is any platform noticeably quiet?
   - Tone: does the writing voice match across platforms?

Report:
## Brand Consistency Audit — [month]

### Platform Status
| Platform | Bio Match | Photo Match | Active | Links Working |
|----------|-----------|-------------|--------|---------------|
| zo.space | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| GitHub | ... | ... | ... | ... |

### Inconsistencies Found
[List specific mismatches]

### Recommendations
[Top 3 things to fix for consistency]

### Brand Health Score: [X/10]

Save to /home/workspace/Records/brand-audits/[month].md`,
    expectedOutput: `A monthly brand consistency audit that catches mismatched bios, broken links, and quiet platforms.`,
    customization: `Add all your public profiles. Define what your "consistent" brand message should say.`,
  },
  {
    id: 92,
    name: `Git Stash Reminder`,
    category: `Self-improving systems`,
    schedule: `0 22 * * 1-5 (weekdays at 10pm)`,
    delivery: `SMS (conditional)`,
    tools: `run_bash_command, send_sms_to_user`,
    prompt: `Check all git repos in my workspace for uncommitted work:

For each project in /home/workspace/Projects/:
1. Check git status for uncommitted changes
2. Check for stashed changes (git stash list)
3. Check if the current branch is ahead of remote (unpushed commits)

If ANY uncommitted work exists:
Text me: "🔓 Uncommitted work:
- [project]: [N] modified files on branch [name]
- [project]: [N] stashed changes

Commit before bed?"

If everything is clean, do nothing.

This prevents losing work to accidental resets or system issues.`,
    expectedOutput: `A nightly check for uncommitted work, texted only when you have changes that should be saved.`,
    customization: `Add specific repos to always check. Exclude repos where uncommitted work is normal.`,
  },
  {
    id: 93,
    name: `Weekly Wins Email to Myself`,
    category: `Self-improving systems`,
    schedule: `0 18 * * 5 (Fridays at 6pm)`,
    delivery: `Email`,
    tools: `read_file, run_bash_command, use_app_gmail, send_email_to_user`,
    prompt: `Compile my weekly wins — not what I planned to do, but what I actually shipped.

Check:
1. Git commits across all projects this week
2. New or updated zo.space routes
3. Published content (blog posts, social posts)
4. Revenue received (from tracking files)
5. Any completed items in _plan.md files
6. Positive feedback or mentions (from social-proof.json)

Write a "wins" email:
Subject: "🏆 This Week's Wins — [date range]"

## Shipped
[List of tangible things that are now live or done]

## Progress
[Things that moved forward meaningfully even if not done]

## Revenue
[\$X this week, \$X MTD, X% toward goal]

## Best Moment
[The single thing that felt best about this week, based on the data]

This is not a status report. It's a weekly reminder that I'm building something real, assembled from evidence — not feelings.`,
    expectedOutput: `A Friday evening email that summarizes your actual wins for the week, compiled from real data.`,
    customization: `Adjust what counts as a "win." Add specific metrics you want tracked.`,
  },
  {
    id: 94,
    name: `Barometric Pressure Seizure Alert`,
    category: `Emergency/safety systems`,
    schedule: `0 6,12,18 * * * (three times daily)`,
    delivery: `SMS (conditional)`,
    tools: `web_search, read_file, send_sms_to_user`,
    prompt: `Check barometric pressure in Salmon, Idaho:

1. Get current barometric pressure
2. Get forecast for next 12 hours
3. Read /home/workspace/Persona/health/seizure-log.json for correlation data

If pressure is dropping rapidly (>0.3 inHg in 6 hours) or a significant pressure system is incoming:
Text me: "⚠️ Pressure drop alert: [current] → [forecast] in next [hours]h. Based on your history, [risk level: low/moderate/elevated]. Extra rest and hydration today."

If pressure is stable or rising, do nothing.

Log all readings to /home/workspace/Persona/health/pressure-log.json for long-term correlation analysis.

After 30+ days of data, start including: "Correlation analysis: [X]% of your episodes occurred within 24h of a >0.3 inHg pressure drop."`,
    expectedOutput: `A weather-based early warning system for seizure triggers, building correlation data over time.`,
    customization: `Adjust pressure threshold based on your sensitivity. Add other environmental triggers to monitor.`,
  },
  {
    id: 95,
    name: `Micro-SaaS Feature Request Collector`,
    category: `Revenue generation`,
    schedule: `0 9 * * * (daily at 9am)`,
    delivery: `File`,
    tools: `use_app_gmail, x_search, web_search, create_or_rewrite_file`,
    prompt: `Monitor for feature requests and feedback about my products:

1. Check Gmail for any emails mentioning my products or containing feedback
2. x_search for mentions of my products or username
3. web_search for any forum posts, reviews, or discussions about my work

For each piece of feedback:
- Source (email, X, web)
- Who said it
- What they want or what they're experiencing
- Sentiment (positive, negative, neutral, feature request)

Append to /home/workspace/Business/feedback-log.json

If there's a new feature request that multiple people have mentioned:
Flag it in /home/workspace/Business/feature-requests.md with:
- Request description
- How many people asked
- Estimated effort to build
- Revenue impact (would this help retain/acquire users?)

Only update files if there's new feedback. Silent if no news.`,
    expectedOutput: `A daily sweep for product feedback and feature requests across all channels, automatically prioritized.`,
    customization: `Add specific product names and channels to monitor.`,
  },
  {
    id: 96,
    name: `Weekly Financial Forecast`,
    category: `Revenue generation`,
    schedule: `0 9 * * 1 (Mondays at 9am)`,
    delivery: `Email`,
    tools: `read_file, use_app_gmail, send_email_to_user`,
    prompt: `Generate a 4-week financial forecast:

Read:
1. /home/workspace/Business/revenue-tracker.json for income history
2. Gmail for upcoming invoices due to me
3. /home/workspace/Persona/bills.json for known expenses

Project:
- Expected income next 4 weeks (based on recurring revenue + pending invoices)
- Expected expenses next 4 weeks (based on known bills + historical spending)
- Net cash flow projection
- When I'll hit \$500/mo target at current trajectory

Report:
## 4-Week Forecast — [date]

| Week | Income (est) | Expenses (est) | Net |
|------|-------------|-----------------|-----|
| This week | \$X | \$X | +/-\$X |
| Week 2 | \$X | \$X | +/-\$X |
| Week 3 | \$X | \$X | +/-\$X |
| Week 4 | \$X | \$X | +/-\$X |

**MRR trend:** \$X/mo → \$X/mo (projected)
**Goal gap:** \$X/mo to reach \$500
**Break-even date at current growth:** [estimate]

**One lever to pull:** [The single highest-impact thing I could do to accelerate toward the goal]

Email with subject "💹 4-Week Forecast — [date]"`,
    expectedOutput: `A weekly financial forecast showing projected income, expenses, and trajectory toward your passive income goal.`,
    customization: `Populate revenue-tracker.json and bills.json with real data. Add seasonal income patterns if applicable.`,
  },
  {
    id: 97,
    name: `Automated Bug Report From User Feedback`,
    category: `Self-improving systems`,
    schedule: `0 */4 * * * (every 4 hours)`,
    delivery: `Silent (creates Linear tickets)`,
    tools: `use_app_gmail, use_app_linear, read_file`,
    prompt: `Check for user-reported bugs:

1. Search Gmail for emails containing words like "broken", "doesn't work", "bug", "error", "can't access", "not loading"
2. Filter to emails from users/clients (not automated notifications)
3. Check if a Linear ticket already exists for this issue (search by email subject keywords)

For each new bug report:
1. Extract: what's broken, steps to reproduce (if described), severity (guess from language)
2. Create a Linear issue:
   - Title: "[Bug] [brief description from email]"
   - Description: user's exact words + my interpretation + suggested priority
   - Priority: based on severity signals (data loss = urgent, cosmetic = low)
   - Label: "user-reported"
3. Draft a reply to the user: "Thanks for reporting this. I've logged it as ticket #[X] and will look into it. [Estimated timeline based on priority]." (save as Gmail DRAFT)

Log processed emails to /home/workspace/Records/bug-reports.json to avoid duplicates.`,
    expectedOutput: `User-reported bugs automatically become Linear tickets with draft acknowledgment emails — no triage backlog.`,
    customization: `Requires Gmail and Linear connected. Add specific bug report email labels for better filtering.`,
  },
  {
    id: 98,
    name: `Daily Content Atomizer`,
    category: `Revenue generation`,
    schedule: `0 14 * * 1-5 (weekdays at 2pm)`,
    delivery: `File`,
    tools: `read_file, create_or_rewrite_file`,
    prompt: `Take my most recent long-form content (blog post, Substack article, or detailed project doc) and atomize it into smaller pieces:

1. Find the most recent published piece in /home/workspace/Projects/zo-cookbook/published/ or any content directory
2. Break it into:
   - 3 X/Twitter posts (each standalone, different angle, under 280 chars)
   - 1 X thread (5-7 tweets, telling the story of the post)
   - 2 LinkedIn posts (same content, professional tone, 1200 char max)
   - 1 quote graphic prompt (the single most quotable line, formatted for generate_image)
   - 3 reply hooks (comments I could leave on related posts that naturally reference this content)

Save to /home/workspace/Records/content-atoms/[source-title]/
- tweets.md
- thread.md
- linkedin.md
- quote-prompt.md
- reply-hooks.md

This turns 1 piece of content into 10+ social posts, extending its reach by days.`,
    expectedOutput: `Every piece of long-form content automatically broken into 10+ social media posts across platforms.`,
    customization: `Change the platform mix. Add platform-specific formatting requirements.`,
  },
  {
    id: 99,
    name: `Sunrise Forecast Poetic Alert`,
    category: `Community/civic engagement`,
    schedule: `0 5 * * * (daily at 5am)`,
    delivery: `SMS (conditional)`,
    tools: `web_search, send_sms_to_user`,
    prompt: `Check tomorrow's sunrise conditions for Salmon, Idaho:

1. Get sunrise time
2. Check cloud cover forecast for sunrise hour
3. Check if there's smoke, haze, or unusual atmospheric conditions

Predict whether tomorrow's sunrise will be worth waking up for:
- Clear skies + some clouds = 🟢 "Could be stunning"
- High clouds (cirrus/altocumulus) = 🟢 "Canvas for color"
- Overcast = 🔴 "Skip it, sleep in"
- Post-storm clearing = 🟢🟢 "Set an alarm, this could be the one"
- Wildfire smoke = 🟡 "Vivid but unhealthy — watch from inside"

Only text me if the prediction is 🟢 or better:
"🌅 Tomorrow's sunrise ([time]): [prediction]. [One-line poetic description of what the sky might do]."

If it's a skip, silence.`,
    expectedOutput: `A text only on mornings when the sunrise is worth seeing — with a poetic heads-up about what to expect.`,
    customization: `Change the location. Adjust what counts as "worth it" based on how much you value sleep vs. sunrises.`,
  },
  {
    id: 100,
    name: `The Meta-Agent: Monthly Automation Audit`,
    category: `Self-improving systems`,
    schedule: `0 10 L * * (last day of every month at 10am)`,
    delivery: `File + Email`,
    tools: `run_bash_command, read_file, create_or_rewrite_file, send_email_to_user`,
    prompt: `Audit ALL my running automations:

1. List every scheduled agent with: name, schedule, last run, status
2. For each agent, review last 30 days of outputs:
   - How many times did it run?
   - How many times did it produce useful output?
   - How many times did it error?
   - Am I actually reading/using the output? (check if output files are being accessed)

3. Categorize each automation:
   - 🟢 Valuable: runs well, I use the output
   - 🟡 Underperforming: runs but output isn't great or I'm not using it
   - 🔴 Broken/useless: errors frequently or I never look at it
   - 💰 ROI positive: directly saves or makes money

4. Calculate:
   - Total automations running
   - Estimated time saved per week (vs doing these tasks manually)
   - Estimated cost (compute/API usage)
   - Net value: time saved minus cost

Report:
## Monthly Automation Audit — [month]

### Fleet Status
🟢 Valuable: [N] | 🟡 Underperforming: [N] | 🔴 Broken: [N]

### Kill List (recommend deactivating)
[Agents that are broken or unused]

### Upgrade List (could be better)
[Agents that work but could be improved, with specific suggestions]

### Top Performers
[The 3 automations providing the most value]

### New Automation Ideas
[2-3 gaps in my automation fleet based on patterns in my manual work]

Email with subject "🤖 Automation Audit — [month]"
Save to /home/workspace/Records/automation-audits/[month].md`,
    expectedOutput: `A monthly review of every automation you run, with recommendations to kill, upgrade, or add new ones.`,
    customization: `Run this after you've had automations running for at least 1 month. Use the audit to prune aggressively.`,
  },
];

export const prompts: Prompt[] = [
  {
    id: 1,
    name: `The Overnight Research Brief`,
    category: `Research & analysis`,
    whenToUse: `You need to understand a topic deeply before a meeting, decision, or project kickoff.`,
    prompt: `Research {{topic}} thoroughly. I need to sound like I've been studying this for a week, not five minutes.

Cover:
- What it is and why it matters (plain language, no jargon)
- Current state: who are the key players, what's the latest development
- The debate: what do smart people disagree about
- Numbers: key stats, market size, growth rate — cited with sources
- How it connects to {{my context — e.g., "my web design freelance business"}}
- The one thing most people get wrong about this

Write it as a briefing document, not an essay. Bullet points and headers. I should be able to skim it in 5 minutes or read deep in 15.`,
    whatYouGet: `A comprehensive briefing document with cited sources that makes you the most informed person in any room on that topic.`,
  },
  {
    id: 2,
    name: `Competitive Teardown`,
    category: `Research & analysis`,
    whenToUse: `You're entering a market or pitching against competitors and need to know the landscape.`,
    prompt: `Do a competitive teardown of {{product/company/market segment}}.

Find 5-7 competitors. For each one:
- What they offer (core features, pricing)
- What they do well (be specific — screenshot-level detail)
- Where they're weak (real gaps, not nitpicks)
- Who they target (and who they're ignoring)
- Recent moves (new features, funding, pivots)

Then:
- Map the market positioning (who's premium vs budget, simple vs complex)
- Identify the underserved gap — the thing nobody is doing well
- Recommend where I should position and why

Cite actual URLs. I want to click through and verify.`,
    whatYouGet: `A full competitive landscape map with positioning recommendations and verifiable sources.`,
  },
  {
    id: 3,
    name: `"Explain It Like I'm Switching Careers"`,
    category: `Research & analysis`,
    whenToUse: `You need to understand a technical domain that's outside your expertise.`,
    prompt: `Explain {{complex topic}} as if I'm a smart person who knows nothing about this field. I'm a web developer — use analogies from software when they help, but don't force them.

Structure it as:
1. The 30-second version (if I only read this paragraph, I'd still get it)
2. The 5-minute version (the key concepts, how they connect, why they matter)
3. The "actually useful" details (the stuff I'd need to know to have a real conversation or make a decision)
4. Common misconceptions (what most outsiders get wrong)
5. Where to go deeper (the single best resource for learning more — not a list, ONE thing)`,
    whatYouGet: `A layered explanation that respects your intelligence while starting from scratch.`,
  },
  {
    id: 4,
    name: `Data Story Extractor`,
    category: `Research & analysis`,
    whenToUse: `You have raw data (CSV, JSON, or numbers) and need to find the story in it.`,
    prompt: `I have this data: {{paste data or describe the file at /home/workspace/path/to/file}}

Analyze it and find the story. I don't want a statistics textbook — I want:
- The headline: what's the single most interesting finding?
- The trend: what's changing over time and why does it matter?
- The outliers: what doesn't fit the pattern and what does that mean?
- The "so what": why should anyone care about this data?
- 3 specific charts/visualizations that would make this data compelling (describe what they'd show)

If you need to write a script to process this data, do it. Save the results and any generated charts.`,
    whatYouGet: `Raw data transformed into a compelling narrative with specific visualization recommendations.`,
  },
  {
    id: 5,
    name: `Source Validator`,
    category: `Research & analysis`,
    whenToUse: `You found a claim or statistic and want to verify it before repeating it.`,
    prompt: `Verify this claim: "{{the claim or statistic}}"

1. Find the original source (not someone else repeating it)
2. Check if the source is credible (who published it, when, methodology if it's research)
3. Find corroborating or contradicting evidence
4. Rate confidence: 🟢 Solid, 🟡 Plausible but check, 🔴 Probably wrong

If it's wrong or misleading, give me the accurate version.
If it's right, give me the citation I should use.`,
    whatYouGet: `A fact-check with source verification and a proper citation to use.`,
  },
  {
    id: 6,
    name: `The "Actually Useful" Summary`,
    category: `Research & analysis`,
    whenToUse: `You have a long article, paper, or document and need the useful parts extracted.`,
    prompt: `Read this: {{URL or paste text or path to file}}

Don't summarize it. Extract the useful parts:
- What's actually new here (vs stuff I've heard before)?
- What specific claims does it make? (With evidence or just opinions?)
- What should I do differently after reading this?
- What's the strongest counterargument to the main thesis?
- Pull the 3 best quotes — lines I might actually want to reference later.

If this is mostly filler dressed up as insight, just tell me that and save me the read.`,
    whatYouGet: `An honest extraction of value from long content, with a candid assessment of whether it's worth your time.`,
  },
  {
    id: 7,
    name: `Technical Decision Matrix`,
    category: `Research & analysis`,
    whenToUse: `You're choosing between frameworks, tools, services, or approaches and need to decide.`,
    prompt: `Help me decide between {{option A}} vs {{option B}} (and {{option C}} if relevant) for {{what I'm building}}.

Compare on:
- Learning curve (given I know {{my current stack}})
- Community/ecosystem (how easy to find answers when stuck)
- Performance for my use case
- Long-term viability (is it growing or dying?)
- The thing nobody talks about (hidden gotchas, migration pain, vendor lock-in)

Don't be diplomatic. Tell me which one to pick and why. If the answer is "it depends," tell me what it depends ON specifically for my situation.

End with: "Pick X if [condition]. Pick Y if [different condition]."`,
    whatYouGet: `An opinionated technical recommendation with clear decision criteria.`,
  },
  {
    id: 8,
    name: `The First Draft Machine`,
    category: `Writing & content`,
    whenToUse: `You need to write something and are staring at a blank page.`,
    prompt: `Write a first draft of {{type of content: blog post / email / proposal / documentation / Substack article}} about {{topic}}.

Voice: {{describe or say "match my style" and reference a file}}
Length: {{target word count or "whatever it needs"}}
Audience: {{who's reading this}}

Requirements:
- Open with a hook, not a throat-clear. No "In today's world..." or "Have you ever wondered..."
- Include at least one specific example or anecdote (you can placeholder it with [PERSONAL EXAMPLE: topic])
- End with something that makes the reader think, not a generic conclusion
- Use short paragraphs. Vary sentence length. No five-sentence walls.

This is a FIRST draft. I'll edit. Don't self-censor or over-polish — momentum matters more than perfection right now.`,
    whatYouGet: `A complete first draft with structure, voice, and momentum — ready for your editing pass.`,
  },
  {
    id: 9,
    name: `Rewrite for Humans`,
    category: `Writing & content`,
    whenToUse: `You wrote something (or AI wrote something) and it sounds robotic.`,
    prompt: `Rewrite this to sound like a human wrote it: {{paste text or file path}}

Rules:
- Vary sentence length. Short. Then longer when the thought needs room. Then short again.
- Kill every instance of "leverage," "utilize," "in terms of," "it's important to note," and any other corporate filler
- Replace abstract statements with specific ones ("increased efficiency" → what ACTUALLY happened)
- If there's a list of 5 things, do they all need to be there? Cut the weakest one.
- Read it out loud in your head. If any sentence sounds like a press release, rewrite it.
- Keep my core message. Change the delivery, not the substance.`,
    whatYouGet: `Your content rewritten to pass the "would a real person say this?" test.`,
  },
  {
    id: 10,
    name: `The Angle Finder`,
    category: `Writing & content`,
    whenToUse: `You have a topic but no angle — you know WHAT to write about but not HOW.`,
    prompt: `I want to write about {{topic}}. Find me an angle that hasn't been beaten to death.

Give me 5 angles, each genuinely different:
1. The contrarian take (what's the popular opinion and why is it wrong?)
2. The personal take (how would a self-taught dev in rural Idaho see this differently?)
3. The practical take (skip the theory, what do you actually DO?)
4. The historical take (what happened before that explains what's happening now?)
5. The weird take (the connection nobody has made yet)

For each angle: a working title, a 2-sentence pitch for the piece, and the opening line.

Then tell me which one you'd actually want to read, and why.`,
    whatYouGet: `Five distinct angles for any topic, with titles and opening lines ready to go.`,
  },
  {
    id: 11,
    name: `Email That Gets a Response`,
    category: `Writing & content`,
    whenToUse: `You need to write a cold email, follow-up, or request that someone will actually read and reply to.`,
    prompt: `Write an email to {{who}} about {{what I want}}.

Context: {{relationship — cold outreach / met at event / client follow-up / favor request}}

Rules:
- Under 150 words. Shorter is better.
- First sentence: why I'm emailing (not "I hope this finds you well")
- Specific ask: exactly what I want them to do (reply, click, schedule, etc.)
- Give them a reason to care that's about THEM, not me
- Make saying yes easy (include a specific time, link, or option)
- One clear CTA. Not three.
- No "I know you're busy" — they know they're busy.`,
    whatYouGet: `A tight email that respects the reader's time and maximizes the chance of a reply.`,
  },
  {
    id: 12,
    name: `Content Repurpose Chain`,
    category: `Writing & content`,
    whenToUse: `You wrote something good and want to squeeze more value from it.`,
    prompt: `Here's my original content: {{paste or link to blog post, thread, article}}

Repurpose it into:
1. 3 standalone tweets (each works without context, under 280 chars)
2. One X thread (5-7 tweets, tells the story)
3. One LinkedIn post (professional tone, 1200 chars max, includes a question to drive comments)
4. 5 pull quotes for graphics (the most shareable lines)
5. An email newsletter version (conversational, 200 words, with a hook that's different from the original)

Each version should feel native to its platform — not a copy-paste with different formatting.`,
    whatYouGet: `One piece of content transformed into 10+ platform-native posts.`,
  },
  {
    id: 13,
    name: `The Debugger Prompt`,
    category: `Code & technical`,
    whenToUse: `Something is broken and you've been staring at it for too long.`,
    prompt: `Debug this: {{paste error message, describe the behavior, or point to a file}}

Expected behavior: {{what should happen}}
Actual behavior: {{what's happening instead}}
What I've tried: {{list what you've already attempted}}

Don't just fix it — explain:
1. What's actually wrong (root cause, not symptoms)
2. Why my previous attempts didn't work
3. The fix, with code
4. How to prevent this class of bug in the future

If the problem is in my approach (not just a typo), tell me. I'd rather redesign than patch.`,
    whatYouGet: `A root cause analysis, fix, and prevention strategy — not just a band-aid.`,
  },
  {
    id: 14,
    name: `Build This Script`,
    category: `Code & technical`,
    whenToUse: `You need a utility script and don't want to write it from scratch.`,
    prompt: `Write a {{TypeScript/Python/Bash}} script that {{what it does}}.

Requirements:
- Input: {{what it takes — file, URL, argument, stdin}}
- Output: {{what it produces — file, stdout, API call}}
- Error handling: fail loudly with helpful messages, don't silently swallow errors
- No unnecessary dependencies. If the standard library can do it, use that.
- Include a --help flag or usage comment at the top
- Save it to {{path or let Zo pick a reasonable location}}

Make it work first, then make it clean. Test it with {{example input}} before you show me.`,
    whatYouGet: `A working, tested utility script ready to use.`,
  },
  {
    id: 15,
    name: `Architecture Review`,
    category: `Code & technical`,
    whenToUse: `You're about to build something significant and want to sanity-check the approach.`,
    prompt: `Review this architecture before I build it:

What I'm building: {{description}}
Planned stack: {{technologies}}
Data flow: {{how data moves through the system}}
Scale expectations: {{number of users, requests, data volume}}

Poke holes in this:
- What will break first as it scales?
- What am I over-engineering for the current stage?
- What am I under-engineering that will bite me later?
- Is there a simpler architecture that achieves the same result?
- What's the biggest risk I'm not seeing?

Don't be polite. I'd rather redesign now than rewrite in 3 months.`,
    whatYouGet: `An honest architecture review that catches problems before you've committed to the approach.`,
  },
  {
    id: 16,
    name: `Code Review Like a Senior Dev`,
    category: `Code & technical`,
    whenToUse: `You've written code and want it reviewed before shipping.`,
    prompt: `Review this code: {{paste code or point to file(s)}}

Review like a senior dev who cares about quality but isn't pedantic:
- Bugs: anything that will break in production?
- Logic: does this actually do what it claims?
- Performance: anything that will be slow at scale?
- Security: any injection points, exposed secrets, or auth gaps?
- Readability: would a new developer understand this in 5 minutes?
- Patterns: am I fighting the framework or using it well?

Skip: style nitpicks, variable name bikeshedding, and anything a linter would catch.

For each issue: what's wrong, why it matters, and the fix (with code).`,
    whatYouGet: `A focused code review that catches real issues, not formatting opinions.`,
  },
  {
    id: 17,
    name: `API Design in 5 Minutes`,
    category: `Code & technical`,
    whenToUse: `You need to design API endpoints for a new feature or project.`,
    prompt: `Design the API for {{feature/project description}}.

I need:
- Endpoint list (method + path + what it does)
- Request/response shapes for each (TypeScript types)
- Auth requirements (which endpoints need auth)
- Error responses (what can go wrong and what status codes to return)
- One thing I'm probably forgetting

Keep it RESTful unless there's a good reason not to. Design for the Hono framework on Bun.`,
    whatYouGet: `A complete API design document ready to implement.`,
  },
  {
    id: 18,
    name: `Pricing Strategy`,
    category: `Business & strategy`,
    whenToUse: `You're launching something and need to figure out what to charge.`,
    prompt: `Help me price {{product/service description}}.

Context:
- Target customer: {{who}}
- What it replaces: {{what they're currently doing/paying}}
- My costs: {{hosting, time, tools}}
- Goal: {{revenue target, number of customers}}

Research competitors' pricing, then recommend:
- Price point (with justification — not just "feels right")
- Pricing model (one-time, subscription, tiered, usage-based)
- Tier structure if applicable (what goes in free vs paid)
- The psychological pricing tricks worth using here
- The price I should NOT charge (and why)

Be specific. "\$X/mo" not "consider a subscription model."`,
    whatYouGet: `A researched pricing recommendation with competitive context and specific numbers.`,
  },
  {
    id: 19,
    name: `Business Model Stress Test`,
    category: `Business & strategy`,
    whenToUse: `You have a business idea and want someone to poke holes in it before you build.`,
    prompt: `Stress test this business model:

Idea: {{description}}
Revenue model: {{how it makes money}}
Target market: {{who pays}}
Distribution: {{how they find it}}

Attack this from every angle:
- Market: is this market big enough? Growing or shrinking?
- Competition: who else is doing this and why would someone pick me?
- Unit economics: at what price and volume does this work? Does the math actually close?
- Distribution: how do I get the first 100 users? The first 1000?
- Moat: what stops someone from copying this in a weekend?
- Kill shot: what's the single most likely reason this fails?

Don't be encouraging. Be accurate. I need to know if this is worth my time.`,
    whatYouGet: `An honest stress test that identifies the real risks before you invest time building.`,
  },
  {
    id: 20,
    name: `Weekly Priority Stack Rank`,
    category: `Personal productivity`,
    whenToUse: `Monday morning when you have too many things competing for your time.`,
    prompt: `Here's everything on my plate this week: {{list your tasks, projects, commitments}}

My constraints: {{hours available, energy limitations, deadlines}}

Stack rank these by actual impact, not urgency:
1. [Most important] — why this is #1
2. [Next] — why this is #2
...

Rules:
- Urgent but low-impact items get deprioritized (tell me which ones)
- If anything can be delegated, deferred, or dropped, say so
- If I can only do 3 things this week, which 3?
- If I'm going to burn out trying to do all of these, which ones should I cut?

Be direct. Don't say "all of these are important." They're not.`,
    whatYouGet: `A brutally honest priority list that cuts through the noise of a busy week.`,
  },
  {
    id: 21,
    name: `Decision Framework`,
    category: `Personal productivity`,
    whenToUse: `You're stuck on a decision and going in circles.`,
    prompt: `Help me decide: {{the decision}}

Options: {{list the options}}
What matters most: {{your priorities/values for this decision}}
Timeline: {{when I need to decide}}

Don't list pros and cons — that's what's already keeping me stuck. Instead:
1. What would I choose if I had to decide in 10 seconds? (That's probably my gut answer.)
2. What's the worst realistic outcome for each option? (Not worst possible, worst likely.)
3. Which option is reversible? (Prefer reversible choices.)
4. In 1 year, which choice will I regret NOT making?
5. What information am I missing that would make this obvious? Can I get it quickly?

Give me a recommendation with your reasoning. One sentence.`,
    whatYouGet: `A structured decision framework that cuts through analysis paralysis.`,
  },
  {
    id: 22,
    name: `"I Have 2 Hours" Sprint Planner`,
    category: `Personal productivity`,
    whenToUse: `You have a short window of uninterrupted time and want to make it count.`,
    prompt: `I have {{N}} hours of focused time right now. Here's what I could work on: {{list tasks or projects}}

My energy level: {{high/medium/low}}
My goal today: {{what would make today feel productive}}

Give me a minute-by-minute plan:
- What to work on first and exactly where to start (not "work on the project" — which file, which function, which section)
- When to switch tasks (if I should)
- A "done" marker — the specific deliverable I should have when time's up
- What NOT to do (rabbit holes to avoid)

Keep it tight. No warmup tasks. Start with the hard thing.`,
    whatYouGet: `A precise sprint plan that turns a short time block into real output.`,
  },
  {
    id: 23,
    name: `Meeting Prep in 3 Minutes`,
    category: `Personal productivity`,
    whenToUse: `You have a meeting in 5 minutes and haven't prepared.`,
    prompt: `I have a meeting in 5 minutes about {{topic}} with {{who}}.

Context: {{what this meeting is about, any prior context}}

Quick prep:
- The 3 things I should know going in
- The 1 question I should definitely ask
- The 1 thing they probably want from me
- My position on the likely discussion points
- A smart comment I can make that shows I'm prepared

30 seconds to read. Go.`,
    whatYouGet: `A 30-second meeting prep that prevents you from walking in cold.`,
  },
  {
    id: 24,
    name: `Weekly Review Compiler`,
    category: `Personal productivity`,
    whenToUse: `End of the week, wanting to reflect on what actually happened.`,
    prompt: `Help me review this week. Check my workspace for evidence:

- Git commits across all projects
- Files created or modified
- Journal entries (if any)
- Any _plan.md progress

Based on what the file system shows:
1. What I actually did (not what I planned — what the evidence shows)
2. What I planned but didn't do (and an honest guess why)
3. The most valuable thing I shipped
4. The biggest time sink
5. What I should do differently next week (one specific change)

Be factual. I don't need encouragement. I need an accurate mirror.`,
    whatYouGet: `An evidence-based weekly review compiled from your actual workspace activity.`,
  },
  {
    id: 25,
    name: `Procrastination Unblocker`,
    category: `Personal productivity`,
    whenToUse: `You know what you should do but can't start.`,
    prompt: `I'm procrastinating on {{the thing}}. I know I should do it. I can't start.

Don't motivate me. Don't tell me to "just start." Instead:

1. What's the ACTUAL smallest possible first step? (Not "open the file" — what do I type/do first?)
2. What am I probably afraid of? (Based on what this task is, what's the real blocker?)
3. Give me a 15-minute version of this task — what could I finish in 15 minutes that would count as real progress?
4. Set up the environment for me: open the file, create the outline, write the first line — whatever removes the friction of starting.

Then just say "Your move" and stop talking.`,
    whatYouGet: `The friction of starting removed, with the smallest possible first step already set up for you.`,
  },
  {
    id: 26,
    name: `Explain This Codebase`,
    category: `Code & technical`,
    whenToUse: `You've cloned or inherited a codebase and need to understand it fast.`,
    prompt: `Read the project at {{directory path}} and explain it to me.

I need:
1. What this project does (one paragraph, plain English)
2. Architecture: how it's structured (key directories and what lives where)
3. Entry points: where does execution start? What are the main files?
4. Data flow: how does data move through the system?
5. Dependencies: what external libraries/services does it rely on?
6. The "oh, THAT'S how it works" moment: the non-obvious design decision that explains why things are the way they are
7. Where to start if I want to make changes

Read the actual code — don't guess from file names.`,
    whatYouGet: `A complete mental model of an unfamiliar codebase, built from actually reading the code.`,
  },
  {
    id: 27,
    name: `Convert My Idea to a PRD`,
    category: `Business & strategy`,
    whenToUse: `You have a product idea in your head and need to get it on paper properly.`,
    prompt: `Turn this idea into a product requirements document:

Idea: {{describe it in your own words, as rough as you want}}

Write a PRD with:
- Problem statement (what pain does this solve, for whom)
- Solution overview (what we're building, in plain language)
- User stories (5-8, formatted as "As a [user], I want [thing] so that [reason]")
- Core features (prioritized: must-have, should-have, nice-to-have)
- Non-goals (what we are explicitly NOT building)
- Technical approach (high-level, given my stack: React, TypeScript, Bun, Tailwind)
- Success metrics (how we know this worked)
- Open questions (things we need to figure out before building)

Keep it under 2 pages. A PRD that nobody reads is worse than no PRD.`,
    whatYouGet: `A clean, scoped product requirements document ready to drive development.`,
  },
  {
    id: 28,
    name: `Negotiate This`,
    category: `Business & strategy`,
    whenToUse: `You need to negotiate a price, contract, rate, or deal.`,
    prompt: `Help me negotiate: {{what I'm negotiating}}

My position: {{what I want}}
Their position: {{what they want or have offered}}
My BATNA: {{what I'll do if this falls through}}
Relationship: {{one-time deal / ongoing client / employer}}

Give me:
- Am I asking for too much, too little, or about right? (Research market rates if applicable)
- My opening move: what to say first and why
- Their likely counter and how to respond
- The line I won't cross (based on my BATNA)
- 2-3 concessions I can offer that cost me little but feel valuable to them
- The exact phrasing for the hardest part of this conversation`,
    whatYouGet: `A negotiation playbook with specific language and strategy.`,
  },
  {
    id: 29,
    name: `Tax Prep Document Finder`,
    category: `Business & strategy`,
    whenToUse: `Tax season, and you need to organize your financial records.`,
    prompt: `Help me prep for taxes. I'm a freelance web developer.

Search my Gmail for:
- 1099 forms and income documentation
- Business expense receipts
- Software subscription confirmations
- Payment processor annual summaries (Stripe, PayPal)
- Home office / vehicle deduction related emails

Also check my workspace for any financial tracking files.

Compile:
1. Income sources found (with amounts if visible)
2. Deductible expenses found (categorized: software, education, home office, travel, etc.)
3. Documents I should have but couldn't find
4. Estimated quarterly tax payments (if records exist)
5. Things a self-employed person commonly misses (that I should ask my accountant about)

Save to /home/workspace/Business/tax-prep-[year].md`,
    whatYouGet: `A tax prep checklist compiled from your actual emails and files, with reminders of common freelancer deductions.`,
  },
  {
    id: 30,
    name: `Landing Page Copy`,
    category: `Writing & content`,
    whenToUse: `You need copy for a product page, service page, or landing page.`,
    prompt: `Write landing page copy for {{product/service}}.

Audience: {{who's reading this}}
Goal: {{sign up / buy / contact / subscribe}}
Tone: {{professional / casual / bold / technical}}

Write:
- Hero headline (under 10 words, makes the value obvious)
- Sub-headline (one sentence that adds specificity)
- 3 benefit sections (not features — BENEFITS. What changes in their life?)
- Social proof section (format for testimonials, even if I'll add them later)
- FAQ (5 questions a skeptic would ask, with honest answers)
- CTA (the button text and the sentence above it)

Don't write like a SaaS template. Write like a person who actually built this thing and knows why it matters.`,
    whatYouGet: `Complete landing page copy with hero, benefits, FAQ, and CTA — ready to drop into a page.`,
  },
  {
    id: 31,
    name: `Refactor This Mess`,
    category: `Code & technical`,
    whenToUse: `Your code works but it's ugly, tangled, or hard to maintain.`,
    prompt: `Refactor this code: {{paste code or file path}}

It works, but it's a mess because: {{what's wrong with it — too long, hard to read, duplicated logic, etc.}}

Refactor it:
- Break it into logical units (functions, modules, components — whatever fits)
- Name things clearly (I should understand each function's purpose from its name alone)
- Remove duplication
- Keep the same behavior — this is refactoring, not rewriting
- If you change the API/interface, show me the diff

Show me the refactored version and a brief note on each change and why.`,
    whatYouGet: `Clean, maintainable code that does the same thing but is actually readable.`,
  },
  {
    id: 32,
    name: `Client Update Email`,
    category: `Writing & content`,
    whenToUse: `You need to update a client on project progress.`,
    prompt: `Write a project update email to {{client name}} about {{project}}.

Progress since last update: {{what's been done}}
Current status: {{on track / delayed / blocked}}
Next steps: {{what's coming}}
Any issues: {{blockers, scope changes, decisions needed}}

Rules:
- Lead with the most important thing (good news or the blocker, not "just wanted to give you an update")
- Under 200 words
- If there's a decision needed from them, make it crystal clear and easy to answer
- Professional but not stiff — this is a working relationship, not a legal filing
- End with a specific next action and timeline`,
    whatYouGet: `A professional project update email that builds client confidence and moves things forward.`,
  },
  {
    id: 33,
    name: `Documentation Generator`,
    category: `Code & technical`,
    whenToUse: `Your code needs documentation and you'd rather not write it manually.`,
    prompt: `Generate documentation for {{file/project path}}.

Read the code and write:
- Overview: what this does and why it exists (for a developer who's never seen it)
- Setup: how to install, configure, and run it
- API reference: every public function/endpoint with parameters, return values, and examples
- Examples: 3-5 real usage examples (not contrived hello-worlds)
- Gotchas: things that will trip someone up

Write it as a README.md that I'd actually find useful. Skip the badges, skip the table of contents for short docs, skip the "Contributing" section for solo projects.`,
    whatYouGet: `Clean, useful documentation generated from actually reading the code.`,
  },
  {
    id: 34,
    name: `Market Sizing in 10 Minutes`,
    category: `Business & strategy`,
    whenToUse: `You need to estimate the market size for an idea or pitch.`,
    prompt: `Estimate the market size for {{product/service}} targeting {{customer segment}}.

Use the TAM/SAM/SOM framework but with real numbers:
- TAM: Total addressable market (everyone who could theoretically use this)
- SAM: Serviceable addressable market (people I could actually reach with my distribution)
- SOM: Serviceable obtainable market (realistic share I could capture in year 1)

Show your math. Use real data from web searches:
- Industry reports
- Census/BLS data
- Competitor revenue estimates
- Related market benchmarks

Don't make up numbers. If data isn't available for exactly my market, triangulate from adjacent data and explain your reasoning.`,
    whatYouGet: `A quick market sizing estimate built from real data sources, not made-up numbers.`,
  },
  {
    id: 35,
    name: `The Tone Matcher`,
    category: `Writing & content`,
    whenToUse: `You need to write in a specific person's voice or match an existing document's tone.`,
    prompt: `Read this sample of my writing: {{paste text or link to file}}

Analyze my voice:
- Sentence length patterns
- Vocabulary level
- Humor style (if any)
- How I handle transitions
- My tics (words or patterns I overuse)
- What makes my writing feel like "me"

Now write {{the new thing I need written}} in that same voice. Not a parody. Not exaggerated. Just match the tone and patterns you identified.

After writing it, point out 2 places where you had to guess and I should review for authenticity.`,
    whatYouGet: `New content written in your voice, with honest notes about where it might not ring true.`,
  },
  {
    id: 36,
    name: `Quick Deploy Checklist`,
    category: `Code & technical`,
    whenToUse: `You're about to deploy something and want to make sure you haven't missed anything.`,
    prompt: `I'm about to deploy {{what}} to {{where}}.

Generate a deploy checklist for my situation:
- Pre-deploy: environment variables set, dependencies installed, build succeeds
- Data: any migrations needed, backup status, seed data
- Security: secrets not hardcoded, auth working, CORS configured
- Performance: images optimized, caching set up, no console.logs in production
- Rollback: can I revert quickly if something breaks?
- Post-deploy: what to verify immediately after deploy

Check my actual code at {{path}} for any specific risks you can see.

Flag anything that's a "stop, don't deploy until this is fixed" level issue.`,
    whatYouGet: `A deployment checklist customized to your actual project and deployment target.`,
  },
  {
    id: 37,
    name: `Content Calendar Seed`,
    category: `Business & strategy`,
    whenToUse: `You need to plan content for the next month but have no ideas.`,
    prompt: `Build a 30-day content calendar for {{platform — X, Substack, LinkedIn, etc.}}.

My niche: {{what I write about}}
My audience: {{who follows me}}
My goal: {{grow followers / drive traffic / build authority / generate leads}}

For each day:
- Content type (post, thread, article, story, etc.)
- Topic + specific angle
- The hook (first line or headline)
- Optimal post time
- One-line description of the content

Rules:
- No more than 2 days in a row with the same content type
- Include at least 3 "engagement" posts (questions, polls, hot takes)
- Include at least 2 "authority" posts (deep knowledge, original insights)
- Include at least 4 "personal" posts (behind the scenes, lessons learned)
- Leave weekends lighter (1 post vs 2 on weekdays)

Search for trending topics in my niche to inform timely content.`,
    whatYouGet: `A complete month of content planned with hooks, topics, and types — ready to execute.`,
  },
  {
    id: 38,
    name: `Error Message Translator`,
    category: `Code & technical`,
    whenToUse: `You got a cryptic error message and have no idea what it means.`,
    prompt: `What does this error mean and how do I fix it?

Error: {{paste the error message/stack trace}}
Context: {{what I was doing when it happened}}
Stack: {{relevant technologies — Bun, React, Hono, etc.}}

Give me:
1. Plain English explanation (no "the error indicates that..." — just tell me what went wrong)
2. Most likely cause in my specific context
3. The fix (with code if applicable)
4. How to prevent it in the future
5. If this is a known bug or common gotcha, link to the relevant issue/discussion`,
    whatYouGet: `A clear explanation and fix for cryptic error messages.`,
  },
  {
    id: 39,
    name: `Scope Reducer`,
    category: `Business & strategy`,
    whenToUse: `Your project scope has grown too big and you need to cut it down to an MVP.`,
    prompt: `This project has grown too big. Help me cut it down.

Full vision: {{describe everything you want to build}}
Time I have: {{realistic time available}}
Resources: {{just me / team / budget}}

Cut this into:
1. **Week 1 MVP**: The absolute minimum that delivers value. Be ruthless — what can I cut and still have something useful?
2. **Month 1**: What to add next to make it properly good
3. **Someday**: Everything else, ranked by value

For each cut feature, explain:
- Why it can wait (or why it can be permanently dropped)
- What we lose by cutting it
- Whether there's a scrappy workaround

The MVPshould be something I can build and ship in {{time}}, not a skeleton that's embarrassing.`,
    whatYouGet: `A ruthlessly scoped MVP with a clear roadmap for what comes next.`,
  },
  {
    id: 40,
    name: `The "What Am I Missing?" Audit`,
    category: `Personal productivity`,
    whenToUse: `You feel like you're forgetting something important.`,
    prompt: `I'm working on {{project/goal}}. Here's what I'm tracking: {{list your current focus areas}}

What am I probably forgetting? Think about:
- Administrative stuff (taxes, renewals, registrations, licenses)
- Technical debt (backups, security, dependency updates, monitoring)
- Relationship maintenance (clients I haven't contacted, people I owe replies)
- Self-care (doctor appointments, medication refills, exercise, sleep)
- Financial (upcoming bills, subscription renewals, tax deadlines)
- Legal (contracts expiring, terms of service changes, compliance)

Check my calendar for upcoming deadlines. Check my email for unanswered messages older than a week.

List only things that are actually relevant to my life and work — don't generate a generic "have you checked your smoke detectors" list.`,
    whatYouGet: `A personalized audit that surfaces the things you're forgetting, based on your actual situation.`,
  },
  {
    id: 41,
    name: `Explain My Options Simply`,
    category: `Research & analysis`,
    whenToUse: `You're comparing options (insurance plans, hosting providers, bank accounts, etc.) and the details are overwhelming.`,
    prompt: `I'm comparing these options for {{what}}: {{list options}}

Make a comparison table with ONLY the things that actually matter for my situation:
- {{my specific requirements}}
- Price (total real cost, not just the advertised number)
- The catch (what's the hidden downside of each)
- The "fine print" thing they're hoping I don't notice

Then: "If I were you, I'd pick [X] because [reason]." One sentence.

Don't pad the table with features I don't care about. I want clarity, not completeness.`,
    whatYouGet: `A focused comparison that cuts through marketing and surfaces what actually matters for your decision.`,
  },
  {
    id: 42,
    name: `Write My Bio`,
    category: `Writing & content`,
    whenToUse: `You need a bio for a profile, conference, guest post, or application.`,
    prompt: `Write my bio for {{context: X profile / conference speaker page / blog author box / LinkedIn / etc.}}.

About me: {{key facts — or say "read my IDENTITY.md" and point to the file}}

Versions needed:
1. One sentence (for tight spaces)
2. 50 words (for author boxes and bios)
3. 150 words (for speaker pages and About sections)

Rules:
- Lead with what I DO, not my name
- Include something specific and memorable (not "passionate about technology")
- Match the formality of the context (X bio is casual, conference bio is slightly more polished)
- No "thought leader," "ninja," "guru," or "passionate about"
- End with something human, not a credential dump`,
    whatYouGet: `Three length versions of your bio, each tuned for its context.`,
  },
  {
    id: 43,
    name: `Git Archaeology`,
    category: `Code & technical`,
    whenToUse: `You need to understand why code is the way it is — the history behind a file or function.`,
    prompt: `Investigate the history of {{file path or function name}} in {{project}}.

Run git log and git blame to find:
- When was this code written? By whom?
- What were the major changes over time?
- Is there a commit message that explains WHY it's structured this way?
- Were there any reverts or "fix the fix" commits (signs of a tricky area)?
- What was the code BEFORE the current version?

Tell me the story of this code. Why is it the way it is?`,
    whatYouGet: `The full history and rationale behind any piece of code in your projects.`,
  },
  {
    id: 44,
    name: `Invoice Generator`,
    category: `Business & strategy`,
    whenToUse: `You completed freelance work and need to send an invoice.`,
    prompt: `Generate an invoice for:

Client: {{name and email}}
Project: {{description of work completed}}
Amount: {{total or hourly rate × hours}}
Payment terms: {{Net 15, Net 30, Due on receipt}}
Payment methods: {{Stripe link, PayPal, bank transfer, etc.}}

Create a professional markdown invoice at /home/workspace/Business/invoices/[client]-[date].md that includes:
- Invoice number (sequential, check existing invoices for the last number)
- My business info (Jeff Kazzee, Salmon ID, jeffkazzee.dev)
- Client info
- Line items with descriptions and amounts
- Total (including any applicable tax)
- Payment instructions with direct links
- Due date

Also draft a polite email to accompany the invoice (save as a Gmail draft if possible).`,
    whatYouGet: `A professional invoice and delivery email, ready to send.`,
  },
  {
    id: 45,
    name: `Conversation Starter Bank`,
    category: `Personal productivity`,
    whenToUse: `You're attending a networking event, meetup, or social situation and want to be prepared.`,
    prompt: `I'm going to {{event type}} with {{audience description}}.

Give me 10 conversation starters that aren't cringe:
- NOT: "What do you do?" or "How about this weather?"
- Instead: specific, interesting questions that lead to real conversations
- Mix: 3 about their work/projects (non-generic), 3 about interests/opinions, 2 about the event itself, 2 wildcards

For each one:
- The opener
- A natural follow-up question if they give a short answer
- How to transition to talking about my work without it being forced

Also: 3 graceful exit phrases for conversations that aren't going anywhere.`,
    whatYouGet: `An event-specific bank of conversation starters that avoid the "so, what do you do?" trap.`,
  },
  {
    id: 46,
    name: `Performance Profiler`,
    category: `Code & technical`,
    whenToUse: `Your app or page is slow and you need to figure out why.`,
    prompt: `Help me diagnose performance issues in {{project/page/app}}.

What's slow: {{describe the symptom — slow page load, sluggish interactions, API latency}}
Stack: {{technologies}}
Scale: {{traffic/data volume}}

Investigate:
1. If it's a web page, check load time, bundle size, and asset loading
2. If it's an API, check response times and database queries
3. Look for obvious performance antipatterns in the code at {{path}}
4. Run any profiling commands that would help diagnose the issue

Give me:
- The likely bottleneck (with evidence)
- The fix (starting with the biggest impact for least effort)
- Before/after expectations (what improvement to expect)`,
    whatYouGet: `A performance diagnosis with specific bottlenecks and prioritized fixes.`,
  },
  {
    id: 47,
    name: `Contract Red Flag Scanner`,
    category: `Business & strategy`,
    whenToUse: `Someone sent you a contract and you want to know what to watch out for.`,
    prompt: `Review this contract/agreement: {{paste text or point to file}}

I'm the {{freelancer / vendor / customer / employee}} in this agreement.

Flag:
- Anything that's unusual or one-sided in their favor
- Payment terms that aren't standard
- IP/ownership clauses (do I retain rights to my work?)
- Non-compete or exclusivity clauses
- Liability or indemnification that puts all risk on me
- Auto-renewal or termination traps
- Missing protections I should insist on

For each flag: what it means in plain English, how risky it is (1-5), and what I should counter with.

I'm not a lawyer and this isn't legal advice — but tell me what questions I should ask one.`,
    whatYouGet: `A plain-English contract review that flags the clauses you should negotiate or ask a lawyer about.`,
  },
  {
    id: 48,
    name: `Workspace Deep Clean`,
    category: `Personal productivity`,
    whenToUse: `Your digital workspace is cluttered and you need to get organized.`,
    prompt: `Audit my workspace at /home/workspace/ and help me clean it up.

Check for:
- Duplicate files or directories with overlapping content
- Empty directories that can be removed
- Files that haven't been modified in 30+ days (possibly stale)
- Temp files, log files, or build artifacts that don't need to live here
- Files that aren't in the right location (based on the directory structure conventions)

Give me a cleanup plan:
- What to archive (move to Archive/)
- What to delete (only if it's clearly temp/generated)
- What to reorganize (and where it should go)
- Estimated space recovered

DON'T execute the cleanup — give me the plan first. I'll approve the moves.`,
    whatYouGet: `A cleanup plan for your workspace with specific actions, waiting for your approval before any changes.`,
  },
  {
    id: 49,
    name: `"This Month in Numbers" Report`,
    category: `Business & strategy`,
    whenToUse: `End of month, wanting a quantitative snapshot of your progress.`,
    prompt: `Compile my numbers for {{this month}}:

Check every data source available:
- Revenue: payment confirmations, Stripe data, invoice records
- Content: posts published, engagement metrics (check Substack and X)
- Code: commits, projects shipped, lines written
- Growth: followers, subscribers, new contacts
- Health: sleep averages, outdoor time, medication adherence (from tracking files)

Format as a dashboard:

## {{Month}} by the Numbers

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Revenue | \$X | \$X | +/-% |
| New subscribers | X | X | +/- |
...

### Highlight: [best number]
### Concern: [worst number]
### Goal progress: \$X of \$500/mo target ([X]%)

Save to /home/workspace/Records/monthly-numbers/[month].md`,
    whatYouGet: `A quantitative monthly snapshot compiled from all your tracking data.`,
  },
  {
    id: 50,
    name: `The "Am I Ready to Launch?" Checklist`,
    category: `Business & strategy`,
    whenToUse: `You're about to launch something and want to make sure nothing is missing.`,
    prompt: `I'm about to launch {{what}}. Generate a launch checklist specific to this project.

Check:
- Product: does it work? Is the core flow smooth? Test it.
- Content: do I have a description, screenshots, and demo ready?
- Distribution: where am I announcing this? (X, Substack, ProductHunt, etc.) Are those posts drafted?
- Payment: if it costs money, does the payment flow work end to end?
- Legal: privacy policy, terms of service, cookie consent — do I need any of these?
- Analytics: am I tracking signups, usage, and errors?
- Social: is the Open Graph image set? Does the link preview look good?
- Support: how will people reach me if something breaks?
- Fallback: if it crashes at launch, what's my plan?

For each item: ✅ Ready, ⚠️ Needs attention, or ❌ Missing.`,
    whatYouGet: `A comprehensive, project-specific launch checklist that catches the things you'd normally miss.`,
  },
  {
    id: 51,
    name: `Inbox Triage`,
    category: `Email & communication`,
    whenToUse: `Your inbox is overwhelming and you need to process it fast.`,
    prompt: `Check my Gmail inbox for unread emails. For each one:

Priority:
- 🔴 Needs reply today (from clients, time-sensitive, money-related)
- 🟡 Reply this week (professional, non-urgent)
- 🟢 Read later or archive (newsletters, notifications, FYI)
- 🗑️ Delete/unsubscribe (spam, irrelevant marketing)

For each 🔴 email, draft a reply. Keep them short and actionable.

Show me the triage list sorted by priority. Total time to process the 🔴 items: estimate in minutes.`,
    whatYouGet: `Your entire inbox triaged with draft replies for urgent items.`,
  },
  {
    id: 52,
    name: `Cold Outreach Personalizer`,
    category: `Email & communication`,
    whenToUse: `You're reaching out to someone for the first time and need it to not feel cold.`,
    prompt: `I want to reach out to {{name}} at {{company/role}}.

Research them:
- Recent posts, articles, or tweets
- What they're working on
- Something specific I can reference that shows I've done my homework

Write a cold email that:
- Opens with something about THEM (not about me)
- Connects my work to something they care about
- Makes a specific, low-commitment ask
- Is under 100 words
- Doesn't use "I hope this finds you well" or "I came across your profile"

Also suggest the best platform to reach them (email, X DM, LinkedIn) based on where they're most active.`,
    whatYouGet: `A personalized outreach message backed by actual research on the person.`,
  },
  {
    id: 53,
    name: `Meeting Summary & Action Items`,
    category: `Email & communication`,
    whenToUse: `After a meeting, you need to send a summary to attendees.`,
    prompt: `Here are my rough notes from a meeting: {{paste notes or describe what was discussed}}

Attendees: {{who was there}}
Meeting topic: {{what it was about}}

Write a clean meeting summary email:
- Subject: "[Meeting name] — Summary & Action Items"
- 3-5 bullet points covering what was discussed (decisions made, not just topics mentioned)
- Action items table: WHO does WHAT by WHEN
- Any open questions that still need answers
- Next meeting date if one was set

Keep it under 200 words. Everyone's busy.

Save as a Gmail draft addressed to the attendees.`,
    whatYouGet: `A professional meeting summary with clear action items, ready to send.`,
  },
  {
    id: 54,
    name: `The Difficult Email`,
    category: `Email & communication`,
    whenToUse: `You need to send an uncomfortable email — a rejection, a late notice, a price increase, or bad news.`,
    prompt: `I need to email {{who}} about {{the difficult thing}}.

The situation: {{explain the context and what you need to communicate}}
The relationship: {{client / colleague / vendor / friend}}
What I want to preserve: {{the relationship / my reputation / future opportunities}}

Write the email:
- Don't bury the news. Say it in the first 2 sentences.
- Be direct but not cruel
- Take responsibility where appropriate (don't over-apologize either)
- Offer a next step or alternative if one exists
- Under 150 words

Also tell me: is there a better way to deliver this message (phone call, video, in person) given the severity?`,
    whatYouGet: `A difficult email that's honest and professional, with advice on delivery method.`,
  },
  {
    id: 55,
    name: `Reply to This (Match My Tone)`,
    category: `Email & communication`,
    whenToUse: `Someone emailed you and you need a reply but can't find the right words.`,
    prompt: `Here's the email I received: {{paste the email}}

Context about my relationship with this person: {{brief context}}

What I want to say: {{the gist of your reply in rough notes}}

Write a reply that:
- Matches the formality level of their email (casual if they're casual, professional if they're professional)
- Addresses every point they raised
- Is no longer than their email (don't write an essay in response to 3 sentences)
- Ends with a clear next step

If there's something in their email I should address differently than my rough notes suggest, flag it.`,
    whatYouGet: `A natural reply that matches the conversation's tone and addresses everything.`,
  },
  {
    id: 56,
    name: `Design Critique`,
    category: `Design & visual`,
    whenToUse: `You've built something visual and want honest feedback before shipping.`,
    prompt: `Look at {{screenshot path, URL, or zo.space page}} and critique the design.

Be brutal but constructive:
- First impression (what does it communicate in 2 seconds?)
- Hierarchy: where does my eye go first, second, third? Is that the right order?
- Typography: is the hierarchy clear? Are the font choices working?
- Color: is the palette cohesive? Any contrast issues?
- Spacing: does it breathe? Anything cramped or too loose?
- The one thing that most undermines the design (fix this and everything improves)
- The one thing that's actually working well (don't change this)

Give specific fixes: "Change the h1 from 24px to 32px" not "make the heading bigger."`,
    whatYouGet: `A specific design critique with actionable fixes, not vague "it looks nice."`,
  },
  {
    id: 57,
    name: `Color Palette Generator`,
    category: `Design & visual`,
    whenToUse: `You're starting a new project and need a color palette that doesn't look like every SaaS template.`,
    prompt: `Generate a color palette for {{project description}}.

Mood: {{describe the feeling — bold and confident / warm and approachable / dark and sophisticated / etc.}}
Context: {{website / app / print / social media}}

Give me:
- 1 primary color (with hex)
- 1 accent color (with hex)
- 2-3 neutrals (with hex)
- 1 semantic set: success, warning, error (with hex)
- Dark mode version of the full palette (NOT just inverted)

Requirements:
- No blue-to-purple gradients. No default Bootstrap colors.
- All combinations must pass WCAG AA contrast ratio (verify the key ones)
- Show me the palette applied: a sample card component with heading, body text, button, and background

Name the palette something memorable, not "palette-v3."`,
    whatYouGet: `A complete, accessible color palette with dark mode and a visual sample — not a random color wheel output.`,
  },
  {
    id: 58,
    name: `Generate an OG Image`,
    category: `Design & visual`,
    whenToUse: `You need an Open Graph / social sharing image for a page or post.`,
    prompt: `Generate an OG image (1200×630px) for {{page/post title}}.

Style: {{match my brand / dark mode / minimal / bold typography}}
Include:
- The title in large, readable text
- My name or brand below in smaller text
- A visual element that relates to the content (NOT a generic gradient)
- Ensure text is legible even at thumbnail size

Generate it using the image generation tool, then upload it as a zo.space asset so I can reference it in meta tags.`,
    whatYouGet: `A custom social sharing image sized correctly, uploaded and ready to use.`,
  },
  {
    id: 59,
    name: `UI Component Builder`,
    category: `Design & visual`,
    whenToUse: `You need a React component that looks good without spending an hour on styling.`,
    prompt: `Build a React component for {{describe the component — card, form, navigation, modal, pricing table, etc.}}.

Requirements:
- React + TypeScript + Tailwind CSS
- Dark mode by default
- Typography: {{Syne / Space Grotesk / your project's fonts}}
- Responsive (works at 320px, 768px, and 1280px)
- Accessible (proper aria labels, keyboard navigation if interactive)
- Not generic — this should have a specific character, not look like a Tailwind template

Include props/types for customization. Test it by creating a zo.space page at /components/{{name}} so I can see it live.`,
    whatYouGet: `A styled, accessible React component deployed to a preview page.`,
  },
  {
    id: 60,
    name: `Image Edit for Social`,
    category: `Design & visual`,
    whenToUse: `You have a photo or screenshot and need it polished for social media posting.`,
    prompt: `Edit this image for social media: {{file path}}

Platform: {{X / LinkedIn / Instagram / Open Graph}}
Changes needed: {{describe — crop, add text overlay, adjust colors, remove background, add border/frame, etc.}}

Platform sizing:
- X post: 1200×675px
- LinkedIn: 1200×627px
- Instagram: 1080×1080px (square) or 1080×1350px (portrait)
- OG image: 1200×630px

Make it look intentional, not "I quickly threw text on a screenshot in Canva."`,
    whatYouGet: `A social-media-ready image, properly sized for the target platform.`,
  },
  {
    id: 61,
    name: `Teach Me This Concept`,
    category: `Learning & skill-building`,
    whenToUse: `You want to learn something specific and retain it.`,
    prompt: `Teach me {{concept/technology/skill}}.

My current level: {{beginner / have context / intermediate}}
My learning style: I learn best by {{doing / reading / seeing examples / breaking things}}
Time I have: {{15 min / 1 hour / half a day}}

Structure the lesson:
1. WHY does this matter? (Motivate me before teaching — connect it to problems I'll face)
2. The core mental model (the ONE idea that makes everything else click)
3. Hands-on exercise (something I build or do, not just read)
4. Common mistakes and how to avoid them
5. "You'll know you understand this when you can..." (a self-test)
6. The one resource to go deeper (book chapter, tutorial, or docs page — just ONE)

Skip the history. Skip the "there are many approaches." Teach me the approach that works.`,
    whatYouGet: `A structured lesson that builds real understanding, not just surface awareness.`,
  },
  {
    id: 62,
    name: `Build a Flashcard Set`,
    category: `Learning & skill-building`,
    whenToUse: `You need to memorize facts, APIs, vocabulary, or concepts.`,
    prompt: `Create a flashcard set for {{topic}}.

Generate 20-30 flashcards:
- Front: question or prompt
- Back: answer

Rules:
- One concept per card (no compound questions)
- Questions should test understanding, not just recall
- Include "why" questions, not just "what" questions
- Order them from foundational to advanced
- For code-related topics, include code snippets on the front that I should know the output of

Save to /home/workspace/Records/flashcards/{{topic}}.md in a format that's easy to quiz myself from.`,
    whatYouGet: `A spaced-repetition-ready flashcard set for any topic.`,
  },
  {
    id: 63,
    name: `Code Along Tutorial`,
    category: `Learning & skill-building`,
    whenToUse: `You learn by building and want a guided project to pick up a new technology.`,
    prompt: `Create a code-along tutorial for learning {{technology/concept}}.

My background: I know {{current skills}}. I'm learning {{new thing}} for the first time.

Build a small project that:
- Takes 1-2 hours to complete
- Covers the core concepts (not every edge case)
- Results in something I can actually use or show
- Each step builds on the previous one (no jumping around)

For each step:
1. What we're building in this step (and why)
2. The code (complete, runnable)
3. What to notice (the key concept being demonstrated)
4. A mini-challenge: "Now try changing X to see what happens"

Save the tutorial to my workspace so I can follow along at my own pace.`,
    whatYouGet: `A self-paced tutorial that teaches through building, not lecturing.`,
  },
  {
    id: 64,
    name: `Debug My Understanding`,
    category: `Learning & skill-building`,
    whenToUse: `You think you understand something but want to verify.`,
    prompt: `Here's my understanding of {{concept}}: {{explain it in your own words}}

Am I right? Grade my understanding:
- What I got right
- What I got wrong (and the correct explanation)
- What I'm missing (gaps I don't even know about)
- A question that would test whether I truly understand this (not something I could answer from what I just wrote — something that requires real understanding)

Be honest. "Close enough" is not good enough if it'll cause bugs or bad decisions later.`,
    whatYouGet: `An honest assessment of your understanding with corrections and a challenge question.`,
  },
  {
    id: 65,
    name: `Reading List Builder`,
    category: `Learning & skill-building`,
    whenToUse: `You want to go deep on a topic and need a structured reading path.`,
    prompt: `Build a reading path for learning {{topic}} deeply.

My current level: {{beginner / intermediate / advanced}}
Time commitment: {{1 book / 3-5 articles / a full curriculum}}
Format preference: {{books / articles / videos / tutorials / mix}}

Create a learning path:
1. Start here: [foundational resource]
2. Then: [builds on #1]
3. Then: [introduces complexity]
4. Deep dive: [the advanced resource]
5. Contrarian view: [something that challenges the mainstream perspective]

For each item: title, author, format, estimated time, and why it's in this position (not just "it's good" — why read it AFTER the previous one).`,
    whatYouGet: `A structured learning path that builds knowledge in the right order.`,
  },
  {
    id: 66,
    name: `File Format Converter`,
    category: `File & data management`,
    whenToUse: `You need to convert between file formats.`,
    prompt: `Convert {{source file path}} from {{source format}} to {{target format}}.

If it's a document: use pandoc to convert, preserving formatting as much as possible.
If it's media: use ffmpeg with settings optimized for {{web / email / archive}}.
If it's data: preserve the structure, handle encoding issues, and validate the output.

Save the converted file next to the original with the new extension.
Tell me if anything was lost in the conversion.`,
    whatYouGet: `A clean file conversion with notes on any formatting or data loss.`,
  },
  {
    id: 67,
    name: `CSV Data Cleaner`,
    category: `File & data management`,
    whenToUse: `You have a messy CSV and need it cleaned up before analysis.`,
    prompt: `Clean this CSV: {{file path}}

Common issues to fix:
- Remove duplicate rows
- Standardize date formats (convert all to YYYY-MM-DD)
- Clean up whitespace (trailing spaces, inconsistent spacing)
- Fix encoding issues (mojibake, special characters)
- Standardize categorical values (e.g., "US", "USA", "United States" → one format)
- Handle missing values (document how many and where)
- Remove completely empty rows

Save the cleaned version as {{filename}}-clean.csv
Generate a cleaning report: how many rows before/after, what was changed, any issues that need human review.`,
    whatYouGet: `A clean CSV with a detailed report of what was fixed.`,
  },
  {
    id: 68,
    name: `Folder Structure Architect`,
    category: `File & data management`,
    whenToUse: `Starting a new project and want an organized file structure from day one.`,
    prompt: `Design a folder structure for {{project type: web app / content project / freelance client / data analysis / etc.}}.

Context: {{what the project is}}
Stack: {{technologies if applicable}}

Create the directory structure with an explanation for each folder:`,
    whatYouGet: `A well-organized project structure with template files, ready to start building.`,
  },
  {
    id: 69,
    name: `Find and Kill Duplicates`,
    category: `File & data management`,
    whenToUse: `You suspect you have duplicate files wasting space.`,
    prompt: `Scan {{directory path}} for duplicate or near-duplicate files.

Check for:
- Exact duplicates (same content, different names or locations)
- Near-duplicates (very similar content — e.g., document-v2.md and document-v3.md where v2 is fully contained in v3)
- Orphaned files (files that aren't referenced by anything)

For each set of duplicates:
- Show all copies with paths and modification dates
- Recommend which to keep (most recent / most complete / best located)
- Mark the others for deletion

Don't delete anything — give me the list and let me approve.`,
    whatYouGet: `A duplicate file report with keep/delete recommendations waiting for your approval.`,
  },
  {
    id: 70,
    name: `Data Migration Script`,
    category: `File & data management`,
    whenToUse: `You need to move data from one format/location/structure to another.`,
    prompt: `I need to migrate data from {{source — describe format and location}} to {{target — describe desired format and location}}.

Write a migration script that:
1. Reads all data from the source
2. Transforms it to the target format
3. Validates the output (count check, spot check)
4. Writes to the target location
5. Generates a migration report: rows processed, errors, warnings

Safety:
- Don't modify the source data
- Write to a temp location first, verify, then move to final location
- If any error rate > 5%, stop and report (don't silently skip)

Run it and show me the results.`,
    whatYouGet: `A safe data migration with validation and reporting.`,
  },
  {
    id: 71,
    name: `Tweet Storm Drafter`,
    category: `Social media & marketing`,
    whenToUse: `You have an idea for a thread and want it drafted quickly.`,
    prompt: `Write a Twitter/X thread about {{topic}}.

My angle: {{what I want to say about it}}
Goal: {{educate / persuade / share a story / drive engagement / promote something}}

Thread structure:
- Tweet 1: Hook (this determines whether anyone reads the rest — make it stop-the-scroll good)
- Tweets 2-6: The substance (one idea per tweet, each works standalone if someone only sees one)
- Final tweet: CTA or memorable closer

Rules:
- Each tweet under 280 characters (obviously)
- No "🧵 Thread:" opener. That's a signal to skip.
- Include one specific number, example, or anecdote (not just opinions)
- Vary rhythm: some tweets are one sentence, others use the full character count
- The thread should reward reading all of it, but each tweet should hold up alone in a quote retweet`,
    whatYouGet: `A complete thread draft with a strong hook and standalone tweets.`,
  },
  {
    id: 72,
    name: `Hashtag and Timing Optimizer`,
    category: `Social media & marketing`,
    whenToUse: `You've written a post and want to maximize its reach.`,
    prompt: `I'm about to post this on {{platform}}: {{paste the post}}

Optimize:
- Hashtags: suggest 3-5 hashtags that are active but not oversaturated (research current usage)
- Timing: when should I post this for maximum reach given my audience is {{audience description}}?
- Hook check: is the first line scroll-stopping? If not, suggest a better opener.
- Length check: is this too long for {{platform}}? Trim if needed.
- CTA: does this post give people a reason to engage? If not, suggest one.

Also: are there any trending topics right now that I could tie this post to for extra visibility?`,
    whatYouGet: `An optimized post with researched hashtags, timing, and engagement suggestions.`,
  },
  {
    id: 73,
    name: `Social Media Audit`,
    category: `Social media & marketing`,
    whenToUse: `Monthly check on how your social presence is performing.`,
    prompt: `Audit my social media presence:

Platforms to check: {{X, LinkedIn, Substack, GitHub — list yours}}

For each platform:
- Profile completeness (bio, photo, links, pinned content)
- Recent activity level (posts in last 30 days)
- Content quality (read my last 5 posts — are they good?)
- Engagement patterns (what types of posts get the most interaction?)

Cross-platform:
- Is my messaging consistent?
- Am I cross-promoting between platforms?
- Where am I wasting time vs where am I getting results?

Top 3 recommendations (specific, actionable) for the next 30 days.`,
    whatYouGet: `A cross-platform social media audit with specific recommendations.`,
  },
  {
    id: 74,
    name: `Viral Post Reverse Engineer`,
    category: `Social media & marketing`,
    whenToUse: `You see a post that blew up and want to understand why.`,
    prompt: `Analyze this viral post: {{URL or paste the post}}

Break down:
- The hook: what made people stop scrolling?
- The structure: how is the information organized?
- The emotion: what does this make people FEEL?
- The shareability: why would someone retweet/share this?
- The timing: was there a news event or trend that amplified it?
- The audience: who specifically resonated with this?

Now: how could I create something with similar mechanics but about {{my topic}}? Give me a specific post draft that uses the same structural patterns.`,
    whatYouGet: `A structural analysis of why something went viral, with a template you can apply to your own content.`,
  },
  {
    id: 75,
    name: `Engagement Reply Generator`,
    category: `Social media & marketing`,
    whenToUse: `You want to engage with others' posts thoughtfully but quickly.`,
    prompt: `I want to leave meaningful replies on posts in my niche to build visibility. Search for recent popular posts about {{topic/niche}} on {{platform}}.

For the top 5 posts found:
- The post (URL + summary)
- A thoughtful reply that:
  - Adds value (not just "great post!")
  - Demonstrates expertise without being preachy
  - Is likely to get liked or replied to
  - Under 280 characters for X, appropriate length for other platforms
  - Genuinely engages with the content (don't force my promotion into it)

Also suggest 2-3 accounts I should be regularly engaging with for visibility in this space.`,
    whatYouGet: `Five ready-to-post replies that build your visibility through genuine engagement.`,
  },
  {
    id: 76,
    name: `Brand Voice Guide Builder`,
    category: `Social media & marketing`,
    whenToUse: `You want to document your voice so AI tools and collaborators can match it.`,
    prompt: `Read my writing from: {{list 3-5 files or URLs of your best writing}}

Create a brand voice guide that captures how I write:

## Voice Profile
- Tone: [adjectives]
- Vocabulary level: [plain / technical / mix]
- Sentence patterns: [what's distinctive]
- Humor style: [if any]
- Things I never say: [words/phrases to avoid]

## Do's and Don'ts
| Do | Don't |
|----|-------|
| [specific pattern] | [specific anti-pattern] |

## Example Rewrites
Take 3 generic sentences and show them rewritten in my voice.

## Prompt Template
A paragraph I can paste into any AI tool that says "write in my voice" and actually works.

Save to /home/workspace/Business/brand-voice-guide.md`,
    whatYouGet: `A documented voice guide you can paste into any AI tool for consistent writing.`,
  },
  {
    id: 77,
    name: `Newsletter Draft`,
    category: `Social media & marketing`,
    whenToUse: `You need to write your newsletter and are procrastinating.`,
    prompt: `Draft this week's newsletter about {{topic or let me brainstorm}}.

Format: {{Substack / email newsletter / blog}}
Audience: {{who reads this}}
Goal: {{inform / persuade / entertain / drive action}}

Structure:
- Subject line: 3 options (A/B testable)
- Opening hook (not "This week I..." — something that earns the next paragraph)
- Core content (800-1200 words unless specified otherwise)
- 1-2 images or visual breaks (describe what they should be)
- CTA: what should the reader do after reading?
- P.S. line (the most-read part of any email — make it good)

Write it in my voice. Check my previous writing at {{file path}} for tone reference.`,
    whatYouGet: `A complete newsletter draft with subject lines, hook, content, and CTA.`,
  },
  {
    id: 78,
    name: `Email Sequence for New Subscribers`,
    category: `Social media & marketing`,
    whenToUse: `You're setting up automated emails for new newsletter subscribers or customers.`,
    prompt: `Design a {{N}}-email welcome sequence for new subscribers to {{my newsletter/product}}.

What they signed up for: {{the promise that got them to subscribe}}
Goal of the sequence: {{build relationship / sell something / educate / retain}}

For each email:
- Send timing: Day [X] after signup
- Subject line (A/B options)
- Content (200-300 words each)
- CTA
- What this email achieves in the relationship arc

The sequence should:
- Email 1: Deliver on the promise + set expectations
- Middle emails: Provide value + reveal personality
- Final email: Make an ask or establish ongoing cadence

No "welcome aboard" or "thanks for subscribing" as the first words. Start with VALUE.`,
    whatYouGet: `A complete email sequence ready to set up in your email platform.`,
  },
  {
    id: 79,
    name: `Social Media Bio Optimizer`,
    category: `Social media & marketing`,
    whenToUse: `Quarterly, or whenever you've changed what you want to be known for.`,
    prompt: `Rewrite my bios across platforms:

My current focus: {{what you're building/doing now}}
My target audience: {{who you want to attract}}
My key differentiator: {{what makes you different from others in your space}}

Write bios for:
- X/Twitter (160 chars max, personality-forward)
- LinkedIn (headline: 120 chars, about section: 2600 chars)
- GitHub (short and technical)
- Substack (concise, audience-focused)

Each bio should:
- Lead with what I do (not my name)
- Include a specific, memorable detail
- Have a clear CTA (follow, subscribe, check out X)
- Not use "passionate about" or "thought leader"
- Match the platform's culture (X is casual, LinkedIn is professional-but-human)`,
    whatYouGet: `Platform-optimized bios that all tell the same story in different registers.`,
  },
  {
    id: 80,
    name: `Photo Metadata Organizer`,
    category: `File & data management`,
    whenToUse: `You have a bunch of images and need them organized or documented.`,
    prompt: `Scan /home/workspace/Images/ and organize:

1. List all images with: filename, dimensions, file size, creation date if available
2. Categorize by apparent content (screenshots, photos, generated images, diagrams)
3. Identify any duplicates or near-duplicates
4. Flag images that are unusually large (could be optimized)
5. Suggest a folder structure if one doesn't exist

For any images without descriptive filenames, suggest better names.

Save the inventory to /home/workspace/Images/IMAGE-INDEX.md`,
    whatYouGet: `An organized image inventory with optimization suggestions and a searchable index.`,
  },
  {
    id: 81,
    name: `Notion to Markdown Exporter`,
    category: `File & data management`,
    whenToUse: `You want to back up or migrate content from Notion to your workspace.`,
    prompt: `Export content from my Notion workspace to markdown files.

What to export: {{specific pages, databases, or "everything important"}}
Save to: /home/workspace/Documents/notion-export/

For each page:
- Convert to clean markdown
- Preserve hierarchy (sub-pages become subdirectories)
- Download and save any embedded images
- Convert Notion databases to markdown tables or JSON files
- Preserve links between pages (convert to relative paths)

Give me a summary of what was exported and total file count.`,
    whatYouGet: `Your Notion content backed up as clean markdown files in your workspace.`,
  },
  {
    id: 82,
    name: `Log File Analyzer`,
    category: `File & data management`,
    whenToUse: `You have log files and need to find issues or patterns.`,
    prompt: `Analyze the logs at {{path or describe which service}}.

Look for:
- Errors and exceptions (with frequency and first occurrence)
- Performance patterns (slow requests, timeouts)
- Unusual activity (spikes in traffic, repeated failed auth attempts)
- Most common entries (what's generating the most noise?)

Give me:
- Top 5 issues by severity
- Timeline: when did issues start/stop?
- Root cause hypothesis for each issue
- Recommended fixes or further investigation steps

Present it like a log analysis report, not a raw dump.`,
    whatYouGet: `A structured analysis of your logs with actionable insights.`,
  },
  {
    id: 83,
    name: `Bookmark Dump Processor`,
    category: `File & data management`,
    whenToUse: `You have a pile of saved links and need them organized.`,
    prompt: `I have these links to process: {{paste URLs or file path with URLs}}

For each link:
1. Fetch the page title and a 1-sentence summary
2. Categorize: tool, article, reference, tutorial, inspiration, repository
3. Tag with 2-3 keywords
4. Rate relevance to my interests (1-5 stars)

Save as a structured bookmark file at /home/workspace/Records/bookmarks.md:
## [Category]
- ⭐⭐⭐⭐⭐ [Title](URL) — [summary] \`#tag1\` \`#tag2\`
- ⭐⭐⭐⭐ [Title](URL) — [summary] \`#tag1\` \`#tag2\`
...

Sort by rating within each category.`,
    whatYouGet: `A pile of URLs turned into an organized, rated, and categorized bookmark library.`,
  },
  {
    id: 84,
    name: `Content Performance Analyzer`,
    category: `Social media & marketing`,
    whenToUse: `You want to understand which content is working and why.`,
    prompt: `Analyze my content performance across {{platforms}}.

Check my recent posts (last 30 days) and identify:
- Top 3 performing posts (by engagement) — and specifically why they worked
- Bottom 3 performing posts — and specifically why they didn't
- Content type breakdown: which formats get the best engagement?
- Topic analysis: which subjects resonate most?
- Timing patterns: when do my posts perform best?

Based on this analysis:
- What should I do more of?
- What should I stop doing?
- 3 specific content ideas for next week based on what's working`,
    whatYouGet: `Data-driven content strategy recommendations based on what's actually performing.`,
  },
  {
    id: 85,
    name: `Create a Mood Board`,
    category: `Design & visual`,
    whenToUse: `Starting a design project and need visual direction.`,
    prompt: `Create a mood board for {{project description}}.

Vibe: {{describe the feeling — dark and premium / bright and playful / organic and warm / etc.}}

Find and assemble:
- 3-5 reference images via image_search (similar products, inspiring designs, color references)
- Color palette inspiration (extract colors from the reference images)
- Typography suggestions (2-3 font pairings that match the mood)
- Texture/pattern references (if applicable)
- One "anti-reference" — an example of what this should NOT look like

Save a mood board document to /home/workspace/Projects/{{project}}/mood-board.md with all references, colors, and notes.

Also generate one abstract mood image that captures the overall feeling we're going for.`,
    whatYouGet: `A visual direction document with references, colors, fonts, and an AI-generated mood image.`,
  },
  {
    id: 86,
    name: `Responsive Check`,
    category: `Design & visual`,
    whenToUse: `You've built a page and need to verify it works at different screen sizes.`,
    prompt: `Check {{URL or zo.space page}} at these screen sizes:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px
- Wide: 1920px

For each breakpoint:
- Take a screenshot
- Note any layout issues (overflow, text too small, spacing wrong, elements overlapping)
- Check touch target sizes on mobile (buttons at least 44px)
- Verify text readability at each size

Report:
- ✅ Looks good at [size]
- ⚠️ Issues at [size]: [specific problems]
- ❌ Broken at [size]: [what's wrong]

For each issue, give the specific CSS fix.`,
    whatYouGet: `A responsive design audit with specific fixes for each breakpoint.`,
  },
  {
    id: 87,
    name: `Accessibility Audit`,
    category: `Design & visual`,
    whenToUse: `Before shipping any public-facing page.`,
    prompt: `Run an accessibility audit on {{URL or zo.space page}}.

Check:
- Color contrast ratios (WCAG AA minimum)
- Alt text on all images
- Heading hierarchy (h1 → h2 → h3, no skipping)
- Keyboard navigation (can you tab through everything?)
- Form labels (every input has a label)
- Focus indicators (visible focus states)
- Screen reader compatibility (meaningful content order)

For each issue:
- What's wrong
- WCAG criterion it violates
- The fix (with code)
- Severity: A (critical), AA (should fix), AAA (nice to have)

Report total issues by severity. What's the minimum I need to fix before shipping?`,
    whatYouGet: `A WCAG-aligned accessibility audit with prioritized fixes.`,
  },
  {
    id: 88,
    name: `Learn From My Mistakes`,
    category: `Learning & skill-building`,
    whenToUse: `After something went wrong and you want to extract the lesson.`,
    prompt: `Here's what happened: {{describe the mistake, bug, failed project, bad decision}}

Help me learn from this:
1. Root cause: what actually went wrong (not symptoms, the underlying cause)
2. Decision point: where did I make the wrong call? What information was I missing?
3. Pattern: is this part of a recurring pattern in my work? (Be honest)
4. Prevention: what system, checklist, or habit would prevent this class of mistake?
5. Silver lining: what did I learn that makes me better going forward?

Don't comfort me. Diagnose me. I need to not repeat this.`,
    whatYouGet: `An honest failure analysis that turns mistakes into systems for prevention.`,
  },
  {
    id: 89,
    name: `API Response Mocker`,
    category: `Code & technical`,
    whenToUse: `You need to build a frontend before the backend API is ready.`,
    prompt: `Create mock API endpoints for {{the feature I'm building}}.

Based on this API spec: {{describe the endpoints or paste a spec}}

Create zo.space API routes that return realistic mock data:
- Proper HTTP methods and status codes
- Realistic data shapes (not "test123" — actual-looking names, dates, amounts)
- Pagination support if applicable
- Appropriate error responses for edge cases
- A brief delay (100-500ms) to simulate network latency

Make the mocks smart enough to:
- Return different data on different calls (randomize slightly)
- Respect query parameters
- Return appropriate errors for bad inputs

I'll swap these for real endpoints later — make the interface clean enough that the swap is easy.`,
    whatYouGet: `Realistic mock API endpoints you can build against while the real backend is in progress.`,
  },
  {
    id: 90,
    name: `Workspace Snapshot`,
    category: `File & data management`,
    whenToUse: `You want to document the current state of your workspace for reference.`,
    prompt: `Create a snapshot of my current workspace state:

1. Directory tree (top 3 levels, excluding node_modules, .git, etc.)
2. Active projects: list each with current status from _plan.md files
3. Zo.space routes: list all with type (page/api) and public/private status
4. Running services: any active user services
5. Scheduled agents: list all with their schedules
6. Disk usage: total and by top-level directory

Save to /home/workspace/Records/workspace-snapshots/[date].md

This is my "state of the system" snapshot for future reference.`,
    whatYouGet: `A complete snapshot of your workspace state, useful for tracking how things evolve.`,
  },
  {
    id: 91,
    name: `PR Review Assistant`,
    category: `Code & technical`,
    whenToUse: `Reviewing pull requests and want a second opinion.`,
    prompt: `Review this code diff: {{paste diff or describe the PR}}

Context: {{what the PR is supposed to do}}

Review for:
- Does this actually accomplish what the PR claims?
- Any bugs or edge cases not handled?
- Performance implications
- Breaking changes to existing consumers
- Test coverage (are the new paths tested?)

Don't flag:
- Style preferences that a linter should handle
- Trivial renaming
- Comment formatting

For each real issue, suggest a specific fix. Classify as: must-fix, should-fix, nit.`,
    whatYouGet: `A focused PR review that catches real issues without bikeshedding.`,
  },
  {
    id: 92,
    name: `Dependency Research`,
    category: `Learning & skill-building`,
    whenToUse: `Evaluating whether to adopt a new library or framework.`,
    prompt: `Research {{library/framework/tool}} — should I use it?

Check:
- What it does and what problem it solves
- GitHub: stars, recent commits, open issues, contributors (is it maintained?)
- Bundle size (for frontend libraries)
- Documentation quality (find the docs, assess them)
- Community: Discord/forum activity, StackOverflow questions
- Alternatives: what else solves the same problem?
- Breaking changes history: does this library break things in major versions?

My use case: {{what I want to use it for}}

Recommendation: Use it / Don't use it / Use alternative X instead. One paragraph why.`,
    whatYouGet: `A thorough evaluation of a dependency before you commit to it.`,
  },
  {
    id: 93,
    name: `Sprint Planning`,
    category: `Personal productivity`,
    whenToUse: `Beginning of a work sprint, need to plan what to tackle.`,
    prompt: `Help me plan a {{length: 1 week / 2 week / 1 day}} sprint.

My projects: {{list active projects}}
Priorities: {{what matters most right now}}
Available time: {{hours per day, days available}}
Energy pattern: {{when am I most productive during the day}}

Create a sprint plan:
- Sprint goal: [one sentence — what "done" looks like at the end]
- Task list by priority (each with estimated time)
- Daily schedule suggestion (matching tasks to my energy levels)
- Buffer: leave 20% of time unplanned for surprises
- The thing I should NOT work on this sprint (even though I'll be tempted)

Save as a _plan.md in the appropriate project directory.`,
    whatYouGet: `A structured sprint plan that accounts for energy levels and protects against scope creep.`,
  },
  {
    id: 94,
    name: `A/B Test Designer`,
    category: `Social media & marketing`,
    whenToUse: `You want to test variations of something to see what works better.`,
    prompt: `Design an A/B test for {{what I want to test — landing page headline, pricing, email subject line, CTA button, etc.}}.

Current version: {{describe or link}}
What I want to improve: {{metric — signups, clicks, replies, purchases}}

Give me:
- Variant B: the change to test (with specific copy/design)
- Hypothesis: "We expect [change] to increase [metric] because [reasoning]"
- Sample size: how much traffic/data do I need to be confident?
- Duration: how long to run the test
- How to measure: what exactly to track and how to determine a winner
- Statistical significance: what threshold to use and when to call it

If I don't have enough traffic for a traditional A/B test, suggest a guerrilla testing method instead.`,
    whatYouGet: `A complete A/B test plan with hypothesis, measurement criteria, and statistical guidance.`,
  },
  {
    id: 95,
    name: `Digital Product Idea Validator`,
    category: `Business & strategy`,
    whenToUse: `You have an idea for something to sell and want to validate it quickly.`,
    prompt: `Validate this digital product idea: {{describe the product}}

Quick validation checklist:
1. DEMAND: Search for people asking for this (forums, X, Reddit). Do they exist?
2. COMPETITION: Who else sells something similar? What do they charge? What are the reviews saying?
3. SEARCH VOLUME: Are people searching for this? (Check web search suggestions and related searches)
4. WILLINGNESS TO PAY: Evidence that people pay for this category of thing
5. BUILD EFFORT: How long would this take me to build?
6. DISTRIBUTION: How would the first 50 customers find this?

Verdict: 🟢 Worth building / 🟡 Needs more validation / 🔴 Red flags

If 🟡 or 🔴: what specific information would change the verdict?`,
    whatYouGet: `A quick validation framework for product ideas, grounded in real demand signals.`,
  },
  {
    id: 96,
    name: `Diagram Generator`,
    category: `Design & visual`,
    whenToUse: `You need to explain a system, process, or relationship visually.`,
    prompt: `Create a diagram showing {{what to visualize}}.

Type: {{flowchart / architecture / sequence / entity relationship / mind map / process}}

Use the D2 diagram tool. Make it:
- Clear enough that someone unfamiliar could understand it
- Not cluttered (if it's complex, break into multiple diagrams)
- Properly labeled (every arrow and connection explained)
- Using a consistent visual style

Save the diagram source and PNG to my workspace.`,
    whatYouGet: `A clean, professional diagram generated from a text description.`,
  },
  {
    id: 97,
    name: `Year-in-Review Draft`,
    category: `Writing & content`,
    whenToUse: `End of year, wanting to reflect on what you built and share it publicly.`,
    prompt: `Help me write my {{year}} year in review.

Source material:
- Check git history for all projects touched this year
- Read monthly review files if they exist
- Check revenue records
- Read journal entries for highlights
- Check social media growth metrics

Write a year-in-review post that:
- Opens with the story of the year (not a list of accomplishments)
- Covers: what I built, what I learned, what surprised me, what I'm proud of, what I'd do differently
- Includes specific numbers where available (revenue, subscribers, projects shipped, commits)
- Is honest about failures and setbacks — not just a highlight reel
- Ends with what I'm building toward next year

Tone: reflective and honest, not a humble-brag or a pity party. Write it like a letter to a friend who asks "so how was your year?"`,
    whatYouGet: `A year-in-review post built from actual data, honest about both wins and losses.`,
  },
  {
    id: 98,
    name: `Design System Starter`,
    category: `Design & visual`,
    whenToUse: `Starting a project that will have multiple pages/components and needs design consistency.`,
    prompt: `Create a design system for {{project}}.

Mood: {{describe the vibe}}

Document:
1. Color palette (primary, accent, neutrals, semantic, dark mode variants — all with hex)
2. Typography scale (font families, sizes for h1-h6, body, caption, code — with line heights)
3. Spacing scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64)
4. Border radius scale (none, sm, md, lg, full)
5. Shadow scale (sm, md, lg, xl)
6. Core components (button, input, card, badge — as Tailwind CSS class recipes)

Save as /home/workspace/Projects/{{project}}/DESIGN-SYSTEM.md

Also create a Tailwind theme config snippet I can paste into my project.`,
    whatYouGet: `A complete design system document with Tailwind configuration.`,
  },
  {
    id: 99,
    name: `Weekly Social Media Batch Creator`,
    category: `Social media & marketing`,
    whenToUse: `Sunday night, batch-creating the week's social content.`,
    prompt: `Create a week's worth of social content for {{platform}}.

My niche: {{your area}}
Content pillars: {{3-4 themes you rotate between}}
Goal this week: {{grow followers / drive traffic / engage community / promote [thing]}}

For each day (Mon-Fri):
- The post (full text, not a summary)
- Any media needed (describe the image/screenshot I should create)
- Suggested posting time
- Engagement plan: 1 action to take after posting (reply to comments for 10 min, engage with 3 related posts, etc.)

Make each post feel like it was written in the moment, not batch-created. Vary the format: some short, some long, some questions, some statements, some with images, some text-only.`,
    whatYouGet: `Five complete, ready-to-post pieces of content with timing and engagement plans.`,
  },
  {
    id: 100,
    name: `The "Make Me Look Smart" Briefing`,
    category: `Research & analysis`,
    whenToUse: `You're about to enter a conversation where you need to sound informed about a topic you barely know.`,
    prompt: `Brief me on {{topic}} so I can hold my own in a conversation about it.

In 5 minutes of reading, I need to know:
- The 3 things everyone in this space agrees on
- The 2 things they fight about
- 1 recent development that's changing things
- The jargon: 5 terms I need to know (with plain English definitions)
- The names: 3 people I should know and why they matter
- The hot take: one contrarian opinion I could drop that shows I've been thinking about this (not just parroting)

Make me sound like I've been following this for months, not minutes.`,
    whatYouGet: `A 5-minute briefing that lets you participate intelligently in any conversation.`,
  },
  {
    id: 101,
    name: `Budget Builder`,
    category: `Finance & money`,
    whenToUse: `Starting a new month and need to plan spending.`,
    prompt: `Build my monthly budget based on my actual spending.

Check Gmail for receipts, subscriptions, and payment confirmations from last month. Also read any tracking files in /home/workspace/Business/ or /home/workspace/Persona/.

Create a zero-based budget:
- Income sources and amounts
- Fixed costs (rent, insurance, subscriptions, loan payments)
- Variable necessities (groceries, gas, utilities, pet care)
- Discretionary (entertainment, eating out, shopping)
- Savings/debt paydown goal

Flag:
- Any subscription I'm paying for that I might not be using
- Categories where last month's spending was notably high
- The single biggest opportunity to save \$50/mo or more

Save to /home/workspace/Persona/budgets/{{month}}.md`,
    whatYouGet: `A budget built from your actual spending data, not hypothetical numbers.`,
  },
  {
    id: 102,
    name: `Invoice Chaser`,
    category: `Finance & money`,
    whenToUse: `Clients owe you money and haven't paid.`,
    prompt: `Check my Gmail for sent invoices that haven't been paid:
- Look for invoice emails I sent with no corresponding payment confirmation
- Check for any Stripe notifications about failed payments
- Cross-reference with /home/workspace/Business/invoices/ for outstanding amounts

For each unpaid invoice:
- Client name
- Amount
- Date sent
- Days overdue
- Previous follow-up attempts (check sent mail)

Draft appropriate follow-up emails:
- 7 days overdue: friendly reminder
- 14 days: firmer reminder with the original invoice attached
- 30+ days: final notice with late fee mention (if applicable)

Save drafts in Gmail. Don't send — I'll review first.`,
    whatYouGet: `Follow-up emails drafted for every unpaid invoice, calibrated to how overdue they are.`,
  },
  {
    id: 103,
    name: `Tax Deduction Finder`,
    category: `Finance & money`,
    whenToUse: `Tax season, or quarterly when estimating tax payments.`,
    prompt: `Find deductions I might be missing as a self-employed web developer working from a camper in Idaho.

Search for current IRS guidance on:
- Home office deduction (for non-traditional living situations like RVs/campers)
- Equipment and software (computers, monitors, subscriptions)
- Internet and phone (business percentage)
- Professional development (courses, books, conferences)
- Vehicle (if I drive to client meetings or coworking spaces)
- Health insurance premiums (self-employed deduction)
- Retirement contributions (SEP IRA, Solo 401k options)
- State-specific Idaho deductions

For each deduction:
- What qualifies
- How to calculate the amount
- What records I need to keep
- Common mistakes to avoid

Save to /home/workspace/Business/tax-deductions-guide.md

Also: estimate my quarterly tax payment based on my revenue so far.`,
    whatYouGet: `A personalized deduction guide for your specific tax situation.`,
  },
  {
    id: 104,
    name: `Subscription Stack Optimizer`,
    category: `Finance & money`,
    whenToUse: `Monthly, to ensure you're not paying for overlapping or unused services.`,
    prompt: `Audit my software subscriptions. Check Gmail for all subscription/renewal emails from the past 3 months.

For each subscription found:
- Service name
- Monthly/annual cost
- What I use it for
- Is there a free alternative that covers 80%+ of what I need?
- Am I on the right plan? (Am I paying for features I don't use?)

Build a comparison table:
| Service | Cost | Use Frequency | Free Alternative | Action |
|---------|------|---------------|------------------|--------|

Recommendations:
- Total monthly spend on subscriptions
- Potential savings if I switched to free alternatives where possible
- The "stack" I should keep (the minimal set of paid tools that covers everything)`,
    whatYouGet: `A subscription audit with potential savings and free alternatives identified.`,
  },
  {
    id: 105,
    name: `Expense Categorizer`,
    category: `Finance & money`,
    whenToUse: `You have a pile of receipts or transactions and need them organized.`,
    prompt: `Categorize these expenses: {{paste transactions or point to a CSV file}}

Categories:
- Business: software, hosting, domains, equipment, professional services
- Business: marketing, advertising, content tools
- Business: travel, meals (client-related)
- Personal: housing, utilities, insurance
- Personal: food, groceries
- Personal: health, medical, prescriptions
- Personal: transportation
- Personal: entertainment, subscriptions
- Pet: Lucky's expenses

For each transaction: amount, date, vendor, category, tax-deductible (yes/no/partial).

Summary:
- Total by category
- Business vs personal split
- Total tax-deductible amount

Save to /home/workspace/Business/expenses/{{month}}.md`,
    whatYouGet: `Transactions categorized for tax purposes with deductible amounts flagged.`,
  },
  {
    id: 106,
    name: `Savings Goal Tracker`,
    category: `Finance & money`,
    whenToUse: `Weekly check on progress toward a financial goal.`,
    prompt: `Track my savings goal: {{goal description, e.g., "\$3000 emergency fund by December"}}

Target amount: \${{amount}}
Target date: {{date}}
Current savings: {{check tracking files or ask}}

Calculate:
- Amount needed per week to hit the goal
- Am I on pace? (based on current trajectory)
- What would I need to cut to save an extra \${{X}}/month?
- Projected completion date at current rate

Update /home/workspace/Persona/savings-tracker.json and show me a text-based progress bar:

[████████░░░░░░░░░░░░] 42% — \$1,260 of \$3,000

If I'm falling behind, one specific suggestion to get back on track (not "earn more" — something actionable this week).`,
    whatYouGet: `A savings goal tracker with projections and specific recommendations when you're off pace.`,
  },
  {
    id: 107,
    name: `Meal Prep From What I Have`,
    category: `Health & wellness`,
    whenToUse: `You have ingredients and need recipe ideas.`,
    prompt: `I have these ingredients: {{list what's in your fridge/pantry}}

Suggest 3 meals I can make with what I have (minimal extra purchases):
For each meal:
- Recipe name
- Ingredients needed (mark any I'd need to buy)
- Steps (keep it simple — I'm in a camper kitchen with 2 burners and a mini oven)
- Cook time
- Makes how many servings

Prioritize:
- Recipes that use up ingredients before they expire
- Meals that generate leftovers for tomorrow
- Things that are actually satisfying (not just "you could make rice and beans again")

If I'm missing a few things, tell me the smallest grocery run that unlocks the most meal options.`,
    whatYouGet: `Practical meals from ingredients you already have, minimizing waste and grocery trips.`,
  },
  {
    id: 108,
    name: `Workout Generator`,
    category: `Health & wellness`,
    whenToUse: `You want a workout but don't want to think about what to do.`,
    prompt: `Generate today's workout.

My situation:
- Equipment: {{list what you have — bodyweight only / dumbbells / resistance bands / etc.}}
- Space: {{small camper / outdoor / gym}}
- Time: {{how long}}
- Energy level: {{high / medium / low}}
- Last workout: {{what I did yesterday or when I last exercised}}
- Focus area: {{full body / upper / lower / cardio / flexibility / recovery}}

Build the workout:
- Warm-up: 3-5 minutes (specific movements, not "warm up")
- Main work: {{time}}-minute session with exercises, sets, reps, and rest
- Cool-down: 3-5 minutes of stretching

Adjust for energy level:
- High: push it
- Medium: steady effort
- Low: movement-focused, nothing crushing

Don't prescribe anything that requires equipment I don't have.`,
    whatYouGet: `A workout tailored to your energy, equipment, and available time.`,
  },
  {
    id: 109,
    name: `Sleep Optimization Suggestions`,
    category: `Health & wellness`,
    whenToUse: `Sleep has been poor and you want evidence-based suggestions.`,
    prompt: `My sleep has been {{describe — restless, too short, hard to fall asleep, waking up tired}}.

Current habits:
- Bedtime: {{when}}
- Wake time: {{when}}
- Screen time before bed: {{describe}}
- Caffeine: {{when is your last caffeine}}
- Exercise: {{when and how much}}
- Room: {{temperature, light, noise situation}}

Research current sleep science (not the same advice from every wellness blog) and give me:
- 3 specific changes to try THIS WEEK (not "get more sleep" — actual changes)
- Which of my current habits is most likely causing the problem
- One thing I probably don't know about sleep that's relevant to my situation
- Whether my epilepsy medication could be a factor (research the specific medication if I mention it)

Prioritize suggestions by impact. Start with the one change that would make the biggest difference.`,
    whatYouGet: `Evidence-based sleep optimization suggestions tailored to your specific situation.`,
  },
  {
    id: 110,
    name: `Medication Interaction Checker`,
    category: `Health & wellness`,
    whenToUse: `Before taking a new supplement, OTC medication, or when your doctor adds a prescription.`,
    prompt: `Check for interactions between {{new thing}} and my current medications: {{list current medications}}.

Research:
- Known drug interactions (search medical databases and FDA resources)
- Food interactions (anything I should avoid eating/drinking with this)
- Timing interactions (should I take them at different times?)
- Common side effects of the combination
- Whether this is relevant to my epilepsy management

IMPORTANT: I'm not asking you to replace medical advice. I want to:
1. Know what questions to ask my doctor/pharmacist
2. Understand what to watch for
3. Have a reference document for my own records

Save to /home/workspace/Persona/health/medication-notes.md

Always recommend: "Confirm this with your neurologist before starting."`,
    whatYouGet: `A research document on potential interactions, formatted as questions for your doctor.`,
  },
  {
    id: 111,
    name: `Hydration and Energy Log`,
    category: `Health & wellness`,
    whenToUse: `Daily check-in for tracking energy patterns.`,
    prompt: `Check in on my energy. Text me at {{time}}:

"Energy check: Rate 1-5. Water today? Any seizure aura or warning signs?"

When I reply:
- Log to /home/workspace/Persona/health/energy-log.json: date, time, rating, hydration, notes
- If rating is 1-2 for 3+ days in a row, flag it: "Energy has been low for [N] days. Consider: sleep, medication timing, hydration, or talking to your doctor."
- If I mention aura/warning signs, log as elevated risk and remind me to rest

Weekly summary (Sundays): average energy, best/worst days, correlation with sleep data if available.`,
    whatYouGet: `A daily energy tracking system with pattern detection and health alerts.`,
  },
  {
    id: 112,
    name: `Short Story Starter`,
    category: `Creative projects`,
    whenToUse: `You want to write fiction but need the spark.`,
    prompt: `Give me a short story starter. Not a generic prompt — a specific opening scene.

Constraints:
- Setting: {{specific or "surprise me" — but not generic fantasy/sci-fi}}
- Length of finished story: {{flash fiction 500 words / short story 2000 words / longer}}
- Mood: {{eerie / warm / tense / funny / melancholic}}

Give me:
1. The opening paragraph (already written — I continue from here)
2. The character in one sentence (not a description — a defining detail)
3. The tension (what's about to go wrong or change)
4. Three possible directions the story could go (so I can pick one)

Don't write the whole story. Write the launchpad. I take it from here.`,
    whatYouGet: `A specific, atmospheric story opening you can continue writing from.`,
  },
  {
    id: 113,
    name: `Poem Workshop`,
    category: `Creative projects`,
    whenToUse: `You wrote a poem and want feedback, or you want to write one.`,
    prompt: `{{If sharing a draft: "Workshop this poem:" + paste text}}
{{If starting fresh: "Write a poem about" + topic}}

If workshopping:
- What's working (specific lines or images that land)
- What's not working (vague language, cliché, rhythm issues)
- 3 specific revision suggestions (not "make it better" — exact line-level changes)
- The strongest line and why
- The weakest line and what would replace it
- Does the ending earn its weight? If not, 2 alternative last lines.

If writing fresh:
- Form: {{free verse / sonnet / haiku sequence / prose poem / your call}}
- Write it with specific imagery from {{my life context if relevant}}
- After writing, give me 2 alternative versions of the strongest stanza
- No greeting card language. No "golden rays of hope." Ground it.`,
    whatYouGet: `A specific poetry workshop with line-level feedback, or an original poem with alternatives.`,
  },
  {
    id: 114,
    name: `Album/Playlist Concept Generator`,
    category: `Creative projects`,
    whenToUse: `You want to curate a playlist with actual intention, not just shuffle.`,
    prompt: `Create a playlist concept for: {{mood / activity / theme}}

Find real songs (search for them) that fit:
- 10-15 tracks
- Sequenced with intention (opening, build, peak, cool down)
- Include the artist, track name, and why each song earns its spot
- Mix familiar and discoverable (not all hits, not all obscure)
- The playlist should tell a story from track 1 to the last track

Name the playlist something better than "Chill Vibes" or "Workout Mix."
Give it a one-sentence description that makes someone want to press play.

Bonus: one deep cut that most people wouldn't know but that makes the playlist special.`,
    whatYouGet: `A curated, sequenced playlist with real songs and a narrative arc.`,
  },
  {
    id: 115,
    name: `Visual Art Prompt Chain`,
    category: `Creative projects`,
    whenToUse: `You want to create a series of related AI-generated images.`,
    prompt: `Create a series of {{N}} related image prompts around the theme: {{theme}}.

Each prompt should:
- Be specific enough to generate a distinctive image (not "a beautiful sunset")
- Share a consistent visual thread with the others (same palette, style, or motif)
- Progress in some way (tell a story, shift in mood, change seasons, evolve a concept)

For each:
- The generation prompt (optimized for the image generation tool)
- What makes this one different from the others in the series
- Suggested modifications after seeing the result

Generate the first image so I can see the direction, then I'll decide if we continue.`,
    whatYouGet: `A cohesive image series concept with optimized prompts for each piece.`,
  },
  {
    id: 116,
    name: `Creative Writing Feedback`,
    category: `Creative projects`,
    whenToUse: `You've written something creative and want honest feedback before sharing.`,
    prompt: `Read this and give me honest creative feedback: {{paste text or file path}}

I want to know:
- Does the opening earn the reader's attention in the first 3 sentences?
- Where did your attention wander? (Those are the parts to cut or rewrite)
- Is there a place where I'm TELLING instead of SHOWING?
- What's the strongest passage and why?
- What's the weakest passage and why?
- If this were published, what would the best criticism be?
- One specific revision that would improve the whole piece

Don't praise it generically. Don't soften criticism. I can't improve from "this is really good!"`,
    whatYouGet: `Honest creative feedback that identifies specific weaknesses and strengths.`,
  },
  {
    id: 117,
    name: `Worldbuilding Helper`,
    category: `Creative projects`,
    whenToUse: `Building a fictional world for a story, game, or creative project.`,
    prompt: `Help me build a world for {{type: short story / novel / game / RPG campaign}}.

Starting seed: {{describe the core idea or setting}}

Build out:
- Geography: what does this place look like? (Be specific — not "mountains and rivers" but what KIND and how they shape life there)
- Society: how do people organize themselves? What do they value? What do they fear?
- Economy: what do people trade? What's scarce? What's abundant?
- Conflict: what tension exists? (Internal and external)
- The detail that makes it real: one tiny specific thing that makes this world feel lived-in, not designed

Don't over-build. Give me enough to write in, not a Wikipedia article. I should be able to add a character to this world and immediately know what problems they face.`,
    whatYouGet: `A world sketch with enough detail to write in, focused on what creates story.`,
  },
  {
    id: 118,
    name: `Travel Planning Deep Dive`,
    category: `Home & life admin`,
    whenToUse: `Planning a trip and want to get it organized.`,
    prompt: `Plan a trip to {{destination}} for {{dates}} with a budget of {{budget}}.

I need:
- Transportation: best options from Salmon, Idaho (it's remote — usually requires driving to Boise or Missoula for flights)
- Accommodation: 3 options at different price points with links
- Must-do activities: 5 things I shouldn't miss (not tourist traps — real highlights)
- Food: 3-5 restaurant recommendations (local favorites, not chains)
- Budget breakdown: transport, accommodation, food, activities — does it fit?
- Packing note: weather forecast for those dates and what to bring

Save the itinerary to /home/workspace/Persona/travel/{{destination}}-{{date}}.md

Include a daily schedule suggestion but keep it flexible — I don't want a minute-by-minute plan.`,
    whatYouGet: `A complete trip plan with budget breakdown, tailored to your remote Idaho starting point.`,
  },
  {
    id: 119,
    name: `Moving Checklist`,
    category: `Home & life admin`,
    whenToUse: `You're moving (or considering a move) and need to track everything.`,
    prompt: `Generate a moving checklist for {{situation: moving to a new spot / upgrading camper / relocating to a new town}}.

Timeline: {{when}}

Organize by:
- 4 weeks out: [research, notifications, prep]
- 2 weeks out: [logistics, packing, utilities]
- 1 week out: [final prep]
- Moving day: [checklist]
- First week after: [setup, registration, address changes]

Include:
- Address change notifications (USPS, banks, subscriptions, insurance, medical providers)
- Utility setup/cancellation
- Vehicle/license considerations if changing states
- Pet considerations (vet records, new local vet, adjustment)
- Digital updates (update all online profiles and shipping addresses)

Save as an interactive checklist at /home/workspace/Persona/moving-checklist.md`,
    whatYouGet: `A comprehensive, timeline-based moving checklist customized to your situation.`,
  },
  {
    id: 120,
    name: `Camper/RV Repair Diagnostic`,
    category: `Home & life admin`,
    whenToUse: `Something's wrong with your camper and you're trying to diagnose it.`,
    prompt: `Help me diagnose this camper issue: {{describe the problem — leak, noise, not working, etc.}}

My camper: {{year, make, model if known}}
What I've observed: {{symptoms, when it started, conditions}}

Research:
- Common causes for this symptom in RVs/campers
- Diagnostic steps I can do myself (in order of likelihood)
- What tools I'll need
- YouTube tutorials specifically for this type of repair (search and link the best one)
- Estimated cost: DIY vs professional repair
- Whether this is safe to DIY or should be done by a pro

If multiple possible causes, rank them by probability and give me a decision tree:
"Check X first. If that's fine, then check Y. If Y is the issue, here's the fix..."`,
    whatYouGet: `A diagnostic guide for your specific camper issue with repair tutorials and cost estimates.`,
  },
  {
    id: 121,
    name: `Gift Idea Generator`,
    category: `Home & life admin`,
    whenToUse: `You need a gift for someone and are drawing a blank.`,
    prompt: `I need a gift for {{who — relationship}} for {{occasion}}.

About them: {{interests, hobbies, what they're into, what they already have}}
Budget: \${{amount}}
Constraints: {{shipping to rural area / needs to be digital / needs to arrive by date}}

Give me 5 genuinely good ideas:
For each:
- What it is (specific product or experience, not a category)
- Where to buy it (with a link or search term)
- Why it's good for THIS person specifically (not "everyone likes candles")
- Price
- The one they'd never expect but would love (mark it)

Avoid: generic gift cards, anything that requires a subscription they'll forget about, anything that's more about the giver's taste than the receiver's.`,
    whatYouGet: `Five specific, thoughtful gift ideas for a specific person, with purchase links.`,
  },
  {
    id: 122,
    name: `Home Repair Research`,
    category: `Home & life admin`,
    whenToUse: `Something needs fixing and you want to know how before calling someone.`,
    prompt: `How do I fix {{the problem}}?

My skill level: {{handy / can follow instructions / complete beginner}}
Tools I have: {{list or "basic toolkit"}}

Give me:
1. Is this a DIY job or should I call someone? (honest assessment)
2. If DIY:
   - Step-by-step instructions (with photos or video links from web search)
   - Materials needed with estimated costs
   - Common mistakes to avoid
   - How long it should take
   - Safety warnings if applicable
3. If professional:
   - What type of professional to call
   - Questions to ask when getting quotes
   - Rough cost range in my area (search for local rates)
   - How to tell if someone is trying to overcharge me`,
    whatYouGet: `An honest assessment of DIY vs professional, with instructions or hiring guidance.`,
  },
  {
    id: 123,
    name: `Best Price Finder`,
    category: `Home & life admin`,
    whenToUse: `Making a purchase and want to make sure you're getting the best deal.`,
    prompt: `Find the best price for {{product — be specific with model/brand}}.

Search:
- Major retailers (Amazon, Walmart, Best Buy, etc.)
- Manufacturer's site
- Refurbished/open-box options
- Any active coupons or promo codes

For each option found:
- Price (including shipping)
- Seller reputation/reliability
- Return policy
- Estimated delivery to Salmon, Idaho (rural delivery can be tricky)

Also check: is this product frequently on sale? Should I wait for {{upcoming sale event}}?

Give me the best deal with a direct recommendation: "Buy from [X] for \$[Y] because [reason]."`,
    whatYouGet: `A price comparison with rural delivery considerations and timing advice.`,
  },
  {
    id: 124,
    name: `Weekly Meal Prep List`,
    category: `Health & wellness`,
    whenToUse: `Sunday, planning the week's food.`,
    prompt: `Plan {{N}} batch meals for the week.

Constraints:
- Budget: \${{amount}} for the week
- Kitchen: camper kitchen (2-burner stove, mini oven, limited counter space)
- Storage: small fridge, no chest freezer
- Preference: {{any dietary preferences or restrictions}}
- Leftovers goal: each batch meal should provide 2-3 servings

For each meal:
- Recipe with full ingredients and steps
- Prep time + cook time
- Per-serving cost
- How to store leftovers

Generate a combined shopping list organized by grocery store section.
Estimate the total grocery cost.

Save meal plan and shopping list to /home/workspace/Persona/meal-plans/week-of-{{date}}.md
Text me just the shopping list for the store.`,
    whatYouGet: `A complete meal prep plan optimized for camper living, with a shopping list texted to your phone.`,
  },
  {
    id: 125,
    name: `Resume Refresh`,
    category: `Career & professional`,
    whenToUse: `Your resume needs updating, or you're applying for something specific.`,
    prompt: `Update my resume. Current version: {{file path or paste}}

Changes since last update:
- New projects: {{list}}
- New skills: {{list}}
- New accomplishments: {{list}}

Also:
- Read recent job listings in my target area (search for "full stack developer" or "web developer" roles)
- Identify which of my experiences and skills match what employers are asking for
- Rewrite bullet points to emphasize outcomes over activities ("Increased X by Y%" not "Responsible for X")
- Trim anything older than 3 years unless it's especially relevant
- Check for formatting consistency

If my resume is over 1 page, cut it to 1 page. Be ruthless about what stays.

Save updated version to /home/workspace/Business/resume-{{date}}.md`,
    whatYouGet: `An updated, outcome-focused resume trimmed to what matters for current job market demands.`,
  },
  {
    id: 126,
    name: `Interview Prep Kit`,
    category: `Career & professional`,
    whenToUse: `You have an interview coming up and need to prepare.`,
    prompt: `Prepare me for an interview at {{company}} for {{role}}.

Job listing: {{URL or paste}}

Research:
1. Company overview (what they do, recent news, company culture signals)
2. The interviewer (if I know their name: {{name}} — find their background)
3. Common interview questions for this type of role (not generic — specific to the tech and seniority level)

Prep:
- 5 likely technical questions with my best answers (using my actual experience)
- 3 behavioral questions with STAR-format answer outlines
- 5 questions I should ask THEM (that show I've done my homework)
- My "tell me about yourself" — 60-second version that connects my story to this role
- The question I'm dreading and how to handle it honestly

Save prep sheet to /home/workspace/Business/interview-prep/{{company}}-{{date}}.md`,
    whatYouGet: `A comprehensive interview prep kit with researched questions and practiced answers.`,
  },
  {
    id: 127,
    name: `Networking Event Prep`,
    category: `Career & professional`,
    whenToUse: `Before attending any professional event, meetup, or conference.`,
    prompt: `I'm attending {{event name/type}} on {{date}}.

Prepare me:
1. If the event has a website or speaker list, research the attendees/speakers I should try to meet
2. My elevator pitch for this context (30 seconds: who I am, what I do, what I'm looking for)
3. 5 conversation starters specific to this event/industry
4. What to bring (business cards? Portfolio on phone? Laptop?)
5. Follow-up template: a message I can customize and send within 24 hours

Research: what are the hot topics in {{industry}} right now? What should I be ready to discuss?

Save prep to /home/workspace/Business/events/{{event-name}}-prep.md`,
    whatYouGet: `Event-specific prep with conversation starters and a follow-up template.`,
  },
  {
    id: 128,
    name: `Freelance Rate Calculator`,
    category: `Career & professional`,
    whenToUse: `Setting or updating your freelance rates.`,
    prompt: `Help me set my freelance rates.

My expenses:
- Monthly costs: \${{amount}} (or check my budget files)
- Desired annual income: \${{amount}}
- Hours I want to work per week: {{hours}}
- Vacation weeks per year: {{weeks}}

Calculate:
- Minimum hourly rate to cover expenses
- Target hourly rate for desired income
- Market comparison (search for freelance web developer rates in 2026)
- How my rate compares to market (percentile)
- Project-based pricing guide (what to charge for common projects: landing page, full site, web app)

Also:
- When to charge hourly vs project-based
- How to justify my rate to clients who push back
- When to walk away (the price below which it's not worth my time)`,
    whatYouGet: `Data-driven rate recommendations with market comparisons and client negotiation guidance.`,
  },
  {
    id: 129,
    name: `Skill Gap Closer`,
    category: `Career & professional`,
    whenToUse: `You identified a skill you're missing and want a fast learning plan.`,
    prompt: `I need to learn {{skill}} to a functional level within {{timeframe}}.

My current related knowledge: {{what I already know that's adjacent}}
How I'll use this skill: {{the specific context or project}}

Create a fast-track learning plan:
- Day 1: The minimum theory I need (concepts only, no history)
- Day 2-3: Hands-on tutorial (a specific project that teaches the core)
- Day 4-5: Build something real with it (connected to my actual work)
- Day 6-7: Fill gaps and edge cases

For each day: specific resources (ONE each — not a reading list), expected output, and a self-test.

What to skip: {{aspects of this skill I DON'T need for my use case}}

The goal isn't mastery. It's "can I use this competently in my work within a week?"`,
    whatYouGet: `A 7-day fast-track learning plan focused on functional competency, not comprehensive mastery.`,
  },
  {
    id: 130,
    name: `Salary/Contract Negotiation Prep`,
    category: `Career & professional`,
    whenToUse: `Negotiating a contract rate, salary, or project price.`,
    prompt: `I'm negotiating {{what: contract rate / project price / salary}} with {{who}}.

Their offer: \${{amount}}
My target: \${{amount}}
My minimum: \${{amount}}
My leverage: {{what makes me valuable to them specifically}}
My alternatives: {{what I'll do if this falls through}}

Research market rates for {{the role/project type}} and prepare:
- Am I in the right range? (with data)
- My opening counter and the justification
- 3 non-monetary items I can negotiate (timeline, scope, equity, flexibility, etc.)
- Scripts for the hardest moments:
  - "Your rate is too high" → my response
  - "We can't go above X" → my response
  - "Can you do it for less?" → my response

Help me walk in confident, not desperate.`,
    whatYouGet: `A negotiation prep sheet with market data, scripts for difficult moments, and non-monetary leverage options.`,
  },
  {
    id: 131,
    name: `Side Project Evaluator`,
    category: `Finance & money`,
    whenToUse: `Deciding whether a side project is worth the time investment.`,
    prompt: `Evaluate this side project idea: {{description}}

Calculate the economics:
- Estimated build time: {{hours}}
- My hourly rate: {{or check from my records}}
- Opportunity cost of that time: \${{rate × hours}}
- Revenue potential: research similar products/services and estimate
- Time to break even
- Monthly passive income potential after launch

Also assess:
- Does this build toward my \$500/mo passive income goal?
- Does this build skills or reputation that have value beyond the project itself?
- Is there a smaller version I could test first (spend 20% of the time to validate 80% of the idea)?

Score: 🟢 Build it / 🟡 Test it smaller first / 🔴 Pass (and why)`,
    whatYouGet: `An honest financial evaluation of whether a side project is worth your time.`,
  },
  {
    id: 132,
    name: `Micro-Meditation Generator`,
    category: `Health & wellness`,
    whenToUse: `You need a mental reset but only have 5 minutes.`,
    prompt: `Guide me through a 5-minute reset. NOT a meditation app script. Something grounded.

Options (pick based on what I need):
- "Overwhelmed": sensory grounding exercise (5 things I see, 4 things I hear...)
- "Stuck on a problem": perspective shift (zoom out on the problem)
- "Low energy": physical activation (movements I can do at my desk/in my camper)
- "Anxious": breathing pattern with specific counts
- "Scattered": priority clarity exercise (1 question to answer to refocus)

I need: {{pick one or say "you decide based on what I've been doing today"}}

Keep it practical. No windchimes. No "imagine a golden light." Just useful.`,
    whatYouGet: `A practical 5-minute mental reset exercise matched to your current state.`,
  },
  {
    id: 133,
    name: `Weekly Grocery Budget Tracker`,
    category: `Finance & money`,
    whenToUse: `Tracking grocery spending against your budget.`,
    prompt: `I spent \${{amount}} on groceries this week at {{store}}.

Update my grocery tracker at /home/workspace/Persona/grocery-tracker.json:
- Add this week's spend
- Calculate monthly total so far
- Compare to budget (\${{monthly budget}}/month)
- 4-week rolling average
- Am I over or under budget this month?

If over budget: identify the likely cause (eating out vs cooking, premium items vs basics, unexpected needs)
If under budget: note the surplus for potential savings or treat

Text me a one-line summary: "Groceries: \$X this week. \$X/\$X for the month. [On track / Watch it / Nice savings]"`,
    whatYouGet: `Running grocery budget tracking with a weekly text summary.`,
  },
  {
    id: 134,
    name: `Local Service Finder`,
    category: `Home & life admin`,
    whenToUse: `You need to find a reliable local service provider.`,
    prompt: `Find a {{type of service: plumber / electrician / mechanic / vet / dentist / etc.}} near Salmon, Idaho.

Search for:
- Local providers within 30-minute drive
- Google Maps ratings and reviews
- Whether they serve rural areas
- Price estimates for {{what I need done}}
- Phone number and hours

If nothing good is local, check Challis, Leadore, and as far as Missoula or Idaho Falls.

Rank the options:
1. [Name] — [rating] — [distance] — [price estimate] — [phone]
   Best review: "[quote]"
   Worst review: "[quote]"

Recommend: "Call [X] first because [reason]."`,
    whatYouGet: `A ranked list of local service providers with reviews and recommendations.`,
  },
  {
    id: 135,
    name: `Career Path Mapper`,
    category: `Career & professional`,
    whenToUse: `Thinking about where your career is heading and what options you have.`,
    prompt: `Map my career options based on my current skills and situation.

My skills: React, TypeScript, Next.js, Tailwind, Supabase, Python, AI tools, web design
My experience: self-taught, freelance web design, AI-assisted development
My location: Rural Idaho (remote work required)
My constraints: {{any — health, financial, personal}}
My goal: \$500/mo passive income, growing from there

Research and map 5 realistic career paths:
For each path:
- What it looks like in 1 year, 3 years, 5 years
- Income potential range (research actual salary/revenue data)
- Skills I already have that apply
- Skills I'd need to develop
- How to get started THIS MONTH
- Risk level (1-5)
- Examples of people who've done this successfully (find them)

Which path has the best risk-adjusted return on my time?`,
    whatYouGet: `A realistic career map with 5 paths, grounded in market data and your specific constraints.`,
  },
  {
    id: 136,
    name: `Dog Training Research`,
    category: `Home & life admin`,
    whenToUse: `Working on training with Lucky or any pet.`,
    prompt: `I want to train Lucky (border collie) to {{behavior or trick}}.

Research current positive-reinforcement training methods:
- Step-by-step training plan
- Expected timeline (border collies learn fast — be specific)
- Common mistakes that set back progress
- Best video tutorial for this specific behavior (find and link)
- Whether this is easy/medium/hard for border collies specifically
- How to handle regression (what to do when it seems like they forgot)

Border collie-specific notes:
- Are they prone to overthinking this (common breed trait)?
- How to keep it fun and not just drills (they get bored)
- Mental stimulation ideas that reinforce this training

Keep it practical. I'm training in and around a camper, not a facility.`,
    whatYouGet: `A breed-specific training plan with video resources and camper-living adaptations.`,
  },
  {
    id: 137,
    name: `Letter Writer`,
    category: `Writing & content`,
    whenToUse: `You need to write a formal or semi-formal letter.`,
    prompt: `Write a {{type: thank you / complaint / request / recommendation / cover / personal}} letter to {{who}} about {{what}}.

Context: {{the situation}}
Tone: {{formal / warm / firm / grateful}}
Length: {{short / medium / detailed}}

The letter should:
- Open with the purpose (not a paragraph of pleasantries)
- Be specific about {{the key point}}
- Close with a clear next step or sentiment
- Sound like me, not a letter-writing template

If this is a complaint or request, include:
- What I want them to do specifically
- A deadline if applicable
- What I'll do if they don't respond (stated professionally)`,
    whatYouGet: `A well-crafted letter matching the appropriate tone for the context.`,
  },
  {
    id: 138,
    name: `Freelance Client Red Flag Checker`,
    category: `Career & professional`,
    whenToUse: `A potential client has reached out and you want to assess them.`,
    prompt: `Evaluate this potential client: {{name / company / describe the inquiry}}

Their message: {{paste their email or describe the outreach}}
What they want: {{project description}}
Budget they mentioned: {{if any}}

Research:
1. Find their website, social presence, and any reviews about working with them
2. Check for warning signs in their communication:
   - Vague scope with fixed budget?
   - "Quick project" that sounds complex?
   - Wants spec work or "test project" for free?
   - Unrealistic timeline?
   - Previous freelancers mentioned negatively?

Assessment:
- Client quality score: [1-10]
- Red flags found: [list]
- Green flags found: [list]
- Recommended rate for this type of work: \$[X]
- Whether to proceed: 🟢 Take it / 🟡 Proceed with caution (negotiate X first) / 🔴 Walk away

If 🟡 or 🔴: what specific terms should I require to protect myself?`,
    whatYouGet: `A client assessment with red flag detection and protective terms to require.`,
  },
  {
    id: 139,
    name: `Emergency Fund Calculator`,
    category: `Finance & money`,
    whenToUse: `Planning or checking on your financial safety net.`,
    prompt: `Calculate my ideal emergency fund:

Monthly expenses: {{check my budget files or estimate}}
Income stability: {{freelance — variable}}
Health considerations: {{epilepsy, medication costs}}
Location risk: {{rural area — limited job market}}

Calculate:
- Minimum emergency fund (3 months expenses)
- Recommended emergency fund (6 months — given freelance + health)
- Current status: {{what I have saved vs. target}}
- Monthly savings needed to reach target by {{date}}
- Priority: emergency fund vs paying off debt vs investing

If my fund is below minimum: specific steps to build it up fastest.`,
    whatYouGet: `A personalized emergency fund target with a savings plan.`,
  },
  {
    id: 140,
    name: `Plant/Garden Planner`,
    category: `Home & life admin`,
    whenToUse: `Planning a garden or caring for plants (even container gardens work in a camper setup).`,
    prompt: `Help me plan a {{type: container / raised bed / windowsill}} garden for {{Salmon, Idaho}}.

Zone: {{look up USDA hardiness zone for Salmon, ID}}
Space: {{describe available space}}
Goal: {{fresh herbs / vegetables / flowers / all of the above}}
Experience: {{beginner / some experience / experienced}}

Plan:
- What to plant now (based on current date and zone)
- Planting calendar for the next 6 months
- Container sizes needed for each plant
- Watering schedule (considering Idaho's dry climate)
- Best plants for high altitude + short growing season
- Estimated total cost for setup

For each recommended plant:
- Why it works here
- Specific variety (not just "tomatoes" — which variety for my zone)
- Expected harvest timeline
- Difficulty level

Save to /home/workspace/Persona/garden-plan.md`,
    whatYouGet: `A zone-specific garden plan for your exact location and growing conditions.`,
  },
  {
    id: 141,
    name: `Insurance Review`,
    category: `Finance & money`,
    whenToUse: `Annually, or when your situation changes.`,
    prompt: `Help me review my insurance situation:

Current coverage: {{list what you have — health, vehicle, renter's, liability, etc.}}
Monthly premiums: {{if known}}
Situation: {{self-employed, living in camper, epileptic, one vehicle}}

Research:
- Am I under-insured anywhere? (What gaps could hurt me?)
- Am I over-insured anywhere? (What am I paying for that I don't need?)
- Are there cheaper options for equivalent coverage? (search current rates)
- Self-employment-specific insurance I might be missing (professional liability, E&O)
- Idaho-specific insurance requirements

For each recommendation:
- What to change
- Estimated cost savings or additional cost
- Why it matters (the scenario where I'd be glad I had it)`,
    whatYouGet: `An insurance audit with specific recommendations for your coverage gaps and overpayment.`,
  },
  {
    id: 142,
    name: `Habit Tracker Setup`,
    category: `Health & wellness`,
    whenToUse: `You want to build new habits and track them consistently.`,
    prompt: `Set up a habit tracker for these habits: {{list habits you want to build}}

For each habit:
- Minimum viable version (the absolute smallest action that counts)
- Time of day it fits best (based on my schedule and energy patterns)
- Cue: what triggers this habit (after X, before Y, when Z happens)
- Streak tracking setup in /home/workspace/Persona/habits.json

Create a daily check-in automation prompt that:
- Texts me at {{time}} asking about each habit (yes/no format)
- Updates the tracker when I reply
- Shows streak count for each habit
- Only sends encouragement after 7-day streaks (not daily cheerleading)
- Flags if a habit drops below 50% completion over 2 weeks (might need redesign)`,
    whatYouGet: `A complete habit tracking system with automated check-ins and streak tracking.`,
  },
  {
    id: 143,
    name: `Personal FAQ Builder`,
    category: `Career & professional`,
    whenToUse: `You get asked the same questions by clients, collaborators, or followers.`,
    prompt: `Build a personal FAQ based on questions I probably get asked a lot.

Who asks: {{clients / followers / potential employers / networking contacts}}

Research my profiles and work to generate realistic FAQs about:
- What I do and how I work
- Pricing and availability
- My tech stack and capabilities
- My location and timezone
- Working with a remote/rural developer
- My background and experience

For each FAQ:
- The question (phrased how a real person would ask it)
- The answer (conversational, honest, useful — not corporate-speak)

Also create a zo.space page version at /faq (public) that clients can reference.

Save the raw FAQ to /home/workspace/Business/faq.md`,
    whatYouGet: `A personal FAQ you can reference and share, plus a public page version.`,
  },
  {
    id: 144,
    name: `Weekly Wins Journaling Prompt`,
    category: `Creative projects`,
    whenToUse: `End of week, wanting to acknowledge progress without being cheesy.`,
    prompt: `Help me write my weekly wins entry based on actual evidence.

Check my workspace for this week's activity:
- Git commits
- Files created/modified
- Journal entries
- Revenue data
- Any shipped or published work

Write a journal entry that:
- States what I actually accomplished (specific, evidence-based)
- Notes one thing that was harder than expected and why
- Names one thing I did well this week that I tend to undervalue
- Ends with the one thing I'm most looking forward to next week

Save to this week's journal entry. Keep it honest — not a highlight reel, not a pity party.`,
    whatYouGet: `A weekly wins journal entry grounded in evidence, not feelings.`,
  },
  {
    id: 145,
    name: `Legal Document Explainer`,
    category: `Home & life admin`,
    whenToUse: `You received a legal document (lease, contract, terms, notice) and need to understand it.`,
    prompt: `Explain this document in plain English: {{paste or point to file}}

I need to understand:
- What this document IS (type and purpose)
- What I'm agreeing to (in simple terms)
- My obligations (what I have to do)
- Their obligations (what they have to do)
- Important dates and deadlines
- Penalties or consequences if something goes wrong
- Things I should negotiate or push back on
- Whether this is standard or has unusual clauses

Highlight anything that seems unusual for this type of document.

NOTE: I know this isn't legal advice. I want to understand what I'm looking at before deciding if I need a lawyer.`,
    whatYouGet: `A plain-English translation of any legal document, with flags for unusual terms.`,
  },
  {
    id: 146,
    name: `Morning Routine Optimizer`,
    category: `Health & wellness`,
    whenToUse: `Your mornings feel chaotic and you want a better flow.`,
    prompt: `Redesign my morning routine.

Current routine: {{describe or "I don't really have one"}}
Wake time: {{when}}
Must happen every morning: {{medication, pet care, etc.}}
Morning energy: {{how I feel when I wake up}}
What I wish I did but don't: {{exercise, journaling, reading, etc.}}
Time before I need to start work: {{how long}}

Design a routine that:
- Is realistic for a camper lifestyle (limited space, limited water pressure, etc.)
- Accounts for medication timing (if relevant)
- Includes Lucky's needs (walk, feed)
- Builds in the most important thing I'm neglecting
- Has a "minimum viable morning" version for low-energy days
- Takes no more than {{time}} total

Present two versions:
1. Full routine (good days)
2. Minimum viable (rough days — just the non-negotiables)`,
    whatYouGet: `Two morning routines — full and minimum — designed for camper life and your energy patterns.`,
  },
  {
    id: 147,
    name: `Annual Review Template`,
    category: `Career & professional`,
    whenToUse: `End of year or major milestone, reflecting on professional growth.`,
    prompt: `Guide me through my annual professional review.

Gather data:
- Projects completed this year (check workspace)
- Revenue earned (check tracking files)
- Skills learned (compare current abilities to a year ago)
- Professional network growth
- Content published
- Goals from last year's review (if exists at /home/workspace/Records/annual-review/)

Structure:
1. The Year in One Sentence
2. Biggest professional win
3. Biggest professional failure (and what I learned)
4. Skills I gained
5. Skills I still need
6. Revenue: target vs actual
7. What I'd tell January-me
8. Goals for next year (3 maximum — specific and measurable)
9. The one thing that would change everything if I achieved it next year

Save to /home/workspace/Records/annual-review/{{year}}.md`,
    whatYouGet: `A guided annual professional review with data-driven reflection.`,
  },
  {
    id: 148,
    name: `Energy Audit (Physical Space)`,
    category: `Home & life admin`,
    whenToUse: `Your utility bills are high or you want to optimize your camper's energy use.`,
    prompt: `Help me audit and reduce energy costs in my camper.

Setup: {{describe — propane? Electric hookup? Solar? Generator? Combo?}}
Monthly energy cost: \${{estimate}}
Climate: Idaho — cold winters, warm summers, dry

Research:
- Most energy-efficient heating options for RVs/campers in cold climates
- Insulation upgrades that make the biggest difference
- Solar setup feasibility and ROI for my situation
- LED lighting upgrades
- Energy monitoring options
- Winter-specific tips (skirt the camper, pipe heating, etc.)

For each recommendation:
- Cost to implement
- Estimated monthly savings
- Payback period
- DIY vs professional installation

Prioritize by ROI: what saves the most for the least upfront cost?`,
    whatYouGet: `An energy audit with prioritized improvements ranked by return on investment.`,
  },
  {
    id: 149,
    name: `Phone Call Prep`,
    category: `Home & life admin`,
    whenToUse: `You need to make a call you've been putting off (customer service, doctor, insurance, etc.)`,
    prompt: `I need to call {{who}} about {{what}}.

Prepare me:
- The phone number (search for it)
- Best time to call (to minimize hold times)
- What information I'll need ready before calling (account numbers, dates, documents)
- Exactly what to say when they answer: "Hi, I'm calling about [X]. My [identifier] is [Y]. I need [Z]."
- If I get transferred or put on hold, what to ask each time: "Can you confirm this is the right department for [X]?"
- If they can't help: what to ask for as escalation
- The specific outcome I want from this call (so I know when I'm done)

This prep should take the stress out of the call by making it a checklist, not an improvisation.`,
    whatYouGet: `Complete phone call prep with scripts, information to have ready, and a clear desired outcome.`,
  },
  {
    id: 150,
    name: `Seasonal Life Checklist`,
    category: `Home & life admin`,
    whenToUse: `Start of each season, to handle maintenance and planning.`,
    prompt: `Generate my {{season: spring / summer / fall / winter}} checklist for life in a camper in Salmon, Idaho.

Cover:
- Camper maintenance (season-specific: winterization, de-winterization, AC prep, etc.)
- Pet care (Lucky — seasonal needs like flea treatment timing, activity level changes)
- Health (seasonal medication adjustments? Seasonal affect? Vitamin D in winter?)
- Financial (any seasonal expenses to budget for)
- Home (seasonal clothing swap, storage optimization)
- Outdoor activities (what's available this season locally)
- Emergency prep (severe weather, power outages, road closures)

For each item:
- What to do
- When to do it (specific date or trigger, not "early spring")
- Estimated cost if any
- Priority: must-do vs nice-to-do

Save to /home/workspace/Persona/seasonal/{{season}}-{{year}}.md`,
    whatYouGet: `A comprehensive seasonal checklist tailored to camper life in Idaho.`,
  },
  {
    id: 151,
    name: `Gmail Inbox Autopilot Rules`,
    category: `Integration-specific`,
    whenToUse: `You want to set up smart email handling rules based on patterns in your inbox.`,
    prompt: `Analyze my Gmail inbox for the past 30 days. Identify patterns:
- Senders I always read immediately
- Senders I always ignore or archive
- Types of emails I deal with the same way every time (e.g., shipping notifications, payment receipts)
- Emails I reply to within an hour vs. ones that sit for days

Based on these patterns, suggest:
- Gmail filters to auto-label or archive predictable emails
- A "VIP list" of senders whose emails should always be surfaced
- An automation recipe: what I could handle with a scheduled agent instead of manually

Create the Gmail filters (save as drafts in Gmail settings) and save the analysis to /home/workspace/Records/email-patterns.md`,
    whatYouGet: `Data-driven email management rules based on your actual behavior, not generic inbox-zero advice.`,
  },
  {
    id: 152,
    name: `Calendar Time Audit`,
    category: `Integration-specific`,
    whenToUse: `Monthly, to understand where your time actually goes.`,
    prompt: `Audit my Google Calendar for the past 30 days.

Calculate:
- Total hours in meetings/events
- Breakdown by category (if I use color coding or keywords in event titles)
- Average meeting length
- Busiest day of the week
- Longest uninterrupted block each week
- Ratio of productive time vs meeting time
- Any recurring meetings that could be emails

Present as:
## Time Audit — [month]
| Category | Hours | % of Work Time |
|----------|-------|---------------|
...

**Insight:** Where am I spending time that doesn't align with my goals?
**Quick win:** The one calendar change that would free the most productive time.

Save to /home/workspace/Records/time-audits/[month].md`,
    whatYouGet: `A data-driven view of where your time actually goes, with recommendations to reclaim it.`,
  },
  {
    id: 153,
    name: `Google Drive Power Organize`,
    category: `Integration-specific`,
    whenToUse: `Your Drive is messy and you need a system.`,
    prompt: `Organize my Google Drive. List the contents, then:

1. Identify files without proper folder homes (in root or "Untitled" folders)
2. Find the most-accessed files and make sure they're easy to reach
3. Suggest a folder structure that makes sense for my work:
   - Client files (by client name)
   - Templates (proposals, contracts, invoices)
   - Assets (images, brand files)
   - Archive (old/completed projects)

For each misplaced file: where it should go and why.

Don't move anything — give me the plan. I'll approve the moves.

Also: are there files I'm storing in Drive that should be in my Zo workspace instead? (Code, markdown, anything I'd work on directly)`,
    whatYouGet: `A Drive organization plan with specific file moves recommended.`,
  },
  {
    id: 154,
    name: `Linear Project Bootstrapper`,
    category: `Integration-specific`,
    whenToUse: `Starting a new project and want it set up in Linear properly.`,
    prompt: `Set up a new Linear project for: {{project name and description}}

Create:
- A project with appropriate description
- Initial issues broken down from this scope: {{describe the work}}
- Labels: feature, bug, design, infrastructure, documentation
- Priority assignments based on dependencies (what blocks what)
- A milestone for the first shippable version

Each issue should have:
- Clear title (action-oriented: "Build X" not "X")
- Description with acceptance criteria
- Priority (urgent/high/medium/low)
- Estimated complexity (small/medium/large)

Don't create more than 15 issues — if the project is bigger, create epics and detail only the first phase.`,
    whatYouGet: `A project bootstrapped in Linear with prioritized, well-described issues.`,
  },
  {
    id: 155,
    name: `Notion Dashboard Builder`,
    category: `Integration-specific`,
    whenToUse: `Setting up or restructuring your Notion workspace.`,
    prompt: `Build a Notion dashboard for {{purpose: personal CRM / project management / content calendar / life OS}}.

Design:
- What databases to create (with properties/columns)
- Views for each database (table, board, calendar, gallery — pick what fits)
- Relations between databases (how they connect)
- The dashboard page layout (what to show at a glance)

Create it in my Notion workspace:
- Set up the databases with the designed properties
- Create the views
- Build the dashboard page with linked database views
- Add a few example entries so it's not empty

Keep it minimal — I can add complexity later. The goal is a system I'll actually use, not a Notion showpiece.`,
    whatYouGet: `A functional Notion system built and populated in your workspace.`,
  },
  {
    id: 156,
    name: `Spotify Discovery Pipeline`,
    category: `Integration-specific`,
    whenToUse: `You want to find new music systematically, not randomly.`,
    prompt: `Build a music discovery pipeline from my Spotify data.

1. Check my top artists and tracks (short-term and long-term)
2. Identify the genres and characteristics of what I listen to most
3. Search for artists similar to my top 5 but that I haven't listened to yet
4. Find 10 tracks that match my taste profile but from artists I don't follow
5. Check if any of my favorite artists have released new music this month

Compile a discovery playlist concept:
- 15 tracks mixing familiar favorites with new discoveries
- Each new discovery: why it matches my taste (specific musical connection, not just "similar vibes")
- Any upcoming concerts or events for discovered artists near Idaho

Save recommendations to /home/workspace/Persona/music/discoveries/[date].md`,
    whatYouGet: `A personalized music discovery report based on your actual listening patterns.`,
  },
  {
    id: 157,
    name: `Create a Scheduled Agent`,
    category: `Automation setup`,
    whenToUse: `You want to set up a recurring automation.`,
    prompt: `Set up a scheduled automation for me:

What it should do: {{describe the task}}
How often: {{daily / weekly / specific schedule}}
When: {{time of day, day of week}}
Delivery: {{SMS / email / file / zo.space update / Telegram}}

Create the agent with:
- A clear, specific prompt (not vague — the agent needs to know exactly what to do)
- The correct cron schedule (in my timezone)
- Appropriate tools listed
- A test run to verify it works

After creating, run it once to test and show me the output. If it's not right, adjust before saving.

Save the agent configuration details to /home/workspace/Records/automations/[name].md for my reference.`,
    whatYouGet: `A working scheduled agent, tested and documented.`,
  },
  {
    id: 158,
    name: `Automation Chain Builder`,
    category: `Automation setup`,
    whenToUse: `You want multiple automations that work together as a system.`,
    prompt: `Design an automation system for: {{describe the workflow}}

Map out:
- Each agent needed (what it does, when it runs)
- How data flows between them (which files or APIs connect them)
- Dependencies (which agents must run before others)
- Error handling (what happens if one agent in the chain fails)

Create a visual diagram of the system using D2.

Then build each agent one at a time:
1. Create the agent with appropriate schedule and prompt
2. Test it
3. Verify the handoff to the next agent in the chain
4. Document the full system

Save system documentation to /home/workspace/Records/automations/systems/[name].md`,
    whatYouGet: `A multi-agent automation system with tested handoffs and documentation.`,
  },
  {
    id: 159,
    name: `Agent Prompt Optimizer`,
    category: `Automation setup`,
    whenToUse: `An existing automation isn't producing good results and needs tuning.`,
    prompt: `This automation isn't working well: {{describe the agent or paste its prompt}}

Problems: {{what's wrong with the output — too vague, wrong format, missing info, etc.}}

Diagnose:
1. Read the current agent's prompt
2. Check its recent outputs (from logs or files)
3. Identify what's causing poor results:
   - Prompt too vague? (add specificity)
   - Wrong tools specified? (check available tools)
   - Output format unclear? (add explicit format instructions)
   - Context missing? (add relevant file paths or context)

Rewrite the prompt with fixes. Show me the before/after diff.
Test the new prompt and compare outputs.

Update the agent with the improved prompt.`,
    whatYouGet: `A diagnosed and optimized automation prompt with before/after comparison.`,
  },
  {
    id: 160,
    name: `Cron Schedule Translator`,
    category: `Automation setup`,
    whenToUse: `You need a cron schedule and can never remember the syntax.`,
    prompt: `I want something to run: {{describe in plain English — "every weekday at 9am" / "first Monday of each month" / "every 4 hours" / etc.}}

Give me:
- The cron expression
- Human-readable confirmation of when it will actually run
- The next 5 run times (in my timezone: Mountain Time / Etc/GMT+7)
- Whether this is the most efficient schedule for my use case (or if I should adjust)

If there's a common gotcha with this schedule (like timezone issues or daylight saving), warn me.`,
    whatYouGet: `A correct cron expression with verification and timezone-aware run times.`,
  },
  {
    id: 161,
    name: `Build a Dashboard Page`,
    category: `Site/space building`,
    whenToUse: `You want a private or public dashboard on your zo.space.`,
    prompt: `Build a dashboard page at {{route — e.g., /dashboard}} on my zo.space.

What to display: {{describe what data/metrics/info you want to see}}
Data sources: {{workspace files, APIs, integrations, manual entry}}
Visibility: {{public / private (owner-only)}}

Design:
- Dark mode, clean layout
- Cards or panels for each data section
- Auto-refresh if displaying live data
- Responsive (works on phone for quick checks)
- Typography: Syne headings, Space Grotesk body, JetBrains Mono for data

Build the page route and any supporting API routes needed.
Test it and verify the data displays correctly.`,
    whatYouGet: `A live dashboard page on your zo.space with your specified data.`,
  },
  {
    id: 162,
    name: `Build a Landing Page`,
    category: `Site/space building`,
    whenToUse: `You need a public landing page for a project, product, or service.`,
    prompt: `Build a landing page at {{route}} on my zo.space for {{what it's for}}.

Content: {{describe what the page should communicate}}
Goal: {{sign up / buy / contact / learn more}}
Design direction: {{describe mood or reference existing pages}}

Build it with:
- Strong hero section (headline + sub + CTA)
- 3-4 sections that tell the story
- A clear CTA that appears at least twice
- Mobile-responsive
- Proper meta tags and OG image
- Public visibility
- Fast loading (no unnecessary animations or heavy images)

Build the page, preview it, and fix any issues before showing me.`,
    whatYouGet: `A live landing page on your zo.space, designed and deployed.`,
  },
  {
    id: 163,
    name: `Build a Blog System`,
    category: `Site/space building`,
    whenToUse: `You want a blog on your zo.space powered by workspace markdown files.`,
    prompt: `Set up a blog system on my zo.space:

Architecture:
- Blog posts stored as markdown files in /home/workspace/Projects/blog/posts/
- API route at /api/blog/posts that reads the directory and returns post metadata
- Blog index page at /blog listing all posts with title, date, excerpt
- Individual post page at /blog/:slug that renders the markdown
- RSS feed at /api/blog/rss

Each post markdown file should use frontmatter:
---
title: "Post Title"
date: "2026-04-11"
excerpt: "First paragraph or custom excerpt"
published: true
---

Build all routes. Create a sample post to verify it works.
Make the blog pages public.`,
    whatYouGet: `A working blog system on zo.space backed by workspace markdown files.`,
  },
  {
    id: 164,
    name: `Build a Contact Form`,
    category: `Site/space building`,
    whenToUse: `You need a way for people to reach you from your website.`,
    prompt: `Build a contact form on my zo.space at {{route — e.g., /contact}}.

Form fields: {{name, email, message — or customize}}
Where submissions go: {{Gmail notification / workspace file / both}}
Anti-spam: honeypot field (invisible to humans, catches bots)
Confirmation: show a success message after submission

Build:
- Page route with the form (styled, not default HTML form look)
- API route to handle submissions
- Email notification to me when someone submits
- Log submissions to /home/workspace/Records/contact-submissions.json

Make the page public. Test the form end-to-end.`,
    whatYouGet: `A working contact form with email notification and submission logging.`,
  },
  {
    id: 165,
    name: `Build a Link-in-Bio Page`,
    category: `Site/space building`,
    whenToUse: `You need a central hub for all your links.`,
    prompt: `Build a link-in-bio page at {{route — usually /}} on my zo.space.

Links to include:
{{list your links — portfolio, GitHub, X, Substack, etc.}}

Design:
- Dark mode, vertical stack of links
- My name and a one-line tagline at top
- Profile image (upload from workspace if available)
- Each link as a styled button/card
- Subtle animation on hover
- Social icons at the bottom
- Not a Linktree clone — make it feel personal

Make it public. This is the first thing people see.`,
    whatYouGet: `A custom link-in-bio page that doesn't look like every other Linktree.`,
  },
  {
    id: 166,
    name: `Build a Webhook Receiver`,
    category: `Site/space building`,
    whenToUse: `You need to receive data from an external service via webhook.`,
    prompt: `Build a webhook receiver at /api/webhook/{{service}} on my zo.space.

Service: {{what's sending the webhook — Stripe, GitHub, Zapier, etc.}}
Expected payload: {{describe or say "I'll share the docs"}}

Build:
- API route that receives POST requests
- Signature verification (if the service supports it — research their webhook security)
- Payload parsing and logging to /home/workspace/Records/webhooks/{{service}}/
- Error handling (return 200 even if processing fails, to prevent retries)
- A test endpoint at /api/webhook/{{service}}/test that returns the route status

Secure with bearer token auth if the service doesn't have signature verification.

Document the webhook URL and any setup needed on the external service's end.`,
    whatYouGet: `A secure webhook receiver with logging, ready to connect to external services.`,
  },
  {
    id: 167,
    name: `CSV to Dashboard`,
    category: `Data & datasets`,
    whenToUse: `You have a CSV file and want to explore and visualize the data.`,
    prompt: `Analyze this CSV: {{file path}}

1. Read the file and understand the structure
2. Clean any obvious issues (encoding, missing values, inconsistent formats)
3. Generate key statistics:
   - Row count, column count
   - Data types per column
   - Summary stats for numeric columns (min, max, mean, median)
   - Value counts for categorical columns
   - Any notable patterns or outliers

4. Create a DuckDB dataset for more complex queries:
   - Set up in /home/workspace/Datasets/{{name}}/
   - Import the CSV into DuckDB
   - Generate schema.yaml
   - Write a README with example queries

5. Suggest 3 interesting questions this data could answer and write the SQL for each.

Show me the results. If the data is interesting, I might want a dashboard page for it.`,
    whatYouGet: `A fully analyzed dataset with DuckDB setup, statistics, and suggested queries.`,
  },
  {
    id: 168,
    name: `Build a Dataset from Web Data`,
    category: `Data & datasets`,
    whenToUse: `You want to collect and structure data from web sources.`,
    prompt: `Build a dataset from: {{describe the data source — a website, API, or multiple sources}}

What I want to track: {{describe the data points}}
Update frequency: {{one-time / daily / weekly}}

Steps:
1. Research the data source (is there an API? RSS feed? Or do we need to scrape?)
2. Write a script to collect the data
3. Structure it into a clean schema
4. Set up a DuckDB dataset at /home/workspace/Datasets/{{name}}/
5. Import the initial data
6. If recurring: set up an automation to update the dataset on schedule

Generate:
- schema.yaml with column descriptions
- README.md with context and example queries
- Ingestion script in scripts/
- 3 example queries that demonstrate the dataset's value`,
    whatYouGet: `A structured dataset built from web data, with optional automated updates.`,
  },
  {
    id: 169,
    name: `SQL Query Builder`,
    category: `Data & datasets`,
    whenToUse: `You have a dataset and need to answer a specific question but don't want to write SQL.`,
    prompt: `I have a dataset at {{path}} (DuckDB).

My question: {{describe what you want to know in plain English}}

1. Translate my question into SQL (DuckDB dialect)
2. Run the query and show me the results
3. Explain what the results mean in plain English
4. If the results suggest follow-up questions, write those queries too
5. If a visualization would help, describe what chart to create

Show me the SQL so I can learn from it.`,
    whatYouGet: `Your question answered in plain English, with the SQL visible for learning.`,
  },
  {
    id: 170,
    name: `Data Quality Checker`,
    category: `Data & datasets`,
    whenToUse: `Before relying on a dataset for decisions.`,
    prompt: `Run a data quality check on {{dataset path}}.

Check:
- Completeness: what percentage of cells are filled? Which columns have the most gaps?
- Consistency: are formats consistent within columns? (Dates, numbers, categories)
- Accuracy: any values that seem wrong? (Negative ages, future dates, impossible values)
- Duplication: any duplicate rows?
- Freshness: when was this data last updated?
- Distribution: any columns with suspicious distributions? (All the same value, extreme outliers)

Report:
## Data Quality Report — {{dataset name}}
**Overall quality score:** [X/10]
**Issues found:** [N]

| Issue | Severity | Column | Description | Fix |
|-------|----------|--------|-------------|-----|
...

If there are fixable issues, offer to clean the data.`,
    whatYouGet: `A comprehensive data quality report with a fixable issues list.`,
  },
  {
    id: 171,
    name: `Organize My Workspace`,
    category: `Meta/system`,
    whenToUse: `Your workspace is cluttered and needs reorganization.`,
    prompt: `Audit and organize my Zo workspace.

Check the current structure at /home/workspace/ and:
1. Identify files and directories that aren't in the right place
2. Find empty or unused directories
3. Check for naming inconsistencies
4. Verify critical files are present (AGENTS.md, SOUL.md, etc.)
5. Look for temp files, logs, or artifacts that should be cleaned

Propose a reorganization plan:
- What to move and where
- What to archive
- What to delete (only clearly temp/generated files)
- Any new directories to create for better organization

Show me the plan BEFORE making changes. I approve the moves.

After approved: update AGENTS.md with the new structure.`,
    whatYouGet: `A workspace reorganization plan waiting for your approval.`,
  },
  {
    id: 172,
    name: `Skill Installer`,
    category: `Meta/system`,
    whenToUse: `You want to install a new skill from the Zo registry or build a custom one.`,
    prompt: `{{If installing from registry:}}
Install the "{{skill name}}" skill from the Zo skills registry. Set it up and show me how to use it.

{{If building custom:}}
Build a custom skill for: {{what it should do}}

Create:
- Skills/{{name}}/SKILL.md with proper frontmatter
- Scripts in scripts/ (TypeScript preferred, Python if needed)
- Any reference docs in references/
- Test the skill end-to-end

The skill should:
- Have --help documentation
- Handle errors gracefully
- Read secrets from environment variables (not hardcoded)
- Work without manual intervention after setup`,
    whatYouGet: `A skill installed or built, tested, and ready to use.`,
  },
  {
    id: 173,
    name: `Agent Fleet Manager`,
    category: `Meta/system`,
    whenToUse: `You have multiple automations and need to see the full picture.`,
    prompt: `Show me all my active automations and their status.

List every scheduled agent:
- Name
- Schedule (cron + human readable)
- What it does (1 sentence)
- Last run time
- Last run status (success/error)
- Delivery method

Also check for:
- Agents that haven't run when expected
- Agents with overlapping schedules
- Agents that might conflict (doing similar things)

Present as a table, sorted by next run time.

Recommend any agents to disable, merge, or adjust.`,
    whatYouGet: `A complete view of your automation fleet with health status and optimization recommendations.`,
  },
  {
    id: 174,
    name: `Debug a Space Route`,
    category: `Meta/system`,
    whenToUse: `A zo.space page or API isn't working right.`,
    prompt: `Debug this zo.space route: {{path}}

1. Read the current route code
2. Check for errors in the space error log
3. Preview the page (if it's a page route) using agent-browser on localhost:3099
4. Identify the issue:
   - Syntax errors?
   - Import issues?
   - Runtime errors?
   - Rendering issues?
   - API response issues?
5. Fix the issue
6. Verify the fix by previewing again

Show me what was wrong and what you changed.`,
    whatYouGet: `A diagnosed and fixed zo.space route.`,
  },
  {
    id: 175,
    name: `Workspace Search`,
    category: `Meta/system`,
    whenToUse: `You know something exists in your workspace but can't find it.`,
    prompt: `Find {{what you're looking for}} in my workspace.

Search:
- File names matching the description
- File contents mentioning the topic
- Zo.space routes related to it
- Recent files that might be relevant
- Skills that might be related

Show me all matches with:
- File path
- Relevant excerpt (if content search)
- Last modified date

If I might be thinking of something that's in a connected app (Gmail, Notion, Drive), check those too.`,
    whatYouGet: `A comprehensive search across your workspace, space routes, and connected apps.`,
  },
  {
    id: 176,
    name: `Build a Zo Site (Full Project)`,
    category: `Site/space building`,
    whenToUse: `You need a full project with its own dependencies and build config — beyond what zo.space routes can handle.`,
    prompt: `Create a new Zo Site for: {{project description}}

Stack: Vite + Bun + TypeScript + React + Tailwind (default)
Additional dependencies: {{list any specific packages needed}}

Set up:
1. Initialize the site in /home/workspace/{{project-name}}/
2. Install dependencies
3. Build the initial pages/components
4. Verify it runs locally
5. Share the preview URL

Create a _plan.md with the project structure and next steps.

Don't publish yet — just get it running so I can review.`,
    whatYouGet: `A full Zo Site project initialized and running, ready for development.`,
  },
  {
    id: 177,
    name: `Build a User Service`,
    category: `Site/space building`,
    whenToUse: `You need a persistent background service (API server, database, worker, etc.).`,
    prompt: `Set up a user service for: {{what it does}}

Type: {{HTTP server / TCP service / background worker}}
Technology: {{Bun / Node / Python / other}}
Port: {{or let the system assign one}}

Build:
1. Create the service entry point
2. Register it with Zo (register_user_service)
3. Verify it starts and runs correctly
4. Set up logging to /dev/shm/
5. Test the service
6. Share the URL if it's an HTTP service

Include:
- Health check endpoint (if HTTP)
- Graceful shutdown handling
- Error logging

Document the service in /home/workspace/Records/services/{{name}}.md`,
    whatYouGet: `A persistent service registered, running, and documented.`,
  },
  {
    id: 178,
    name: `JSON to Structured Dataset`,
    category: `Data & datasets`,
    whenToUse: `You have JSON data and want it queryable in DuckDB.`,
    prompt: `Convert this JSON to a DuckDB dataset: {{file path or paste JSON}}

1. Analyze the JSON structure (nested objects, arrays, etc.)
2. Design a relational schema that normalizes the data appropriately
3. Write an ingestion script that handles:
   - Nested objects → separate tables with foreign keys
   - Arrays → junction tables or flattened columns
   - Inconsistent types → clean conversion
4. Set up at /home/workspace/Datasets/{{name}}/
5. Import the data
6. Generate schema.yaml and README.md

Run 3 example queries to verify the data is queryable and correct.`,
    whatYouGet: `Messy JSON transformed into a clean, queryable DuckDB dataset.`,
  },
  {
    id: 179,
    name: `API Data Monitor`,
    category: `Data & datasets`,
    whenToUse: `You want to track data from an external API over time.`,
    prompt: `Set up monitoring for this API: {{API URL or describe the data source}}

What to track: {{specific data points}}
Frequency: {{how often to check}}
Alert conditions: {{when should I be notified — threshold changes, anomalies, etc.}}

Build:
1. A script that fetches the API data
2. Appends data points to a time-series file or DuckDB table
3. A scheduled agent that runs the script on the specified frequency
4. Alert logic: if conditions are met, notify via {{SMS / email}}
5. A trend report generated weekly

Save monitoring data to /home/workspace/Datasets/{{name}}/
Document the setup in /home/workspace/Records/monitoring/{{name}}.md`,
    whatYouGet: `An automated data monitoring pipeline with alerting and trend reporting.`,
  },
  {
    id: 180,
    name: `Rule Creator`,
    category: `Meta/system`,
    whenToUse: `You want Zo to remember a preference or behavior for future conversations.`,
    prompt: `Remember this for future conversations: {{describe the preference, behavior, or rule}}

Create a Zo rule that:
- Has a clear condition (when to apply)
- Has specific instructions (what to do)
- Doesn't conflict with existing rules

Show me the rule before saving it. I want to verify it says what I mean.`,
    whatYouGet: `A persistent Zo rule that applies to future conversations.`,
  },
  {
    id: 181,
    name: `Space Route Inventory`,
    category: `Meta/system`,
    whenToUse: `You want to see everything deployed on your zo.space.`,
    prompt: `Inventory all my zo.space routes:

For each route:
- Path and type (page/API)
- Public or private
- What it does (read the code and summarize)
- Last updated
- Dependencies (does it read workspace files? Call external APIs?)
- Health: does it work? (test each one)

Present as:
## zo.space Inventory — [date]

### Pages
| Route | Public | Description | Status |
|-------|--------|-------------|--------|
...

### APIs
| Route | Description | Status |
|-------|-------------|--------|
...

### Recommendations
- Routes to delete (broken or unused)
- Routes to update (working but outdated)
- Routes missing (gaps in coverage)`,
    whatYouGet: `A full inventory of your zo.space with health checks and recommendations.`,
  },
  {
    id: 182,
    name: `Persona Switcher`,
    category: `Meta/system`,
    whenToUse: `You want Zo to respond in a different style for a specific context.`,
    prompt: `Create a persona for: {{context — e.g., "client communication", "creative writing partner", "technical advisor"}}

Define:
- Name: {{name for the persona}}
- Tone: {{how it should sound}}
- Expertise: {{what it's good at}}
- Personality: {{traits, quirks, style}}
- Things it should never do: {{anti-patterns}}

Create the persona using the Zo persona tools.
Switch to it so I can test it.
Tell me how to switch between personas in the future.`,
    whatYouGet: `A custom Zo persona created and ready to activate.`,
  },
  {
    id: 183,
    name: `Cost of Living Comparison`,
    category: `Data & datasets`,
    whenToUse: `Considering a move or just curious how your area compares.`,
    prompt: `Compare cost of living between {{location A — e.g., Salmon, Idaho}} and {{location B}}.

Research current data for:
- Housing (rent/mortgage median)
- Groceries (basket comparison)
- Utilities (electric, gas, water, internet)
- Healthcare (insurance premiums, out-of-pocket)
- Transportation (gas prices, insurance, public transit)
- Taxes (income tax, sales tax, property tax)
- Internet availability and pricing (critical for remote work)

Present:
| Category | {{Location A}} | {{Location B}} | Difference |
|----------|----------------|----------------|------------|
...

**Bottom line:** Total monthly cost difference: \${{amount}}
**For my situation:** Given that I work remotely and have specific needs (epilepsy care, rural lifestyle), which location is better VALUE (not just cheaper)?`,
    whatYouGet: `A detailed cost comparison with a value assessment specific to your needs.`,
  },
  {
    id: 184,
    name: `API Key Manager`,
    category: `Meta/system`,
    whenToUse: `You need to set up or manage API keys for skills and integrations.`,
    prompt: `I need to set up API access for {{service}}.

Guide me through:
1. Where to get the API key (link to the service's API key page)
2. What type of key I need (read-only, read-write, specific scopes)
3. Any usage limits I should know about (rate limits, free tier boundaries)
4. How to save it in Zo secrets (Settings > Advanced)
5. How to verify it works (a test command or API call)

If I already have the key: test it to confirm it's valid and has the right permissions.

Document the integration in /home/workspace/Records/integrations/{{service}}.md:
- Service name and purpose
- Key name in Zo secrets
- Usage limits
- Which skills/automations use this key`,
    whatYouGet: `A guided API key setup with documentation and verification.`,
  },
  {
    id: 185,
    name: `Bulk File Renamer`,
    category: `Data & datasets`,
    whenToUse: `You have a bunch of files that need consistent naming.`,
    prompt: `Rename files in {{directory}} according to this pattern: {{describe the pattern — e.g., "YYYY-MM-DD-title.md" or "client-name-v1.ext"}}

Current files: [list them first]
New names: [show the mapping before executing]

Rules:
- Preserve file extensions
- Handle special characters safely
- No spaces in filenames (use hyphens)
- Lowercase everything
- Show me the before/after mapping BEFORE renaming

If there would be naming conflicts, flag them and ask how to resolve.

Execute only after I approve the mapping.`,
    whatYouGet: `A bulk rename operation with before/after preview and conflict detection.`,
  },
  {
    id: 186,
    name: `Build an Email Newsletter System`,
    category: `Site/space building`,
    whenToUse: `You want to collect emails and send newsletters from your zo.space.`,
    prompt: `Build an email collection and newsletter system on my zo.space:

1. Subscribe form route at /subscribe (public page with email input)
2. API route at /api/subscribe to handle submissions
3. Store subscribers in /home/workspace/Records/subscribers.json
4. Unsubscribe endpoint at /api/unsubscribe?email=X
5. A private admin page at /admin/newsletter to compose and send newsletters
   - Or: a CLI-style approach where I write the newsletter as markdown and run a prompt to send it

Requirements:
- Double opt-in if possible (send confirmation email)
- Unsubscribe link in every email
- Don't send duplicates
- Track send history

Build it incrementally — start with the subscribe form and storage, then add sending.`,
    whatYouGet: `A self-hosted newsletter system on your zo.space.`,
  },
  {
    id: 187,
    name: `Scheduled Report Generator`,
    category: `Automation setup`,
    whenToUse: `You want a regular report compiled from multiple data sources.`,
    prompt: `Set up a recurring report: {{describe what you want reported}}

Frequency: {{daily / weekly / monthly}}
Data sources: {{list — workspace files, APIs, integrations, etc.}}
Format: {{markdown file / email / zo.space page update}}

Design the report template with sections for each data source.
Build the scheduled agent that:
1. Collects data from all sources
2. Compiles into the report format
3. Saves to /home/workspace/Records/reports/
4. Delivers via {{delivery method}}

Test with a sample run. Verify all data sources are accessible.`,
    whatYouGet: `A recurring automated report pulling from multiple data sources.`,
  },
  {
    id: 188,
    name: `Migrate Data Between Apps`,
    category: `Integration-specific`,
    whenToUse: `You want to move data between connected apps (e.g., Notion to Linear, Drive to workspace).`,
    prompt: `Migrate data from {{source app}} to {{destination}}.

What to migrate: {{describe the data}}
How to map it: {{describe how fields should translate}}

Steps:
1. Read the data from the source app
2. Transform to match the destination's format
3. Write to the destination
4. Verify: count check, spot check 3-5 items
5. Document what was migrated

Safety:
- Don't delete from source until migration is verified
- Log all operations to /home/workspace/Records/migrations/{{date}}.md
- If any items fail to migrate, log them separately for manual review

Report: [N] items migrated, [N] failed, [N] skipped (with reasons).`,
    whatYouGet: `A safe, verified data migration between apps with a complete audit log.`,
  },
  {
    id: 189,
    name: `Environment Health Check`,
    category: `Meta/system`,
    whenToUse: `Things feel slow or broken and you want a system status.`,
    prompt: `Run a health check on my Zo environment:

1. System resources: disk space, memory usage, CPU load
2. Running processes: anything consuming unusual resources?
3. Services: check all user services and their status
4. Space: any errors in zo.space routes? (check error logs)
5. Agents: are scheduled agents running on time?
6. Network: can we reach external APIs and services?
7. Storage: any unusually large files or logs eating disk space?

Report:
## System Health — [timestamp]
| Component | Status | Notes |
|-----------|--------|-------|
| Disk | ✅/⚠️/❌ | X% used |
| Memory | ✅/⚠️/❌ | X/Y MB |
| Services | ✅/⚠️/❌ | X running |
| Space | ✅/⚠️/❌ | X errors |
| Agents | ✅/⚠️/❌ | X active |

If anything is ⚠️ or ❌, explain what's wrong and how to fix it.`,
    whatYouGet: `A comprehensive system health report with actionable fixes for any issues.`,
  },
  {
    id: 190,
    name: `Build a Price Calculator Tool`,
    category: `Site/space building`,
    whenToUse: `You want a public tool on your site that calculates prices for your services.`,
    prompt: `Build a pricing calculator at /tools/pricing on my zo.space.

My services and rates:
{{describe your services — e.g., "Landing page: \$500-1500 based on complexity. Full site: \$2000-5000. Maintenance: \$100/mo."}}

The calculator should:
- Ask a series of questions (project type, features needed, timeline)
- Calculate an estimated price range
- Show a breakdown of what's included at each price point
- Include a CTA to contact me for a custom quote
- Log calculator usage to /home/workspace/Records/calculator-usage.json

Make it public. Design it well — this is a marketing tool, not a form.`,
    whatYouGet: `A public pricing calculator that helps potential clients estimate costs and generates leads.`,
  },
  {
    id: 191,
    name: `Workspace Backup Strategy`,
    category: `Meta/system`,
    whenToUse: `Setting up or reviewing your backup strategy.`,
    prompt: `Design a backup strategy for my Zo workspace.

Critical data to protect:
- /home/workspace/ (all my files)
- Zo.space routes (code and configuration)
- Scheduled agent configurations
- Connected app data references

Research and recommend:
1. What Zo already handles (snapshots, etc.)
2. What I should additionally back up and where
3. How to automate backups (scheduled agent? cron?)
4. How to verify backups are working
5. Disaster recovery: how to restore if something goes wrong

Set up the recommended backup automation.
Document the strategy at /home/workspace/Records/backup-strategy.md.`,
    whatYouGet: `A documented backup strategy with automated verification.`,
  },
  {
    id: 192,
    name: `Content Import Pipeline`,
    category: `Data & datasets`,
    whenToUse: `You want to import content from another platform into your workspace.`,
    prompt: `Import my content from {{source — Substack, Medium, WordPress, etc.}} into my workspace.

1. Identify how to export/access the content (API, export feature, or scraping)
2. Download all posts/articles
3. Convert to clean markdown files
4. Organize in /home/workspace/Projects/blog/imported/
5. Preserve: title, date, content, any images
6. Generate an index file listing all imported content

Report: [N] posts imported, [N] images saved, [N] issues (with details).

This creates a local backup of my content that I control.`,
    whatYouGet: `All your content from another platform imported and organized as markdown files.`,
  },
  {
    id: 193,
    name: `Build a Status Page`,
    category: `Site/space building`,
    whenToUse: `You want a public or private page showing the status of your services.`,
    prompt: `Build a status page at /status on my zo.space.

Monitor:
- My zo.space pages (homepage, blog, tools)
- Any user services I'm running
- External dependencies (APIs I rely on)

The page should show:
- Current status for each service (✅ Up / ⚠️ Degraded / ❌ Down)
- Uptime percentage (trailing 7 days)
- Last checked timestamp
- Incident history (if any downtime occurred)

Architecture:
- API route that checks service health
- Page route that displays the dashboard
- Data stored in /home/workspace/Records/uptime/

Set up a scheduled agent to check services every 15 minutes and update the data.

Make the page public — transparency builds trust.`,
    whatYouGet: `A live public status page monitoring your services.`,
  },
  {
    id: 194,
    name: `Workspace Statistics Dashboard`,
    category: `Meta/system`,
    whenToUse: `You're curious about your workspace usage patterns.`,
    prompt: `Generate workspace statistics:

1. Total files and directories (by type: .md, .ts, .py, .json, images, etc.)
2. Total disk usage by top-level directory
3. Most recently modified files (top 20)
4. Oldest unmodified files (potentially stale)
5. Git statistics across all repos (total commits, most active project, commit frequency)
6. Zo.space statistics (total routes, page vs API, public vs private)
7. Agent statistics (total, schedules, categories)
8. Skills installed (total, most used)

Present as a clean report. If anything looks unusual (a project with no commits for a month, a huge log file eating disk), flag it.

Save to /home/workspace/Records/workspace-stats/[date].md`,
    whatYouGet: `A comprehensive statistical view of your workspace.`,
  },
  {
    id: 195,
    name: `Custom Error Page`,
    category: `Site/space building`,
    whenToUse: `Your zo.space 404 page is default and you want something better.`,
    prompt: `Build a custom 404 page for my zo.space.

It should:
- Match my site's design (dark mode, my typography, my color palette)
- Be helpful (suggest popular pages, include a search or navigation)
- Have personality (not just "Page Not Found" — show some character)
- Include a link back to home
- Maybe: a fun element (a subtle animation, a joke, or an Easter egg)

The 404 page is often someone's first impression when they mistype a URL. Make it feel intentional, not broken.`,
    whatYouGet: `A custom 404 page that turns a dead end into a good impression.`,
  },
  {
    id: 196,
    name: `Scheduled Cleanup Agent`,
    category: `Automation setup`,
    whenToUse: `You want automated workspace hygiene.`,
    prompt: `Set up an automated weekly cleanup:

Schedule: Sundays at midnight
What to clean:
- Log files older than 7 days in /dev/shm/
- Temp files in /tmp/ older than 3 days
- Empty directories in workspace
- Files in conversation workspaces older than 30 days

What to preserve (never delete):
- Anything in /home/workspace/ (user files)
- Running service logs (only clean old ones)
- Any file with "keep" or "important" in the name

Log all deletions to /home/workspace/Records/cleanup-log.json.
Only delete files that match the criteria exactly. When in doubt, skip.

Test with a dry-run first (list what WOULD be deleted without deleting).`,
    whatYouGet: `An automated cleanup agent that keeps your system tidy without risking your data.`,
  },
  {
    id: 197,
    name: `Token Usage Tracker`,
    category: `Meta/system`,
    whenToUse: `You want to understand your AI usage patterns.`,
    prompt: `Help me understand my Zo usage:

1. Check my usage at [Account > Usage](/?t=account&s=usage)
2. Analyze:
   - Which conversations used the most tokens
   - What types of tasks consume the most (code generation, research, writing, etc.)
   - Time-of-day usage patterns
   - Whether I'm using my plan efficiently

Recommendations:
- Tasks where I should be more concise (saving tokens)
- Tasks where I should use agents more (offloading to background)
- Whether my current plan tier is right for my usage level
- Tips for getting more value from each conversation`,
    whatYouGet: `A usage analysis with specific recommendations for getting more value from your Zo plan.`,
  },
  {
    id: 198,
    name: `Build a Stripe Payment Page`,
    category: `Site/space building`,
    whenToUse: `You want to sell something directly from your zo.space.`,
    prompt: `Build a payment page at /pay/{{product-slug}} on my zo.space.

Product: {{what I'm selling}}
Price: \${{amount}}
Type: {{one-time / subscription}}

Build:
1. A beautiful product page with:
   - Product description and benefits
   - Price display
   - Buy button that creates a Stripe Checkout session
2. API route to create the checkout session
3. Success page at /pay/success
4. Webhook handler to process completed payments
5. Log orders to /home/workspace/Business/orders.json

Requirements:
- Use Stripe's hosted checkout (most secure, least code)
- Handle webhook verification
- Support for quantity if applicable

Test the flow end-to-end (use Stripe test mode).`,
    whatYouGet: `A working payment page connected to Stripe, ready to accept money.`,
  },
  {
    id: 199,
    name: `Quick Deploy Script`,
    category: `Meta/system`,
    whenToUse: `You have a repeatable deploy process and want it scripted.`,
    prompt: `Create a deploy script for {{what I'm deploying}}.

Current manual process: {{describe the steps you currently take}}

Automate it:
1. Pre-deploy checks (tests pass, no uncommitted changes, dependencies up to date)
2. Build step (if applicable)
3. Deploy step
4. Post-deploy verification (is it live? Does the health check pass?)
5. Notification (text me when done, or if something failed)

Save the script to /home/workspace/Scripts/deploy-{{project}}.sh
Make it idempotent (safe to run twice).
Include a --dry-run flag for testing.`,
    whatYouGet: `A deploy script that automates your manual process with safety checks.`,
  },
  {
    id: 200,
    name: `The Self-Documenting Workspace`,
    category: `Meta/system`,
    whenToUse: `You want your workspace to explain itself to future-you.`,
    prompt: `Make my workspace self-documenting:

1. Update AGENTS.md with the current complete structure and conventions
2. Add README.md files to any project directory that's missing one
3. Update all _plan.md files with current status
4. Verify SOUL.md reflects my current preferences and personality
5. Create an index of all Skills with what they do and when to use them
6. Document all running automations and services

The goal: if I came back to this workspace after a month away, I should be able to understand everything in 10 minutes of reading.

Don't create documentation for documentation's sake. Only document things that would be confusing without context.`,
    whatYouGet: `A self-documenting workspace where every component explains itself.`,
  },
  {
    id: 201,
    name: `The Argument Destroyer`,
    category: `Decision-making`,
    whenToUse: `You're stuck in a debate (with yourself or someone else) and need the strongest version of both sides.`,
    prompt: `I'm torn between {{option A}} and {{option B}} for {{context}}.

Steel-man both sides. For each:
1. The strongest possible argument (3 sentences max)
2. The hidden assumption that makes this argument vulnerable
3. What type of person tends to pick this option and why
4. The scenario where this choice becomes obviously correct

Then tell me which one you'd pick if you had to bet \$10,000 of your own money, and why.`,
    whatYouGet: `Rigorous decision framework that exposes your blind spots.`,
  },
  {
    id: 202,
    name: `Reverse-Engineer Any Business Model`,
    category: `Business analysis`,
    whenToUse: `You see a company doing something interesting and want to understand how it actually works.`,
    prompt: `Reverse-engineer the business model of {{company or product URL}}.

Break down:
- **Revenue streams:** How do they actually make money? (not how they say they make money)
- **Cost structure:** What are their biggest expenses? Estimate rough percentages.
- **Moat:** What stops a competitor from copying this tomorrow?
- **Customer acquisition:** How do they get users? Paid, organic, viral, partnerships?
- **Unit economics:** Rough estimate of LTV:CAC ratio based on public data
- **Hidden leverage:** What non-obvious advantage do they have?
- **Vulnerability:** The one thing that could kill this business in 18 months

Format as a one-page investor memo, not a Wikipedia article.`,
    whatYouGet: `Actionable business intelligence in investor-grade format.`,
  },
  {
    id: 203,
    name: `The Time Capsule Letter`,
    category: `Personal reflection`,
    whenToUse: `End of month/quarter/year — capture where you are right now.`,
    prompt: `Help me write a time capsule letter to my future self (to be read on {{date, e.g., January 1, 2027}}).

Current context:
- What I'm working on: {{projects/job}}
- What I'm worried about: {{fears}}
- What I'm excited about: {{hopes}}
- Current daily routine: {{brief description}}

Write the letter in my voice — honest, not performative. Include:
1. A snapshot of exactly where I am right now (specific details, not vague)
2. Three predictions about what will be different by the read date
3. One thing I'm currently overthinking that probably won't matter
4. One thing I'm currently ignoring that probably will matter
5. A dare — something I should have done by the read date

Make it feel like a real letter, not a template. End with something that'll make future-me smile.`,
    whatYouGet: `A meaningful personal artifact, not a generic journal prompt.`,
  },
  {
    id: 204,
    name: `The Skill Gap Assassin`,
    category: `Learning`,
    whenToUse: `You know what you want to learn but don't know the fastest path.`,
    prompt: `I want to go from {{current level, e.g., "never touched Python"}} to {{target level, e.g., "can build and deploy a web scraper that runs on a schedule"}} in {{timeframe, e.g., "3 weeks"}}.

Constraints:
- I can dedicate {{hours per day}} hours/day
- I learn best by {{doing/reading/watching/building}}
- I already know {{related skills}}

Build me a daily curriculum. Not a reading list — a BUILD list. Each day should have:
1. One concept to learn (5-minute explanation, not a textbook chapter)
2. One thing to build that uses that concept (with specific requirements)
3. One "stretch challenge" if I finish early
4. How to verify I actually learned it (not "feel confident" — a concrete test)

Skip anything I don't need for the target goal. I don't need to be comprehensive, I need to be dangerous.`,
    whatYouGet: `A focused, project-based curriculum stripped of filler.`,
  },
  {
    id: 205,
    name: `The Meeting Killer`,
    category: `Productivity`,
    whenToUse: `Before scheduling or attending any meeting.`,
    prompt: `I'm about to {{schedule/attend}} a meeting:
- Topic: {{topic}}
- Attendees: {{who}}
- Current duration: {{length}}
- Goal: {{what we need to decide/align on/produce}}

Run the Meeting Killer protocol:
1. **Kill test:** Can this be an async message instead? Write the async version (Slack/email) that achieves the same goal. Be specific.
2. **If it survives:** Cut the attendee list to the minimum. Who can be informed after instead of present during?
3. **Compress:** Rewrite the agenda to fit in half the scheduled time. What gets cut?
4. **Pre-work:** What should attendees read/prepare BEFORE so we don't waste meeting time on context-setting?
5. **Output contract:** What specific artifact (decision, document, action items with owners) must exist when this meeting ends?

If the meeting survives all 5 steps, give me the optimized version. If it doesn't, give me the async replacement.`,
    whatYouGet: `Either a dramatically better meeting or proof you don't need one.`,
  },
  {
    id: 206,
    name: `The Price Tag Calculator`,
    category: `Freelancing / Business`,
    whenToUse: `You need to price a service, product, or freelance project.`,
    prompt: `Help me price {{what you're selling, e.g., "a brand identity package for small businesses"}}.

My context:
- Experience level: {{years/portfolio size}}
- Market: {{geographic/industry}}
- Time to deliver: {{estimated hours}}
- My current hourly rate (if any): {{rate}}

Calculate the price using 4 different methods:
1. **Cost-plus:** My time × rate + expenses + margin
2. **Market rate:** What competitors charge for equivalent work (estimate range)
3. **Value-based:** What is this worth to the client in revenue/savings? Price as % of that value.
4. **Anchoring:** What's the premium version cost? Now what's the standard?

Then give me:
- The price I should quote (and why)
- How to present it (not just a number — the framing)
- The one objection I'll get and the response
- When to walk away (the floor price below which it's not worth it)`,
    whatYouGet: `A defensible price with the psychology to back it up.`,
  },
  {
    id: 207,
    name: `The Doom Scroll Replacement`,
    category: `Content curation`,
    whenToUse: `Daily — replace mindless scrolling with curated learning.`,
    prompt: `Give me today's "scroll replacement" — a 10-minute reading list on {{interest area, e.g., "the intersection of AI and biology"}}.

Requirements:
- 3 items only (I have 10 minutes, not 10 hours)
- Each item: a one-paragraph summary so good I might not need to click
- Mix: 1 breaking/recent, 1 deep/timeless, 1 weird/surprising
- For each: one specific thing I can mention in conversation that makes me sound informed
- Skip anything that's just hype or press releases repackaged as news

End with one question these three items collectively raise that I should think about today.`,
    whatYouGet: `Curated intellectual nutrition instead of junk content.`,
  },
  {
    id: 208,
    name: `The Accountability Contract`,
    category: `Habit building`,
    whenToUse: `When you're starting something you've failed to stick with before.`,
    prompt: `I want to {{habit/goal, e.g., "write 500 words every morning before work"}} but I've failed at this before because {{why, e.g., "I snooze my alarm and then don't have time"}}.

Design an accountability system that accounts for my specific failure mode:
1. **Trigger redesign:** Replace my current trigger ({{current trigger}}) with one that's harder to skip
2. **Minimum viable version:** What's the smallest version of this habit that still counts? (for bad days)
3. **Streak architecture:** How to track streaks in a way that doesn't make one missed day feel like total failure
4. **Consequence design:** A real consequence for skipping (not punitive — structural)
5. **Reward design:** A real reward for streaks (not "feel good" — something tangible)
6. **Emergency protocol:** What to do when life genuinely gets in the way (travel, illness, chaos)
7. **30-day calendar:** Day-by-day plan with gradual difficulty increase

Write this as a contract I sign with myself. Make it specific enough that there's no wiggle room for my future lazy self.`,
    whatYouGet: `A behavior-science-backed system designed around your specific failure patterns.`,
  },
  {
    id: 209,
    name: `The Explain-It-To-Anyone Translator`,
    category: `Communication`,
    whenToUse: `You need to explain a technical concept to a non-technical audience.`,
    prompt: `I need to explain {{concept, e.g., "how large language models work"}} to {{audience, e.g., "my 65-year-old dad who uses email but thinks 'the cloud' is suspicious"}}.

Give me 3 versions:
1. **The dinner table version** (30 seconds, uses an analogy from their world)
2. **The curious follow-up version** (2 minutes, for when they say "but how does it actually...")
3. **The "I'm actually interested" version** (5 minutes, builds real understanding without jargon)

Rules:
- No analogies involving libraries, filing cabinets, or brains (overdone)
- Each version must be self-contained (don't say "as I mentioned")
- Include one specific detail that makes them feel like they understand something most people don't
- End each version with a question THEY can ask that shows they get it`,
    whatYouGet: `Three calibrated explanations that actually land.`,
  },
  {
    id: 210,
    name: `The Negotiation Prep Sheet`,
    category: `Career / Business`,
    whenToUse: `Before any negotiation — salary, contract, vendor, lease, anything.`,
    prompt: `I'm about to negotiate {{what, e.g., "my salary at a new job offer"}}.

Context:
- Their opening position: {{what they offered/asked}}
- My ideal outcome: {{what I want}}
- My walkaway point: {{minimum I'd accept}}
- My leverage: {{what I bring to the table}}
- Their likely constraints: {{budget, policy, timeline}}
- Relationship importance: {{one-time deal vs. ongoing relationship}}

Build my prep sheet:
1. **BATNA analysis:** What's my best alternative? What's theirs? Who needs this deal more?
2. **Anchor strategy:** What number/terms do I open with, and the logic that justifies it?
3. **Concession ladder:** 3 things I can "give up" that cost me little but feel valuable to them
4. **Their playbook:** The 3 most likely tactics they'll use and my scripted responses
5. **Silence scripts:** 2 moments where I should shut up and let silence do the work
6. **The ask:** Word-for-word script for my opening statement (under 30 seconds)
7. **Walk-away line:** The exact sentence I say if I need to walk

Format as a one-page cheat sheet I can glance at during the conversation.`,
    whatYouGet: `A battle-tested negotiation playbook specific to your situation.`,
  },
  {
    id: 211,
    name: `The Legacy Code Archaeologist`,
    category: `Code & Technical`,
    whenToUse: `You inherited a codebase with no documentation and need to understand it fast.`,
    prompt: `I just inherited a {{language/framework}} codebase and need to understand it quickly. Here's what I know:
- Repo/project: {{name or description}}
- What it's supposed to do: {{high-level purpose}}
- My first task: {{what I need to change or fix}}

Guide me through a codebase archaeology session:
1. **Entry points:** What files should I read first to understand the architecture? (typical patterns for this stack)
2. **Dependency map:** How to quickly identify the key dependencies and what they do
3. **Data flow:** Commands to trace how data moves through the system (from input to output)
4. **The graveyard:** How to identify dead code, abandoned features, and TODO debt
5. **Tribal knowledge:** What conventions or patterns should I look for that previous devs likely used but didn't document?
6. **Quick wins:** How to set up the project so I can make changes confidently (tests, local dev, debugging)

Give me a 2-hour exploration plan with specific commands to run and files to examine.`,
    whatYouGet: `A structured approach to understanding unfamiliar code without reading every line.`,
  },
  {
    id: 212,
    name: `The Content Repurposing Engine`,
    category: `Marketing / Content`,
    whenToUse: `You created one piece of content and want to squeeze maximum value from it.`,
    prompt: `I created {{content type, e.g., "a 2,000-word blog post"}} about {{topic}}.

Here's the content (or key points):
{{paste content or bullet points}}

Repurpose this into:
1. **Twitter/X thread** (8-12 tweets, hook-first, each tweet standalone valuable)
2. **LinkedIn post** (storytelling format, professional angle, ends with question)
3. **Email newsletter snippet** (3 paragraphs, personal tone, clear CTA)
4. **Short-form video script** (60 seconds, spoken word, pattern-interrupt opening)
5. **Carousel slides** (8-10 slides, one idea per slide, text only — I'll design later)
6. **Reddit comment** (helpful, not promotional, fits r/{{relevant subreddit}} culture)

For each: adapt the tone to the platform. Don't just shorten — reshape the idea for how people consume on that platform.`,
    whatYouGet: `6 platform-native content pieces from one source, each actually tailored.`,
  },
  {
    id: 213,
    name: `The Decision Journal Entry`,
    category: `Decision-making`,
    whenToUse: `Before making any significant decision — creates a record you can learn from later.`,
    prompt: `I'm about to decide: {{decision, e.g., "whether to quit my job and freelance full-time"}}.

Help me write a decision journal entry:

**The Decision:** State it as a clear yes/no or A/B choice
**Date:** {{today}}
**Deadline:** {{when I need to decide by}}
**Mental state right now:** {{honest assessment — stressed? excited? sleep-deprived?}}

**Analysis:**
1. What are the possible outcomes? (best case, worst case, most likely case for each option)
2. What information am I missing that would make this obvious? Can I get it before the deadline?
3. What would I advise my best friend to do in this exact situation?
4. What am I afraid of? Is the fear protecting me or holding me back?
5. In 10 years, which choice will I regret NOT making?

**Pre-mortem:** It's 1 year later and this decision was a disaster. What went wrong?
**Pre-parade:** It's 1 year later and this was the best decision I ever made. What went right?

**My decision:** [leave blank — I'll fill this in]
**Revisit date:** {{date to look back and evaluate}}

Format this as a clean journal entry I can save and revisit.`,
    whatYouGet: `A structured decision record that makes you smarter over time.`,
  },
  {
    id: 214,
    name: `The Cold Email That Actually Gets Replies`,
    category: `Outreach`,
    whenToUse: `You need to reach someone who doesn't know you and has a full inbox.`,
    prompt: `I want to email {{who — role/name/company}} about {{purpose, e.g., "a potential partnership", "asking for advice", "pitching a service"}}.

Context:
- Who I am: {{one sentence}}
- What I want from them: {{specific ask}}
- Why they should care: {{what's in it for them}}
- Connection (if any): {{mutual contact, shared interest, their content I've consumed}}
- Tone: {{professional/casual/somewhere between}}

Write 3 versions of this cold email:
1. **The direct version** (under 75 words — pure signal, no fluff)
2. **The story version** (opens with a specific observation about their work)
3. **The value-first version** (leads with something useful for them before asking)

Rules for all 3:
- Subject line must create curiosity without being clickbait
- First sentence must NOT be about me
- Must include exactly ONE clear ask (not three)
- Must be scannable in 10 seconds
- No "I hope this finds you well" or "I'd love to pick your brain"

Then tell me which version to send and why.`,
    whatYouGet: `Three strategic approaches to cold outreach, each designed to survive inbox triage.`,
  },
  {
    id: 215,
    name: `The Systems Audit`,
    category: `Personal productivity`,
    whenToUse: `Monthly — audit and fix your personal operating system.`,
    prompt: `Run a systems audit on my personal productivity setup.

My current systems:
- Task management: {{tool/method}}
- Calendar: {{tool/method}}
- Notes: {{tool/method}}
- Email: {{how I handle it}}
- File organization: {{method}}
- Habits/routines: {{morning/evening routines if any}}
- Financial tracking: {{method}}

For each system, evaluate:
1. **Friction score (1-10):** How much resistance do I face using this? (10 = seamless)
2. **Capture rate:** Am I actually capturing everything, or do things fall through cracks?
3. **Review cadence:** Do I review this system regularly, or does it rot?
4. **Integration:** Does this talk to my other systems or is it an island?

Then:
- Identify the #1 system that's costing me the most dropped balls
- Propose the minimum viable fix (not a system overhaul — one change)
- Identify one system I should eliminate entirely (and what absorbs its function)
- Give me a 15-minute monthly review checklist to keep everything running

Don't suggest new tools. Fix what I have first.`,
    whatYouGet: `A diagnostic that finds your weakest productivity link and fixes it.`,
  },
  {
    id: 216,
    name: `The Imposter Syndrome Debugger`,
    category: `Mindset`,
    whenToUse: `When you feel like a fraud who's about to be found out.`,
    prompt: `I'm experiencing imposter syndrome about {{situation, e.g., "starting a new senior role when I've only been coding for 2 years"}}.

The specific thoughts:
- {{thought 1, e.g., "Everyone else has CS degrees and I'm self-taught"}}
- {{thought 2, e.g., "I got lucky in the interview"}}
- {{thought 3, e.g., "They'll realize I don't know enough in the first week"}}

Debug these like code:
1. **Evidence check:** For each thought, what's the actual evidence for AND against?
2. **Attribution error:** Am I attributing my success to luck and others' success to skill? Where specifically?
3. **Competence inventory:** List 10 specific things I can do that are genuinely valuable (based on what I've told you about my background)
4. **The flip test:** If someone with my exact experience and skills told me they felt like a fraud, what would I tell them?
5. **Minimum viable confidence:** What's ONE thing I could do in the first week to prove to myself (not others) that I belong?

Don't give me empty affirmations. Give me logic I can actually believe.`,
    whatYouGet: `A rational counter-argument to your irrational self-doubt, specific to your situation.`,
  },
  {
    id: 217,
    name: `The Weekend Project Scoper`,
    category: `Building / Side projects`,
    whenToUse: `Friday evening — pick and plan a weekend project that you'll actually finish.`,
    prompt: `I have {{hours, e.g., "6-8"}} hours this weekend to build something.

My skills: {{tech stack/skills}}
My interests right now: {{what's on your mind}}
My constraints: {{any limitations — budget, tools, access}}

Give me 3 weekend project options:
For each:
1. **What it is** (one sentence)
2. **Why it's interesting** (not just "good portfolio piece" — genuinely interesting)
3. **Hour-by-hour build plan** (fits in my time budget with 20% buffer)
4. **The "done" state** (what does "finished" look like? Be specific.)
5. **The shareable artifact** (what can I show people Monday?)
6. **Stretch goal** (if I finish early)

Rules:
- Must be completable in the time budget (not "start a project" — FINISH one)
- No todo apps, weather apps, or calculator apps
- Must produce something I can show someone in under 30 seconds
- At least one option should be weird/unconventional`,
    whatYouGet: `Three scoped, realistic weekend projects with completion plans.`,
  },
  {
    id: 218,
    name: `The Feedback Decoder`,
    category: `Career / Communication`,
    whenToUse: `You received feedback (performance review, code review, client feedback) and need to decode what they're really saying.`,
    prompt: `I received this feedback:
"{{paste the feedback verbatim}}"

Context: This is from my {{boss/client/peer/code reviewer}} regarding {{what}}.

Decode this:
1. **Surface reading:** What they literally said
2. **Subtext reading:** What they probably actually mean (corporate-speak translation)
3. **Action reading:** What specific behavior change they're asking for
4. **Severity gauge:** On a scale of 1-10, how concerned should I be? Why?
5. **Pattern check:** Is this likely a one-time comment or a recurring theme they've been building to?
6. **Response plan:**
   - What to say back (if anything)
   - What to change immediately (this week)
   - What to change structurally (this quarter)
   - What to ignore (if any of it is noise)

Be direct with me. I'd rather hear the hard truth than a comforting reframe.`,
    whatYouGet: `Honest decode of feedback with a concrete response plan.`,
  },
  {
    id: 219,
    name: `The Rage-Quit Recovery`,
    category: `Debugging / Emotional regulation`,
    whenToUse: `You've been stuck on a bug or problem for hours and you're about to flip the table.`,
    prompt: `I've been stuck on this for {{time}} and I'm losing it.

The problem: {{describe the bug/issue}}
What I've tried: {{list attempts}}
What I expected: {{expected behavior}}
What's happening: {{actual behavior}}
My current theory: {{what I think might be wrong}}

Help me with the Rage-Quit Recovery Protocol:
1. **Fresh eyes pass:** Based on my description, what's the most likely cause I'm overlooking because I'm too close to it?
2. **Assumption audit:** What am I assuming that might be wrong? List my implicit assumptions.
3. **Binary search:** Help me isolate the problem. What's the simplest test that would cut the problem space in half?
4. **Rubber duck:** Ask me 3 specific questions that will force me to explain my code path step by step.
5. **Nuclear options:** If nothing works, give me 3 completely different approaches to achieve the same goal.
6. **Break prescription:** Tell me the optimal break to take right now (duration, activity) based on how long I've been stuck.

Start with #1 — just give me the fresh perspective first. I need a win.`,
    whatYouGet: `A structured de-escalation from frustration back to productive debugging.`,
  },
  {
    id: 220,
    name: `The Financial Snapshot Generator`,
    category: `Finance`,
    whenToUse: `Monthly — get clarity on where your money is going.`,
    prompt: `Help me create my monthly financial snapshot for {{month}}.

Income:
{{list income sources and amounts}}

Fixed expenses:
{{list recurring bills}}

Variable spending this month (estimates are fine):
{{list categories and rough amounts — food, entertainment, transport, etc.}}

Savings/investments:
{{list any savings or investment contributions}}

Debts:
{{list any debts and minimum payments}}

Generate:
1. **The number:** Net income minus all expenses. Am I positive or negative?
2. **The ratio:** What % goes to needs, wants, savings, and debt? (Compare to 50/30/20 benchmark)
3. **The leak:** The single biggest category where I'm spending more than I realize
4. **The win:** One specific expense I could cut that I wouldn't miss
5. **The play:** If I had an extra \$200/month, the highest-impact use based on my situation
6. **Next month's budget:** A simple, realistic budget based on this month's actuals (not ideals)

Format as a clean dashboard I can save. No financial advisor disclaimers — I want clarity, not compliance text.`,
    whatYouGet: `A no-BS financial snapshot with one actionable insight.`,
  },
  {
    id: 221,
    name: `The API Integration Planner`,
    category: `Code & Technical`,
    whenToUse: `Before integrating any third-party API into your project.`,
    prompt: `I need to integrate {{API name}} into my {{project/stack description}}.

Use case: {{what I want to do with it}}

Build me an integration plan:
1. **Auth setup:** What authentication method does this API use? What do I need to set up?
2. **Endpoint map:** Which specific endpoints do I need for my use case? (List them, not all endpoints — just mine)
3. **Data model:** What does the request/response look like for each endpoint I'll use? Show me the shape.
4. **Rate limits:** What are the limits and how do I stay under them?
5. **Error handling:** The 5 most common error responses I'll hit and how to handle each
6. **Wrapper design:** Sketch a minimal API client wrapper (in {{language}}) with retry logic and error handling
7. **Testing strategy:** How to test without burning API calls (mocks, sandbox, recorded responses)
8. **Cost estimate:** What will this cost at my expected usage level?
9. **Gotchas:** Things that aren't in the docs but every developer learns the hard way

Don't give me a tutorial. Give me a battle plan.`,
    whatYouGet: `A complete integration strategy that prevents the classic API pitfalls.`,
  },
  {
    id: 222,
    name: `The "Teach Me Like I'm 5 Then Like I'm 25" Ladder`,
    category: `Learning`,
    whenToUse: `You want to understand a concept at multiple depth levels.`,
    prompt: `Explain {{concept, e.g., "how DNS works"}} at 4 levels:

**Level 1 — Age 5:** Use a physical-world analogy. No technical terms at all. Something a kindergartener would nod at.

**Level 2 — Smart teenager:** Introduce the real vocabulary but keep explaining each term as you go. What would make a curious 16-year-old say "oh, that's cool"?

**Level 3 — Junior developer:** Practical understanding. How does this work in practice? What do I need to know to work with it? Include a concrete example with real values/data.

**Level 4 — Senior engineer interview:** Edge cases, failure modes, design tradeoffs. What would I need to know to explain why it works this way and not another way? What are the parts most people get subtly wrong?

For each level, end with: "The thing most people at this level get wrong is: ___"`,
    whatYouGet: `A layered understanding that builds from intuition to expertise.`,
  },
  {
    id: 223,
    name: `The Confrontation Script Writer`,
    category: `Communication / Relationships`,
    whenToUse: `You need to have a difficult conversation and want to prepare.`,
    prompt: `I need to have a difficult conversation with {{who — relationship/role}} about {{topic}}.

Context:
- What happened: {{situation}}
- How I feel about it: {{emotions}}
- What I want as an outcome: {{desired result}}
- The relationship stakes: {{how important is maintaining this relationship?}}
- Their likely reaction: {{what I expect them to say/feel}}

Write me a confrontation prep kit:
1. **Opening line:** The first sentence that sets the right tone (not aggressive, not passive — clear)
2. **The framework:** The 3-4 key points I need to make, in order, with transitions between them
3. **Their counterarguments:** The 3 most likely pushbacks and my prepared responses
4. **The emotional trap:** The moment in this conversation where I'm most likely to get derailed, and how to handle it
5. **The landing:** How to end the conversation with a concrete next step, not a vague "let's do better"
6. **The backup plan:** If the conversation goes sideways, the single sentence that gracefully pauses it

Rules: No therapy-speak ("I feel attacked when..."). Real language a real person would actually say.`,
    whatYouGet: `A practical script for a difficult conversation, with contingencies.`,
  },
  {
    id: 224,
    name: `The Portfolio Piece Architect`,
    category: `Career`,
    whenToUse: `You want to build something specifically to demonstrate your skills to employers or clients.`,
    prompt: `I'm targeting {{role type, e.g., "frontend developer positions at mid-size startups"}} and need a portfolio piece that stands out.

My skills: {{list key skills}}
My weak spots: {{what I'm less confident in}}
My time budget: {{hours available}}

Design the perfect portfolio piece:
1. **The project:** What to build (specific, not "an e-commerce site")
2. **Why this project:** What it signals to hiring managers that a todo app doesn't
3. **The technical showcase:** 3 specific technical decisions to make that demonstrate skill
4. **The story:** How to present this in an interview (the problem → my approach → the result → what I learned)
5. **The differentiator:** One feature or approach that 95% of portfolio projects won't have
6. **The README:** Structure for a README that hiring managers actually read
7. **Build order:** What to build first so I have something demoable ASAP, then layer on impressiveness

Don't give me an over-scoped dream project. Give me something I can ship in my time budget that punches above its weight.`,
    whatYouGet: `A strategically designed portfolio project optimized for your target market.`,
  },
  {
    id: 225,
    name: `The "What Am I Not Seeing?" Audit`,
    category: `Strategy / Blind spots`,
    whenToUse: `Before launching anything — product, business, project, initiative.`,
    prompt: `I'm about to launch {{what}} and I need you to find my blind spots.

Here's my plan:
{{describe your plan, what you're launching, your assumptions}}

Run the Blind Spot Audit:
1. **The obvious risk I'm probably dismissing:** What's the most likely failure mode that I've probably thought about but decided "that won't happen to me"?
2. **The second-order effect:** What will happen AFTER the first thing happens? (I planned for launch day — did I plan for day 30?)
3. **The audience I forgot:** Who will encounter this that I didn't design for? What will their experience be?
4. **The competitor response:** If this works, what does a competitor do in response? Am I ready for that?
5. **The dependency I'm ignoring:** What single point of failure could take this down?
6. **The metric I'm not tracking:** What should I measure that I probably won't think to measure until it's too late?
7. **The ethical edge case:** Is there a way this could be misused or cause unintended harm?

Be adversarial. I need the hard questions, not reassurance.`,
    whatYouGet: `A pre-launch stress test that catches what excitement makes you overlook.`,
  },
  {
    id: 226,
    name: `The Refactor Roadmap`,
    category: `Code & Technical`,
    whenToUse: `You have messy code that works but needs to be cleaned up without breaking anything.`,
    prompt: `I have a {{language/framework}} codebase that works but has accumulated technical debt. Here's the situation:

Main issues:
{{list the problems — duplicated code, god objects, no tests, spaghetti architecture, etc.}}

Constraints:
- Can't stop shipping features for more than {{time}}
- No budget for a full rewrite
- {{other constraints — team size, deployment process, etc.}}

Build me a refactor roadmap:
1. **Triage:** Rank the issues by (risk of not fixing) × (effort to fix). What's the best ROI fix?
2. **The strangler fig plan:** How to incrementally replace bad code without a flag day
3. **Test harness first:** What tests to write BEFORE refactoring so I know I haven't broken anything
4. **Phase 1 (this week):** The smallest refactor that provides the most relief
5. **Phase 2 (this month):** Structural improvements that compound
6. **Phase 3 (this quarter):** The bigger moves, now that the foundation is solid
7. **Never touch:** What ugly code should I leave alone because it works and isn't worth the risk?

No idealistic architecture astronaut plans. Give me pragmatic, incremental improvements.`,
    whatYouGet: `A realistic, incremental plan to improve code quality without stopping the world.`,
  },
  {
    id: 227,
    name: `The Daily Standup Synthesizer`,
    category: `Communication / Work`,
    whenToUse: `When you need to write a standup update and don't want to sound like a robot.`,
    prompt: `Here's what I did/am doing:

Yesterday: {{list activities, even half-finished ones}}
Today: {{what I plan to do}}
Blockers: {{anything stuck, or "none"}}

Write my standup update in 3 versions:
1. **The Slack version:** 3-4 bullet points, scannable, no fluff
2. **The "my manager reads these" version:** Same info but subtly highlights impact and progress, not just activity
3. **The honest version:** What I'd say if standups weren't performative (for my own notes)

Keep each under 100 words. If my blocker is vague, help me articulate it specifically enough that someone could actually help.`,
    whatYouGet: `A polished standup update plus an honest self-check.`,
  },
  {
    id: 228,
    name: `The Bedtime Shutdown Ritual Designer`,
    category: `Health & Wellness`,
    whenToUse: `Once — design a sleep routine, then use it nightly.`,
    prompt: `Design a bedtime shutdown ritual for me.

Context:
- Desired sleep time: {{e.g., 10:30 PM}}
- Current problem: {{e.g., "I scroll my phone until midnight", "my brain won't shut off", "I fall asleep fine but wake up at 3 AM"}}
- Bedroom setup: {{any relevant details — shared room, light situation, noise}}
- What I've tried: {{what hasn't worked}}
- Non-negotiables: {{e.g., "I will not give up my phone entirely", "I need background noise"}}

Build the ritual:
1. **T-minus 90 minutes:** What changes in my environment and behavior?
2. **T-minus 60 minutes:** The transition activity (not "just read a book" — be specific)
3. **T-minus 30 minutes:** The physical prep sequence (order matters)
4. **T-minus 10 minutes:** The mental shutdown protocol
5. **In bed:** The exact thing to do instead of reaching for my phone
6. **The 3 AM protocol:** If I wake up, the step-by-step process to fall back asleep

Make this realistic for someone who isn't a monk. Account for my non-negotiables. No "just meditate" unless you tell me exactly what kind, for how long, and what to do when my brain ignores the meditation.`,
    whatYouGet: `A personalized sleep protocol that works with your actual life.`,
  },
  {
    id: 229,
    name: `The Code Review Checklist Generator`,
    category: `Code & Technical`,
    whenToUse: `Before submitting or reviewing a PR.`,
    prompt: `I'm about to {{submit/review}} a pull request in a {{language/framework}} project.

The PR does: {{brief description of changes}}
Files changed: {{rough count or list}}
Type of change: {{feature/bugfix/refactor/perf/security}}

Generate a focused code review checklist for THIS specific type of change:

**Must Check:**
- [ ] {{items critical for this type of change}}

**Should Check:**
- [ ] {{items important but not blocking}}

**Nice to Verify:**
- [ ] {{items for thoroughness}}

**Red Flags to Hunt For:**
- {{specific anti-patterns common in this type of change}}

**The One Question to Ask:**
- The single most important question to answer about this PR

Don't give me a generic checklist. Tailor it to the type of change and the stack. A security fix review is different from a CSS refactor review.`,
    whatYouGet: `A targeted review checklist that catches what matters for this specific change.`,
  },
  {
    id: 230,
    name: `The Elevator Pitch Lab`,
    category: `Business / Communication`,
    whenToUse: `You need to explain what you do/build in under 60 seconds.`,
    prompt: `I need an elevator pitch for {{what — your product, project, company, or yourself}}.

Context:
- What it does: {{plain description}}
- Who it's for: {{target audience}}
- Why it matters: {{the problem it solves}}
- What makes it different: {{competitive edge}}
- The setting I'll use this in: {{networking event, investor meeting, party, LinkedIn, etc.}}

Give me 4 versions:
1. **The 10-second version:** One sentence. Memorizable. Could fit in a tweet.
2. **The 30-second version:** The "actual elevator" pitch. Hook → problem → solution → proof.
3. **The 60-second version:** Full version with a story or example that makes it stick.
4. **The anti-pitch:** The honest, jargon-free version I'd use with my non-tech friends at a bar.

Rules:
- No "we leverage AI to disrupt the paradigm" — real words only
- Must pass the "so what?" test (every sentence must earn the next)
- Include one specific number, metric, or detail that makes it concrete
- End each version with something that invites a follow-up question (not a dead end)`,
    whatYouGet: `Four calibrated versions of your pitch, each tailored to its time slot.`,
  },
  {
    id: 231,
    name: `The Git Disaster Recovery Guide`,
    category: `Code & Technical`,
    whenToUse: `You did something bad in git and need to undo it without making it worse.`,
    prompt: `Git emergency: {{describe what happened, e.g., "I force-pushed to main and overwrote my teammate's commits", "I accidentally committed my .env file with API keys", "I'm in a detached HEAD state and I don't know where my changes went"}}.

Before I do anything else:
1. **Stop:** What should I absolutely NOT do right now? (The thing panicked devs usually do that makes it worse)
2. **Assess:** Help me understand what actually happened. What git commands should I run to see the current state?
3. **Recover:** Step-by-step recovery commands with explanations (not just commands — tell me what each one does so I don't blindly paste)
4. **Verify:** How to confirm the recovery worked
5. **Prevent:** The one config or alias to set up so this never happens again

If my situation is truly unrecoverable, be honest about that and tell me what I've lost and what I can salvage.`,
    whatYouGet: `Calm, step-by-step disaster recovery tailored to your specific git mess.`,
  },
  {
    id: 232,
    name: `The Content Calendar Builder`,
    category: `Marketing / Content`,
    whenToUse: `Monthly — plan your content output for the next 30 days.`,
    prompt: `Build me a 30-day content calendar for {{platform(s), e.g., "Twitter and LinkedIn"}}.

Context:
- I'm building/promoting: {{what}}
- My audience: {{who}}
- My content pillars: {{3-5 themes I talk about}}
- Posting frequency: {{how often per platform}}
- My creation time budget: {{hours per week}}

For each day with a post:
- **Platform:** Where it goes
- **Content type:** (thread, single post, carousel, video script, story, etc.)
- **Topic:** Specific topic, not just "talk about {{pillar}}"
- **Hook:** The first line/sentence
- **Key point:** The main value this post delivers
- **CTA:** What I want the reader to do

Also include:
- 3 "evergreen" posts I can recycle when I'm low on ideas
- 2 "reactive" slots for jumping on trending topics
- 1 "meta" post about my content creation process (audiences love these)

Make the calendar progressive — earlier posts build context for later ones. Not 30 random disconnected posts.`,
    whatYouGet: `A strategic, buildable content plan — not just a list of topics.`,
  },
  {
    id: 233,
    name: `The Relationship Check-In Template`,
    category: `Relationships / Personal`,
    whenToUse: `Monthly — structured check-in with partner, close friend, or business partner.`,
    prompt: `Help me prepare for a relationship check-in with my {{partner/co-founder/close friend/roommate}}.

Our relationship type: {{describe}}
Current state: {{how things generally are right now}}
Something that's been on my mind: {{an unspoken topic or tension}}
Something that's going well: {{what I appreciate right now}}

Generate:
1. **The opener:** A non-threatening way to start the conversation (not "we need to talk")
2. **3 good questions to ask them:** Questions that invite real answers, not "fine"
3. **My share:** How to articulate what's on my mind without it sounding like an attack or complaint
4. **The appreciation:** A specific, non-generic way to express what I value about them right now
5. **The forward look:** A question or proposal about something to do or change together next month
6. **The close:** How to end the conversation so it feels productive, not heavy

Tone: genuine, adult, low-drama. Not therapy-speak, not corporate-speak — how real people who care about each other actually talk.`,
    whatYouGet: `A structured but natural framework for conversations people usually avoid.`,
  },
  {
    id: 234,
    name: `The "Explain My Code to My Future Self" Documenter`,
    category: `Code & Technical`,
    whenToUse: `You wrote something clever/complex and future-you will have no idea why.`,
    prompt: `I wrote this code and I need to document it for future-me:`,
    whatYouGet: `Documentation that serves future-you, not a linter.`,
  },
  {
    id: 235,
    name: `The Micro-Business Validator`,
    category: `Business / Side income`,
    whenToUse: `You have a business idea and want to know if it can make money before you build anything.`,
    prompt: `I have a business idea: {{describe the idea in 2-3 sentences}}.

Run the validation gauntlet:
1. **Customer exist check:** Who exactly would pay for this? (specific persona, not "small businesses")
2. **Willingness to pay:** Are these people currently spending money on alternatives? What alternatives?
3. **Market size napkin math:** How many potential customers × price point = total addressable market? Is it worth my time?
4. **MVP definition:** What's the absolute minimum I could build/offer to test demand? (Think days, not months)
5. **Pre-sell test:** Draft the landing page copy (headline, 3 bullets, CTA) — if I can't write compelling copy, the idea might not be compelling
6. **Revenue model:** How do I charge? (One-time, subscription, usage-based, freemium) What's the right model for this?
7. **The honest kill question:** What's the single most likely reason this fails?
8. **Go/no-go:** Based on this analysis, should I spend a weekend building an MVP or kill the idea?

Be brutally honest. I'd rather kill a bad idea today than waste 3 months on it.`,
    whatYouGet: `A rapid validation framework that saves you from building things nobody wants.`,
  },
  {
    id: 236,
    name: `The Travel Planning Optimizer`,
    category: `Life / Logistics`,
    whenToUse: `Planning any trip — vacation, business, or spontaneous weekend away.`,
    prompt: `Plan my trip:
- Destination: {{where}}
- Dates: {{when}}
- Budget: {{amount, or "flexible"}}
- Travel style: {{budget backpacker / mid-range / luxury / "I want experiences not hotels"}}
- Interests: {{what I enjoy — food, architecture, nature, nightlife, history, etc.}}
- Constraints: {{dietary, mobility, language, visa, etc.}}
- Already booked: {{flights, hotels, or anything locked in}}

Generate:
1. **Day-by-day itinerary** with specific neighborhoods/areas (morning, afternoon, evening blocks)
2. **The local secret:** One thing only locals know about that tourists miss
3. **The money save:** One place everyone overpays and the smarter alternative
4. **The splurge:** One thing worth overpaying for at this destination
5. **The food plan:** 3 specific restaurants/food spots with what to order (not "try local cuisine" — actual places)
6. **The backup plan:** For each day, an indoor/bad-weather alternative
7. **Logistics:** Getting around, SIM card situation, tipping customs, safety notes
8. **Packing note:** One thing I wouldn't think to pack but will need

No generic travel-blog advice. Treat this like a recommendation from a friend who's lived there.`,
    whatYouGet: `An opinionated, specific travel plan — not a TripAdvisor summary.`,
  },
  {
    id: 237,
    name: `The Codebase Health Report`,
    category: `Code & Technical`,
    whenToUse: `Periodically assess the health of a project you maintain.`,
    prompt: `Help me generate a codebase health report for my {{language/framework}} project.

Current state:
- Age: {{how long it's been in development}}
- Team size: {{number of contributors}}
- Test coverage: {{estimated % or "none"}}
- Last major refactor: {{when, or "never"}}
- Deploy frequency: {{how often}}
- Known pain points: {{list them}}

Assess these health indicators (score each 1-10):
1. **Dependency health:** Are my dependencies maintained, up-to-date, and minimal?
2. **Test confidence:** Can I refactor with confidence? What's not tested that should be?
3. **Onboarding speed:** How long would it take a new developer to make their first meaningful PR?
4. **Deploy safety:** What could go wrong in a deploy and would I know immediately?
5. **Performance trajectory:** Is the project getting faster or slower over time?
6. **Security posture:** Am I handling auth, secrets, and user data correctly?
7. **Code clarity:** Can I understand code I wrote 6 months ago without comments?

Then give me:
- **Overall health score** with one-line summary
- **Top 3 actions** ranked by impact/effort ratio
- **The ticking time bomb:** The one issue that's fine now but will be a crisis in 6 months if ignored`,
    whatYouGet: `A structured health assessment with prioritized action items.`,
  },
  {
    id: 238,
    name: `The Procrastination Buster`,
    category: `Productivity / Mindset`,
    whenToUse: `You know what you need to do but can't start.`,
    prompt: `I'm procrastinating on {{task}} and I've been avoiding it for {{how long}}.

The real reason (be honest with me after I answer): {{why I think I'm avoiding it, e.g., "it's boring", "I don't know where to start", "I'm afraid it won't be good enough", "it's overwhelming"}}

Help me start in the next 5 minutes:
1. **Diagnose:** Based on my stated reason, what's the actual psychological barrier? (Boredom, fear, perfectionism, decision paralysis, or something else?)
2. **The 2-minute entry point:** Give me a micro-task that takes under 2 minutes and counts as starting. Not "open the file" — something that produces output.
3. **The ugly first draft rule:** Reframe the task so that doing it badly is the explicit goal. What does the intentionally rough version look like?
4. **Environment hack:** One change to my physical or digital environment that removes one point of friction
5. **The commitment device:** Something I should do RIGHT NOW that makes it harder to keep procrastinating (specific to my task)
6. **The first 25 minutes:** Break the task into 5-minute chunks for one pomodoro. What do I do in each chunk?

Don't motivate me. Manipulate my environment and lower the bar until starting is easier than not starting.`,
    whatYouGet: `A practical, psychology-aware system to overcome inertia on the specific task you're avoiding.`,
  },
  {
    id: 239,
    name: `The "What Should I Charge?" Consultant`,
    category: `Freelancing`,
    whenToUse: `A client asks "what's your rate?" and you freeze.`,
    prompt: `A client just asked my rate for {{type of work, e.g., "building a custom Shopify theme"}}.

Context:
- My experience: {{level}}
- The client: {{type of client — startup, enterprise, agency, individual}}
- Project scope: {{what they want}}
- Estimated time: {{hours}}
- My current financial situation: {{relevant context — need the money vs. can be selective}}
- What I charged last time: {{last comparable project}}
- My gut feeling for a number: {{what feels right}}

Help me think through this:
1. **Your gut is probably:** too low / about right / too high — and here's why
2. **The market range** for this type of work at my experience level
3. **Project-based vs. hourly:** Which makes me more money on this specific project?
4. **The magic number:** What I should quote, and the one-sentence justification
5. **The negotiation buffer:** If they counter, what's my next number and what do I remove from scope?
6. **The premium path:** What could I add (that costs me little time) to justify 30% more?
7. **The email:** Write the pricing response — professional, confident, not apologetic

Help me price with confidence, not anxiety.`,
    whatYouGet: `A pricing strategy with the exact words to send.`,
  },
  {
    id: 240,
    name: `The Emergency Meal Planner`,
    category: `Life / Cooking`,
    whenToUse: `It's 6 PM, you have random ingredients, and you need dinner.`,
    prompt: `Emergency dinner situation:
- What I have: {{list whatever ingredients you can see in your fridge/pantry}}
- Kitchen equipment: {{oven, stovetop, microwave, air fryer, instant pot, etc.}}
- Dietary restrictions: {{any}}
- Energy level: {{1-10, where 1 is "I can barely stand" and 10 is "I feel like cooking a feast"}}
- Time budget: {{minutes}}

Give me:
1. **Option A:** The laziest possible meal with these ingredients that doesn't taste lazy
2. **Option B:** A slightly more ambitious meal if I have 10 more minutes
3. **Option C:** The "impress someone" version if I want to try

For my chosen option:
- Step-by-step with actual times (not "cook until done" — "cook 4 minutes per side on medium-high")
- The one technique that elevates this from "I threw stuff together" to "I cooked dinner"
- What to do while things are cooking (prep next step, clean up, etc.)

No recipes that require ingredients I don't have. Work with what I listed.`,
    whatYouGet: `A practical dinner plan built from what's actually in your kitchen.`,
  },
  {
    id: 241,
    name: `The Weekly Review Protocol`,
    category: `Productivity`,
    whenToUse: `Every Sunday — process your week and set up the next one.`,
    prompt: `Run my weekly review for the week of {{date range}}.

What happened this week:
- Completed: {{list what I finished}}
- Started: {{list what I began}}
- Dropped/postponed: {{list what didn't happen}}
- Unexpected: {{anything that showed up unplanned}}
- Highlight: {{best moment of the week}}
- Lowlight: {{worst moment or biggest frustration}}

Process this:
1. **Completion rate:** What % of what I planned actually got done? Is that normal or concerning?
2. **Energy audit:** Based on what I described, when was my energy highest? Lowest? Am I scheduling hard work at the right times?
3. **The pattern:** What's one pattern I notice across my completed items? My dropped items?
4. **Next week's top 3:** Based on what carried over and what matters most, what are my 3 must-do items for next week?
5. **The calendar audit:** Am I going to have enough unscheduled time next week to do real work? If not, what gets cut?
6. **The one thing:** If I could only accomplish ONE thing next week, what should it be?
7. **Loose ends:** Anything from this week that needs a follow-up message, decision, or action?

Format as a clean review I can archive and compare week-over-week.`,
    whatYouGet: `A structured weekly processing system that catches what most people let slip.`,
  },
  {
    id: 242,
    name: `The Error Message Translator`,
    category: `Code & Technical`,
    whenToUse: `You got an error message that makes no sense.`,
    prompt: `I got this error and I have no idea what it means:`,
    whatYouGet: `A complete translation from cryptic error to understanding and fix.`,
  },
  {
    id: 243,
    name: `The "Explain This Bill" Decoder`,
    category: `Finance / Life admin`,
    whenToUse: `You got a confusing bill, invoice, or financial document.`,
    prompt: `Help me understand this bill/statement:

{{paste the bill contents or describe the line items and charges}}

Provider/Company: {{who sent it}}
Service/Product: {{what it's for}}
Expected amount: {{what I thought I'd pay}}
Actual amount: {{what they're charging}}

Break it down:
1. **Line-by-line translation:** What each charge actually is in plain English
2. **The BS detector:** Any charges that look like they could be errors, hidden fees, or upsells
3. **The comparison:** Is this amount normal for this type of service? (ballpark)
4. **The dispute list:** Which charges (if any) are worth calling about
5. **The call script:** If I should call, exactly what to say to get a resolution (specific words that work with customer service reps)
6. **The prevention:** How to avoid surprise charges on this bill going forward

Don't assume the company is right. Help me be an informed consumer.`,
    whatYouGet: `Bill literacy plus a script if you need to dispute.`,
  },
  {
    id: 244,
    name: `The Presentation Builder`,
    category: `Communication / Work`,
    whenToUse: `You need to create a presentation and are staring at a blank slide deck.`,
    prompt: `I need to present on {{topic}} to {{audience}} in {{time limit}}.

Context:
- Goal: {{inform/persuade/teach/get buy-in/report results}}
- What the audience already knows: {{their baseline knowledge}}
- What they care about: {{their priorities}}
- The one thing they must remember: {{single key takeaway}}
- My style: {{formal/conversational/technical/storytelling}}

Build my presentation:
1. **The arc:** The narrative structure (not "intro, body, conclusion" — the actual story beats)
2. **Slide-by-slide outline:**
   - Slide title
   - Key point (one sentence)
   - Visual suggestion (what should be on the slide — not what I should say)
   - Speaker notes (what I actually say, in natural language)
3. **The opener:** First 30 seconds — must hook the audience
4. **The closer:** Last 60 seconds — must make the key point stick
5. **The "tough question" prep:** 3 questions I'll likely get and my confident answers
6. **The slide count check:** Am I trying to fit too much into my time slot?

Rule: No slide should have more than 6 words in the title or more than one idea. If a slide has a paragraph, it's a document, not a slide.`,
    whatYouGet: `A complete presentation structure with speaker notes, ready to drop into slides.`,
  },
  {
    id: 245,
    name: `The API Design Reviewer`,
    category: `Code & Technical`,
    whenToUse: `Before shipping an API — catch design mistakes early.`,
    prompt: `Review my API design:

{{paste your API endpoints/schema/spec, or describe them}}

Review against these criteria:
1. **Naming:** Are endpoint names, parameters, and responses consistent and predictable?
2. **REST conventions:** Am I using HTTP methods, status codes, and URL patterns correctly?
3. **Versioning:** How do I handle breaking changes?
4. **Error responses:** Are errors structured, informative, and consistent?
5. **Pagination:** For list endpoints, is pagination handled properly?
6. **Auth model:** Is authorization checked at the right level?
7. **Idempotency:** Can critical operations be safely retried?
8. **The developer experience test:** If I gave this API to a developer with no context, could they integrate it in an hour?

For each issue found:
- **Severity:** Breaking / Annoying / Nitpick
- **Current:** What it looks like now
- **Suggested:** What it should look like
- **Why:** The specific problem the current design will cause

Rank findings by severity. I want to fix the worst ones first.`,
    whatYouGet: `A focused API design review that catches the issues that haunt you in production.`,
  },
  {
    id: 246,
    name: `The One-Page Business Plan`,
    category: `Business / Strategy`,
    whenToUse: `You want to think through a business idea without a 40-page document.`,
    prompt: `Help me write a one-page business plan for: {{business idea in one sentence}}.

Fill in each box:
1. **Problem:** What specific pain am I solving? (For who?)
2. **Solution:** My approach in one sentence
3. **Customer:** Exactly who pays me (not "everyone who..." — the first 10 customers)
4. **Revenue:** How I make money (pricing model, price point, payment frequency)
5. **Costs:** The 3 biggest expenses to get started and to keep running
6. **Channels:** How customers find me (the first 3 channels I'd test)
7. **Metrics:** The 3 numbers I track to know if this is working
8. **Unfair advantage:** What I have that a competitor can't easily copy (be honest — "nothing yet" is a valid answer)
9. **Milestones:** Month 1, Month 3, Month 6 — what does success look like at each?
10. **The ask:** What do I need to get started? (Money, time, skills, connections?)

Fit everything on one page. If a section needs more than 3 sentences, I'm overcomplicating it.`,
    whatYouGet: `A complete business plan that fits on a napkin but actually covers the essentials.`,
  },
  {
    id: 247,
    name: `The Incident Post-Mortem Writer`,
    category: `Code & Technical / Work`,
    whenToUse: `Something went wrong in production and you need to document it.`,
    prompt: `Help me write a post-mortem for an incident:

What happened: {{describe the incident}}
When: {{timeline}}
Impact: {{who was affected and how}}
How we found out: {{alerting, customer report, etc.}}
How we fixed it: {{the immediate fix}}
Root cause: {{what actually went wrong, if known}}

Write the post-mortem:
1. **Summary:** 2-3 sentences a non-technical executive can understand
2. **Timeline:** Minute-by-minute from first signal to resolution
3. **Root cause analysis:** The chain of events, using the "5 whys" technique
4. **What went well:** What worked in our response (don't skip this — it matters)
5. **What went poorly:** Where our response was slow or wrong
6. **Action items:** Specific, assigned, with deadlines — not "improve monitoring" but "add alert for X metric with Y threshold, owned by Z, by [date]"
7. **Lessons learned:** The one systemic insight this incident reveals

Tone: blameless, factual, action-oriented. Name systems, not people. The goal is to prevent recurrence, not assign fault.`,
    whatYouGet: `A professional, blameless post-mortem ready to share with the team.`,
  },
  {
    id: 248,
    name: `The Subscription Audit`,
    category: `Finance`,
    whenToUse: `Quarterly — find and kill subscriptions you're wasting money on.`,
    prompt: `Help me audit my subscriptions:

{{list all subscriptions you can remember — name, price, billing frequency}}

For each subscription:
1. **Usage check:** When did I last use this? (Be honest)
2. **Value score (1-10):** How much value do I actually get vs. what I pay?
3. **Free alternative:** Is there a free or cheaper option that covers 80% of what I use?
4. **Verdict:** KEEP / DOWNGRADE / CANCEL / PAUSE

Then:
- **Total monthly spend:** Sum it up
- **Recommended monthly spend:** After cuts
- **Monthly savings:** The difference
- **Annual savings:** That number × 12 (this one usually hurts)
- **The cancel queue:** Ordered list of what to cancel first, with links/instructions for each (if cancellation is notoriously difficult, warn me)
- **The "free month" hack:** Which of these offer a pause or retention discount if I try to cancel?

Be ruthless. If I haven't used it in 30 days and it's not insurance/security, it should probably go.`,
    whatYouGet: `A clear-eyed audit that finds money you're burning every month.`,
  },
  {
    id: 249,
    name: `The Personal Brand Audit`,
    category: `Career / Marketing`,
    whenToUse: `Quarterly — assess how you show up online and in professional contexts.`,
    prompt: `Audit my personal brand:

My profiles:
- LinkedIn: {{URL or description of what's there}}
- Twitter/X: {{URL or description}}
- GitHub: {{URL or description}}
- Personal site: {{URL or description}}
- Other: {{any other platforms}}

My target audience: {{who I want to notice me — employers, clients, community, etc.}}
My desired positioning: {{how I want to be perceived, e.g., "creative frontend developer who builds weird but useful things"}}

Audit:
1. **Consistency check:** Does the same person show up across all platforms? Where are the mismatches?
2. **First impression test:** If someone Googles my name, what story do they piece together in 60 seconds?
3. **Signal vs. noise:** What content/activity is building my brand vs. diluting it?
4. **The gap:** What's missing from my online presence that my target audience would want to see?
5. **The cringe:** Anything I should delete or update because it undermines my current positioning?
6. **Quick wins:** 3 things I can do this week (under 30 minutes each) to strengthen my brand
7. **The 90-day play:** One content or visibility strategy to execute over the next quarter

Be honest. I'd rather fix an embarrassing gap now than discover it when it matters.`,
    whatYouGet: `A strategic assessment of your online presence with specific improvements.`,
  },
  {
    id: 250,
    name: `The Zo Computer Power Move`,
    category: `Meta / Zo-specific`,
    whenToUse: `When you want to unlock Zo's full potential for a specific goal.`,
    prompt: `I want to use my Zo Computer to {{big goal, e.g., "build a passive income stream", "automate my entire job search", "become the most organized person I know", "launch a product in a weekend"}}.

My situation:
- Skills: {{what I know}}
- Time available: {{hours per week}}
- Budget: {{any money to spend}}
- What I've already set up on Zo: {{current tools, automations, sites}}

Design the ultimate Zo power move:
1. **The architecture:** What combination of Zo capabilities (sites, automations, agents, integrations, spaces) work together to achieve this?
2. **The automation stack:** Which tasks become scheduled agents running in the background?
3. **The data flow:** How does information move between my tools? (Draw the pipeline)
4. **The daily workflow:** What does my day look like once this is all running?
5. **The build order:** Phase-by-phase setup plan (what to build first, second, third)
6. **The prompts:** The exact prompts to give Zo for each automation or agent
7. **The multiplier:** The one non-obvious Zo feature that makes this 10x more effective
8. **Time to value:** How long until this starts paying off?

Don't hold back. I want to use this platform like it was designed to be used.`,
    whatYouGet: `A complete Zo Computer strategy that orchestrates multiple features toward one big goal.`,
  },
];
