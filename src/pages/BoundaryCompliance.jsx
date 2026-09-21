import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import { LineChart } from '../lib/ds.js'
import { bcKpis3, bcTrend, bcTrendMonthly, bcCats, bcColors, bcDashed, bcMatrixSites, bcMatrix, pctFmt } from '../data/dummy.js'

export default function BoundaryCompliance() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('weekly')
  const trend = period === 'monthly' ? bcTrendMonthly : bcTrend
  const indexKey = period === 'monthly' ? 'month' : 'week'

  return (
    <PageShell active="Peta Boundary">
      <div className="om-nav">
        <span className="hz-btn hz-btn--text hz-btn--sm" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <i className="far fa-arrow-left" />
          Ringkasan
        </span>
        <span className="om-sep" />
        <span style={{ fontWeight: 700, fontSize: 14 }}>Boundary Compliance</span>
        <span style={{ flex: 1 }} />
        <span className="om-datepicker">
          <i className="far fa-calendar" style={{ color: 'var(--hz-text-tertiary)', fontSize: 13 }} />
          <input type="text" defaultValue="15 Agu – 14 Sep 2026" style={{ width: 150 }} />
        </span>
      </div>

      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bcKpis3.map((k) => (
              <div className="hz-card" key={k.label}>
                <div className="hz-card__body" style={{ gap: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                    <span className="om-eyebrow">{k.label}</span>
                    {k.chip && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 8px',
                          borderRadius: 999,
                          background: k.gapBg,
                          color: k.gapColor,
                          fontSize: 12,
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          flex: 'none',
                        }}
                      >
                        <i className={`far ${k.gapIcon}`} style={{ fontSize: 10.5 }} />
                        {k.chip}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 10 }}>
                    <span className="om-val" style={{ fontSize: 34 }}>
                      {k.value}
                    </span>
                    <span className="hz-body-r hz-muted">{k.unit}</span>
                  </div>
                  {k.showBar && (
                    <div style={{ marginTop: 16 }}>
                      <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
                    </div>
                  )}
                  {!k.showBar && (
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--hz-text-secondary)' }}>
                      {k.legend.map((l) => (
                        <span key={l.text}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              marginRight: 6,
                              verticalAlign: 'middle',
                              background: l.color,
                            }}
                          />
                          {l.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hz-card">
            <div className="hz-card__header">
              <div>
                <div className="hz-h6" style={{ margin: 0 }}>
                  Compliance trend
                </div>
              </div>
              <nav className="hz-tabs--pill">
                <button onClick={() => setPeriod('weekly')} className={period === 'weekly' ? 'hz-tab--pill is-active' : 'hz-tab--pill'}>
                  Mingguan
                </button>
                <button onClick={() => setPeriod('monthly')} className={period === 'monthly' ? 'hz-tab--pill is-active' : 'hz-tab--pill'}>
                  Bulanan
                </button>
              </nav>
            </div>
            <div className="hz-card__body" style={{ paddingTop: 16 }}>
              {LineChart && (
                <LineChart
                  data={trend}
                  index={indexKey}
                  categories={bcCats}
                  colors={bcColors}
                  dashed={bcDashed}
                  type="line"
                  fill="none"
                  strokeWidth={2.5}
                  valueFormatter={pctFmt}
                  height={236}
                  minValue={90}
                  maxValue={102}
                  showDots
                />
              )}
            </div>
          </div>
        </div>

        <div className="hz-card">
          <div className="hz-card__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <i className="fas fa-map-marker-alt" style={{ fontSize: 16, color: 'var(--hz-text-primary)' }} />
              <div className="hz-h6" style={{ margin: 0 }}>
                Outside Boundary by Site
              </div>
            </div>
            <span className="hz-body-s hz-muted">Semua angka dalam Ha</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="hz-table" style={{ minWidth: 1000, tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ width: 150, whiteSpace: 'nowrap' }}>Regulation</th>
                  <th className="is-numeric" style={{ width: 130, whiteSpace: 'nowrap' }}>
                    Total Outside
                  </th>
                  <th style={{ width: 130, whiteSpace: 'nowrap' }}>Status</th>
                  {bcMatrixSites.map((site) => (
                    <th key={site} style={{ textAlign: 'center', width: 88, whiteSpace: 'nowrap' }}>
                      {site}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bcMatrix.map((row) => (
                  <tr key={row.label} style={{ borderTop: '1px solid #fff' }}>
                    <td style={{ fontWeight: 700, padding: '8px 12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <i className={`far ${row.icon}`} style={{ color: 'var(--hz-text-secondary)', width: 15, textAlign: 'center' }} />
                        {row.label}
                      </span>
                    </td>
                    <td className="is-numeric" style={{ fontWeight: 700, padding: '8px 12px' }}>
                      {row.total}
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      <span className={row.statusCls}>
                        <i className={`far ${row.statusIcon}`} style={{ marginRight: 6 }} />
                        {row.statusTxt}
                      </span>
                    </td>
                    {row.allSites ? (
                      <td colSpan={6} style={{ textAlign: 'center', background: row.allSitesCell.bg, padding: '8px 6px', whiteSpace: 'nowrap', borderLeft: '1px solid #fff' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: row.allSitesCell.fg, fontWeight: 700, fontSize: 12.5 }}>
                          <i className={`far ${row.allSitesCell.icon}`} style={{ fontSize: 12 }} />
                          {row.allSitesCell.val}
                        </span>
                      </td>
                    ) : (
                      row.cells.map((cell, i) => (
                        <td key={i} style={{ textAlign: 'center', background: cell.bg, padding: '8px 6px', whiteSpace: 'nowrap', borderLeft: '1px solid #fff' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: cell.fg, fontWeight: 700, fontSize: 12.5 }}>
                            <i className={`far ${cell.icon}`} style={{ fontSize: 12 }} />
                            {cell.val}
                          </span>
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
