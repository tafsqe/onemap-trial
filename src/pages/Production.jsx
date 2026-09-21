import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import AchievementBar from '../components/AchievementBar.jsx'
import { ComboChart } from '../lib/ds.js'
import { prodKpis3a, prodSeries, prodBarCats, prodLineCats, prodColors, prodLineColors, prodRows, ktFmt, pctWholeFmt } from '../data/dummy.js'

export default function Production() {
  const navigate = useNavigate()

  return (
    <PageShell active="Dashboard">
      <div className="om-nav">
        <span className="hz-btn hz-btn--text hz-btn--sm" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <i className="far fa-arrow-left" />
        </span>
        <nav className="hz-breadcrumb">
          <span className="hz-breadcrumb__item">Ringkasan</span>
          <i className="far fa-chevron-right hz-breadcrumb__sep" />
          <span className="hz-breadcrumb__item is-current">Production</span>
        </nav>
        <span className="om-sep" />
        <span className="hz-chip hz-chip--clickable">
          <i className="far fa-map-marker-alt" style={{ marginRight: 7 }} />
          Semua Site
        </span>
        <span className="hz-chip hz-chip--clickable">Semua kontraktor</span>
        <span style={{ flex: 1 }} />
        <span className="om-datepicker">
          <i className="far fa-calendar" style={{ color: 'var(--hz-text-tertiary)', fontSize: 13 }} />
          <input type="text" defaultValue="01–31 Agu 2026" style={{ width: 130 }} />
        </span>
      </div>

      <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {prodKpis3a.map((k) => (
            <div className="hz-card" key={k.label}>
              <div className="hz-card__body" style={{ gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 48 }}>
                    <span className="om-eyebrow">{k.label}</span>
                    {k.sub && (
                      <span className="hz-body-s hz-muted" style={{ textTransform: 'none', letterSpacing: 0, width: 139, height: 31 }}>
                        {k.sub}
                      </span>
                    )}
                  </span>
                  <span className={k.cls} style={{ flex: 'none' }}>
                    {k.chip}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 10 }}>
                  <span className="om-val" style={{ fontSize: 28, color: k.valColor }}>
                    {k.value}
                  </span>
                  <span className="hz-body-r hz-muted">{k.unit}</span>
                </div>
                <div style={{ marginTop: 16 }}>
                  <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} direction="column" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hz-card">
          <div className="hz-card__header">
            <div>
              <div className="hz-h6" style={{ margin: 0 }}>
                Achievement per bulan
              </div>
            </div>
          </div>
          <div className="hz-card__body" style={{ paddingTop: 16 }}>
            {ComboChart && (
              <ComboChart
                data={prodSeries}
                index="day"
                barCategories={prodBarCats}
                lineCategories={prodLineCats}
                barColors={prodColors}
                lineColors={prodLineColors}
                valueFormatter={ktFmt}
                lineValueFormatter={pctWholeFmt}
                height={268}
              />
            )}
          </div>
        </div>

        <div className="hz-card">
          <div className="hz-card__header">
            <div className="hz-h6" style={{ margin: 0 }}>
              Coal getting by site
            </div>
          </div>
          <table className="hz-table" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: 130 }}>SITE</th>
                <th className="is-numeric" style={{ width: 150 }}>
                  Actual
                </th>
                <th className="is-numeric" style={{ width: 150 }}>
                  Target
                </th>
                <th>ACHIEVEMENT</th>
              </tr>
            </thead>
            <tbody>
              {prodRows.map((r) => (
                <tr key={r.pit}>
                  <td style={{ fontWeight: 600 }}>{r.pit}</td>
                  <td className="is-numeric" style={{ fontWeight: 600 }}>
                    {r.actual}
                  </td>
                  <td className="is-numeric hz-muted">{r.plan}</td>
                  <td>
                    <AchievementBar barPct={r.bar} label={r.ach} tone={r.tone} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
