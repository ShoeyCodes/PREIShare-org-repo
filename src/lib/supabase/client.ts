// Browser Supabase client. Reads only public Vite env vars.
// Do not read SUPABASE_SERVICE_ROLE_KEY here. Do not import ./server from this file.

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const CHECKLIST = 'docs/setup/supabase-env-checklist.md'

function requirePublicEnv(name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'): string {
  const value = import.meta.env[name]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill in the public Supabase values. See ${CHECKLIST}.`,
    )
  }
  return value
}

/** New browser client. Call this when you need it; do not share one client across keys. */
export function createBrowserSupabaseClient() {
  const url = requirePublicEnv('VITE_SUPABASE_URL')
  const anonKey = requirePublicEnv('VITE_SUPABASE_ANON_KEY')
  return createClient<Database>(url, anonKey)
}
