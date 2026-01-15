"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassPill, GlassSurface } from "@/components/ui/glass"
import type { Agent, AgentStatus } from "@/components/assistant/types"

const statusTone: Record<AgentStatus, React.ComponentProps<typeof GlassPill>["tone"]> = {
  active: "purple",
  waiting: "neutral",
  working: "warning",
  escalated: "warning",
}

function statusLabel(status: AgentStatus) {
  switch (status) {
    case "active":
      return "Active"
    case "working":
      return "Working"
    case "escalated":
      return "Escalated"
    case "waiting":
    default:
      return "Waiting"
  }
}

export function AgentCard({
  agent,
  selected,
  onSelect,
}: {
  agent: Agent
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left"
      aria-pressed={selected}
    >
      <GlassSurface
        variant="interactive"
        blur="light"
        radius="lg"
        className={cn(
          "w-full p-3",
          "[--glass-bg:rgba(18,18,18,0.52)] [--glass-border:rgba(255,255,255,0.10)]",
          selected &&
            "[--glass-border:rgba(197,204,195,0.28)] shadow-[0_0_0_1px_rgba(197,204,195,0.18),0_18px_70px_rgba(0,0,0,0.55)]"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center font-bold",
                "bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] text-[#0a0a0a]"
              )}
            >
              {agent.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-semibold text-white truncate">{agent.name}</div>
                <div className="text-[11px] text-white/45 truncate">{agent.role}</div>
              </div>
              <div className="mt-0.5 text-[11px] text-white/55 truncate">{agent.lastAction}</div>
            </div>
          </div>
          <GlassPill tone={statusTone[agent.status]} size="sm" className="shrink-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
            {statusLabel(agent.status)}
          </GlassPill>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-[12px] text-white/75 truncate">{agent.statusText}</div>
          <div className={cn("text-[10px] font-mono text-white/35", selected && "text-white/50")}>
            summon
          </div>
        </div>
      </GlassSurface>
    </button>
  )
}

