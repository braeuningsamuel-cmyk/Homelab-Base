import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/processes")({
  head: () => ({
    meta: [
      { title: "Prozesse · Atlas.Lab" },
      { name: "description", content: "Aktive Prozesse nach CPU- und RAM-Auslastung, mit Kill-Funktion." },
    ],
  }),
  component: () => (
    <Shell title="Prozesse" description="Top Prozesse">
      <PlaceholderView title="Top Prozesse" hint="Aktive Prozesse nach CPU- und RAM-Auslastung, mit Kill-Funktion." />
    </Shell>
  ),
});
