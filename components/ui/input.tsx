import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-foreground/[0.03] px-3 py-2 text-sm text-foreground",
          "transition-all duration-150",
          "placeholder:text-foreground/35",
          "hover:border-foreground/[0.18] hover:bg-foreground/[0.05]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-giga-accent focus-visible:ring-offset-2 focus-visible:ring-offset-giga-bg",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
