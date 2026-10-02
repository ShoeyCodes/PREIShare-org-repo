// Browser-safe Supabase client. Safe to import from browser code.
// Session cookies are the same login the server session helper reads.

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createBrowserSupabaseClient() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. See docs/setup/supabase-env-checklist.md',
    )
  }
  return createBrowserClient<Database>(url, anonKey)
}
