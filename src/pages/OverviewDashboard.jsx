import DashboardTabs from '../components/DashboardTabs.jsx'
import PageShell from '../components/PageShell.jsx'

// Placeholder for the legacy "Overview Dashboard" — it lives in a separate
// repo, not this one. Shown here as static reference screenshots until it's
// actually integrated (embedded, ported, or linked out).
export default function OverviewDashboard() {
  return (
    <PageShell active={null}>
      <div className="border-b border-neutral-200 bg-white">
        <div className="flex h-14 items-center gap-3 px-5">
          <span className="text-base font-bold text-neutral-950">Dashboard</span>
          <span className="rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-bold text-yellow-700">Placeholder</span>
        </div>
        <DashboardTabs />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          <i className="far fa-circle-info" />
          Dashboard ini ada di repo terpisah dan belum terintegrasi — ditampilkan sebagai screenshot referensi.
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md">
          <img src="/overview-dashboard/screenshot-1.png" alt="Overview Dashboard — bagian atas" className="w-full" />
        </div>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md">
          <img src="/overview-dashboard/screenshot-2.png" alt="Overview Dashboard — bagian bawah" className="w-full" />
        </div>
      </div>
    </PageShell>
  )
}
