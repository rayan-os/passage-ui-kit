import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-giga-accent focus-visible:ring-offset-2 focus-visible:ring-offset-giga-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - White button (GIGA style)
        default:
          "bg-white text-[#0a0a0a] border border-white hover:opacity-92 active:translate-y-[1px]",
        // Secondary - Ghost button (GIGA style)
        secondary:
          "bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.14]",
        // Destructive
        destructive:
          "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30",
        // Outline
        outline:
          "border border-white/[0.12] bg-transparent text-white hover:bg-white/[0.08] hover:border-white/[0.14]",
        // Ghost
        ghost: 
          "text-white/70 hover:text-white hover:bg-white/[0.08]",
        // Link
        link: 
          "text-giga-accent underline-offset-4 hover:underline",
        // Action button - small white button (GIGA style)
        action:
          "bg-white/[0.92] text-[#0a0a0a] font-bold hover:bg-white active:translate-y-[1px]",
        // Glass button - Liquid Glass surface (use selectively)
        glass:
          "glass-surface glass-interactive text-white/90 hover:text-white [--glass-bg:rgba(18,18,18,0.52)] [--glass-border:rgba(255,255,255,0.10)] [--glass-blur:var(--glass-blur-light)] [--glass-sheen-gradient:var(--glass-sheen-soft)] [--glass-shadow:0_10px_30px_rgba(0,0,0,0.28)]",
      },
      size: {
        default: "h-10 px-6 py-2 text-sm rounded-full",
        sm: "h-8 px-4 text-xs rounded-full",
        lg: "h-12 px-8 text-base rounded-full",
        icon: "h-10 w-10 rounded-full",
        "icon-sm": "h-8 w-8 rounded-lg",
        action: "h-7 px-3 text-xs rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
