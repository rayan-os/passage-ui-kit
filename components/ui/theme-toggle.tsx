"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

type Theme = "light" | "dark"

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
  try {
    localStorage.setItem("theme", theme)
  } catch {}
}

export function ThemeToggle({ variant = "secondary" }: { variant?: "secondary" | "ghost" }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    // Defer state updates to avoid setState-in-effect lint rule.
    requestAnimationFrame(() => {
      setMounted(true)
      setTheme(getCurrentTheme())
    })
  }, [])

  const Icon = theme === "dark" ? Moon : Sun
  const next: Theme = theme === "dark" ? "light" : "dark"

  if (!mounted) {
    return (
      <Button
        type="button"
        variant={variant}
        size="icon"
        aria-label="Theme toggle"
        disabled
        className="opacity-0 pointer-events-none"
      />
    )
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        const t = next
        setTheme(t)
        applyTheme(t)
      }}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}

