import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { PageHeader, MetaItem, StatCard, SectionHeading, Pill } from "@/components/ui-bits";
import { Layers, Satellite, Leaf, Calendar, Download } from "lucide-react";

const trends = [
  { month: "Nov", carbon: 320, biodiversity: 41, water: 58 },
  { month: "Dec", carbon: 410, biodiversity: 44, water: 60 },
  { month: "Jan", carbon: 480, biodiversity: 48, water: 63 },
  { month: "Feb", carbon: 560, biodiversity: 52, water: 67 },
  { month: "Mar", carbon: 640, biodiversity: 57, water: 71 },
  { month: "Apr", carbon: 740, biodiversity: 61, water: 74 },
  { month: "May", carbon: 860, biodiversity: 64, water: 78 },
];

const restoration = [
  { month: "Nov", value: 1200 },
  { month: "Dec", value: 1480 },
  { month: "Jan", value: 1820 },
  { month: "Feb", value: 2120 },
  { month: "Mar", value: 2540 },
  { month: "Apr", value: 2980 },
  { month: "May", value: 3420 },
];

// 14×8 normalized intensity grid for a parchment heatmap
const grid = Array.from({ length: 8 }, (_, y) =>
  Array.from({ length: 14 }, (_, x) => {
    const cx = 7, cy = 4;
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const noise = (Math.sin(x * 1.3) + Math.cos(y * 1.7)) * 0.15;
    return Math.max(0, Math.min(1, 1 - d / 8 + noise));
  })
);

const sites = [
  { id: "AS-204", name: "Kérou Watershed", status: "verified", lastSurvey: "2d ago", accent: "eco" as const },
  { id: "AS-187", name: "Lower Mahaweli Delta", status: "in review", lastSurvey: "5d ago", accent: "gov" as const },
  { id: "AS-156", name: "Cordillera Cloud Forest", status: "verified", lastSurvey: "1w ago", accent: "eco" as const },
  { id: "AS-142", name: "Atacama Fog Catchments", status: "pending", lastSurvey: "11d ago", accent: "val" as const },
  { id: "AS-118", name: "Sundarbans Mangrove Belt", status: "verified", lastSurvey: "2w ago", accent: "eco" as const },
];

