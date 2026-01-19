"use client"

import * as React from "react"
import { PassageTopNav } from "@/components/passage/top-nav"
import { cn } from "@/lib/utils"
import { passageHomeCopy, type PassageMode } from "@/lib/passage-mode"
import { usePassageMode } from "@/components/passage/mode-provider"

export function PassageModePage({ mode }: { mode: PassageMode }) {
  const { setMode } = usePassageMode()

  React.useEffect(() => {
    setMode(mode)
  }, [mode, setMode])

  const copy = passageHomeCopy.modes[mode]

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden">
      <PassageTopNav forceMode={mode} />

      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#070707] to-[#050505]" />
      <div
        className={cn(
          "absolute top-1/4 left-1/2 -translate-x-1/2 w-[820px] h-[520px] rounded-full blur-[150px] pointer-events-none",
          mode === "university"
            ? "bg-[rgba(197,204,195,0.03)]"
            : "bg-[rgba(59,130,246,0.025)]"
        )}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 sm:px-6 pt-28 pb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
          {copy.audience}
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          {copy.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/65 max-w-[60ch]">
          {copy.body}
        </p>

        <div className="mt-10 rounded-glass-xl border border-glass-border-subtle bg-glass-bg/60 backdrop-blur-glass-heavy shadow-glass-sm p-6">
          <p className="text-sm text-white/70">
            Placeholder page — next we’ll build the {mode === "university" ? "universities" : "students"} experience here.
          </p>
          <p className="mt-3 text-sm text-white/65">
            {copy.hover.secondary}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3 text-sm text-white/70">
            {copy.hover.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className="mt-1.5 size-1.5 rounded-full bg-[#c5ccc3]/70"
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

