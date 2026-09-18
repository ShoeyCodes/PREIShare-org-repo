import type { Address } from "./address";
import type { FinancialSummary } from "./financial-summary";
import type { InvestorContact } from "./investor-contact";
import type { Ownership } from "./ownership";
import type { PropertyType } from "./property-type";
import type { ListingStatus } from "./listing-status";

export type { ListingStatus };

/** At least one reachable person — required on investor-visible statuses. */
export type InvestorContacts = [InvestorContact, ...InvestorContact[]];

/** Fields every investor listing has, regardless of status. */
export interface InvestorListingBase {
  /** Stable identity — do not reassign after create. */
  readonly id: string;
  /** Set once when the row is created. */
  readonly createdAt: string;
  /** May change when the listing is edited; still not a business key. */
  readonly updatedAt: string;

  title: string;
  /** Longer plain-text description of the investment opportunity. */
  summary: string;
  propertyType: PropertyType;
  address: Address;
  /**
   * Nested metrics. Optional on draft/archived; required on investor-visible
   * statuses via the union below.
   */
  financialSummary?: FinancialSummary;
  /**
   * People on the listing. Empty lists are allowed on draft/archived;
   * investor-visible statuses require at least one contact.
   */
  contacts: InvestorContact[];
  /**
   * Must match InvestorContact.id of one entry in `contacts`.
   * TypeScript cannot fully enforce "id exists in array" alone;
   * we still type it as string so callers pass an id, not a whole loose object.
   */
  primaryContactId: string;
  ownership: Ownership;
}

/**
 * Discriminated union: TypeScript uses `status` to know which shape you have.
 * `closedAt` is required only when status is "closed".
 * Active, under_contract, and closed must have a financial summary and ≥1 contact
 * (domain rules for investor-visible listings).
 * Status spellings must match `ListingStatus` in listing-status.ts.
 */
export type InvestorListing =
  | (InvestorListingBase & {
      status: "draft" | "archived";
      /** Not used unless the listing is closed. */
      closedAt?: undefined;
    })
  | (InvestorListingBase & {
      status: "active" | "under_contract";
      closedAt?: undefined;
      financialSummary: FinancialSummary;
      contacts: InvestorContacts;
    })
  | (InvestorListingBase & {
      status: "closed";
      /** ISO date string — required when the listing is closed. */
      closedAt: string;
      financialSummary: FinancialSummary;
      contacts: InvestorContacts;
    });

export type ClosedInvestorListing = Extract<InvestorListing, { status: "closed" }>;
export type OpenInvestorListing = Exclude<InvestorListing, { status: "closed" }>;
