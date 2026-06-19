/*
 * Sidebar navigation — adapted from Atlas.Lab Dashboard (MIT).
 * Source: https://github.com/braeuningsamuel-cmyk/atlaslab-dashboard
 */
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Boxes, Settings2, FolderTree, Network, HardDrive,
  Activity, Package, Users, Clock, Server, TerminalSquare, FileText,
  Plug, Power, Cog,
} from "lucide-react";

type Item = { to: string; label: string; icon: typeof LayoutDashboard };

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Übersicht",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Verwaltung",
    items: [
      { to: "/docker", label: "Docker", icon: Boxes },
      { to: "/services", label: "Services", icon: Settings2 },
      { to: "/files", label: "Dateien", icon: FolderTree },
      { to: "/network", label: "Netzwerk", icon: Network },
      { to: "/storage", label: "Speicher", icon: HardDrive },
    ],
  },
  {
    title: "System",
    items: [
      { to: "/processes", label: "Prozesse", icon: Activity },
      { to: "/packages", label: "Pakete", icon: Package },
      { to: "/users", label: "Benutzer", icon: Users },
      { to: "/crontab", label: "Crontab", icon: Clock },
    ],
  },
  {
    title: "Homelab",
    items: [{ to: "/homelab", label: "Dienste", icon: Server }],
  },
  {
    title: "Tools",
    items: [
      { to: "/terminal", label: "Terminal", icon: TerminalSquare },
      { to: "/logs", label: "Logs", icon: FileText },
      { to: "/ports", label: "Ports", icon: Plug },
      { to: "/power", label: "Power", icon: Power },
      { to: "/settings", label: "Einstellungen", icon: Cog },
    ],
  },
];

export function SidebarNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex md:w-[260px] shrink-0 flex-col surface-glass border-r border-sidebar-border sticky top-0 h-screen">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <h1 className="flex items-center gap-2.5 text-[17px] font-extrabold tracking-tight text-white">
          <span className="h-2.5 w-2.5 rounded-full logo-gradient shrink-0" />
          Atlas.Lab
        </h1>
        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] font-mono text-muted-foreground">
          Server Control v2.0
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="px-5 pt-[18px] pb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    "relative flex items-center gap-3 px-5 py-[9px] text-[13px] font-medium transition-colors",
                    active
                      ? "text-white bg-primary/10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-[3px] before:rounded-r before:bg-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2 px-5 py-3.5 border-t border-sidebar-border text-xs">
        <span className="status-dot status-dot-online" />
        <span className="text-muted-foreground">Agent verbunden</span>
      </div>
    </aside>
  );
}
