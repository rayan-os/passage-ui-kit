"use client"

import {
  Search,
  RefreshCw,
  ShieldAlert,
  Users,
  Database,
  PlusCircle,
  Cpu,
  Settings2,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage, GradientAvatar } from "@/components/ui/avatar"

interface NavItemProps {
  icon: React.ReactNode
  label?: string
  active?: boolean
  badge?: string
  badgeColor?: string
  href?: string
  onClick?: () => void
}

function NavItem({ icon, label, active, badge, badgeColor, href = "#", onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 relative group",
        active
          ? "bg-foreground/[0.10] text-foreground"
          : "text-foreground/55 hover:bg-foreground/[0.06] hover:text-foreground/80"
      )}
      aria-label={label}
    >
      {icon}
      {badge && (
        <span
          className="absolute -top-0.5 -right-1 text-[9px] font-bold tracking-tight"
          style={{ color: badgeColor || "#ff6b35" }}
        >
          {badge}
        </span>
      )}
      {/* Tooltip */}
      {label && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-popover border border-border text-popover-foreground text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-giga-sm">
          {label}
        </div>
      )}
    </a>
  )
}

export function SidebarNav() {
  return (
    <div className="w-[64px] giga-glass flex flex-col h-full border-r border-border">
      {/* Top section */}
      <div className="flex flex-col items-center gap-1 p-3">
        {/* Logo */}
        <div className="w-10 h-10 flex items-center justify-center mb-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[rgba(197,204,195,0.95)] to-[rgba(168,176,165,0.35)] flex items-center justify-center text-[#0a0a0a] text-sm font-bold shadow-giga-sm">
            P
          </div>
        </div>

        {/* Search */}
        <div className="w-10 h-10 flex items-center justify-center bg-card/70 border border-border rounded-xl shadow-giga-sm hover:border-foreground/[0.16] transition-all duration-150 cursor-pointer group">
          <Search className="w-[18px] h-[18px] text-foreground/55 group-hover:text-foreground/80 transition-colors" />
        </div>

        <div className="w-8 h-px bg-border my-2" />

        {/* Dashboard */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 19V5h6v14zm14 0h-6v-7h6zm0-9h-6V5h6z" opacity=".3" />
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h6v14zm14 0h-6v-7h6zm0-9h-6V5h6z" />
            </svg>
          }
          label="Dashboard"
        />

        {/* New applications - Active */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="m11.17 8-.59-.59L9.17 6H4v12h16V8zM19 16v1h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2m-4-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2" opacity=".3" />
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V6h5.17l2 2H20zm-5-5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m-4 3v1h8v-1c0-1.33-2.67-2-4-2s-4 .67-4 2" />
            </svg>
          }
          label="New applications"
          active
        />

        {/* New users */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2M5.75 8.9 3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6q-.375 0-.75.15L2 8.3V13h2V9.65zM13 2v7h3.75v14h1.5V9H22V2zm5.01 6V6.25H14.5v-1.5h3.51V3l2.49 2.5z" />
            </svg>
          }
          label="New users"
        />

        {/* Internal Tasks */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39z" />
            </svg>
          }
          label="Internal Tasks"
        />

        <div className="w-8 h-px bg-border my-2" />

        {/* Funnel Health Tracker */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v3h2V6h16v3h2V6c0-1.1-.9-2-2-2m0 14H4v-3H2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3h-2z" />
              <path d="M14.89 7.55c-.34-.68-1.45-.68-1.79 0L10 13.76l-1.11-2.21A.988.988 0 0 0 8 11H2v2h5.38l1.72 3.45c.18.34.52.55.9.55s.72-.21.89-.55L14 10.24l1.11 2.21c.17.34.51.55.89.55h6v-2h-5.38z" />
            </svg>
          }
          label="Funnel Health Tracker"
        />

        {/* Loan - with PLMS badge */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="m6.29 6 5.21-2.74L16.71 6z" opacity=".3" />
              <path d="M6.5 10h-2v7h2zm6 0h-2v7h2zm8.5 9H2v2h19zm-2.5-9h-2v7h2zm-7-9L2 6v2h19V6zM6.29 6l5.21-2.74L16.71 6z" />
            </svg>
          }
          label="Loan"
          badge="PLMS"
        />

        {/* Journeys */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6" cy="6" r="1" opacity=".3" />
              <circle cx="18" cy="18" r="1" opacity=".3" />
              <path d="M19 15.18V7c0-2.21-1.79-4-4-4s-4 1.79-4 4v10c0 1.1-.9 2-2 2s-2-.9-2-2V8.82C8.16 8.4 9 7.3 9 6c0-1.66-1.34-3-3-3S3 4.34 3 6c0 1.3.84 2.4 2 2.82V17c0 2.21 1.79 4 4 4s4-1.79 4-4V7c0-1.1.9-2 2-2s2 .9 2 2v8.18c-1.16.41-2 1.51-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82M6 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m12 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1" />
            </svg>
          }
          label="Journeys"
        />

        {/* Reports */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5H5v14h14zM9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z" opacity=".3" />
              <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2m2 0h14v14H5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
            </svg>
          }
          label="Reports"
        />

        {/* Users */}
        <NavItem
          icon={<Users className="w-5 h-5" />}
          label="Users"
        />

        {/* Finances */}
        <NavItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.5 10h-2v7h2zm6 0h-2v7h2zm8.5 9H2v2h19zm-2.5-9h-2v7h2zm-7-6.74L16.71 6H6.29zm0-2.26L2 6v2h19V6z" />
            </svg>
          }
          label="Finances"
        />

        {/* Data */}
        <NavItem
          icon={<Database className="w-5 h-5" />}
          label="Data"
        />

        {/* Misc */}
        <NavItem
          icon={<PlusCircle className="w-5 h-5" />}
          label="Misc"
        />

        {/* AI */}
        <NavItem
          icon={<Cpu className="w-5 h-5" />}
          label="AI"
        />

        {/* Action */}
        <NavItem
          icon={<Settings2 className="w-5 h-5" />}
          label="Action"
        />

        {/* Monitoring */}
        <NavItem
          icon={<Activity className="w-5 h-5" />}
          label="Monitoring"
        />

        {/* Alert */}
        <NavItem
          icon={<ShieldAlert className="w-5 h-5 text-[#ff6b35]" />}
          label="Alerts"
        />
      </div>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col items-center gap-1 p-3 border-t border-border">
        {/* Refresh */}
        <NavItem
          icon={<RefreshCw className="w-5 h-5" />}
          label="Refresh"
        />

        {/* Profile */}
        <div className="w-10 h-10 flex items-center justify-center">
          <GradientAvatar name="John Doe" size="md" className="ring-2 ring-border ring-offset-2 ring-offset-background" />
        </div>
      </div>
    </div>
  )
}
