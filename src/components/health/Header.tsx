import { Moon, Sun } from "lucide-react";

export function Header({ dark, onToggle, onDigest }: { dark: boolean; onToggle: () => void; onDigest: () => void }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="font-serif text-2xl font-black tracking-tight">System Health</div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="relative flex h-8 w-16 items-center rounded-full border border-border bg-card px-1 transition-colors"
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ${dark ? "translate-x-8" : ""}`}>
              {dark ? <Moon size={14} /> : <Sun size={14} />}
            </span>
          </button>
          <button
            onClick={onDigest}
            className="rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-85"
          >
            Generate Digest
          </button>
        </div>
      </div>
    </header>
  );
}
