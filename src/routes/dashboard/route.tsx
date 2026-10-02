// Layout route for everything under /dashboard.
import { Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { AppShell } from '../../components/dashboard/AppShell'
import { createBrowserSupabaseClient } from '../../lib/supabase/client'

const fetchDashboardUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { getUser } = await import('../../lib/auth/session')
  const user = await getUser()
  if (!user) return null
  return { id: user.id }
})

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const user = await fetchDashboardUser()
    if (!user) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const navigate = useNavigate()

  async function onSignOut() {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    await navigate({ to: '/auth/login' })
  }

  return (
    <AppShell>
      <div className="mb-4 flex justify-end">
        <button
          className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800"
          type="button"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
      <Outlet />
    </AppShell>
  )
}
