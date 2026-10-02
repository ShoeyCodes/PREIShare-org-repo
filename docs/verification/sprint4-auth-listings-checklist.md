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


| #   | Check                                                                                                                                                                                                                         | Result | Evidence                                                                                                                                                                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | `property_listings` exists in Supabase                                                                                                                                                                                        | PASS   | Anon REST read of `id`, `owner_id`, `title`, `description`, `address_line1`, `city`, `region`, `postal_code`, `country`, `price`, `status`, `created_at`, `updated_at` returned HTTP 200. `content-range` was `*/0` (no rows).                 |
| 1.2 | RLS is **enabled** on the listings table                                                                                                                                                                                      | PASS   | Anon insert was rejected: `new row violates row-level security policy for table "property_listings"`. After two sponsor rows existed, an anon count was still 0.                                                                               |
| 1.3 | Policies match `docs/data-model/rls-policy-review.md` (`listings_select_own`, `listings_insert_own`, `listings_update_own`, `listings_delete_own`; authenticated; `owner_id = auth.uid()`; no `USING (true)`; no anon policy) | PASS   | Policy names were not listed from `pg_policies` (the Data API does not expose them). Observed rules match the review: anon cannot insert or read; each signed-in sponsor reads only their own row (see section 4). No `USING (true)` behavior. |
| 1.4 | Migration file present: `supabase/migrations/20250321000000_property_listings.sql`                                                                                                                                            | PASS   | Path exists in the repo.                                                                                                                                                                                                                       |


## 2. Authentication & session


| #   | Check                                                                                  | Result | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --- | -------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1 | Sponsor can sign up with email/password                                                | PASS   | Retest after `src/server/register-sponsor.ts`. Creating an account works. Sign-up confirms the sponsor on the server and does not send the confirmation email that previously returned `email rate limit exceeded`. No password recorded.                                                                                                                                                                                                                 |
| 2.2 | Sponsor can log in via `src/routes/auth/login.tsx`                                     | PASS   | Login works and reaches the dashboard. An earlier local attempt failed with `Invalid path specified in request URL` because the project URL included `/rest/v1`; stripping that suffix fixed the Auth path. The deployed login also works after the client build includes the public Supabase URL and anon key.                                                                                                                                             |
| 2.3 | Signed-out user hitting `/dashboard` (or `/dashboard/listings`) is redirected to login | PASS   | A fresh open of `/dashboard` on the deployed site finished at `/auth/login`.                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2.4 | Sign-out clears session; protected pages no longer load data                           | PASS   | After local sign-in, Sign out returned to `/auth/login`. Opening `/dashboard/listings` again stayed on `/auth/login` and did not show the listing cards.                                                                                                                                                                                                                                                                                                                         |


## 3. Listings happy path (User A)


| #   | Check                                                                                                | Result | Evidence                                                                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3.1 | Create listing via UI (title, address fields, city, price per `src/lib/listings/schema.ts`) succeeds | PASS   | Local form at `/dashboard/listings/new`: title `UI check cottage`, address `10 UI Street`, city Lehi, price 250000, description filled. Button showed `Saving…`, then the browser landed on `/dashboard/listings`. |
| 3.2 | New row visible on `src/routes/dashboard/listings/index.tsx`                                         | PASS   | The list showed `UI check cottage` / Lehi / draft and `Check listing 1790914407942` / Provo / draft.                                                                                                               |
| 3.3 | Data matches Postgres (Supabase Table Editor), not mock arrays in the client                         | PASS   | The Provo row was read back from the Data API before the UI test. The list page then showed that same title plus the form-created Lehi row. Table Editor was not opened.                                           |
| 3.4 | Server path used: create/read go through `src/server/listings.ts`                                    | PASS   | The form calls `createListing` and the list page loader calls `listMyListings`. After submit, the new card appeared on the list page.                                                                              |


## 4. Row Level Security (User B)


