"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* ===========================================
   LIQUID GLASS COMPONENTS
   Apple-inspired glass material system
   =========================================== */

// GlassSurface - Base wrapper for any glass panel
const glassSurfaceVariants = cva(
  "relative overflow-hidden transition-all duration-glass ease-glass",
  {
    variants: {
      variant: {
        default: [
          "bg-glass-bg backdrop-blur-glass",
          "border border-glass-border",
          "shadow-glass",
          // Specular highlight overlay
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-br before:from-white/[0.08] before:via-white/[0.02] before:to-transparent",
          "before:pointer-events-none before:z-[1]",
        ],
        elevated: [
          "bg-glass-bg-elevated backdrop-blur-glass-heavy",
          "border border-glass-border-strong",
          "shadow-glass-lg",
          // Stronger highlight
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-br before:from-white/[0.12] before:via-white/[0.04] before:to-transparent",
          "before:pointer-events-none before:z-[1]",
        ],
        subtle: [
          "bg-glass-bg/50 backdrop-blur-glass-light",
          "border border-glass-border-subtle",
          "shadow-glass-sm",
        ],
        tinted: [
          "bg-gradient-to-b from-[rgba(197,204,195,0.06)] to-glass-bg backdrop-blur-glass",
          "border border-[rgba(197,204,195,0.12)]",
          "shadow-glass",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-br before:from-[rgba(197,204,195,0.1)] before:via-transparent before:to-transparent",
          "before:pointer-events-none before:z-[1]",
        ],
      },
      radius: {
        sm: "rounded-glass-sm",
        md: "rounded-glass-md",
        lg: "rounded-glass-lg",
        xl: "rounded-glass-xl",
        capsule: "rounded-glass-capsule",
        none: "rounded-none",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "hover:bg-glass-bg-hover hover:border-white/[0.15]",
          "hover:shadow-glass-hover hover:-translate-y-[1px] hover:scale-[1.005]",
          "active:translate-y-0 active:scale-[0.995] active:shadow-glass",
        ],
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "lg",
      interactive: false,
    },
  }
)

export interface GlassSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassSurfaceVariants> {}

const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className, variant, radius, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassSurfaceVariants({ variant, radius, interactive }), className)}
        {...props}
      >
        <div className="relative z-[2]">{children}</div>
      </div>
    )
  }
)
GlassSurface.displayName = "GlassSurface"

// GlassCard - For card-style glass elements
const glassCardVariants = cva(
  [
    "relative overflow-hidden transition-all duration-glass ease-glass",
    "bg-glass-bg backdrop-blur-glass",
    "border border-glass-border",
    "shadow-glass",
    // Specular highlight
    "before:absolute before:inset-0 before:rounded-[inherit]",
    "before:bg-gradient-to-br before:from-white/[0.08] before:via-white/[0.02] before:to-transparent",
    "before:pointer-events-none before:z-[1]",
  ],
  {
    variants: {
      size: {
        sm: "p-3 rounded-glass-md",
        md: "p-4 rounded-glass-lg",
        lg: "p-6 rounded-glass-xl",
      },
      hoverable: {
        true: [
          "cursor-pointer",
          "hover:bg-glass-bg-hover hover:border-white/[0.15]",
          "hover:shadow-glass-hover hover:-translate-y-[1px]",
          "active:translate-y-0 active:shadow-glass",
        ],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      hoverable: false,
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, size, hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ size, hoverable }), className)}
        {...props}
      >
        <div className="relative z-[2]">{children}</div>
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

// GlassPill - For status chips and filters
const glassPillVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-medium whitespace-nowrap tabular-nums",
    "transition-all duration-glass ease-glass",
    "backdrop-blur-glass-light",
    "rounded-glass-capsule",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-glass-bg border border-glass-border-subtle",
          "text-white/70",
          "hover:bg-glass-bg-hover hover:border-glass-border hover:text-white/90",
        ],
        accent: [
          "bg-[rgba(197,204,195,0.08)] border border-[rgba(197,204,195,0.15)]",
          "text-[#c5ccc3]",
          "hover:bg-[rgba(197,204,195,0.12)]",
        ],
        success: [
          "bg-emerald-500/[0.08] border border-emerald-500/[0.15]",
          "text-emerald-400",
          "hover:bg-emerald-500/[0.12]",
        ],
        warning: [
          "bg-amber-500/[0.08] border border-amber-500/[0.15]",
          "text-amber-400",
          "hover:bg-amber-500/[0.12]",
        ],
        info: [
          "bg-blue-500/[0.08] border border-blue-500/[0.15]",
          "text-blue-400",
          "hover:bg-blue-500/[0.12]",
        ],
        destructive: [
          "bg-rose-500/[0.08] border border-rose-500/[0.15]",
          "text-rose-400",
          "hover:bg-rose-500/[0.12]",
        ],
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-[11px]",
        md: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

