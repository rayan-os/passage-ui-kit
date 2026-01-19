"use client"

import * as React from "react"
import {
  isPassageMode,
  PASSAGE_MODE_STORAGE_KEY,
  type PassageMode,
} from "@/lib/passage-mode"

type PassageModeContextValue = {
  mode: PassageMode | null
  setMode: (mode: PassageMode | null) => void
  hydrated: boolean
}

const PassageModeContext = React.createContext<PassageModeContextValue | null>(
  null
)

export function PassageModeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mode, setModeState] = React.useState<PassageMode | null>(null)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PASSAGE_MODE_STORAGE_KEY)
      if (isPassageMode(raw)) setModeState(raw)
    } catch {
      // ignore
    } finally {
      setHydrated(true)
    }
  }, [])

  const setMode = React.useCallback((next: PassageMode | null) => {
    setModeState(next)
    try {
      if (next) window.localStorage.setItem(PASSAGE_MODE_STORAGE_KEY, next)
      else window.localStorage.removeItem(PASSAGE_MODE_STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = React.useMemo(
    () => ({ mode, setMode, hydrated }),
    [mode, setMode, hydrated]
  )

  return (
    <PassageModeContext.Provider value={value}>
      {children}
    </PassageModeContext.Provider>
  )
}

export function usePassageMode() {
  const ctx = React.useContext(PassageModeContext)
  if (!ctx) {
    throw new Error("usePassageMode must be used within PassageModeProvider")
  }
  return ctx
}

