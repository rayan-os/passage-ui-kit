"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage, GradientAvatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ProcessItemProps {
  label: string
  count?: number | string
  color: string
  subtitle?: string
  avatar?: string
  isComplete?: boolean
  isActive?: boolean
  onClick?: () => void
}

function ProcessItem({
  label,
  count,
  color,
  subtitle,
  avatar,
  isComplete,
  isActive,
  onClick,
}: ProcessItemProps) {
  return (
    <div
      className={cn(
        // Base styling
        "relative flex items-center py-2.5 px-3",
        "rounded-glass-md cursor-pointer",
        "transition-all duration-glass ease-glass group",
        // Active state - glass effect
        isActive 
          ? [
              "bg-glass-bg-active backdrop-blur-glass",
              "border border-glass-border-strong",
              "shadow-glass-md",
              // Specular highlight
              "before:absolute before:inset-0 before:rounded-[inherit]",
              "before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent",
              "before:pointer-events-none",
            ]
          : [
              "hover:bg-glass-bg hover:border-glass-border",
              "border border-transparent",
              "hover:shadow-glass-sm",
            ]
      )}
      onClick={onClick}
    >
      {/* Color indicator with glow effect */}
      <div
        className="relative flex-shrink-0 w-1.5 h-4 mr-3 rounded-full"
        style={{ 
          backgroundColor: color,
          boxShadow: isActive ? `0 0 8px ${color}50` : 'none',
        }}
      />
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className={cn(
            "font-medium text-[13px] transition-colors duration-glass",
            isActive ? "text-white" : "text-white/85 group-hover:text-white"
          )}>
            {label}
          </p>
          {subtitle && (
            <p className="text-[11px] leading-5 text-white/40">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <span className={cn(
              "flex items-center justify-center w-5 h-5",
              "rounded-full",
              "bg-emerald-500/[0.12] backdrop-blur-glass-light",
              "border border-emerald-500/[0.2]",
              "text-emerald-400 text-[10px] font-bold",
            )}>
              ✓
            </span>
          ) : (
            count !== undefined && (
              <span className={cn(
                "text-[11px] text-white/60 font-mono tabular-nums",
                "bg-glass-bg backdrop-blur-glass-light",
                "border border-glass-border-subtle",
                "px-2 py-0.5 rounded-glass-sm",
              )}>
                {count}
              </span>
            )
          )}
          {avatar !== undefined && (
            avatar ? (
              <Avatar className="w-5 h-5 ring-1 ring-glass-border">
                <AvatarImage src={avatar} alt="assignee" />
              </Avatar>
            ) : (
              <GradientAvatar name={label} size="sm" />
            )
          )}
        </div>
      </div>
    </div>
  )
}

