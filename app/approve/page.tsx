"use client"

import * as React from "react"
import { CheckCircle2, CircleDot, FileText, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GlassContainer, GlassPill, GlassSurface } from "@/components/ui/glass"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Risk = "Low" | "Medium" | "High"
type DecisionStatus = "Decision ready" | "Needs info" | "Escalated"

type DecisionItem = {
  id: string
  applicant: string
  program: string
  risk: Risk
  missingItems: number
  status: DecisionStatus
  recommendation: "Approve" | "Reject" | "Request info" | "Send to human review"
  confidence: number // 0..1
  reasons: string[]
  fields: {
    identity: string
    english: string
    transcript: string
    intake: string
    province: string
  }
  audit: string[]
  rules: string[]
  flags: string[]
}

const queue: DecisionItem[] = [
  {
    id: "PA-10428",
    applicant: "Alex Mwangi",
    program: "Computer Programming (T189)",
    risk: "Low",
    missingItems: 0,
    status: "Decision ready",
    recommendation: "Approve",
    confidence: 0.92,
    reasons: ["Identity verified", "English score meets cutoff", "Transcript aligns with program level"],
    fields: {
      identity: "Verified (passport + selfie match)",
      english: "IELTS 7.0 (L7/R7/W6.5/S7)",
      transcript: "Strong CS fundamentals; GPA equivalent 3.4",
      intake: "May 2026",
      province: "Ontario",
    },
    audit: ["Checked document completeness", "Validated identity match", "Reviewed English score report"],
    rules: ["EN_SCORE_MIN_OK", "DOCS_COMPLETE", "TRANSCRIPT_LEVEL_MATCH"],
    flags: ["None"],
  },
  {
    id: "PA-10431",
    applicant: "Grace Njoroge",
    program: "Cloud Computing Technologies (PG) (T465)",
    risk: "Medium",
    missingItems: 1,
    status: "Needs info",
    recommendation: "Request info",
    confidence: 0.74,
    reasons: ["Bank statement missing last page", "English score OK", "Transcript acceptable"],
    fields: {
      identity: "Verified (ID + selfie match)",
      english: "Duolingo 125",
      transcript: "Good standing; missing course descriptions",
      intake: "May 2026",
      province: "Ontario",
    },
    audit: ["Checked financial proof", "Validated identity match", "Reviewed transcript summary"],
    rules: ["FIN_PROOF_REQUIRED", "EN_SCORE_MIN_OK", "TRANSCRIPT_LEVEL_MATCH"],
    flags: ["Missing financial page"],
  },
  {
    id: "PA-10436",
    applicant: "Hassan Ali",
    program: "Applied A.I. Solutions (T431)",
    risk: "High",
    missingItems: 2,
    status: "Escalated",
    recommendation: "Send to human review",
    confidence: 0.58,
    reasons: ["Name mismatch across documents", "English score borderline", "Transcript needs manual review"],
    fields: {
      identity: "Mismatch (document name variants)",
      english: "IELTS 6.0 (W5.5)",
      transcript: "Transcript legibility issues; manual review needed",
      intake: "Sep 2026",
      province: "Ontario",
    },
    audit: ["Detected identity inconsistencies", "Reviewed score thresholds", "Flagged transcript quality"],
    rules: ["ID_NAME_MATCH", "EN_SCORE_MIN_OK", "TRANSCRIPT_READABLE"],
    flags: ["Name mismatch", "Transcript scan quality"],
  },
  // Additional realistic rows (15–20 total)
  ...Array.from({ length: 16 }).map((_, i) => {
    const n = i + 1
    const risk: Risk = n % 7 === 0 ? "High" : n % 3 === 0 ? "Medium" : "Low"
    const missing = risk === "Low" ? (n % 5 === 0 ? 1 : 0) : risk === "Medium" ? (n % 2) + 1 : 2
    const status: DecisionStatus =
      risk === "High" ? "Escalated" : missing > 0 ? "Needs info" : "Decision ready"
    const rec =
      status === "Decision ready"
        ? "Approve"
        : status === "Needs info"
          ? "Request info"
          : "Send to human review"
    return {
      id: `PA-10${440 + n}`,
      applicant: [
        "Samuel Owusu",
        "Emilia Saruchera",
        "Bettina Donkor",
        "Rukundo Fidele",
        "Violet Musarurwa",
        "Abdulqawiy Oladuntoye",
        "Mitchell Owiredu",
        "Deborah Igiraneza",
      ][n % 8],
      program: [
        "Computer Systems Technician (T141)",
        "Information Systems Business Analysis (T405)",
        "Practical Nursing (S121)",
        "Construction Techniques (T176)",
        "Early Childhood Education (C100)",
      ][n % 5],
      risk,
      missingItems: missing,
      status,
      recommendation: rec as DecisionItem["recommendation"],
      confidence: status === "Decision ready" ? 0.88 : status === "Needs info" ? 0.72 : 0.61,
      reasons:
        status === "Decision ready"
          ? ["Documents complete", "English score meets cutoff", "Transcript level match"]
          : status === "Needs info"
            ? ["Minor missing item", "English score OK", "Transcript acceptable"]
            : ["Requires manual review", "Inconsistency flagged", "Additional verification needed"],
      fields: {
        identity: risk === "High" ? "Review required" : "Verified",
        english: ["IELTS 6.5", "IELTS 7.0", "Duolingo 120", "TOEFL 92"][n % 4],
        transcript: risk === "High" ? "Manual review needed" : "Summary OK",
        intake: n % 2 === 0 ? "May 2026" : "Sep 2026",
        province: "Ontario",
      },
      audit: ["Checked completeness", "Validated identity", "Reviewed evidence"],
      rules: ["DOCS_COMPLETE", "EN_SCORE_MIN_OK", "TRANSCRIPT_LEVEL_MATCH"],
      flags: risk === "High" ? ["Inconsistency flagged"] : missing > 0 ? ["Missing item"] : ["None"],
    } satisfies DecisionItem
  }),
]

