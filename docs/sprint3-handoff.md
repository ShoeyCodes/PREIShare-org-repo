# Sprint 3 Handoff — PREIshare Investor Dashboard Shell

## Stakeholder summary

We built a responsive investor dashboard **shell** for PREIshare members. Investors can move between Dashboard Home, Portfolio, Deals, and Profile without hunting through cluttered pages. Numbers and lists use **mock data** so the UI can be demoed before any live backend.

This is not a signed-in product and not a live portfolio. The dollars on screen are sample figures typed into the app.

## What shipped

- TanStack Start + TypeScript app at the repo root. Package name: `preishare-investor-dashboard`.
- File-based routes:
  - `/dashboard` (home) — `src/routes/dashboard/index.tsx`
  - `/dashboard/portfolio` — `src/routes/dashboard/portfolio.tsx`
  - `/dashboard/deals` — `src/routes/dashboard/deals.tsx`
  - `/dashboard/profile` — `src/routes/dashboard/profile.tsx`
- Shared layout on those routes only: `src/components/layout/AppShell.tsx`, `Sidebar.tsx`, `Header.tsx`, `navConfig.ts`, `NavItems.tsx`. The parent layout is `src/routes/dashboard.tsx`.
- Home widgets: `StatsCard`, `PortfolioSummary`, `RecentActivity`.
- Area shells: `PortfolioTable`, `DealsList`, `ProfileCard` under `src/components/dashboard/`.
- Responsive and basic keyboard support: `src/styles/dashboard.css`, loaded from `src/routes/__root.tsx` next to `src/styles.css`.
- Verification checklist: `docs/verification-checklist.md`.

## How to run locally (cold start)

Package manager is npm (`package-lock.json`). From the project root:

1. `npm install`
2. `npm run dev` — this runs `vite dev --port 3000`
3. Open http://localhost:3000/dashboard

`npm run typecheck` runs `tsc --noEmit`. There is no `test` or `lint` script.

## Short demo script

1. Land on `/dashboard`. Point at Total portfolio value ($300,000) and Open deals (3). Say these are sample numbers.
2. Use the sidebar: Portfolio, Deals, then Profile. The header title should change with the page. The current link should look active.
3. Narrow the window below 768px. The sidebar should hide until **Menu** is pressed, then **Close** (or a nav link) hides it again.
4. Say clearly: every value is a Sprint 3 placeholder. Nobody is signed in, and nothing is a live balance.

## Known limitations

- There is no login. Anyone who can open the URL sees the shell.
- Portfolio, deals, profile, and the home figures are mock constants in the component files. They are not live balances.
- Supabase, PostgreSQL, and pgvector are not in this app. Do not demo them as working.
- There is no GitHub Actions workflow and no test or lint script.
- The checklist still marks the narrow screen (about 375px) as Fail: the collapse CSS is in the repo, but that width was not re-checked in the browser after it was added.
- Deal cards say “Open” and “Closing soon”, not the brief’s “live”, “under offer”, and “sold”.
- This is not production-hardened. There is no deploy gate, no error boundary for failed data, and no loading state, because there is no data API.

## Recommended next-sprint work

1. Supabase auth and a gate on `/dashboard/*`.
2. Replace the mock widgets with live portfolio and deals queries.
3. pgvector search only after deals or documents actually live in Postgres.
4. Add a test and lint script, then GitHub Actions that runs install and `npm run typecheck` on pull requests.
5. Empty, loading, and error states once those queries exist.
6. Re-check the shell at about 375px and update `docs/verification-checklist.md` L2 and L3.

## References

- Client brief: `docs/investor-dashboard-brief.md`
- IA: `docs/dashboard-ia.md`
- Components: `docs/component-plan.md`
- Verification: `docs/verification-checklist.md`
- Architecture decisions: `docs/architecture-decisions.md`
