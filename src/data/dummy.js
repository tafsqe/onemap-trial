// Dummy dataset for the OneMap dashboard, ported 1:1 from the values baked
// into "OneMap Dashboard Final.dc.html" (Claude Design handoff). All figures
// are placeholder numbers shaped like a Berau-style coal mining operation.
//
// There's no backend, so nothing here can be "filtered" by a real date
// range. Instead, each page's build*Data(range) function derives numbers
// from src/lib/rangeSim.js's seeded RNG — same range always reproduces the
// same numbers, different ranges/fields drift independently.

import { buildSeries, fmt0, fmt1, fmt2, fmtHa0, fmtSigned1, jitterValue, rangeDays, scaleValue, toneLenient, toneLowBar, toneStandard } from '../lib/rangeSim.js'

export const themeCls = 'theme-hz-azure'
export const basemap = 'satellite'

const CHIP_SUCCESS = 'inline-flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-3 py-0.5 text-sm whitespace-nowrap text-green-700'
const CHIP_DANGER = 'inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-0.5 text-sm whitespace-nowrap text-red-700'
const CHIP_WARN = 'inline-flex items-center gap-1 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-0.5 text-sm whitespace-nowrap text-yellow-700'
const CHIP_NEUTRAL = 'inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-transparent px-3 py-0.5 text-sm whitespace-nowrap text-neutral-600'

// ---------------------------------------------------------------------------
// Overview (1a)
// ---------------------------------------------------------------------------

export const OVERVIEW_BASELINE_RANGE = { start: '2026-08-15', end: '2026-09-14' }
const OV = OVERVIEW_BASELINE_RANGE

