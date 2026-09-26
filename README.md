# PREIshare Investor Dashboard Shell

TanStack Start + TypeScript starter for the PREIshare investor dashboard (Sprint 3).

This repo already runs as a TanStack Start app at the project root (next to `docs/`). Routes are files under `src/routes/`. This step only confirms that starter and the home page. Dashboard area routes and shell components come later.

## Setup

1. Install Node.js LTS if you do not have it yet.
2. From the project root, run: `npm install`
3. Start the dev server: `npm run dev`
4. Open the local URL printed in the terminal (this project uses port 3000).

Success looks like the PREIshare starter home page in the browser, with no error in the terminal.

## Project notes

- Planning docs live in `docs/`. Page map: `docs/dashboard-ia.md`. Component jobs: `docs/component-plan.md`. Product brief: `docs/investor-dashboard-brief.md`.
- File-based routes live under `src/routes/`.
- Dashboard area routes (`/dashboard`, portfolio, deals, profile) are added in a later step. Do not invent them in this scaffold.
- Do not build `AppShell` yet. Names for that later work are locked in `docs/component-plan.md`.
- Mock data only when those pages arrive. No sign-in and no live backend in this sprint.
