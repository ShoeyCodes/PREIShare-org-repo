# Sprint 4 — Auth & Listings Verification Checklist

**Project:** PREIshare dashboard  
**Date:** 2026-10-01  
**Verifier:** Brayden Shoemaker  
**Environment:** local dev + the Supabase project named in `.env.local` (ref not recorded; no secrets)

Aligned with `docs/setup/supabase-env-checklist.md` and `docs/data-model/rls-policy-review.md`.

## How to use this doc
Mark each row **PASS** or **FAIL**. Under Evidence, write what you did and what you saw.
If FAIL, note the fix prompt used and re-test before marking PASS.

A FAIL prompt names only the symptom and the file path, and asks for the smallest safe fix. Example: “User B can read User A listings—review RLS policies in `supabase/migrations/20250321000000_property_listings.sql` and server queries in `src/server/listings.ts`; do not weaken RLS.” Never paste live API keys into that prompt.

Rows left blank were not run. Do not mark them PASS from the migration file alone.

---

## 1. Database & migration

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 1.1 | `property_listings` exists in Supabase | PASS | Anon REST read of `id`, `owner_id`, `title`, `description`, `address_line1`, `city`, `region`, `postal_code`, `country`, `price`, `status`, `created_at`, `updated_at` returned HTTP 200. `content-range` was `*/0` (no rows). |
| 1.2 | RLS is **enabled** on the listings table | | Not run. Did not open Table Editor or query `pg_policies`. An empty anon read does not prove RLS is on. |
| 1.3 | Policies match `docs/data-model/rls-policy-review.md` (`listings_select_own`, `listings_insert_own`, `listings_update_own`, `listings_delete_own`; authenticated; `owner_id = auth.uid()`; no `USING (true)`; no anon policy) | | Not run against the live database. Policy names were not listed from Postgres. |
| 1.4 | Migration file present: `supabase/migrations/20250321000000_property_listings.sql` | PASS | Path exists in the repo. |

## 2. Authentication & session

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 2.1 | Sponsor can sign up with email/password | | Not run. |
| 2.2 | Sponsor can log in via `src/routes/auth/login.tsx` | | Not run. |
| 2.3 | Signed-out user hitting `/dashboard` (or `/dashboard/listings`) is redirected to login | | Not run. |
| 2.4 | Sign-out clears session; protected pages no longer load data | | Not run. |

## 3. Listings happy path (User A)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 3.1 | Create listing via UI (title, address fields, city, price per `src/lib/listings/schema.ts`) succeeds | | Not run. |
| 3.2 | New row visible on `src/routes/dashboard/listings/index.tsx` | | Not run. |
| 3.3 | Data matches Postgres (Supabase Table Editor), not mock arrays in the client | | Not run. The list page calls `listMyListings` in `src/server/listings.ts`; that path was not exercised in the browser. |
| 3.4 | Server path used: create/read go through `src/server/listings.ts` | | Not run. No network or server log from a create or list in the UI. |

## 4. Row Level Security (User B)

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 4.1 | Second account User B can sign up / log in | | Not run. |
| 4.2 | User B **cannot** see User A’s listings in the UI | | Not run. |
| 4.3 | Direct read as User B shows no foreign rows | | Not run. |
| 4.4 | User B can create their own listing and only see their own | | Not run. |

## 5. Secret-hygiene audit

Wording follows `docs/setup/supabase-env-checklist.md`: browser-safe names are `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. `SUPABASE_SERVICE_ROLE_KEY` has no `VITE_` prefix and bypasses row-level security.

| # | Check | Result | Evidence |
|---|--------|--------|----------|
| 5.1 | `.env` with real values is **not** committed (`git status` / `git check-ignore`) | PASS | `.gitignore` ignores `.env`, `.env.*` except `!.env.example`, and `*.local`. `git check-ignore` ignores `.env` and `.env.local`. `git ls-files` tracks only `.env.example`. `git status` does not list `.env` or `.env.local`. |
| 5.2 | `.env.example` has placeholder values only (no live keys) | PASS | Committed names are `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and optional `SUPABASE_URL`. Values are placeholders (`your-project-ref`, `your-anon-or-publishable-key`, `your-service-role-key`). |
| 5.3 | Repo search: no `service_role` key material in source, docs, or client bundle config | PASS | `git grep` for `service_role` and `SUPABASE_SERVICE_ROLE_KEY` hits the env **name** in `.env.example`, the setup and data-model docs, and `src/lib/supabase/server.ts`. No `VITE_SUPABASE_SERVICE` hit. One `eyJ…` string in `package-lock.json` is an npm `integrity` hash, not a key. Built client bundle was not searched. |
| 5.4 | Browser-exposed env only uses public anon/URL names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)—never service role | PASS | `src/lib/supabase/client.ts` reads only those two `VITE_` names. Compared with `docs/setup/supabase-env-checklist.md`. This is a source check, not a production bundle. |
| 5.5 | Client bundle / Network tab does not send service-role header | | Not run. Dev server did not stay up for a Network tab check. |

## 6. Gaps fixed this session

| Gap | Agent fix summary | Re-test result |
|-----|-------------------|----------------|
| (none) | | |

## 7. Sign-off

- [ ] Client story covered: sponsors can log in; listings load from Postgres under RLS; secrets kept out of the client bundle
- [ ] All critical rows above are PASS (or FAIL accepted with written follow-up)
- [x] No real secrets written into this markdown file

**Overall:**  
**Notes for handoff (Step 12):**  
Unrun rows stay blank. Table presence and secret-hygiene source checks passed. Signup, login, the dashboard redirect, create/list in the UI, and User B isolation were not run. Live RLS policies were not listed from Postgres.