export function buildReadyCards(range) {
  const bcValue = jitterValue(93.3, range, OV, 'ov.bc.value', 3, 80, 100)
  const bcOutside = 100 - bcValue
  const bcGap = jitterValue(-6.7, range, OV, 'ov.bc.gap', 2, -20, 0)
  const iupkHa = scaleValue(30, range, OV, 'ov.bc.iupk')
  const amdalHa = scaleValue(50, range, OV, 'ov.bc.amdal')
  const boundaryLain = Math.max(0, Math.round(scaleValue(5, range, OV, 'ov.bc.lain')))

  const prValue = jitterValue(120.1, range, OV, 'ov.pr.value', 8, 60, 180)
  const prGap = jitterValue(20.1, range, OV, 'ov.pr.gap', 6, -40, 80)
  const coalGetting = scaleValue(6121078, range, OV, 'ov.pr.coal')
  const shipment = scaleValue(6121078, range, OV, 'ov.pr.ship')
  const inventory = scaleValue(1710762, range, OV, 'ov.pr.inv')

  const obValue = jitterValue(87.2, range, OV, 'ov.ob.value', 5, 40, 100)
  const obGap = jitterValue(2.2, range, OV, 'ov.ob.gap', 2, -20, 20)
  const targetM = scaleValue(2994.15, range, OV, 'ov.ob.target', 0.03)
  const aktualM = (obValue / 100) * targetM

  return [
    {
      id: 'bc',
      label: 'Boundary Compliance',
      idn: 'Kepatuhan Batas Wilayah',
      icon: 'fa-draw-polygon',
      value: fmt1(bcValue),
      unit: '% in-boundary',
      target: '/boundary-compliance',
      catValues: [bcValue, bcOutside],
      catLabels: [
        { text: `In-boundary ${fmt1(bcValue)}%`, color: '#159367' },
        { text: `Outside boundary ${fmt1(bcOutside)}%`, color: '#D92222' },
      ],
      remainderColor: '#D92222',
      iconBg: 'var(--hz-red-50)',
      iconColor: 'var(--hz-red-600)',
      targetLabel: 'Target',
      targetVal: '100%',
      gapTxt: fmtSigned1(bcGap),
      gapIcon: 'fa-chart-line-down',
      gapColor: 'var(--hz-red-700)',
      gapBg: 'var(--hz-red-50)',
      facts: [
        { label: 'IUPK', value: `${fmt0(iupkHa)} Ha`, note: 'di luar batas' },
        { label: 'AMDAL', value: `${fmt0(amdalHa)} Ha`, note: 'di luar batas' },
        { label: '', value: `+${boundaryLain}`, note: 'Boundary Lain' },
      ],
    },
    {
      id: 'pr',
      label: 'Production',
      idn: 'Coal Getting + Shipment',
      icon: 'fa-mountain',
      value: fmt1(prValue),
      unit: '% Actual',
      target: '/production',
      catValues: [100, 0],
      catLabels: [{ text: `Actual ${fmt1(prValue)}%`, color: '#006CEB' }],
      remainderColor: '#EEF0F5',
      iconBg: 'var(--hz-azure-50)',
      iconColor: 'var(--hz-horizon-primary)',
      targetLabel: 'Target',
      targetVal: '100%',
      gapTxt: fmtSigned1(prGap),
      gapIcon: 'fa-chart-line',
      gapColor: 'var(--hz-green-700)',
      gapBg: 'var(--hz-green-50)',
      facts: [
        { label: 'Coal Getting', value: `${fmt0(coalGetting)} t`, note: 'bulan ini' },
        { label: 'Shipment', value: `${fmt0(shipment)} t`, note: 'bulan ini' },
        { label: 'Inventory', value: `${fmt0(inventory)} t`, note: 'bulan ini' },
      ],
    },
    {
      id: 'ob',
      label: 'OB Distance',
      idn: 'Jarak Angkut Overburden',
      icon: 'fa-route',
      value: fmt1(obValue),
      unit: '% Actual',
      target: '/ob-distance',
      catValues: [obValue, 100 - obValue],
      catLabels: [{ text: `Actual ${fmt1(obValue)}%`, color: '#006CEB' }],
      remainderColor: '#EEF0F5',
      iconBg: 'var(--hz-azure-50)',
      iconColor: 'var(--hz-horizon-primary)',
      targetLabel: 'Target',
      targetVal: '100%',
      gapTxt: fmtSigned1(obGap),
      gapIcon: 'fa-chart-line',
      gapColor: 'var(--hz-green-700)',
      gapBg: 'var(--hz-green-50)',
      facts: [
        { label: 'Aktual', value: `${fmt0(aktualM)} m`, note: 'rata-rata' },
        { label: 'Target', value: `${fmt2(targetM)} m`, note: 'target bulan' },
      ],
    },
  ]
}

export const pendingCards = [
  { label: 'Safety', idn: 'Keselamatan Kerja', icon: 'fa-hard-hat' },
  { label: 'Environment', idn: 'Lingkungan', icon: 'fa-leaf' },
  { label: 'CSR', idn: 'Tanggung Jawab Sosial', icon: 'fa-handshake' },
  { label: 'Technology', idn: 'Teknologi', icon: 'fa-microchip' },
  { label: 'Regulatory Compliance', idn: 'Kepatuhan Regulasi', icon: 'fa-gavel' },
  { label: 'Fuel', idn: 'Bahan Bakar', icon: 'fa-gas-pump' },
]

export const boundary = {
  positions: [
    [2.095, 117.235],
    [2.105, 117.405],
    [1.975, 117.425],
    [1.945, 117.255],
  ],
  color: 'yellow',
  label: 'Batas IUPK · Blok Utama',
}

export const mapRoutes = [
  {
    positions: [
      [2.03, 117.28],
      [2.045, 117.315],
      [2.02, 117.36],
      [1.995, 117.4],
    ],
    type: 'haul',
    label: 'Haul road utama · 8.4 km',
  },
  {
    positions: [
      [2.06, 117.3],
      [2.04, 117.33],
      [2.03, 117.372],
    ],
    type: 'haul',
    color: 'yellow',
    label: 'Haul road OB · 6.1 km',
    dashed: true,
  },
]

