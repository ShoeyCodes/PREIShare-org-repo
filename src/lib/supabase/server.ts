// Server-only Supabase client.
// Do not import this file from any component, route, or other module that ships to the browser.
// SUPABASE_SERVICE_ROLE_KEY bypasses row-level security. It stays in process.env with no VITE_ prefix.

import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const CHECKLIST = 'docs/setup/supabase-env-checklist.md'

function requireServerEnv(name: 'SUPABASE_URL' | 'SUPABASE_SERVICE_ROLE_KEY'): string {
  const value = process.env[name]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(
      `Missing ${name}. Set this server-only variable in .env.local (never with a VITE_ prefix). See ${CHECKLIST}.`,
    )
  }
  return value
}

/**
 * New server client. Reads env when called.
 * Auth persistence is off so this process does not store a browser session.
 */
export function createServerSupabaseClient() {
  const url = requireServerEnv('SUPABASE_URL')
  const serviceRoleKey = requireServerEnv('SUPABASE_SERVICE_ROLE_KEY')
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
