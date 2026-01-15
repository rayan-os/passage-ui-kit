"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassSurface } from "@/components/ui/glass"

type Program = {
  title: string
  school: string
  level: string
  duration: string
  tuition: string
  accent: "sage" | "blue" | "purple"
}

const demoPrograms: Program[] = [
  {
    title: "Cloud Computing Technologies (PG)",
    school: "George Brown College",
    level: "Postgraduate",
    duration: "1 year",
    tuition: "Est. CA$ 16.8k / yr",
    accent: "blue",
  },
  {
    title: "Computer Programming (T189)",
    school: "Niagara College",
    level: "Diploma",
    duration: "2 years",
    tuition: "Est. CA$ 15.4k / yr",
    accent: "sage",
  },
  {
    title: "Applied A.I. Solutions (T431)",
    school: "Seneca Polytechnic",
    level: "Postgraduate",
    duration: "3 years",
    tuition: "Est. CA$ 18.2k / yr",
    accent: "purple",
  },
]

function accentBar(accent: Program["accent"]) {
  switch (accent) {
    case "blue":
      return "from-blue-400/60 via-cyan-300/40 to-transparent"
    case "purple":
      return "from-violet-400/60 via-blue-300/35 to-transparent"
    case "sage":
    default:
      return "from-[rgba(197,204,195,0.70)] via-emerald-300/30 to-transparent"
  }
}

function thumbClass(accent: Program["accent"]) {
  switch (accent) {
    case "blue":
      return "from-blue-400/25 via-cyan-300/15 to-white/[0.02]"
    case "purple":
      return "from-violet-400/25 via-blue-300/15 to-white/[0.02]"
    case "sage":
    default:
      return "from-[rgba(197,204,195,0.22)] via-emerald-300/12 to-white/[0.02]"
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
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * 280, behavior: "smooth" })
  }

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between px-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
          Suggested programs
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[11px] text-white/40">{demoPrograms.length} results</div>
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.10] text-white/70 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.10] text-white/70 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollerRef}
        className={cn(
          "mt-3 flex gap-3 overflow-x-auto no-scrollbar",
          "snap-x snap-mandatory",
          "pb-1"
        )}
      >
        {demoPrograms.map((p) => (
          <GlassSurface
            key={p.title}
            variant="interactive"
            blur="light"
            radius="md"
            className={cn(
              "snap-start shrink-0 w-[260px] p-3",
              "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)] [--glass-tint:rgba(255,255,255,0.03)]"
            )}
          >
            {/* Image placeholder (swap for real image later) */}
            <div className="relative h-28 rounded-xl border border-white/[0.10] overflow-hidden">
              <div className={cn("absolute inset-0 bg-gradient-to-br", thumbClass(p.accent))} />
              <div className="absolute inset-0 opacity-25 noise-overlay" />
              <div className={cn("absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r", accentBar(p.accent))} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/[0.30] via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 text-[10px] text-white/55">
                Image placeholder
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[12px] font-semibold text-white/90 leading-5 line-clamp-2">
                {p.title}
              </div>
              <div className="mt-1 text-[11px] text-white/55 truncate">{p.school}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Tag>{p.level}</Tag>
                <Tag>{p.duration}</Tag>
                <Tag>{p.tuition}</Tag>
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

