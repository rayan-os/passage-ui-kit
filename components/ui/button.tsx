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
          "bg-foreground text-background border border-foreground hover:opacity-92 active:translate-y-[1px]",
        // Secondary - Ghost button (GIGA style)
        secondary:
          "bg-foreground/[0.06] text-foreground border border-border hover:bg-foreground/[0.09] hover:border-foreground/[0.18]",
        // Destructive
        destructive:
          "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30",
        // Outline
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.06] hover:border-foreground/[0.16]",
        // Ghost
        ghost: 
          "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]",
        // Link
        link: 
          "text-giga-accent underline-offset-4 hover:underline",
        // Action button - small white button (GIGA style)
        action:
          "bg-foreground/[0.92] text-background font-bold hover:bg-foreground active:translate-y-[1px]",
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
