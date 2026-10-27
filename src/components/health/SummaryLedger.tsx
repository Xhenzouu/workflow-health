import type { Workflow } from "./mockData";

export function SummaryLedger({ items }: { items: Workflow[] }) {
  const stats = [
    { label: "Total Workflows", value: items.length, cls: "text-foreground" },
    { label: "Healthy", value: items.filter((w) => w.status === "healthy").length, cls: "text-healthy" },
    { label: "Needs Attention", value: items.filter((w) => w.status === "attention").length, cls: "text-warning" },
    { label: "Stale", value: items.filter((w) => w.status === "stale").length, cls: "text-stale" },
  ];
  return (
    <section className="pt-14 pb-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Status Report · Live</p>
      <h1 className="mt-3 font-serif text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">Workflow Health Overview</h1>
      <div className="mt-10 grid grid-cols-2 border-y-2 border-foreground md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`py-6 px-4 ${i > 0 ? "md:border-l border-border" : ""} ${i % 2 ? "border-l border-border" : ""}`}>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className={`mt-2 font-serif text-6xl font-black tabular-nums ${s.cls}`}>{String(s.value).padStart(2, "0")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
