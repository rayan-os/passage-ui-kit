"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"
import type { Agent } from "@/components/assistant/types"

export function AgentPrompts({
  agents,
  selectedAgentId,
  onSelectAgent,
}: {
  agents: Agent[]
  selectedAgentId: Agent["id"]
  onSelectAgent: (id: Agent["id"]) => void
}) {
  const sorted = React.useMemo(() => {
    const priority: Agent["id"][] = ["jackie", "david", "ella"]
    const score = (id: Agent["id"]) =>
      id === selectedAgentId ? -10 : priority.indexOf(id) === -1 ? 999 : priority.indexOf(id)
    return [...agents].sort((a, b) => score(a.id) - score(b.id))
  }, [agents, selectedAgentId])

  const active = sorted.find((a) => a.id === selectedAgentId)
  const rest = sorted.filter((a) => a.id !== selectedAgentId)

  return (
    <div>
      {/* Active agent (top-left) */}
      {active && (
        <div className="flex items-center justify-start">
          <button type="button" onClick={() => onSelectAgent(active.id)}>
            <GlassSurface
              variant="interactive"
              blur="light"
              radius="capsule"
              className={cn(
                "h-9 px-3 inline-flex items-center gap-2",
                "text-[12px] font-semibold text-white",
                "[--glass-bg:rgba(18,18,18,0.50)] [--glass-border:rgba(255,255,255,0.14)] [--glass-tint:rgba(34,197,94,0.06)]",
                "shadow-[0_0_0_1px_rgba(34,197,94,0.14),0_18px_60px_rgba(0,0,0,0.55)]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>{active.name}</span>
              <span className="text-white/45 font-medium">{active.role}</span>
            </GlassSurface>
          </button>
        </div>
      )}

      {/* Other agents (below) */}
      <div className="mt-2 flex flex-wrap gap-2">
        {rest.map((a) => (
          <button key={a.id} type="button" onClick={() => onSelectAgent(a.id)}>
            <GlassSurface
              variant="interactive"
              blur="light"
              radius="capsule"
              className={cn(
                "h-9 px-3 inline-flex items-center gap-2",
                "text-[12px] font-semibold text-white/80",
                "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)] [--glass-tint:rgba(255,255,255,0.03)]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
              <span>{a.name}</span>
              <span className="text-white/45 font-medium">{a.role}</span>
            </GlassSurface>
          </button>
        ))}
      </div>
    </div>
  )
}

