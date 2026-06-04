import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { PageHeader, MetaItem, StatCard, SectionHeading, Pill } from "@/components/ui-bits";
import { TrendingUp, MapPin, Filter, ChevronRight, ArrowRight } from "lucide-react";

const portfolio = [
  { month: "Nov", returns: 4.1, impact: 38 },
  { month: "Dec", returns: 4.6, impact: 42 },
  { month: "Jan", returns: 5.2, impact: 47 },
  { month: "Feb", returns: 5.8, impact: 51 },
  { month: "Mar", returns: 6.4, impact: 56 },
  { month: "Apr", returns: 7.1, impact: 61 },
  { month: "May", returns: 7.8, impact: 64 },
];

type Accent = "eco" | "gov" | "val" | "fin";
type Allocation = {
  key: string;
  label: string;
  pct: number;
  accent: Accent;
  value: string;
  description: string;
  projects: string[]; // project ids
  flow: { from: string; to: string; amount: string }[];
};

const allocation: Allocation[] = [
  {
    key: "soil",
    label: "Soil & watershed restoration",
    pct: 38,
    accent: "eco",
    value: "$1.94M",
    description: "Terracing, swales and cover-cropping across dryland transects. Disbursements gated on soil moisture and infiltration gains.",
    projects: ["PRJ-204", "PRJ-142"],
    flow: [
      { from: "Treasury", to: "Regional bursar", amount: "$1.94M" },
      { from: "Regional bursar", to: "Field cooperatives", amount: "$1.62M" },
      { from: "Field cooperatives", to: "Verified outcomes", amount: "$1.41M" },
    ],
  },
  {
    key: "biodiversity",
    label: "Biodiversity corridors",
    pct: 24,
    accent: "eco",
    value: "$1.22M",
    description: "Connective replanting linking cloud forest, mangrove and montane fragments. Funded against acoustic-DNA species recoveries.",
    projects: ["PRJ-156", "PRJ-187"],
    flow: [
      { from: "Treasury", to: "Bioregion programmes", amount: "$1.22M" },
      { from: "Bioregion programmes", to: "Steward councils", amount: "$1.04M" },
      { from: "Steward councils", to: "Verified outcomes", amount: "$0.91M" },
    ],
  },
  {
    key: "livelihoods",
    label: "Community livelihoods",
    pct: 18,
    accent: "gov",
    value: "$0.92M",
    description: "Stewardship stipends, training and tool grants. Tied to enrolment and retention across 38 operator cohorts.",
    projects: ["PRJ-187", "PRJ-204"],
    flow: [
      { from: "Treasury", to: "Community trust", amount: "$0.92M" },
      { from: "Community trust", to: "Operator stipends", amount: "$0.74M" },
      { from: "Operator stipends", to: "Verified outcomes", amount: "$0.68M" },
    ],
  },
  {
    key: "verification",
    label: "Verification & monitoring",
    pct: 12,
    accent: "val",
    value: "$0.61M",
    description: "Atlas Nodes, third-party audits and satellite cross-checks. The witness layer beneath every other line.",
    projects: ["PRJ-142", "PRJ-156"],
    flow: [
      { from: "Treasury", to: "Verification ops", amount: "$0.61M" },
      { from: "Verification ops", to: "Field auditors", amount: "$0.42M" },
      { from: "Field auditors", to: "Public ledger", amount: "$0.38M" },
    ],
  },
  {
    key: "reserve",
    label: "Treasury reserve",
    pct: 8,
    accent: "fin",
    value: "$0.41M",
    description: "Held against drawdown risk and emergent restoration windows. Released only by council quorum.",
    projects: [],
    flow: [
      { from: "Investor pool", to: "Treasury reserve", amount: "$0.41M" },
      { from: "Treasury reserve", to: "Held", amount: "$0.41M" },
    ],
  },
];


const projects = [
  {
    id: "PRJ-204",
    name: "Kérou Watershed Restoration",
    region: "West Africa",
    funded: 78,
    target: "$640K",
    roi: "6.4%",
    impact: "1,820 t CO₂e",
    accent: "eco" as const,
  },
  {
    id: "PRJ-187",
    name: "Mahaweli Mangrove Corridor",
    region: "South Asia",
    funded: 54,
    target: "$420K",
    roi: "5.1%",
    impact: "+312 species",
    accent: "gov" as const,
  },
  {
    id: "PRJ-156",
    name: "Cordillera Cloud Forest",
    region: "Andes",
    funded: 91,
    target: "$880K",
    roi: "7.8%",
    impact: "2,100 ha protected",
    accent: "fin" as const,
  },
  {
    id: "PRJ-142",
    name: "Atacama Fog Catchment",
    region: "South America",
    funded: 32,
    target: "$310K",
    roi: "4.2%",
    impact: "740 kL/yr water",
    accent: "val" as const,
  },
];

const flow = [
  { from: "Investor pool", to: "Treasury", amount: "$5.10M", accent: "fin" as const },
  { from: "Treasury", to: "Bioregion programmes", amount: "$3.40M", accent: "eco" as const },
  { from: "Bioregion programmes", to: "Verified outcomes", amount: "$2.86M", accent: "val" as const },
  { from: "Verified outcomes", to: "Investor returns", amount: "$0.62M", accent: "gov" as const },
];