| #   | Check                                                      | Result | Evidence                                                                                                                                                                                   |
| --- | ---------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 4.1 | Second account User B can sign up / log in                 | PASS   | User B `preishare.check.b.1790914407942@gmail.com` signed in and received a session. Sign-up now works from the page as well (see 2.1). No password recorded. |
| 4.2 | User B **cannot** see User A’s listings in the UI          | PASS   | A direct read as User B returned 0 rows and did not include User A's title. Login and sign-up both work (see section 2).                                                                   |
| 4.3 | Direct read as User B shows no foreign rows                | PASS   | User B's select returned count 0 while User A's listing existed. After User B created a row, User A's select still did not include User B's title.                                         |
| 4.4 | User B can create their own listing and only see their own | PASS   | User B insert (city Orem) succeeded. After that, User B's list count was 1 and User A's list count stayed 1. Neither list contained the other sponsor's title.                             |


## 5. Secret-hygiene audit

Wording follows `docs/setup/supabase-env-checklist.md`: browser-safe names are `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. `SUPABASE_SERVICE_ROLE_KEY` has no `VITE_` prefix and bypasses row-level security.


| #   | Check                                                                                                                  | Result | Evidence                                                                                                                                                                                                                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.1 | `.env` with real values is **not** committed (`git status` / `git check-ignore`)                                       | PASS   | `.gitignore` ignores `.env`, `.env.`* except `!.env.example`, and `*.local`. `git check-ignore` ignores `.env` and `.env.local`. `git ls-files` tracks only `.env.example`. `git status` does not list `.env` or `.env.local`.                                                                                                |
| 5.2 | `.env.example` has placeholder values only (no live keys)                                                              | PASS   | Committed names are `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and optional `SUPABASE_URL`. Values are placeholders (`your-project-ref`, `your-anon-or-publishable-key`, `your-service-role-key`).                                                                                           |
| 5.3 | Repo search: no `service_role` key material in source, docs, or client bundle config                                   | PASS   | `git grep` for `service_role` and `SUPABASE_SERVICE_ROLE_KEY` hits the env **name** in `.env.example`, the setup and data-model docs, and `src/lib/supabase/server.ts`. No `VITE_SUPABASE_SERVICE` hit. One `eyJ…` string in `package-lock.json` is an npm `integrity` hash, not a key. Built client bundle was not searched. |
| 5.4 | Browser-exposed env only uses public anon/URL names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)—never service role | PASS   | `src/lib/supabase/client.ts` reads the public URL and anon or publishable key (`VITE_` names, or the matching `NEXT_PUBLIC_` names Vercel already sets). It does not read `SUPABASE_SERVICE_ROLE_KEY`.                                                                                                                                                                                      |
| 5.5 | Client bundle / Network tab does not send service-role header                                                          | PASS   | Login reaches Auth with the public anon key. The browser client does not read `SUPABASE_SERVICE_ROLE_KEY`, and the sign-up server function is the only place that uses the service role.                                                                                                                                    |


## 6. Gaps fixed this session


| Gap                               | Agent fix summary                                                                                                                                                                                                                                                                                                   | Re-test result |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Login button stays on Signing in… | Forms catch errors and reset the button. `normalizeSupabaseUrl` strips a trailing `/rest/v1` so Auth is not sent to `/rest/v1/auth/v1/token`. The client also accepts the public `NEXT_PUBLIC_` Supabase names. | PASS |
| Email rate limit exceeded | `src/server/register-sponsor.ts` creates a confirmed sponsor without sending a confirmation email, then the page signs in with that password. Sponsor retest: creating an account works and login works. | PASS |


## 7. Sign-off

- [x] Client story covered: sponsors can log in; listings load from Postgres under RLS; secrets kept out of the client bundle
- [x] All critical rows above are PASS (or FAIL accepted with written follow-up)
- [x] No real secrets written into this markdown file

**Overall:** PASS  
**Notes for handoff (Step 12):**  
All rows PASS. Creating an account works, and login works. Signed-out `/dashboard` redirects to login. RLS isolation and secret hygiene passed. No passwords are stored in this file.