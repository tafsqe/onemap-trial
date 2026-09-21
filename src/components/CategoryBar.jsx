// The recurring "filled bar + color-dot legend" pattern used across KPI
// cards. `barPct` is the filled width (e.g. "93.3%"), `fillColor` its color;
// the remainder of the bar is `remainderColor`. `legend` is a list of
// { color, text }, laid out in a row or column.
export default function CategoryBar({ barPct, fillColor, remainderColor = 'var(--hz-neutral-100)', legend, direction = 'row' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden' }}>
        <span style={{ width: barPct, background: fillColor }} />
        <span style={{ flex: 1, background: remainderColor }} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'column' ? 'column' : 'row',
          gap: direction === 'column' ? 6 : 16,
          fontSize: 12,
          color: 'var(--hz-text-secondary)',
        }}
      >
        {legend.map((l) => (
          <span key={l.text} style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: 2,
                marginRight: 6,
                verticalAlign: 'middle',
                background: l.color,
              }}
            />
            {l.text}
          </span>
        ))}
      </div>
    </div>
  )
}
