import { SidebarNav } from "@/components/sidebar-nav"
import { ProcessPanel } from "@/components/process-panel"
import { ApplicationsTable } from "@/components/applications-table"

export default function AdminPanelPage() {
  return (
    <main className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Left sidebar navigation */}
      <SidebarNav />

      {/* Main content area */}
      <div className="flex-1 flex h-full">
        {/* Process panel */}
        <ProcessPanel />

        {/* Data table area */}
        <div className="flex-1 h-full overflow-hidden bg-[#0a0a0a]">
          <div className="w-full flex h-full">
            <div className="flex-1 overflow-y-auto">
              <ApplicationsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
