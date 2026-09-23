import { useLocation, useNavigate } from 'react-router-dom'

// Underline switcher between the two dashboards: "Reporting" (this app —
// Overview/Boundary Compliance/Production/OB Distance) and "Overview" (the
// older dashboard, lives in a separate repo; shown here as a screenshot
// placeholder). Only rendered on the Dashboard landing page and its
// Overview-dashboard counterpart — the per-report pages (Boundary
// Compliance, Production, OB Distance) don't repeat it.
const TABS = [
  { label: 'Reporting', to: '/', match: (path) => path !== '/overview-dashboard' },
  { label: 'Overview', to: '/overview-dashboard', match: (path) => path === '/overview-dashboard' },
]

export default function DashboardTabs() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="flex gap-6 px-5">
      {TABS.map((tab) => {
        const isActive = tab.match(pathname)
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.to)}
            className={`-mb-px border-b-2 py-2.5 text-sm font-semibold transition-colors ${
              isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-950'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
