import { useState } from "react";
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
import { Layers, Satellite, Leaf, Calendar, Download, X, MapPin, Droplets, Trees, Wind } from "lucide-react";

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

const grid = Array.from({ length: 8 }, (_, y) =>
  Array.from({ length: 14 }, (_, x) => {
    const cx = 7, cy = 4;
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const noise = (Math.sin(x * 1.3) + Math.cos(y * 1.7)) * 0.15;
    return Math.max(0, Math.min(1, 1 - d / 8 + noise));
  })
);

type SiteDetail = {
  id: string;
  name: string;
  status: "verified" | "in review" | "pending";
  lastSurvey: string;
  accent: "eco" | "gov" | "val";
  region: string;
  hectares: number;
  carbon: number;
  biodiversity: number;
  water: number;
  steward: string;
  notes: string;
  x?: number;
  y?: number;
};

const sites: SiteDetail[] = [
  { id: "AS-204", name: "Kérou Watershed", status: "verified", lastSurvey: "2d ago", accent: "eco", region: "West Africa · Sahel", hectares: 1820, carbon: 412, biodiversity: 67, water: 0.81, steward: "Aïcha Diallo", notes: "Soil moisture index up 18% since terracing began in March. Three downstream villages now reporting reliable dry-season flow.", x: 280, y: 160 },
  { id: "AS-187", name: "Lower Mahaweli Delta", status: "in review", lastSurvey: "5d ago", accent: "gov", region: "South Asia · Sri Lanka", hectares: 640, carbon: 188, biodiversity: 58, water: 0.74, steward: "Ruwan Senanayake", notes: "Mangrove regrowth stable. Awaiting third-party verification on salinity buffering claims.", x: 150, y: 110 },
  { id: "AS-156", name: "Cordillera Cloud Forest", status: "verified", lastSurvey: "1w ago", accent: "eco", region: "Andes · Ecuador", hectares: 2100, carbon: 524, biodiversity: 82, water: 0.88, steward: "Maritza Quishpe", notes: "Acoustic-DNA biodiversity sweep returned 312 unique species, including two previously unrecorded amphibians.", x: 430, y: 200 },
  { id: "AS-142", name: "Atacama Fog Catchments", status: "pending", accent: "val", lastSurvey: "11d ago", region: "South America · Chile", hectares: 210, carbon: 24, biodiversity: 31, water: 0.62, steward: "Tomás Aguilar", notes: "Mesh installation 60% complete. Yield projections under review with hydrology council." },
  { id: "AS-118", name: "Sundarbans Mangrove Belt", status: "verified", lastSurvey: "2w ago", accent: "eco", region: "South Asia · Bangladesh", hectares: 3400, carbon: 980, biodiversity: 74, water: 0.85, steward: "Rashida Begum", notes: "Storm-surge attenuation measured at 41% reduction in adjacent settlements during April monsoon." },
];

const pinSites = sites.filter((s) => s.x != null);

