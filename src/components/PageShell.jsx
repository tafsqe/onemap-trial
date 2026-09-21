import Sidebar from './Sidebar.jsx'

// Shared app-shell layout used by every page: a fixed 268px sidebar plus a
// content column (om-nav topbar + page body), matching the
// `padding-left:268px` + absolutely-positioned sidebar pattern from the
// mockup's `{{ themeCls }}` root div.
export default function PageShell({ active, children }) {
  return (
    <div className="theme-hz-azure om-shell">
      <div className="om-sidebar-slot">
        <Sidebar active={active} />
      </div>
      {children}
    </div>
  )
}
