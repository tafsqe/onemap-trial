import { useEffect, useState } from 'react'
import Sidebar from './Sidebar.jsx'

const COLLAPSE_KEY = 'onemap.sidebarCollapsed'
const WIDTH_EXPANDED = 268
const WIDTH_COLLAPSED = 76

// Shared app-shell layout used by every page: a sidebar plus a content
// column, matching the mockup's `{{ themeCls }}` root div. The
// `theme-hz-azure` class stays (from design-system/tokens.css) — it sets
// --hz-horizon-primary, which the _ds_bundle.js chart/map widgets read
// directly. Sidebar collapse state is kept in localStorage (not React
// context) since it's a single boolean and every page remounts PageShell
// fresh on navigation.
export default function PageShell({ active, children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === '1')

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  const width = collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED

  return (
    <div className="theme-hz-azure relative flex min-h-screen flex-col bg-neutral-50" style={{ paddingLeft: width }}>
      <div className="absolute inset-y-0 left-0 z-1200 flex" style={{ width }}>
        <Sidebar active={active} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
      </div>
      {children}
    </div>
  )
}
