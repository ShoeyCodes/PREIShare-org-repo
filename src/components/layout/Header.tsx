import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { getPageTitle } from './navConfig'

type HeaderProps = {
  title?: string | undefined
  children?: ReactNode
  navOpen?: boolean
  onToggleNav?: () => void
}

/** Top bar: page title from the shared nav config, plus an optional actions slot. */
export function Header({ title, children, navOpen = false, onToggleNav }: HeaderProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const pageTitle = title ?? getPageTitle(pathname)

  return (
    <header className="dashboard-header dash-header">
      <button
        type="button"
        className="dash-menu-toggle"
        aria-expanded={navOpen}
        aria-controls="investor-sidebar"
        onClick={onToggleNav}
      >
        {navOpen ? 'Close' : 'Menu'}
      </button>
      <h1 className="header-title">{pageTitle}</h1>
      <div className="header-actions">{children}</div>
    </header>
  )
}
