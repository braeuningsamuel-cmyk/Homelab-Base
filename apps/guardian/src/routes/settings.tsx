import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Einstellungen · Atlas.Lab" },
      { name: "description", content: "Theme, Verbindungs-Profile und Agent-Konfiguration." },
    ],
  }),
  component: () => (
    <Shell title="Einstellungen" description="App & Verbindung">
      <PlaceholderView title="App & Verbindung" hint="Theme, Verbindungs-Profile und Agent-Konfiguration." />
    </Shell>
  ),
});
