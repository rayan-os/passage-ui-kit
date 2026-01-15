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

function thumbStyle(tone: Program["tone"], seed: number): React.CSSProperties {
  const a = seed % 3
  const c1 =
    tone === "blue" ? "rgba(59,130,246,0.55)" : tone === "purple" ? "rgba(165,110,255,0.55)" : "rgba(197,204,195,0.55)"
  const c2 =
    tone === "blue" ? "rgba(34,211,238,0.40)" : tone === "purple" ? "rgba(59,130,246,0.40)" : "rgba(245,158,11,0.35)"
  const c3 = "rgba(255,255,255,0.10)"

  const x1 = a === 0 ? "18%" : a === 1 ? "72%" : "42%"
  const y1 = a === 0 ? "22%" : a === 1 ? "18%" : "78%"
  const x2 = a === 0 ? "78%" : a === 1 ? "24%" : "64%"
  const y2 = a === 0 ? "74%" : a === 1 ? "66%" : "22%"

  return {
    backgroundImage: [
      `radial-gradient(120px 90px at ${x1} ${y1}, ${c1}, rgba(0,0,0,0) 68%)`,
      `radial-gradient(140px 110px at ${x2} ${y2}, ${c2}, rgba(0,0,0,0) 70%)`,
      `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
    ].join(", "),
    backgroundBlendMode: "screen, screen, normal",
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

      <div className="mt-3 space-y-2">
        {demoPrograms.map((p, idx) => (
          <GlassSurface
            key={p.title}
            variant="interactive"
            blur="light"
            radius="md"
            className={cn("p-3", "[--glass-bg:rgba(18,18,18,0.46)]", toneVars(p.tone))}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl border border-white/[0.10] overflow-hidden relative flex-shrink-0"
                style={thumbStyle(p.tone, idx)}
              >
                <div className="absolute inset-0 opacity-30 noise-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.22] via-transparent to-transparent" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold text-white/90 leading-5 truncate">
                  {p.title}
                </div>
                <div className="mt-0.5 text-[11px] text-white/55 truncate">{p.school}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Tag>{p.level}</Tag>
                  <Tag>{p.duration}</Tag>
                </div>
              </div>

              <button
                type="button"
                className="h-9 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.10] text-[12px] font-semibold text-white/75 hover:text-white transition-colors flex-shrink-0"
              >
                View →
              </button>
            </div>
          </GlassSurface>
        ))}
      </div>
    </div>
  )
}

