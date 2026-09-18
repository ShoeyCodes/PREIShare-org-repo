import type { InvestorListing } from "../types";

/**
 * Fixtures match the InvestorListing discriminated union on `status`.
 * Closed samples must include `closedAt`; every other status omits it.
 */

/** Active multifamily listing with full nested shapes. */
export const sampleActiveListing: InvestorListing = {
  id: "listing-001",
  createdAt: "2026-03-01T10:00:00Z",
  updatedAt: "2026-03-15T16:30:00Z",
  title: "Riverfront Multifamily — 24 Units",
  summary:
    "Value-add 24-unit garden community on the river trail, marketed to PREIshare investors.",
  status: "active",
  propertyType: "multi_family",
  address: {
    street: "1200 River Rd",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
  financialSummary: {
    noi: 312000,
    capRate: 0.073,
    occupancyRate: 94.5,
    askingPrice: 4250000,
  },
  contacts: [
    {
      id: "contact-001",
      fullName: "Jordan Lee",
      role: "listing_agent",
      email: "jordan.lee@example.com",
      phone: "+1-512-555-0142",
    },
  ],
  primaryContactId: "contact-001",
  ownership: {
    ownerName: "PREI Riverfront Holdings LLC",
    ownershipPercent: 100,
  },
};

/** Draft listing — still being prepared; no closedAt on this branch. */
export const sampleDraftListing: InvestorListing = {
  id: "listing-002",
  createdAt: "2026-04-02T09:15:00Z",
  updatedAt: "2026-04-02T09:15:00Z",
  title: "Draft — Oak Street Retail Pad",
  summary: "Single-tenant commercial pad still in internal review before publish.",
  status: "draft",
  propertyType: "commercial",
  address: {
    street: "88 Oak St",
    city: "Dallas",
    region: "TX",
    postalCode: "75201",
    country: "US",
  },
  contacts: [
    {
      id: "contact-004",
      fullName: "Morgan Patel",
      role: "assistant",
      email: "morgan.patel@example.com",
    },
  ],
  primaryContactId: "contact-004",
  ownership: {
    ownerName: "PREI Draft Vehicles LLC",
    notes: "Placeholder entity until the offering vehicle is formed.",
  },
};

/** Under-contract listing — exercises the under_contract status branch. */
export const sampleUnderContractListing: InvestorListing = {
  id: "listing-003",
  createdAt: "2026-01-12T14:00:00Z",
  updatedAt: "2026-05-20T11:45:00Z",
  title: "Cedar Industrial — Under Contract",
  summary: "Warehouse near the port; PSA signed, still typed as an open listing.",
  status: "under_contract",
  propertyType: "commercial",
  address: {
    street: "4500 Cedar Blvd",
    city: "Houston",
    region: "TX",
    postalCode: "77002",
    country: "US",
  },
  financialSummary: {
    noi: 455000,
    capRate: 0.075,
    occupancyRate: 100,
    askingPrice: 6100000,
  },
  contacts: [
    {
      id: "contact-002",
      fullName: "Sam Rivera",
      role: "buyer_rep",
      email: "sam.rivera@example.com",
    },
  ],
  primaryContactId: "contact-002",
  ownership: {
    ownerName: "PREI Cedar JV",
    ownershipPercent: 60,
    notes: "Remaining 40% held by the operating partner.",
  },
};

/** Closed listing — historical record; closedAt is required on this branch. */
export const sampleClosedListing: InvestorListing = {
  id: "listing-004",
  createdAt: "2025-08-01T08:00:00Z",
  updatedAt: "2026-02-28T18:00:00Z",
  title: "Summit Office — Closed",
  summary: "Downtown office sale that has already closed; retained for history.",
  status: "closed",
  propertyType: "commercial",
  address: {
    street: "1 Summit Plaza",
    city: "San Antonio",
    region: "TX",
    postalCode: "78205",
    country: "US",
  },
  financialSummary: {
    noi: 198000,
    capRate: 0.072,
    occupancyRate: 88,
    askingPrice: 2750000,
  },
  contacts: [
    {
      id: "contact-003",
      fullName: "Alex Chen",
      role: "seller_rep",
      email: "alex.chen@example.com",
    },
  ],
  primaryContactId: "contact-003",
  ownership: {
    ownerName: "PREI Summit LLC",
    ownershipPercent: 100,
  },
  closedAt: "2026-02-28T17:00:00Z",
};

/** Archived listing — removed from active browse; not closed, so no closedAt. */
export const sampleArchivedListing: InvestorListing = {
  id: "listing-005",
  createdAt: "2025-11-04T12:00:00Z",
  updatedAt: "2026-06-01T09:00:00Z",
  title: "Hill Country Land — Archived",
  summary: "Land assembly withdrawn from investor browse; record kept, not deleted.",
  status: "archived",
  propertyType: "land",
  address: {
    street: "700 Ranch Road 12",
    city: "Dripping Springs",
    region: "TX",
    postalCode: "78620",
    country: "US",
  },
  contacts: [
    {
      id: "contact-005",
      fullName: "Riley Nguyen",
      role: "broker",
      email: "riley.nguyen@example.com",
      phone: "+1-512-555-0199",
    },
  ],
  primaryContactId: "contact-005",
  ownership: {
    ownerName: "PREI Hill Country Land LLC",
    ownershipPercent: 100,
  },
};

/** All valid samples — useful for later UI mocks and typecheck scripts. */
export const sampleInvestorListings: InvestorListing[] = [
  sampleActiveListing,
  sampleDraftListing,
  sampleUnderContractListing,
  sampleClosedListing,
  sampleArchivedListing,
];
