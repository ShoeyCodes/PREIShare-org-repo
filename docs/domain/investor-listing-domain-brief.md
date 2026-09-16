# Investor listing domain brief

PREIshare is a real-estate intelligence product. This brief defines **what an investor listing is** in business language so TypeScript types in later steps match real workflows—not invented fields.

Companion inventory (meanings and shapes): [listing-field-inventory.md](listing-field-inventory.md).

## Purpose

Define what an investor listing is in PREIshare business language so TypeScript types in later steps match real workflows—not invented fields.

A listing is the property record investors and internal teammates share when they compare deals. Loose objects and one-off JSON (JavaScript Object Notation: nested data written as text) let bugs reach production: a missing price, a status spelled three different ways, or a nested address that vanishes on one screen. This brief is the shared definition those later types must honor.

## Actors

- **Listing editor (internal ops)** — creates and updates listings before investors see them.
- **Investor (end user)** — browses published listings and relies on complete, consistent data.
- **Reviewer / compliance** — checks that status, price, and contact info are trustworthy before publish.
- **Future systems** — website UI, API, and database will all read the same listing shape.

## Business goals

- One shared definition of a listing across screens and teammates.
- Catch missing or invalid data before production (at compile time once types exist).
- Support nested real-world data: address, financial summary, investor contacts, ownership.

## Listing lifecycle statuses (allowed values only)

**Status** is a **fixed choice**: exactly one of the values below. Free-text status is forbidden (`live`, `LIVE`, `on_market`, and other spellings are invalid).

- `draft` — internal only; not visible to investors.
- `published` — visible to investors; must meet full validity rules.
- `under_offer` — active interest; still structured like a published listing.
- `sold` — closed deal; retained for history.
- `archived` — removed from active browse; not deleted.

`published`, `under_offer`, and `sold` are the investor-visible statuses. They must satisfy every success criterion below that is marked required for those statuses.

## Nested data groups

A **nested group** is a named bundle of related fields that travel together (an object or a list), not a flat bag of unrelated keys.

- **Address** — street line(s), city, region/state, postal code, country.
- **Financial summary** — asking price, currency, optional projected return metrics the team agrees to track.
- **Investor contacts** — one or more people tied to the listing (name, role, email or phone).
- **Ownership** — how contacts relate to the asset (for example primary owner, co-owner, broker) and optional ownership share.

Address and financial summary are **nested objects**. Contacts are a **list**. Ownership is a **list tied to those contacts** (each row points at a contact and names a relationship from a closed list).

## Core identity fields (high level)

These sit at the top of the listing, not inside address or financials. Exact field names are suggestions in the inventory; the meanings are mandatory.

- Stable listing id
- Human-readable title
- Property type (fixed set only: `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land`)
- Status (from the lifecycle list above)
- Short description for investors
- Created/updated timestamps (as business concepts; format decided later)

Free-text property types are forbidden, same rule as status.

## Success criteria — “a valid investor listing”

Use this as a checklist. For `published`, `under_offer`, and `sold`, every item must be true. For `draft` and `archived`, optional fields may be absent; the required fields in items 1–7 must never be missing once the listing is investor-visible (item 8).

1. Has a non-empty id and title.
2. Status is exactly one of the allowed lifecycle values (no free-text variants).
3. Property type is exactly one of the allowed property-type values.
4. Address includes enough fields to locate the property (street, city, region/state, postal code, country).
5. Financial summary includes a numeric asking price and a currency code.
6. At least one investor contact with a name and a reachable channel (email or phone).
7. Ownership relationship for each contact is from an agreed fixed set (not free text): `primary_owner`, `co_owner`, `broker`, `property_manager`.
8. Optional fields may be absent; required fields above must never be missing for `published`, `under_offer`, or `sold`.

## Out of scope for this topic

- Building UI forms, API routes, or database tables.
- Authentication, payments, or document uploads.
- Exact TypeScript syntax (comes in later steps).

## Handoff note

Later steps must implement types that honor this brief and the companion field inventory. If a type allows a status or field not listed here, the type is wrong.
