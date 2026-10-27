import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/health/Header";
import { SummaryLedger } from "@/components/health/SummaryLedger";
import { WorkflowList } from "@/components/health/WorkflowList";
import { WorkflowDrawer } from "@/components/health/WorkflowDrawer";
import { workflows, type Workflow } from "@/components/health/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "System Health Monitor — Workflow Ledger" },
      { name: "description", content: "Editorial ledger of B2B workflow health: healthy, needs attention and stale automations." },
      { property: "og:title", content: "System Health Monitor — Workflow Ledger" },
      { property: "og:description", content: "Editorial ledger of B2B workflow health." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState<Workflow | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const digest = () => {
    const attention = workflows.filter((w) => w.status !== "healthy");
    setSelected(attention[0] ?? workflows[0] ?? null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header dark={dark} onToggle={() => setDark((d) => !d)} onDigest={digest} />
      <main className="mx-auto max-w-5xl px-6">
        <SummaryLedger items={workflows} />
        <WorkflowList items={workflows} onSelect={setSelected} />
      </main>
      <WorkflowDrawer workflow={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