export const mapMarkers = [
  { position: [2.055, 117.288], type: 'asset', label: 'Site LMO', value: '1,602,020 t' },
  { position: [2.012, 117.352], type: 'stockpile', label: 'Site SMO', value: '826,727 t' },
  { position: [1.99, 117.408], type: 'port', label: 'Site GMO' },
  { position: [2.072, 117.33], type: 'plant', label: 'Site BMO1–3' },
]

export const mapCenter = [2.03, 117.32]
export const mapZoom = 12
export const mapFlushStyle = { borderRadius: 0, border: 'none', borderTop: '1px solid var(--hz-border-subtle)' }

// ---------------------------------------------------------------------------
// Boundary Compliance detail (2b)
// ---------------------------------------------------------------------------

export const BOUNDARY_BASELINE_RANGE = { start: '2026-08-15', end: '2026-09-14' }
const BC = BOUNDARY_BASELINE_RANGE

const bcWeeks = ['W23', 'W24', 'W25', 'W26', 'W27', 'W28', 'W29', 'W30', 'W31', 'W32']
const bcWeeklyActualBase = [98.6, 98.2, 97.9, 97.1, 96.4, 95.8, 95.0, 94.4, 93.8, 93.3]

const bcMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
const bcMonthlyActualBase = [98.4, 97.6, 96.9, 96.0, 95.2, 94.5, 93.9, 93.3]

export const bcCats = ['Actual', 'Target']
export const bcColors = ['blue', 'neutral']
export const bcDashed = ['Target']

export const bcMatrixSites = ['LMO', 'SMO', 'GMO', 'BMO1', 'BMO2', 'BMO3']

const bcMatrixMeta = [
  { label: 'IUPK', icon: 'fa-file-alt', violation: true, site: 'LMO', baseHa: 30, allSites: true },
  { label: 'RKAB', icon: 'fa-file-invoice', violation: false },
  { label: 'AMDAL', icon: 'fa-leaf', violation: true, site: 'GMO', baseHa: 1000 },
  { label: 'FS', icon: 'fa-cog', violation: false },
  { label: 'IPPKH', icon: 'fa-tree', violation: false },
  { label: 'RR', icon: 'fa-shield-alt', violation: false },
  { label: 'RPT', icon: 'fa-align-left', violation: false },
  { label: 'LAND', icon: 'fa-mountain', violation: false },
]

const bcOkCell = { bg: 'var(--hz-green-50)', fg: 'var(--hz-green-700)', icon: 'fa-check', val: '0' }
const bcViolationCell = (ha) => ({ bg: 'var(--hz-red-600)', fg: '#fff', icon: 'fa-exclamation-triangle', val: `${fmtHa0(ha)} Ha` })

export function buildBoundaryComplianceData(range) {
  const value = jitterValue(93.3, range, BC, 'bc.value', 3, 80, 100)
  const gap = jitterValue(-6.7, range, BC, 'bc.gap', 2, -20, 0)

  const bcKpis3 = [
    {
      label: 'Area in-boundary',
      value: fmt1(value),
      unit: '%',
      chip: fmtSigned1(gap),
      gapIcon: 'fa-chart-line-down',
      gapColor: 'var(--hz-red-700)',
      gapBg: 'var(--hz-red-50)',
      barW: `${fmt1(value)}%`,
      showBar: true,
      legend: [
        { text: `In-boundary ${fmt1(value)}%`, color: '#159367' },
        { text: 'Target 100%', color: '#8490A1' },
      ],
    },
    { label: 'Total boundary keluar', value: '2', unit: 'boundary', chip: '', showBar: false },
    { label: 'Boundaries checked', value: String(bcMatrixMeta.length), unit: 'boundary', chip: '', showBar: false },
  ]

  const weeklyActual = buildSeries(bcWeeklyActualBase, value, range, BC, 'bc.trend.weekly')
  const bcTrend = bcWeeks.map((week, i) => ({ week, Actual: weeklyActual[i], Target: 100 }))

  const monthlyActual = buildSeries(bcMonthlyActualBase, value, range, BC, 'bc.trend.monthly')
  const bcTrendMonthly = bcMonths.map((month, i) => ({ month, Actual: monthlyActual[i], Target: 100 }))

  const bcMatrix = bcMatrixMeta.map((r) => {
    const ha = r.baseHa ? scaleValue(r.baseHa, range, BC, `bc.matrix.${r.label}`) : 0
    return {
      label: r.label,
      icon: r.icon,
      total: r.violation ? `${fmtHa0(ha)} Ha` : '0 Ha',
      statusCls: r.violation ? CHIP_DANGER : CHIP_SUCCESS,
      statusIcon: r.violation ? 'fa-exclamation-triangle' : 'fa-check-circle',
      statusTxt: r.violation ? 'Violation' : 'Compliant',
      cells: bcMatrixSites.map((site) => (site === r.site ? bcViolationCell(ha) : bcOkCell)),
      allSites: !!r.allSites,
      notAllSites: !r.allSites,
      allSitesCell: r.allSites ? bcViolationCell(ha) : null,
    }
  })

  return { bcKpis3, bcTrend, bcTrendMonthly, bcMatrix }
}

