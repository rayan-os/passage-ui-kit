"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassPill, GlassSurface } from "@/components/ui/glass"
import type { Agent } from "@/components/assistant/types"

export function AgentSidebar({
  agents,
  selectedAgentId,
  onSelectAgent,
  theme,
  onThemeChange,
}: {
  agents: Agent[]
  selectedAgentId: Agent["id"]
  onSelectAgent: (id: Agent["id"]) => void
  theme: "dark" | "light"
  onThemeChange: (t: "dark" | "light") => void
}) {
  return (
    <GlassSurface
      blur="regular"
      radius="lg"
      className={cn(
        "h-full w-full",
        "p-4",
        "[--glass-bg:rgba(18,18,18,0.50)] [--glass-border:rgba(255,255,255,0.10)]"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] font-bold">
            P
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-white tracking-tight">Passage</div>
            <div className="text-[11px] text-white/45">Voice agents</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onThemeChange("dark")}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
              theme === "dark" ? "bg-white/[0.10] text-white" : "text-white/55 hover:bg-white/[0.06]"
            )}
            aria-label="Dark theme"
          >
            <Moon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onThemeChange("light")}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
              theme === "light"
                ? "bg-white/[0.10] text-white"
                : "text-white/55 hover:bg-white/[0.06]"
            )}
            aria-label="Light theme"
          >
            <Sun className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
        Agents
      </div>

      <div className="mt-3 space-y-2">
        {agents.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onSelectAgent(a.id)}
            className={cn(
              "w-full text-left",
              "rounded-2xl px-3 py-2.5 transition-colors",
              a.id === selectedAgentId
                ? "bg-white/[0.10] border border-white/[0.12]"
                : "hover:bg-white/[0.06] border border-transparent"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-[13px] font-semibold text-white/90">{a.name}</div>
                  <div className="text-[11px] text-white/45 truncate">{a.role}</div>
                </div>
                <div className="mt-0.5 text-[11px] text-white/55 truncate">{a.statusText}</div>
              </div>
              <GlassPill
                tone={a.status === "active" ? "purple" : a.status === "working" ? "warning" : "neutral"}
                size="sm"
                className="shrink-0"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                {a.status}
              </GlassPill>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.08]">
        <div className="text-[11px] text-white/45">
          Tip: click an agent to route the next message.
        </div>
      </div>
    </GlassSurface>
  )
}

