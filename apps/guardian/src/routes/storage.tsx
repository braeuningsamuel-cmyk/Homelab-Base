import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/storage")({
  head: () => ({
    meta: [
      { title: "Speicher · Atlas.Lab" },
      { name: "description", content: "Mount-Points, Festplattenbelegung und SMART-Informationen." },
    ],
  }),
  component: () => (
    <Shell title="Speicher" description="Disk Usage">
      <PlaceholderView title="Disk Usage" hint="Mount-Points, Festplattenbelegung und SMART-Informationen." />
    </Shell>
  ),
});
