// Server-only session helpers.
// Uses the anon-key cookie client so the signed-in sponsor is auth.uid().
// Does not use the service-role client.

import { createUserServerSupabaseClient } from '../supabase/server'

export async function getSession() {
  const supabase = createUserServerSupabaseClient()
  const { data, error } = await supabase.auth.getSession()
  if (error) return null
  return data.session
}

export async function getUser() {
  const supabase = createUserServerSupabaseClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null
  return data.user
}

export async function signOut() {
  const supabase = createUserServerSupabaseClient()
  await supabase.auth.signOut()
}
