# Zo Cookbook action-model rewrite plan

## Objective
Replace the broken Connect + Run architecture with a simpler public cookbook model: remove token-based connection, replace runnable cards with Open in Zo / Deploy in Zo / Copy recipe actions, and leave the site easier to publish and trust.

## Phases

### Phase 1 — Remove auth/run architecture
- [x] Remove `/connect` route and UI entry points
- [x] Remove token/localStorage client plumbing
- [x] Remove `/api/run` proxy logic from `server.ts`
- [x] Remove dead connect/run components or replace them with the new action component

### Phase 2 — Add cookbook action system
- [x] Create a shared action component for recipe cards
- [x] Add action variants by recipe type:
  - prompts → Open in Zo, Copy recipe
  - automations → Open in Zo, Deploy in Zo, Copy recipe
  - spaces → Open in Zo, Deploy in Zo, Copy recipe
  - apps → Open in Zo, Build in Zo, Copy recipe
- [x] Thread the new action system through app, space, automation, and prompt cards
- [x] Keep the UI compact and distinctive, not generic SaaS sludge

## Critique
- [x] Audit against intent: public discovery + handoff, not public auth
- [x] Find 3 real problems in the first pass
- [x] Fix them before final delivery

### Phase 3 — Verify + document
- [x] Typecheck the app
- [x] Verify in-browser that the cookbook works without connect flow
- [x] Update `README.md` Project Notes with the new architecture
- [ ] Commit the changes to git

## Definition of done
The cookbook has no connect flow, no token entry, no public run proxy, and every expanded card exposes stable handoff actions that make sense for its recipe type. README matches reality and the changes are committed.
