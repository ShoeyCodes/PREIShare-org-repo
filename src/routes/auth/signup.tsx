import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { createBrowserSupabaseClient } from '../../lib/supabase/client'

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
})

function SignupPage() {
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      if (data.session) {
        await navigate({ to: '/dashboard' })
        return
      }
      await navigate({ to: '/auth/login' })
    } catch (signUpError) {
      setError(
        signUpError instanceof Error
          ? signUpError.message
          : 'Could not create the account. Try again.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 text-[var(--sea-ink)]">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
        Create a sponsor account with email and password.
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
            autoComplete="new-password"
            required
            minLength={6}
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
          {pending ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--sea-ink-soft)]">
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </main>
  )
}
