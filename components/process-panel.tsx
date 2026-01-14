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
        "flex items-center py-2 px-3 rounded-xl cursor-pointer transition-all duration-150 group",
        isActive 
          ? "bg-foreground/[0.06] border border-border" 
          : "hover:bg-foreground/[0.04] border border-transparent"
      )}
      onClick={onClick}
    >
      <div
        className="flex-shrink-0 w-1 h-6 mr-3 rounded-full opacity-80"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-foreground/90 font-medium text-[13px] group-hover:text-foreground transition-colors">
            {label}
          </p>
          {subtitle && (
            <p className="text-[11px] leading-5 text-foreground/45">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/[0.12] text-emerald-400 text-[10px] font-bold">
              ✓
            </span>
          ) : (
            count !== undefined && (
              <span className="text-[12px] text-foreground/55 font-mono tabular-nums bg-foreground/[0.04] px-2 py-0.5 rounded-md">
                {count}
              </span>
            )
          )}
          {avatar !== undefined && (
            avatar ? (
              <Avatar className="w-5 h-5">
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
    <div className="transition-all">
      <div
        className="flex items-center px-1 py-2.5 cursor-pointer transition-all duration-150 rounded-lg hover:bg-foreground/[0.03] group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-shrink-0 scale-75 text-foreground/40 group-hover:text-foreground/60 transition-colors">
          {icon || (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2m0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19z" />
            </svg>
          )}
        </div>
        <div className="flex-1 w-full flex items-start flex-col gap-1">
          <p className="text-[11px] text-foreground/70 font-semibold leading-none uppercase tracking-[0.08em] group-hover:text-foreground/90 transition-colors">
            {title}
          </p>
        </div>
        <div className="flex-shrink-0 ml-2 text-foreground/40 group-hover:text-foreground/60 transition-colors">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </div>
      {isOpen && <div className="space-y-1 pl-1">{children}</div>}
    </div>
  )
}

export function ProcessPanel() {
  const [activeItem, setActiveItem] = useState("pending-loa")

  return (
    <div className="w-[380px] overflow-y-auto h-full giga-glass border-r border-border">
      <div className="flex flex-col h-full">
        <div className="relative">
          {/* Tab Header */}
          <div className="sticky top-0 z-10 p-4 bg-background/65 backdrop-blur-xl">
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
                      <X className="absolute size-3 right-10 top-1/2 -translate-y-1/2 text-foreground/35 hover:text-foreground/70 cursor-pointer transition-colors" />
                    </div>
                  </div>

                  {/* Process Groups */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="space-y-3">
                      {/* GBC Admission - Open */}
                      <Accordion type="single" collapsible defaultValue="gbc">
                        <AccordionItem
                          value="gbc"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">GBC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-0 py-0 pt-4">
                            <div className="space-y-5">
                              {/* Pending decision */}
                              <ProcessSection title="Pending decision">
                                <ProcessItem
                                  label="Priority"
                                  count={9}
                                  color="#ff6b35"
                                  avatar=""
                                />
                                <div className="my-2 border-t border-border" />
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
                                <div className="my-2 border-t border-border" />
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
                                <div className="my-2 border-t border-border" />
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
                                <div className="my-2 border-t border-white/[0.06]" />
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
                                <div className="my-2 border-t border-white/[0.06]" />
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
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">NC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
                              NC Admission process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* BVC Admission - Closed */}
                        <AccordionItem
                          value="bvc"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">BVC Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
                              BVC Admission process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Other schools Admission - Closed */}
                        <AccordionItem
                          value="other"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">Other schools Admission</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
                              Other schools process items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Admission confirmation - Closed */}
                        <AccordionItem
                          value="confirmation"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">Admission confirmation</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
                              Admission confirmation items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Admission offer status - Closed */}
                        <AccordionItem
                          value="offer-status"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">Admission offer status</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
                              Admission offer status items...
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Program switch - Closed */}
                        <AccordionItem
                          value="program-switch"
                          className="border-none rounded-2xl overflow-hidden giga-glass p-4 mb-3"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">Program switch</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="text-sm text-foreground/55">
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
                <div className="p-4 text-foreground/55">
                  Owner view content...
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