const accentBar: Record<Accent, string> = {
  eco: "bg-[var(--eco)]",
  gov: "bg-[var(--gov)]",
  val: "bg-[var(--val)]",
  fin: "bg-[var(--fin)]",
};

export function FinanceDashboard() {
  const [selectedKey, setSelectedKey] = useState<string>(allocation[0].key);
  const selected = allocation.find((a) => a.key === selectedKey) ?? allocation[0];
  const selectedProjects = projects.filter((p) => selected.projects.includes(p.id));

  return (
    <div>
      <PageHeader
        accent="fin"
        eyebrow="Folio IV — Finance"
        title="Capital that listens to soil, water and people."
        lede="A regenerative portfolio where every disbursement is conditional on measured ecological return."
        meta={
          <>
            <MetaItem label="Capital deployed" value="$5.10M" />
            <MetaItem label="Active projects" value="24" />
            <MetaItem label="Blended return" value="6.2% / yr" />
            <MetaItem label="Risk band" value="B+ (regenerative)" />
          </>
        }
        actions={
          <button className="h-9 px-3 rounded-md bg-foreground text-background text-xs flex items-center gap-2 hover:opacity-90 transition">
            <TrendingUp className="h-3.5 w-3.5" /> Open marketplace
          </button>
        }
      />

      <div className="px-6 lg:px-10 py-8 space-y-10">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Capital deployed" value="$5.10M" delta={8.3} accent="fin" footnote="trailing 30d" />
          <StatCard label="Financial return" value="6.2%" unit="annualised" delta={1.4} accent="val" />
          <StatCard label="Ecological return" value="64" unit="impact idx" delta={11.8} accent="eco" />
          <StatCard label="Treasury runway" value="22" unit="months" delta={-2.0} accent="gov" footnote="conservative" />
        </section>

        {/* Portfolio + allocation */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="panel p-5 xl:col-span-2 h-[340px] flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">Plate V</div>
                <h3 className="font-display text-lg mt-0.5">Blended portfolio · returns vs. impact</h3>
              </div>
              <div className="flex items-center gap-2">
                <Pill accent="val">Returns (%)</Pill>
                <Pill accent="eco">Impact idx</Pill>
              </div>
            </div>
            <div className="flex-1 mt-3 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolio}>
                  <defs>
                    <linearGradient id="finA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--val)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--val)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="finB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--eco)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--eco)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={36} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="returns" stroke="var(--val)" fill="url(#finA)" strokeWidth={2} />
                  <Area type="monotone" dataKey="impact" stroke="var(--eco)" fill="url(#finB)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="eyebrow">Treasury</div>
                <h3 className="font-display text-lg mt-0.5">Resource allocation</h3>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">$5.10M</span>
            </div>
            <ul className="divide-y divide-border">
              {allocation.map((a) => (
                <li key={a.label} className="px-5 py-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{a.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{a.value}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={
                        a.accent === "eco" ? "h-full bg-[var(--eco)]" :
                        a.accent === "gov" ? "h-full bg-[var(--gov)]" :
                        a.accent === "val" ? "h-full bg-[var(--val)]" :
                        "h-full bg-[var(--fin)]"
                      }
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] font-mono text-muted-foreground">
                    <Pill accent={a.accent}>{a.accent}</Pill>
                    <span>{a.pct}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionHeading
            index="02"
            title="Active projects"
            description="Each card is a living instrument — funding releases on verified milestones."
            aside={
              <button className="h-8 px-3 rounded-md border border-border bg-surface text-[11px] font-mono flex items-center gap-1.5 hover:bg-accent">
                <Filter className="h-3 w-3" /> All regions
              </button>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {projects.map((p) => (
              <article key={p.id} className="panel p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{p.id}</span>
                  <Pill accent={p.accent}>{p.region}</Pill>
                </div>
                <h3 className="font-display text-base leading-snug text-balance">{p.name}</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-muted-foreground">Funded</span>
                    <span>{p.funded}% of {p.target}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-foreground" style={{ width: `${p.funded}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                  <div>
                    <div className="eyebrow">ROI</div>
                    <div className="num text-base mt-0.5">{p.roi}</div>
                  </div>
                  <div className="text-right">
                    <div className="eyebrow">Impact</div>
                    <div className="text-sm mt-0.5">{p.impact}</div>
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Field-verified · last week
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section>
          <SectionHeading
            index="03"
            title="Capital flow"
            description="From investors to outcomes — every link is auditable."
          />
          <div className="panel p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {flow.map((f, i) => (
                <div key={i} className="relative">
                  <div className="panel-flat p-4">
                    <div className="eyebrow">Stage {i + 1}</div>
                    <div className="mt-2 text-sm">{f.from}</div>
                    <div className="mt-1 font-mono text-[11px] text-muted-foreground">→ {f.to}</div>
                    <div className="mt-3 num text-xl">{f.amount}</div>
                    <div className="mt-2"><Pill accent={f.accent}>verified</Pill></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
