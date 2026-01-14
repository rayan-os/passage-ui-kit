import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold",
    "transition-all duration-glass ease-glass",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        // Primary - White button with glass shadow
        default: [
          "bg-white text-[#0a0a0a]",
          "shadow-glass-sm",
          "hover:bg-white/95 hover:shadow-glass-md",
          "active:translate-y-[1px] active:scale-[0.98] active:shadow-glass-sm",
        ],
        // Secondary - Glass button
        secondary: [
          "bg-glass-bg backdrop-blur-glass",
          "border border-glass-border",
          "text-white",
          "shadow-glass-sm",
          "hover:bg-glass-bg-hover hover:border-white/[0.15]",
          "active:scale-[0.98]",
        ],
        // Destructive
        destructive: [
          "bg-rose-500/[0.1] backdrop-blur-glass-light",
          "border border-rose-500/[0.2]",
          "text-rose-400",
          "hover:bg-rose-500/[0.15] hover:border-rose-500/[0.3]",
          "active:scale-[0.98]",
        ],
        // Outline
        outline: [
          "border border-glass-border",
          "bg-transparent",
          "text-white",
          "hover:bg-glass-bg hover:border-white/[0.15]",
          "active:scale-[0.98]",
        ],
        // Ghost
        ghost: [
          "text-white/70",
          "hover:text-white hover:bg-glass-bg",
          "active:bg-glass-bg-active",
        ],
        // Link
        link: [
          "text-[#c5ccc3] underline-offset-4",
          "hover:underline",
        ],
        // Action button - small accent button
        action: [
          "bg-white/95 text-[#0a0a0a] font-bold",
          "shadow-glass-sm",
          "hover:bg-white hover:shadow-glass-md",
          "active:translate-y-[1px] active:scale-[0.98]",
        ],
        // Accent - sage green glass button
        accent: [
          "bg-gradient-to-b from-[#c5ccc3] to-[#a8b0a5]",
          "text-[#0a0a0a]",
          "shadow-glass-sm shadow-[rgba(197,204,195,0.2)]",
          "hover:shadow-glass-glow",
          "active:scale-[0.98]",
        ],
      },
      size: {
        default: "h-10 px-5 py-2 text-sm rounded-glass-md",
        sm: "h-8 px-3.5 text-xs rounded-glass-md",
        lg: "h-12 px-7 text-base rounded-glass-lg",
        icon: "h-10 w-10 rounded-glass-md",
        "icon-sm": "h-8 w-8 rounded-glass-sm",
        action: "h-7 px-3 text-xs rounded-glass-sm",
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
