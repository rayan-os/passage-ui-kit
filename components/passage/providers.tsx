"use client"

import * as React from "react"
import { PassageModeProvider } from "@/components/passage/mode-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return <PassageModeProvider>{children}</PassageModeProvider>
}

