"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)]",
      "text-[#0a0a0a] font-semibold text-xs",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Beautiful gradient color palettes for avatars (more vibrant with 3 color stops)
const gradientPalettes = [
  ["#FF416C", "#FF4B2B", "#FF6B4A"], // Warm Red
  ["#7F00FF", "#E100FF", "#AA00FF"], // Vivid Purple  
  ["#00C9FF", "#92FE9D", "#00D9FF"], // Cyan-Mint
  ["#F857A6", "#FF5858", "#FF7676"], // Pink-Red
  ["#4776E6", "#8E54E9", "#6B66FF"], // Blue-Purple
  ["#00B09B", "#96C93D", "#00D4AA"], // Teal-Green
  ["#FC466B", "#3F5EFB", "#7B68EE"], // Pink-Blue
  ["#11998E", "#38EF7D", "#00D68F"], // Green-Mint
  ["#FC4A1A", "#F7B733", "#FF8C42"], // Orange-Yellow
  ["#8E2DE2", "#4A00E0", "#6B2CF5"], // Deep Purple
  ["#EB3349", "#F45C43", "#FF6B6B"], // Coral Red
  ["#1FA2FF", "#12D8FA", "#00E4FF"], // Sky Blue
  ["#F2994A", "#F2C94C", "#FFD93D"], // Golden
  ["#6DD5ED", "#2193B0", "#00B4DB"], // Ocean Blue
]

// Generate a consistent gradient based on a string
function getGradientFromString(str: string): [string, string, string] {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % gradientPalettes.length
  return gradientPalettes[index] as [string, string, string]
}

// Get single initial from a name
function getInitials(name: string): string {
  return name.trim().charAt(0).toUpperCase()
}

interface GradientAvatarProps {
  name: string
  className?: string
  size?: "xs" | "sm" | "md" | "lg"
}

const sizeClasses = {
  xs: "w-4 h-4 text-[8px]",
  sm: "w-5 h-5 text-[9px]",
  md: "w-8 h-8 text-xs",
  lg: "w-10 h-10 text-sm",
}

function GradientAvatar({ name, className, size = "sm" }: GradientAvatarProps) {
  const [color1, color2, color3] = getGradientFromString(name)
  const initial = getInitials(name)
  
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-white",
        sizeClasses[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        boxShadow: `0 2px 8px ${color1}40`,
      }}
    >
      {initial}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, GradientAvatar, getGradientFromString, getInitials }
