import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardTabs from '../components/DashboardTabs.jsx'
import DateRangePicker from '../components/DateRangePicker.jsx'
import PageShell from '../components/PageShell.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import GapChip from '../components/GapChip.jsx'
import { MineMap } from '../lib/ds.js'
import { OVERVIEW_BASELINE_RANGE, buildReadyCards, pendingCards, boundary, mapRoutes, mapMarkers, mapCenter, mapZoom, mapFlushStyle, basemap } from '../data/dummy.js'

export default function Overview() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState({})
  const [range, setRange] = useState(OVERVIEW_BASELINE_RANGE)
  const readyCards = useMemo(() => buildReadyCards(range), [range])

  const toggleFacts = (e, id) => {
    e.stopPropagation()
    setExpanded((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <PageShell active="Dashboard">
      <div className="border-b border-neutral-200 bg-white">
        <div className="flex h-14 items-center gap-3 px-5">
          <span className="text-base font-bold text-neutral-950">Dashboard</span>
          <span className="flex-1" />
          <DateRangePicker value={range} onChange={setRange} />
        </div>
        <DashboardTabs />
      </div>

      <div className="flex flex-col gap-4.5 p-6">
        <div className="grid grid-cols-3 gap-4">
          {readyCards.map((c) => {
            const factsOpen = !!expanded[c.id]
            return (
              <div
                key={c.id}
                onClick={() => navigate(c.target)}
                className="group flex cursor-pointer flex-col rounded-lg border border-neutral-200 bg-white shadow-md transition-shadow hover:shadow-lg hover:border-neutral-300"
              >
                <div className="flex flex-1 flex-col p-6 pb-5">
                  <div className="flex min-h-11 items-start gap-3.5">
                    <span
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-xl"
                      style={{ background: c.iconBg, color: c.iconColor }}
                    >
                      <i className={`far ${c.icon} text-[19px]`} />
                    </span>
                    <div className="flex h-11 min-w-0 flex-1 flex-col justify-center gap-0.75 overflow-hidden">
                      <div className="overflow-hidden text-[17px] font-bold text-ellipsis whitespace-nowrap tracking-[-.015em] text-neutral-950">
                        {c.label}
                      </div>
                      <div className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-neutral-500">{c.idn}</div>
                    </div>
                    <div className="flex h-11 flex-none flex-col items-end justify-center gap-1.5">
                      <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold whitespace-nowrap text-primary-600 group-hover:underline">
                        Lihat detail
                        <i className="far fa-arrow-right text-[10px]" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-5.5 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-[44px] leading-none font-bold tracking-[-.03em] text-neutral-950">{c.value}</span>
                      <span className="text-xs whitespace-nowrap text-neutral-500">{c.unit}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs whitespace-nowrap text-neutral-700">
                        {c.targetLabel}: <b className="text-neutral-950">{c.targetVal}</b>
                      </span>
                      <GapChip icon={c.gapIcon} text={c.gapTxt} color={c.gapColor} bg={c.gapBg} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <CategoryBar barPct={`${c.catValues[0]}%`} fillColor={c.catLabels[0].color} remainderColor={c.remainderColor} legend={c.catLabels} />
                  </div>

                  <div className="mt-5 flex flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-neutral-50">
                    <div
                      onClick={(e) => toggleFacts(e, c.id)}
                      className="flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.75 transition-colors hover:bg-neutral-100"
                    >
                      <span className="text-xs font-bold text-neutral-700">Rincian</span>
                      <i className={`far ${factsOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs text-neutral-500`} />
                    </div>
                    {factsOpen &&
                      c.facts.map((ft, i) => (
                        <div key={i} className="flex items-baseline justify-between gap-3 border-t border-neutral-200 px-3.5 py-2.75">
                          <span className="text-[12.5px] font-semibold text-neutral-700">{ft.label}</span>
                          <span className="flex items-baseline gap-1.75 text-right">
                            <span className="text-[13.5px] font-bold text-neutral-950">{ft.value}</span>
                            <span className="text-[11.5px] text-neutral-500">{ft.note}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {pendingCards.map((c) => (
            <div key={c.label} className="flex flex-col rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
              <div className="flex flex-1 flex-col p-6 pb-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
                    <i className={`far ${c.icon} text-[19px]`} />
                  </span>
                  <div className="flex flex-1 min-w-0 flex-col gap-0.75">
                    <div className="text-[17px] font-bold tracking-[-.015em] text-neutral-500">{c.label}</div>
                    <div className="text-xs text-neutral-500">{c.idn}</div>
                  </div>
                </div>
                <div className="mt-5.5 flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[44px] leading-none font-bold tracking-[-.03em] text-neutral-300">—</span>
                    <span className="text-xs text-neutral-500">data belum tersedia</span>
                  </div>
                </div>
                <div className="mt-5 h-3.5 rounded-full bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6">
            <div>
              <div className="text-lg font-bold tracking-tight text-neutral-950">Peta Operasional</div>
              <div className="text-xs text-neutral-500">Batas IUP · pit aktif · rute hauling</div>
            </div>
            <span className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 px-3 py-0.5 text-sm text-neutral-600 hover:border-primary-600 hover:text-primary-600">
              <i className="far fa-expand mr-1.5" />
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
