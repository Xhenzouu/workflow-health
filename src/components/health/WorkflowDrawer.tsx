import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { STATUS_LABEL, type Workflow } from "./mockData";
import { StatusPill, statusText } from "./StatusPill";

export function WorkflowDrawer({ workflow, onClose }: { workflow: Workflow | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {workflow && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[450px] flex-col overflow-y-auto border-l border-border bg-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{workflow.id}</div>
                <h2 className="mt-2 font-serif text-3xl font-black leading-tight">{workflow.name}</h2>
                <div className="mt-3"><StatusPill status={workflow.status} /></div>
              </div>
              <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>

            <div className="p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Normalized Schema Data</h3>
              <pre className="mt-3 overflow-x-auto rounded-sm border border-border bg-background p-4 font-mono text-xs leading-relaxed">
{JSON.stringify({
  workflow_id: workflow.id,
  name: workflow.name,
  status: workflow.status,
  owner: workflow.owner,
  source: workflow.source,
  destination: workflow.destination,
  last_run_at: workflow.lastRun,
  run_count: workflow.runCount,
  error_rate: workflow.errorRate,
}, null, 2)}
              </pre>
            </div>

            <div className="p-6 pt-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Slack Digest Preview</h3>
              <div className="mt-3 rounded-sm border border-border bg-background p-4 font-mono text-xs leading-relaxed">
                <div className="font-bold">*System Health Digest*</div>
                <div className="my-2 border-t border-border" />
                <div>
                  <span className={`font-bold ${statusText[workflow.status]}`}>[{STATUS_LABEL[workflow.status]}]</span>{" "}
                  *{workflow.name}*
                </div>
                <div className="mt-1 text-muted-foreground">&gt; Last run: {workflow.lastRun}</div>
                <div className="text-muted-foreground">&gt; Runs: {workflow.runCount.toLocaleString()} · Error rate: {(workflow.errorRate * 100).toFixed(1)}%</div>
                <div className="text-muted-foreground">&gt; Route: {workflow.source} -&gt; {workflow.destination}</div>
                <div className="my-2 border-t border-border" />
                <div className="text-muted-foreground">context: owner @{workflow.owner}</div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
