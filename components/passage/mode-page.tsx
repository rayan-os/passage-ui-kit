"use client"

import * as React from "react"
import { PassageTopNav } from "@/components/passage/top-nav"
import { cn } from "@/lib/utils"
import { passageHomeCopy, type PassageMode } from "@/lib/passage-mode"
import { usePassageMode } from "@/components/passage/mode-provider"
import { MorphingRing } from "@/components/passage/morphing-ring"
import { GlassButton } from "@/components/ui/glass"

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#070707] via-[#050505] to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(59,130,246,0.08)_0%,transparent_60%),radial-gradient(55%_55%_at_45%_70%,rgba(139,92,246,0.06)_0%,transparent_62%),radial-gradient(55%_55%_at_65%_65%,rgba(197,204,195,0.06)_0%,transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:14px_14px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-10 text-center">
        {/* Portal ring like the reference */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] md:w-[760px] md:h-[760px] opacity-90">
          <MorphingRing mode={mode} intensity={1.05} className="absolute inset-0" />
        </div>

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
            {copy.label}
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white [text-wrap:balance]">
            {copy.landing.headline}
          </h1>
          <p className="mx-auto mt-5 text-sm sm:text-base text-white/65 max-w-[66ch]">
            {copy.landing.subhead}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a href={copy.nav.secondaryHref}>
              <GlassButton size="lg" variant="default">
                {copy.landing.primaryCta}
              </GlassButton>
            </a>
          </div>
        </div>

        {/* Subtle “what’s next” strip below (keeps depth but not clutter) */}
        <div className="relative mt-14 w-full max-w-4xl rounded-glass-xl border border-white/[0.08] bg-black/25 backdrop-blur-glass-heavy p-6 text-left">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/55">
            Overview
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3 text-sm text-white/70">
            {copy.hover.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 rounded-full",
                    mode === "university"
                      ? "bg-[#c5ccc3]/70"
                      : "bg-blue-400/70"
                  )}
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

