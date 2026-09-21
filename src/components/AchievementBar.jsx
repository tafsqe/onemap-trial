// The "progress bar + achievement %" cell used in the site breakdown tables.
// Production lists the bar first then the % (right-aligned); OB Distance
// lists the % first then the bar — `labelFirst` switches the order.
export default function AchievementBar({ barPct, label, tone, barHeight = 6, labelFirst = false, labelWidth = 44 }) {
  const bar = (
    <span style={{ flex: 1, height: barHeight, borderRadius: 999, background: 'var(--hz-neutral-100)', overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', width: barPct, background: tone }} />
    </span>
  )
  const text = (
    <span
      style={{
        fontSize: 12.5,
        fontWeight: labelFirst ? 700 : 600,
        width: labelWidth,
        textAlign: labelFirst ? 'left' : 'right',
      }}
    >
      {label}
    </span>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