export interface GlassPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof glassPillVariants> {}

const GlassPill = React.forwardRef<HTMLSpanElement, GlassPillProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(glassPillVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
GlassPill.displayName = "GlassPill"

// GlassButton - For primary and secondary actions
const glassButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold whitespace-nowrap",
    "transition-all duration-glass ease-glass",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white text-[#0a0a0a]",
          "shadow-glass-sm",
          "hover:bg-white/95 hover:shadow-glass-md",
          "active:scale-[0.98] active:shadow-glass-sm",
        ],
        secondary: [
          "bg-glass-bg backdrop-blur-glass",
          "border border-glass-border",
          "text-white",
          "shadow-glass-sm",
          "hover:bg-glass-bg-hover hover:border-white/[0.15]",
          "active:scale-[0.98]",
        ],
        ghost: [
          "bg-transparent",
          "text-white/70",
          "hover:bg-glass-bg hover:text-white",
          "active:bg-glass-bg-active",
        ],
        accent: [
          "bg-gradient-to-b from-[#c5ccc3] to-[#a8b0a5]",
          "text-[#0a0a0a]",
          "shadow-glass-sm shadow-[rgba(197,204,195,0.2)]",
          "hover:shadow-glass-glow",
          "active:scale-[0.98]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-glass-md",
        md: "h-10 px-4 text-sm rounded-glass-md",
        lg: "h-12 px-6 text-base rounded-glass-lg",
        icon: "h-10 w-10 rounded-glass-md",
        "icon-sm": "h-8 w-8 rounded-glass-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(glassButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
GlassButton.displayName = "GlassButton"

// GlassInput - For search and forms
const GlassInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full px-4 py-2",
        "bg-glass-bg backdrop-blur-glass",
        "border border-glass-border",
        "rounded-glass-md",
        "text-sm text-white placeholder:text-white/35",
        "shadow-glass-inner",
        "transition-all duration-glass ease-glass",
        "hover:border-white/[0.15]",
        "focus:outline-none focus:border-white/[0.20] focus:ring-2 focus:ring-[#c5ccc3]/20 focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
GlassInput.displayName = "GlassInput"

// GlassContainer - Groups glass elements cohesively
const GlassContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    padding?: "none" | "sm" | "md" | "lg"
  }
>(({ className, padding = "sm", children, ...props }, ref) => {
  const paddingClasses = {
    none: "",
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        "bg-black/20",
        "rounded-glass-xl",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
GlassContainer.displayName = "GlassContainer"

// GlassDivider - Subtle separator for glass surfaces
const GlassDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "horizontal", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-r from-transparent via-white/[0.08] to-transparent",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      {...props}
    />
  )
})
GlassDivider.displayName = "GlassDivider"

// GlassIconButton - Icon-only glass button
const GlassIconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md" | "lg"
  }
>(({ className, size = "md", children, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8 rounded-glass-sm",
    md: "h-10 w-10 rounded-glass-md",
    lg: "h-12 w-12 rounded-glass-lg",
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "bg-glass-bg backdrop-blur-glass",
        "border border-glass-border-subtle",
        "text-white/70",
        "shadow-glass-sm",
        "transition-all duration-glass ease-glass",
        "hover:bg-glass-bg-hover hover:border-glass-border hover:text-white",
        "hover:shadow-glass-md hover:-translate-y-[1px]",
        "active:translate-y-0 active:scale-[0.95] active:shadow-glass-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40",
        "disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
GlassIconButton.displayName = "GlassIconButton"

export {
  GlassSurface,
  glassSurfaceVariants,
  GlassCard,
  glassCardVariants,
  GlassPill,
  glassPillVariants,
  GlassButton,
  glassButtonVariants,
  GlassInput,
  GlassContainer,
  GlassDivider,
  GlassIconButton,
}
