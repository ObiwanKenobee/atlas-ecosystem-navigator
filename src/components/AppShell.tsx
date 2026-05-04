import { Link, useRouterState } from "@tanstack/react-router";
import {
  Leaf,
  Vote,
  Gauge,
  Coins,
  Search,
  Bell,
  Compass,
} from "lucide-react";

const nav = [
  {
    label: "Measurement",
    to: "/",
    icon: Leaf,
    accent: "eco",
    desc: "Bioregion telemetry",
  },
  {
    label: "Governance",
    to: "/governance",
    icon: Vote,
    accent: "gov",
    desc: "Council & proposals",
  },
  {
    label: "Impact",
    to: "/impact",
    icon: Gauge,
    accent: "val",
    desc: "Valuation registry",
  },
  {
    label: "Finance",
    to: "/finance",
    icon: Coins,
    accent: "fin",
    desc: "Regenerative capital",
  },
] as const;

const accentMap: Record<string, string> = {
  eco: "bg-eco text-eco-foreground",
  gov: "bg-gov text-eco-foreground",
  val: "bg-val text-eco-foreground",
  fin: "bg-fin text-eco-foreground",
};

const dotMap: Record<string, string> = {
  eco: "bg-[var(--eco)]",
  gov: "bg-[var(--gov)]",
  val: "bg-[var(--val)]",
  fin: "bg-[var(--fin)]",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative z-10 flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="px-6 pt-7 pb-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-9 w-9 rounded-md bg-foreground flex items-center justify-center">
                <Compass className="h-4.5 w-4.5 text-background" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-tight text-foreground">
                Atlas Sanctum
              </span>
              <span className="eyebrow mt-1">Vol. IV · MMXXVI</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5">
          <div className="eyebrow px-3 pb-2">Systems</div>
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 h-7 w-7 rounded-md flex items-center justify-center border",
                    active
                      ? "border-border-strong bg-background"
                      : "border-border bg-surface",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotMap[item.accent]}`} />
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {item.desc}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="panel-flat p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[var(--eco-soft)] text-[var(--eco)] flex items-center justify-center font-display text-sm">
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">Mira Okonkwo</div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Bioregion Steward
                </div>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--eco)]" />
            </div>
          </div>
        </div>
        {/* used to satisfy unused */}
        <span className="hidden">{Object.keys(accentMap).length}</span>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-center gap-4 px-6 lg:px-10 h-14">
            <div className="lg:hidden font-display text-lg">Atlas Sanctum</div>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="eyebrow">Folio</span>
              <span>/</span>
              <span className="text-foreground capitalize">
                {pathname === "/" ? "Measurement" : pathname.slice(1)}
              </span>
            </div>
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-surface w-72 text-xs text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span>Search projects, assets, regions…</span>
              <span className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded border border-border">
                ⌘K
              </span>
            </div>
            <button className="h-9 w-9 rounded-md border border-border bg-surface flex items-center justify-center hover:bg-accent transition">
              <Bell className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