// ---------------------------------------------------------------------------
// Production detail (3a)
// ---------------------------------------------------------------------------

export const PRODUCTION_BASELINE_RANGE = { start: '2026-08-01', end: '2026-08-31' }
const PR = PRODUCTION_BASELINE_RANGE

export const prodBarCats = ['Actual', 'Target']
export const prodLineCats = ['Achievement']
export const prodColors = ['blue', 'neutral']
export const prodLineColors = ['orange']

const prodMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const prodActualBase = [980, 1040, 1120, 1180, 1250, 1310, 1390, 1450]

const prodRowsMeta = [
  { pit: 'LMO', basePlan: 1715000, baseActual: 1602020, baseAch: 93.7 },
  { pit: 'SMO', basePlan: 1190000, baseActual: 826727, baseAch: 138.6 },
  { pit: 'GMO', basePlan: 1188000, baseActual: 1630041, baseAch: 136.2 },
  { pit: 'BMO1', basePlan: 170000, baseActual: 205400, baseAch: 121.5 },
  { pit: 'BMO2', basePlan: 1630000, baseActual: 2044991, baseAch: 127.5 },
  { pit: 'BMO3', basePlan: 155000, baseActual: 54885, baseAch: 35.0 },
]

export function buildProductionData(range) {
  const dayRatio = rangeDays(range) / rangeDays(PR)

  const totalValue = scaleValue(12485142, range, PR, 'pr.total')
  const totalGap = jitterValue(20.1, range, PR, 'pr.total.gap', 6, -40, 90)
  const totalLegendPct = jitterValue(120.1, range, PR, 'pr.total.legend', 6, 60, 180)

  const coalValue = scaleValue(6121078, range, PR, 'pr.coal')
  const coalGap = jitterValue(23.2, range, PR, 'pr.coal.gap', 6, -40, 90)
  const coalLegendPct = jitterValue(123.2, range, PR, 'pr.coal.legend', 6, 60, 180)

  const prodKpis3a = [
    {
      label: 'Production',
      sub: 'Coal Getting + Shipment',
      value: fmt0(totalValue),
      unit: 'Ton',
      chip: fmtSigned1(totalGap),
      cls: totalGap >= 0 ? CHIP_SUCCESS : CHIP_DANGER,
      valColor: 'var(--hz-text-primary)',
      barW: '100%',
      legend: [
        { text: `Actual ${fmt1(totalLegendPct)}%`, color: '#006CEB' },
        { text: 'Target 100%', color: '#8490A1' },
      ],
    },
    {
      label: 'Coal Getting',
      value: fmt0(coalValue),
      unit: 'Ton',
      chip: fmtSigned1(coalGap),
      cls: coalGap >= 0 ? CHIP_SUCCESS : CHIP_DANGER,
      valColor: 'var(--hz-text-primary)',
      barW: '100%',
      legend: [
        { text: `Actual ${fmt1(coalLegendPct)}%`, color: '#006CEB' },
        { text: 'Target 100%', color: '#8490A1' },
      ],
    },
    {
      label: 'Shipment',
      value: '—',
      unit: 'Ton',
      chip: 'Belum tersedia',
      cls: CHIP_NEUTRAL,
      valColor: 'var(--hz-neutral-400)',
      barW: '0%',
      legend: [
        { text: 'Actual 0%', color: '#C6CDD7' },
        { text: 'Target 0%', color: '#E4E8EE' },
      ],
    },
    {
      label: 'Coal Inventory',
      value: '—',
      unit: 'Ton',
      chip: 'Belum tersedia',
      cls: CHIP_NEUTRAL,
      valColor: 'var(--hz-neutral-400)',
      barW: '0%',
      legend: [
        { text: 'Actual 0%', color: '#C6CDD7' },
        { text: 'Target 0%', color: '#E4E8EE' },
      ],
    },
  ]

  const actualSeries = buildSeries(prodActualBase, prodActualBase[prodActualBase.length - 1] * dayRatio, range, PR, 'pr.chart.actual')
  const targetSeries = prodMonths.map(() => 1000 * dayRatio)
  const achievementSeries = actualSeries.map((a, i) => (a / targetSeries[i]) * 100)
  const prodSeries = prodMonths.map((day, i) => ({ day, Actual: actualSeries[i], Target: targetSeries[i], Achievement: achievementSeries[i] }))

  const prodRows = prodRowsMeta.map((r) => {
    const plan = scaleValue(r.basePlan, range, PR, `pr.row.${r.pit}.plan`)
    const actual = scaleValue(r.baseActual, range, PR, `pr.row.${r.pit}.actual`)
    const ach = jitterValue(r.baseAch, range, PR, `pr.row.${r.pit}.ach`, 6, 10, 180)
    return {
      pit: r.pit,
      plan: `${fmt0(plan)} ton`,
      actual: `${fmt0(actual)} ton`,
      ach: `${fmt1(ach)}%`,
      bar: `${fmt1(Math.min(ach, 100))}%`,
      tone: toneStandard(ach),
    }
  })

  return { prodKpis3a, prodSeries, prodRows }
}

