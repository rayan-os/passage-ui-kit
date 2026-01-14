"use client"

import { useState } from "react"
import {
  ArrowDownZA,
  SlidersHorizontal,
  Columns3,
  MoreVertical,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GradientAvatar } from "@/components/ui/avatar"
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
      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-[5px] bg-white/[0.04] ring-1 ring-white/[0.10] text-[12px] leading-none"
      aria-label={code.toUpperCase()}
      title={code.toUpperCase()}
    >
      {flag}
    </span>
  )
}

export function ApplicationsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [query, setQuery] = useState("")
  const [density, setDensity] = useState<"compact" | "comfortable">("compact")

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

  const filteredIdSet = new Set(filtered.map((a) => a.id))
  const selectedInView = selectedRows.filter((id) => filteredIdSet.has(id))
  const allInViewSelected =
    filtered.length > 0 && selectedInView.length === filtered.length

  return (
    <div className="w-full h-full min-h-0 flex flex-col px-6 py-6 gap-4">
      {/* Header */}
      <div className="flex flex-row items-start gap-4">
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <h4 className="text-[20px] leading-[1.2] font-semibold tracking-tight text-white">
            {filtered.length} applications
          </h4>
          <p className="text-sm text-white/55">
            Pending LOA queue
            {query.trim() ? (
              <span className="text-white/40"> · filtered</span>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-end">
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
          <div className="inline-flex items-center rounded-lg border border-white/[0.10] bg-white/[0.04] p-0.5">
            <button
              type="button"
              onClick={() => setDensity("compact")}
              className={cn(
                "h-8 px-3 rounded-md text-xs font-semibold transition-colors",
                density === "compact"
                  ? "bg-white text-[#0a0a0a]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
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
                  ? "bg-white text-[#0a0a0a]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
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
      <div className="w-full flex-1 min-h-0 rounded-2xl border border-white/[0.08] bg-giga-panel overflow-hidden">
        <div className="w-full h-full overflow-auto">
          <Table className="min-w-[1400px]" data-density={density}>
            <TableHeader className="sticky top-0 bg-giga-panel z-10">
              <TableRow className="hover:bg-transparent border-white/[0.06]">
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
                <TableHead className="min-w-[280px]">Program</TableHead>
                <TableHead className="min-w-[180px]">Applicant</TableHead>
                <TableHead className="min-w-[90px]">Intake</TableHead>
                <TableHead className="min-w-[50px] text-right">Age</TableHead>
                <TableHead className="min-w-[50px]">Nat.</TableHead>
                <TableHead className="min-w-[50px]">Res.</TableHead>
                <TableHead className="min-w-[160px]">Progression</TableHead>
                <TableHead className="min-w-[60px]">B2X</TableHead>
                <TableHead className="min-w-[110px]">ET @ LOA</TableHead>
                <TableHead className="min-w-[130px]">Payment</TableHead>
                <TableHead className="min-w-[110px]">Student ID</TableHead>
                <TableHead className="min-w-[70px]">Deferral</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell className="py-10" colSpan={13}>
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <div className="text-sm font-semibold text-white">
                        No results
                      </div>
                      <div className="text-sm text-white/55">
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
                    className="transition-all duration-150"
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
                        className="flex-shrink-0 ring-1 ring-white/[0.10]"
                      />
                      <span className="truncate text-white/90">
                        {app.program}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/90">
                    {app.user}
                  </TableCell>
                  <TableCell>{app.intake}</TableCell>
                  <TableCell className="font-mono tabular-nums text-right">
                    {app.age}
                  </TableCell>
                  <TableCell>
                    <CountryFlag code={app.nationality} />
                  </TableCell>
                  <TableCell>
                    <CountryFlag code={app.residenceCountry} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={app.progressionStatus === "success" ? "success" : "warning"}
                      size="sm"
                      className="uppercase tracking-wider"
                    >
                      <span className="inline-block rounded-full mr-1.5 shrink-0 bg-current w-1 h-1" />
                      {app.progressionLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={app.b2x === "B2B" ? "info" : "accent"}
                      shape="pill"
                      size="sm"
                    >
                      {app.b2x}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full flex-shrink-0",
                          app.etAtLoaStatus === "warning"
                            ? "bg-amber-400"
                            : "bg-white/30"
                        )}
                      />
                      <span className="font-mono text-xs truncate">{app.etAtLoa}</span>
                    </div>
                  </TableCell>
                  <TableCell>{app.tuitionPaymentType}</TableCell>
                  <TableCell className="font-mono text-[12px] tabular-nums">
                    {app.studentId}
                  </TableCell>
                  <TableCell>
                    {app.isDeferral ? (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/[0.12]">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.04]">
                        <X className="h-3 w-3 text-white/30" />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
