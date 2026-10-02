// Types for public.property_listings.
// Column list matches docs/data-model/property-listings-schema.md.

export type PropertyListingStatus = 'draft' | 'published' | 'archived'

export type PropertyListingRow = {
  id: string
  owner_id: string
  title: string
  description: string | null
  address_line1: string
  city: string
  region: string | null
  postal_code: string | null
  country: string
  price: number
  status: PropertyListingStatus
  created_at: string
  updated_at: string
}

export type PropertyListingInsert = {
  id?: string
  owner_id: string
  title: string
  description?: string | null
  address_line1: string
  city: string
  region?: string | null
  postal_code?: string | null
  country?: string
  price: number
  status?: PropertyListingStatus
  created_at?: string
  updated_at?: string
}

export type PropertyListingUpdate = {
  id?: string
  owner_id?: string
  title?: string
  description?: string | null
  address_line1?: string
  city?: string
  region?: string | null
  postal_code?: string | null
  country?: string
  price?: number
  status?: PropertyListingStatus
  created_at?: string
  updated_at?: string
}

export type Database = {
  public: {
    Tables: {
      property_listings: {
        Row: PropertyListingRow
        Insert: PropertyListingInsert
        Update: PropertyListingUpdate
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
