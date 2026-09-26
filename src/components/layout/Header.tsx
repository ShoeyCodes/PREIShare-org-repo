import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { getPageTitle } from './navConfig'

type HeaderProps = {
  title?: string
  children?: ReactNode
}

/** Top bar: page title from the shared nav config, plus an optional actions slot. */
export function Header({ title, children }: HeaderProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const pageTitle = title ?? getPageTitle(pathname)

  return (
    <header className="dashboard-header">
      <h1 className="header-title">{pageTitle}</h1>
      <div className="header-actions">{children}</div>
    </header>
  )
}
