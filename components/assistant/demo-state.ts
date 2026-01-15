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
    status: "waiting",
    statusText: "reviewing documents",
    lastAction: "checking transcripts + finances",
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
    type: "user",
    text: "Where can I study Computer Science?",
    routedTo: "jackie",
    createdAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "m2",
    type: "agent",
    agentId: "jackie",
    text:
      "Here are a few strong CS-adjacent options based on typical admission paths. Tell me your intake (e.g. May/Sep) + your budget, and I’ll narrow it down to the best 3.",
    createdAt: Date.now() - 1000 * 60 * 4,
  },
  {
    id: "m3",
    type: "user",
    text:
      "I’m in Ontario. I want something practical and affordable.",
    routedTo: "jackie",
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: "m4",
    type: "agent",
    agentId: "jackie",
    text:
      "Perfect. I’ll prioritize Ontario programs with strong outcomes and manageable tuition. If you share your highest completed education level, I’ll match the right level (diploma vs BSc vs PG).",
    createdAt: Date.now() - 1000 * 60 * 2,
  },
  {
    id: "m5",
    type: "user",
    text: "Also—can Passage help with tuition payment options?",
    routedTo: "david",
    createdAt: Date.now() - 1000 * 60 * 1,
  },
  {
    id: "m6",
    type: "agent",
    agentId: "david",
    text:
      "Yes. We can break down the total cost, expected fees, and payment options. If you share your target school/program, I’ll estimate tuition and key deadlines.",
    createdAt: Date.now(),
  },
]

export const demoTrace: WorkflowStep[] = [
  {
    id: "w1",
    createdAt: Date.now() - 1000 * 60 * 6,
    agentId: "jackie",
    label: "Intent: identified Computer Science goal",
  },
  {
    id: "w2",
    createdAt: Date.now() - 1000 * 60 * 4,
    agentId: "jackie",
    label: "Search: shortlisted programs + schools",
  },
  {
    id: "w3",
    createdAt: Date.now() - 1000 * 60 * 3,
    agentId: "jackie",
    label: "Refine: filtered by province + affordability",
  },
]

