"use client"

import { useMemo, useState } from "react"
import {
  ArrowDownZA,
  SlidersHorizontal,
  Columns3,
  MoreVertical,
  Check,
  X,
  TriangleAlert,
  Files,
  ShieldAlert,
  ChevronRight,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GradientAvatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Application {
  id: number
  program: string
  user: string
  intake: string
  age: number
  nationality: string
  residenceCountry: string
  progressionLevel: string
  progressionStatus: "success" | "warning"
  b2x: "B2B" | "B2C"
  etAtLoa: string
  etAtLoaStatus: "warning" | "black"
  offerExpiryDate: string
  studentIdOffer: string
  tuitionPaymentType: string
  studentId: string
  isDeferral: boolean
}

type RiskLevel = "Low" | "Medium" | "High"

const STAGES = [
  "Submitted",
  "Screening approved",
  "Loan approved",
  "Pending LOA",
] as const

const applications: Application[] = [
  {
    id: 1,
    program: "Construction Techniques Program (T176)",
    user: "SHIMWA Sana Prince Kelly",
    intake: "May 2026",
    age: 21,
    nationality: "rw",
    residenceCountry: "rw",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "1D:19H:30M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101602067",
    isDeferral: true,
  },
  {
    id: 2,
    program: "Cloud Computing Technologies Program (Postgraduate) – (T465)",
    user: "Abdulqawiy Oladuntoye",
    intake: "May 2026",
    age: 29,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "1D:19H:28M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101579877",
    isDeferral: true,
  },
  {
    id: 3,
    program: "Early Childhood Education Program – (C100)",
    user: "mehak na",
    intake: "May 2026",
    age: 19,
    nationality: "in",
    residenceCountry: "in",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "1D:19H:06M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101645274",
    isDeferral: true,
  },
  {
    id: 4,
    program: "Applied A.I. Solutions Development Program (Postgraduate) – (T431)",
    user: "Rukundo fidele",
    intake: "May 2026",
    age: 25,
    nationality: "rw",
    residenceCountry: "rw",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:19H:03M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101627970",
    isDeferral: true,
  },
  {
    id: 5,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Matthew Oyero",
    intake: "Sep 2026",
    age: 30,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "1D:19H:01M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101623633",
    isDeferral: true,
  },
  {
    id: 6,
    program: "Computer Systems Technician – (T141)",
    user: "Mitchell Owiredu",
    intake: "Sep 2026",
    age: 26,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "1D:19H:00M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101587405",
    isDeferral: true,
  },
  {
    id: 7,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Benedicta Dwomoh",
    intake: "Sep 2026",
    age: 32,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:18H:58M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Pay directly to school",
    studentId: "101638837",
    isDeferral: true,
  },
  {
    id: 8,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Bettina Donkor",
    intake: "Sep 2026",
    age: 29,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:22H:27M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101629242",
    isDeferral: true,
  },
  {
    id: 9,
    program: "Cloud Computing Technologies Program (Postgraduate) – (T465)",
    user: "Paul olanrewaju Banjo",
    intake: "May 2026",
    age: 29,
    nationality: "ng",
    residenceCountry: "za",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:22H:07M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Pay directly to school",
    studentId: "101637459",
    isDeferral: true,
  },
  {
    id: 10,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "RACHEAL ADOMAKO",
    intake: "Sep 2026",
    age: 23,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:21H:59M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101616881",
    isDeferral: true,
  },
  {
    id: 11,
    program: "Computer Programming - Low Code Program (T189)",
    user: "Igiraneza Deborah",
    intake: "Sep 2026",
    age: 22,
    nationality: "rw",
    residenceCountry: "rw",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:21H:52M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101636469",
    isDeferral: true,
  },
  {
    id: 12,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Ashley Owusu",
    intake: "Sep 2026",
    age: 25,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "1D:21H:39M",
    etAtLoaStatus: "warning",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: true,
  },
  {
    id: 13,
    program: "Applied A.I. Solutions Development Program (Postgraduate) – (T431)",
    user: "Moore Luke Takudzwa Mutanga",
    intake: "Sep 2026",
    age: 26,
    nationality: "zw",
    residenceCountry: "ae",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "11D:23H:01M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101648481",
    isDeferral: true,
  },
  {
    id: 14,
    program: "Construction Engineering Technician – (T161)",
    user: "Olamide Olatunji",
    intake: "Sep 2026",
    age: 27,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "26D:10H:19M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 15,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Roselyn Gororo",
    intake: "Sep 2026",
    age: 37,
    nationality: "zw",
    residenceCountry: "zw",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "26D:01H:48M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Pay directly to school",
    studentId: "101627349",
    isDeferral: true,
  },
  {
    id: 16,
    program: "Computer Systems Technician – (T141)",
    user: "ESRA KIBET",
    intake: "Sep 2026",
    age: 21,
    nationality: "ke",
    residenceCountry: "ke",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "26D:11H:09M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Pay directly to school",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 17,
    program: "Construction Techniques Program (T176)",
    user: "Bahati Musa",
    intake: "May 2026",
    age: 18,
    nationality: "ug",
    residenceCountry: "ug",
    progressionLevel: "Submitted",
    progressionStatus: "warning",
    b2x: "B2C",
    etAtLoa: "26D:15H:26M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 18,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Dismas Musebe",
    intake: "Sep 2026",
    age: 36,
    nationality: "ke",
    residenceCountry: "ke",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "41D:19H:51M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Pay directly to school",
    studentId: "101634966",
    isDeferral: true,
  },
  {
    id: 19,
    program: "Practical Nursing Program (PN) – (S121)",
    user: "Samuella Nana Akua Amusah",
    intake: "May 2026",
    age: 18,
    nationality: "gh",
    residenceCountry: "gh",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "26D:12H:48M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101657854",
    isDeferral: false,
  },
  {
    id: 20,
    program: "Information Systems Business Analysis Program (With Experiential Learning Capstone) (Postgraduate) – (T405)",
    user: "Violet Musarurwa",
    intake: "Sep 2026",
    age: 30,
    nationality: "zw",
    residenceCountry: "zw",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "21D:01H:51M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101646635",
    isDeferral: true,
  },
  {
    id: 21,
    program: "Personal Support Worker Program (PSW) – (C112)",
    user: "Amodu mosunmola khafilat",
    intake: "Sep 2026",
    age: 30,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "21D:01H:39M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101638201",
    isDeferral: true,
  },
  {
    id: 22,
    program: "Electrical Techniques Program – (T167)",
    user: "PAUL MOSE",
    intake: "May 2026",
    age: 34,
    nationality: "ke",
    residenceCountry: "ke",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "26D:01H:23M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: true,
  },
  {
    id: 23,
    program: "Early Childhood Education Program – (C100)",
    user: "Emilia Tatenda Saruchera",
    intake: "Sep 2026",
    age: 25,
    nationality: "zw",
    residenceCountry: "zw",
    progressionLevel: "Loan approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "62D:03H:18M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101638825",
    isDeferral: true,
  },
  {
    id: 24,
    program: "Plumbing Techniques Program – (T165)",
    user: "nevaeh salazar",
    intake: "Sep 2026",
    age: 23,
    nationality: "us",
    residenceCountry: "us",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "32D:23H:11M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 25,
    program: "Construction Techniques Program (T176)",
    user: "OLANIYI OLAWALE OLUWAPELUMI",
    intake: "May 2026",
    age: 29,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Loan approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "69D:22H:08M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101646524",
    isDeferral: true,
  },
  {
    id: 26,
    program: "Early Childhood Education Program – (C100)",
    user: "Brenda Alice Namugenyi",
    intake: "May 2026",
    age: 25,
    nationality: "ug",
    residenceCountry: "ug",
    progressionLevel: "Loan approved",
    progressionStatus: "success",
    b2x: "B2C",
    etAtLoa: "76D:20H:57M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 27,
    program: "Information Systems Business Analysis Program (With Experiential Learning Capstone) (Postgraduate) – (T405)",
    user: "Assumpta Chinenye Ilorah",
    intake: "May 2026",
    age: 29,
    nationality: "ng",
    residenceCountry: "ng",
    progressionLevel: "Screening approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "27D:19H:22M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "N/A",
    isDeferral: false,
  },
  {
    id: 28,
    program: "Information Systems Business Analysis Program (With Experiential Learning Capstone) (Postgraduate) – (T405)",
    user: "Erica Marweyi Kamwoto",
    intake: "May 2026",
    age: 29,
    nationality: "zw",
    residenceCountry: "zw",
    progressionLevel: "Loan approved",
    progressionStatus: "success",
    b2x: "B2B",
    etAtLoa: "55D:19H:53M",
    etAtLoaStatus: "black",
    offerExpiryDate: "-",
    studentIdOffer: "N/A",
    tuitionPaymentType: "Passage loan",
    studentId: "101646442",
    isDeferral: false,
  },
]

function countryCodeToFlagEmoji(code: string) {
  const cleaned = (code || "").trim().toUpperCase()
  if (cleaned.length !== 2) return "🏳"
  const A = 65
  const base = 0x1f1e6
  const first = cleaned.charCodeAt(0) - A
  const second = cleaned.charCodeAt(1) - A
  if (first < 0 || first > 25 || second < 0 || second > 25) return "🏳"
  return String.fromCodePoint(base + first, base + second)
}

function CountryFlag({ code }: { code: string }) {
  const flag = countryCodeToFlagEmoji(code)
  return (
    <span
      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-[5px] bg-foreground/[0.04] ring-1 ring-border text-[12px] leading-none"
      aria-label={code.toUpperCase()}
      title={code.toUpperCase()}
    >
      {flag}
    </span>
  )
}

function riskFromApp(app: Application): RiskLevel {
  if (app.progressionStatus === "warning") return "High"
  if (app.etAtLoaStatus === "warning") return "Medium"
  return "Low"
}

function riskChipTone(risk: RiskLevel) {
  switch (risk) {
    case "High":
      return "text-amber-700 dark:text-amber-300 bg-amber-500/[0.10] dark:bg-amber-500/[0.12] border-amber-500/[0.18]"
    case "Medium":
      return "text-foreground/80 bg-foreground/[0.04] border-border"
    default:
      return "text-foreground/70 bg-foreground/[0.03] border-border"
  }
}

function KpiChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 h-9",
        "bg-card/60 backdrop-blur-xl shadow-giga-sm",
        "text-sm font-semibold tabular-nums",
        "border-border text-foreground/80"
      )}
    >
      <span className="text-foreground/55">{icon}</span>
      <span className="text-foreground/60 font-medium">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

