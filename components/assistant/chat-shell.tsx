"use client"

import * as React from "react"
import { ArrowLeft, CircleDot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassContainer, GlassPill, GlassSurface } from "@/components/ui/glass"
import { AgentDock } from "@/components/assistant/agent-dock"
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
    case "support":
      return "Understood. I’m escalating this for human review and will update you with next steps."
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

  const agentsById = React.useMemo(() => byId(agents), [agents])

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
      <main className="min-h-screen liquid-bg relative">
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="mx-auto w-full max-w-[1160px] px-5 md:px-8 py-8 md:py-10">
          {/* Top bar (lightweight) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-10 h-10 rounded-2xl glass-surface glass-interactive [--glass-bg:rgba(18,18,18,0.44)] [--glass-border:rgba(255,255,255,0.10)] flex items-center justify-center text-white/70 hover:text-white"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <div className="text-[14px] font-semibold tracking-tight text-white">
                  Passage Agents
                </div>
                <div className="text-[12px] text-white/45">
                  One thread · multiple agents on standby
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <GlassPill tone="neutral" size="md">
                <CircleDot className="h-4 w-4" />
                Live demo
              </GlassPill>
              <GlassPill tone="accent" size="md">
                <Sparkles className="h-4 w-4" />
                on‑demand
              </GlassPill>
            </div>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-5 md:gap-6">
            {/* Agent Dock */}
            <div className="md:sticky md:top-8 h-fit">
              <AgentDock
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={(id) => setSelectedAgentId(id)}
              />
            </div>

            {/* Chat */}
            <GlassSurface
              variant="elevated"
              blur="heavy"
              radius="lg"
              className={cn(
                "h-[78vh] md:h-[78vh]",
                "flex flex-col overflow-hidden",
                "[--glass-bg:rgba(18,18,18,0.48)] [--glass-border:rgba(255,255,255,0.12)]"
              )}
            >
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-semibold text-white tracking-tight">
                        Case thread
                      </div>
                      <div className="text-[11px] font-mono text-white/35">PA-10428</div>
                    </div>
                    <div className="mt-1 text-[12px] text-white/50">
                      Next message routes to{" "}
                      <span className="text-white/80 font-semibold">
                        {agentsById[selectedAgentId].name}
                      </span>{" "}
                      · {agentsById[selectedAgentId].role}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setTraceOpen((v) => !v)}
                      className={cn(
                        "glass-surface glass-interactive",
                        "[--glass-bg:rgba(18,18,18,0.44)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)]",
                        "h-9 px-3",
                        "[border-radius:var(--glass-radius-capsule)]",
                        "text-[12px] font-semibold text-white/75 hover:text-white"
                      )}
                      aria-pressed={traceOpen}
                    >
                      {traceOpen ? "Hide trace" : "Workflow trace"}
                    </button>
                  </div>
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
      </main>
    </GlassContainer>
  )
}