interface ProcessSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function ProcessSection({ title, icon, children, defaultOpen = true }: ProcessSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="transition-all duration-glass">
      <div
        className={cn(
          "flex items-center px-2 py-2.5 cursor-pointer",
          "rounded-glass-sm",
          "transition-all duration-glass ease-glass group",
          "hover:bg-glass-bg",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-shrink-0 scale-75 text-white/35 group-hover:text-white/55 transition-colors duration-glass">
          {icon || (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2m0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19z" />
            </svg>
          )}
        </div>
        <div className="flex-1 w-full flex items-start flex-col gap-1">
          <p className="text-[10px] text-white/55 font-semibold leading-none uppercase tracking-[0.1em] group-hover:text-white/80 transition-colors duration-glass">
            {title}
          </p>
        </div>
        <div className={cn(
          "flex-shrink-0 ml-2",
          "text-white/35 group-hover:text-white/55",
          "transition-all duration-glass",
        )}>
          <ChevronDown className={cn(
            "h-3.5 w-3.5 transition-transform duration-glass",
            !isOpen && "-rotate-90"
          )} />
        </div>
      </div>
      {isOpen && <div className="space-y-1 pl-1.5">{children}</div>}
    </div>
  )
}

export function ProcessPanel() {
  const [activeItem, setActiveItem] = useState("pending-loa")

  return (
    <div className={cn(
      "w-[380px] overflow-y-auto h-full",
      // Glass panel background
      "bg-gradient-to-b from-glass-bg to-transparent",
      "backdrop-blur-glass",
      "border-r border-glass-border-subtle",
      // Specular highlight at top
      "relative",
      "before:absolute before:top-0 before:left-0 before:right-0 before:h-40",
      "before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent",
      "before:pointer-events-none before:z-0",
    )}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative">
          {/* Tab Header */}
          <div className="sticky top-0 z-10 p-4 bg-gradient-to-b from-[#0a0a0a] to-transparent pb-6">
            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="process">
                  Process
                </TabsTrigger>
                <TabsTrigger value="owner">
                  Owner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="process" className="mt-0">
                <div className="flex-1 overflow-y-auto min-h-[400px] pt-0">
                  {/* Process Select */}
                  <div className="mt-4">
                    <div className="relative">
                      <Select defaultValue="admission">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select process" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">Admission process</SelectItem>
                          <SelectItem value="loan">Loan process</SelectItem>
                          <SelectItem value="visa">Visa process</SelectItem>
                        </SelectContent>
                      </Select>
                      <X className={cn(
                        "absolute size-3 right-10 top-1/2 -translate-y-1/2",
                        "text-white/30 hover:text-white/70 cursor-pointer",
                        "transition-colors duration-glass",
                      )} />
                    </div>
                  </div>

                  {/* Process Groups */}
                  <div className="mt-6 pt-4 border-t border-glass-border-subtle">
                    <div className="space-y-3">
                      {/* GBC Admission - Open */}
                      <Accordion type="single" collapsible defaultValue="gbc">
                        <AccordionItem
                          value="gbc"
                          className={cn(
                            // Glass card styling
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            // Specular highlight
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">GBC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 px-0 py-0 pt-4">
                            <div className="space-y-5">
                              {/* Pending decision */}
                              <ProcessSection title="Pending decision">
                                <ProcessItem
                                  label="Priority"
                                  count={9}
                                  color="#ff6b35"
                                  avatar=""
                                />
                                <div className="my-2.5 border-t border-glass-border-subtle" />
                                <ProcessItem
                                  label="Pending approval"
                                  count={106}
                                  color="#14b8a6"
                                  avatar=""
                                />
                              </ProcessSection>

                              {/* Pending offer */}
                              <ProcessSection title="Pending offer">
                                <ProcessItem
                                  label="Priority"
                                  count={16}
                                  color="#ff6b35"
                                  avatar=""
                                />
                                <div className="my-2.5 border-t border-glass-border-subtle" />
                                <ProcessItem
                                  label="Pending LOA"
                                  count={33}
                                  color="#14b8a6"
                                  avatar=""
                                  isActive={activeItem === "pending-loa"}
                                  onClick={() => setActiveItem("pending-loa")}
                                />
                                <ProcessItem
                                  label="Deferral app pending LOA"
                                  count={21}
                                  color="#3b82f6"
                                  avatar=""
                                />
                              </ProcessSection>

                              {/* Inbound emails */}
                              <ProcessSection title="Inbound emails">
                                <ProcessItem
                                  label="New inbound email"
                                  count={8}
                                  color="#14b8a6"
                                  avatar=""
                                />
                                <ProcessItem
                                  label="Requested more information"
                                  count={3}
                                  color="#14b8a6"
                                  avatar=""
                                />
                                <ProcessItem
                                  label="Requested more info (has LOA)"
                                  color="#14b8a6"
                                  avatar=""
                                  isComplete
                                />
                              </ProcessSection>

                              {/* Cases */}
                              <ProcessSection title="Cases">
                                <ProcessItem
                                  label="General support"
                                  color="#fbbf24"
                                  avatar=""
                                  isComplete
                                />
                                <ProcessItem
                                  label="Product issue"
                                  color="#3b82f6"
                                  avatar=""
                                  isComplete
                                />
                                <div className="my-2.5 border-t border-glass-border-subtle" />
                                <ProcessItem
                                  label="All cases"
                                  color="#22d3ee"
                                  isComplete
                                />
                              </ProcessSection>

                              {/* Pending requirements */}
                              <ProcessSection
                                title="Pending requirements"
                                icon={
                                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4" />
                                  </svg>
                                }
                              >
                                <ProcessItem
                                  label="Priority"
                                  count={10}
                                  color="#ff6b35"
                                  avatar=""
                                />
                                <div className="my-2.5 border-t border-glass-border-subtle" />
                                <ProcessItem
                                  label="Additional documents"
                                  subtitle="Pending user"
                                  count={2}
                                  color="#fbbf24"
                                  avatar=""
                                />
                                <ProcessItem
                                  label="Official documents"
                                  subtitle="Pending user"
                                  color="#fbbf24"
                                  avatar=""
                                  isComplete
                                />
                                <ProcessItem
                                  label="Official documents"
                                  subtitle="Pending school"
                                  color="#fbbf24"
                                  avatar=""
                                  isComplete
                                />
                                <div className="my-2.5 border-t border-glass-border-subtle" />
                                <ProcessItem
                                  label="All pending requirements"
                                  count={63}
                                  color="#fbbf24"
                                  avatar=""
                                />
                              </ProcessSection>

                              {/* Processed */}
                              <ProcessSection
                                title="Processed"
                                icon={
                                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
                                  </svg>
                                }
                                defaultOpen={false}
                              >
                                <ProcessItem
                                  label="Completed applications"
                                  count={250}
                                  color="#22c55e"
                                />
                              </ProcessSection>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* NC Admission - Closed */}
                        <AccordionItem
                          value="nc"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">NC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              NC Admission process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* BVC Admission - Closed */}
                        <AccordionItem
                          value="bvc"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">BVC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              BVC Admission process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Other schools Admission - Closed */}
                        <AccordionItem
                          value="other"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">Other schools Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              Other schools process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Admission confirmation - Closed */}
                        <AccordionItem
                          value="confirmation"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">Admission confirmation</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              Admission confirmation items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Admission offer status - Closed */}
                        <AccordionItem
                          value="offer-status"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">Admission offer status</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              Admission offer status items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Program switch - Closed */}
                        <AccordionItem
                          value="program-switch"
                          className={cn(
                            "relative border-none rounded-glass-lg overflow-hidden p-4 mb-3",
                            "bg-glass-bg backdrop-blur-glass",
                            "border border-glass-border",
                            "shadow-glass",
                            "before:absolute before:inset-0 before:rounded-[inherit]",
                            "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
                            "before:pointer-events-none before:z-0",
                          )}
                        >
                          <AccordionTrigger className="relative z-10 p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">Program switch</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="relative z-10 pt-4">
                            <div className="text-sm text-white/50">
                              Program switch items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="owner">
                <div className={cn(
                  "p-4 rounded-glass-lg mt-4",
                  "bg-glass-bg backdrop-blur-glass",
                  "border border-glass-border-subtle",
                )}>
                  <p className="text-white/50 text-sm">Owner view content...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
