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
    kicker: "One company, two experiences",
    headline: "Choose your path",
    subhead:
      "Select the experience that matches your role. You can switch anytime.",
  },
  modes: {
    university: {
      audience: "Universities and admissions teams",
      title: "AI Admissions Automation",
      body: "Automate counselling, assessment, processing, and support, with approvals and audit logs.",
      primaryCta: "Explore for universities",
      href: "/universities",
      hover: {
        secondary: "Deploy agents into your admissions workflow.",
        bullets: ["Build agents", "Connect policies and data", "Track throughput and audit trail"],
      },
      nav: {
        secondaryCta: "Request demo",
        secondaryHref: "/universities#request-demo",
      },
    },
    student: {
      audience: "Students",
      title: "Admissions and Financing",
      body: "Get matched, apply faster, unlock financing when eligible.",
      primaryCta: "Explore for students",
      href: "/students",
      hover: {
        secondary: "One guided journey from interest to enrollment.",
        bullets: ["Pick programs", "Apply with confidence", "Access financing"],
      },
      nav: {
        secondaryCta: "Apply now",
        secondaryHref: "/students#apply",
      },
    },
  },
} as const

