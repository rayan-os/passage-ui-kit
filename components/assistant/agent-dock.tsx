"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { Agent } from "@/components/assistant/types"
import { AgentCard } from "@/components/assistant/agent-card"

export function AgentDock({
  agents,
  selectedAgentId,
  onSelectAgent,
}: {
  agents: Agent[]
  selectedAgentId: Agent["id"]
  onSelectAgent: (id: Agent["id"]) => void
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
          Agents on standby
        </div>
        <div className="text-[11px] text-white/40">{agents.length} online</div>
      </div>

      {/* Desktop: stacked cards. Mobile: horizontal scroll */}
      <div
        className={cn(
          "mt-3",
          "flex gap-3 overflow-x-auto pb-1",
          "md:flex-col md:overflow-visible md:pb-0"
        )}
      >
        {agents.map((a) => (
          <div key={a.id} className={cn("min-w-[260px] md:min-w-0")}>
            <AgentCard
              agent={a}
              selected={a.id === selectedAgentId}
              onSelect={() => onSelectAgent(a.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

