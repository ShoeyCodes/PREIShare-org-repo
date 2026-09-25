# PREIshare Investor Dashboard — Client Brief (Sprint 3 Shell)

## Product summary

In this sprint, PREIshare is for the investor: the person browsing published deals and comparing them, who needs the listing data to be complete and consistent. Internal editors and reviewers are there to make that data trustworthy before it reaches the investor, but they aren't the audience. An investor should only see listings that are live, under offer or sold. Drafts and archived listings stay hidden. For each listing, the essentials should be right up front: the title and a short description, the property type, a status spelled one standard way, a full address, the asking price and currency, and at least one named person they can email or call. Internal-only data and half-finished records shouldn't be in their way.

This sprint delivers the **shell only**: responsive layout, file-based routes, and reusable UI placeholders—not live backend data or authentication. Members should be able to scan portfolio value, browse open deals, and review their profile without hunting through cluttered pages.

## Primary actors

| Actor | Role in this sprint | In scope to build? |
|-------|---------------------|--------------------|
| Investor (member) | Uses the dashboard to scan value, deals, and profile | Yes — primary user |
| Future admin | May manage deals/users later | No — mention only as future actor |

## Investor goals

1. Open the dashboard and immediately see a home overview (portfolio snapshot + recent activity placeholders).
2. Navigate to Portfolio, Deals, and Profile without leaving the app shell.
3. Trust the layout: clear labels, consistent navigation, readable on phone and desktop.

## Must-have dashboard areas (this sprint)

| Area | Route idea (for later steps) | What the investor should see |
|------|------------------------------|------------------------------|
| Home overview | `/dashboard` | Stats cards, portfolio summary placeholder, recent activity list placeholder |
| Portfolio | `/dashboard/portfolio` | Table or list shell for holdings (mock data OK) |
| Deals | `/dashboard/deals` | List shell of open/available deals (mock data OK) |
| Profile | `/dashboard/profile` | Profile card shell (name, contact placeholders) |

## Success criteria (demo-ready shell)

- [ ] Investor can reach Home, Portfolio, Deals, and Profile from persistent navigation.
- [ ] Each area has its own route/page shell with a clear page title.
- [ ] Layout includes sidebar (or equivalent nav), header, and main content region.
- [ ] On a narrow screen, content remains usable (nav collapses or stacks; no broken overlap).
- [ ] Placeholder/mock content is labeled as mock so stakeholders know data is not live.
- [ ] Brief, IA, and UI stay aligned: no surprise pages outside the four areas above.

## Out of scope (explicit non-goals for this sprint)

- Real sign-in / authentication and authorization
- Live Supabase/PostgreSQL portfolio or deals data
- Payments, subscriptions, or document e-sign
- Admin CRUD tools for managing investors or deals
- Production deployment hardening and CI beyond basic project setup

## Prompting notes for later AI steps

When directing a coding-agent or ide-copilot, always attach or quote this brief and
require: TypeScript + TanStack Start file-based routes, reusable React components,
mock data only, and no auth. Reject output that adds pages or features listed under
Out of scope.

## Open questions / assumptions

- Assume English UI copy for the shell.
- Assume a single investor persona viewing their own data (no multi-portfolio switcher yet).
- Visual brand can be simple and professional; full brand system is not required this sprint.
