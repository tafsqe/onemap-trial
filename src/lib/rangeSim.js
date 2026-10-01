// This app has no backend — there's nothing to actually query per date
// range. To make the date picker feel real anyway, every metric is derived
// from a small seeded RNG keyed by (range, field name), so picking the same
// range always reproduces the same numbers (no flicker), while different
// ranges/fields drift independently of each other.

function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

export function rangeDays(range) {
  const ms = new Date(`${range.end}T00:00:00`) - new Date(`${range.start}T00:00:00`)
  return Math.max(1, Math.round(ms / 86400000) + 1)
}

// Stable float in [0, 1) for a given (range, key) pair.
function unit(range, key) {
  return mulberry32(hashString(`${range.start}_${range.end}::${key}`))()
}

// Stable float in [-1, 1].
function signedUnit(range, key) {
  return unit(range, key) * 2 - 1
}

function isBaseline(range, baseline) {
  return range.start === baseline.start && range.end === baseline.end
}

// Nudge a percentage/ratio/achievement baseline by up to `spread` points.
// At the page's exact baseline range this returns `base` unchanged, so the
// dashboard matches the original mockup numbers until the user actually
// picks a different range.
export function jitterValue(base, range, baseline, key, spread = 4, min = 0, max = Infinity) {
  if (isBaseline(range, baseline)) return base
  const v = base + signedUnit(range, key) * spread
  return Math.min(max, Math.max(min, v))
}

// Scale an absolute/cumulative baseline (tonnage, Ha, meters, BCM, counts)
// to the selected range's length relative to its baseline period. Exact
// baseline range -> exactly `base`, same as jitterValue.
export function scaleValue(base, range, baseline, key, noise = 0.08) {
  if (isBaseline(range, baseline)) return base
  const ratio = rangeDays(range) / rangeDays(baseline)
  const wobble = 1 + signedUnit(range, key) * noise
  return base * ratio * wobble
}

// A trend series of the same length as `baseShape`, reseeded per range but
// keeping its overall shape, anchored so the last point lands near
// `endValue`. Exact baseline range -> `baseShape` unchanged.
export function buildSeries(baseShape, endValue, range, baseline, key, volatility = 0.06) {
  if (isBaseline(range, baseline)) return baseShape
  return anchorSeries(baseShape, endValue, range, key, volatility)
}

// Same shape-preserving rescale as buildSeries, but always anchors to
// `endValue` — including at the baseline range. Use this instead of
// buildSeries when `endValue` is a plain computed fact (e.g. a count-based
// percentage) rather than a simulated, range-varying metric, so the chart
// never disagrees with the number next to it.
export function anchorSeries(baseShape, endValue, range, key, volatility = 0.06) {
  const lastBase = baseShape[baseShape.length - 1]
  return baseShape.map((v, i) => {
    const trend = (v / lastBase) * endValue
    const wobble = 1 + signedUnit(range, `${key}:${i}`) * volatility
    return trend * wobble
  })
}

// Indonesian-style grouping: dot thousands separator, comma decimal separator.
export const fmt0 = (n) => Math.round(n).toLocaleString('de-DE')
export const fmt1 = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
export const fmt2 = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const fmtSigned1 = (n) => `${n >= 0 ? '+' : '−'}${fmt1(Math.abs(n))}%`
export const fmtHa0 = fmt0

// CSS percentages (bar widths) must stay locale-independent — the fmt*
// helpers' comma decimal separator makes an invalid `style.width` value,
// which the browser silently drops. Always use this for bar/progress widths.
export const pctCss = (n, decimals = 1) => `${n.toFixed(decimals)}%`

// Achievement colour convention for every bar: red below 50%, blue from 50%
// to under 100%, green at or above 100%.
export const TONE_RED = '#D92222'
export const TONE_BLUE = '#006CEB'
export const TONE_GREEN = '#159367'

export function toneStandard(ach) {
  if (ach < 50) return TONE_RED
  if (ach < 100) return TONE_BLUE
  return TONE_GREEN
}
