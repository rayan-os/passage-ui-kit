"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassContainer, GlassSurface } from "@/components/ui/glass"
import { Composer } from "@/components/assistant/composer"
import { MessageList } from "@/components/assistant/message-list"
import { demoAgents, demoMessages } from "@/components/assistant/demo-state"
import type { Agent, ChatMessage } from "@/components/assistant/types"

function byId(agents: Agent[]) {
  return agents.reduce((acc, a) => {
    acc[a.id] = a
    return acc
  }, {} as Record<Agent["id"], Agent>)
}

function nowId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function nextAgentReply(agentId: Agent["id"], userText: string): string {
  // Demo-only. Wire to your agent router here.
  // e.g. POST /api/agent/run { agentId, threadId, message: userText }
  switch (agentId) {
    case "david":
      return "Got it. I’m verifying the document set now. If anything is missing (ID, proof of funds, translations), I’ll flag it with exact fixes."
    case "ella":
      return "Let’s do a quick assessment. What’s your highest completed education level and your target program?"
    case "jackie":
    default:
      return "Here’s the fastest path: confirm intake + program, verify your document set, then align LOA requirements with the school’s template. Tell me what you’ve uploaded so far."
  }
}

export function ChatShell() {
  const [agents, setAgents] = React.useState<Agent[]>(demoAgents)
  const [selectedAgentId, setSelectedAgentId] = React.useState<Agent["id"]>("jackie")
  const [messages, setMessages] = React.useState<ChatMessage[]>(demoMessages)
  const [value, setValue] = React.useState("")
  const [theme, setTheme] = React.useState<"dark" | "light">("dark")

  const agentsById = React.useMemo(() => byId(agents), [agents])

  // Page-local theme: toggles <html class="dark"> for this screen only.
  React.useEffect(() => {
    const root = document.documentElement
    const hadDark = root.classList.contains("dark")
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    return () => {
      if (hadDark) root.classList.add("dark")
      else root.classList.remove("dark")
    }
  }, [theme])

  const setAgent = React.useCallback((id: Agent["id"], patch: Partial<Agent>) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))
  }, [])

  const send = React.useCallback(() => {
    const text = value.trim()
    if (!text) return

    const routedTo = selectedAgentId
    const userMsg: ChatMessage = {
      id: nowId("u"),
      type: "user",
      text,
      routedTo,
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setValue("")

    // Demo status changes (no backend). Wire real agent lifecycle here.
    setAgent(routedTo, {
      status: "working",
      statusText: "processing request",
      lastAction: "received message",
    })

    window.setTimeout(() => {
      setAgent(routedTo, {
        status: "active",
        statusText: "replying",
        lastAction: "drafted response",
      })

      const agentMsg: ChatMessage = {
        id: nowId("a"),
        type: "agent",
        agentId: routedTo,
        text: nextAgentReply(routedTo, text),
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, agentMsg])

      window.setTimeout(() => {
        setAgent(routedTo, {
          status: "waiting",
          statusText: "ready",
          lastAction: "standing by",
        })
      }, 650)
    }, 900)
  }, [agentsById, selectedAgentId, setAgent, value])

  const onQuickAction = React.useCallback(
    (agentId: Agent["id"], prompt: string) => {
      setSelectedAgentId(agentId)
      setValue(prompt)
    },
    [setSelectedAgentId]
  )

  const showPrograms = messages.some((m) => m.type === "user")

  return (
    <GlassContainer density="subtle" className="min-h-screen">
      <main className={cn("min-h-screen relative", theme === "dark" ? "liquid-bg" : "liquid-bg-soft")}>
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="mx-auto w-full max-w-[820px] px-4 md:px-6 py-6 md:py-8">
          {/* Theme toggle only (no header brand) */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                theme === "dark" ? "bg-white/[0.10] text-white" : "text-white/55 hover:bg-white/[0.06]"
              )}
              aria-label="Dark theme"
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                theme === "light" ? "bg-white/[0.10] text-white" : "text-white/55 hover:bg-white/[0.06]"
              )}
              aria-label="Light theme"
            >
              <Sun className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3">
            <GlassSurface
              variant="elevated"
              blur="heavy"
              radius="md"
              className={cn(
                "h-[78vh]",
                "flex flex-col overflow-hidden",
                "[--glass-bg:rgba(18,18,18,0.44)] [--glass-border:rgba(255,255,255,0.12)]"
              )}
            >
              {/* Active agent (top-left) + inactive agents (top-right) */}
              <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-3">
                <GlassSurface
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
                  <span>{agentsById[selectedAgentId].name}</span>
                  <span className="text-white/45 font-medium">{agentsById[selectedAgentId].role}</span>
                </GlassSurface>

                <div className="flex items-center gap-2">
                  {(["jackie", "david", "ella"] as const)
                    .filter((id) => id !== selectedAgentId)
                    .map((id) => (
                      <button key={id} type="button" onClick={() => setSelectedAgentId(id)}>
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
                          <span>{agentsById[id].name}</span>
                        </GlassSurface>
                      </button>
                    ))}
                </div>
              </div>

              <MessageList messages={messages} agentsById={agentsById} showProgramSuggestions={showPrograms} />

              <Composer
                value={value}
                onChange={setValue}
                onSend={send}
                onQuickAction={onQuickAction}
              />
            </GlassSurface>
          </div>
        </div>
      </main>
    </GlassContainer>
  )
}

