import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "Benutzer · Atlas.Lab" },
      { name: "description", content: "Übersicht über alle System-Benutzer und Gruppen." },
    ],
  }),
  component: () => (
    <Shell title="Benutzer" description="System-Benutzer">
      <PlaceholderView title="System-Benutzer" hint="Übersicht über alle System-Benutzer und Gruppen." />
    </Shell>
  ),
});
