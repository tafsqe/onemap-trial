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

export default function Sidebar({ active = 'Dashboard', userName = 'Fatma Fatima' }) {
  const navigate = useNavigate()
  const initials = userName
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="oms"
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: 'Inter,system-ui,sans-serif',
        flex: 'none',
        width: '268px',
        background: '#F4F6F8',
        borderRight: '1px solid rgba(16,24,40,.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: '16px 14px 16px 18px',
          minHeight: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: '#101828',
              border: '2px solid var(--hz-green-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--hz-green-400)',
              flex: 'none',
            }}
          >
            <i className="fas fa-mountain" style={{ fontSize: 13 }} />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontFamily: "'IBM Plex Sans',Inter,sans-serif",
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: '-.03em',
                color: '#101828',
                lineHeight: 1,
              }}
            >
              One<span style={{ color: 'var(--hz-green-600)' }}>MAP</span>
            </span>
            <span style={{ fontSize: 6.5, letterSpacing: '.11em', color: 'rgba(16,24,40,.5)', fontWeight: 600 }}>
              ONE MINING AUTOMATION PLATFORM
            </span>
          </span>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 12px', flex: 1, minHeight: 0 }}>
        {NAV_ITEMS.map((it) => {
          const isActive = it.label === active
          const clickable = !!it.to
          return (
            <div
              key={it.label}
              title={it.label}
              onClick={clickable ? () => navigate(it.to) : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minHeight: 44,
                whiteSpace: 'nowrap',
                borderRadius: 8,
                position: 'relative',
                cursor: clickable ? 'pointer' : 'default',
                fontSize: 14.5,
                fontWeight: 600,
                letterSpacing: '-.005em',
                padding: '0 14px',
                justifyContent: 'flex-start',
                background: isActive ? 'var(--hz-green-100)' : 'transparent',
                color: isActive ? 'var(--hz-green-700)' : '#101828',
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    borderRadius: '0 3px 3px 0',
                    background: 'var(--hz-green-600)',
                  }}
                />
              )}
              <span style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flex: 'none' }}>
                <i className={`far ${it.icon}`} />
              </span>
              <span>{it.label}</span>
            </div>
          )
        })}
      </nav>
      <div
        style={{
          borderTop: '1px solid rgba(16,24,40,.09)',
          padding: '16px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 12,
          cursor: 'pointer',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 13, color: '#101828', flex: 'none' }}>{initials}</span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#101828',
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {userName}
        </span>
        <i className="far fa-chevron-down" style={{ fontSize: 11, color: 'rgba(16,24,40,.55)' }} />
      </div>
    </div>
  )
}
