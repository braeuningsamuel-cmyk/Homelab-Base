import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/crontab")({
  head: () => ({
    meta: [
      { title: "Crontab · Atlas.Lab" },
      { name: "description", content: "Geplante Aufgaben einsehen, anlegen und bearbeiten." },
    ],
  }),
  component: () => (
    <Shell title="Crontab" description="Cron-Jobs">
      <PlaceholderView title="Cron-Jobs" hint="Geplante Aufgaben einsehen, anlegen und bearbeiten." />
    </Shell>
  ),
});
