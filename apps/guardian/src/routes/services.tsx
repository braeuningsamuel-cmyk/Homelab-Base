import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Shell } from "@/components/homelab/Shell";
import { StatusBadge } from "@/components/homelab/StatusBadge";
import { getServices } from "@/lib/homelab/api";
import { ExternalLink } from "lucide-react";
import type { Service } from "@/lib/homelab/types";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Homelab Control" },
      { name: "description", content: "Schnellzugriff auf alle Self-hosted-Services im Homelab." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: getServices });

  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <Shell title="Services" description="Self-hosted Anwendungen im Überblick">
      <div className="space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((svc) => (
                <a
                  key={svc.id}
                  href={svc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{svc.icon}</div>
                    <StatusBadge status={svc.status} />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="font-semibold">{svc.name}</div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{svc.description}</div>
                  <div className="mt-3 font-mono text-[11px] text-muted-foreground truncate">{svc.url}</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}
