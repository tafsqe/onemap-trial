// The small rounded pill used for target-gap callouts, e.g. "−6.7%" in red
// or "+20.1%" in green, with a leading icon. `color`/`bg` are data-driven
// (see src/data/dummy.js), so they stay inline rather than static Tailwind classes.
export default function GapChip({ icon, text, color, bg }) {
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-bold"
      style={{ background: bg, color }}
    >
      <i className={`far ${icon} text-[10.5px]`} />
      {text}
    </span>
  )
}
