// Server-only list / create / update for the signed-in sponsor's listings.
// Queries use the anon-key cookie client. Ownership comes from getUser(), never the body.

import { createServerFn } from '@tanstack/react-start'
import {
  createListingSchema,
  listingFieldErrors,
  updateListingSchema,
  type CreateListingInput,
  type UpdateListingInput,
} from '../lib/listings/schema'
import type { Database } from '../lib/supabase/types'

export type ListingRow = Database['public']['Tables']['property_listings']['Row']

type ListingUpdate = Database['public']['Tables']['property_listings']['Update']

export type ListingsResult =
  | { ok: true; listings: ListingRow[] }
  | { ok: false; error: string }

export type ListingMutationResult =
  | { ok: true; listing: ListingRow }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

const listingColumns =
  'id, owner_id, title, description, address_line1, city, region, postal_code, country, price, status, created_at, updated_at'

function validationFailure(error: string, fieldErrors: Record<string, string[]>): ListingMutationResult {
  if (Object.keys(fieldErrors).length === 0) {
    return { ok: false, error }
  }
  return { ok: false, error, fieldErrors }
}

function asListingRow(row: ListingRow): ListingRow {
  return {
    ...row,
    price: Number(row.price),
  }
}

function blankToNull(value: string | null): string | null {
  if (value === null) return null
  return value.length > 0 ? value : null
}

async function sponsorClient(unauthenticatedMessage: string) {
  const { getUser } = await import('../lib/auth/session')
  const { createUserServerSupabaseClient } = await import('../lib/supabase/server')
  const user = await getUser()
  if (!user) {
    return { ok: false as const, error: unauthenticatedMessage }
  }
  return {
    ok: true as const,
    userId: user.id,
    supabase: createUserServerSupabaseClient(),
  }
}

/** Listings for the signed-in sponsor, newest first. An empty list is success. */
export const listMyListings = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ListingsResult> => {
    try {
      const sponsor = await sponsorClient('You must be signed in to view listings.')
      if (!sponsor.ok) return sponsor

      const { data, error } = await sponsor.supabase
        .from('property_listings')
        .select(listingColumns)
        .eq('owner_id', sponsor.userId)
        .order('created_at', { ascending: false })

      if (error) {
        return { ok: false, error: 'Could not load listings. Try again.' }
      }

      return { ok: true, listings: (data ?? []).map(asListingRow) }
    } catch {
      return { ok: false, error: 'Could not load listings. Try again.' }
    }
  },
)

/** Create a listing owned by the session user. owner_id is never taken from the body. */
export const createListing = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ListingMutationResult> => {
    const parsed = createListingSchema.safeParse(data)
    if (!parsed.success) {
      return validationFailure(
        'Check the highlighted fields and try again.',
        listingFieldErrors(parsed.error),
      )
    }

    try {
      const sponsor = await sponsorClient('You must be signed in to create a listing.')
      if (!sponsor.ok) return sponsor

      const input: CreateListingInput = parsed.data
      const { data: row, error } = await sponsor.supabase
        .from('property_listings')
        .insert({
          title: input.title,
          description: input.description,
          address_line1: input.address_line1,
          city: input.city,
          region: input.region,
          postal_code: input.postal_code,
          country: input.country,
          price: input.price,
          status: input.status,
          owner_id: sponsor.userId,
        })
        .select(listingColumns)
        .single()

      if (error || !row) {
        return {
          ok: false,
          error: 'Could not create listing. Check your input and try again.',
        }
      }

      return { ok: true, listing: asListingRow(row) }
    } catch {
      return {
        ok: false,
        error: 'Could not create listing. Check your input and try again.',
      }
    }
  })

/** Update a listing only when this sponsor owns it. */
export const updateListing = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ListingMutationResult> => {
    const parsed = updateListingSchema.safeParse(data)
    if (!parsed.success) {
      return validationFailure(
        'Check the highlighted fields and try again.',
        listingFieldErrors(parsed.error),
      )
    }

    const { id, ...patchInput } = parsed.data
    const patch = toUpdatePatch(patchInput)
    if (Object.keys(patch).length === 0) {
      return { ok: false, error: 'No fields to update.' }
    }

    try {
      const sponsor = await sponsorClient('You must be signed in to update a listing.')
      if (!sponsor.ok) return sponsor

      const { data: row, error } = await sponsor.supabase
        .from('property_listings')
        .update(patch)
        .eq('id', id)
        .eq('owner_id', sponsor.userId)
        .select(listingColumns)
        .single()

      if (error || !row) {
        return {
          ok: false,
          error: 'Could not update listing. It may not exist or you may not own it.',
        }
      }

      return { ok: true, listing: asListingRow(row) }
    } catch {
      return {
        ok: false,
        error: 'Could not update listing. It may not exist or you may not own it.',
      }
    }
  })

function toUpdatePatch(input: Omit<UpdateListingInput, 'id'>): ListingUpdate {
  const patch: ListingUpdate = {}
  if (input.title !== undefined) patch.title = input.title
  if (input.description !== undefined) patch.description = blankToNull(input.description)
  if (input.address_line1 !== undefined) patch.address_line1 = input.address_line1
  if (input.city !== undefined) patch.city = input.city
  if (input.region !== undefined) patch.region = blankToNull(input.region)
  if (input.postal_code !== undefined) patch.postal_code = blankToNull(input.postal_code)
  if (input.country !== undefined) patch.country = input.country
  if (input.price !== undefined) patch.price = input.price
  if (input.status !== undefined) patch.status = input.status
  return patch
}
