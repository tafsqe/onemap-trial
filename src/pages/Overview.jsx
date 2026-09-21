import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import GapChip from '../components/GapChip.jsx'
import { MineMap } from '../lib/ds.js'
import { readyCards, pendingCards, boundary, mapRoutes, mapMarkers, mapCenter, mapZoom, mapFlushStyle, basemap } from '../data/dummy.js'

export default function Overview() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState({})

  const toggleFacts = (e, id) => {
    e.stopPropagation()
    setExpanded((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <PageShell active="Dashboard">
      <div className="om-nav">
        <nav className="hz-breadcrumb">
          <span className="hz-breadcrumb__item">Operasi</span>
          <i className="far fa-chevron-right hz-breadcrumb__sep" />
          <span className="hz-breadcrumb__item is-current">Ringkasan</span>
        </nav>
        <span style={{ flex: 1 }} />
        <span className="om-datepicker">
          <i className="far fa-calendar" style={{ color: 'var(--hz-text-tertiary)', fontSize: 13 }} />
          <input type="text" defaultValue="15 Agu – 14 Sep 2026" style={{ width: 150 }} />
        </span>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {readyCards.map((c) => {
            const factsOpen = !!expanded[c.id]
            return (
              <div
                key={c.id}
                className="hz-card"
                onClick={() => navigate(c.target)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div className="hz-card__body" style={{ gap: 0, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, minHeight: 44 }}>
                    <span
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: c.iconBg,
                        color: c.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'none',
                      }}
                    >
                      <i className={`far ${c.icon}`} style={{ fontSize: 19 }} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3, height: 44, justifyContent: 'center', overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.015em', color: 'var(--hz-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.label}
                      </div>
                      <div className="hz-body-s hz-muted" style={{ textTransform: 'none', letterSpacing: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.idn}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flex: 'none', height: 44, justifyContent: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: 'var(--hz-horizon-primary)', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        Lihat detail
                        <i className="far fa-arrow-right" style={{ fontSize: 10 }} />
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span className="om-val" style={{ fontSize: 44, lineHeight: 1 }}>
                        {c.value}
                      </span>
                      <span className="hz-body-s hz-muted" style={{ whiteSpace: 'nowrap' }}>
                        {c.unit}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <span className="hz-body-s" style={{ color: 'var(--hz-text-secondary)', whiteSpace: 'nowrap' }}>
                        {c.targetLabel}: <b style={{ color: 'var(--hz-text-primary)' }}>{c.targetVal}</b>
                      </span>
                      <GapChip icon={c.gapIcon} text={c.gapTxt} color={c.gapColor} bg={c.gapBg} />
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <CategoryBar barPct={`${c.catValues[0]}%`} fillColor={c.catLabels[0].color} remainderColor={c.remainderColor} legend={c.catLabels} />
                  </div>

                  <div style={{ marginTop: 20, borderRadius: 10, background: 'var(--hz-neutral-50)', border: '1px solid var(--hz-border-subtle)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div
                      onClick={(e) => toggleFacts(e, c.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 14px', cursor: 'pointer' }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--hz-text-secondary)' }}>Rincian</span>
                      <i className={`far ${factsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: 12, color: 'var(--hz-text-tertiary)' }} />
                    </div>
                    {factsOpen &&
                      c.facts.map((ft, i) => (
                        <div
                          key={i}
                          className="om-fact"
                          style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, padding: '11px 14px', borderTop: '1px solid var(--hz-border-subtle)' }}
                        >
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--hz-text-secondary)' }}>{ft.label}</span>
                          <span style={{ display: 'flex', alignItems: 'baseline', gap: 7, textAlign: 'right' }}>
                            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--hz-text-primary)' }}>{ft.value}</span>
                            <span style={{ fontSize: 11.5, color: 'var(--hz-text-tertiary)' }}>{ft.note}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {pendingCards.map((c) => (
            <div
              key={c.label}
              className="hz-card"
              style={{ display: 'flex', flexDirection: 'column', borderStyle: 'dashed', borderColor: 'var(--hz-neutral-300)', background: 'var(--hz-neutral-50)', boxShadow: 'none' }}
            >
              <div className="hz-card__body" style={{ gap: 0, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--hz-neutral-100)',
                      color: 'var(--hz-neutral-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none',
                    }}
                  >
                    <i className={`far ${c.icon}`} style={{ fontSize: 19 }} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.015em', color: 'var(--hz-neutral-500)' }}>{c.label}</div>
                    <div className="hz-body-s hz-muted" style={{ textTransform: 'none', letterSpacing: 0 }}>
                      {c.idn}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginTop: 22 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="om-val" style={{ fontSize: 44, lineHeight: 1, color: 'var(--hz-neutral-300)' }}>
                      —
                    </span>
                    <span className="hz-body-s hz-muted">data belum tersedia</span>
                  </div>
                </div>
                <div style={{ marginTop: 20, height: 14, borderRadius: 999, background: 'var(--hz-neutral-200)' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="hz-card">
          <div className="hz-card__header">
            <div>
              <div className="hz-h6" style={{ margin: 0 }}>
                Peta Operasional
              </div>
              <div className="hz-body-s hz-muted">Batas IUP · pit aktif · rute hauling</div>
            </div>
            <span className="hz-chip hz-chip--clickable">
              <i className="far fa-expand" style={{ marginRight: 6 }} />
              Buka penuh
            </span>
          </div>
          {MineMap && (
            <MineMap
              basemap={basemap}
              center={mapCenter}
              zoom={mapZoom}
              height={300}
              boundary={boundary}
              routes={mapRoutes}
              markers={mapMarkers}
              showLegend={false}
              style={mapFlushStyle}
            />
          )}
        </div>
      </div>
    </PageShell>
  )
}
