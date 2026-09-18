# PREIshare investor listing types

This folder holds **shared TypeScript types** for PREIshare investor listings.

## Why this exists
Loose objects and ad-hoc JSON let bad data reach production (missing price,
status spelled three ways, nested address fields that vanish on one screen).
These types catch those mistakes at **compile time**—before users see them.

## What belongs here
- Domain type modules only (listing, address, status, contacts, etc.)
- No UI components, no API route handlers, no database clients

## Typecheck

From the project root, run:

```bash
npm run typecheck
```

What success looks like: the command finishes with no type errors (exit code 0).

Notes for beginners:
- `tsc --noEmit` means “check types only; do not write compiled JavaScript files.”
- Valid sources include `src/types/**` and `src/fixtures/sample-investor-listings.ts`.
- Intentional bad examples live in `src/fixtures/invalid-listings.errors.ts` and are documented in `docs/type-safety/expected-type-errors.md`. They are for learning and review, not for the clean gate. `tsconfig.json` excludes that file so `npm run typecheck` can succeed.
- Before review, walk through `docs/type-safety/verification-checklist.md`.

## Strict mode (plain language)
`strict: true` in `tsconfig.json` turns on the checker’s safest rules. Combined
with flags like `noUncheckedIndexedAccess`, it refuses incomplete or loosely
typed data so the team can trust shared listing models.

## Source of truth
Business vocabulary and field rules come from:
`docs/domain/investor-listing-domain-brief.md`
(and the field inventory from Step 1: `docs/domain/listing-field-inventory.md`).
