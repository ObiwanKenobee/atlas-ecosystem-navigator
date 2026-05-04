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
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

type AssetKey = "carbon" | "biodiversity" | "water";

const assets: Record<
  AssetKey,
  {
    label: string;
    unit: string;
    quantity: string;
    price: string;
    total: string;
    delta: number;
    accent: "val" | "eco" | "gov";
    series: { month: string; v: number }[];
  }
> = {
  carbon: {
    label: "Carbon",
    unit: "tonnes CO₂e",
    quantity: "12,840",
    price: "$84.20",
    total: "$1,081,128",
    delta: 9.4,
    accent: "val",
    series: [
      { month: "Nov", v: 720 }, { month: "Dec", v: 810 }, { month: "Jan", v: 880 },
      { month: "Feb", v: 940 }, { month: "Mar", v: 1010 }, { month: "Apr", v: 1060 }, { month: "May", v: 1081 },
    ],
  },
  biodiversity: {
    label: "Biodiversity",
    unit: "units",
    quantity: "5,420",
    price: "$142.00",
    total: "$769,640",
    delta: 12.1,
    accent: "eco",
    series: [
      { month: "Nov", v: 480 }, { month: "Dec", v: 530 }, { month: "Jan", v: 580 },
      { month: "Feb", v: 620 }, { month: "Mar", v: 680 }, { month: "Apr", v: 720 }, { month: "May", v: 769 },
    ],
  },
  water: {
    label: "Water",
    unit: "credits (kL)",
    quantity: "3,180",
    price: "$56.50",
    total: "$179,670",
    delta: 4.6,
    accent: "gov",
    series: [
      { month: "Nov", v: 122 }, { month: "Dec", v: 134 }, { month: "Jan", v: 148 },
      { month: "Feb", v: 158 }, { month: "Mar", v: 167 }, { month: "Apr", v: 174 }, { month: "May", v: 179 },
    ],
  },
};

const registry = [
  { id: "ASR-00982", type: "Carbon", owner: "Kérou Cooperative", status: "verified", accent: "val" as const, icon: CheckCircle2 },
  { id: "ASR-00981", type: "Biodiversity", owner: "Cordillera Council", status: "sold", accent: "eco" as const, icon: ShieldCheck },
  { id: "ASR-00980", type: "Water", owner: "Mahaweli Stewards", status: "in review", accent: "gov" as const, icon: Clock },
  { id: "ASR-00979", type: "Carbon", owner: "Sundarbans Trust", status: "verified", accent: "val" as const, icon: CheckCircle2 },
  { id: "ASR-00978", type: "Biodiversity", owner: "Atacama Node", status: "verified", accent: "eco" as const, icon: CheckCircle2 },
  { id: "ASR-00977", type: "Water", owner: "Sahel Confederation", status: "pending", accent: "gov" as const, icon: Clock },
];

export function ImpactDashboard() {
  const [active, setActive] = useState<AssetKey>("carbon");
  const a = assets[active];

  return (
    <div>
      <PageHeader
        accent="val"
        eyebrow="Folio III — Impact"
        title="Value made legible to soil and to spreadsheet."
        lede="A registry of ecological assets — each one bonded to measurement, verification and a chain of custody anyone can read."
        meta={
          <>
            <MetaItem label="Registry size" value="982 assets" />
            <MetaItem label="Verified" value="91.2%" />
            <MetaItem label="Total value" value="$2.03M" />
            <MetaItem label="Auditors" value="14 third parties" />
          </>
        }
      />

      <div className="px-6 lg:px-10 py-8 space-y-10">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total impact value" value="$2.03M" delta={9.8} accent="val" footnote="trailing month" />
          <StatCard label="Carbon credits" value="12,840" unit="t CO₂e" delta={9.4} accent="val" />
          <StatCard label="Biodiversity units" value="5,420" delta={12.1} accent="eco" />
          <StatCard label="Water credits" value="3,180" unit="kL" delta={4.6} accent="gov" />
        </section>

        {/* Asset selector */}
        <section>
          <SectionHeading
            index="01"
            title="Asset valuation"
            description="Select an asset class to inspect its lifecycle and value over time."
            aside={
              <div className="flex items-center gap-1 p-1 rounded-md border border-border bg-surface">
                {(Object.keys(assets) as AssetKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActive(k)}
                    className={[
                      "px-3 h-8 rounded-sm text-xs font-mono transition",
                      active === k
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {assets[k].label}
                  </button>
                ))}
              </div>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="panel p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Pill accent={a.accent}>{a.label}</Pill>
                <span className="font-mono text-[11px] text-muted-foreground">{a.unit}</span>
              </div>
              <div>
                <div className="eyebrow">Quantity</div>
                <div className="num text-4xl mt-1">{a.quantity}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <div>
                  <div className="eyebrow">Price</div>
                  <div className="num text-xl mt-1">{a.price}</div>
                </div>
                <div>
                  <div className="eyebrow">Total value</div>
                  <div className="num text-xl mt-1">{a.total}</div>
                </div>
              </div>
              <div className="text-[11px] font-mono text-[var(--eco)] pt-1">
                +{a.delta}% trailing month
              </div>
            </div>

            <div className="panel p-5 lg:col-span-2 h-[320px] flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow">Plate IV</div>
                  <h3 className="font-display text-lg mt-0.5">{a.label} value over time</h3>
                </div>
                <span className="text-xs text-muted-foreground">USD · thousands</span>
              </div>
              <div className="flex-1 mt-3 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={a.series}>
                    <defs>
                      <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={`var(--${a.accent})`} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={`var(--${a.accent})`} stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                    <Area type="monotone" dataKey="v" stroke={`var(--${a.accent})`} fill="url(#impactGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Asset registry */}
        <section>
          <SectionHeading
            index="02"
            title="Asset registry"
            description="Recent entries in the chain of custody."
          />
          <div className="panel overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-border eyebrow">
              <div className="col-span-3">Asset ID</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-4">Owner</div>
              <div className="col-span-3 text-right">Status</div>
            </div>
            <ul className="divide-y divide-border">
              {registry.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.id} className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-surface transition">
                    <div className="col-span-3 font-mono text-xs">{r.id}</div>
                    <div className="col-span-2 text-sm">{r.type}</div>
                    <div className="col-span-4 text-sm text-muted-foreground">{r.owner}</div>
                    <div className="col-span-3 flex justify-end">
                      <Pill accent={r.accent}>
                        <Icon className="h-3 w-3" /> {r.status}
                      </Pill>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