export function BioregionDashboard() {
  const [open, setOpen] = useState<SiteDetail | null>(null);

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
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Hectares restored" value="3,420" unit="ha" delta={14.8} accent="eco" footnote="vs. prior period" />
            <StatCard label="Carbon sequestered" value="860" unit="t CO₂e" delta={9.2} accent="val" footnote="trailing month" />
            <StatCard label="Water retention index" value="0.78" delta={4.1} accent="gov" footnote="basin-weighted" />
            <StatCard label="Biodiversity score" value="64" unit="/ 100" delta={6.5} accent="eco" footnote="Shannon-adjusted" />
          </div>
        </section>

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
              <svg viewBox="0 0 560 320" className="w-full h-auto" role="img" aria-label="Bioregion restoration heatmap. Tap a pin to inspect a site.">
                <path d="M20 240 C 80 220, 160 260, 220 230 S 340 200, 420 230 S 520 280, 560 240" stroke="currentColor" className="text-muted-foreground" strokeOpacity="0.25" fill="none" strokeWidth="1" />
                <path d="M40 80 C 120 100, 180 60, 260 90 S 380 130, 460 90 S 540 60, 560 80" stroke="currentColor" className="text-muted-foreground" strokeOpacity="0.18" fill="none" strokeWidth="1" />
                {grid.flatMap((row, y) =>
                  row.map((v, x) => (
                    <circle key={`${x}-${y}`} cx={20 + x * 38} cy={20 + y * 38} r={4 + v * 14} fill="var(--eco)" opacity={0.08 + v * 0.55} />
                  ))
                )}
                {pinSites.map((p) => {
                  const active = open?.id === p.id;
                  return (
                    <g
                      key={p.id}
                      onClick={() => setOpen(p)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open details for ${p.name} (${p.id})`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpen(p);
                        }
                      }}
                      className="cursor-pointer focus:outline-none focus-visible:[&>circle]:stroke-[var(--eco)]"
                    >
                      <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                      <circle cx={p.x} cy={p.y} r={active ? 8 : 5} fill="var(--background)" stroke={active ? "var(--eco)" : "var(--foreground)"} strokeWidth={active ? 2 : 1.5} />
                      <circle cx={p.x} cy={p.y} r={active ? 3 : 2} fill={active ? "var(--eco)" : "var(--foreground)"} />
                      <text x={(p.x ?? 0) + 12} y={(p.y ?? 0) + 4} className="font-mono" fontSize="10" fill="currentColor">{p.id}</text>
                    </g>
                  );
                })}
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
                <li key={s.id}>
                  <button
                    onClick={() => setOpen(s)}
                    className="w-full text-left px-5 py-3.5 flex items-center gap-3 hover:bg-surface transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <div className="h-8 w-8 rounded-md bg-[var(--eco-soft)] text-[var(--eco)] flex items-center justify-center">
                      <Leaf className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">{s.id}</span>
                        <span className="text-sm truncate">{s.name}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">Last survey · {s.lastSurvey}</div>
                    </div>
                    <Pill accent={s.accent}>{s.status}</Pill>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

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
                    <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--val)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--val)" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--eco)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--eco)" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gW" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gov)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--gov)" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
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
                    <Tooltip contentStyle={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="value" stroke="var(--eco)" strokeWidth={2} dot={{ r: 3, fill: "var(--eco)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteDetailPanel site={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function SiteDetailPanel({ site, onClose }: { site: SiteDetail | null; onClose: () => void }) {
  if (!site) return null;
  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={`${site.name} details`}>
      <button
        aria-label="Close site details"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[460px] bg-background border-l border-border shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Pill accent={site.accent}>{site.status}</Pill>
              <span className="font-mono text-[11px] text-muted-foreground">{site.id}</span>
            </div>
            <h2 className="font-display text-2xl tracking-tight">{site.name}</h2>
            <div className="mt-1.5 text-xs text-muted-foreground inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> {site.region}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-md border border-border bg-surface flex items-center justify-center hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <DetailStat icon={<Trees className="h-3.5 w-3.5" />} label="Hectares" value={site.hectares.toLocaleString()} accent="eco" />
            <DetailStat icon={<Wind className="h-3.5 w-3.5" />} label="Carbon (t CO₂e)" value={site.carbon.toString()} accent="val" />
            <DetailStat icon={<Leaf className="h-3.5 w-3.5" />} label="Biodiversity" value={`${site.biodiversity}/100`} accent="eco" />
            <DetailStat icon={<Droplets className="h-3.5 w-3.5" />} label="Water index" value={site.water.toFixed(2)} accent="gov" />
          </div>

          <div>
            <div className="eyebrow mb-2">Field notes</div>
            <p className="text-sm text-foreground/90 leading-relaxed">{site.notes}</p>
          </div>

          <div className="panel-flat p-4">
            <div className="eyebrow">Steward</div>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[var(--eco-soft)] text-[var(--eco)] flex items-center justify-center font-display text-sm">
                {site.steward.charAt(0)}
              </div>
              <div>
                <div className="text-sm">{site.steward}</div>
                <div className="text-[11px] text-muted-foreground">Last survey · {site.lastSurvey}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 h-9 rounded-md bg-foreground text-background text-xs hover:opacity-90 transition">
              View full dossier
            </button>
            <button className="h-9 px-3 rounded-md border border-border bg-surface text-xs hover:bg-accent transition">
              Open in map
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DetailStat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: "eco" | "gov" | "val" | "fin" }) {
  const bgMap = { eco: "bg-[var(--eco-soft)] text-[var(--eco)]", gov: "bg-[var(--gov-soft)] text-[var(--gov)]", val: "bg-[var(--val-soft)] text-[var(--val)]", fin: "bg-[var(--fin-soft)] text-[var(--fin)]" };
  return (
    <div className="panel-flat p-3">
      <div className="flex items-center gap-2">
        <span className={`h-6 w-6 rounded-md flex items-center justify-center ${bgMap[accent]}`}>{icon}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className="num text-xl mt-2">{value}</div>
    </div>
  );
}
