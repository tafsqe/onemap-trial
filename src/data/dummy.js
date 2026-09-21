// Dummy dataset for the OneMap dashboard, ported 1:1 from the values baked
// into "OneMap Dashboard Final.dc.html" (Claude Design handoff). All figures
// are placeholder numbers shaped like a Berau-style coal mining operation.

export const themeCls = 'theme-hz-azure'
export const basemap = 'satellite'

export const readyCards = [
  {
    id: 'bc',
    label: 'Boundary Compliance',
    idn: 'Kepatuhan Batas Wilayah',
    icon: 'fa-draw-polygon',
    value: '93.3',
    unit: '% in-boundary',
    sub: 'IUPK 30 Ha · AMDAL 50 Ha di luar batas',
    target: '/boundary-compliance',
    catValues: [93.3, 6.7],
    catLabels: [
      { text: 'In-boundary 93.3%', color: '#159367' },
      { text: 'Outside boundary 6.7%', color: '#D92222' },
    ],
    remainderColor: '#D92222',
    iconBg: 'var(--hz-red-50)',
    iconColor: 'var(--hz-red-600)',
    targetLabel: 'Target',
    targetVal: '100%',
    gapTxt: '−6.7%',
    gapIcon: 'fa-chart-line-down',
    gapColor: 'var(--hz-red-700)',
    gapBg: 'var(--hz-red-50)',
    facts: [
      { label: 'IUPK', value: '30 Ha', note: 'di luar batas' },
      { label: 'AMDAL', value: '50 Ha', note: 'di luar batas' },
      { label: '', value: '+5', note: 'Boundary Lain' },
    ],
  },
  {
    id: 'pr',
    label: 'Production',
    idn: 'Coal Getting + Shipment',
    icon: 'fa-mountain',
    value: '120.1',
    unit: '% Actual',
    sub: 'Coal Getting 6,121,078 t · Shipment 6,121,078 t',
    target: '/production',
    catValues: [100, 0],
    catLabels: [{ text: 'Actual 120.1%', color: '#006CEB' }],
    remainderColor: '#EEF0F5',
    iconBg: 'var(--hz-azure-50)',
    iconColor: 'var(--hz-horizon-primary)',
    targetLabel: 'Target',
    targetVal: '100%',
    gapTxt: '+20.1%',
    gapIcon: 'fa-chart-line',
    gapColor: 'var(--hz-green-700)',
    gapBg: 'var(--hz-green-50)',
    facts: [
      { label: 'Coal Getting', value: '6,121,078 t', note: 'bulan ini' },
      { label: 'Shipment', value: '6,121,078 t', note: 'bulan ini' },
      { label: 'Inventory', value: '1,710,762 t', note: 'bulan ini' },
    ],
  },
  {
    id: 'ob',
    label: 'OB Distance',
    idn: 'Jarak Angkut Overburden',
    icon: 'fa-route',
    value: '87.2',
    unit: '% Actual',
    sub: '2,611 m aktual · Target 2,994.15 m',
    target: '/ob-distance',
    catValues: [87.2, 12.8],
    catLabels: [{ text: 'Actual 87.2%', color: '#006CEB' }],
    remainderColor: '#EEF0F5',
    iconBg: 'var(--hz-azure-50)',
    iconColor: 'var(--hz-horizon-primary)',
    targetLabel: 'Target',
    targetVal: '100%',
    gapTxt: '+2.2%',
    gapIcon: 'fa-chart-line',
    gapColor: 'var(--hz-green-700)',
    gapBg: 'var(--hz-green-50)',
    facts: [
      { label: 'Aktual', value: '2,611 m', note: 'rata-rata' },
      { label: 'Target', value: '2,994.15 m', note: 'target bulan' },
    ],
  },
]

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

export const bcKpis3 = [
  {
    label: 'Area in-boundary',
    value: '93.3',
    unit: '%',
    chip: '−6.7%',
    gapIcon: 'fa-chart-line-down',
    gapColor: 'var(--hz-red-700)',
    gapBg: 'var(--hz-red-50)',
    barW: '93.3%',
    showBar: true,
    legend: [
      { text: 'In-boundary 93.3%', color: '#159367' },
      { text: 'Target 100%', color: '#8490A1' },
    ],
  },
  {
    label: 'Total boundary keluar',
    value: '2',
    unit: 'boundary',
    chip: '',
    showBar: false,
    legend: [
      { text: 'IUPK 30 Ha', color: '#006CEB' },
      { text: 'AMDAL 50 Ha', color: '#D92222' },
    ],
  },
  {
    label: 'Boundaries checked',
    value: '8',
    unit: 'boundary',
    chip: '',
    showBar: false,
    legend: [
      { text: 'Compliant 6', color: '#159367' },
      { text: 'Violation 2', color: '#D92222' },
    ],
  },
]

