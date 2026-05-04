import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type Accent = "eco" | "gov" | "val" | "fin" | "neutral";

const accentText: Record<Accent, string> = {
  eco: "text-[var(--eco)]",
  gov: "text-[var(--gov)]",
  val: "text-[var(--val)]",
  fin: "text-[var(--fin)]",
  neutral: "text-foreground",
};
const accentBg: Record<Accent, string> = {
  eco: "bg-[var(--eco-soft)]",
  gov: "bg-[var(--gov-soft)]",
  val: "bg-[var(--val-soft)]",
  fin: "bg-[var(--fin-soft)]",
  neutral: "bg-muted",
};
const accentDot: Record<Accent, string> = {
  eco: "bg-[var(--eco)]",
  gov: "bg-[var(--gov)]",
  val: "bg-[var(--val)]",
  fin: "bg-[var(--fin)]",
  neutral: "bg-foreground",
};

export function PageHeader({
  eyebrow,
  title,
  lede,
  accent = "neutral",
  meta,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  accent?: Accent;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <div className="px-6 lg:px-10 py-8 lg:py-10 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]}`} />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {title}
            </h1>
            {lede && (
              <p className="mt-3 text-sm lg:text-base text-muted-foreground text-pretty leading-relaxed">
                {lede}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">{actions}</div>
        </div>
        {meta && (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-xs text-muted-foreground border-t border-border pt-5">
            {meta}
          </div>
        )}
      </div>
    </div>
  );
}

export function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="eyebrow">{label}</span>
      <span className="text-foreground font-mono text-[11px]">{value}</span>
    </div>
  );
}

export function StatCard({
  label,
  value,
  unit,
  delta,
  accent = "neutral",
  footnote,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  accent?: Accent;
  footnote?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="panel p-5 flex flex-col gap-4 relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-px ${accentDot[accent]}`} />
      <div className="flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <span
          className={`h-5 w-5 rounded-sm ${accentBg[accent]} ${accentText[accent]} flex items-center justify-center text-[10px] font-mono`}
        >
          ◆
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="num text-4xl">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      <div className="flex items-center justify-between text-xs">
        {typeof delta === "number" ? (
          <span
            className={`inline-flex items-center gap-1 font-mono ${
              positive ? "text-[var(--eco)]" : "text-destructive"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {positive ? "+" : ""}
            {delta}%
          </span>
        ) : (
          <span />
        )}
        {footnote && <span className="text-muted-foreground">{footnote}</span>}
      </div>
    </div>
  );
}

export function SectionHeading({
  index,
  title,
  description,
  aside,
}: {
  index: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-5">
      <div className="flex items-end gap-4">
        <span className="font-mono text-[11px] text-muted-foreground tracking-widest">
          §{index}
        </span>
        <div>
          <h2 className="font-display text-2xl tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {aside && <div className="flex items-center gap-2">{aside}</div>}
    </div>
  );
}

export function Pill({
  children,
  accent = "neutral",
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono ${accentBg[accent]} ${accentText[accent]}`}
    >
      <span className={`h-1 w-1 rounded-full ${accentDot[accent]}`} />
      {children}
    </span>
  );
}
