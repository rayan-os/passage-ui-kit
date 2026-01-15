"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassPill, GlassSurface } from "@/components/ui/glass"
import type { Agent, ChatMessage } from "@/components/assistant/types"

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function MessageBubble({
  message,
  agentsById,
}: {
  message: ChatMessage
  agentsById: Record<Agent["id"], Agent>
}) {
  const isUser = message.type === "user"
  const agent = !isUser ? agentsById[message.agentId] : undefined

  return (
    <div className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[78%] space-y-1", isUser && "max-w-[72%]")}>
        {!isUser && agent && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-[10px] font-bold">
              {agent.initials}
            </div>
            <div className="text-[11px] text-white/60">
              <span className="font-semibold text-white/80">{agent.name}</span>{" "}
              <span className="text-white/45">·</span> {agent.role}
            </div>
          </div>
        )}

        <GlassSurface
          blur="light"
          radius="lg"
          className={cn(
            "px-4 py-3",
            "text-[13px] leading-5",
            "shadow-[0_16px_60px_rgba(0,0,0,0.35)]",
            isUser
              ? "[--glass-bg:rgba(197,204,195,0.16)] [--glass-border:rgba(197,204,195,0.22)] text-white/90"
              : "[--glass-bg:rgba(18,18,18,0.55)] [--glass-border:rgba(255,255,255,0.10)] text-white/85"
          )}
        >
          {message.text}
        </GlassSurface>

        <div className={cn("flex items-center justify-between", isUser ? "pl-0" : "pl-1")}>
          {message.type === "user" ? (
            <div className="text-[10px] text-white/35">
              Routed to{" "}
              <span className="text-white/55 font-semibold">
                {agentsById[message.routedTo].name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <GlassPill tone="neutral" size="sm" className="h-5 px-1.5 text-[9px]">
                agent
              </GlassPill>
              <div className="text-[10px] text-white/35">{formatTime(message.createdAt)}</div>
            </div>
          )}
          {message.type === "user" && (
            <div className="text-[10px] text-white/35">{formatTime(message.createdAt)}</div>
          )}
        </div>
      </div>
    </div>
  )
}