const bcWeeks = ['W23', 'W24', 'W25', 'W26', 'W27', 'W28', 'W29', 'W30', 'W31', 'W32']
const bcWeeklyActual = [98.6, 98.2, 97.9, 97.1, 96.4, 95.8, 95.0, 94.4, 93.8, 93.3]
export const bcTrend = bcWeeks.map((week, i) => ({ week, Actual: bcWeeklyActual[i], Target: 100 }))

const bcMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
const bcMonthlyActual = [98.4, 97.6, 96.9, 96.0, 95.2, 94.5, 93.9, 93.3]
export const bcTrendMonthly = bcMonths.map((month, i) => ({ month, Actual: bcMonthlyActual[i], Target: 100 }))

export const bcCats = ['Actual', 'Target']
export const bcColors = ['blue', 'neutral']
export const bcDashed = ['Target']

export const bcMatrixSites = ['LMO', 'SMO', 'GMO', 'BMO1', 'BMO2', 'BMO3']

const bcGreenCell = { bg: 'var(--hz-green-50)', fg: 'var(--hz-green-700)', icon: 'fa-check', val: '0' }
const bcRedCell = (ha) => ({ bg: 'var(--hz-red-600)', fg: '#fff', icon: 'fa-exclamation-triangle', val: ha + ' Ha' })

const bcMatrixRows = [
  { label: 'IUPK', icon: 'fa-file-alt', total: '30 Ha', violation: true, hits: { LMO: 30 }, allSites: true },
  { label: 'RKAB', icon: 'fa-file-invoice', total: '0 Ha', violation: false, hits: {} },
  { label: 'AMDAL', icon: 'fa-leaf', total: '1.000 Ha', violation: true, hits: { GMO: '1.000' } },
  { label: 'FS', icon: 'fa-cog', total: '0 Ha', violation: false, hits: {} },
  { label: 'IPPKH', icon: 'fa-tree', total: '0 Ha', violation: false, hits: {} },
  { label: 'RR', icon: 'fa-shield-alt', total: '0 Ha', violation: false, hits: {} },
  { label: 'RPT', icon: 'fa-align-left', total: '0 Ha', violation: false, hits: {} },
  { label: 'LAND', icon: 'fa-mountain', total: '0 Ha', violation: false, hits: {} },
]

export const bcMatrix = bcMatrixRows.map((r) => ({
  label: r.label,
  icon: r.icon,
  total: r.total,
  statusCls: r.violation ? 'hz-chip hz-chip--danger' : 'hz-chip hz-chip--success',
  statusIcon: r.violation ? 'fa-exclamation-triangle' : 'fa-check-circle',
  statusTxt: r.violation ? 'Violation' : 'Compliant',
  cells: bcMatrixSites.map((site) => (r.hits[site] ? bcRedCell(r.hits[site]) : bcGreenCell)),
  allSites: !!r.allSites,
  notAllSites: !r.allSites,
  allSitesCell: r.allSites ? bcRedCell(parseInt(r.total, 10)) : null,
}))

// ---------------------------------------------------------------------------
// Production detail (3a)
// ---------------------------------------------------------------------------

export const prodKpis3a = [
  {
    label: 'Production',
    sub: 'Coal Getting + Shipment',
    value: '12,485,142',
    unit: 'Ton',
    chip: '+20.1%',
    cls: 'hz-chip hz-chip--success',
    valColor: 'var(--hz-text-primary)',
    barW: '100%',
    legend: [
      { text: 'Actual 120.1%', color: '#006CEB' },
      { text: 'Target 100%', color: '#8490A1' },
    ],
  },
  {
    label: 'Coal Getting',
    value: '6,121,078',
    unit: 'Ton',
    chip: '+23.2%',
    cls: 'hz-chip hz-chip--success',
    valColor: 'var(--hz-text-primary)',
    barW: '100%',
    legend: [
      { text: 'Actual 123.2%', color: '#006CEB' },
      { text: 'Target 100%', color: '#8490A1' },
    ],
  },
  {
    label: 'Shipment',
    value: '—',
    unit: 'Ton',
    chip: 'Belum tersedia',
    cls: 'hz-chip',
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
    cls: 'hz-chip',
    valColor: 'var(--hz-neutral-400)',
    barW: '0%',
    legend: [
      { text: 'Actual 0%', color: '#C6CDD7' },
      { text: 'Target 0%', color: '#E4E8EE' },
    ],
  },
]

const prodMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const prodActual = [980, 1040, 1120, 1180, 1250, 1310, 1390, 1450]
const prodTarget = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
const prodAchievement = [98, 104, 112, 118, 125, 131, 139, 145]
export const prodSeries = prodMonths.map((day, i) => ({
  day,
  Actual: prodActual[i],
  Target: prodTarget[i],
  Achievement: prodAchievement[i],
}))
export const prodBarCats = ['Actual', 'Target']
export const prodLineCats = ['Achievement']
export const prodColors = ['blue', 'neutral']
export const prodLineColors = ['orange']

