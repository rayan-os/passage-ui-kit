"use client"

import { ChevronRight, Clock, GraduationCap, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Program } from "./types"

interface ProgramCarouselProps {
  programs: Program[]
  title?: string
  className?: string
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[220px]",
        "rounded-2xl overflow-hidden",
        "bg-white/[0.03]",
        "border border-white/[0.08]",
        "transition-all duration-200",
        "hover:bg-white/[0.05] hover:border-white/[0.12]",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20",
        "cursor-pointer group",
      )}
    >
      {/* Image */}
      <div className="relative h-[110px] overflow-hidden bg-white/[0.02]">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3.5 space-y-3">
        {/* Title */}
        <h4 className="font-semibold text-[13px] text-white leading-tight line-clamp-2 min-h-[32px]">
          {program.title}
        </h4>

        {/* Metadata chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5",
            "rounded-md",
            "bg-white/[0.06] border border-white/[0.08]",
            "text-[10px] text-white/60",
          )}>
            <Building2 className="w-3 h-3" />
            {program.school}
          </span>
          
          {program.programLevel && (
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5",
              "rounded-md",
              "bg-white/[0.06] border border-white/[0.08]",
              "text-[10px] text-white/60",
            )}>
              <GraduationCap className="w-3 h-3" />
              {program.programLevel}
            </span>
          )}
          
          {program.duration && (
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5",
              "rounded-md",
              "bg-white/[0.06] border border-white/[0.08]",
              "text-[10px] text-white/60",
            )}>
              <Clock className="w-3 h-3" />
              {program.duration}
            </span>
          )}
        </div>

        {/* CTA */}
        <button className={cn(
          "w-full flex items-center justify-center gap-1.5",
          "py-2 px-3",
          "rounded-xl",
          "bg-white/[0.06] hover:bg-white/[0.1]",
          "border border-white/[0.1] hover:border-white/[0.15]",
          "text-[12px] font-medium text-white/70 hover:text-white",
          "transition-all duration-200",
        )}>
          View details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export function ProgramCarousel({ programs, title, className }: ProgramCarouselProps) {
  if (programs.length === 0) return null

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-medium text-white/70">{title}</p>
          <span className="text-xs text-white/40">{programs.length} programs</span>
        </div>
      )}

      {/* Carousel */}
      <div className={cn(
        "flex gap-3 overflow-x-auto pb-2",
        "-mx-5 px-5", // Extend to edges
        // Hide scrollbar
        "scrollbar-none",
        "[&::-webkit-scrollbar]:hidden",
        "[-ms-overflow-style:none]",
        "[scrollbar-width:none]",
      )}>
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}
