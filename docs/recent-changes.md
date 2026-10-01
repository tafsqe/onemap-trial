# OneMap Dashboard — Recent Changes Summary

**Purpose:** Reference notes on what's shipped so far, for updating the PRD. Covers the full build history (2026-09-21 to 2026-09-29).

## What the app is

A React + Vite + Tailwind CSS dashboard ("OneMap") with four views: **Overview**, **Boundary Compliance**, **Production**, and **OB Distance** (overburden distance/volume). Data is currently simulated dummy data (`src/data/dummy.js`); no backend integration yet.

## Timeline

| Date | Change |
|---|---|
| 09-21 | Initial build: Overview, Boundary Compliance, Production, OB Distance pages |
| 09-23 | Migrated to Tailwind CSS; added dashboard tabs and simulated date-range filtering |
| 09-23 | Reworked Overview cards and detail-page charts for visual consistency |
| 09-25 | Fixed left-axis max scaling on Production and OB trend charts |
| 09-29 | `vercel.json` added for SPA client-side routing (deploy fix) |
| 09-29 | Detail-page filter overhaul across all three report pages (PR #2) |
| 09-29 | Boundary Compliance: added "Semua Bulan" (all-months) trend option; OB cards show gap-to-target |
| 09-29 | Renamed Boundary Compliance KPI label |
| 09-29 | Further Production and OB Distance reporting-page refinements |

## Detailed changes by page

### Boundary Compliance
- Replaced the top date-range picker with a single date picker.
- Weekly ("Mingguan") trend chart now has its own Month+Year filter, independent of the top filter; Monthly ("Bulanan") trend has its own Year filter.
- Weekly trend chart's month selector gained a **"Semua Bulan"** option that renders the full 52-week year instead of one month's slice.
- KPI card label renamed to **"Total boundary dilanggar"** (was a different label — reflects a shift toward reporting raw violation counts).

### Production
- Removed the aggregate "Production" summary card.
- Shipment card now populated with live dummy data, tagged **"(All Site)"**.
- Trend chart renamed to **"Achievement Coal Getting per bulan"**, with its own Year filter.
- Landing card subtitle renamed to **"Kepatuhan Produksi Coal"**.
- Inventory field in the card's rincian (detail) now shows **"Belum tersedia"** (not yet available) instead of a placeholder value.
- Added a **Plan filter dropdown** to the detail page.

### OB Distance (Overburden Distance/Volume)
- Per-site achievement bar colors standardized: red `<50`, blue `50–99`, green `>=100` — now consistent between OB Distance and other pages.
- Added an independent **Year filter** to each trend chart.
- Actual/Target legend on KPI cards now shown as **percentages**.
- Top badge on KPI cards now shows the **gap from target** (not a repeat of the achievement %), and turns **red whenever below target**.
- Removed the "Rata-rata bulanan seluruh site" (monthly average across all sites) subtitle from the OB Distance/Volume per-site cards.

### Overview
- Cards and detail-page charts reworked for consistent styling across the dashboard (09-23); no further changes since.

### Infrastructure
- Migrated styling to Tailwind CSS.
- Added dashboard tab navigation and simulated date-range filtering.
- Fixed chart Y-axis scaling bugs.
- Added `vercel.json` so deep-linked routes work correctly on Vercel (SPA rewrite).

## Notable product-level shifts worth reflecting in the PRD

1. **Filtering model changed**: each detail page's trend chart now has its own independent time filter (Month/Year), decoupled from a single global date-range picker. The PRD's filtering/UX section likely needs updating if it still describes one shared date-range control.
2. **KPI presentation shifted from "achievement %" to "gap from target"** on OB Distance/Volume cards, with color-coded alerting (red when below target). Worth documenting as a design pattern if it should extend to other KPIs.
3. **Achievement bar color thresholds standardized** (red/blue/green at <50/50-99/>=100) — a candidate for a shared design-system rule across all pages.
4. **Production's Inventory metric is explicitly marked unavailable** rather than showing placeholder data — suggests Inventory is a known data gap, not yet wired to a real source.
5. **Tech stack**: Tailwind CSS is now the styling approach (migrated from whatever preceded it) — worth noting in any technical/architecture section of the PRD.
