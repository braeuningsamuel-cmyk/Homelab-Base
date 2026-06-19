import type { ReactNode } from "react";
import { SidebarNav } from "./SidebarNav";

interface ShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function Shell({ title, description, actions, children }: ShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <SidebarNav />
      <main className="flex-1 min-w-0">
        <header className="h-[60px] border-b border-border surface-glass sticky top-0 z-10">
          <div className="h-full px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-[15px] font-semibold tracking-tight truncate">{title}</h1>
              {description ? (
                <p className="text-[11px] text-muted-foreground truncate font-mono">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
          </div>
        </header>
        <div className="px-6 lg:px-8 py-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}

export function PlaceholderView({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
        <span className="h-2.5 w-2.5 rounded-full logo-gradient" />
      </div>
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1.5 max-w-md mx-auto text-sm text-muted-foreground">{hint}</p>
      <p className="mt-4 font-mono text-[11px] text-muted-foreground/70">
        Erfordert lokalen Atlas.Lab Agent
      </p>
    </div>
  );
}
