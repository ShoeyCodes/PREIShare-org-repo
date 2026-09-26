# PREIshare Investor Dashboard — Information Architecture

## Purpose

Map of investor-facing pages for the dashboard shell (mock data only).
No auth flows, admin tools, or live API contracts in this sprint.

The investor is the only audience. Deals they see are live, under offer, or sold. Drafts and archived listings stay off these screens. This document names URLs and page purpose only. It does not build the screens.

## URL map and page purposes

| URL path | Route name | Nav label | Page purpose | Primary content |
|----------|------------|-----------|--------------|-----------------|
| `/dashboard` | Dashboard home | Home | Quick scan of portfolio value and activity | Stats row, portfolio summary, recent activity |
| `/dashboard/portfolio` | Portfolio | Portfolio | Review holdings at a glance | Portfolio table (mock rows) |
| `/dashboard/deals` | Deals | Deals | See open / featured deals | Deals list (mock cards or rows) |
| `/dashboard/profile` | Profile | Profile | View member profile details | Profile card (mock member fields) |

## Navigation rules

- Shared chrome: left sidebar (desktop) + top header; main content on the right/below.
- Active nav item should match the current URL path.
- Labels stay short and investor-friendly (Home, Portfolio, Deals, Profile).
- Nested under `/dashboard` so a parent layout can wrap all investor pages.
- Home is `/dashboard`, not a fifth path such as `/dashboard/home`.
- On a narrow screen the shell stacks or collapses the sidebar. Page content stays readable, with no overlapping panels.
- There are no other investor pages in this shell.

## Out of scope for this shell

- Sign-in / sign-up pages
- Live Supabase queries
- Admin or sponsor tools
- Payments or document vaults

## Notes for later route files

Parent layout route: `dashboard`  
Child routes: index (home), `portfolio`, `deals`, `profile`
