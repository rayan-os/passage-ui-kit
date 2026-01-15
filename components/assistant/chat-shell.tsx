"use client"

import * as React from "react"
import { CircleDot, Globe2, Mic, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassContainer, GlassPill, GlassSurface } from "@/components/ui/glass"
import { AgentSidebar } from "@/components/assistant/agent-sidebar"
import { Composer } from "@/components/assistant/composer"
import { MessageList } from "@/components/assistant/message-list"
import { WorkflowTrace } from "@/components/assistant/workflow-trace"
import { demoAgents, demoMessages, demoTrace } from "@/components/assistant/demo-state"
import type { Agent, ChatMessage, WorkflowStep } from "@/components/assistant/types"

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
      return "Here’s the fastest path: confirm intake + program, verify KYC status, then align LOA requirements with the school’s template. Tell me what you’ve uploaded so far."
  }
}

export function ChatShell() {
  const [agents, setAgents] = React.useState<Agent[]>(demoAgents)
  const [selectedAgentId, setSelectedAgentId] = React.useState<Agent["id"]>("jackie")
  const [messages, setMessages] = React.useState<ChatMessage[]>(demoMessages)
  const [trace, setTrace] = React.useState<WorkflowStep[]>(demoTrace)
  const [traceOpen, setTraceOpen] = React.useState(false)
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

    setTrace((prev) => [
      ...prev,
      {
        id: nowId("w"),
        createdAt: Date.now(),
        agentId: routedTo,
        label: `Routed message to ${agentsById[routedTo]?.name ?? routedTo}`,
      },
    ])

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

      setTrace((prev) => [
        ...prev,
        {
          id: nowId("w"),
          createdAt: Date.now(),
          agentId: routedTo,
          label: "Generated response",
        },
      ])

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

  return (
    <GlassContainer density="subtle" className="min-h-screen">
      <main className={cn("min-h-screen relative", theme === "dark" ? "liquid-bg" : "liquid-bg-soft")}>
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="mx-auto w-full max-w-[1160px] px-4 md:px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-6">
            {/* Sidebar (GPT-style) */}
            <div className="md:sticky md:top-6 h-fit">
              <AgentSidebar
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={setSelectedAgentId}
                theme={theme}
                onThemeChange={setTheme}
              />
            </div>

            {/* Main */}
            <div className="w-full">
              {/* Voice header (ElevenLabs-ish, lightweight) */}
              <GlassSurface
                blur="regular"
                radius="lg"
                className={cn(
                  "w-full mb-4",
                  "px-4 py-3",
                  "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.10)]"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-semibold text-white tracking-tight">
                        Call AI agent
                      </div>
                      <GlassPill tone="neutral" size="sm">
                        <CircleDot className="h-4 w-4" />
                        Ready
                      </GlassPill>
                    </div>
                    <div className="mt-1 text-[12px] text-white/45">
                      Selected:{" "}
                      <span className="text-white/80 font-semibold">
                        {agentsById[selectedAgentId].name}
                      </span>{" "}
                      · {agentsById[selectedAgentId].role}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={cn(
                        "glass-surface glass-interactive",
                        "[--glass-bg:rgba(255,255,255,0.06)] [--glass-border:rgba(255,255,255,0.12)] [--glass-blur:var(--glass-blur-light)]",
                        "[border-radius:var(--glass-radius-capsule)]",
                        "h-9 px-3",
                        "inline-flex items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-white"
                      )}
                      // Wire real voice call start here later.
                    >
                      <Mic className="h-4 w-4" />
                      Start
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "glass-surface",
                        "[--glass-bg:rgba(255,255,255,0.04)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)]",
                        "[border-radius:var(--glass-radius-capsule)]",
                        "h-9 px-3",
                        "inline-flex items-center gap-2 text-[12px] font-semibold text-white/70"
                      )}
                      aria-label="Language"
                    >
                      <Globe2 className="h-4 w-4" />
                      English (US)
                    </button>
                  </div>
                </div>
              </GlassSurface>

              {/* Chat (smaller / GPT-like centered column) */}
              <div className="mx-auto w-full max-w-[760px]">
                <GlassSurface
                  variant="elevated"
                  blur="heavy"
                  radius="lg"
                  className={cn(
                    "h-[72vh]",
                    "flex flex-col overflow-hidden",
                    "[--glass-bg:rgba(18,18,18,0.44)] [--glass-border:rgba(255,255,255,0.12)]"
                  )}
                >
                  <div className="px-5 py-4 border-b border-white/[0.08]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-[14px] font-semibold text-white tracking-tight">
                            Chat
                          </div>
                          <div className="text-[11px] font-mono text-white/35">DEMO</div>
                          <GlassPill tone="accent" size="sm">
                            <Sparkles className="h-4 w-4" />
                            Passage
                          </GlassPill>
                        </div>
                        <div className="mt-1 text-[12px] text-white/50">
                          Next message routes to{" "}
                          <span className="text-white/80 font-semibold">
                            {agentsById[selectedAgentId].name}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setTraceOpen((v) => !v)}
                        className={cn(
                          "glass-surface glass-interactive",
                          "[--glass-bg:rgba(18,18,18,0.40)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)]",
                          "h-9 px-3",
                          "[border-radius:var(--glass-radius-capsule)]",
                          "text-[12px] font-semibold text-white/75 hover:text-white"
                        )}
                        aria-pressed={traceOpen}
                      >
                        {traceOpen ? "Hide trace" : "Trace"}
                      </button>
                    </div>
                  </div>

                  <WorkflowTrace
                    steps={trace}
                    agentsById={agentsById}
                    open={traceOpen}
                    onOpenChange={setTraceOpen}
                  />

                  <MessageList messages={messages} agentsById={agentsById} />

                  <Composer
                    value={value}
                    onChange={setValue}
                    onSend={send}
                    onQuickAction={onQuickAction}
                  />
                </GlassSurface>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GlassContainer>
  )
}

