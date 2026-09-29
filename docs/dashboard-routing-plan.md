# PREIshare Dashboard Routing Plan

## Purpose

Map investor-facing dashboard URLs to TanStack Start route files. This is a map of the files that already exist. It does not add or delete routes.

Source requirements: `docs/preishare-dashboard-requirements.md`.

## Current app inventory (as found)

| File / folder | Likely URL | Notes |
| --- | --- | --- |
| `src/routes/__root.tsx` | (app root layout) | Wraps every page with the site header and footer. Do not replace it. |
| `src/routes/index.tsx` | `/` | Existing starter home. Not the investor dashboard. |
| `src/routes/about.tsx` | `/about` | Existing about page. Leave it. |
| `src/routes/dashboard.tsx` | `/dashboard` layout | Shared investor shell. Renders child pages in an outlet. Not a separate page. |
| `src/routes/dashboard/index.tsx` | `/dashboard` | Investor home: metric cards, portfolio mix, recent activity. |
| `src/routes/dashboard/portfolio.tsx` | `/dashboard/portfolio` | Holdings table page inside the shell. |
| `src/routes/dashboard/deals.tsx` | `/dashboard/deals` | Open deals list inside the shell. |
| `src/routes/dashboard/profile.tsx` | `/dashboard/profile` | Profile card inside the shell. |

## Planned dashboard route tree

```text
/dashboard                 → layout (src/routes/dashboard.tsx: header + sidebar + outlet)
/dashboard                 → index (src/routes/dashboard/index.tsx: metrics, portfolio summary, activity)
/dashboard/portfolio       → child page (holdings placeholder)
/dashboard/deals           → child page (deals placeholder)
/dashboard/profile         → child page (profile placeholder)
```

Activity stays on the home page. The requirements brief does not ask for a separate activity URL.

## File map (exact files to create in a later step)

No new dashboard route files are needed for this shell. Creating a second layout such as `src/routes/dashboard/route.tsx` would sit beside `src/routes/dashboard.tsx` and should not be added.

| URL | Role | File (already present) | Wraps / renders |
| --- | --- | --- | --- |
| `/dashboard` | Layout route | `src/routes/dashboard.tsx` | Shared dashboard chrome; renders the child via Outlet |
| `/dashboard` | Index page | `src/routes/dashboard/index.tsx` | Investor home content |
| `/dashboard/portfolio` | Child page | `src/routes/dashboard/portfolio.tsx` | Holdings placeholder |
| `/dashboard/deals` | Child page | `src/routes/dashboard/deals.tsx` | Deals placeholder |
| `/dashboard/profile` | Child page | `src/routes/dashboard/profile.tsx` | Profile placeholder |

## Layout vs page responsibilities

- **Layout (`src/routes/dashboard.tsx`)**: persistent chrome only (sidebar, header, main outlet). No metric cards in this file.
- **Index (`src/routes/dashboard/index.tsx`)**: dashboard home. Metric cards, portfolio summary, and recent activity. Uses the parent layout.
- **Child pages**: small pages so Home, Portfolio, Deals, and Profile each have a real URL. They render inside the layout, not instead of it.

## Navigation labels (for sidebar / mobile nav later)

| Label | Path | Requirement link |
| --- | --- | --- |
| Home | `/dashboard` | Investor home base, portfolio numbers, and recent activity |
| Portfolio | `/dashboard/portfolio` | Holdings list for this investor |
| Deals | `/dashboard/deals` | Open deals the investor can scan |
| Profile | `/dashboard/profile` | Name and contact placeholders |

Labels match the requirements brief: Home, Portfolio, Deals, Profile. They are already listed in `src/components/layout/navConfig.ts`.

## Out of scope for this plan

- New route files, including `/dashboard/activity` and `src/routes/dashboard/route.tsx`
- Deleting `src/routes/index.tsx`, `src/routes/about.tsx`, or any dashboard file
- Component prop designs and styling
- Auth guards, login, or signup routes
- API routes and Supabase queries

## Success criteria for implementation steps

- Visiting `/dashboard` shows the layout shell and the home index content inside it.
- `/dashboard/portfolio`, `/dashboard/deals`, and `/dashboard/profile` render inside that same layout.
- `/` and `/about` stay as they are.
- No existing route file is deleted.

## Open questions

- The site root header (from `__root.tsx`) still sits above the investor shell. The requirements brief describes one dashboard header. Both are on screen today.
- A later sprint might want `/dashboard/activity` for a full activity feed. This plan does not add it, because activity is a region on the home page for now.
- The narrow-width menu check in `docs/verification-checklist.md` is still open. That is a browser check, not a missing route.