export function BioregionDashboard() {
  return (
    <div>
      <PageHeader
        accent="eco"
        eyebrow="Folio I — Measurement"
        title="Bioregion telemetry from a living planet."
        lede="A continuous reading of soil, water, biodiversity and livelihood across 142 monitored sites in seven bioregions. Every datum carries a witness."
        meta={
          <>
            <MetaItem label="Period" value="May 2026 — trailing 7 mo." />
            <MetaItem label="Region" value="Global · 7 bioregions" />
            <MetaItem label="Sources" value="412 nodes · 38 stewards" />
            <MetaItem label="Last sync" value="00:04 ago" />
          </>
        }
        actions={
          <>
            <button className="h-9 px-3 rounded-md border border-border bg-surface text-xs flex items-center gap-2 hover:bg-accent transition">
              <Calendar className="h-3.5 w-3.5" /> Trailing 7 mo.
            </button>
            <button className="h-9 px-3 rounded-md bg-foreground text-background text-xs flex items-center gap-2 hover:opacity-90 transition">
              <Download className="h-3.5 w-3.5" /> Export folio
            </button>
          </>
        }
      />

      <div className="px-6 lg:px-10 py-8 space-y-10">
        {/* KPIs */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Hectares restored" value="3,420" unit="ha" delta={14.8} accent="eco" footnote="vs. prior period" />
            <StatCard label="Carbon sequestered" value="860" unit="t CO₂e" delta={9.2} accent="val" footnote="trailing month" />
            <StatCard label="Water retention index" value="0.78" delta={4.1} accent="gov" footnote="basin-weighted" />
            <StatCard label="Biodiversity score" value="64" unit="/ 100" delta={6.5} accent="eco" footnote="Shannon-adjusted" />
          </div>
        </section>

        {/* Map + sidebar */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 panel overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <div className="eyebrow">Plate I</div>
                <h3 className="font-display text-lg mt-0.5">Restoration heatmap · Western Sahel transect</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 px-2.5 rounded-md border border-border bg-surface text-[11px] font-mono flex items-center gap-1.5 hover:bg-accent">
                  <Satellite className="h-3 w-3" /> Satellite
                </button>
                <button className="h-8 px-2.5 rounded-md border border-border bg-surface text-[11px] font-mono flex items-center gap-1.5 hover:bg-accent">
                  <Layers className="h-3 w-3" /> Layers · 4
                </button>
              </div>
            </div>
            <div className="relative grid-paper p-6">
              <svg viewBox="0 0 560 320" className="w-full h-auto">
                {/* faint coastline */}
                <path
                  d="M20 240 C 80 220, 160 260, 220 230 S 340 200, 420 230 S 520 280, 560 240"
                  stroke="currentColor"
                  className="text-muted-foreground"
                  strokeOpacity="0.25"
                  fill="none"
                  strokeWidth="1"
                />
                <path
                  d="M40 80 C 120 100, 180 60, 260 90 S 380 130, 460 90 S 540 60, 560 80"
                  stroke="currentColor"
                  className="text-muted-foreground"
                  strokeOpacity="0.18"
                  fill="none"
                  strokeWidth="1"
                />
                {grid.flatMap((row, y) =>
                  row.map((v, x) => (
                    <circle
                      key={`${x}-${y}`}
                      cx={20 + x * 38}
                      cy={20 + y * 38}
                      r={4 + v * 14}
                      fill="var(--eco)"
                      opacity={0.08 + v * 0.55}
                    />
                  ))
                )}
                {/* labelled pins */}
                {[
                  { x: 280, y: 160, label: "AS-204" },
                  { x: 150, y: 110, label: "AS-187" },
                  { x: 430, y: 200, label: "AS-156" },
                ].map((p) => (
                  <g key={p.label}>
                    <circle cx={p.x} cy={p.y} r="5" fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.5" />
                    <text x={p.x + 10} y={p.y + 4} className="font-mono" fontSize="10" fill="currentColor">
                      {p.label}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>14°N — 18°N</span>
                <div className="flex items-center gap-2">
                  <span>low</span>
                  <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--eco-soft)] to-[var(--eco)]" />
                  <span>high</span>
                </div>
                <span>scale 1 : 2,400,000</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="eyebrow">Field log</div>
                <h3 className="font-display text-lg mt-0.5">Active sites</h3>
              </div>
              <Pill accent="eco">5 active</Pill>
            </div>
            <ul className="divide-y divide-border">
              {sites.map((s) => (
                <li key={s.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-surface transition cursor-pointer">
                  <div className="h-8 w-8 rounded-md bg-[var(--eco-soft)] text-[var(--eco)] flex items-center justify-center">
                    <Leaf className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">{s.id}</span>
                      <span className="text-sm truncate">{s.name}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Last survey · {s.lastSurvey}
                    </div>
                  </div>
                  <Pill accent={s.accent}>{s.status}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Trends */}
        <section>
          <SectionHeading
            index="02"
            title="Monthly trends"
            description="Quiet, additive momentum across three primary indicators."
            aside={
              <>
                <Pill accent="val">Carbon (t)</Pill>
                <Pill accent="eco">Biodiversity</Pill>
                <Pill accent="gov">Water idx</Pill>
              </>
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="panel p-5 lg:col-span-2 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--val)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--val)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--eco)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--eco)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gW" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gov)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--gov)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="plainline" />
                  <Area type="monotone" dataKey="carbon" stroke="var(--val)" fill="url(#gC)" strokeWidth={2} />
                  <Area type="monotone" dataKey="biodiversity" stroke="var(--eco)" fill="url(#gB)" strokeWidth={2} />
                  <Area type="monotone" dataKey="water" stroke="var(--gov)" fill="url(#gW)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="panel p-5 h-[320px] flex flex-col">
              <div className="eyebrow">Plate II</div>
              <h3 className="font-display text-lg mt-1">Hectares under restoration</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="num text-3xl">3,420</span>
                <span className="text-[var(--eco)] text-xs font-mono">+14.8%</span>
              </div>
              <div className="flex-1 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={restoration}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={40} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="var(--eco)" strokeWidth={2} dot={{ r: 3, fill: "var(--eco)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
