"use client"

import * as React from "react"

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function DotField({
  className,
  density = 0.00018,
  maxDots = 120,
}: {
  className?: string
  density?: number
  maxDots?: number
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const frameRef = React.useRef<number | null>(null)
  const dotsRef = React.useRef<Dot[]>([])
  const lastRef = React.useRef<number>(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl: HTMLCanvasElement = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const ctx2: CanvasRenderingContext2D = ctx

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const reduced = Boolean(media?.matches)
    if (reduced) return

    const parent = canvas.parentElement
    if (!parent) return
    const parentEl: HTMLElement = parent

    const dpr = Math.max(1, window.devicePixelRatio || 1)

    function resize() {
      const rect = parentEl.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))

      canvasEl.width = Math.floor(w * dpr)
      canvasEl.height = Math.floor(h * dpr)
      canvasEl.style.width = `${w}px`
      canvasEl.style.height = `${h}px`

      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = clamp(Math.floor(w * h * density), 24, maxDots)
      const next: Dot[] = []
      for (let i = 0; i < target; i++) {
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.10,
          r: 0.6 + Math.random() * 1.4,
          a: 0.08 + Math.random() * 0.22,
        })
      }
      dotsRef.current = next
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(parentEl)
    resize()

    function tick(t: number) {
      const rect = parentEl.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))

      const last = lastRef.current || t
      const dt = Math.min(40, t - last) // cap dt
      lastRef.current = t

      ctx2.clearRect(0, 0, w, h)

      // faint “aurora” gradient under dots
      const g = ctx2.createRadialGradient(
        w * 0.2,
        h * 0.2,
        0,
        w * 0.2,
        h * 0.2,
        Math.max(w, h)
      )
      g.addColorStop(0, "rgba(59,130,246,0.06)")
      g.addColorStop(0.45, "rgba(197,204,195,0.04)")
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx2.fillStyle = g
      ctx2.fillRect(0, 0, w, h)

      const dots = dotsRef.current
      for (const d of dots) {
        d.x += d.vx * dt
        d.y += d.vy * dt

        if (d.x < -10) d.x = w + 10
        if (d.x > w + 10) d.x = -10
        if (d.y < -10) d.y = h + 10
        if (d.y > h + 10) d.y = -10

        ctx2.beginPath()
        ctx2.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx2.fillStyle = `rgba(255,255,255,${d.a})`
        ctx2.fill()
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [density, maxDots])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}

