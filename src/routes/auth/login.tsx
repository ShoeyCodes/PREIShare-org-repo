import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { createBrowserSupabaseClient } from '../../lib/supabase/client'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')
    try {
      const supabase = createBrowserSupabaseClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        const message = signInError.message.toLowerCase()
        setError(
          message.includes('rate limit')
            ? 'Supabase only allows 2 confirmation emails per hour. If this account already exists, wait about an hour and log in again.'
            : signInError.message,
        )
        return
      }
      await navigate({ to: '/dashboard' })
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : 'Could not sign in. Try again.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 text-[var(--sea-ink)]">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
        Sponsors sign in with email and password.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium">
          Email
          <input
            className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-[var(--sea-ink)]"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-[var(--sea-ink)]"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
        <button
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          {pending ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--sea-ink-soft)]">
        Need an account? <Link to="/auth/signup">Sign up</Link>
      </p>
    </main>
  )
}
