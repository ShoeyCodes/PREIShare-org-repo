import { useEffect, useState, type ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type AppShellProps = {
  title?: string
  children: ReactNode
}

/**
 * Shared investor chrome: sidebar + header + main content region.
 * Child routes render inside `children` (wired from the dashboard layout route).
 */
export function AppShell({ title, children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  return (
    <div className={navOpen ? 'app-shell dash-shell nav-open' : 'app-shell dash-shell'}>
      <Sidebar />
      <button
        type="button"
        className="dash-sidebar-backdrop"
        aria-label="Close navigation"
        onClick={() => setNavOpen(false)}
      />
      <div className="app-shell-main-column dash-main">
        <Header
          title={title}
          navOpen={navOpen}
          onToggleNav={() => setNavOpen((open) => !open)}
        />
        <main className="app-shell-content dash-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
