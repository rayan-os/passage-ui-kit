"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { type PassageMode } from "@/lib/passage-mode"

type Mode = PassageMode | "neutral"

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

export function MorphingRing({
  mode,
  className,
  intensity = 1,
  active = false,
  entered = true,
  angleRad,
}: {
  mode: Mode
  className?: string
  intensity?: number
  /** true while “choosing” → ring pulls you in */
  active?: boolean
  /** used to fade ring in after entrance */
  entered?: boolean
  /** pointer angle around ring center (radians) for highlight */
  angleRad?: number | null
}) {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  const palette = React.useMemo(() => getPalette(mode), [mode])
  const angleDeg = React.useMemo(() => {
    if (typeof angleRad !== "number") return null
    // rotate so 0 rad points “up”
    return (angleRad * 180) / Math.PI + 90
  }, [angleRad])

  // Ring thickness subtly varies by mode (still a “true ring”)
  const maskStops = React.useMemo(() => {
    if (mode === "university") return { inner: 56, mid: 60, outer: 66, fade: 70 }
    if (mode === "student") return { inner: 55, mid: 60, outer: 67, fade: 71 }
    return { inner: 56, mid: 60, outer: 66, fade: 70 }
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
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "transition-[transform,opacity,filter] duration-300 ease-out"
        )}
        style={{
          transform: `scale(${active ? 1.08 : 1})`,
          filter: `blur(${Math.max(0, 0.5 * intensity)}px)`,
          opacity: 0.9 * intensity,
          background: `conic-gradient(from 220deg, ${palette.a}, ${palette.b}, ${palette.c}, ${palette.a})`,
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
          maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
        }}
      />

      {/* Outer glow (subtle) */}
      <div
        className="absolute inset-[-18%] rounded-full blur-[44px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${palette.b} 0%, transparent 62%)`,
          opacity: 0.18 * intensity,
        }}
      />

      {/* Cursor-following highlight segment */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          reduced ? "opacity-0" : "opacity-100"
        )}
        style={{
          transform: `rotate(${angleDeg ?? 0}deg)`,
          transition: angleDeg == null ? undefined : "transform 140ms ease-out",
          opacity: angleDeg == null ? 0.55 : 0.85,
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
          maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.00) 320deg, rgba(255,255,255,0.14) 350deg, rgba(255,255,255,0.00) 360deg)",
          filter: "blur(0.6px)",
        }}
      />

      {/* Gentle auto-rotation if no pointer angle */}
      {angleDeg == null && !reduced && (
        <div
          className="absolute inset-0 rounded-full opacity-70"
          style={{
            animation: "portalRotate 14s linear infinite",
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
            maskImage: `radial-gradient(circle at 50% 50%, transparent ${maskStops.inner}%, black ${maskStops.mid}%, black ${maskStops.outer}%, transparent ${maskStops.fade}%)`,
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.00) 260deg, rgba(255,255,255,0.10) 310deg, rgba(255,255,255,0.00) 360deg)",
            filter: "blur(0.7px)",
          }}
        />
      )}
    </div>
  )
}

