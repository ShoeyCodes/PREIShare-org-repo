# PREIshare Investor Dashboard — Component Inventory

## Scope

Reusable UI pieces for a responsive shell with **mock data only**.
Components present structure and placeholder content; they do not call real APIs.

Pages are only the four routes in [dashboard-ia.md](dashboard-ia.md). Names in the tables below are locked. Do not rename one without updating both docs.

## Layout components (shared chrome)

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `AppShell` | Page frame: place `Sidebar`, `Header`, and the main content area. On a narrow screen, this frame stacks or collapses the sidebar so content does not overlap. | All `/dashboard/*` pages | Own page-specific widgets, choose nav labels, or fetch data |
| `Sidebar` | Branding plus the primary nav links. Highlight the one item whose path matches the current URL. | `AppShell` | Set the page title, collapse itself, or hardcode deal rows |
| `Header` | Top bar: show the current page title (the nav label for this URL) and a visible “mock data” note. | `AppShell` | Define the nav list, highlight links, or add login / logout |
| `NavItems` / `navConfig` | Single source of the four nav labels and paths: Home, Portfolio, Deals, Profile. | `Sidebar` (and mobile nav if added later). `Header` may read the same list to get the current title. | Render stats, tables, or any UI of its own; add routes |

## Dashboard home widgets

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `StatsCard` | Show one metric label + value (+ optional hint), marked as mock. | Dashboard home (and reusable elsewhere if a later page needs one number) | Fetch data, own page layout, show allocation, or list holdings |
| `PortfolioSummary` | Short snapshot of how the mock portfolio is allocated (a few mix lines, not one headline number). | Dashboard home | Repeat a metric already shown in `StatsCard`, or replace `PortfolioTable` |
| `RecentActivity` | Simple list of recent mock events: a date and one line each. | Dashboard home | Render deal cards, holding rows, or global navigation |

## Page-level shells

| Component | Responsibility | Used on | Must NOT do |
|-----------|----------------|---------|-------------|
| `PortfolioTable` | Tabular mock holdings for this investor. | Portfolio page | Live market data, or appear on Home |
| `DealsList` | List or cards of mock deals that are live, under offer, or sold. Each row can show title, short description, property type, one status, address, asking price and currency, and one named contact. | Deals page | Show drafts or archived listings, or start checkout / subscribe flows |
| `ProfileCard` | Mock member name, contact, and preferences for one investor. | Profile page | Password change, auth, or a portfolio switcher |

## Composition rules

1. One job per component — if two rows describe the same job, merge or delete one.
2. Layout components wrap pages; page widgets never re-implement the shell.
3. Mock data may be inline constants for this sprint; real Supabase comes later.
4. Names above are locked for later agent prompts — do not rename without updating both docs.

## Mapping check (IA ↔ components)

- Home → `StatsCard`, `PortfolioSummary`, `RecentActivity` inside `AppShell`
- Portfolio → `PortfolioTable` inside `AppShell`
- Deals → `DealsList` inside `AppShell`
- Profile → `ProfileCard` inside `AppShell`
