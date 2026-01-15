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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { GlassPill, GlassSurface } from "@/components/ui/glass"

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

function CountryFlag({ code }: { code: string }) {
  return (
    <img
      src={`https://kapowaz.github.io/square-flags/flags/${code}.svg`}
      width={18}
      className="rounded-[3px] overflow-clip ring-1 ring-white/[0.08]"
      alt={code}
    />
  )
}

export function ApplicationsTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === applications.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(applications.map((a) => a.id))
    }
  }

  return (
    <div className="px-6 w-full gap-4 flex flex-col">
      {/* Header */}
      <div className="flex flex-row items-center w-full pt-6">
        <div className="flex-1 flex flex-col gap-1">
          <h4 className="text-[20px] leading-6 font-semibold tracking-tight text-white">
            33 applications
          </h4>
          <p className="text-sm text-white/55">
            Pending LOA queue
          </p>
        </div>
        <div className="flex-1 flex items-center gap-2 justify-end">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="glass"
              size="default"
              className="gap-2"
            >
              <ArrowDownZA className="h-4 w-4" />
              <span>Created date</span>
            </Button>
            <Button variant="glass" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="glass" size="icon">
              <Columns3 className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <GlassSurface
        variant="elevated"
        blur="light"
        radius="lg"
        className="w-full h-[calc(100vh-156px)] overflow-hidden [--glass-bg:rgba(18,18,18,0.56)] [--glass-border:rgba(255,255,255,0.10)]"
      >
        <div className="w-full h-full overflow-x-auto overflow-y-auto">
          <Table className="min-w-[1400px]">
            <TableHeader className="sticky top-0 bg-[rgba(18,18,18,0.70)] backdrop-blur-[12px] z-10">
              <TableRow className="hover:bg-transparent border-white/[0.06]">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === applications.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="min-w-[280px]">Program</TableHead>
                <TableHead className="min-w-[180px]">User</TableHead>
                <TableHead className="min-w-[90px]">Intake</TableHead>
                <TableHead className="min-w-[50px]">Age</TableHead>
                <TableHead className="min-w-[50px]">Nat.</TableHead>
                <TableHead className="min-w-[50px]">Res.</TableHead>
                <TableHead className="min-w-[160px]">Progression</TableHead>
                <TableHead className="min-w-[60px]">B2X</TableHead>
                <TableHead className="min-w-[110px]">ET @ LOA</TableHead>
                <TableHead className="min-w-[130px]">Payment</TableHead>
                <TableHead className="min-w-[100px]">Student ID</TableHead>
                <TableHead className="min-w-[70px]">Deferral</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow
                  key={app.id}
                  className={cn(
                    "transition-all duration-150",
                    selectedRows.includes(app.id) && "bg-white/[0.06]"
                  )}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(app.id)}
                      onCheckedChange={() => toggleRow(app.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="h-5 w-5 flex-shrink-0 rounded ring-1 ring-white/[0.08]">
                        <AvatarImage
                          src="https://app.passage.com/cdn-images/partners/george-brown-college.jpeg/256"
                          alt="George Brown College"
                          className="object-contain"
                        />
                      </Avatar>
                      <span className="truncate text-white/90 text-[13px]">{app.program}</span>
                    </div>
                  </TableCell>
                  <TableCell>{app.user}</TableCell>
                  <TableCell>{app.intake}</TableCell>
                  <TableCell className="font-mono">{app.age}</TableCell>
                  <TableCell>
                    <CountryFlag code={app.nationality} />
                  </TableCell>
                  <TableCell>
                    <CountryFlag code={app.residenceCountry} />
                  </TableCell>
                  <TableCell>
                    <GlassPill
                      tone={app.progressionStatus === "success" ? "success" : "warning"}
                      size="md"
                      className="uppercase"
                    >
                      <span className="inline-block rounded-full mr-0.5 shrink-0 bg-current w-1 h-1" />
                      {app.progressionLevel}
                    </GlassPill>
                  </TableCell>
                  <TableCell>
                    <GlassPill tone={app.b2x === "B2B" ? "info" : "accent"} size="md">
                      {app.b2x}
                    </GlassPill>
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
                  <TableCell className="font-mono text-[12px]">{app.studentId}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassSurface>
    </div>
  )
}
