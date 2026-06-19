import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Pakete · Atlas.Lab" },
      { name: "description", content: "Verfügbare Updates für apt / dnf / pacman, Installation und Entfernen." },
    ],
  }),
  component: () => (
    <Shell title="Pakete" description="Paket-Manager">
      <PlaceholderView title="Paket-Manager" hint="Verfügbare Updates für apt / dnf / pacman, Installation und Entfernen." />
    </Shell>
  ),
});
