// Creates a confirmed sponsor without sending a confirmation email.
// The built-in Supabase mailer allows 2 messages per hour, so sign-up must
// not call auth.signUp. The service role stays inside this server function.

import { createServerFn } from '@tanstack/react-start'

export type RegisterSponsorResult = { ok: true } | { ok: false; error: string }

export const registerSponsor = createServerFn({ method: 'POST' })
  .validator((input: unknown): { email: string; password: string } => {
    if (!input || typeof input !== 'object') {
      throw new Error('Email and password are required.')
    }
    const record = input as { email?: unknown; password?: unknown }
    const email = String(record.email ?? '').trim()
    const password = String(record.password ?? '')
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.')
    }
    return { email, password }
  })
  .handler(async ({ data }): Promise<RegisterSponsorResult> => {
    const { createServerSupabaseClient } = await import('../lib/supabase/server')
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    })
    if (!error) return { ok: true }

    const message = error.message.toLowerCase()
    if (message.includes('already') || message.includes('registered')) {
      return {
        ok: false,
        error: 'An account with that email already exists. Log in instead.',
      }
    }
    return { ok: false, error: 'Could not create the account. Try again.' }
  })
