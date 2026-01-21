"use client"

import Link from "next/link"
import * as React from "react"
import { GlassButton } from "@/components/ui/glass"
import { cn } from "@/lib/utils"
import { DotField } from "@/components/passage/dot-field"
import {
  passageHomeCopy,
  type PassageMode,
} from "@/lib/passage-mode"

export function PassageTopNav({
  className,
  forceMode,
  variant = "default",
}: {
  className?: string
  forceMode?: PassageMode
  variant?: "default" | "start"
}) {
  const effectiveMode = forceMode
  const demoHref = passageHomeCopy.modes.university.nav.secondaryHref

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
            // More premium glass, less slab
            "bg-glass-bg/45 backdrop-blur-glass",
            "border border-white/[0.08]",
            "shadow-glass-sm",
            // Reduce height ~25%
            variant === "start" ? "h-12" : "h-12"
          )}
        >
          {/* Live dot background */}
          <DotField className="absolute inset-0 opacity-[0.22]" />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.12))]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_20%_30%,rgba(59,130,246,0.08)_0%,transparent_60%),radial-gradient(60%_60%_at_75%_70%,rgba(197,204,195,0.06)_0%,transparent_60%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex w-full items-center gap-3 px-4">
            <Link
              href="/start"
              className={cn(
                "inline-flex items-center gap-2",
                "text-white/90 hover:text-white transition-colors duration-glass",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-glass-sm"
              )}
              aria-label="Passage home"
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
                href={effectiveMode ? passageHomeCopy.modes[effectiveMode].href : "/universities"}
                className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 hover:text-white transition-colors duration-glass"
              >
                Solutions
              </Link>
              <Link
                href={
                  effectiveMode
                    ? `${passageHomeCopy.modes[effectiveMode].href}#workflow`
                    : "/universities#workflow"
                }
                className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 hover:text-white transition-colors duration-glass"
              >
                Workflow
              </Link>
            </nav>

            <div className="ml-auto" />
          </div>

          <div className="relative z-10 flex items-center gap-2 px-2">
            <Link href={demoHref}>
              <GlassButton size="sm" variant="secondary" className="h-9 px-3">
                Request demo
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

