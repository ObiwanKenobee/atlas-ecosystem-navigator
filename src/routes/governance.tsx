import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GovernanceDashboard } from "@/dashboards/GovernanceDashboard";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Governance — Atlas Sanctum" },
      {
        name: "description",
        content: "Council proposals, votes and transparency ledger.",
      },
      { property: "og:title", content: "Governance — Atlas Sanctum" },
      {
        property: "og:description",
        content: "Where regenerative communities decide together.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <GovernanceDashboard />
    </AppShell>
  ),
});
