export type PassageMode = "university" | "student"

export const PASSAGE_MODE_STORAGE_KEY = "passageMode" as const

export function isPassageMode(value: unknown): value is PassageMode {
  return value === "university" || value === "student"
}

export function otherPassageMode(mode: PassageMode): PassageMode {
  return mode === "university" ? "student" : "university"
}

export const passageHomeCopy = {
  brand: "Passage",
  hero: {
    headline: "Choose your experience",
    subhead: "Pick the experience that matches your role.",
  },
  modes: {
    university: {
      label: "For universities",
      title: "Admissions Automation",
      body: "Automate documents, eligibility, and routing, with human approvals and audit trails.",
      primaryCta: "Explore universities",
      href: "/universities",
      landing: {
        headline: "AI powered admissions automation",
        subhead:
          "Move applicants from counselling to enrollment faster, with automated document processing, eligibility checks, and follow ups.",
        primaryCta: "Request Demo",
      },
      hover: {
        bullets: ["Build agents", "Connect policies", "Track throughput and audit trail"],
      },
      nav: {
        secondaryCta: "Request demo",
        secondaryHref: "/universities#request-demo",
      },
    },
    student: {
      title: "Admissions and Financing",
      label: "For students",
      body: "Get matched, apply faster, and unlock financing when eligible.",
      primaryCta: "Explore students",
      href: "/students",
      landing: {
        headline: "Admissions and financing, in one guided journey",
        subhead:
          "Explore programs, apply with confidence, and unlock financing when eligible — with one clear path from interest to enrollment.",
        primaryCta: "Apply Now",
      },
      hover: {
        bullets: ["Eligibility checks", "Document collection", "Financing offers"],
      },
      nav: {
        secondaryCta: "Apply now",
        secondaryHref: "/students#apply",
      },
    },
  },
} as const