// ---------------------------------------------------------------------------
// OB Distance detail (4b)
// ---------------------------------------------------------------------------

export const OB_BASELINE_RANGE = { start: '2026-09-02', end: '2026-09-09' }
const OB = OB_BASELINE_RANGE

export const obCats = ['Achievement']
export const obColors = ['green']
export const obVolCats = ['Achievement']
export const obVolColors = ['blue']

const obMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const obDistAchievementBase = [78, 80, 82, 85, 87, 88, 89, 87.2]
const obVolAchievementBase = [18, 20, 22, 24, 27, 29, 28, 25.2]

const obDistRowsMeta = [
  { site: 'LMO', baseActual: 2091, basePlan: 3545.64, baseAch: 100 },
  { site: 'SMO', baseActual: 3424, basePlan: 3987.816, baseAch: 97 },
  { site: 'GMO', baseActual: 1860, basePlan: 3661.008, baseAch: 100 },
  { site: 'BMO1', baseActual: 1891, basePlan: 3084.648, baseAch: 100 },
  { site: 'BMO2', baseActual: 3094, basePlan: 3716.16, baseAch: 100 },
  { site: 'BMO3', baseActual: 1093, basePlan: 1335.936, baseAch: 100 },
]

const obVolRowsMeta = [
  { site: 'LMO', baseActual: 6451014, basePlan: 57875550, baseAch: 12 },
  { site: 'SMO', baseActual: 3267395, basePlan: 21710065, baseAch: 15 },
  { site: 'GMO', baseActual: 4023401, basePlan: 23602903, baseAch: 17 },
  { site: 'BMO1', baseActual: 140239, basePlan: 11255254, baseAch: 1 },
  { site: 'BMO2', baseActual: 8929272, basePlan: 54590632, baseAch: 16 },
  { site: 'BMO3', baseActual: 326712, basePlan: 2391419, baseAch: 14 },
]

