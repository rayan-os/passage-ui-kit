"use client"

import { useState, useCallback, useRef } from "react"
import { X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageList } from "./message-list"
import { ComposerBar } from "./composer-bar"
import { ProgramCarousel } from "./program-carousel"
import type { AssistantSheetProps, ChatStatus, Program } from "./types"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  parts?: Array<{ type: string; text?: string }>
}

// Sample programs for demo
const samplePrograms: Program[] = [
  {
    id: "1",
    title: "Computer Programming",
    school: "Niagara College",
    type: "program",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    programLevel: "Diploma",
    duration: "2 years",
  },
  {
    id: "2",
    title: "Computer Science (BSc)",
    school: "Vancouver Island University",
    type: "program",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    programLevel: "Undergraduate",
    duration: "4 years",
  },
  {
    id: "3",
    title: "Bachelor of CS",
    school: "Seneca Polytechnic",
    type: "program",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    programLevel: "Undergraduate",
    duration: "3 years",
  },
  {
    id: "4",
    title: "Data Science",
    school: "George Brown",
    type: "program",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    programLevel: "Postgraduate",
    duration: "1 year",
  },
]

export function AssistantSheet({ isOpen = true, onClose }: AssistantSheetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [status, setStatus] = useState<ChatStatus>("ready")
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || status === "streaming" || status === "submitted") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue("")
    setStatus("submitted")
    setError(null)

    // Create abort controller for stopping
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No reader available")
      }

      setStatus("streaming")

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages([...newMessages, assistantMessage])

      const decoder = new TextDecoder()
      let fullContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const text = JSON.parse(line.slice(2))
              fullContent += text
              setMessages((prev) => {
                const updated = [...prev]
                const lastIndex = updated.length - 1
                if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    content: fullContent,
                  }
                }
                return updated
              })
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      setStatus("ready")
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setStatus("ready")
        return
      }
      setError(err instanceof Error ? err : new Error("Unknown error"))
      setStatus("error")
    }
  }, [messages, status])

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setStatus("ready")
    }
  }, [])

  const reload = useCallback(async () => {
    if (messages.length < 2) return

    // Remove last assistant message and resend
    const lastUserMessageIndex = messages.findLastIndex((m) => m.role === "user")
    if (lastUserMessageIndex === -1) return

    const lastUserMessage = messages[lastUserMessageIndex]
    const messagesWithoutLastAssistant = messages.slice(0, lastUserMessageIndex)
    
    setMessages(messagesWithoutLastAssistant)
    setError(null)
    
    // Wait a tick then resend
    setTimeout(() => {
      sendMessage(lastUserMessage.content)
    }, 100)
  }, [messages, sendMessage])

  const handleSubmit = useCallback(() => {
    sendMessage(inputValue)
  }, [inputValue, sendMessage])

  // Show programs after some messages
  const showPrograms = messages.length >= 2

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "flex flex-col",
        "w-full h-full",
        "max-w-[1000px]",
        // Glass container
        "rounded-3xl overflow-hidden",
        "bg-[rgba(12,12,12,0.85)]",
        "backdrop-blur-xl",
        "border border-white/[0.08]",
        "shadow-2xl shadow-black/40",
        // Subtle inner glow
        "ring-1 ring-inset ring-white/[0.05]",
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between",
        "px-6 py-4",
        "border-b border-white/[0.06]",
        "bg-white/[0.02]",
      )}>
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-9 h-9 rounded-xl",
            "bg-gradient-to-br from-[#c5ccc3] to-[#a8b0a5]",
            "flex items-center justify-center",
            "shadow-sm",
          )}>
            <Sparkles className="w-5 h-5 text-[#0a0a0a]" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-white">AI Assistant</h2>
            <p className="text-[11px] text-white/40">Powered by Jackie</p>
          </div>
        </div>

        {/* Right side - Status & Close */}
        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1",
            "rounded-full",
            "text-[11px] font-medium",
            status === "streaming" && "bg-emerald-500/10 text-emerald-400",
            status === "submitted" && "bg-amber-500/10 text-amber-400",
            status === "error" && "bg-red-500/10 text-red-400",
            status === "ready" && "bg-white/[0.06] text-white/40",
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              status === "streaming" && "bg-emerald-400 animate-pulse",
              status === "submitted" && "bg-amber-400 animate-pulse",
              status === "error" && "bg-red-400",
              status === "ready" && "bg-white/40",
            )} />
            {status === "streaming" && "Typing..."}
            {status === "submitted" && "Thinking..."}
            {status === "error" && "Error"}
            {status === "ready" && "Ready"}
          </div>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className={cn(
                "w-8 h-8 rounded-lg",
                "flex items-center justify-center",
                "text-white/40 hover:text-white/70",
                "hover:bg-white/[0.06]",
                "transition-all duration-150",
              )}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={messages}
        isStreaming={status === "streaming"}
        className="flex-1"
      />

      {/* Program Carousel - Show after conversation starts */}
      {showPrograms && (
        <div className="px-5 py-3 border-t border-white/[0.04]">
          <ProgramCarousel
            programs={samplePrograms}
            title="Recommended Programs"
          />
        </div>
      )}

      {/* Composer */}
      <ComposerBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        onStop={stop}
        onReload={messages.length > 0 ? reload : undefined}
        status={status}
        error={error}
      />
    </div>
  )
}
