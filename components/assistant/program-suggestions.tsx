"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"

type Program = {
  title: string
  school: string
  level: string
  duration: string
  tone: "sage" | "blue" | "purple"
}

const demoPrograms: Program[] = [
  {
    title: "Cloud Computing Technologies (PG)",
    school: "George Brown College",
    level: "Postgraduate",
    duration: "1 year",
    tone: "blue",
  },
  {
    title: "Computer Programming (T189)",
    school: "Niagara College",
    level: "Diploma",
    duration: "2 years",
    tone: "sage",
  },
  {
    title: "Applied A.I. Solutions (T431)",
    school: "Seneca Polytechnic",
    level: "Postgraduate",
    duration: "3 years",
    tone: "purple",
  },
]

function toneVars(t: Program["tone"]) {
  switch (t) {
    case "blue":
      return "[--glass-tint:rgba(59,130,246,0.10)] [--glass-border:rgba(59,130,246,0.18)]"
    case "purple":
      return "[--glass-tint:rgba(165,110,255,0.10)] [--glass-border:rgba(165,110,255,0.18)]"
    case "sage":
    default:
      return "[--glass-tint:rgba(197,204,195,0.10)] [--glass-border:rgba(197,204,195,0.18)]"
  }
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.10] px-2 py-0.5 text-[10px] text-white/70">
      {children}
    </span>
  )
}

export function ProgramSuggestions() {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between px-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
          Suggested programs
        </div>
        <div className="text-[11px] text-white/40">{demoPrograms.length} results</div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {demoPrograms.map((p) => (
          <GlassSurface
            key={p.title}
            variant="interactive"
            blur="light"
            radius="md"
            className={cn(
              "p-3",
              "[--glass-bg:rgba(18,18,18,0.46)]",
              toneVars(p.tone)
            )}
          >
            <div className="h-16 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08]" />
            <div className="mt-3">
              <div className="text-[12px] font-semibold text-white/90 leading-5 line-clamp-2">
                {p.title}
              </div>
              <div className="mt-1 text-[11px] text-white/55">{p.school}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Tag>{p.level}</Tag>
                <Tag>{p.duration}</Tag>
              </div>
              <button
                type="button"
                className="mt-3 w-full h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.10] text-[12px] font-semibold text-white/75 hover:text-white transition-colors"
              >
                View details →
              </button>
            </div>
          </GlassSurface>
        ))}
      </div>
    </div>
  )
}