export function buildObDistanceData(range) {
  const distPct = jitterValue(87.2, range, OB, 'ob.dist.pct', 5, 40, 100)
  const targetM = scaleValue(2994.15, range, OB, 'ob.dist.target', 0.03)
  const actualM = (distPct / 100) * targetM

  const volPct = jitterValue(25.2, range, OB, 'ob.vol.pct', 6, 5, 60)
  const volTarget = scaleValue(168425823, range, OB, 'ob.vol.target')
  const volActual = (volPct / 100) * volTarget

  const obKpis4b = [
    {
      label: 'OB Distance',
      value: `${fmt0(actualM)} m`,
      pct: `${fmt1(distPct)}%`,
      chip: distPct >= 85 ? 'On Track' : distPct >= 60 ? 'Watch' : 'Delay',
      cls: distPct >= 85 ? CHIP_SUCCESS : distPct >= 60 ? CHIP_WARN : CHIP_DANGER,
      barW: `${fmt1(distPct)}%`,
      legend: [
        { text: `Actual ${fmt0(actualM)} m`, color: '#006CEB' },
        { text: `Target ${fmt2(targetM)} m`, color: '#8490A1' },
      ],
    },
    {
      label: 'OB Volume',
      value: `${fmt0(volActual)} BCM`,
      pct: `${fmt1(volPct)}%`,
      chip: volPct >= 40 ? 'On Track' : volPct >= 15 ? 'Watch' : 'Delay',
      cls: volPct >= 40 ? CHIP_SUCCESS : volPct >= 15 ? CHIP_WARN : CHIP_DANGER,
      barW: `${fmt1(volPct)}%`,
      legend: [
        { text: `Actual ${fmt0(volActual)} BCM`, color: '#006CEB' },
        { text: `Target ${fmt0(volTarget)} BCM`, color: '#8490A1' },
      ],
    },
  ]

  const distSeries = buildSeries(obDistAchievementBase, distPct, range, OB, 'ob.dist.chart')
  const obSeries = obMonths.map((day, i) => ({ day, Achievement: distSeries[i] }))

  const volSeries = buildSeries(obVolAchievementBase, volPct, range, OB, 'ob.vol.chart')
  const obVolSeries = obMonths.map((day, i) => ({ day, Achievement: volSeries[i] }))

  const obDistRows = obDistRowsMeta.map((r) => {
    const actual = scaleValue(r.baseActual, range, OB, `ob.dist.row.${r.site}.actual`)
    const plan = scaleValue(r.basePlan, range, OB, `ob.dist.row.${r.site}.plan`)
    const ach = jitterValue(r.baseAch, range, OB, `ob.dist.row.${r.site}.ach`, 5, 40, 100)
    return { site: r.site, actual: fmt0(actual), plan: fmt2(plan), ach: `${fmt0(ach)}%`, bar: `${fmt0(Math.min(ach, 100))}%`, tone: toneLenient(ach) }
  })

  const obVolRows = obVolRowsMeta.map((r) => {
    const actual = scaleValue(r.baseActual, range, OB, `ob.vol.row.${r.site}.actual`)
    const plan = scaleValue(r.basePlan, range, OB, `ob.vol.row.${r.site}.plan`)
    const ach = jitterValue(r.baseAch, range, OB, `ob.vol.row.${r.site}.ach`, 4, 1, 60)
    return { site: r.site, actual: fmt0(actual), plan: fmt0(plan), ach: `${fmt0(ach)}%`, bar: `${fmt0(Math.min(ach, 100))}%`, tone: toneLowBar(ach) }
  })

  return { obKpis4b, obSeries, obVolSeries, obDistRows, obVolRows }
}

// ---------------------------------------------------------------------------
// Formatters (chart valueFormatter props)
// ---------------------------------------------------------------------------

export const pctFmt = (v) => v.toFixed(1) + '%'
export const pctWholeFmt = (v) => v.toFixed(0) + '%'
export const ktFmt = (v) => v.toFixed(1) + ' kt'
