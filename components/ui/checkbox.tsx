"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0",
      "rounded-[5px]",
      "bg-glass-bg backdrop-blur-glass-light",
      "border border-glass-border",
      "shadow-glass-sm",
      "transition-all duration-glass ease-glass",
      // Hover state
      "hover:bg-glass-bg-hover hover:border-white/[0.20]",
      // Focus state
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state
      "data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-[#0a0a0a]",
      "data-[state=checked]:shadow-glass-md",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