function StagePill({
  value,
  onChange,
}: {
  value: string
  onChange: (next: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2",
            "h-7 px-3 rounded-full border border-border",
            "bg-foreground/[0.04] text-foreground/90 font-semibold text-[12px]",
            "hover:bg-foreground/[0.06] transition-colors"
          )}
          title="Change stage"
        >
          <span className="truncate max-w-[180px]">{value}</span>
          <ChevronRight className="h-3.5 w-3.5 text-foreground/40 rotate-90" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Change stage</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STAGES.map((s) => (
          <DropdownMenuItem key={s} onSelect={() => onChange(s)}>
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CasePanel({
  app,
  open,
  onClose,
}: {
  app: Application | null
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-4 top-4 bottom-4 w-[520px] max-w-[calc(100vw-2rem)] giga-glass rounded-[28px] overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-border bg-card/60 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <GradientAvatar
                name={app?.user || "Applicant"}
                size="lg"
                className="ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-[16px] font-semibold text-foreground truncate">
                    {app?.user || "Applicant"}
                  </div>
                  {app?.progressionLevel ? (
                    <Badge
                      variant="secondary"
                      shape="pill"
                      className="border border-border bg-foreground/[0.04] text-foreground/80"
                    >
                      {app.progressionLevel}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-1 text-sm text-foreground/55 truncate">
                  {app?.program || ""}
                </div>
              </div>
              <Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="px-5 pt-4 flex-1 min-h-0">
            <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="docs">Docs</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="audit">Audit</TabsTrigger>
              </TabsList>

              <div className="pt-4 pb-5 overflow-y-auto flex-1 min-h-0">
                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-card/60 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                        SLA
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-foreground/50" />
                        <div className="font-semibold text-foreground">
                          {app?.etAtLoa || "—"}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/60 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                        Payment
                      </div>
                      <div className="mt-2 text-foreground font-semibold">
                        {app?.tuitionPaymentType || "—"}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/60 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                        Applicant details
                      </div>
                      <div className="mt-2 text-sm text-foreground/80 space-y-1">
                        <div>
                          Intake:{" "}
                          <span className="font-semibold text-foreground">{app?.intake}</span>
                        </div>
                        <div>
                          Age:{" "}
                          <span className="font-mono tabular-nums text-foreground">{app?.age}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Nationality:</span>
                          {app?.nationality ? <CountryFlag code={app.nationality} /> : null}
                          <span className="font-mono text-xs text-foreground/70">
                            {app?.nationality?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Residence:</span>
                          {app?.residenceCountry ? <CountryFlag code={app.residenceCountry} /> : null}
                          <span className="font-mono text-xs text-foreground/70">
                            {app?.residenceCountry?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/60 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                        IDs & flags
                      </div>
                      <div className="mt-2 text-sm text-foreground/80 space-y-1">
                        <div>
                          Student ID:{" "}
                          <span className="font-mono tabular-nums text-foreground">
                            {app?.studentId || "—"}
                          </span>
                        </div>
                        <div>
                          Deferral:{" "}
                          <span className="font-semibold text-foreground">
                            {app?.isDeferral ? "Yes" : "No"}
                          </span>
                        </div>
                        <div>
                          Offer expiry:{" "}
                          <span className="font-semibold text-foreground">
                            {app?.offerExpiryDate || "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border bg-card/60 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                      Timeline
                    </div>
                    <div className="mt-3 text-sm text-foreground/55">
                      No timeline events in this demo.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="mt-0">
                  <div className="rounded-2xl border border-border bg-card/60 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                      Documents
                    </div>
                    <div className="mt-3 text-sm text-foreground/55">
                      No documents connected in this demo.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="messages" className="mt-0">
                  <div className="rounded-2xl border border-border bg-card/60 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                      Messages
                    </div>
                    <div className="mt-3 text-sm text-foreground/55">
                      No messages in this demo.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="audit" className="mt-0">
                  <div className="rounded-2xl border border-border bg-card/60 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/50">
                      Audit log
                    </div>
                    <div className="mt-3 text-sm text-foreground/55">
                      No audit events in this demo.
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ApplicationsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [query, setQuery] = useState("")
  const [density, setDensity] = useState<"compact" | "comfortable">("compact")
  const [stageOverride, setStageOverride] = useState<Record<number, string>>({})
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null)

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const filtered = applications.filter((app) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      app.program.toLowerCase().includes(q) ||
      app.user.toLowerCase().includes(q) ||
      app.intake.toLowerCase().includes(q) ||
      app.tuitionPaymentType.toLowerCase().includes(q)
    )
  })

  const selectedApp = useMemo(() => {
    if (selectedAppId == null) return null
    return applications.find((a) => a.id === selectedAppId) || null
  }, [selectedAppId])

  const kpis = useMemo(() => {
    const inView = filtered
    const slaRisk = inView.filter((a) => a.etAtLoaStatus === "warning").length
    const policyConflicts = inView.filter((a) => a.progressionStatus === "warning").length
    const missingDocs = Math.max(0, Math.round(inView.length * 0.43))
    return { slaRisk, missingDocs, policyConflicts }
  }, [filtered])

  const filteredIdSet = new Set(filtered.map((a) => a.id))
  const selectedInView = selectedRows.filter((id) => filteredIdSet.has(id))
  const allInViewSelected =
    filtered.length > 0 && selectedInView.length === filtered.length

  return (
    <div className="w-full h-full min-h-0 flex flex-col px-6 py-6 gap-4">
      {/* Header */}
      <div className="flex flex-row items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-[34px] leading-[1.05] font-semibold tracking-tight text-foreground">
              {filtered.length}
              <span className="text-foreground/70 font-semibold"> applications</span>
            </h4>
            <Badge
              variant="secondary"
              shape="pill"
              className="border border-border bg-foreground/[0.04] text-foreground/80"
            >
              Pending LOA queue
            </Badge>
            {query.trim() ? (
              <span className="text-sm text-foreground/45">Filtered</span>
            ) : null}
          </div>
          <div className="mt-2 text-sm text-foreground/55">
            Keep the table clean; open a case panel for full context.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-end">
          <KpiChip icon={<Clock className="h-4 w-4" />} label="SLA risk" value={kpis.slaRisk} />
          <KpiChip icon={<Files className="h-4 w-4" />} label="Missing docs" value={kpis.missingDocs} />
          <KpiChip icon={<ShieldAlert className="h-4 w-4" />} label="Policy conflicts" value={kpis.policyConflicts} />

          <Button variant="secondary" size="default" className="gap-2">
            <ArrowDownZA className="h-4 w-4" />
            <span>Created date</span>
          </Button>
          <Button variant="secondary" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="secondary" size="icon" aria-label="Columns">
            <Columns3 className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button variant="secondary" size="icon" aria-label="More">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-1 min-w-[260px] max-w-[520px]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search program, applicant, intake, payment…"
            aria-label="Search applications"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-lg border border-border bg-foreground/[0.03] p-0.5">
            <button
              type="button"
              onClick={() => setDensity("compact")}
              className={cn(
                "h-8 px-3 rounded-md text-xs font-semibold transition-colors",
                density === "compact"
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]"
              )}
            >
              Compact
            </button>
            <button
              type="button"
              onClick={() => setDensity("comfortable")}
              className={cn(
                "h-8 px-3 rounded-md text-xs font-semibold transition-colors",
                density === "comfortable"
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06]"
              )}
            >
              Comfortable
            </button>
          </div>

          {query.trim() ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setQuery("")}
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      {/* Table */}
      <div className="w-full flex-1 min-h-0 rounded-2xl giga-glass overflow-hidden">
        <div className="w-full h-full overflow-auto">
          <Table className="min-w-[1120px]" data-density={density}>
            <TableHeader className="sticky top-0 z-10 bg-card/70 backdrop-blur-xl">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-12">
                  <Checkbox
                    checked={allInViewSelected}
                    onCheckedChange={() => {
                      if (allInViewSelected) {
                        setSelectedRows((prev) =>
                          prev.filter((id) => !filteredIdSet.has(id))
                        )
                      } else {
                        setSelectedRows((prev) => {
                          const set = new Set(prev)
                          for (const a of filtered) set.add(a.id)
                          return Array.from(set)
                        })
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="min-w-[300px]">Program</TableHead>
                <TableHead className="min-w-[200px]">Applicant</TableHead>
                <TableHead className="min-w-[220px]">Stage</TableHead>
                <TableHead className="min-w-[110px]">SLA</TableHead>
                <TableHead className="min-w-[120px]">Risk</TableHead>
                <TableHead className="min-w-[200px]">Payment</TableHead>
                <TableHead className="min-w-[220px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell className="py-10" colSpan={8}>
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <div className="text-sm font-semibold text-foreground">
                        No results
                      </div>
                      <div className="text-sm text-foreground/55">
                        Try a different search term.
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((app) => (
                  <TableRow
                    key={app.id}
                    data-state={
                      selectedRows.includes(app.id) ? "selected" : undefined
                    }
                    className="transition-all duration-150 group cursor-pointer"
                    onClick={(e) => {
                      const target = e.target as HTMLElement
                      if (target.closest('button,[role="checkbox"]')) return
                      setSelectedAppId(app.id)
                    }}
                  >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(app.id)}
                      onCheckedChange={() => toggleRow(app.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <GradientAvatar
                        name={app.program}
                        size="sm"
                        className="flex-shrink-0 ring-1 ring-border"
                      />
                      <span className="truncate text-foreground/90 font-medium">
                        {app.program}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-semibold">
                    <span className="truncate inline-block max-w-[240px]">{app.user}</span>
                  </TableCell>
                  <TableCell>
                    <StagePill
                      value={stageOverride[app.id] ?? app.progressionLevel}
                      onChange={(next) =>
                        setStageOverride((prev) => ({ ...prev, [app.id]: next }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2",
                        "font-mono tabular-nums text-[13px]",
                        app.etAtLoaStatus === "warning"
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-foreground/70"
                      )}
                      title="ET @ LOA"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          app.etAtLoaStatus === "warning"
                            ? "bg-amber-500/70"
                            : "bg-foreground/25"
                        )}
                      />
                      {app.etAtLoa}
                    </span>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const risk = riskFromApp(app)
                      return (
                        <span
                          className={cn(
                            "inline-flex items-center h-7 px-3 rounded-full border text-[12px] font-semibold",
                            riskChipTone(risk)
                          )}
                          title="Risk level"
                        >
                          Risk {risk}
                        </span>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="text-foreground/80">
                    <span className="truncate inline-block max-w-[260px]">
                      {app.tuitionPaymentType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {/* Tiny indicators (tooltip via title) */}
                      {app.isDeferral ? (
                        <div
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-foreground/[0.04] border border-border text-foreground/55"
                          title="Deferral"
                        >
                          <TriangleAlert className="h-4 w-4" />
                        </div>
                      ) : null}
                      {app.etAtLoaStatus === "warning" ? (
                        <div
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/[0.10] border border-amber-500/[0.18] text-amber-700 dark:text-amber-300"
                          title="SLA risk"
                        >
                          <Clock className="h-4 w-4" />
                        </div>
                      ) : null}

                      {/* Quick actions on hover */}
                      <div className="hidden md:flex items-center gap-2 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedAppId(app.id)
                          }}
                        >
                          Open
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          Request docs
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          Approve
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open case"
                        className="h-9 w-9"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAppId(app.id)
                        }}
                      >
                        <ChevronRight className="h-4 w-4 text-foreground/60" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CasePanel app={selectedApp} open={selectedAppId != null} onClose={() => setSelectedAppId(null)} />
    </div>
  )
}
