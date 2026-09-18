import type { Address } from "./address";
import type { FinancialSummary } from "./financial-summary";
import type { InvestorContact } from "./investor-contact";
import type { Ownership } from "./ownership";
import type { PropertyType } from "./property-type";
import type { ListingStatus } from "./listing-status";

export type { ListingStatus };

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
  /** Nested metrics — optional when figures are not yet known. */
  financialSummary?: FinancialSummary;
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
 * Status spellings must match `ListingStatus` in listing-status.ts.
 */
export type InvestorListing =
  | (InvestorListingBase & {
      status: "draft" | "active" | "under_contract" | "archived";
      /** Not used unless the listing is closed. */
      closedAt?: undefined;
    })
  | (InvestorListingBase & {
      status: "closed";
      /** ISO date string — required when the listing is closed. */
      closedAt: string;
    });

export type ClosedInvestorListing = Extract<InvestorListing, { status: "closed" }>;
export type OpenInvestorListing = Exclude<InvestorListing, { status: "closed" }>;
