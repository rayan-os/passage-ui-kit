"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"
import type { Agent } from "@/components/assistant/types"

type ChipTone = "sage" | "blue" | "purple"

function toneVars(t: ChipTone) {
  switch (t) {
    case "blue":
      return "[--glass-tint:rgba(59,130,246,0.12)] [--glass-border:rgba(59,130,246,0.22)]"
    case "purple":
      return "[--glass-tint:rgba(165,110,255,0.12)] [--glass-border:rgba(165,110,255,0.22)]"
    case "sage":
    default:
      return "[--glass-tint:rgba(197,204,195,0.12)] [--glass-border:rgba(197,204,195,0.22)]"
  }
}

const agentTone: Record<Agent["id"], ChipTone> = {
  jackie: "sage",
  david: "blue",
  ella: "purple",
}

export function AgentPrompts({
  agents,
  selectedAgentId,
  onSelectAgent,
}: {
  agents: Agent[]
  selectedAgentId: Agent["id"]
  onSelectAgent: (id: Agent["id"]) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
          Agents
        </div>
        <div className="text-[11px] text-white/40">Choose who replies next</div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {agents.map((a) => {
          const selected = a.id === selectedAgentId
          return (
            <button key={a.id} type="button" onClick={() => onSelectAgent(a.id)}>
              <GlassSurface
                variant="interactive"
                blur="light"
                radius="capsule"
                className={cn(
                  "h-9 px-3 inline-flex items-center gap-2",
                  "text-[12px] font-semibold",
                  "[--glass-bg:rgba(18,18,18,0.46)]",
                  toneVars(agentTone[a.id]),
                  selected
                    ? "text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_60px_rgba(0,0,0,0.55)]"
                    : "text-white/80"
                )}
              >
                <span className="w-6 h-6 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-[11px] font-bold text-white/80">
                  {a.initials}
                </span>
                <span>{a.name}</span>
                <span className="text-white/45 font-medium">{a.role}</span>
              </GlassSurface>
            </button>
          )
        })}
      </div>
    </div>
  )
}

