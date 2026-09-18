# ADR-001: Investor listing TypeScript types (PREIshare)

- **Status:** Accepted (Sprint 2, Topic 1)
- **Date:** 2026-09-18
- **Owners:** PREIshare types working group (learner + coach)
- **Related code:** `src/types/index.ts` (barrel export for the types package)

## Context

PREIshare investor listings were previously passed around as loose objects and ad-hoc JSON. That allowed production bugs such as missing prices, status values spelled several ways, and nested address fields that disappeared on some screens. Sprint 2 Topic 1 models the listing domain with strict TypeScript types so invalid shapes fail at compile time—before users see them.

Business inputs that drove the model:

- Domain brief: `docs/domain/investor-listing-domain-brief.md`
- Field inventory: `docs/domain/listing-field-inventory.md`
- Safety evidence: `docs/type-safety/expected-type-errors.md` and `docs/type-safety/verification-checklist.md`

The public types exported from `src/types/index.ts` are: `InvestorContact`, `Ownership`, `Address`, `FinancialSummary`, `ListingStatus`, `PropertyType`, `InvestorListing`, `InvestorListingBase`, `InvestorContacts`, `ClosedInvestorListing`, and `OpenInvestorListing`.

## Decision

We adopt a small, explicit types package centered on `InvestorListing`, with supporting types for status, property type, address, financial summary, investor contacts, and ownership. Call sites should import from `src/types/index.ts` rather than reaching into individual files when possible.

`InvestorListing` is a discriminated union on `status` (built from `InvestorListingBase`). `npm run typecheck` (`tsc --noEmit`) is the shared compile-time gate. Intentional failures live in `src/fixtures/invalid-listings.errors.ts` and are excluded from that default compile set so the clean gate can succeed.

## Type choices mapped to business rules

| Business rule (plain language) | Type choice | Why this shape |
| --- | --- | --- |
| A listing always has core identity and audit fields | Required `title` and `summary` on `InvestorListingBase`; `readonly id`, `readonly createdAt`, `readonly updatedAt` | Optional identity recreates missing-record bugs; `readonly` marks values that should not be reassigned after create |
| Listing workflow status may only be a known set of values | `ListingStatus` string union: `"draft" \| "active" \| "under_contract" \| "closed" \| "archived"` | Free `string` allows typos such as `"availble"` and three spellings of the same status |
| Property category is a closed vocabulary | `PropertyType` string union: `"single_family" \| "multi_family" \| "commercial" \| "land"` | Same reason as status: closed set, compile-time exhaustiveness |
| Street, city, region, postal code, and country travel together | Nested `Address` with required `street`, `city`, `region`, `postalCode`, `country` | Prevents half-present addresses (for example city missing) so maps and cards share one location shape |
| Money rollups are a structured summary, not one anonymous number | Nested `FinancialSummary` with required `askingPrice` (`number`), `currency`, `noi`, `capRate`, `occupancyRate` | Makes asking price numeric (not `"610000"`) and groups totals; `currency` matches the brief’s “numeric asking price and a currency code” |
| Investor-visible listings must have a financial summary | `financialSummary: FinancialSummary` required when `status` is `"active"`, `"under_contract"`, or `"closed"`; optional on `"draft"` and `"archived"` | An active deal with no price package would hide asking price and currency from investors |
| Who to contact is structured people, not a string blob | `InvestorContact` (`id`, `fullName`, `role`, `email`, optional `phone`) and `contacts` as a list | Stops `{ name: ... }` objects and anonymous listings |
| Investor-visible listings need at least one contact | `InvestorContacts` = `[InvestorContact, ...InvestorContact[]]` on `"active"`, `"under_contract"`, and `"closed"` | Empty `contacts` on an active listing is a “nobody to call” hole; draft/archived may still use an empty list |
| Ownership of the asset is first-class | Required `ownership: Ownership` with `ownerName`, optional `notes` and `ownershipPercent` | Captures who holds the asset as one object, not an array of `percentOwned` rows |
| Closed listings carry a close date; others must not | Discriminated union: `"closed"` requires `closedAt: string`; `"draft" \| "archived"` and `"active" \| "under_contract"` use `closedAt?: undefined` | Lets TypeScript require the right fields for the right status |
| Callers name a primary contact by id, not a loose person object | `primaryContactId: string` (must match a contact id at the business level; TypeScript cannot prove membership in the array) | Still types an id rather than an untyped nested blob |
| Shared listing constants should not be reassigned casually | `readonly` on `id`, `createdAt`, and `updatedAt` | Signals immutability intent at the type level |

## Alternatives considered

1. **Keep listings as `string` / `any` / untyped JSON**  
   Rejected: fastest short term, but pushes every bug to runtime and production.

2. **One giant flat interface with dozens of optional fields**  
   Rejected: optional everything recreates missing-field bugs; flat shapes hide address/financial structure.

3. **Enums (`enum`) for every closed vocabulary**  
   Deferred/avoided for this beginner package in favor of string union types, which stay simple to read in fixtures and error messages. Revisit only if runtime enum objects become a clear need.

4. **Runtime schema library as the source of truth in this topic**  
   Out of scope for Topic 1. Compile-time types and fixtures come first; runtime validators can wrap the same decisions later.

## Consequences

**Positive**

- Invalid listings in `src/fixtures/invalid-listings.errors.ts` demonstrate the compiler rejecting bad data (see `docs/type-safety/expected-type-errors.md`). Those examples are excluded from the default `tsconfig.json` compile set so they do not break the clean gate.
- Valid samples in `src/fixtures/sample-investor-listings.ts` prove a realistic listing can be constructed for each `ListingStatus`.
- `npm run typecheck` (`tsc --noEmit`) is the shared gate before merge; `docs/type-safety/verification-checklist.md` is how a beginner proves the model still matches the brief.

**Tradeoffs**

- Authors must use exact union members; “almost right” status strings fail typecheck by design.
- Nested objects mean fixtures and future API mappers must supply whole `Address` / `FinancialSummary` objects, not scattered fields.
- Discriminated/readonly choices add a small learning curve for beginners in exchange for stronger guarantees.
- `primaryContactId` is still a `string`; the compiler cannot prove it exists in `contacts`.
- `Ownership` is a single `ownerName` object as implemented in `src/types/ownership.ts`, not a list of closed relationship tokens from the brief.

## Out of scope for Sprint 2 Topic 1

- Database tables, migrations, or Supabase row types
- HTTP API routes and request/response validation at runtime
- React form components and client-side validation UX
- Authentication, authorization, and multi-tenant rules
- pgvector / search indexing fields beyond what the current listing model already includes
- Changing production data or deploying a service

## Follow-ups (for the next topic / implementers)

1. Import domain types from `src/types/index.ts` when building UI or API layers.
2. Keep fixtures green under `npm run typecheck` before expanding the model.
3. If product adds a new listing status or property type, extend the **union** and update fixtures + this ADR—do not widen the field back to free `string`.
4. Consider runtime validators that mirror these types once API boundaries land.
5. Use `docs/type-safety/verification-checklist.md` as the acceptance gate when types change.

## Evidence links

- Domain brief: `docs/domain/investor-listing-domain-brief.md`
- Field inventory: `docs/domain/listing-field-inventory.md`
- Expected compile errors: `docs/type-safety/expected-type-errors.md`
- Verification checklist: `docs/type-safety/verification-checklist.md`
- Types entrypoint: `src/types/index.ts`
