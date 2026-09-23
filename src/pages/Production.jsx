import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateRangePicker from '../components/DateRangePicker.jsx'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import AchievementBar from '../components/AchievementBar.jsx'
import { ComboChart } from '../lib/ds.js'
import { PRODUCTION_BASELINE_RANGE, buildProductionData, prodBarCats, prodLineCats, prodColors, prodLineColors, tonNumFmt, pctWholeFmt } from '../data/dummy.js'

export default function Production() {
  const navigate = useNavigate()
  const [range, setRange] = useState(PRODUCTION_BASELINE_RANGE)
  const { prodKpis3a, prodSeries, prodRows } = useMemo(() => buildProductionData(range), [range])

  return (
    <PageShell active="Dashboard">
      <div className="flex h-14 items-center gap-3 border-b border-neutral-200 bg-white px-5">
        <span
          onClick={() => navigate('/')}
          className="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-bold text-primary-600 hover:bg-primary-50"
        >
          <i className="far fa-arrow-left" />
          Reporting Dashboard
        </span>
        <span className="h-5.5 w-px bg-neutral-200" />
        <span className="text-sm font-bold text-neutral-950">Production</span>
        <span className="h-5.5 w-px bg-neutral-200" />
        <span className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 px-3 py-0.5 text-sm text-neutral-600 hover:border-primary-600 hover:text-primary-600">
          <i className="far fa-map-marker-alt mr-1.75" />
          Semua Site
        </span>
        <span className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 px-3 py-0.5 text-sm text-neutral-600 hover:border-primary-600 hover:text-primary-600">
          Semua kontraktor
        </span>
        <span className="flex-1" />
        <DateRangePicker value={range} onChange={setRange} width={130} />
      </div>

      <div className="flex flex-col gap-4 px-6 pt-5 pb-6.5">
        <div className="grid grid-cols-4 gap-4">
          {prodKpis3a.map((k) => (
            <div key={k.label} className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
              <div className="flex flex-col gap-0 p-6">
                <div className="flex items-start justify-between gap-2.5">
                  <span className="flex min-h-12 flex-col gap-0.5">
                    <span className="text-[10.5px] font-bold tracking-[.13em] text-neutral-500 uppercase">{k.label}</span>
                    {k.sub && <span className="h-7.75 w-34.75 text-xs text-neutral-500">{k.sub}</span>}
                  </span>
                  <span className={`flex-none ${k.cls}`}>{k.chip}</span>
                </div>
                <div className="mt-2.5 flex items-baseline gap-1.75">
                  <span className="font-display text-[28px] leading-none font-bold tracking-[-.03em]" style={{ color: k.valColor }}>
                    {k.value}
                  </span>
                  <span className="text-sm text-neutral-500">{k.unit}</span>
                </div>
                <div className="mt-4">
                  <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6">
            <div className="text-lg font-bold tracking-tight text-neutral-950">Achievement per bulan</div>
            <span className="text-xs text-neutral-500">Semua angka dalam Ton</span>
          </div>
          <div className="flex flex-col gap-3 p-6 pt-4">
            {ComboChart && (
              <ComboChart
                data={prodSeries}
                index="day"
                barCategories={prodBarCats}
                lineCategories={prodLineCats}
                barColors={prodColors}
                lineColors={prodLineColors}
                valueFormatter={tonNumFmt}
                lineValueFormatter={pctWholeFmt}
                height={268}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
          <div className="border-b border-neutral-200 p-6">
            <div className="text-lg font-bold tracking-tight text-neutral-950">Coal getting by site</div>
          </div>
          <table className="w-full border-separate border-spacing-0 text-sm" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th className="w-32.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  SITE
                </th>
                <th className="w-37.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-right text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Actual
                </th>
                <th className="w-37.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-right text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  Target
                </th>
                <th className="border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                  ACHIEVEMENT
                </th>
              </tr>
            </thead>
            <tbody>
              {prodRows.map((r) => (
                <tr key={r.pit} className="hover:bg-neutral-50">
                  <td className="border-b border-neutral-200 px-4 py-3.5 font-semibold">{r.pit}</td>
                  <td className="border-b border-neutral-200 px-4 py-3.5 text-right font-semibold">{r.actual}</td>
                  <td className="border-b border-neutral-200 px-4 py-3.5 text-right text-neutral-500">{r.plan}</td>
                  <td className="border-b border-neutral-200 px-4 py-3.5">
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
