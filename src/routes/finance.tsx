import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FinanceDashboard } from "@/dashboards/FinanceDashboard";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance — Atlas Sanctum" },
      {
        name: "description",
        content: "Regenerative capital flows, treasury and portfolio.",
      },
      { property: "og:title", content: "Finance — Atlas Sanctum" },
      {
        property: "og:description",
        content: "Capital that listens to soil, water and people.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <FinanceDashboard />
    </AppShell>
  ),
});
