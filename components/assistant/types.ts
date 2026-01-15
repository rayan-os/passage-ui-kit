export type AgentStatus = "active" | "waiting" | "working" | "escalated"

export type Agent = {
  id: "jackie" | "david" | "ella"
  name: string
  role: string
  initials: string
  status: AgentStatus
  statusText: string
  lastAction: string
}

export type ChatMessage =
  | {
      id: string
      type: "user"
      text: string
      createdAt: number
      routedTo: Agent["id"]
    }
  | {
      id: string
      type: "agent"
      agentId: Agent["id"]
      text: string
      createdAt: number
    }

export type WorkflowStep = {
  id: string
  createdAt: number
  agentId: Agent["id"]
  label: string
}

