export interface InvestorListing {
  // Stable unique id for the listing.
  id: string
  // Short name shown to investors.
  title: string
  // Longer investor-facing summary.
  description?: string
  // Lifecycle state of the listing.
  status: string
  // Asset class of the property.
  propertyType: string
  // When the listing record was created.
  createdAt: string
  // Last meaningful edit.
  updatedAt: string
  // Listed price amount.
  askingPrice?: number
}
