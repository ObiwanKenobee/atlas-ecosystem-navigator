import { useState } from "react";
import { PageHeader, MetaItem, StatCard, SectionHeading, Pill } from "@/components/ui-bits";
import { Check, X, MessageSquare, Users, Vote as VoteIcon, AlertTriangle, MinusCircle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type VoteChoice = "approve" | "reject" | "abstain";

const proposals = [
  {
    id: "PRO-2026-031",
    title: "Allocate 12% of Q3 treasury to Sahel watershed restoration",
    summary:
      "Direct a tranche of regenerative capital into AS-204 watershed protection, tied to verified soil & water KPIs.",
    region: "West Africa",
    approve: 64,
    reject: 18,
    abstain: 18,
    timeLeft: "2d 14h",
    accent: "gov" as const,
  },
  {
    id: "PRO-2026-030",
    title: "Adopt new biodiversity verification protocol (v2.1)",
    summary:
      "Replace the legacy bird-call sampler with the joint acoustic-DNA protocol developed by the Cordillera node.",
    region: "Andes",
    approve: 81,
    reject: 5,
    abstain: 14,
    timeLeft: "5d 06h",
    accent: "eco" as const,
  },
  {
    id: "PRO-2026-029",
    title: "Suspend AS-077 pending audit of conflicting field reports",
    summary:
      "Three operators have flagged inconsistent soil samples. Council vote required before next disbursement.",
    region: "South-East Asia",
    approve: 42,
    reject: 39,
    abstain: 19,
    timeLeft: "18h",
    accent: "val" as const,
  },
];

const turnout = [
  { month: "Nov", participation: 51 },
  { month: "Dec", participation: 58 },
  { month: "Jan", participation: 61 },
  { month: "Feb", participation: 65 },
  { month: "Mar", participation: 72 },
  { month: "Apr", participation: 74 },
  { month: "May", participation: 78 },
];

const ledger = [
  { date: "May 02", text: "$50,000 allocated to Kérou watershed restoration", accent: "fin" as const },
  { date: "Apr 28", text: "PRO-2026-027 ratified · 81% approval", accent: "gov" as const },
  { date: "Apr 24", text: "AS-118 mangrove report verified by 3rd-party auditor", accent: "eco" as const },
  { date: "Apr 19", text: "$12,400 disbursed to 14 field operators", accent: "fin" as const },
  { date: "Apr 11", text: "Council seat rotated · Sundarbans node", accent: "gov" as const },
];

export function GovernanceDashboard() {
  const [votes, setVotes] = useState<Record<string, { approve: number; reject: number; abstain: number; mine: VoteChoice | null; total: number }>>(
    () =>
      Object.fromEntries(
        proposals.map((p) => [p.id, { approve: p.approve, reject: p.reject, abstain: p.abstain, mine: null, total: p.approve + p.reject + p.abstain }])
      )
  );

  function castVote(id: string, choice: VoteChoice) {
    setVotes((prev) => {
      const cur = prev[id];
      if (cur.mine === choice) return prev;
      // optimistic: add 1 to total, recompute percentages with absolute counts then re-normalise
      const counts = {
        approve: Math.round((cur.approve / 100) * cur.total),
        reject: Math.round((cur.reject / 100) * cur.total),
        abstain: Math.round((cur.abstain / 100) * cur.total),
      };
      if (cur.mine) counts[cur.mine] = Math.max(0, counts[cur.mine] - 1);
      counts[choice] += 1;
      const total = counts.approve + counts.reject + counts.abstain;
      return {
        ...prev,
        [id]: {
          mine: choice,
          total,
          approve: Math.round((counts.approve / total) * 100),
          reject: Math.round((counts.reject / total) * 100),
          abstain: 100 - Math.round((counts.approve / total) * 100) - Math.round((counts.reject / total) * 100),
        },
      };
    });
  }

  return (
    <div>
      <PageHeader
        accent="gov"
        eyebrow="Folio II — Governance"
        title="A council that listens before it moves."
        lede="Open proposals, traceable votes, and a public ledger of every decision that shapes the commons."
        meta={
          <>
            <MetaItem label="Members" value="1,284 stewards" />
            <MetaItem label="Active proposals" value="7" />
            <MetaItem label="Quorum" value="42% of region" />
            <MetaItem label="Cycle" value="Lunar · waxing" />
          </>
        }
      />

      <div className="px-6 lg:px-10 py-8 space-y-10">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active proposals" value="7" delta={2.4} accent="gov" footnote="3 closing this week" />
          <StatCard label="Participation rate" value="78%" unit="of stewards" delta={5.1} accent="eco" />
          <StatCard label="Decisions ratified" value="142" unit="YTD" delta={11.0} accent="val" footnote="across 9 regions" />
          <StatCard label="Conflict alerts" value="3" delta={-12.0} accent="fin" footnote="under review" />
        </section>

        {/* Proposals */}
        <section>
          <SectionHeading
            index="01"
            title="Open proposals"
            description="Each proposal is bonded to measurement data — vote with evidence."
            aside={<Pill accent="gov">Council session · open</Pill>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {proposals.map((p) => {
              const total = p.approve + p.reject + p.abstain;
              return (
                <article key={p.id} className="panel p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">{p.id}</span>
                    <Pill accent={p.accent}>{p.region}</Pill>
                  </div>
                  <h3 className="font-display text-lg leading-snug text-balance">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.summary}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-muted-foreground">Voting · {total}% reported</span>
                      <span>closes in {p.timeLeft}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex">
                      <div className="bg-[var(--eco)]" style={{ width: `${p.approve}%` }} />
                      <div className="bg-destructive/70" style={{ width: `${p.reject}%` }} />
                      <div className="bg-[var(--border-strong)]" style={{ width: `${p.abstain}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>✓ {p.approve}%</span>
                      <span>✕ {p.reject}%</span>
                      <span>~ {p.abstain}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex-1 h-9 rounded-md bg-foreground text-background text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition">
                      <Check className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button className="flex-1 h-9 rounded-md border border-border bg-surface text-xs flex items-center justify-center gap-1.5 hover:bg-accent transition">
                      <X className="h-3.5 w-3.5" /> Reject
                    </button>
                    <button className="h-9 w-9 rounded-md border border-border bg-surface flex items-center justify-center hover:bg-accent transition">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Council analytics + ledger */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="panel p-5 xl:col-span-2 h-[340px] flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">Plate III</div>
                <h3 className="font-display text-lg mt-0.5">Council participation, trailing 7 mo.</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 1,284 stewards</span>
                <span className="inline-flex items-center gap-1.5"><VoteIcon className="h-3.5 w-3.5" /> 142 votes</span>
              </div>
            </div>
            <div className="flex-1 mt-4 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turnout}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="%" width={40} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="participation" fill="var(--gov)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="eyebrow">Open ledger</div>
                <h3 className="font-display text-lg mt-0.5">Recent decisions</h3>
              </div>
              <Pill accent="gov">public</Pill>
            </div>
            <ul className="divide-y divide-border">
              {ledger.map((l, i) => (
                <li key={i} className="px-5 py-3.5 flex items-start gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground w-12 shrink-0 mt-0.5">{l.date}</span>
                  <span className="text-sm text-foreground/90 leading-snug">{l.text}</span>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-border flex items-center gap-2 text-[11px] text-[var(--val)]">
              <AlertTriangle className="h-3.5 w-3.5" /> 1 entry awaiting community review
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
