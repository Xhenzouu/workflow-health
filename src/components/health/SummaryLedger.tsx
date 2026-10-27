import type { Workflow } from "./mockData";

export function SummaryLedger({ items }: { items: Workflow[] }) {
  const stats = [
    { label: "Total Workflows", value: items.length, tone: "text-primary" },
    { label: "Healthy", value: items.filter((w) => w.status === "healthy").length, tone: "text-healthy" },
    { label: "Needs Attention", value: items.filter((w) => w.status === "attention").length, tone: "text-warning" },
    { label: "Stale", value: items.filter((w) => w.status === "stale").length, tone: "text-stale" },
  ];
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-md border border-border bg-card p-5">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
          <div className={`mt-2 font-sans text-4xl font-bold tabular-nums ${s.tone}`}>{s.value}</div>
        </div>
      ))}
    </section>
  );
}
