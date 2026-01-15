"use client"

import * as React from "react"
import { ArrowLeft, Paperclip, Send, Sparkles, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"

type Msg = { id: string; role: "assistant" | "user"; text: string }

const initial: Msg[] = [
  {
    id: "a1",
    role: "assistant",
    text:
      "Hello! I’m Passage AI. I can help you navigate applications, definitions, and next steps.\n\nWhat can I help with today?",
  },
  { id: "u1", role: "user", text: "hi" },
  {
    id: "a2",
    role: "assistant",
    text:
      "Can you clarify what you mean by “add flights”?\n\nSource\nChanging your reservation date →",
  },
]

const programs = [
  { title: "Computer Programming", meta: ["Niagara College", "Diploma", "2 years"] },
  { title: "Computer Science (BSc)", meta: ["Vancouver Island University", "Undergraduate", "4 years"] },
  { title: "Bachelor of CS", meta: ["Seneca Polytechnic", "Undergraduate", "3 years"] },
  { title: "Data Science", meta: ["George Brown", "Postgraduate", "1 year"] },
]

function PassageMark() {
  return (
    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-sm font-bold shadow-[0_14px_40px_rgba(0,0,0,0.12)]">
      P
    </div>
  )
}

function Bubble({ role, text }: { role: Msg["role"]; text: string }) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <GlassSurface
        blur="light"
        radius="lg"
        className={cn(
          "max-w-[78%] px-4 py-3",
          "text-[13px] leading-5 whitespace-pre-line",
          isUser
            ? "bg-[rgba(59,130,246,0.18)] text-black/80 [--glass-bg:rgba(59,130,246,0.20)] [--glass-border:rgba(59,130,246,0.28)]"
            : "bg-[rgba(255,255,255,0.62)] text-black/75 [--glass-bg:rgba(255,255,255,0.64)] [--glass-border:rgba(0,0,0,0.06)]"
        )}
      >
        {text}
      </GlassSurface>
    </div>
  )
}

export default function AssistantPage() {
  const [messages, setMessages] = React.useState<Msg[]>(initial)
  const [value, setValue] = React.useState("")

  const send = () => {
    const v = value.trim()
    if (!v) return
    setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", text: v }])
    setValue("")
  }

  return (
    <main className="min-h-screen liquid-bg-soft flex items-center justify-center p-6">
      <GlassSurface
        blur="heavy"
        radius="lg"
        className={cn(
          "w-full max-w-[520px] h-[760px] overflow-hidden",
          "flex flex-col",
          "[--glass-bg:rgba(255,255,255,0.55)] [--glass-border:rgba(0,0,0,0.08)]",
          "shadow-[0_40px_120px_rgba(0,0,0,0.22)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.06]">
          <button
            type="button"
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-black/60 hover:text-black hover:bg-black/[0.05] transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <PassageMark />
          <div className="flex-1 leading-tight">
            <div className="flex items-center gap-2">
              <div className="text-[13px] font-semibold text-black/80">Passage AI</div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40">
                Bot
              </span>
            </div>
            <div className="text-[11px] text-black/45">Ask anything about applications</div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-black/[0.05] text-[11px] text-black/55">
            Ready
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-3">
          <Bubble role="assistant" text={messages[0].text} />
          <Bubble role="user" text={messages[1].text} />

          <div className="flex w-full justify-start">
            <GlassSurface
              blur="light"
              radius="lg"
              className="w-full px-4 py-3 [--glass-bg:rgba(255,255,255,0.64)] [--glass-border:rgba(0,0,0,0.06)]"
            >
              <div className="text-[13px] leading-5 text-black/75 whitespace-pre-line">
                Yes, you can change the date of your reservation for up to seven days in advance…
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-black/40">Source</div>
                <div className="mt-1 text-[12px] text-black/55 underline decoration-black/20 underline-offset-4">
                  Changing your reservation date →
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[11px] text-black/40">Answer</div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(59,130,246,0.16)] text-[11px] font-semibold text-black/70 hover:bg-[rgba(59,130,246,0.22)] transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  That helped
                </button>
              </div>
            </GlassSurface>
          </div>

          <Bubble role="assistant" text={"Great! Let me know if you have another question."} />
          {messages.slice(3).map((m) => (
            <Bubble key={m.id} role={m.role} text={m.text} />
          ))}

          {/* Recommendations strip (marketing-ready) */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-black/60">Recommended Programs</div>
              <div className="text-[11px] text-black/40">{programs.length} programs</div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {programs.map((p) => (
                <GlassSurface
                  key={p.title}
                  blur="light"
                  radius="lg"
                  className={cn(
                    "overflow-hidden",
                    "[--glass-bg:rgba(255,255,255,0.58)] [--glass-border:rgba(0,0,0,0.06)]"
                  )}
                >
                  <div className="h-20 bg-gradient-to-br from-black/[0.08] to-black/[0.02]" />
                  <div className="p-3">
                    <div className="text-[12px] font-semibold text-black/75 truncate">{p.title}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.meta.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] text-black/55"
                        >
                          <Sparkles className="h-3 w-3 text-black/35" />
                          {m}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-3 w-full h-9 rounded-full bg-black/[0.06] hover:bg-black/[0.08] text-[12px] font-medium text-black/65 transition-colors"
                    >
                      View details →
                    </button>
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="px-5 py-4 border-t border-black/[0.06]">
          <GlassSurface
            blur="light"
            radius="capsule"
            variant="interactive"
            className={cn(
              "flex items-center gap-2 px-3 py-2",
              "[--glass-bg:rgba(255,255,255,0.58)] [--glass-border:rgba(0,0,0,0.08)]"
            )}
          >
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-black/45 hover:text-black/70 hover:bg-black/[0.05] transition-colors"
              aria-label="Attach"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send()
              }}
              className="flex-1 bg-transparent outline-none text-[13px] text-black/75 placeholder:text-black/35"
              placeholder="Type a reply…"
            />
            <button
              type="button"
              onClick={send}
              className="w-10 h-10 rounded-full bg-black/[0.07] hover:bg-black/[0.10] text-black/60 hover:text-black/80 transition-colors flex items-center justify-center"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </GlassSurface>
          <div className="mt-2 text-center text-[10px] text-black/35">
            Press Enter to send
          </div>
        </div>
      </GlassSurface>
    </main>
  )
}

