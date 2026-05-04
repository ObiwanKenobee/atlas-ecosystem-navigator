import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BioregionDashboard } from "@/dashboards/BioregionDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Measurement — Atlas Sanctum" },
      {
        name: "description",
        content:
          "Bioregion telemetry: hectares restored, carbon, biodiversity and water.",
      },
      { property: "og:title", content: "Measurement — Atlas Sanctum" },
      {
        property: "og:description",
        content: "Living instrumentation for regenerated ecosystems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <BioregionDashboard />
    </AppShell>
  );
}
