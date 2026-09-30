import { Link } from '@tanstack/react-router'

const navItems = [
  { label: 'Home', to: '/dashboard' },
  { label: 'Portfolio', to: '/dashboard/portfolio' },
  { label: 'Deals', to: '/dashboard/deals' },
  { label: 'Profile', to: '/dashboard/profile' },
] as const

export function Sidebar() {
  return (
    <aside className="hidden bg-slate-800 p-4 md:flex md:w-56 md:flex-col md:border-r md:border-slate-700">
      <p className="mb-4 text-sm font-semibold text-white">PREIshare</p>
      <nav aria-label="Dashboard">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block rounded bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
