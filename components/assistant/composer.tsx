"use client"

import * as React from "react"
import { FileUp, Mic, Send, ShieldCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"
import type { Agent } from "@/components/assistant/types"

type QuickAction = {
  id: "upload" | "kyc" | "voice" | "summary"
  label: string
  icon: React.ReactNode
  agentId: Agent["id"]
  prompt: string
}

const actions: QuickAction[] = [
  {
    id: "upload",
    label: "Upload doc",
    icon: <FileUp className="h-4 w-4" />,
    agentId: "david",
    prompt: "I’m uploading my passport + proof of funds. Please validate and flag issues.",
  },
  {
    id: "kyc",
    label: "Start KYC",
    icon: <ShieldCheck className="h-4 w-4" />,
    agentId: "david",
    prompt: "Start KYC now and tell me what you need from me.",
  },
  {
    id: "voice",
    label: "Call agent",
    icon: <Mic className="h-4 w-4" />,
    agentId: "ella",
    prompt: "Start a live interview for assessment (voice).",
  },
  {
    id: "summary",
    label: "Summarize case",
    icon: <Sparkles className="h-4 w-4" />,
    agentId: "jackie",
    prompt: "Summarize this case and list the next 3 actions to get LOA issued.",
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
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onQuickAction: (agentId: Agent["id"], prompt: string) => void
}) {
  return (
    <div className="px-5 pb-5 pt-4 border-t border-white/[0.08]">
      <GlassSurface
        blur="light"
        radius="lg"
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
          placeholder="Message Passage…"
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

      <div className="mt-2 text-[10px] text-white/35">
        Press Enter to send · Click an agent to route the next message
      </div>
    </div>
  )
}

