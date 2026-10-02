// Validation and types shared by listing server functions and later forms.
// Column names and status values match property_listings.

import { z, type ZodError } from 'zod'

/** Allowed listing status values — keep in sync with the Postgres check constraint. */
export const listingStatusSchema = z.enum(['draft', 'published', 'archived'])

const priceSchema = z.coerce
  .number()
  .nonnegative('Price must be zero or greater')
  .transform((value) => Math.round(value * 100) / 100)

function requiredText(max: number, message: string) {
  return z.string().trim().min(1, message).max(max)
}

/** Blank or missing optional text is stored as null. Used on create only. */
function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : null))
}

export const createListingSchema = z.object({
  title: requiredText(200, 'Title is required'),
  description: optionalText(5000),
  address_line1: requiredText(300, 'Address is required'),
  city: requiredText(120, 'City is required'),
  region: optionalText(120),
  postal_code: optionalText(20),
  country: z
    .string()
    .trim()
    .min(2, 'Country is required')
    .max(80)
    .optional()
    .default('US'),
  price: priceSchema,
  status: listingStatusSchema.default('draft'),
})

export const updateListingSchema = z.object({
  id: z.string().uuid('Listing id must be a valid UUID'),
  title: requiredText(200, 'Title is required').optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  address_line1: requiredText(300, 'Address is required').optional(),
  city: requiredText(120, 'City is required').optional(),
  region: z.string().trim().max(120).nullable().optional(),
  postal_code: z.string().trim().max(20).nullable().optional(),
  country: z.string().trim().min(2, 'Country is required').max(80).optional(),
  price: priceSchema.optional(),
  status: listingStatusSchema.optional(),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>
export type ListingStatus = z.infer<typeof listingStatusSchema>

export function listingFieldErrors(error: ZodError): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key !== 'string') continue
    const messages = result[key] ?? []
    messages.push(issue.message)
    result[key] = messages
  }
  return result
}
