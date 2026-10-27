import { STATUS_LABEL, type Status } from "./mockData";

const bg: Record<Status, string> = { healthy: "bg-healthy", attention: "bg-warning", stale: "bg-stale" };
export const statusText: Record<Status, string> = { healthy: "text-healthy", attention: "text-warning", stale: "text-stale" };

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`${bg[status]} inline-block rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-status-foreground`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
