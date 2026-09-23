// The "progress bar + achievement %" cell used in the site breakdown tables.
// Production lists the bar first then the % (right-aligned); OB Distance
// lists the % first then the bar — `labelFirst` switches the order.
export default function AchievementBar({ barPct, label, tone, barHeight = 6, labelFirst = false, labelWidth = 44 }) {
  const bar = (
    <span className="flex-1 overflow-hidden rounded-full bg-neutral-100" style={{ height: barHeight }}>
      <span className="block h-full" style={{ width: barPct, background: tone }} />
    </span>
  )
  const text = (
    <span
      className={`text-[12.5px] ${labelFirst ? 'text-left font-bold' : 'text-right font-semibold'}`}
      style={{ width: labelWidth }}
    >
      {label}
    </span>
  )
  return (
    <div className="flex items-center gap-2.5">
      {labelFirst ? (
        <>
          {text}
          {bar}
        </>
      ) : (
        <>
          {bar}
          {text}
        </>
      )}
    </div>
  )
}
