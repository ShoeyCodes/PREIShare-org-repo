# Expected type errors for invalid investor listings

`src/fixtures/invalid-listings.errors.ts` is supposed to fail typechecking. Each named export below is annotated as `InvestorListing` and breaks **one** rule already encoded in `src/types`. Do not “fix” those errors; update this table if you add or remove cases.

Happy-path samples live in `src/fixtures/sample-investor-listings.ts` and must stay valid.

| id | business problem | rule that should catch it | expected TS kind |
|----|------------------|---------------------------|------------------|
| invalidStatusSpelling | A status typo (`availble`) would break filters and let free-text statuses into production | `ListingStatus` string union (`draft`, `active`, `under_contract`, `closed`, `archived`) | invalid string literal (not assignable to the union) |
| missingAddressCity | City is required for display and maps; a listing with only street/region cannot be located | `Address` required fields (`street`, `city`, `region`, `postalCode`, `country`) | missing property |
| priceAsString | Money must be numeric so totals, cap rate, and filters can do math | `FinancialSummary.askingPrice: number` | type not assignable (`string` vs `number`) |
| invalidContactsShape | Listings must not be anonymous; a single `{ name }` object is not a contact list | `contacts: InvestorContact[]` / `InvestorContacts` (`id`, `fullName`, `role`, `email`) | object literal / type not assignable to array |
| invalidOwnershipShape | Ownership is who holds the asset (`ownerName`), not an array of `percentOwned` rows | `ownership: Ownership` | missing property / type not assignable (`Ownership[]` vs `Ownership`) |
| emptyContactsOnActive | An active deal with nobody to call would reach investors as an incomplete listing | Investor-visible statuses require `contacts: InvestorContacts` (at least one) | source has fewer elements than target / not assignable to tuple |
| missingFinancialsOnActive | An active deal with no financial summary would hide asking price and currency | Investor-visible statuses require `financialSummary: FinancialSummary` | missing property |

## Notes

- That errors file must not use `any`, `unknown` escapes, `@ts-ignore`, or `as InvestorListing` to hide failures.
- `npm run typecheck` (`tsc --noEmit`) is expected to fail while `invalid-listings.errors.ts` is included under `src/**/*.ts`.
- Closed-only `closedAt` is covered by the discriminated union on happy-path samples; it is not one of these invalid exports.
- Draft and archived may still omit `financialSummary` and use an empty `contacts` list; active, under_contract, and closed may not.
