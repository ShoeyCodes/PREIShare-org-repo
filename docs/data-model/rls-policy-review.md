# RLS policy review — property_listings

## Migration file

- Path: `supabase/migrations/20250321000000_property_listings.sql`
- What it creates: the `property_listings` table, indexes on `owner_id` and `status`, an `updated_at` trigger, and row-level security with four owner-only policies

## How to apply

1. Open Supabase Dashboard → SQL → New query.
2. Paste the full migration contents.
3. Run and confirm success.
4. Table Editor → `property_listings` → confirm RLS is enabled.

## Policies (plain language)

| Policy | Operation | Who | Rule |
|--------|-----------|-----|------|
| `listings_select_own` | SELECT | authenticated | `owner_id = auth.uid()` |
| `listings_insert_own` | INSERT | authenticated | WITH CHECK `owner_id = auth.uid()` |
| `listings_update_own` | UPDATE | authenticated | USING and WITH CHECK `owner_id = auth.uid()` |
| `listings_delete_own` | DELETE | authenticated | `owner_id = auth.uid()` |

Logged-out (`anon`) users have no policy. No policy means no rows. There is no `USING (true)` and no write policy for `anon`.

## Alignment with design doc

Compared with `docs/data-model/property-listings-schema.md`:

- Columns match: yes. `owner_id` is a required uuid referencing `auth.users(id)` with `ON DELETE CASCADE`. Address uses `region`, not `state`. Price is `numeric(12,2)` and must be >= 0, not cents.
- `status` is `draft`, `published`, or `archived`, enforced with a check constraint. The migration also defaults new rows to `draft`. The design required those three values and did not forbid a default.
- `updated_at` is set on update by a trigger, which is how the design’s “bump on update” is done.
- Missing policies: none. SELECT, INSERT, UPDATE, and DELETE each have one authenticated, own-row policy. UPDATE includes WITH CHECK so a sponsor cannot change `owner_id` to someone else.
- Overly open grants: none in this file. No public read of published listings. No `USING (true)`.

## Risks and open questions

- The service-role key bypasses RLS. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
- Other sponsors cannot read `published` rows. That is intentional for this sprint. A later public SELECT would change it.
- Supabase may still GRANT table privileges to `anon`. RLS blocks those calls because `anon` has no policy. Do not add an `anon` policy by mistake.
- The existing TypeScript statuses in `src/types/listing-status.ts` (`active`, `under_contract`, `closed`) are not in this table. Settle that before app code writes `status`.
- Soft-delete is still deferred. This migration uses hard DELETE and `ON DELETE CASCADE`.
- Country still defaults to `'US'`.

## Sign-off

- Reviewed by: Brayden Shoemaker
- Date: 2026-09-30
