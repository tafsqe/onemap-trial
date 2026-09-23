import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateRangePicker from '../components/DateRangePicker.jsx'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import AchievementBar from '../components/AchievementBar.jsx'
import { LineChart } from '../lib/ds.js'
import { OB_BASELINE_RANGE, buildObDistanceData, obCats, obColors, obVolCats, obVolColors, pctFmt } from '../data/dummy.js'

function SiteTable({ title, rows }) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
      <div className="border-b border-neutral-200 p-6">
        <div className="text-lg font-bold tracking-tight text-neutral-950">
          {title}
          <div className="mt-1 text-xs font-normal text-neutral-500">Rata-rata bulanan seluruh site</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                Site Area
              </th>
              <th className="border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-right text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                Actual
              </th>
              <th className="border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-right text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                TARGET
              </th>
              <th className="w-47.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                ACHIEVEMENT
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.site} className="hover:bg-neutral-50">
                <td className="border-b border-neutral-200 px-4 py-3.5 font-bold">{r.site}</td>
                <td className="border-b border-neutral-200 px-4 py-3.5 text-right">{r.actual}</td>
                <td className="border-b border-neutral-200 px-4 py-3.5 text-right text-neutral-500">{r.plan}</td>
                <td className="border-b border-neutral-200 px-4 py-3.5">
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
  const [range, setRange] = useState(OB_BASELINE_RANGE)
  const { obKpis4b, obSeries, obVolSeries, obDistRows, obVolRows } = useMemo(() => buildObDistanceData(range), [range])

  return (
    <PageShell active="Peta">
      <div className="flex h-14 items-center gap-3 border-b border-neutral-200 bg-white px-5">
        <span
          onClick={() => navigate('/')}
          className="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-bold text-primary-600 hover:bg-primary-50"
        >
          <i className="far fa-arrow-left" />
          Ringkasan
        </span>
        <span className="h-5.5 w-px bg-neutral-200" />
        <span className="text-sm font-bold text-neutral-950">OB Distance</span>
        <span className="flex-1" />
        <DateRangePicker value={range} onChange={setRange} width={140} />
      </div>

      <div className="flex flex-col gap-4 px-6 pt-5.5 pb-6.5">
        <div className="grid grid-cols-2 gap-4">
          {obKpis4b.map((k) => (
            <div key={k.label} className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
              <div className="flex flex-col gap-0 p-6">
                <span className="min-h-6 text-[10.5px] font-bold tracking-[.13em] text-neutral-500 uppercase">{k.label}</span>
                <div className="mt-2.5 flex items-baseline justify-between gap-2.5">
                  <span className="font-display text-[28px] leading-none font-bold tracking-[-.03em] text-neutral-950">{k.value}</span>
                  <span className="font-display flex-none text-[28px] leading-none font-bold tracking-[-.03em] text-neutral-950">{k.pct}</span>
                </div>
                <div className="mt-4">
                  <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
            <div className="border-b border-neutral-200 p-6">
              <div className="text-lg font-bold tracking-tight text-neutral-950">OB Distance Achievement Trend</div>
              <div className="mt-1 text-xs text-neutral-500">Rata-rata bulanan seluruh site</div>
            </div>
            <div className="flex flex-col gap-3 p-6 pt-4">
              {LineChart && (
                <LineChart
                  data={obSeries}
                  index="day"
                  categories={obCats}
                  colors={obColors}
                  type="line"
                  fill="none"
                  strokeWidth={2.5}
                  valueFormatter={pctFmt}
                  height={252}
                  minValue={60}
                  maxValue={100}
                  showDots
                />
              )}
            </div>
          </div>
          <SiteTable title="OB Distance Achievement Trend" rows={obDistRows} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
            <div className="border-b border-neutral-200 p-6">
              <div className="text-lg font-bold tracking-tight text-neutral-950">OB Volume Achievement Trend</div>
              <div className="mt-1 text-xs text-neutral-500">Rata-rata bulanan seluruh site</div>
            </div>
            <div className="flex flex-col gap-3 p-6 pt-4">
              {LineChart && (
                <LineChart
                  data={obVolSeries}
                  index="day"
                  categories={obVolCats}
                  colors={obVolColors}
                  type="line"
                  fill="none"
                  strokeWidth={2.5}
                  valueFormatter={pctFmt}
                  height={252}
                  minValue={0}
                  maxValue={40}
                  showDots
                />
              )}
            </div>
          </div>
          <SiteTable title="OB Volume Achievement Trend" rows={obVolRows} />
        </div>
      </div>
    </PageShell>
  )
}
