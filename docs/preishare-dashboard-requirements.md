# PREIshare Investor Dashboard — Requirements Brief

## 1. Product context

PREIshare is a real-estate investment product. This sprint is only the investor dashboard shell: a simple home base where an investor can see placeholder portfolio numbers, a short activity list, and links to Portfolio, Deals, and Profile. Placeholders are allowed. This sprint does not include sign-in, payments, or live data.

## 2. Primary actor and goals

- **Actor:** Investor (the member looking at their dashboard). Editors and admins are not the audience this sprint.
- **Goals on first visit:**
  1. See they are in PREIshare (the name is visible).
  2. Move among Home, Portfolio, Deals, and Profile without getting lost.
  3. See a few portfolio numbers at a glance.
  4. Scan a short list of recent activity.

## 3. Primary screens (this sprint)

| Screen | Purpose | In this sprint? |
|--------|---------|-----------------|
| Dashboard home (`/dashboard`) | Shell, metric cards, portfolio mix, recent activity | Yes |
| Portfolio (`/dashboard/portfolio`) | Holdings table with sample rows | Yes |
| Deals (`/dashboard/deals`) | List of sample open deals | Yes |
| Profile (`/dashboard/profile`) | Name and contact placeholders | Yes |
| Login / signup | Sign-in | No (later) |
| Live balances or trades | Real investment tools | No (later) |

## 4. Dashboard layout regions (must describe in UI work)

1. **Header** — page title for the section the investor is in.
2. **Navigation** — sidebar on a wide screen; a Menu button that opens it on a narrow screen.
3. **Metrics region** — cards with summary numbers (placeholders are fine).
4. **Activity region** — a short list of recent items (placeholders are fine).
5. **Main content area** — where Home, Portfolio, Deals, or Profile shows inside the shell.

## 5. Must-have vs later

### Must-have (demoable shell)

- Dashboard pages under `/dashboard`.
- One shared shell: header, navigation, and main content.
- Usable on a phone width and on a desktop width.
- Placeholder metric cards and a recent-activity list on the home page.
- A clear message when a list is empty, and labels that show the numbers are samples.
- Short labels an investor would understand: Home, Portfolio, Deals, Profile.

### Later (not this sprint)

- Live database numbers or search.
- Sign-in, roles, and permissions.
- Payments, a document vault, or tax exports.
- A full brand system, or charts that need live history.

## 6. Success criteria (how we know the shell is done)

- [ ] An investor can open `/dashboard` in the browser.
- [ ] On a desktop width, the header, navigation, metrics, and activity are visible.
- [ ] On a narrow phone width, navigation still works (the menu can open and close).
- [ ] Sample content is labeled so people know the data is not live.
- [ ] The built pages match this brief. No extra finance features.
- [ ] A teammate can read this brief and know the scope in under five minutes.

## 7. Notes for AI-assisted build

- Point every build prompt at this file so the work stays in scope.
- Build in small steps: routes, then the shell, then nav, then the home widgets, then the other pages, then a phone-width check.
- Do not add sign-in, payments, or live data unless someone asks.
