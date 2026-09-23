// The recurring "filled bar + color-dot legend" pattern used across KPI
// cards. `barPct` is the filled width (e.g. "93.3%"), `fillColor` its color;
// the remainder of the bar is `remainderColor`. `legend` is a list of
// { color, text }, laid out in a row or column. Colors are data-driven (see
// src/data/dummy.js), so they stay inline rather than static Tailwind classes.
export default function CategoryBar({ barPct, fillColor, remainderColor = 'var(--hz-neutral-100)', legend, direction = 'row' }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex h-3.5 overflow-hidden rounded-full">
        <span style={{ width: barPct, background: fillColor }} />
        <span className="flex-1" style={{ background: remainderColor }} />
      </div>
      <div className={`flex text-xs text-neutral-700 ${direction === 'column' ? 'flex-col gap-1.5' : 'flex-row gap-4'}`}>
        {legend.map((l) => (
          <span key={l.text} className="whitespace-nowrap">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-sm align-middle" style={{ background: l.color }} />
            {l.text}
          </span>
        ))}
      </div>
    </div>
  )
}
