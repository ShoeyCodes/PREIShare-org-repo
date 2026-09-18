import type { ListingStatus } from "./listing-status";
import type { PropertyType } from "./property-type";
import type { Address } from "./address";
import type { FinancialSummary } from "./financial-summary";

/**
 * Core PREIshare investor listing with nested address and financial summary.
 * Contact lists are added in a later step.
 */
export interface InvestorListing {
  /** Stable unique id for this listing (assigned by the system). */
  id: string;

  /** Short public headline shown in search results and cards. */
  title: string;

  /** Longer plain-text description of the investment opportunity. */
  summary: string;

  /** Lifecycle state — closed list from the field inventory, never free text. */
  status: ListingStatus;

  /** Asset class — closed list from the field inventory, never free text. */
  propertyType: PropertyType;

  /** Nested location — required; not flattened onto the listing. */
  address: Address;

  /** Nested metrics — optional when figures are not yet known. */
  financialSummary?: FinancialSummary;

  /** ISO-8601 datetime string when the listing was first created. */
  createdAt: string;

  /** ISO-8601 datetime string when the listing was last updated. */
  updatedAt: string;
}
