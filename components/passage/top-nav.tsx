"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { GlassButton, GlassPill } from "@/components/ui/glass"
import { cn } from "@/lib/utils"
import { DotField } from "@/components/passage/dot-field"
import {
  otherPassageMode,
  passageHomeCopy,
  type PassageMode,
} from "@/lib/passage-mode"
import { usePassageMode } from "@/components/passage/mode-provider"

export function PassageTopNav({
  className,
  forceMode,
}: {
  className?: string
  forceMode?: PassageMode
}) {
  const pathname = usePathname()
  const { mode, setMode, hydrated } = usePassageMode()

  const effectiveMode = forceMode ?? mode
  const showModeActions = hydrated && effectiveMode

  const switchTo = effectiveMode ? otherPassageMode(effectiveMode) : null
  const onSwitch = React.useCallback(() => {
    if (!switchTo) return
    setMode(switchTo)
  }, [setMode, switchTo])

  const secondary =
    effectiveMode ? passageHomeCopy.modes[effectiveMode].nav : null

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "px-4 sm:px-6",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={cn(
            "relative overflow-hidden",
            "mt-4 flex items-center justify-between gap-3",
            "rounded-glass-xl",
            "bg-glass-bg/70 backdrop-blur-glass-heavy",
            "border border-glass-border-subtle",
            "shadow-glass-sm"
          )}
        >
          {/* Live dot background */}
          <DotField className="absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.20))]" aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_20%_30%,rgba(59,130,246,0.10)_0%,transparent_60%),radial-gradient(60%_60%_at_70%_60%,rgba(197,204,195,0.08)_0%,transparent_60%)]" aria-hidden="true" />

          <div className="relative z-10 flex w-full items-center gap-3 px-4 py-3">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2",
                "text-white/90 hover:text-white transition-colors duration-glass",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-glass-sm"
              )}
              aria-label="Passage home"
              onClick={() => {
                if (pathname === "/") return
              }}
            >
              <span className="text-base font-semibold tracking-tight">
                Passage
                <span
                  className="inline-block align-middle ml-1 size-1.5 rounded-full bg-[#ff6b35]"
                  aria-hidden="true"
                />
              </span>
            </Link>

            {/* Center links */}
            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Link
                href={effectiveMode === "university" ? "/universities" : "/students"}
                className="text-xs font-medium tracking-[0.14em] uppercase text-white/75 hover:text-white transition-colors duration-glass"
              >
                Solutions
              </Link>
              <Link
                href={effectiveMode === "university" ? "/universities#workflow" : "/students#workflow"}
                className="text-xs font-medium tracking-[0.14em] uppercase text-white/75 hover:text-white transition-colors duration-glass"
              >
                Workflow
              </Link>
            </nav>

            <div className="ml-auto hidden sm:flex items-center gap-2">
              {showModeActions ? (
                <GlassPill variant="default" size="sm">
                  {effectiveMode === "university" ? "Universities" : "Students"}
                </GlassPill>
              ) : (
                <span className="text-xs text-white/50">
                  {passageHomeCopy.hero.kicker}
                </span>
              )}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 px-3 py-3">
            {showModeActions && (
              <>
                <button
                  type="button"
                  onClick={onSwitch}
                  className={cn(
                    "text-xs text-white/70 hover:text-white transition-colors duration-glass",
                    "px-2 py-1 rounded-glass-sm",
                    "hover:bg-white/[0.04]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                  )}
                >
                  Switch to {switchTo === "university" ? "university" : "student"}
                </button>

                {secondary && (
                  <Link href={secondary.secondaryHref}>
                    <GlassButton size="sm" variant="secondary">
                      {secondary.secondaryCta}
                    </GlassButton>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

