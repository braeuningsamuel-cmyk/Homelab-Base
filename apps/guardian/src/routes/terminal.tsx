import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [
      { title: "Terminal · Atlas.Lab" },
      { name: "description", content: "Voller PTY-Terminal mit Live-Output und Command-History." },
    ],
  }),
  component: () => (
    <Shell title="Terminal" description="SSH Terminal">
      <PlaceholderView title="SSH Terminal" hint="Voller PTY-Terminal mit Live-Output und Command-History." />
    </Shell>
  ),
});
