"use client"

import * as React from "react"
import { Maximize2, Menu, Send, Sparkles, X } from "lucide-react"
import { GlassSurface } from "@/components/ui/glass"
import { cn } from "@/lib/utils"

type Prompt = {
  title: string
  icon?: React.ReactNode
}

const defaultPrompts: Prompt[] = [
  {
    title: "How do I move an application to the next stage?",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "What does ‘Deferral app pending LOA’ mean?",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "Summarize what’s blocking LOA issuance in this queue",
    icon: <Sparkles className="h-4 w-4" />,
  },
]

export interface PassageAssistantDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prompts?: Prompt[]
}

export function PassageAssistantDrawer({
  open,
  onOpenChange,
  prompts = defaultPrompts,
}: PassageAssistantDrawerProps) {
  const [value, setValue] = React.useState("")

  return (
    <>
      {/* Collapsed launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className={cn(
            "fixed bottom-5 right-5 z-50",
            "flex items-center gap-3",
            "glass-surface glass-interactive",
            "[--glass-bg:rgba(18,18,18,0.55)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-regular)]",
            "[border-radius:var(--glass-radius-capsule)]",
            "h-12 px-4"
          )}
          aria-label="Open Passage Assistant"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-sm font-bold shadow-giga-sm">
            P
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="text-[12px] font-semibold text-white tracking-tight">Ask Passage</span>
            <span className="text-[11px] text-white/55">AI Assistant</span>
          </span>
        </button>
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div className="absolute right-5 top-5 bottom-5 w-[420px] pointer-events-auto">
            <GlassSurface
              variant="elevated"
              blur="regular"
              radius="lg"
              tint="purple"
              className={cn(
                "h-full w-full",
                "flex flex-col",
                "[--glass-bg:rgba(18,18,18,0.52)] [--glass-border:rgba(255,255,255,0.12)]"
              )}
              role="dialog"
              aria-label="Passage Assistant"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
                    aria-label="Expand"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 flex flex-col px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-base font-bold shadow-giga-sm">
                    P
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-semibold tracking-tight text-white">
                        Ask Passage AI anything
                      </h3>
                      <span className="text-[11px] font-mono text-white/40">beta</span>
                    </div>
                    <p className="mt-1 text-[12px] leading-5 text-white/55">
                      Dig into queue status, definitions, and next steps. Keep answers fast and
                      actionable.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.10em] text-white/50">
                    Suggestions
                  </div>
                  <div className="mt-3 space-y-2">
                    {prompts.map((p) => (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => setValue(p.title)}
                        className={cn(
                          "w-full text-left",
                          "glass-surface glass-interactive",
                          "[--glass-bg:rgba(255,255,255,0.04)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)]",
                          "rounded-2xl px-3.5 py-3",
                          "flex items-start gap-2.5"
                        )}
                      >
                        <span className="mt-0.5 text-white/70">{p.icon}</span>
                        <span className="text-[12px] leading-5 text-white/80">{p.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <GlassSurface
                    variant="interactive"
                    blur="light"
                    radius="capsule"
                    className={cn(
                      "flex items-center gap-2 px-3 py-2",
                      "[--glass-bg:rgba(18,18,18,0.50)] [--glass-border:rgba(255,255,255,0.10)]"
                    )}
                  >
                    <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Ask Passage AI anything"
                      className={cn(
                        "flex-1 bg-transparent outline-none",
                        "text-[13px] text-white placeholder:text-white/35"
                      )}
                    />
                    <button
                      type="button"
                      className={cn(
                        "w-9 h-9 rounded-full",
                        "flex items-center justify-center",
                        "bg-white/[0.10] hover:bg-white/[0.14] text-white/80 hover:text-white",
                        "transition-colors"
                      )}
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </GlassSurface>
                  <p className="mt-2 text-[10px] leading-4 text-white/35">
                    Passage AI may be inaccurate and shouldn’t be considered compliance advice.
                  </p>
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>
      )}
    </>
  )
}

