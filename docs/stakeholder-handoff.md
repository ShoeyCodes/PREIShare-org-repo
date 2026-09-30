# PREIshare Investor Dashboard — Stakeholder Handoff

**Sprint focus:** Responsive investor dashboard shell (TanStack Start routes + React UI)
**Audience:** PREIshare product stakeholders and the next implementation topic owners
**Date:** 2026-09-30
**Prepared by:** Brayden Shoemaker

## 1. Demo today (what investors can click)

- Visit `/dashboard` to open the investor home inside the app shell.
- Live entry points are `src/routes/dashboard/route.tsx` (shell) and `src/routes/dashboard/index.tsx` (home).
- Desktop: a dark sidebar with Home, Portfolio, Deals, and Profile, plus the PREIshare header.
- Narrow widths: the sidebar is hidden. An **Open menu** / **Close menu** button shows the same four links.
- Home composition shows:
  - Three metric cards with the placeholder value `—` and a hint that live totals are not connected
  - A portfolio summary region with an empty-list message
  - A recent activity region with an empty-list message
- Portfolio, Deals, and Profile are separate pages inside the same shell.

**Out of scope for this demo:** live Supabase data, login/auth gates, editing holdings, or production deployment hardening.

## 2. Requirements traceability

| Success criterion (from requirements brief) | Status | Evidence |
| --- | --- | --- |
| An investor can open `/dashboard` in the browser. | Met | `src/routes/dashboard/route.tsx`, `src/routes/dashboard/index.tsx`; `docs/responsive-qa-checklist.md` (tested at `http://localhost:3000/dashboard`) |
| On a desktop width, the header, navigation, metrics, and activity are visible. | Met | `docs/responsive-qa-checklist.md` D1–D5; `src/components/dashboard/AppShell.tsx`, `Sidebar.tsx`, `MetricCard.tsx`, `RecentActivity.tsx` |
| On a narrow phone width, navigation still works (the menu can open and close). | Met | `src/components/dashboard/MobileNav.tsx`; QA rows M4–M5 |
| Sample content is labeled so people know the data is not live. | Met | Hints and empty messages in `src/routes/dashboard/index.tsx` |
| The built pages match this brief. No extra finance features. | Partial | Routes and four labels match `docs/preishare-dashboard-requirements.md`. No payments, charts, or trades. Header title stays “Dashboard” instead of the section name. The site header from the root layout still sits above the shell. |
| A teammate can read this brief and know the scope in under five minutes. | Met | `docs/preishare-dashboard-requirements.md` |

## 3. Decisions made (so the next topic does not re-litigate them)

- **Routing:** `/dashboard` is the layout in `src/routes/dashboard/route.tsx`. The home page is `src/routes/dashboard/index.tsx`. Portfolio, Deals, and Profile are child routes. There is no `/dashboard/activity` route.
- **One layout file:** `route.tsx` is the only `/dashboard` layout. A second layout file at that same path crashes the app.
- **Shell regions:** `AppShell` places Header, Sidebar, MobileNav, and the main slot. Home widgets stay in `index.tsx` so they do not also appear on Portfolio, Deals, and Profile.
- **Widgets:** `MetricCard`, `PortfolioSummary`, and `RecentActivity` are presentational. Later data wiring should pass props into them.
- **Responsive approach:** Below 768px the sidebar is hidden and MobileNav is the menu. From 768px up the sidebar shows and the mobile menu hides. Metric cards go from one column to two, then three. On large screens the summary and activity regions sit side by side.

## 4. Known limitations (honest baseline)

- **Mock data only:** Metric values are `—`. Portfolio and activity lists are empty. These are not PostgreSQL or Supabase figures.
- **Auth not wired:** Anyone can open the shell routes. The “Investor” chip in the header is a label only. There is no session and no role check.
- **No mutations:** The shell is read-only. Nothing on these screens saves a change.
- **QA residual risks:** The root site header still sits above the dashboard shell. Empty lists are the current demo, so long names and full activity rows were not re-checked.
- **Section title:** The dashboard header does not yet switch to the page name when the investor moves to Portfolio, Deals, or Profile.

## 5. Recommended next sprint work

1. Connect loaders and server functions to Supabase for real portfolio and activity reads.
2. Add authentication and protect `/dashboard` for signed-in investors only.
3. Replace placeholder props with typed data shapes. Keep the presentational components stable.
4. Re-run `docs/responsive-qa-checklist.md` with real content lengths (long names, empty lists, and full lists).
5. Set the header title from the current path, and decide whether the root site header stays above the shell.
6. Demo script: one happy path on a phone width and one on a desktop width, using a real portfolio fixture.

## 6. Artifact index (for handoff package)

- Requirements: `docs/preishare-dashboard-requirements.md`
- Routing plan: `docs/dashboard-routing-plan.md`
- Component architecture: `docs/dashboard-component-architecture.md`
- Responsive QA: `docs/responsive-qa-checklist.md`
- Routes: `src/routes/dashboard/route.tsx`, `src/routes/dashboard/index.tsx`
- Shell: `src/components/dashboard/AppShell.tsx`, `Header.tsx`, `Sidebar.tsx`, `MobileNav.tsx`
- Home widgets: `src/components/dashboard/MetricCard.tsx`, `PortfolioSummary.tsx`, `RecentActivity.tsx`
