import type { Workflow } from "./mockData";
import { StatusPill } from "./StatusPill";

export function WorkflowList({ items, onSelect }: { items: Workflow[]; onSelect: (w: Workflow) => void }) {
  return (
    <section className="pb-24">
      <div className="flex items-baseline justify-between border-b border-foreground pb-3">
        <h2 className="font-serif text-2xl font-bold">The Ledger</h2>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{items.length} entries</span>
      </div>
      <ul>
        {items.map((w, i) => (
          <li key={w.id} className="border-b border-border">
            <button onClick={() => onSelect(w)} className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:bg-card">
              <div className="flex items-start gap-5">
                <span className="w-6 pt-1 font-serif text-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-lg font-bold group-hover:text-primary transition-colors">{w.name}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    Last Run {w.lastRun} <span className="mx-2">/</span> {w.runCount.toLocaleString()} Runs
                  </div>
                </div>
              </div>
              <StatusPill status={w.status} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
