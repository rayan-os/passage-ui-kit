import { SidebarNav } from "@/components/sidebar-nav"
import { ProcessPanel } from "@/components/process-panel"
import { ApplicationsTable } from "@/components/applications-table"
import { cn } from "@/lib/utils"

export default function AdminPanelPage({
  searchParams,
}: {
  searchParams?: { mode?: string }
}) {
  const screenshotMode = searchParams?.mode === "screenshot"

  return (
    <main
      className={cn(
        "flex h-dvh overflow-hidden giga-app-bg",
        screenshotMode && "p-10"
      )}
    >
      {/* Left sidebar navigation */}
      {!screenshotMode && <SidebarNav />}

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex h-full min-w-0",
          screenshotMode &&
            "rounded-[28px] giga-glass overflow-hidden"
        )}
      >
        {/* Process panel */}
        {!screenshotMode && <ProcessPanel />}

        {/* Data table area */}
        <div className="flex-1 h-full min-w-0 overflow-hidden">
          <div className="w-full flex h-full">
            <div className="flex-1 min-w-0">
              <ApplicationsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
