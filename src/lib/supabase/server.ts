// SERVER-ONLY: never import this file from browser components or client routes.

/// <reference types="node" />
import process from 'node:process'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import {
  getCookies,
  setCookie,
  setResponseHeader,
} from '@tanstack/react-start/server'
import type { Database } from './types'
import { normalizeSupabaseUrl } from './url'

/**
 * Service-role client. Bypasses row-level security.
 * Do not use this for sponsor listing reads or writes.
 */
export function createServerSupabaseClient() {
  const rawUrl =
    process.env.SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL
  const url = rawUrl ? normalizeSupabaseUrl(rawUrl) : rawUrl
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

/**
 * Server client for the signed-in sponsor.
 * Uses the anon key plus the request cookies, so auth.uid() is that sponsor
 * and row-level security applies. Never reads SUPABASE_SERVICE_ROLE_KEY.
 */
export function createUserServerSupabaseClient() {
  const rawUrl =
    process.env.SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL
  const url = rawUrl ? normalizeSupabaseUrl(rawUrl) : rawUrl
  const anonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !anonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. See docs/setup/supabase-env-checklist.md',
    )
  }

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({
          name,
          value,
        }))
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value, options } of cookiesToSet) {
          setCookie(name, value, options)
        }
        for (const [name, value] of Object.entries(headers)) {
          setResponseHeader(name, value)
        }
      },
    },
  })
}
