import type { ReactNode } from 'react'

type SidebarProps = {
  brandLabel?: string
  children?: ReactNode
}

/** Left navigation chrome for the investor dashboard shell. */
export function Sidebar({ brandLabel = 'PREIshare', children }: SidebarProps) {
  return (
    <aside className="dashboard-sidebar" aria-label="Investor navigation">
      <h1 className="sidebar-brand">{brandLabel}</h1>
      <nav className="sidebar-nav">
        {/* Placeholder links — full nav config + active states come in the next step */}
        <ul>
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/dashboard/portfolio">Portfolio</a></li>
          <li><a href="/dashboard/deals">Deals</a></li>
          <li><a href="/dashboard/profile">Profile</a></li>
        </ul>
        {children}
      </nav>
    </aside>
  )
}
