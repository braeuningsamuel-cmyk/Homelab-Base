import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/logs")({
  head: () => ({
    meta: [
      { title: "Logs · Atlas.Lab" },
      { name: "description", content: "journalctl, syslog und Service-Logs in Echtzeit." },
    ],
  }),
  component: () => (
    <Shell title="Logs" description="System-Logs">
      <PlaceholderView title="System-Logs" hint="journalctl, syslog und Service-Logs in Echtzeit." />
    </Shell>
  ),
});
