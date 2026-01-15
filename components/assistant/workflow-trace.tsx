"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"
import type { Agent, WorkflowStep } from "@/components/assistant/types"

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function WorkflowTrace({
  steps,
  agentsById,
  open,
  onOpenChange,
  compact = false,
}: {
  steps: WorkflowStep[]
  agentsById: Record<Agent["id"], Agent>
  open: boolean
  onOpenChange: (open: boolean) => void
  compact?: boolean
}) {
  return (
    <div className={cn(compact ? "px-5 pt-3" : "px-5 pt-4")}>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(
          compact ? "inline-flex items-center gap-2" : "w-full flex items-center justify-between",
          compact ? "text-[12px] font-semibold" : "text-[11px] font-semibold uppercase tracking-[0.12em]",
          compact ? "text-white/70 hover:text-white" : "text-white/55 hover:text-white/75",
          "transition-colors"
        )}
        aria-expanded={open}
      >
        <span>{compact ? "Trace" : "Workflow trace"}</span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {open && (
        <GlassSurface
          blur="light"
          radius={compact ? "md" : "lg"}
          className={cn(
            "mt-3 p-3",
            "[--glass-bg:rgba(18,18,18,0.44)] [--glass-border:rgba(255,255,255,0.10)]"
          )}
        >
          <div className="space-y-2">
            {steps.map((s) => (
              <div key={s.id} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[10px] font-bold text-white/70">
                  {agentsById[s.agentId].initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] text-white/80 leading-5">{s.label}</div>
                  <div className="mt-0.5 text-[10px] text-white/40">
                    {agentsById[s.agentId].name} · {formatTime(s.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassSurface>
      )}
    </div>
  )
}

