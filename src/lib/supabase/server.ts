// SERVER-ONLY: never import this file from browser components or client routes.

/// <reference types="node" />
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

export function createServerSupabaseClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Missing server Supabase env. See docs/setup/supabase-env-checklist.md')
  }
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
