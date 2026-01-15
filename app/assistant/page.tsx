"use client"

import * as React from "react"
import { ArrowLeft, Paperclip, Send, Smile, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"

type Msg = { id: string; role: "assistant" | "user"; text: string }

const thread: Msg[] = [
  { id: "u1", role: "user", text: "hi" },
  {
    id: "a1",
    role: "assistant",
    text:
      "Can you change the date of your reservation for up to seven days in advance? Go to “Your Reservations”, select the relevant one, choose “Change Details”, enter a new date, and click “Confirm”.",
  },
  { id: "u2", role: "user", text: "I do! I’d like to add flights." },
  { id: "a2", role: "assistant", text: "Can you clarify what you mean by “add flights”?" },
]

function PassageMark() {
  return (
    <div className="w-8 h-8 rounded-[14px] bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-[12px] font-bold shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
      P
    </div>
  )
}

function Bubble({ role, text }: { role: Msg["role"]; text: string }) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="shrink-0">
          <PassageMark />
        </div>
      )}
      <div className={cn("max-w-[78%]", isUser && "max-w-[72%]")}>
        <GlassSurface
          blur="light"
          radius="lg"
          className={cn(
            "px-4 py-3",
            "text-[13px] leading-5 text-black/75",
            "shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
            isUser
              ? "[--glass-bg:rgba(59,130,246,0.86)] [--glass-border:rgba(59,130,246,0.22)] text-white"
              : "[--glass-bg:rgba(255,255,255,0.72)] [--glass-border:rgba(0,0,0,0.06)]"
          )}
        >
          {text}
        </GlassSurface>
      </div>
    </div>
  )
}

export default function AssistantPage() {
  const [messages, setMessages] = React.useState<Msg[]>(thread)
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
          "w-full max-w-[420px] h-[780px] overflow-hidden",
          "flex flex-col",
          "[--glass-bg:rgba(255,255,255,0.82)] [--glass-border:rgba(0,0,0,0.10)]",
          "shadow-[0_50px_140px_rgba(0,0,0,0.20)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.06]">
          <button
            type="button"
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-black/55 hover:text-black hover:bg-black/[0.05] transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-black flex items-center justify-center text-white text-[12px] font-bold">
              P
            </div>
          </div>
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
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
          {/* Answer card (matches reference layout) */}
          <div className="flex w-full justify-start items-start gap-2">
            <div className="shrink-0 pt-1">
              <PassageMark />
            </div>
            <GlassSurface
              blur="light"
              radius="lg"
              className={cn(
                "w-full px-4 py-3",
                "[--glass-bg:rgba(255,255,255,0.76)] [--glass-border:rgba(0,0,0,0.06)]",
                "shadow-[0_18px_60px_rgba(0,0,0,0.10)]"
              )}
            >
              <div className="text-[13px] leading-5 text-black/70">
                Yes, you can change the date of your reservation for up to seven days in advance.
                To do this, go to “Your Reservations”, select the relevant one, then go to “Change
                Details” and enter a new date. Finally, click “Confirm”.
              </div>
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-black/40">Source</div>
                <div className="mt-1 text-[12px] text-black/45 underline decoration-black/20 underline-offset-4">
                  Changing your reservation date →
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-[11px] text-black/40">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/[0.06] text-[10px] font-semibold text-black/55">
                    AI
                  </span>
                  Answer
                </div>
                <span className="text-[11px] text-black/30">i</span>
              </div>
            </GlassSurface>
          </div>

          <div className="flex w-full justify-start items-center gap-2 pt-1">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-2xl bg-black/[0.06] flex items-center justify-center">
                <span className="text-black/35 text-[11px] font-semibold">P</span>
              </div>
            </div>
            <div className="text-[12px] text-black/45">Did that answer your question?</div>
          </div>

          <div className="flex w-full justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[rgba(59,130,246,0.86)] text-[12px] font-semibold text-white shadow-[0_14px_45px_rgba(59,130,246,0.28)] hover:bg-[rgba(59,130,246,0.92)] transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              That helped
            </button>
          </div>

          <div className="pt-1">
            <Bubble role="assistant" text="Great! Let me know if you have another question." />
          </div>

          {messages.map((m) => (
            <Bubble key={m.id} role={m.role} text={m.text} />
          ))}
        </div>

        {/* Composer */}
        <div className="px-4 py-3 border-t border-black/[0.06]">
          <GlassSurface
            blur="light"
            radius="capsule"
            variant="interactive"
            className={cn(
              "flex items-center gap-2 px-3 py-2",
              "[--glass-bg:rgba(255,255,255,0.72)] [--glass-border:rgba(0,0,0,0.08)]"
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
              className="w-9 h-9 rounded-full flex items-center justify-center text-black/45 hover:text-black/70 hover:bg-black/[0.05] transition-colors"
              aria-label="Emoji"
            >
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={send}
              className="w-10 h-10 rounded-full bg-black/[0.07] hover:bg-black/[0.10] text-black/60 hover:text-black/80 transition-colors flex items-center justify-center"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </GlassSurface>
          <div className="mt-2 text-center text-[10px] text-black/35">Press Enter to send</div>
        </div>
      </GlassSurface>
    </main>
  )
}

