# Sprint 4 Handoff — Sponsor Auth & Postgres Property Listings

**Project:** PREIshare dashboard  
**Sprint:** 4 (Topic 1) — Supabase auth & database  
**Audience:** Sponsors and the next-sprint implementer  
**Status date:** 2026-10-01

## 1. Client story recap

PREIshare sponsors need a secure way to sign in and manage real property listings—not mock data in the browser—while secret keys stay out of the client bundle.

The sprint contract asks for email/password sign-up and login, a session on dashboard routes that show listings, Postgres rows a sponsor can create and read, and a split between browser-safe settings and the server-only service role. Logged-out visitors should reach login or signup only and should not see listing data.

## 2. Delivered vs original request

| Client need | Delivered? | Where / evidence |
| --- | --- | --- |
| Secure sponsor login | Yes | Creating an account works, and login works (checklist 2.1–2.2). A signed-out visit to `/dashboard` finishes at `/auth/login` (2.3). Sign-out returns to `/auth/login` and does not show listing cards (2.4). |
| Postgres-backed listings (create/read/display) | Yes | Create at `/dashboard/listings/new` and the list at `src/routes/dashboard/listings/index.tsx` passed. Create and read go through `createListing` and `listMyListings` in `src/server/listings.ts` (checklist 3.1–3.4). The new row was also read from the Data API. |
| Row-level security so sponsors only see allowed rows | Yes | `property_listings` exists, RLS is on, and an anonymous insert was rejected (checklist 1.1–1.2). Two sponsors each saw only their own row (4.2–4.4). |
| Secrets kept out of the client bundle | Yes | `.env` and `.env.local` are not tracked. `.env.example` has placeholders only. `src/lib/supabase/client.ts` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only (checklist 5.1–5.5). The deployed login chunk did not contain `SUPABASE_SERVICE_ROLE_KEY`. |

The verification checklist’s overall mark is PASS. Every row is PASS. Creating an account works, and login works. Listing create and read passed, and each sponsor’s rows stayed on that sponsor. The service-role key stays on the server.

## 3. Architecture decisions (keep short)

- **Auth:** Supabase email/password. Protected dashboard routes, including `/dashboard/listings`, redirect to `/auth/login` when there is no session.
- **Data:** PostgreSQL table `property_listings`, as specified in `docs/data-model/property-listings-schema.md`. Columns are `id`, `owner_id`, `title`, `description`, `address_line1`, `city`, `region`, `postal_code`, `country` (default `'US'`), `price` (`numeric(12,2)`, at least 0), `status` (`draft`, `published`, or `archived`), `created_at`, and `updated_at`. `owner_id` references `auth.users(id)` with `ON DELETE CASCADE`.
- **Authorization:** RLS policies `listings_select_own`, `listings_insert_own`, `listings_update_own`, and `listings_delete_own` allow an authenticated sponsor only where `owner_id = auth.uid()`. Anonymous users have no listing policy. There is no public read of published rows. The service role bypasses RLS and is not used for sponsor list or create.
- **Clients:** `src/lib/supabase/server.ts` is the server-only place that may see `SUPABASE_SERVICE_ROLE_KEY`. `src/lib/supabase/client.ts` uses the public URL and anon key only. Sign-in uses the browser client. Listing create and read run on the server as the signed-in user so RLS still applies.
- **Env hygiene:** Browser-safe names are `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Server-only names are `SUPABASE_SERVICE_ROLE_KEY` and optional `SUPABASE_URL`. Real values stay in an untracked `.env` or `.env.local`. `.env.example` stays placeholders.

## 4. How to run locally (sponsor-friendly)

1. Copy `.env.example` to `.env.local` (or `.env`). In Supabase, open **Project Settings → API** and fill the names from that example: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and optional `SUPABASE_URL`. Do not commit that file, and do not paste the real values into docs. See `docs/setup/supabase-env-checklist.md`.
2. Apply the recorded migration `supabase/migrations/20250321000000_property_listings.sql`. Confirm RLS is on: an anonymous insert into `property_listings` should be rejected, and an anonymous read should not return sponsor rows.
3. Install dependencies and start the TanStack Start dev server with `npm run dev`. The verification run used `http://localhost:3000`. Restart the server after you create or edit the env file.
4. Sign up or sign in at `/auth/login` as a test sponsor, open `/dashboard/listings`, create one listing, and confirm the new card appears on that list and the same row is in Postgres.

## 5. Known limitations

- Sign-up, login, listing create/read, owner-only access, and secret hygiene are PASS in `docs/verification/sprint4-auth-listings-checklist.md`.
- This sprint does not include images, a public published-listings read, shared ownership, payments, uploads, or admin roles. Full-text search and pgvector are deferred in the schema.

## 6. Recommended next-sprint work (pick with stakeholders)

1. **Richer listing fields** — add columns, validation, and edit/delete on top of `property_listings` and the existing own-row policies. Keep `owner_id` tied to the signed-in user, and keep `SUPABASE_SERVICE_ROLE_KEY` off the browser client.
2. **Approvals workflow** — extend the current `draft` / `published` / `archived` status with submit and approve/reject transitions, and decide who may change status. That decision belongs in RLS plus the UI. Do not replace owner checks with a service-role call from the browser.
3. **pgvector search** — add embeddings and similarity search only after create/read (and any new edit flow) stay behind the current session check and own-row RLS. The schema already defers pgvector. Do not put the service role in the client to run search.

## 7. Open questions for stakeholders

- Who may create a listing, and who may only view one? This sprint allows each authenticated sponsor to create and read their own rows. Anonymous visitors get no rows. A public “read all published listings” policy was not requested.
- Is own-row isolation still the rule next sprint? It is required now. Shared ownership across sponsors was left out of this sprint on purpose.
- Preferred next theme: richer fields, approvals, or search?
- Keep the `'US'` default for `country`, or require a country with no default?
- Listing status in the table is `draft`, `published`, or `archived`. `src/types/listing-status.ts` still uses `draft`, `active`, `under_contract`, `closed`, and `archived`. Which list should the app and the table share?
- Keep hard delete plus `ON DELETE CASCADE`, or add a later soft-delete?

## 8. Source artifacts

- `docs/requirements/sponsor-auth-and-listings-brief.md`
- `docs/verification/sprint4-auth-listings-checklist.md`
- `docs/data-model/property-listings-schema.md`
- `docs/setup/supabase-env-checklist.md`
