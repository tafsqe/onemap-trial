// Small date helpers shared by DateRangePicker and the pages that use it.
// Dates are always plain 'YYYY-MM-DD' strings — no timezone math needed
// since this app only ever displays whole days.

export const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
export const WEEKDAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addMonths(date, n) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1)
}

// Matches the mockup's two date-range styles: "01–31 Agu 2026" when the
// range sits inside one month, "15 Agu – 14 Sep 2026" otherwise.
export function formatRange(range) {
  const start = fromISO(range.start)
  const end = fromISO(range.end)
  const sameMonth = start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()

  if (sameMonth) {
    const d1 = String(start.getDate()).padStart(2, '0')
    const d2 = String(end.getDate()).padStart(2, '0')
    return `${d1}–${d2} ${MONTHS_ID[start.getMonth()]} ${start.getFullYear()}`
  }
  const left = `${start.getDate()} ${MONTHS_ID[start.getMonth()]}${start.getFullYear() !== end.getFullYear() ? ` ${start.getFullYear()}` : ''}`
  const right = `${end.getDate()} ${MONTHS_ID[end.getMonth()]} ${end.getFullYear()}`
  return `${left} – ${right}`
}
