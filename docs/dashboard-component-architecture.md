# PREIshare Dashboard — Component Architecture & Responsive Layout Map

## Purpose

Blueprint for the investor dashboard **shell** only. Later UI work should use these names, regions, and screen sizes. Placeholder content is fine. This file does not contain implementation code.

## Sources

- `docs/preishare-dashboard-requirements.md`
- `docs/dashboard-routing-plan.md`

Navigation labels and paths must match the routing plan: Home `/dashboard`, Portfolio `/dashboard/portfolio`, Deals `/dashboard/deals`, Profile `/dashboard/profile`.

## Layout regions

| Region | Role | Typical components |
|--------|------|--------------------|
| Header | Top bar: page title for the section the investor is in | Header |
| Sidebar | Vertical nav on tablet and desktop | Sidebar |
| Mobile nav | Menu button and drawer on a narrow screen | MobileNav |
| Main | Scrollable page content for the active route | Route outlet + widgets |

AppShell is the frame that places Header, Sidebar, MobileNav, and Main together. The home widgets (metric cards, portfolio summary, recent activity) belong in the main area of `/dashboard` only. They do not belong in the layout shell, or they would also show on Portfolio, Deals, and Profile.

## Component inventory

### AppShell

- **Responsibility:** Outer dashboard frame. Arranges the header, the nav, and the main area.
- **Parent:** Dashboard layout route (`src/routes/dashboard/route.tsx` when that file exists; `src/routes/dashboard.tsx` until then).
- **Children:** Header, Sidebar, MobileNav, and the main content slot.
- **Props:** `children` (the page content to show in main).

### Header

- **Responsibility:** Top bar with the title of the current section (for example “Your portfolio”).
- **Parent:** AppShell.
- **Children:** none required.
- **Props:** `title` (text, optional). When it is left off, the title comes from the current path in the routing plan.

### Sidebar

- **Responsibility:** Navigation links on tablet and desktop. Labels are Home, Portfolio, Deals, and Profile.
- **Parent:** AppShell.
- **Children:** one link per routing-plan item.
- **Props:** `items` (a list of `{ label, to }`). `label` is the words the investor sees. `to` is the path, such as `/dashboard/deals`.

### MobileNav

- **Responsibility:** The same four destinations on a small screen. A menu button opens a panel. Closing the panel or choosing a link hides it.
- **Parent:** AppShell.
- **Children:** the same destinations as Sidebar.
- **Props:** `items` (same shape as Sidebar). `open` (yes or no) and `onClose` (what runs when the investor closes the panel). AppShell keeps track of whether the panel is open.

### MetricCard

- **Responsibility:** One reusable tile: a label, a value, and an optional hint. The home page uses the same card three times with different text. Do not make a separate component for each number.
- **Parent:** Dashboard home (main).
- **Props:** `label` (text), `value` (text), `hint` (text, optional).

### PortfolioSummary

- **Responsibility:** A short snapshot of how the sample portfolio is split. Not the full holdings table. That table lives on `/dashboard/portfolio`.
- **Parent:** Dashboard home.
- **Props:** `headline` (text), `summaryLines` (a list of text lines), `emptyMessage` (text shown when there are no lines).

### RecentActivity

- **Responsibility:** A short list of recent sample events on the home page. Not its own route.
- **Parent:** Dashboard home.
- **Props:** `items` (a list of `{ id, title, detail, timestamp }`), `emptyMessage` (text shown when the list is empty).

## Composition (dashboard home)

The home page (`src/routes/dashboard/index.tsx`) fills the main slot in this order:

1. A row of MetricCard tiles (three placeholders).
2. PortfolioSummary.
3. RecentActivity.

Each widget needs a clear empty message so a stakeholder can tell that live data is not connected. Sample numbers are allowed. They are still placeholders.

## Responsive behavior

| Viewport | Approx width | Nav behavior | Main content |
|----------|--------------|--------------|--------------|
| Mobile | under 768px | Sidebar hidden. MobileNav opens from a menu button. | One column. Cards stack. |
| Tablet | 768px to 1024px | Sidebar visible and a bit narrower. MobileNav stays closed. | Two card columns when there is room. |
| Desktop | over 1024px | Sidebar visible and stays in the shell. | Three card columns. Summary and activity stack, with a comfortable reading width. |

Notes for implementers:

- The menu button must be easy to tap, about 44px tall.
- Main content scrolls. The header must not cover it.
- Do not hide a required action behind hover. Phones have no hover.
- Wide tables scroll sideways inside the page. The whole page should not scroll sideways.

## File targets (for later steps — do not create them in this step)

- `src/components/dashboard/AppShell.tsx`
- `src/components/dashboard/Header.tsx`
- `src/components/dashboard/Sidebar.tsx`
- `src/components/dashboard/MobileNav.tsx`
- `src/components/dashboard/MetricCard.tsx`
- `src/components/dashboard/PortfolioSummary.tsx`
- `src/components/dashboard/RecentActivity.tsx`

Today the shell pieces live under `src/components/layout/`, and the home tile is named `StatsCard`. A later step should follow the names in this blueprint instead of adding a second set of components with different jobs.

## Out of scope (prevent scope creep)

- Sign-in, roles, or any auth UI
- Live Supabase or PostgreSQL data
- Extra routes, including `/dashboard/activity`
- Charts, maps, PDF export, or editing holdings
- A separate design-system package or heavy animation

## Success criteria for this blueprint

- Each named component has one job.
- Props are plain language: text, a list, or yes/no.
- Mobile, tablet, and desktop nav behavior is explicit.
- Home widgets match the requirements: metrics, a portfolio snapshot, and recent activity.
- The out-of-scope list blocks auth, live data, and extra routes.
