# Architecture Decisions — PREIshare Dashboard Shell (Sprint 3)

## ADR-001: TanStack Start with file-based routes

- **Context:** Each investor area needs its own URL, and later data loading should attach to that URL.
- **Decision:** Use TanStack Start and TypeScript. Routes are files under `src/routes/`. Dashboard URLs are `/dashboard`, `/dashboard/portfolio`, `/dashboard/deals`, and `/dashboard/profile`.
- **Consequences:** The address bar matches `docs/dashboard-ia.md`. A later loader or server function can be added on a route file without replacing the router. `src/routeTree.gen.ts` is generated (`npm run generate-routes`); do not edit it by hand.

## ADR-002: Shared AppShell layout

- **Context:** Home, Portfolio, Deals, and Profile need the same sidebar, header, and main region.
- **Decision:** `AppShell`, `Sidebar`, and `Header` live in `src/components/layout/`. Only `src/routes/dashboard.tsx` wraps those pages with `AppShell`. The site root (`src/routes/__root.tsx`) keeps the existing site header and footer.
- **Consequences:** Dashboard pages only render their own content. The marketing home at `/` is outside the investor shell. A layout fix for investors happens in the layout components, not in four page files.

## ADR-003: Central nav config

- **Context:** Labels, paths, the active link, and the header title must not drift apart.
- **Decision:** `src/components/layout/navConfig.ts` is the only list of labels, paths, and titles. `NavItems.tsx` renders TanStack Router links and the active state. `Header.tsx` calls `getPageTitle` for the current path.
- **Consequences:** A new investor page needs a route file and one entry in that list. Home is active only on exact `/dashboard` (or `/dashboard/`). Other items also match a longer path under their URL.

## ADR-004: Mock data boundary for the shell

- **Context:** Sprint 3 is a UI shell. The brief forbids live finance data.
- **Decision:** Sample rows are constants inside the dashboard components (`DEFAULT_MOCK_HOLDINGS`, `DEFAULT_MOCK_ACTIVITY`, and the table, deals, and profile defaults). Components take plain props. There is no fake API and no Supabase client.
- **Consequences:** A later sprint can replace those constants at the component or route boundary. Nothing in this shell pretends a balance was loaded from a database.

## ADR-005: Responsive CSS and an accessibility baseline

- **Context:** Investors will open this on a phone and a laptop, and the nav has to be reachable by keyboard.
- **Decision:** `src/styles/dashboard.css` sets the shell, a 1 / 2 / 3 column card grid, a sideways-scrolling table wrapper, 44px targets, and `:focus-visible` outlines. Below 768px the sidebar stays collapsed until the header **Menu** button sets `nav-open`. The button uses `aria-expanded` and `aria-controls="investor-sidebar"`.
- **Consequences:** The pattern is in the repo. `docs/verification-checklist.md` still marks the ~375px check as Fail because that width was not re-opened in the browser after the CSS landed. This is not a full accessibility audit.

## Next-sprint foundations (do not reverse casually)

| Foundation | Why it builds on this shell |
| --- | --- |
| Supabase auth | Protect `/dashboard/*` and personalize the header and profile. The shell has no login today. |
| Live portfolio data | Swap the mock constants in the home widgets and `PortfolioTable` for route loaders or server functions. |
| pgvector search | Add search on deals or documents only after those rows exist in Postgres. |
| GitHub Actions CI | This package has `npm run typecheck` and no test or lint script. Add those before a workflow that only pretends to run tests. |

## Explicit non-goals for Sprint 3

- Real money movement, trading, or compliance workflows
- A finished visual brand system
- Production deployment hardening
- Working Supabase auth, live balances, or pgvector search
