import type { Agent, ChatMessage, WorkflowStep } from "@/components/assistant/types"

export const demoAgents: Agent[] = [
  {
    id: "jackie",
    name: "Jackie",
    role: "Counselor",
    initials: "J",
    status: "active",
    statusText: "drafting guidance",
    lastAction: "mapped intake requirements",
  },
  {
    id: "david",
    name: "David",
    role: "Processor",
    initials: "D",
    status: "working",
    statusText: "running KYC",
    lastAction: "validated identity docs",
  },
  {
    id: "ella",
    name: "Ella",
    role: "Interviewer",
    initials: "E",
    status: "waiting",
    statusText: "ready",
    lastAction: "standing by for assessment",
  },
]

export const demoMessages: ChatMessage[] = [
  {
    id: "m1",
    type: "agent",
    agentId: "jackie",
    text:
      "I can help you get admitted faster. Tell me your program + intake, and I’ll line up the next steps.",
    createdAt: Date.now() - 1000 * 60 * 6,
  },
  {
    id: "m2",
    type: "user",
    text: "May 2026 intake. What’s blocking LOA for my application?",
    routedTo: "jackie",
    createdAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "m3",
    type: "agent",
    agentId: "david",
    text:
      "KYC is still processing. I’m checking document integrity and matching your identity details across sources now.",
    createdAt: Date.now() - 1000 * 60 * 4,
  },
  {
    id: "m4",
    type: "agent",
    agentId: "jackie",
    text:
      "While David verifies KYC, I’ll prep your LOA packet: ensure tuition payment type is set and the school’s LOA template is selected.",
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: "m5",
    type: "user",
    text: "Ok. Can we escalate if KYC takes more than a day?",
    routedTo: "jackie",
    createdAt: Date.now() - 1000 * 60 * 2,
  },
  {
    id: "m6",
    type: "agent",
    agentId: "jackie",
    text:
      "Yes. If KYC exceeds 24h, I’ll flag this as escalated and route it for manual review. In the meantime, I’ll verify LOA prerequisites so we’re ready the moment KYC clears.",
    createdAt: Date.now() - 1000 * 60 * 1,
  },
]

export const demoTrace: WorkflowStep[] = [
  {
    id: "w1",
    createdAt: Date.now() - 1000 * 60 * 6,
    agentId: "jackie",
    label: "Intake triage: parsed program + intake window",
  },
  {
    id: "w2",
    createdAt: Date.now() - 1000 * 60 * 4,
    agentId: "david",
    label: "KYC started: OCR + identity match",
  },
  {
    id: "w3",
    createdAt: Date.now() - 1000 * 60 * 3,
    agentId: "jackie",
    label: "LOA packet: verified tuition payment + template",
  },
]

