import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import AchievementBar from '../components/AchievementBar.jsx'
import { LineChart } from '../lib/ds.js'
import { obKpis4b, obSeries, obCats, obColors, obVolSeries, obVolCats, obVolColors, obDistRows, obVolRows, pctFmt } from '../data/dummy.js'

function SiteTable({ title, rows }) {
  return (
    <div className="hz-card" style={{ minWidth: 0 }}>
      <div className="hz-card__header">
        <div className="hz-h6" style={{ margin: 0 }}>
          {title}
          <div className="hz-body-s hz-muted" style={{ marginTop: 4, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            Rata-rata bulanan seluruh site
          </div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="hz-table">
          <thead>
            <tr>
              <th>Site Area</th>
              <th className="is-numeric">Actual</th>
              <th className="is-numeric">TARGET</th>
              <th style={{ width: 190 }}>ACHIEVEMENT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.site}>
                <td style={{ fontWeight: 700 }}>{r.site}</td>
                <td className="is-numeric">{r.actual}</td>
                <td className="is-numeric hz-muted">{r.plan}</td>
                <td>
                  <AchievementBar barPct={r.bar} label={r.ach} tone={r.tone} barHeight={10} labelFirst labelWidth={38} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ObDistance() {
  const navigate = useNavigate()

  return (
    <PageShell active="Peta">
      <div className="om-nav">
        <span className="hz-btn hz-btn--text hz-btn--sm" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <i className="far fa-arrow-left" />
          Ringkasan
        </span>
        <span className="om-sep" />
        <span style={{ fontWeight: 700, fontSize: 14 }}>OB Distance</span>
        <span style={{ flex: 1 }} />
        <span className="om-datepicker">
          <i className="far fa-calendar" style={{ color: 'var(--hz-text-tertiary)', fontSize: 13 }} />
          <input type="text" defaultValue="02–09 Sep 2026" style={{ width: 140 }} />
        </span>
      </div>

      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
          {obKpis4b.map((k) => (
            <div className="hz-card" key={k.label}>
              <div className="hz-card__body" style={{ gap: 0 }}>
                <span className="om-eyebrow" style={{ minHeight: 24, fontSize: 10.5 }}>
                  {k.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
                  <span className="om-val" style={{ fontSize: 28 }}>
                    {k.value}
                  </span>
                  <span className="om-val" style={{ fontSize: 28, flex: 'none' }}>
                    {k.pct}
                  </span>
                </div>
                <div style={{ marginTop: 16 }}>
                  <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
          <div className="hz-card">
            <div className="hz-card__header">
              <div>
                <div className="hz-h6" style={{ margin: 0 }}>
                  OB Distance Achievement Trend
                </div>
                <div className="hz-body-s hz-muted" style={{ marginTop: 4 }}>
                  Rata-rata bulanan seluruh site
                </div>
              </div>
            </div>
            <div className="hz-card__body" style={{ paddingTop: 16 }}>
              {LineChart && (
                <LineChart data={obSeries} index="day" categories={obCats} colors={obColors} type="line" fill="none" strokeWidth={2.5} valueFormatter={pctFmt} height={252} minValue={60} maxValue={100} showDots />
              )}
            </div>
          </div>
          <SiteTable title="OB Distance Achievement Trend" rows={obDistRows} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
          <div className="hz-card">
            <div className="hz-card__header">
              <div>
                <div className="hz-h6" style={{ margin: 0 }}>
                  OB Volume Achievement Trend
                </div>
                <div className="hz-body-s hz-muted" style={{ marginTop: 4 }}>
                  Rata-rata bulanan seluruh site
                </div>
              </div>
            </div>
            <div className="hz-card__body" style={{ paddingTop: 16 }}>
              {LineChart && (
                <LineChart data={obVolSeries} index="day" categories={obVolCats} colors={obVolColors} type="line" fill="none" strokeWidth={2.5} valueFormatter={pctFmt} height={252} minValue={0} maxValue={40} showDots />
              )}
            </div>
          </div>
          <SiteTable title="OB Volume Achievement Trend" rows={obVolRows} />
        </div>
      </div>
    </PageShell>
  )
}
