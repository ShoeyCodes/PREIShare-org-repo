# PREIshare Investor Dashboard Shell — Verification Checklist

**Sprint:** 3 (TanStack Start UI shell)  
**Verifier:** Brayden Shoemaker  
**Date:** 2026-09-26  
**App URL tested:** http://localhost:3000  
**Sources of truth:** `docs/investor-dashboard-brief.md`, `docs/dashboard-ia.md`, `docs/component-plan.md`

## How to use this checklist

- **Pass** — requirement met; evidence describes what you saw.
- **Fail** — in-scope shell issue; fix before handoff or note the fix commit.
- **Deferred** — intentionally out of scope for this sprint; reason required.

No separate raw walkthrough note was in the repo. Evidence below uses the desktop Profile screenshot from this build (sidebar, active Profile link, header “Your profile”) and the routes and components on `main` through `3b1b50b`. A full click-through at 375px was not repeated after the responsive stylesheet landed, so those rows stay Fail until someone looks at that width.

---

## 1. Routing and information architecture

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| R1 | `/dashboard` (or agreed home) loads dashboard home inside AppShell | Pass | `src/routes/dashboard.tsx` wraps child routes in `AppShell`. `src/routes/dashboard/index.tsx` renders the stats row, portfolio summary, and recent activity. Header title from `navConfig` is “Dashboard overview”. |
| R2 | `/dashboard/portfolio` loads portfolio page shell | Pass | `src/routes/dashboard/portfolio.tsx` renders `PortfolioTable` inside the same shell. IA path is `/dashboard/portfolio`, not `/dashboard/home`. |
| R3 | `/dashboard/deals` loads deals page shell | Pass | `src/routes/dashboard/deals.tsx` renders `DealsList`. |
| R4 | `/dashboard/profile` loads profile page shell | Pass | Desktop screenshot showed `/dashboard/profile` inside the shell: PREIshare sidebar, header “Your profile”, and profile copy. The extra “Profile” heading under the header was removed in `2d26eeb`. |
| R5 | Unknown paths do not break the whole app (sensible fallback or framework 404) | Pass | No extra investor routes were added. An unknown URL is left to TanStack Router’s unmatched-route fallback; it is not a custom crash screen. Not clicked in this session. |

**IA notes:** The four URLs and nav labels match `docs/dashboard-ia.md`: Home, Portfolio, Deals, Profile. Header titles are the longer phrases in `navConfig` (“Dashboard overview”, “Your portfolio”, “Open deals”, “Your profile”), not a second copy of the short nav label. Deal cards use “Open” and “Closing soon”. The brief and component plan describe investor-facing deals as live, under offer, or sold. That wording difference is polish, not a new page.

---

## 2. Navigation labels and active states

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| N1 | Sidebar/nav labels match brief/IA (Home/Dashboard, Portfolio, Deals, Profile) | Pass | `dashboardNavItems` labels are Home, Portfolio, Deals, and Profile. The Profile screenshot showed those four links. |
| N2 | Active nav item highlights the current route | Pass | Profile screenshot showed an underline on Profile only. `NavItems` marks Home only on exact `/dashboard` or `/dashboard/`, and the other items on that path or a longer path under it. Active links set `aria-current="page"`. |
| N3 | Header page title updates when changing routes | Pass | Header calls `getPageTitle` from the same list. Profile screenshot showed “Your profile”, which is the Profile entry’s title. |
| N4 | Nav links use client routing (no full page reload flash if applicable) | Pass | Sidebar links are TanStack Router `Link`s (`to` from `navConfig`), not plain `<a href>` jumps. Reload flash was not timed in the browser. |

---

