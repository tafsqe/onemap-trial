// The small rounded pill used for target-gap callouts, e.g. "−6.7%" in red
// or "+20.1%" in green, with a leading icon.
export default function GapChip({ icon, text, color, bg }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 8px',
        borderRadius: 999,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      <i className={`far ${icon}`} style={{ fontSize: 10.5 }} />
      {text}
    </span>
  )
}
