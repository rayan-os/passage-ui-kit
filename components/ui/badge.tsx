import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 shrink-0",
    "font-medium whitespace-nowrap tabular-nums",
    "transition-all duration-glass ease-glass",
    "backdrop-blur-glass-light",
  ],
  {
    variants: {
      variant: {
        // Default - glass badge
        default: [
          "bg-glass-bg border border-glass-border-subtle",
          "text-white/70",
        ],
        // Secondary - subtle glass
        secondary: [
          "bg-white/[0.04] border border-transparent",
          "text-white/60",
        ],
        // Accent badge with sage green
        accent: [
          "bg-[rgba(197,204,195,0.08)] border border-[rgba(197,204,195,0.15)]",
          "text-[#c5ccc3]",
        ],
        // Success - emerald glass
        success: [
          "bg-emerald-500/[0.08] border border-emerald-500/[0.12]",
          "text-emerald-400",
        ],
        // Warning - amber glass
        warning: [
          "bg-amber-500/[0.08] border border-amber-500/[0.12]",
          "text-amber-400",
        ],
        // Info - blue glass
        info: [
          "bg-blue-500/[0.08] border border-blue-500/[0.12]",
          "text-blue-400",
        ],
        // Destructive - rose glass
        destructive: [
          "bg-rose-500/[0.08] border border-rose-500/[0.12]",
          "text-rose-400",
        ],
        // Outline - transparent with border
        outline: [
          "bg-transparent border border-glass-border",
          "text-white/70",
        ],
      },
      size: {
        default: "px-2 py-0.5 text-[11px]",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-xs",
      },
      shape: {
        default: "rounded-glass-sm",
        pill: "rounded-glass-capsule",
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
