import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Shell } from "@/components/homelab/Shell";
import { getContainers } from "@/lib/homelab/api";
import { formatUptime } from "@/lib/homelab/format";
import { Play, Square, RotateCw, Search } from "lucide-react";

export const Route = createFileRoute("/docker")({
  head: () => ({
    meta: [
      { title: "Container · Homelab Control" },
      { name: "description", content: "Docker-Container starten, stoppen und überwachen." },
    ],
  }),
  component: ContainersPage,
});

const statusStyles: Record<string, string> = {
  running: "text-success bg-success/10 ring-success/30",
  stopped: "text-muted-foreground bg-muted ring-border",
  restarting: "text-warning bg-warning/10 ring-warning/30",
  error: "text-destructive bg-destructive/10 ring-destructive/30",
};

function ContainersPage() {
  const { data: containers = [] } = useQuery({ queryKey: ["containers"], queryFn: getContainers });
  const [q, setQ] = useState("");

  const filtered = containers.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.image.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Shell
      title="Container"
      description={`${containers.filter(c => c.status === "running").length} von ${containers.length} laufen`}
      actions={
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Suchen…"
            className="h-9 w-56 rounded-md bg-input border border-border pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      }
    >
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Image</th>
              <th className="text-left px-4 py-3 font-medium">Host</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">CPU</th>
              <th className="text-right px-4 py-3 font-medium">RAM</th>
              <th className="text-left px-4 py-3 font-medium">Ports</th>
              <th className="text-right px-4 py-3 font-medium">Uptime</th>
              <th className="text-right px-4 py-3 font-medium">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-border hover:bg-accent/30 transition-colors">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.image}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.host}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${statusStyles[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{c.cpu}%</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{c.memMb} MB</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.ports.join(", ") || "—"}</td>
                <td className="px-4 py-3 text-right font-mono text-xs">{formatUptime(c.uptimeSeconds)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <ActionBtn label="Start" disabled={c.status === "running"}><Play className="h-3.5 w-3.5" /></ActionBtn>
                    <ActionBtn label="Restart"><RotateCw className="h-3.5 w-3.5" /></ActionBtn>
                    <ActionBtn label="Stop" disabled={c.status === "stopped"}><Square className="h-3.5 w-3.5" /></ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">Keine Container gefunden.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

function ActionBtn({ children, label, disabled }: { children: React.ReactNode; label: string; disabled?: boolean }) {
  return (
    <button
      title={label}
      disabled={disabled}
      className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}
