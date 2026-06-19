import { createFileRoute } from "@tanstack/react-router";
import { Shell, PlaceholderView } from "@/components/homelab/Shell";

export const Route = createFileRoute("/homelab")({
  head: () => ({
    meta: [
      { title: "Homelab Dienste · Atlas.Lab" },
      { name: "description", content: "Schnellaktionen für deine Homelab-Stacks: WireGuard, Jellyfin, Arr-Stack, Ollama, Syncthing, Uptime Kuma, Nextcloud OCC." },
    ],
  }),
  component: () => (
    <Shell title="Homelab Dienste" description="WireGuard, Jellyfin, *arr & Co.">
      <PlaceholderView title="WireGuard, Jellyfin, *arr & Co." hint="Schnellaktionen für deine Homelab-Stacks: WireGuard, Jellyfin, Arr-Stack, Ollama, Syncthing, Uptime Kuma, Nextcloud OCC." />
    </Shell>
  ),
});
