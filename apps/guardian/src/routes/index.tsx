import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Shell } from "@/components/homelab/Shell";
import { StatusBadge } from "@/components/homelab/StatusBadge";
import { MetricBar } from "@/components/homelab/MetricBar";
import { getContainers, getHosts, getNetworkDevices, getServices } from "@/lib/homelab/api";
import { formatBytes, formatUptime, pct } from "@/lib/homelab/format";
import { Server, Boxes, Globe, Network as NetIcon, AlertTriangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homelab Control · Übersicht" },
      { name: "description", content: "Live-Übersicht aller Hosts, Container und Services in deinem Homelab." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const hosts = useQuery({ queryKey: ["hosts"], queryFn: getHosts });
  const containers = useQuery({ queryKey: ["containers"], queryFn: getContainers });
  const services = useQuery({ queryKey: ["services"], queryFn: getServices });
  const network = useQuery({ queryKey: ["network"], queryFn: getNetworkDevices });

  const hostList = hosts.data ?? [];
  const containerList = containers.data ?? [];
  const serviceList = services.data ?? [];
  const netList = network.data ?? [];

  const stats = [
    { label: "Hosts", value: `${hostList.filter(h => h.status === "online").length}/${hostList.length}`, sub: "online", icon: Server, to: "/" },
    { label: "Container", value: `${containerList.filter(c => c.status === "running").length}/${containerList.length}`, sub: "laufen", icon: Boxes, to: "/docker" },
    { label: "Services", value: `${serviceList.filter(s => s.status === "online").length}/${serviceList.length}`, sub: "erreichbar", icon: Globe, to: "/services" },
    { label: "Geräte", value: `${netList.filter(n => n.status === "online").length}/${netList.length}`, sub: "im Netz", icon: NetIcon, to: "/network" },
  ];

  const alerts = [
    ...hostList.filter(h => h.status !== "online").map(h => ({ kind: h.status, msg: `Host ${h.name} ist ${h.status === "offline" ? "offline" : "ausgelastet"}` })),
    ...containerList.filter(c => c.status === "error" || c.status === "restarting").map(c => ({ kind: "warning" as const, msg: `Container ${c.name} ${c.status === "restarting" ? "startet neu" : "hat einen Fehler"}` })),
  ];

  return (
    <Shell title="Übersicht" description="Aktueller Zustand deines Homelabs">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              to={s.to}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-semibold tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mt-6 rounded-xl border border-warning/30 bg-warning/5 p-4">
          <div className="flex items-center gap-2 text-warning text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            {alerts.length} aktive Warnung{alerts.length === 1 ? "" : "en"}
          </div>
          <ul className="mt-2 space-y-1 text-sm text-foreground/80">
            {alerts.map((a, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={`status-dot ${a.kind === "offline" ? "status-dot-offline" : "status-dot-warning"}`} />
                {a.msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hosts grid */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Verbundene Systeme</h2>
        <Link to="/docker" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
          Container ansehen <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hostList.map((host) => (
          <div key={host.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold truncate">{host.name}</div>
                  <StatusBadge status={host.status} />
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                  {host.ip} · {host.os}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <MetricBar label="CPU" value={host.cpu.usage} hint={`${host.cpu.cores} Kerne`} />
              <MetricBar
                label="RAM"
                value={pct(host.memory.usedGb, host.memory.totalGb)}
                hint={`${host.memory.usedGb.toFixed(1)} / ${host.memory.totalGb} GB`}
              />
              <MetricBar
                label="Disk"
                value={pct(host.disk.usedGb, host.disk.totalGb)}
                hint={`${formatBytes(host.disk.usedGb)} / ${formatBytes(host.disk.totalGb)}`}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground">Uptime</div>
                <div className="font-mono">{formatUptime(host.uptimeSeconds)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Load</div>
                <div className="font-mono">{host.loadAvg[0].toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Net</div>
                <div className="font-mono">↓{host.network.rxMbps} ↑{host.network.txMbps}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
