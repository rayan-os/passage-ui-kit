"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { GlassButton, GlassPill } from "@/components/ui/glass"
import { cn } from "@/lib/utils"
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
            "mt-4 flex items-center justify-between gap-3",
            "rounded-glass-xl",
            "bg-glass-bg/70 backdrop-blur-glass-heavy",
            "border border-glass-border-subtle",
            "shadow-glass-sm"
          )}
        >
          <div className="flex items-center gap-3 px-4 py-3">
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
              <span
                className={cn(
                  "grid place-items-center size-8 rounded-glass-md",
                  "bg-gradient-to-br from-[#c5ccc3] to-[#a8b0a5]",
                  "text-[#0a0a0a] font-bold text-sm shadow-glass-sm shadow-[rgba(197,204,195,0.2)]"
                )}
                aria-hidden="true"
              >
                P
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {passageHomeCopy.brand}
              </span>
            </Link>

            {showModeActions ? (
              <GlassPill
                variant="default"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {effectiveMode === "university"
                  ? "Universities"
                  : "Students"}
              </GlassPill>
            ) : (
              <span className="hidden sm:block text-xs text-white/45">
                {passageHomeCopy.hero.kicker}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 py-3">
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

