// Browser-safe Supabase client. Safe to import from browser code.
// Session cookies are the same login the server session helper reads.

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import { normalizeSupabaseUrl } from './url'

export function createBrowserSupabaseClient() {
  // Direct property access is required so Vite can inline these at build time.
  // Vercel’s Supabase integration provides the NEXT_PUBLIC_ names. Local
  // setup still uses the VITE_ names. Never read the service-role key here.
  const rawUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const url = rawUrl ? normalizeSupabaseUrl(rawUrl) : rawUrl
  if (!url || !anonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. See docs/setup/supabase-env-checklist.md',
    )
  }
  return createBrowserClient<Database>(url, anonKey)
}
