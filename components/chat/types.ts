export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  parts?: Array<{ type: string; text?: string }>
}

export interface Program {
  id: string
  title: string
  school: string
  type: string
  image: string
  programLevel?: string
  duration?: string
}

export type ChatStatus = "ready" | "submitted" | "streaming" | "error"

export interface AssistantSheetProps {
  isOpen?: boolean
  onClose?: () => void
}
