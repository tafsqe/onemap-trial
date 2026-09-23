import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateRangePicker from '../components/DateRangePicker.jsx'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import { LineChart } from '../lib/ds.js'
import { BOUNDARY_BASELINE_RANGE, buildBoundaryComplianceData, bcCats, bcColors, bcDashed, bcMatrixSites, pctFmt } from '../data/dummy.js'

export default function BoundaryCompliance() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('weekly')
  const [range, setRange] = useState(BOUNDARY_BASELINE_RANGE)
  const { bcKpis3, bcTrend, bcTrendMonthly, bcMatrix } = useMemo(() => buildBoundaryComplianceData(range), [range])
  const trend = period === 'monthly' ? bcTrendMonthly : bcTrend
  const indexKey = period === 'monthly' ? 'month' : 'week'

  return (
    <PageShell active="Peta Boundary">
      <div className="flex h-14 items-center gap-3 border-b border-neutral-200 bg-white px-5">
        <span
          onClick={() => navigate('/')}
          className="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-bold text-primary-600 hover:bg-primary-50"
        >
          <i className="far fa-arrow-left" />
          Ringkasan
        </span>
        <span className="h-5.5 w-px bg-neutral-200" />
        <span className="text-sm font-bold text-neutral-950">Boundary Compliance</span>
        <span className="flex-1" />
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      <div className="flex flex-col gap-4 px-6 pt-5.5 pb-6.5">
        <div className="grid grid-cols-[280px_1fr] items-stretch gap-4">
          <div className="flex flex-col gap-4">
            {bcKpis3.map((k) => (
              <div key={k.label} className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
                <div className="flex flex-col gap-0 p-6">
                  <div className="flex items-start justify-between gap-2.5">
                    <span className="text-[10.5px] font-bold tracking-[.13em] text-neutral-500 uppercase">{k.label}</span>
                    {k.chip && (
                      <span
                        className="inline-flex flex-none items-center gap-1.25 rounded-full px-2 py-0.75 text-xs font-bold whitespace-nowrap"
                        style={{ background: k.gapBg, color: k.gapColor }}
                      >
                        <i className={`far ${k.gapIcon} text-[10.5px]`} />
                        {k.chip}
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-baseline gap-1.75">
                    <span className="font-display text-[34px] leading-none font-bold tracking-[-.03em] text-neutral-950">{k.value}</span>
                    <span className="text-sm text-neutral-500">{k.unit}</span>
                  </div>
                  {k.showBar && (
                    <div className="mt-4">
                      <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-neutral-200 p-6">
              <div className="text-lg font-bold tracking-tight text-neutral-950">Compliance trend</div>
              <nav className="inline-flex gap-0.5 rounded-md bg-neutral-100 p-[3px]">
                <button
                  onClick={() => setPeriod('weekly')}
                  className={`rounded px-3.5 py-2 text-sm font-semibold transition-colors ${
                    period === 'weekly' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Mingguan
                </button>
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`rounded px-3.5 py-2 text-sm font-semibold transition-colors ${
                    period === 'monthly' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Bulanan
                </button>
              </nav>
            </div>
            <div className="flex flex-col gap-3 p-6 pt-4">
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

        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6">
            <div className="flex items-center gap-2.5">
              <i className="fas fa-map-marker-alt text-base text-neutral-950" />
              <div className="text-lg font-bold tracking-tight text-neutral-950">Outside Boundary by Site</div>
            </div>
            <span className="text-xs text-neutral-500">Semua angka dalam Ha</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-sm" style={{ minWidth: 1000, tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th className="w-[150px] border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 whitespace-nowrap uppercase">
                    Regulation
                  </th>
                  <th className="w-[130px] border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-right text-xs font-semibold tracking-wide text-neutral-500 whitespace-nowrap uppercase">
                    Total Outside
                  </th>
                  <th className="w-[130px] border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 whitespace-nowrap uppercase">
                    Status
                  </th>
                  {bcMatrixSites.map((site) => (
                    <th
                      key={site}
                      className="w-22 border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-neutral-500 whitespace-nowrap uppercase"
                    >
                      {site}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bcMatrix.map((row) => (
                  <tr key={row.label} className="border-t border-white hover:bg-neutral-50">
                    <td className="border-b border-neutral-200 px-3 py-2 font-bold">
                      <span className="inline-flex items-center gap-2">
                        <i className={`far ${row.icon} w-3.75 text-center text-neutral-700`} />
                        {row.label}
                      </span>
                    </td>
                    <td className="border-b border-neutral-200 px-3 py-2 text-right font-bold">{row.total}</td>
                    <td className="border-b border-neutral-200 px-3 py-2">
                      <span className={row.statusCls}>
                        <i className={`far ${row.statusIcon} mr-1.5`} />
                        {row.statusTxt}
                      </span>
                    </td>
                    {row.allSites ? (
                      <td
                        colSpan={6}
                        className="border-b border-l border-neutral-200 px-1.5 py-2 text-center whitespace-nowrap"
                        style={{ background: row.allSitesCell.bg, borderLeftColor: '#fff' }}
                      >
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: row.allSitesCell.fg }}>
                          <i className={`far ${row.allSitesCell.icon} text-xs`} />
                          {row.allSitesCell.val}
                        </span>
                      </td>
                    ) : (
                      row.cells.map((cell, i) => (
                        <td
                          key={i}
                          className="border-b border-l border-neutral-200 px-1.5 py-2 text-center whitespace-nowrap"
                          style={{ background: cell.bg, borderLeftColor: '#fff' }}
                        >
                          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: cell.fg }}>
                            <i className={`far ${cell.icon} text-xs`} />
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
