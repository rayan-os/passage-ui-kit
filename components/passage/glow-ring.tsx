"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { type PassageMode } from "@/lib/passage-mode"

export function GlowRing({
  mode,
  className,
  intensity = 1,
}: {
  mode: PassageMode | "neutral"
  className?: string
  intensity?: number
}) {
  const palette =
    mode === "university"
      ? {
          a: "rgba(59,130,246,0.95)", // blue
          b: "rgba(139,92,246,0.95)", // purple
          c: "rgba(197,204,195,0.90)", // sage
        }
      : mode === "student"
        ? {
            a: "rgba(59,130,246,0.95)", // blue
            b: "rgba(244,63,94,0.95)", // rose
            c: "rgba(139,92,246,0.85)", // purple
          }
        : {
            a: "rgba(59,130,246,0.85)",
            b: "rgba(139,92,246,0.85)",
            c: "rgba(197,204,195,0.70)",
          }

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      {/* The “portal” ring: conic gradient + radial mask */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "blur-[1px]",
          "passage-float [animation:passageFloat_7.5s_ease-in-out_infinite]"
        )}
        style={{
          background: `conic-gradient(from 210deg, ${palette.a}, ${palette.b}, ${palette.c}, ${palette.a})`,
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, transparent 57%, black 60%, black 66%, transparent 70%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, transparent 57%, black 60%, black 66%, transparent 70%)",
          opacity: 0.9 * intensity,
          filter: `blur(${Math.max(0, 1.5 * intensity)}px)`,
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute inset-[-16%] rounded-full blur-[38px] opacity-70"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${palette.b} 0%, transparent 62%)`,
          opacity: 0.42 * intensity,
        }}
      />

      {/* Inner haze */}
      <div
        className="absolute inset-[18%] rounded-full blur-[34px]"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
          opacity: 0.55 * intensity,
        }}
      />

      {/* One-time sweep to “wow” on load */}
      <div className="absolute inset-0 overflow-hidden rounded-full opacity-70">
        <div
          className="absolute -left-1/2 top-0 h-full w-1/2 rotate-[16deg] passage-sweep [animation:passageSweep_1.55s_ease-out_0.20s_1]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
          }}
        />
      </div>
    </div>
  )
}

