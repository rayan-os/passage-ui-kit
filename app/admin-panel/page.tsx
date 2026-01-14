import { SidebarNav } from "@/components/sidebar-nav"
import { ProcessPanel } from "@/components/process-panel"
import { ApplicationsTable } from "@/components/applications-table"

export default function AdminPanelPage() {
  return (
    <main className="relative flex h-screen overflow-hidden bg-[#050505]">
      {/* Ambient background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#050505]" />
      
      {/* Subtle radial gradient for depth effect */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[rgba(197,204,195,0.02)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[rgba(59,130,246,0.02)] blur-[100px] pointer-events-none" />
      
      {/* Left sidebar navigation */}
      <SidebarNav />

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex h-full">
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
  )
}
