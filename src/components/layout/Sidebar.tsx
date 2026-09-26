import type { ReactNode } from 'react'
import { NavItems } from './NavItems'

type SidebarProps = {
  brandLabel?: string
  children?: ReactNode
}

/** Left navigation chrome for the investor dashboard shell. */
export function Sidebar({ brandLabel = 'PREIshare', children }: SidebarProps) {
  return (
    <aside
      id="investor-sidebar"
      className="dashboard-sidebar dash-sidebar"
      aria-label="Investor navigation"
    >
      <h1 className="sidebar-brand">{brandLabel}</h1>
      <NavItems />
      {children}
    </aside>
  )
}