export const prodRows = [
  { pit: 'LMO', plan: '1,715,000 ton', actual: '1,602,020 ton', ach: '93.7%', bar: '93.7%', tone: 'var(--hz-horizon-primary)' },
  { pit: 'SMO', plan: '1,190,000 ton', actual: '826,727 ton', ach: '138.6%', bar: '100%', tone: 'var(--hz-green-600)' },
  { pit: 'GMO', plan: '1,188,000 ton', actual: '1,630,041 ton', ach: '136.2%', bar: '100%', tone: 'var(--hz-green-600)' },
  { pit: 'BMO1', plan: '170,000 ton', actual: '205,400 ton', ach: '121.5%', bar: '100%', tone: 'var(--hz-green-600)' },
  { pit: 'BMO2', plan: '1,630,000 ton', actual: '2,044,991 ton', ach: '127.5%', bar: '100%', tone: 'var(--hz-green-600)' },
  { pit: 'BMO3', plan: '155,000 ton', actual: '54,885 ton', ach: '35.0%', bar: '35%', tone: 'var(--hz-red-500)' },
]

// ---------------------------------------------------------------------------
// OB Distance detail (4b)
// ---------------------------------------------------------------------------

export const obKpis4b = [
  {
    label: 'OB Distance',
    value: '2,611 m',
    pct: '87.2%',
    chip: 'On Track',
    cls: 'hz-chip hz-chip--success',
    barW: '87.2%',
    legend: [
      { text: 'Actual 2,611 m', color: '#006CEB' },
      { text: 'Target 2,994.15 m', color: '#8490A1' },
    ],
  },
  {
    label: 'OB Volume',
    value: '23,138,033 BCM',
    pct: '25.2%',
    chip: 'Watch',
    cls: 'hz-chip hz-chip--warn',
    barW: '25.2%',
    legend: [
      { text: 'Actual 23,138,033 BCM', color: '#006CEB' },
      { text: 'Target 168,425,823 BCM', color: '#8490A1' },
    ],
  },
]

const obMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const obDistAchievement = [78, 80, 82, 85, 87, 88, 89, 87.2]
export const obSeries = obMonths.map((day, i) => ({ day, Achievement: obDistAchievement[i] }))
export const obCats = ['Achievement']
export const obColors = ['green']

const obVolAchievement = [18, 20, 22, 24, 27, 29, 28, 25.2]
export const obVolSeries = obMonths.map((day, i) => ({ day, Achievement: obVolAchievement[i] }))
export const obVolCats = ['Achievement']
export const obVolColors = ['blue']

export const obDistRows = [
  { site: 'LMO', actual: '2,091', plan: '3,545.64', ach: '100%', bar: '100%', tone: 'var(--hz-green-500)' },
  { site: 'SMO', actual: '3,424', plan: '3,987.816', ach: '97%', bar: '97%', tone: 'var(--hz-green-500)' },
  { site: 'GMO', actual: '1,860', plan: '3,661.008', ach: '100%', bar: '100%', tone: 'var(--hz-green-500)' },
  { site: 'BMO1', actual: '1,891', plan: '3,084.648', ach: '100%', bar: '100%', tone: 'var(--hz-green-500)' },
  { site: 'BMO2', actual: '3,094', plan: '3,716.16', ach: '100%', bar: '100%', tone: 'var(--hz-green-500)' },
  { site: 'BMO3', actual: '1,093', plan: '1,335.936', ach: '100%', bar: '100%', tone: 'var(--hz-green-500)' },
]

export const obVolRows = [
  { site: 'LMO', actual: '6,451,014', plan: '57,875,550', ach: '12%', bar: '12%', tone: 'var(--hz-yellow-500)' },
  { site: 'SMO', actual: '3,267,395', plan: '21,710,065', ach: '15%', bar: '15%', tone: 'var(--hz-yellow-500)' },
  { site: 'GMO', actual: '4,023,401', plan: '23,602,903', ach: '17%', bar: '17%', tone: 'var(--hz-yellow-500)' },
  { site: 'BMO1', actual: '140,239', plan: '11,255,254', ach: '1%', bar: '1%', tone: 'var(--hz-red-500)' },
  { site: 'BMO2', actual: '8,929,272', plan: '54,590,632', ach: '16%', bar: '16%', tone: 'var(--hz-yellow-500)' },
  { site: 'BMO3', actual: '326,712', plan: '2,391,419', ach: '14%', bar: '14%', tone: 'var(--hz-yellow-500)' },
]

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

export const pctFmt = (v) => v.toFixed(1) + '%'
export const pctWholeFmt = (v) => v + '%'
export const ktFmt = (v) => v.toFixed(1) + ' kt'
