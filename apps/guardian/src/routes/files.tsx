import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/files")({
  head: () => ({
    meta: [
      { title: "Dateien · Atlas.Lab" },
      { name: "description", content: "Durchsuche, bearbeite und verwalte Dateien auf dem verbundenen Server." },
    ],
  }),
  component: () => (
    <Shell title="Dateien" description="Datei-Browser">
      <PlaceholderView title="Datei-Browser" hint="Durchsuche, bearbeite und verwalte Dateien auf dem verbundenen Server." />
    </Shell>
  ),
});
