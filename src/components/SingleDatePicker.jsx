import { useEffect, useRef, useState } from 'react'
import { MONTHS_ID, WEEKDAYS_ID, addMonths, formatDate, fromISO, toISO } from '../lib/date.js'

// A single-day version of DateRangePicker: click one day and it commits +
// closes immediately (no start/end two-step).
export default function SingleDatePicker({ value, onChange, width = 130 }) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(() => fromISO(value))
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
    setViewMonth(fromISO(value))
    setOpen(true)
  }

  const pickDay = (iso) => {
    onChange(iso)
    setOpen(false)
  }

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()
  const cells = [...Array(leadingBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => (open ? setOpen(false) : openPicker())}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.75 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
      >
        <i className="far fa-calendar text-[13px] text-neutral-500" />
        <span className="text-[13px] font-semibold text-neutral-950" style={{ width }}>
          {formatDate(value)}
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
              const isSelected = iso === value
              return (
                <button
                  key={i}
                  onClick={() => pickDay(iso)}
                  className={`h-7 rounded text-xs font-semibold ${
                    isSelected ? 'bg-primary-600 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
