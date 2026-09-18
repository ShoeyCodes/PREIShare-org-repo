# Investor listing types — verification checklist

Use this list before review. Check each box only when you have evidence.

This is the team’s repeatable pre-review gate: `npm run typecheck` plus this checklist prove the model still matches PREIshare’s business rules.

## A. Domain coverage

Evidence: `docs/domain/listing-field-inventory.md`, `docs/domain/investor-listing-domain-brief.md`, and `src/types/`.

- [ ] Every required field from `docs/domain/listing-field-inventory.md` appears on `InvestorListing` (or a nested type it uses), using this package’s names (`street` / `region`, `financialSummary`, `fullName`, `ownerName`).
- [ ] Listing status values match the allowed business statuses (no free-form strings): `draft`, `active`, `under_contract`, `closed`, `archived`.
- [ ] Property type values match the allowed property kinds: `single_family`, `multi_family`, `commercial`, `land`.
- [ ] Address and `FinancialSummary` nested shapes match the inventory (locate the property; numeric asking price and a currency code).
- [ ] Investor contact and ownership fields match the domain brief (name, role, email or phone; ownership describes who holds the asset). Investor-visible statuses (`active`, `under_contract`, `closed`) require at least one contact and a financial summary.

## B. Type safety shape

- [ ] Public types are exported from `src/types/index.ts`.
- [ ] Discriminated / narrowed status modeling still matches `docs/type-safety/expected-type-errors.md` (`closedAt` only when `status` is `"closed"`).
- [ ] Readonly intent is documented where the team agreed on it (`id`, `createdAt`, `updatedAt` on `InvestorListingBase`).

## C. Fixtures

- [ ] `src/fixtures/sample-investor-listings.ts` typechecks cleanly and includes more than one realistic listing (one per major `ListingStatus`).
- [ ] `src/fixtures/invalid-listings.errors.ts` still demonstrates the intentional failures listed in `docs/type-safety/expected-type-errors.md`.
- [ ] Expected-error notes still match the real compiler messages (no stale examples).

## D. Typecheck gate

- [ ] `package.json` defines a `typecheck` script that runs `tsc --noEmit`.
- [ ] Running the typecheck script from the project root succeeds for valid sources.
- [ ] The intentional invalid fixtures file is not required to pass the normal typecheck gate (`tsconfig.json` excludes `src/fixtures/invalid-listings.errors.ts`).
- [ ] `src/types/README.md` explains how a beginner runs typecheck and what success looks like.

## E. Sign-off

- [ ] I re-ran typecheck after any last fixes.
- [ ] I would hand this package to a teammate without a verbal walkthrough of secret steps.
