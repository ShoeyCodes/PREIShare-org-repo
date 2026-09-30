# Sponsor Auth & Property Listings — Requirements Brief (Sprint 4)

This brief is a product contract for a beginner TanStack Start + React + TypeScript app. It does not add SQL, env files, or login screens.

## Client story (restated)

PREIshare is a real-estate intelligence product. Sponsors need a secure way to sign in to the dashboard and manage real property listings stored in PostgreSQL. Secret keys and privileged database access must stay on the server and never ship in the browser bundle.

Today the dashboard is an investor shell. It shows placeholder numbers and sample deals. It does not sign anyone in, and it does not save listings.

## Actors

| Actor | Goal |
| --- | --- |
| Sponsor | Sign up / log in, create and view their property listings |
| Unauthenticated visitor | Reach login/signup only; cannot see listing data |
| System (server) | Enforce session checks, talk to Supabase with correct keys |

## Goals for this sprint

1. Sponsors can register and log in (email/password or equivalent Supabase Auth).
2. Dashboard routes that show listings require a valid session.
3. Property listings are stored in Postgres (not mock arrays in the client).
4. Sponsors can create and read listings that belong to them.
5. Environment secrets are separated: publishable/anon values may be client-safe; service-role and other secrets stay server-only.

## Out of scope (defer)

- Payment processing, document uploads, full admin roles
- Social OAuth providers beyond what Supabase email auth covers
- Production custom domain / multi-tenant orgs
- Investor-only browsing rules, charts, and editing holdings from the earlier shell sprint
- SQL, env files, and login components in this brief

## Current dashboard observations

- Framework: TanStack Start + React + TypeScript (existing scaffold).
- Routes found:
  - `/` — `src/routes/index.tsx`
  - `/about` — `src/routes/about.tsx`
  - `/dashboard` — layout `src/routes/dashboard/route.tsx` (shell + outlet)
  - `/dashboard` — home `src/routes/dashboard/index.tsx`
  - `/dashboard/portfolio` — `src/routes/dashboard/portfolio.tsx`
  - `/dashboard/deals` — `src/routes/dashboard/deals.tsx`
  - `/dashboard/profile` — `src/routes/dashboard/profile.tsx`
- Listings today: not in Postgres. `src/components/dashboard/DealsList.tsx` uses a hardcoded `mockDeals` array. `PortfolioTable.tsx` and `ProfileCard.tsx` use their own mock constants. The home page passes empty arrays into `PortfolioSummary` and `RecentActivity`. `src/fixtures/sample-investor-listings.ts` is typed sample data for TypeScript, not a database.
- Auth today: none. `src/components/dashboard/Header.tsx` shows a labeled “Investor” placeholder. The comment in that file says it is not real auth state. Any visitor can open `/dashboard`.
- Gaps this sprint must close: login/signup, session-aware dashboard shell, Postgres-backed list + create flows, env separation.

## Success criteria (how we know it worked)

- [ ] A sponsor can sign up and log in and is redirected to a protected dashboard.
- [ ] Logged-out users cannot open protected dashboard listing pages.
- [ ] Creating a listing persists it in Postgres and it appears after refresh.
- [ ] A sponsor only sees their own listings (row-level security intentional).
- [ ] No service-role or other secret key appears in client bundle or committed `.env`.
- [ ] `.env.example` documents required variables without real secret values.

## Server-only boundary (must not ship to the browser)

- Supabase **service role** key (and any other privileged secrets)
- Direct privileged DB URLs if used outside Supabase client helpers
- Any server-only env vars used for admin or bypass operations

Client-safe (when intentionally exposed by Supabase design):

- Project URL
- Anon / publishable key (still respect RLS; never treat as a secret bypass)

## Implementation notes for later prompts

- Prefer server loaders/actions in TanStack Start for reads/writes that need the user session or privileged checks.
- Data model and RLS policies will be designed in later steps; this brief only locks the product contract.
- Handoff later should map deliverables back to the goals and success criteria above.
