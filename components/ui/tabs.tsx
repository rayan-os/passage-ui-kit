"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Liquid Glass styling
      "relative inline-flex h-11 items-center justify-center p-1",
      "rounded-glass-lg",
      "bg-glass-bg backdrop-blur-glass",
      "border border-glass-border-subtle",
      "shadow-glass-sm",
      "text-white/55",
      // Specular highlight
      "before:absolute before:inset-0 before:rounded-[inherit]",
      "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
      "before:pointer-events-none",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styling
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap",
      "rounded-glass-md px-4 py-1.5",
      "text-sm font-semibold",
      "transition-all duration-glass ease-glass",
      // Focus states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
      "disabled:pointer-events-none disabled:opacity-50",
      // Inactive state
      "data-[state=inactive]:text-white/55",
      "data-[state=inactive]:hover:text-white/80",
      "data-[state=inactive]:hover:bg-white/[0.04]",
      // Active state - glass effect
      "data-[state=active]:bg-white/[0.95]",
      "data-[state=active]:text-[#0a0a0a]",
      "data-[state=active]:shadow-glass-md",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5ccc3]/40 focus-visible:ring-offset-2",
      "animate-fade-in-up",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
