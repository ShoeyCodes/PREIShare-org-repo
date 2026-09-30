import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const navItems = [
  { label: 'Home', to: '/dashboard' },
  { label: 'Portfolio', to: '/dashboard/portfolio' },
  { label: 'Deals', to: '/dashboard/deals' },
  { label: 'Profile', to: '/dashboard/profile' },
] as const

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-white"
        aria-expanded={open}
        aria-controls="mobile-dashboard-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>
      {open ? (
        <nav
          id="mobile-dashboard-menu"
          aria-label="Dashboard"
          className="mt-2 rounded border border-slate-700 bg-slate-800 p-3"
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded bg-slate-700 px-3 py-2 text-sm font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
