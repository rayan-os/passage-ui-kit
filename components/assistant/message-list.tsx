"use client"

import * as React from "react"
import type { Agent, ChatMessage } from "@/components/assistant/types"
import { MessageBubble } from "@/components/assistant/message-bubble"

export function MessageList({
  messages,
  agentsById,
}: {
  messages: ChatMessage[]
  agentsById: Record<Agent["id"], Agent>
}) {
  const endRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })
  }, [messages.length])

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} agentsById={agentsById} />
      ))}
      <div ref={endRef} />
    </div>
  )
}

