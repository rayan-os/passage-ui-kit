"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { MessageBubble } from "./message-bubble"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  parts?: Array<{ type: string; text?: string }>
}

interface MessageListProps {
  messages: Message[]
  isStreaming?: boolean
  className?: string
}

export function MessageList({ messages, isStreaming = false, className }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [userScrolled, setUserScrolled] = useState(false)
  const lastMessageCountRef = useRef(messages.length)

  // Smart autoscroll - only scroll if user hasn't scrolled up
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (containerRef.current && !userScrolled) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      })
    }
  }, [userScrolled])

  // Detect user scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
    
    // If user scrolled away from bottom, respect their position
    if (!isAtBottom) {
      setUserScrolled(true)
    } else {
      setUserScrolled(false)
    }
  }, [])

  // Scroll on new messages
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      // New message added, scroll to bottom
      setUserScrolled(false)
      scrollToBottom()
    }
    lastMessageCountRef.current = messages.length
  }, [messages.length, scrollToBottom])

  // Scroll during streaming
  useEffect(() => {
    if (isStreaming) {
      scrollToBottom()
    }
  }, [isStreaming, messages, scrollToBottom])

  // Initial scroll
  useEffect(() => {
    scrollToBottom("instant")
  }, [])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "flex-1 overflow-y-auto",
        "px-5 py-6",
        "space-y-4",
        // Custom scrollbar
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20",
        className
      )}
    >
      {/* Welcome message if empty */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c5ccc3] to-[#a8b0a5] flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-[#0a0a0a]">J</span>
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-lg font-semibold text-white">Hi, I'm Jackie</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Your AI assistant for finding the perfect educational program. Ask me anything about courses, schools, or applications.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isStreaming={isStreaming && index === messages.length - 1 && message.role === "assistant"}
        />
      ))}

      {/* Scroll to bottom button when user scrolled up */}
      {userScrolled && messages.length > 0 && (
        <button
          onClick={() => {
            setUserScrolled(false)
            scrollToBottom()
          }}
          className={cn(
            "fixed bottom-32 right-8",
            "w-10 h-10 rounded-full",
            "bg-white/10 backdrop-blur-lg",
            "border border-white/20",
            "flex items-center justify-center",
            "text-white/70 hover:text-white",
            "shadow-lg",
            "transition-all duration-200",
            "hover:bg-white/15",
          )}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  )
}
