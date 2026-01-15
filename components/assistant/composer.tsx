"use client"

import * as React from "react"
import { DollarSign, GraduationCap, MapPin, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"
import type { Agent } from "@/components/assistant/types"
import { AgentPrompts } from "@/components/assistant/agent-prompts"

type QuickAction = {
  id: "programs" | "province" | "tuition"
  label: string
  icon: React.ReactNode
  agentId: Agent["id"]
  prompt: string
}

const actions: QuickAction[] = [
  {
    id: "programs",
    label: "Find programs",
    icon: <GraduationCap className="h-4 w-4" />,
    agentId: "jackie",
    prompt: "What programs can I study for May 2026? Please suggest options that fit my profile.",
  },
  {
    id: "province",
    label: "Pick a province",
    icon: <MapPin className="h-4 w-4" />,
    agentId: "jackie",
    prompt: "Which province should I study in and why? Compare costs, job market, and timelines.",
  },
  {
    id: "tuition",
    label: "Tuition & payment",
    icon: <DollarSign className="h-4 w-4" />,
    agentId: "jackie",
    prompt: "Help me understand tuition, payment options, and what fees to expect end-to-end.",
  },
]

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "glass-surface glass-interactive",
        "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)]",
        "[border-radius:var(--glass-radius-capsule)]",
        "h-9 px-3",
        "inline-flex items-center gap-2",
        "text-[12px] font-semibold text-white/80 hover:text-white"
      )}
    >
      <span className="text-white/60">{icon}</span>
      {label}
    </button>
  )
}

export function Composer({
  value,
  onChange,
  onSend,
  onQuickAction,
  agents,
  selectedAgentId,
  onSelectAgent,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onQuickAction: (agentId: Agent["id"], prompt: string) => void
  agents: Agent[]
  selectedAgentId: Agent["id"]
  onSelectAgent: (id: Agent["id"]) => void
}) {
  return (
    <div className="px-5 pb-5 pt-4 border-t border-white/[0.08]">
      <GlassSurface
        blur="light"
        radius="md"
        variant="interactive"
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          "[--glass-bg:rgba(18,18,18,0.55)] [--glass-border:rgba(255,255,255,0.12)]"
        )}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend()
          }}
          placeholder="Message…"
          className="flex-1 bg-transparent outline-none text-[13px] text-white/90 placeholder:text-white/35"
        />
        <button
          type="button"
          onClick={onSend}
          className={cn(
            "w-10 h-10 rounded-full",
            "flex items-center justify-center",
            "bg-white/[0.08] hover:bg-white/[0.12] text-white/70 hover:text-white",
            "transition-colors"
          )}
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </GlassSurface>

      <div className="mt-3">
        <AgentPrompts
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={onSelectAgent}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((a) => (
          <ActionButton
            key={a.id}
            label={a.label}
            icon={a.icon}
            onClick={() => onQuickAction(a.agentId, a.prompt)}
          />
        ))}
      </div>
    </div>
  )
}

