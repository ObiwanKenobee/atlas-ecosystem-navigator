import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ImpactDashboard } from "@/dashboards/ImpactDashboard";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Atlas Sanctum" },
      {
        name: "description",
        content: "Asset registry and ecological value over time.",
      },
      { property: "og:title", content: "Impact — Atlas Sanctum" },
      {
        property: "og:description",
        content: "Carbon, biodiversity, water — quantified and verifiable.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <ImpactDashboard />
    </AppShell>
  ),
});
