// INTENTIONAL TYPE ERRORS — this file should NOT typecheck cleanly.
// Each export demonstrates a failure mode documented in
// docs/type-safety/expected-type-errors.md
// Field names match src/types (street/region, financialSummary, fullName, ownerName).
// No `any`, `unknown` escapes, `@ts-ignore`, or `as InvestorListing`.

import type { InvestorListing } from "../types";

const timestamps = {
  createdAt: "2026-03-01T10:00:00Z",
  updatedAt: "2026-03-15T16:30:00Z",
};

// Case: status spelled in a way the union does not allow
export const invalidStatusSpelling: InvestorListing = {
  id: "listing-bad-status",
  ...timestamps,
  title: "Downtown duplex offering",
  summary: "Should fail because status is not a ListingStatus spelling.",
  status: "availble",
  propertyType: "multi_family",
  address: {
    street: "100 Main St",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
  financialSummary: {
    noi: 28000,
    capRate: 0.06,
    occupancyRate: 90,
    askingPrice: 450000,
  },
  contacts: [
    {
      id: "contact-bad-status",
      fullName: "Alex Rivera",
      role: "broker",
      email: "alex@example.com",
    },
  ],
  primaryContactId: "contact-bad-status",
  ownership: {
    ownerName: "Rivera Holdings",
    ownershipPercent: 100,
  },
};

// Case: required nested address field missing (`city`)
export const missingAddressCity: InvestorListing = {
  id: "listing-missing-city",
  ...timestamps,
  title: "Lakeview fourplex",
  summary: "Should fail because Address.city is required.",
  status: "draft",
  propertyType: "multi_family",
  address: {
    street: "22 Lake Rd",
    region: "TX",
    postalCode: "78702",
    country: "US",
  },
  financialSummary: {
    noi: 32000,
    capRate: 0.061,
    occupancyRate: 85,
    askingPrice: 520000,
  },
  contacts: [
    {
      id: "contact-missing-city",
      fullName: "Sam Lee",
      role: "owner",
      email: "sam@example.com",
    },
  ],
  primaryContactId: "contact-missing-city",
  ownership: {
    ownerName: "Lee Capital",
    ownershipPercent: 100,
  },
};

// Case: numeric money field given as a string
export const priceAsString: InvestorListing = {
  id: "listing-price-string",
  ...timestamps,
  title: "Cedar Street portfolio slice",
  summary: "Should fail because askingPrice must be a number.",
  status: "active",
  propertyType: "single_family",
  address: {
    street: "9 Cedar St",
    city: "Dallas",
    region: "TX",
    postalCode: "75201",
    country: "US",
  },
  financialSummary: {
    noi: 41000,
    capRate: 0.067,
    occupancyRate: 100,
    askingPrice: "610000",
  },
  contacts: [
    {
      id: "contact-price-string",
      fullName: "Jordan Kim",
      role: "broker",
      email: "jordan@example.com",
    },
  ],
  primaryContactId: "contact-price-string",
  ownership: {
    ownerName: "Kim Investors",
    ownershipPercent: 100,
  },
};

// Case: contacts must be InvestorContact[] with fullName, not a single `{ name }` object
export const invalidContactsShape: InvestorListing = {
  id: "listing-bad-contacts",
  ...timestamps,
  title: "Contacts must be a list of InvestorContact",
  summary: "Should fail because contacts is not an InvestorContact array.",
  status: "active",
  propertyType: "commercial",
  address: {
    street: "400 Congress Ave",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
  contacts: {
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "primary",
  },
  primaryContactId: "missing-list",
  ownership: {
    ownerName: "Rivera Holdings",
    ownershipPercent: 100,
  },
};

// Case: ownership is a nested object (ownerName), not an array of percentOwned rows
export const invalidOwnershipShape: InvestorListing = {
  id: "listing-bad-ownership",
  ...timestamps,
  title: "Ownership is a single Ownership object",
  summary: "Should fail because ownership is an array, not Ownership.",
  status: "under_contract",
  propertyType: "land",
  address: {
    street: "1 Ranch Gate",
    city: "Fredericksburg",
    region: "TX",
    postalCode: "78624",
    country: "US",
  },
  contacts: [
    {
      id: "contact-bad-ownership",
      fullName: "Riley Nguyen",
      role: "broker",
      email: "riley@example.com",
    },
  ],
  primaryContactId: "contact-bad-ownership",
  ownership: [{ ownerName: "Lee Capital", percentOwned: 100 }],
};
