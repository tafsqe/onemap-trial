import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateRangePicker from '../components/DateRangePicker.jsx'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import AchievementBar from '../components/AchievementBar.jsx'
import { ComboChart } from '../lib/ds.js'
import { OB_BASELINE_RANGE, buildObDistanceData, obBarCats, obLineCats, obBarColors, obLineColors, meterFmt, bcmFmt, pctWholeFmt } from '../data/dummy.js'

function KpiCard({ k }) {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
      <div className="flex flex-col gap-0 p-6">
        <div className="flex items-start justify-between gap-2.5">
          <span className="text-[10.5px] font-bold tracking-[.13em] text-neutral-500 uppercase">{k.label}</span>
          <span className={`flex-none ${k.cls}`}>{k.chip}</span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.75">
          <span className="font-display text-[28px] leading-none font-bold tracking-[-.03em] text-neutral-950">{k.value}</span>
        </div>
        <div className="mt-4">
          <CategoryBar barPct={k.barW} fillColor={k.legend[0].color} remainderColor="#EEF0F5" legend={k.legend} />
        </div>
      </div>
    </div>
  )
}

function TrendChart({ title, unitLabel, data, valueFormatter, barMaxValue }) {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-200 p-6">
        <div>
          <div className="text-lg font-bold tracking-tight text-neutral-950">{title}</div>
          <div className="mt-1 text-xs text-neutral-500">Rata-rata bulanan seluruh site</div>
        </div>
        <span className="flex-none text-xs text-neutral-500 whitespace-nowrap">{unitLabel}</span>
      </div>
      <div className="flex flex-col gap-3 p-6 pt-4">
        {ComboChart && (
          <ComboChart
            data={data}
            index="day"
            barCategories={obBarCats}
            lineCategories={obLineCats}
            barColors={obBarColors}
            lineColors={obLineColors}
            valueFormatter={valueFormatter}
            lineValueFormatter={pctWholeFmt}
            barMaxValue={barMaxValue}
            height={252}
          />
        )}
      </div>
    </div>
  )
}

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
          Reporting Dashboard
        </span>
        <span className="h-5.5 w-px bg-neutral-200" />
        <span className="text-sm font-bold text-neutral-950">OB Distance</span>
        <span className="flex-1" />
        <DateRangePicker value={range} onChange={setRange} width={140} />
      </div>

      <div className="grid grid-cols-2 items-start gap-4 px-6 pt-5.5 pb-6.5">
        <div className="flex flex-col gap-4">
          <KpiCard k={obKpis4b[0]} />
          <TrendChart title="OB Distance Achievement Trend" unitLabel="Dalam satuan meter" data={obSeries} valueFormatter={meterFmt} barMaxValue={4000} />
          <SiteTable title="OB Distance per Site" rows={obDistRows} />
        </div>

        <div className="flex flex-col gap-4">
          <KpiCard k={obKpis4b[1]} />
          <TrendChart title="OB Volume Achievement Trend" unitLabel="Dalam satuan BCM" data={obVolSeries} valueFormatter={bcmFmt} barMaxValue={25e6} />
          <SiteTable title="OB Volume per Site" rows={obVolRows} />
        </div>
      </div>
    </PageShell>
  )
}
