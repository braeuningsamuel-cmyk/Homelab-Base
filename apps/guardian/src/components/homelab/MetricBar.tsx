interface MetricBarProps {
  label: string;
  value: number; // 0-100
  hint?: string;
}

export function MetricBar({ label, value, hint }: MetricBarProps) {
  const color =
    value >= 85 ? "bg-destructive" : value >= 70 ? "bg-warning" : "bg-primary";
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums text-foreground">
          {value}%{hint ? <span className="text-muted-foreground"> · {hint}</span> : null}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
