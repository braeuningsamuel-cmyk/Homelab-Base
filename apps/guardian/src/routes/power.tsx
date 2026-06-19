import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/power")({
  head: () => ({
    meta: [
      { title: "Power · Atlas.Lab" },
      { name: "description", content: "Server neu starten oder herunterfahren." },
    ],
  }),
  component: () => (
    <Shell title="Power" description="Reboot & Shutdown">
      <PlaceholderView title="Reboot & Shutdown" hint="Server neu starten oder herunterfahren." />
    </Shell>
  ),
});
