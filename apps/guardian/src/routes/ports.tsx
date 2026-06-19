import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/ports")({
  head: () => ({
    meta: [
      { title: "Ports · Atlas.Lab" },
      { name: "description", content: "Erreichbarkeit von 21 typischen Homelab-Services prüfen." },
    ],
  }),
  component: () => (
    <Shell title="Ports" description="Port-Check">
      <PlaceholderView title="Port-Check" hint="Erreichbarkeit von 21 typischen Homelab-Services prüfen." />
    </Shell>
  ),
});
