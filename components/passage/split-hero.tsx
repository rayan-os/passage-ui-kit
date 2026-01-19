"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  otherPassageMode,
  passageHomeCopy,
  type PassageMode,
} from "@/lib/passage-mode"
import { usePassageMode } from "@/components/passage/mode-provider"

type HoverState = PassageMode | null

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

function FeatureBullets({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/70">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2">
          <span
            className="mt-1.5 size-1.5 rounded-full bg-[#c5ccc3]/70 shadow-[0_0_12px_rgba(197,204,195,0.25)]"
            aria-hidden="true"
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

function ModePanel({
  mode,
  hovered,
  activeMode,
  navigatingTo,
  setHovered,
  onChoose,
}: {
  mode: PassageMode
  hovered: HoverState
  activeMode: PassageMode | null
  navigatingTo: PassageMode | null
  setHovered: (mode: HoverState) => void
  onChoose: (mode: PassageMode) => void
}) {
  const copy = passageHomeCopy.modes[mode]
  const isHovered = hovered === mode
  const otherHovered = hovered && hovered !== mode
  const isActive = activeMode === mode
  const otherActive = activeMode && activeMode !== mode
  const isNavigating = navigatingTo === mode

  const expanded = isHovered || isActive || isNavigating
  const dimmed = Boolean(otherHovered || otherActive || (navigatingTo && !isNavigating))

  return (
    <Link
      href={copy.href}
      className={cn(
        "group relative overflow-hidden",
        "rounded-glass-xl border",
        "bg-glass-bg backdrop-blur-glass-heavy",
        "shadow-glass-md",
        "transition-[transform,opacity,filter,border-color,box-shadow] duration-[280ms] ease-glass",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        expanded && "shadow-glass-lg border-glass-border-strong",
        dimmed && "opacity-75",
        expanded && "scale-[1.01]"
      )}
      onMouseEnter={() => setHovered(mode)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(mode)}
      onBlur={() => setHovered(null)}
      onClick={(e) => {
        e.preventDefault()
        onChoose(mode)
      }}
      aria-label={copy.primaryCta}
    >
      {/* Panel tint + glow */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-gradient-to-br",
          mode === "university"
            ? "from-[rgba(197,204,195,0.12)] via-[rgba(255,255,255,0.02)] to-transparent"
            : "from-[rgba(59,130,246,0.10)] via-[rgba(255,255,255,0.02)] to-transparent",
          "transition-opacity duration-[280ms] ease-glass",
          expanded ? "opacity-100" : "opacity-70",
          dimmed && "opacity-40"
        )}
      />
      <div
        className={cn(
          "absolute -top-28 -right-28 h-64 w-64 rounded-full blur-[80px] pointer-events-none",
          mode === "university"
            ? "bg-[rgba(197,204,195,0.10)]"
            : "bg-[rgba(59,130,246,0.10)]",
          "transition-opacity duration-[280ms] ease-glass",
          expanded ? "opacity-100" : "opacity-60",
          dimmed && "opacity-30"
        )}
      />

      <div className="relative z-10 flex h-full flex-col p-7 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/55">
            {copy.audience}
          </span>
          {isActive && (
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#c5ccc3]">
              Active
            </span>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-[46ch]">
            {copy.body}
          </p>
        </div>

        {/* Hover reveal */}
        <div
          className={cn(
            "mt-6",
            "transition-[opacity,transform,max-height] duration-[280ms] ease-glass",
            expanded ? "opacity-100 translate-y-0 max-h-64" : "opacity-0 translate-y-1 max-h-0"
          )}
          aria-hidden={!expanded}
        >
          <p className="text-sm text-white/75">{copy.hover.secondary}</p>
          <FeatureBullets bullets={copy.hover.bullets} />
        </div>

        {/* Primary CTA (part of link) */}
        <div className="mt-auto pt-8">
          <div
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "h-11 px-4 rounded-glass-lg",
              "bg-white text-[#0a0a0a] font-semibold text-sm",
              "shadow-glass-sm",
              "transition-all duration-[220ms] ease-glass",
              "group-hover:bg-white/95 group-hover:shadow-glass-md",
              "group-active:scale-[0.98]",
              dimmed && "opacity-90"
            )}
          >
            {copy.primaryCta}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function PassageSplitHero() {
  const router = useRouter()
  const reducedMotion = usePrefersReducedMotion()
  const { mode, setMode, hydrated } = usePassageMode()

  const [hovered, setHovered] = React.useState<HoverState>(null)
  const [navigatingTo, setNavigatingTo] = React.useState<PassageMode | null>(
    null
  )

  const activeMode = hydrated ? mode : null

  const onChoose = React.useCallback(
    (next: PassageMode) => {
      setMode(next)
      setNavigatingTo(next)

      const href = passageHomeCopy.modes[next].href
      const delay = reducedMotion ? 0 : 240
      window.setTimeout(() => {
        router.push(href)
      }, delay)
    },
    [reducedMotion, router, setMode]
  )

  const switchTo = activeMode ? otherPassageMode(activeMode) : null

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#070707] to-[#050505]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[780px] h-[520px] rounded-full bg-[rgba(197,204,195,0.03)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] rounded-full bg-[rgba(59,130,246,0.02)] blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 sm:px-6 pt-28 pb-10">
        <div className="mb-8 sm:mb-10 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
            {passageHomeCopy.hero.kicker}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {passageHomeCopy.hero.headline}
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            {passageHomeCopy.hero.subhead}
          </p>

          {activeMode && (
            <p className="pt-2 text-xs text-white/55">
              You’re viewing the {activeMode === "university" ? "universities" : "students"} experience.{" "}
              <button
                type="button"
                className={cn(
                  "text-white/80 hover:text-white underline underline-offset-4",
                  "decoration-white/[0.25] hover:decoration-white/[0.45]",
                  "transition-colors duration-glass",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
                )}
                onClick={() => {
                  if (!switchTo) return
                  setMode(switchTo)
                }}
              >
                Switch to {switchTo === "university" ? "universities" : "students"}
              </button>
              .
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ModePanel
            mode="university"
            hovered={hovered}
            activeMode={activeMode}
            navigatingTo={navigatingTo}
            setHovered={setHovered}
            onChoose={onChoose}
          />
          <ModePanel
            mode="student"
            hovered={hovered}
            activeMode={activeMode}
            navigatingTo={navigatingTo}
            setHovered={setHovered}
            onChoose={onChoose}
          />
        </div>
      </div>
    </main>
  )
}

