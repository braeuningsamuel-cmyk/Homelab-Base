import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Shell } from "@/components/homelab/Shell";
import { StatusBadge } from "@/components/homelab/StatusBadge";
import { getNetworkDevices } from "@/lib/homelab/api";
import { Router, Network as NetIcon, Wifi, Server, Cpu, Smartphone } from "lucide-react";
import type { NetworkDevice } from "@/lib/homelab/types";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "Netzwerk · Homelab Control" },
      { name: "description", content: "Geräte im Homelab-Netzwerk und deren Erreichbarkeit." },
    ],
  }),
  component: NetworkPage,
});

const typeIcon: Record<NetworkDevice["type"], typeof Router> = {
  Router, Switch: NetIcon, AP: Wifi, Server, IoT: Cpu, Client: Smartphone,
};

function NetworkPage() {
  const { data: devices = [] } = useQuery({ queryKey: ["network"], queryFn: getNetworkDevices });

  return (
    <Shell
      title="Netzwerk"
      description={`${devices.filter(d => d.status === "online").length} von ${devices.length} Geräten erreichbar`}
    >
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Gerät</th>
              <th className="text-left px-4 py-3 font-medium">Typ</th>
              <th className="text-left px-4 py-3 font-medium">IP</th>
              <th className="text-left px-4 py-3 font-medium">MAC</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Latenz</th>
              <th className="text-right px-4 py-3 font-medium">Zuletzt gesehen</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => {
              const Icon = typeIcon[d.type];
              return (
                <tr key={d.id} className="border-t border-border hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{d.ip}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.mac}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {d.latencyMs === null ? "—" : `${d.latencyMs.toFixed(1)} ms`}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground text-xs">{d.lastSeen}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
