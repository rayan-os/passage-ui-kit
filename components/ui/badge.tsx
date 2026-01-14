import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center shrink-0 font-medium whitespace-nowrap tabular-nums transition-colors",
  {
    variants: {
      variant: {
        // Default - subtle dark badge (GIGA style)
        default:
          "bg-white/[0.08] text-white/70 border border-transparent",
        // Secondary
        secondary:
          "bg-white/[0.08] text-white/70",
        // Accent badge with sage green (GIGA style)
        accent:
          "bg-[rgba(197,204,195,0.12)] text-white/85 border border-[rgba(197,204,195,0.20)]",
        // Success - greenish
        success:
          "bg-emerald-500/[0.12] text-emerald-400 border border-emerald-500/[0.20]",
        // Warning - orange/amber
        warning:
          "bg-amber-500/[0.12] text-amber-400 border border-amber-500/[0.20]",
        // Info - blue
        info:
          "bg-blue-500/[0.12] text-blue-400 border border-blue-500/[0.20]",
        // Destructive - red
        destructive:
          "bg-red-500/[0.12] text-red-400 border border-red-500/[0.20]",
        // Outline
        outline: 
          "border border-white/[0.12] text-white/70 bg-transparent",
      },
      size: {
        default: "px-2 py-0.5 text-[11px]",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-xs",
      },
      shape: {
        default: "rounded-lg",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
