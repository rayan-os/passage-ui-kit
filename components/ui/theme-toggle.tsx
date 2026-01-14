"use client"

import { useState } from "react"
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
  const [theme, setTheme] = useState<Theme>(() => getCurrentTheme())

  const Icon = theme === "dark" ? Moon : Sun
  const next: Theme = theme === "dark" ? "light" : "dark"

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

