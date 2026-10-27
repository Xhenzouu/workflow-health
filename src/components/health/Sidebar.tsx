import { Activity, ChevronsLeft, ChevronsRight, LayoutDashboard, ListChecks, Moon, Settings, Sun } from "lucide-react";

export type View = "overview" | "workflows" | "settings";

const nav = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "workflows" as const, label: "Workflows", icon: ListChecks },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

interface Props {
  view: View;
  onNavigate: (v: View) => void;
  dark: boolean;
  onToggleTheme: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ view, onNavigate, dark, onToggleTheme, collapsed, onToggleCollapse }: Props) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-card transition-[width] duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"}`}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <Activity size={20} className="shrink-0 text-primary" />
          {!collapsed && <span className="whitespace-nowrap font-serif text-xl font-bold">System Health</span>}
        </div>
      </div>

      <nav className="flex-1 py-4">
        {nav.map((n) => {
          const active = view === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              title={n.label}
              className={`flex w-full items-center gap-3 border-l-4 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                active ? "border-primary bg-background text-foreground" : "border-transparent text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <n.icon size={18} className="shrink-0" />
              {!collapsed && <span>{n.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-border p-4">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{dark ? "Dark" : "Light"} Mode</span>}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-7 w-14 shrink-0 items-center rounded-full border border-border bg-background px-0.5"
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ${dark ? "translate-x-7" : ""}`}>
              {dark ? <Moon size={13} /> : <Sun size={13} />}
            </span>
          </button>
        </div>
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex w-full items-center justify-center gap-2 rounded-sm py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:bg-background hover:text-foreground"
        >
          {collapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
