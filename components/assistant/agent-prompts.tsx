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

  const rest = sorted.filter((a) => a.id !== selectedAgentId)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
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

