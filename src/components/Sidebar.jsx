import { useNavigate } from 'react-router-dom'

// Port of "OneMap Sidebar.dc.html" — the source mockup rendered this as a
// static <dc-import>, with no built-in navigation. Routable items get an
// onClick here so the app is actually click-through; "Chat" and "Alert and
// Task Management" have no page yet, so they're inert.
const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'fa-th-large', to: '/' },
  { label: 'Chat', icon: 'fa-comments-alt', to: null },
  { label: 'Peta', icon: 'fa-map', to: '/ob-distance' },
  { label: 'Peta Boundary', icon: 'fa-layer-group', to: '/boundary-compliance' },
  { label: 'Alert and Task Management', icon: 'fa-list-ul', to: null },
]

export default function Sidebar({ active = 'Dashboard', userName = 'Fatma Fatima', collapsed = false, onToggleCollapse }) {
  const navigate = useNavigate()
  const initials = userName
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={`box-border flex h-full flex-none flex-col border-r border-[#101828]/8 bg-[#F4F6F8] font-sans transition-[width] duration-150 ${collapsed ? 'w-[76px]' : 'w-[268px]'}`}>
      <div className={`flex min-h-16 items-center gap-2.5 py-4 ${collapsed ? 'justify-center px-2' : 'justify-between pr-3.5 pl-4.5'}`}>
        <div className={`flex items-center gap-2.25 ${collapsed ? 'flex-col' : ''}`}>
          <span className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-full border-2 border-green-500 bg-[#101828] text-green-400">
            <i className="fas fa-mountain text-[13px]" />
          </span>
          {!collapsed && (
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-[19px] leading-none font-bold tracking-[-.03em] text-[#101828]">
                One<span className="text-green-600">MAP</span>
              </span>
              <span className="text-[6.5px] font-semibold tracking-[.11em] text-[#101828]/50">ONE MINING AUTOMATION PLATFORM</span>
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            title="Ciutkan sidebar"
            className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-[#101828]/55 transition-colors hover:bg-[#101828]/8 hover:text-[#101828]"
          >
            <i className="far fa-chevron-left text-xs" />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pb-2">
          <button
            onClick={onToggleCollapse}
            title="Perluas sidebar"
            className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-[#101828]/55 transition-colors hover:bg-[#101828]/8 hover:text-[#101828]"
          >
            <i className="far fa-chevron-right text-xs" />
          </button>
        </div>
      )}

      <nav className="flex min-h-0 flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((it) => {
          const isActive = it.label === active
          const clickable = !!it.to
          return (
            <div
              key={it.label}
              title={it.label}
              onClick={clickable ? () => navigate(it.to) : undefined}
              className={`relative flex min-h-11 items-center gap-3 rounded-lg text-[14.5px] font-semibold tracking-[-.005em] whitespace-nowrap transition-colors ${
                collapsed ? 'justify-center px-0' : 'justify-start px-3.5'
              } ${clickable ? 'cursor-pointer' : 'cursor-default'} ${
                isActive ? 'bg-green-100 text-green-700' : `text-[#101828] ${clickable ? 'hover:bg-[#101828]/6' : ''}`
              }`}
            >
              {isActive && <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-r-[3px] bg-green-600" />}
              <span className="flex w-5.5 flex-none items-center justify-center text-base">
                <i className={`far ${it.icon}`} />
              </span>
              {!collapsed && <span>{it.label}</span>}
            </div>
          )
        })}
      </nav>

      <div
        title={collapsed ? userName : undefined}
        className={`flex cursor-pointer items-center gap-3 border-t border-[#101828]/9 py-4 transition-colors hover:bg-[#101828]/6 ${collapsed ? 'justify-center px-2' : 'justify-start px-4.5'}`}
      >
        <span className="flex-none text-[13px] font-bold text-[#101828]">{initials}</span>
        {!collapsed && (
          <>
            <span className="flex-1 overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap text-[#101828]">{userName}</span>
            <i className="far fa-chevron-down text-[11px] text-[#101828]/55" />
          </>
        )}
      </div>
    </div>
  )
}
