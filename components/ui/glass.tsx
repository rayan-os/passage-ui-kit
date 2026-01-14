import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassSurfaceVariants = cva("glass-surface", {
  variants: {
    variant: {
      default: "",
      elevated:
        "[--glass-shadow:var(--glass-shadow-elevated)] [--glass-border:var(--glass-border-subtle)]",
      tinted:
        "[--glass-border:var(--glass-border-subtle)] [--glass-tint:var(--glass-tint-neutral)]",
      interactive: "glass-interactive",
    },
    blur: {
      light: "[--glass-blur:var(--glass-blur-light)]",
      regular: "[--glass-blur:var(--glass-blur-regular)]",
      heavy: "[--glass-blur:var(--glass-blur-heavy)]",
    },
    radius: {
      sm: "[border-radius:var(--glass-radius-sm)]",
      md: "[border-radius:var(--glass-radius-md)]",
      lg: "[border-radius:var(--glass-radius-lg)]",
      capsule: "[border-radius:var(--glass-radius-capsule)]",
    },
    sheen: {
      soft: "[--glass-sheen-gradient:var(--glass-sheen-soft)]",
      regular: "[--glass-sheen-gradient:var(--glass-sheen)]",
    },
    tint: {
      neutral: "[--glass-tint:var(--glass-tint-neutral)]",
      purple: "[--glass-tint:var(--glass-tint-purple)]",
      green: "[--glass-tint:var(--glass-tint-green)]",
      amber: "[--glass-tint:var(--glass-tint-amber)]",
    },
  },
  defaultVariants: {
    variant: "default",
    blur: "regular",
    radius: "md",
    sheen: "soft",
  },
})

export interface GlassSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassSurfaceVariants> {}

export function GlassSurface({
  className,
  variant,
  blur,
  radius,
  sheen,
  tint,
  ...props
}: GlassSurfaceProps) {
  return (
    <div
      className={cn(glassSurfaceVariants({ variant, blur, radius, sheen, tint }), className)}
      {...props}
    />
  )
}

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Harmonizes neighboring glass elements (border + sheen intensity).
   * Use sparingly; prefer a single container per screen area.
   */
  density?: "subtle" | "regular"
}

export function GlassContainer({ className, density = "regular", ...props }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "relative",
        density === "subtle"
          ? "[--glass-bg:rgba(18,18,18,0.54)] [--glass-border-subtle:rgba(255,255,255,0.09)] [--glass-border-strong:rgba(255,255,255,0.12)]"
          : "",
        className
      )}
      {...props}
    />
  )
}

const glassPillVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums select-none",
  {
    variants: {
      tone: {
        neutral:
          "text-white/80 [--glass-tint:var(--glass-tint-neutral)] [--glass-border:var(--glass-border-hairline)]",
        accent:
          "text-white/90 [--glass-tint:rgba(197,204,195,0.10)] [--glass-border:rgba(197,204,195,0.20)]",
        info:
          "text-blue-200 [--glass-tint:rgba(59,130,246,0.11)] [--glass-border:rgba(59,130,246,0.22)]",
        success:
          "text-emerald-200 [--glass-tint:var(--glass-tint-green)] [--glass-border:rgba(34,197,94,0.22)]",
        warning:
          "text-amber-200 [--glass-tint:var(--glass-tint-amber)] [--glass-border:rgba(245,158,11,0.24)]",
        purple:
          "text-violet-200 [--glass-tint:var(--glass-tint-purple)] [--glass-border:rgba(165,110,255,0.22)]",
      },
      size: {
        sm: "h-6 px-2 text-[10px] font-semibold tracking-[0.08em] uppercase",
        md: "h-7 px-2.5 text-[11px] font-semibold tracking-[0.06em] uppercase",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "sm",
    },
  }
)

export interface GlassPillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPillVariants> {}

export function GlassPill({ className, tone, size, ...props }: GlassPillProps) {
  return (
    <div
      className={cn(
        "glass-surface [--glass-bg:rgba(18,18,18,0.52)] [--glass-blur:var(--glass-blur-light)] [--glass-sheen-gradient:var(--glass-sheen-soft)] [--glass-shadow:0_10px_30px_rgba(0,0,0,0.28)]",
        "[border-radius:var(--glass-radius-capsule)]",
        glassPillVariants({ tone, size }),
        className
      )}
      {...props}
    />
  )
}

