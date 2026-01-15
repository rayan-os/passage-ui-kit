"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { ProcessPanel } from "@/components/process-panel"
import { ApplicationsTable } from "@/components/applications-table"
import { GlassContainer } from "@/components/ui/glass"
import { PassageAssistantDrawer } from "@/components/passage-assistant-drawer"
import { useState } from "react"

export default function AdminPanelPage() {
  const [assistantOpen, setAssistantOpen] = useState(true)

  return (
    <GlassContainer density="subtle" className="h-screen">
      <main className="flex h-full overflow-hidden liquid-bg">
        {/* Left sidebar navigation */}
        <SidebarNav />

        {/* Main content area */}
        <div className="flex-1 flex h-full">
          {/* Process panel */}
          <ProcessPanel />

          {/* Data table area */}
          <div className="flex-1 h-full overflow-hidden">
            <div className="w-full flex h-full">
              <div className="flex-1 overflow-y-auto">
                <ApplicationsTable />
              </div>
            </div>
          </div>
        </div>
      </main>

      <PassageAssistantDrawer open={assistantOpen} onOpenChange={setAssistantOpen} />
    </GlassContainer>
  )
}