function riskTone(risk: Risk): React.ComponentProps<typeof GlassPill>["tone"] {
  if (risk === "Low") return "success"
  if (risk === "Medium") return "warning"
  return "purple"
}

function statusTone(status: DecisionStatus): React.ComponentProps<typeof GlassPill>["tone"] {
  if (status === "Decision ready") return "success"
  if (status === "Needs info") return "warning"
  return "purple"
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

export default function ApprovePage() {
  const [selectedId, setSelectedId] = React.useState(queue[0].id)
  const selected = React.useMemo(
    () => queue.find((q) => q.id === selectedId) ?? queue[0],
    [selectedId]
  )

  return (
    <GlassContainer density="subtle" className="min-h-screen">
      <main className="min-h-screen liquid-bg relative">
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[20px] font-semibold tracking-tight text-white">
                Decision dashboard
              </div>
              <div className="mt-1 text-[13px] text-white/55">
                Review decisions, see evidence, approve in seconds.
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-6">
            {/* Queue */}
            <GlassSurface
              variant="elevated"
              blur="regular"
              radius="sm"
              className={cn(
                "overflow-hidden",
                "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)]"
              )}
            >
              <div className="px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
                    Decision-ready queue
                  </div>
                  <div className="text-[11px] text-white/45">{queue.length} items</div>
                </div>
              </div>

              <div className="h-[740px] overflow-y-auto no-scrollbar">
                <Table>
                  <TableHeader className="sticky top-0 bg-[rgba(18,18,18,0.72)] backdrop-blur-[12px] z-10">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="min-w-[160px]">Applicant</TableHead>
                      <TableHead className="min-w-[220px]">Program</TableHead>
                      <TableHead className="min-w-[70px]">Risk</TableHead>
                      <TableHead className="min-w-[90px]">Missing</TableHead>
                      <TableHead className="min-w-[140px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queue.map((row) => (
                      <TableRow
                        key={row.id}
                        className={cn(
                          "cursor-pointer",
                          selectedId === row.id &&
                            "bg-white/[0.06] hover:bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(197,204,195,0.16)]"
                        )}
                        onClick={() => setSelectedId(row.id)}
                      >
                        <TableCell className="font-medium text-white/90">
                          <div className="flex flex-col">
                            <span className="truncate">{row.applicant}</span>
                            <span className="text-[11px] text-white/40 font-mono">{row.id}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white/80">{row.program}</TableCell>
                        <TableCell className="min-w-[86px] max-w-none overflow-visible whitespace-nowrap text-clip">
                          <div className="inline-flex">
                            <GlassPill
                              tone={riskTone(row.risk)}
                              size="sm"
                              className="rounded-md whitespace-nowrap"
                            >
                              {row.risk}
                            </GlassPill>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-white/75">{row.missingItems}</TableCell>
                        <TableCell className="min-w-[130px] max-w-none overflow-visible whitespace-nowrap text-clip">
                          <div className="inline-flex">
                            <GlassPill
                              tone={statusTone(row.status)}
                              size="sm"
                              className="rounded-md whitespace-nowrap"
                            >
                              {row.status}
                            </GlassPill>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GlassSurface>

            {/* Decision panel */}
            <div className="space-y-6">
              <GlassSurface
                variant="elevated"
                blur="regular"
                radius="sm"
                className={cn(
                  "p-4",
                  "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-white tracking-tight">
                      {selected.applicant}
                    </div>
                    <div className="mt-1 text-[12px] text-white/55">
                      {selected.program} · <span className="font-mono text-white/45">{selected.id}</span>
                    </div>
                  </div>
                  <GlassPill tone={statusTone(selected.status)} size="md">
                    <CircleDot className="h-4 w-4" />
                    {selected.status}
                  </GlassPill>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-5">
                  <div>
                    <div className="mt-2 text-[13px] text-white/80 leading-6">
                      Recommendation{" "}
                      <span className="font-semibold text-white">{selected.recommendation}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {selected.reasons.slice(0, 3).map((r) => (
                        <li key={r} className="text-[12px] text-white/78 flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/35 shrink-0" />
                          <span className="leading-5">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-[20px] font-semibold text-white">{pct(selected.confidence)}</div>
                      <div className="text-[11px] text-white/45">confidence</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.08]">
                      <div
                        className="h-full bg-[rgba(197,204,195,0.65)]"
                        style={{ width: pct(selected.confidence) }}
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-white/45">Review evidence before approving.</div>
                  </div>
                </div>
              </GlassSurface>

              <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
                <GlassSurface
                  variant="elevated"
                  blur="regular"
                  radius="sm"
                  className={cn(
                    "p-4",
                    "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)]"
                  )}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
                    Evidence
                  </div>
                  <div className="mt-4 rounded-md border border-white/[0.08] bg-white/[0.03]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08]">
                      {[
                        ["Identity", selected.fields.identity],
                        ["English", selected.fields.english],
                        ["Transcript", selected.fields.transcript],
                        ["Intake / Province", `${selected.fields.intake} · ${selected.fields.province}`],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-[rgba(18,18,18,0.30)] p-3">
                          <div className="text-[11px] text-white/45">{k}</div>
                          <div className="mt-1 text-[12px] text-white/80 leading-5">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      className="rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/28"
                      variant="outline"
                    >
                      Approve
                    </Button>
                    <Button
                      className="rounded-md bg-red-500/70 text-white border border-red-500/35 hover:bg-red-500/80"
                      variant="default"
                    >
                      Reject
                    </Button>
                    <Button className="rounded-md" variant="glass">
                      Request info
                    </Button>
                    <Button className="rounded-md" variant="outline">
                      Send to human review
                    </Button>
                  </div>
                </GlassSurface>

                <div className="space-y-6">
                  <GlassSurface
                    variant="elevated"
                    blur="regular"
                    radius="sm"
                    className={cn(
                      "p-4",
                      "[--glass-bg:rgba(18,18,18,0.46)] [--glass-border:rgba(255,255,255,0.12)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
                        Audit
                      </div>
                      <FileText className="h-4 w-4 text-white/35" />
                    </div>
                    <div className="mt-3 space-y-2">
                      {selected.audit.slice(0, 3).map((a) => (
                        <div key={a} className="text-[12px] text-white/78 flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/35 shrink-0" />
                          <span className="leading-5">{a}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-md border border-white/[0.08] bg-white/[0.03] p-3">
                      <div className="text-[11px] text-white/45">Flagged</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.flags.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.10] px-2 py-0.5 text-[10px] text-white/70"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-[11px] text-white/45">Full log available in Audit.</div>
                    </div>
                  </GlassSurface>

                  <GlassSurface
                    blur="regular"
                    radius="sm"
                    className={cn(
                      "p-4",
                      "[--glass-bg:rgba(18,18,18,0.40)] [--glass-border:rgba(255,255,255,0.10)]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-amber-500/18 border border-amber-500/20 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-amber-300" />
                      </div>
                      <div className="text-[12px] font-semibold text-white/85">Compliance</div>
                    </div>
                    <div className="mt-2 text-[11px] text-white/55 leading-5">
                      Human-in-the-loop enabled · Full audit log · Data stays in Canada.
                    </div>
                  </GlassSurface>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </GlassContainer>
  )
}

