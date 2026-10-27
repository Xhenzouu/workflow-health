import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar, type View } from "@/components/health/Sidebar";
import { SummaryLedger } from "@/components/health/SummaryLedger";
import { WorkflowList } from "@/components/health/WorkflowList";
import { WorkflowDrawer } from "@/components/health/WorkflowDrawer";
import { workflows, type Workflow } from "@/components/health/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "System Health Monitor — Workflow Dashboard" },
      { name: "description", content: "Dashboard of B2B workflow health: healthy, needs attention and stale automations." },
      { property: "og:title", content: "System Health Monitor — Workflow Dashboard" },
      { property: "og:description", content: "Dashboard of B2B workflow health." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const titles: Record<View, string> = {
  overview: "Workflow Health Overview",
  workflows: "All Workflows",
  settings: "Settings",
};

function Index() {
  const [dark, setDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState<View>("overview");
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
      <Sidebar
        view={view}
        onNavigate={setView}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <main className={`transition-[padding] duration-300 ${collapsed ? "pl-[72px]" : "pl-[260px]"}`}>
        <div className="mx-auto max-w-6xl px-8 py-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-serif text-4xl font-bold tracking-tight">{titles[view]}</h1>
            {view !== "settings" && (
              <button
                onClick={digest}
                className="rounded-sm bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-85"
              >
                Generate Digest
              </button>
            )}
          </div>

          {view === "overview" && (
            <>
              <SummaryLedger items={workflows} />
              <div className="mt-10">
                <WorkflowList items={workflows} onSelect={setSelected} />
              </div>
            </>
          )}
          {view === "workflows" && <WorkflowList items={workflows} onSelect={setSelected} />}
          {view === "settings" && (
            <div className="rounded-md border border-border bg-card p-6 text-sm text-muted-foreground">
              Settings will live here: digest schedule, Slack channel and stale thresholds.
            </div>
          )}
        </div>
      </main>
      <WorkflowDrawer workflow={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