## 3. Layout shell and responsiveness

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| L1 | AppShell shows sidebar + header + main content on desktop | Pass | Profile screenshot: PREIshare sidebar on the left, “Your profile” header, main copy to the right. `AppShell` still renders sidebar, header, and `<main id="main-content">`. |
| L2 | Narrow viewport: nav remains usable (collapse, drawer, or stacked pattern) | Fail | `src/styles/dashboard.css` collapses `.dash-sidebar` below 768px until `.nav-open`, and the header **Menu** button sets `aria-expanded` and `aria-controls="investor-sidebar"`. That width was not opened in the browser after `3b1b50b`. |
| L3 | No permanent horizontal scroll on home/portfolio/deals/profile at ~375px width | Fail | Portfolio table sits in `dash-table-wrap` so the table can scroll inside the page. 375px was not measured, so page-level overflow is unconfirmed. |
| L4 | Main content remains readable; cards/tables stack or scroll intentionally | Pass | Home stats use `dash-card-grid`: one column, two from 640px, three from 1024px. Holdings table scrolls inside `.dash-table-wrap`. Desktop profile content was readable in the screenshot. |
| L5 | Basic accessibility: buttons/links are keyboard-focusable; interactive controls have accessible names | Pass | Nav links are real `Link`s. The narrow-screen control is a button labeled Menu or Close, with `aria-expanded` and `aria-controls`. The dimmed layer is a button named “Close navigation”. `:focus-visible` outlines are in `dashboard.css`. Keyboard path was not tabbed in the browser. |

---

## 4. Mock content clarity (demo readiness)

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| M1 | Dashboard home: stats cards show labeled mock investor metrics | Pass | Home renders Total portfolio value ($300,000, “Sample total”), Open deals (3, “Sample count”), and Contributions YTD ($24,000, “Sample YTD”), plus the note “Demo shell — all figures are placeholders”. |
| M2 | Portfolio summary / table shows clear placeholder holdings | Pass | Home summary lists Sample Multifamily Fund A, Sample Industrial Note B, and Sample Cash Reserve, with a sample-data banner. Portfolio page table lists Riverfront Lofts and Cedar Business Park with USD amounts. |
| M3 | Deals list shows open-deal style placeholders | Pass | Harbor View Residences (Tampa, FL, Open, min. $25,000) and Summit Logistics Hub (Columbus, OH, Closing soon, min. $50,000). Empty list copy is “No open deals right now.” |
| M4 | Profile card shows member-style placeholder fields | Pass | Alex Morgan, alex.morgan@example.com, Preferred investor, Email, and a notes line about multifamily and industrial deals. |
| M5 | No raw "TODO" / empty broken panels on primary views | Pass | The old “Placeholder for …” paragraphs were replaced by these sections. No TODO text remains on the four dashboard pages. |

---

## 5. Out-of-scope boundaries (must stay deferred)

| ID | Check | Status | Evidence / reason |
|----|--------|--------|-------------------|
| O1 | No real authentication / login gate required for shell demo | Deferred | Brief and IA: shell only, no sign-in. None was added. Missing auth is not a Fail. |
| O2 | No live Supabase/PostgreSQL data — mock data only | Deferred | Brief forbids live portfolio or deals data this sprint. Widgets use in-file sample constants. No Supabase client is wired. |
| O3 | No production deploy required for this verification | Deferred | Checklist target is http://localhost:3000. Deploy hardening is out of scope in the brief. |
| O4 | No payment, document vault, or admin tools added beyond brief | Pass | Routes stay the four IA pages. No checkout, vault, or admin screens shipped. |

---

## 6. Defects found and resolution

| Defect | Severity (blocker / polish) | Resolution | Re-check |
|--------|----------------------------|------------|----------|
| Duplicate “Profile” heading under “Your profile” | polish | Removed the section headings on Home, Portfolio, Deals, and Profile in `2d26eeb`. Header title is the bold page name. | Pass on the code; screenshot was taken before that commit. |
| Narrow shell (375px / under 768px) not re-checked after the menu change | polish | Collapse, Menu/Close toggle, and table scroll wrapper are in `3b1b50b`. Still need a browser pass at about 375px. | Open (L2, L3) |
| Deal status words are “Open” / “Closing soon”, while the brief says live, under offer, or sold | polish | Left as the deals scaffold. No extra page. | Open |

No blocker fails. Auth and live data are Deferred, not Fail.

---

## 7. Sign-off for handoff

- [x] All **blocker** fails fixed or explicitly accepted with reason
- [x] Deferred items only cover agreed out-of-scope work
- [ ] Shell is demoable against the PREIshare client story for Sprint 3

**Overall result:** Not ready (list blockers)

The open item is a check, not a product blocker: confirm at about 375px that the sidebar stays collapsed until Menu is pressed, and that the home, portfolio, deals, and profile pages do not scroll sideways as a whole page. After that pass, the demo checkbox can be checked.

**Verifier signature:** __________________
