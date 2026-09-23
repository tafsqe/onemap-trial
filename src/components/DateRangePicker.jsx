import { useEffect, useRef, useState } from 'react'
import { MONTHS_ID, WEEKDAYS_ID, addMonths, formatRange, fromISO, toISO } from '../lib/date.js'

// A small calendar dropdown for picking a date range: click a start day,
// then an end day, and it commits + closes. No backend to query, so
// `onChange` just hands back the new { start, end } for src/lib/rangeSim.js
// to derive fake-but-consistent numbers from.
export default function DateRangePicker({ value, onChange, width = 150 }) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(() => fromISO(value.start))
  const [draftStart, setDraftStart] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const openPicker = () => {
    setViewMonth(fromISO(value.start))
    setDraftStart(null)
    setOpen(true)
  }

  const pickDay = (iso) => {
    if (!draftStart) {
      setDraftStart(iso)
      return
    }
    const range = iso < draftStart ? { start: iso, end: draftStart } : { start: draftStart, end: iso }
    onChange(range)
    setDraftStart(null)
    setOpen(false)
  }

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()
  const cells = [...Array(leadingBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const rangeStart = draftStart || value.start
  const rangeEnd = draftStart ? null : value.end

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => (open ? setOpen(false) : openPicker())}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.75 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
      >
        <i className="far fa-calendar text-[13px] text-neutral-500" />
        <span className="text-[13px] font-semibold text-neutral-950" style={{ width }}>
          {formatRange(value)}
        </span>
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-72 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button onClick={() => setViewMonth((m) => addMonths(m, -1))} className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100">
              <i className="far fa-chevron-left text-xs" />
            </button>
            <span className="text-sm font-bold text-neutral-950">
              {MONTHS_ID[month]} {year}
            </span>
            <button onClick={() => setViewMonth((m) => addMonths(m, 1))} className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100">
              <i className="far fa-chevron-right text-xs" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS_ID.map((w) => (
              <span key={w} className="text-[10.5px] font-bold text-neutral-400">
                {w}
              </span>
            ))}
            {cells.map((day, i) => {
              if (!day) return <span key={i} />
              const iso = toISO(new Date(year, month, day))
              const isStart = iso === rangeStart
              const isEnd = iso === rangeEnd
              const inRange = rangeEnd && iso > rangeStart && iso < rangeEnd
              return (
                <button
                  key={i}
                  onClick={() => pickDay(iso)}
                  className={`h-7 rounded text-xs font-semibold ${
                    isStart || isEnd
                      ? 'bg-primary-600 text-white'
                      : inRange
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="mt-3 border-t border-neutral-200 pt-3 text-xs text-neutral-500">{draftStart ? 'Pilih tanggal akhir' : 'Pilih tanggal mulai'}</div>
        </div>
      )}
    </div>
  )
}
