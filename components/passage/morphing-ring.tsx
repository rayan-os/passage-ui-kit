"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { type PassageMode } from "@/lib/passage-mode"

type Mode = PassageMode | "neutral"

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function getPalette(mode: Mode) {
  if (mode === "university") {
    return {
      a: "rgba(59,130,246,1)", // blue
      b: "rgba(139,92,246,1)", // purple
      c: "rgba(197,204,195,0.95)", // sage
    }
  }
  if (mode === "student") {
    return {
      a: "rgba(59,130,246,1)", // blue
      b: "rgba(244,63,94,1)", // rose
      c: "rgba(139,92,246,0.95)", // purple
    }
  }
  return {
    a: "rgba(59,130,246,0.92)",
    b: "rgba(139,92,246,0.92)",
    c: "rgba(197,204,195,0.78)",
  }
}

function buildBlobPath({
  points,
  cx,
  cy,
  baseR,
  amp1,
  amp2,
  phase,
}: {
  points: number
  cx: number
  cy: number
  baseR: number
  amp1: number
  amp2: number
  phase: number
}) {
  const coords: Array<{ x: number; y: number }> = []
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 2
    // Two layered sine “noise” fields to get the organic OpenAI-like ring.
    const n =
      Math.sin(t * 1.0 + phase * 0.9) * amp1 +
      Math.sin(t * 2.0 - phase * 0.65) * (amp1 * 0.55) +
      Math.sin(t * 3.0 + phase * 0.35) * (amp2 * 0.70) +
      Math.sin(t * 5.0 - phase * 0.25) * (amp2 * 0.45)
    const r = baseR + n
    coords.push({ x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r })
  }

  // Catmull-Rom → Bezier for smooth closed curve
  const CR = (p0: any, p1: any, p2: any, p3: any) => {
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    return { c1x, c1y, c2x, c2y }
  }

  let d = ""
  for (let i = 0; i < points; i++) {
    const p0 = coords[(i - 1 + points) % points]
    const p1 = coords[i]
    const p2 = coords[(i + 1) % points]
    const p3 = coords[(i + 2) % points]
    const { c1x, c1y, c2x, c2y } = CR(p0, p1, p2, p3)

    if (i === 0) d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(
      2
    )} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `
  }
  d += "Z"
  return d
}

export function MorphingRing({
  mode,
  className,
  intensity = 1,
  active = false,
  entered = true,
}: {
  mode: Mode
  className?: string
  intensity?: number
  /** true while “choosing” → ring pulls you in */
  active?: boolean
  /** used to fade ring in after entrance */
  entered?: boolean
}) {
  const pathRef = React.useRef<SVGPathElement | null>(null)
  const blurRef = React.useRef<SVGPathElement | null>(null)
  const frameRef = React.useRef<number | null>(null)
  const lastRef = React.useRef<number>(0)

  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  const palette = React.useMemo(() => getPalette(mode), [mode])

  // Smoothly transition “shape personality” on mode change
  const targetRef = React.useRef({ amp1: 14, amp2: 9 })
  React.useEffect(() => {
    const next =
      mode === "university"
        ? { amp1: 12, amp2: 7 }
        : mode === "student"
          ? { amp1: 15, amp2: 10 }
          : { amp1: 10, amp2: 7 }
    targetRef.current = next
  }, [mode])

  const stateRef = React.useRef({
    amp1: 10,
    amp2: 7,
    phase: 0,
    modeBlend: 1,
    zoom: 1,
  })

  React.useEffect(() => {
    if (reduced) return

    const points = 44
    const baseR = 176
    const cx = 210
    const cy = 210

    function tick(t: number) {
      const last = lastRef.current || t
      const dt = Math.min(40, t - last)
      lastRef.current = t

      const s = stateRef.current
      const target = targetRef.current

      // drift phase
      s.phase += (dt / 1000) * 0.85

      // ease shape toward target
      s.amp1 = lerp(s.amp1, target.amp1, 0.04)
      s.amp2 = lerp(s.amp2, target.amp2, 0.04)

      // click “pull in”
      const desiredZoom = active ? 1.08 : 1
      s.zoom = lerp(s.zoom, desiredZoom, active ? 0.06 : 0.05)

      const d = buildBlobPath({
        points,
        cx,
        cy,
        baseR: baseR * s.zoom,
        amp1: s.amp1,
        amp2: s.amp2,
        phase: s.phase,
      })

      if (pathRef.current) pathRef.current.setAttribute("d", d)
      if (blurRef.current) blurRef.current.setAttribute("d", d)

      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [active, reduced])

  // Reduced motion: render a single static blob
  const staticD = React.useMemo(() => {
    return buildBlobPath({
      points: 44,
      cx: 210,
      cy: 210,
      baseR: 176,
      amp1: mode === "student" ? 15 : mode === "university" ? 12 : 10,
      amp2: mode === "student" ? 10 : 7,
      phase: 0.8,
    })
  }, [mode])

  return (
    <div
      className={cn("relative", className)}
      style={{
        opacity: entered ? 1 : 0,
        transition: reduced ? undefined : "opacity 650ms ease-out",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 420"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="420" y2="420">
            <stop offset="0" stopColor={palette.a} stopOpacity={0.95} />
            <stop offset="0.55" stopColor={palette.b} stopOpacity={0.95} />
            <stop offset="1" stopColor={palette.c} stopOpacity={0.90} />
          </linearGradient>
          <filter id="ringGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={18 * intensity} result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0"
              result="c"
            />
            <feMerge>
              <feMergeNode in="c" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* soft bloom behind */}
        <path
          ref={blurRef}
          d={staticD}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={36}
          strokeLinecap="round"
          opacity={0.22 * intensity}
          filter="url(#ringGlow)"
        />

        {/* main ring */}
        <path
          ref={pathRef}
          d={staticD}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.90 * intensity}
        />
      </svg>
    </div>
  )
}

