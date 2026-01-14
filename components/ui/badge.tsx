import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center shrink-0 whitespace-nowrap tabular-nums transition-colors leading-none",
  {
    variants: {
      variant: {
        // Default - subtle dark badge (GIGA style)
        default:
          "bg-foreground/[0.06] text-foreground/70 border border-transparent",
        // Secondary
        secondary:
          "bg-foreground/[0.06] text-foreground/70",
        // Accent badge with sage green (GIGA style)
        accent:
          "bg-[rgba(197,204,195,0.16)] text-foreground/90 border border-[rgba(197,204,195,0.24)]",
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
          "border border-border text-foreground/70 bg-transparent",
      },
      size: {
        default: "h-6 px-2.5 text-[12px] font-semibold",
        sm: "h-5 px-2 text-[11px] font-semibold",
        lg: "h-7 px-3 text-[12px] font-semibold",
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
