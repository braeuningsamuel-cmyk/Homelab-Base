import type { Status } from "@/lib/homelab/types";

const map: Record<Status, { label: string; dot: string; cls: string }> = {
  online: { label: "Online", dot: "status-dot-online", cls: "text-success bg-success/10 ring-success/30" },
  warning: { label: "Warnung", dot: "status-dot-warning", cls: "text-warning bg-warning/10 ring-warning/30" },
  offline: { label: "Offline", dot: "status-dot-offline", cls: "text-destructive bg-destructive/10 ring-destructive/30" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${s.cls}`}>
      <span className={`status-dot ${s.dot}`} />
      {s.label}
    </span>
  );
}
