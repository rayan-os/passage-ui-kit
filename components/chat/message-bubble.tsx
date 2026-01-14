"use client"

import { memo } from "react"
import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  parts?: Array<{ type: string; text?: string }>
}

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
}

export const MessageBubble = memo(function MessageBubble({
  message,
  isStreaming = false,
}: MessageBubbleProps) {
  const isUser = message.role === "user"

  // Extract text content from message parts or fallback to content
  const getMessageContent = () => {
    if (message.parts && message.parts.length > 0) {
      return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("")
    }
    return typeof message.content === "string" ? message.content : ""
  }

  const content = getMessageContent()

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[85%] px-4 py-3",
          "transition-all duration-200",
          isUser
            ? [
                // User bubble - clean, minimal
                "bg-white/[0.08]",
                "border border-white/[0.1]",
                "rounded-2xl rounded-br-md",
              ]
            : [
                // Assistant bubble - subtle accent
                "bg-white/[0.04]",
                "border border-white/[0.08]",
                "rounded-2xl rounded-bl-md",
              ]
        )}
      >
        {/* Content */}
        <div className={cn(
          "text-[14px] leading-[1.6] text-white/90",
          "prose prose-sm prose-invert max-w-none",
          // Markdown styling
          "prose-p:my-2 prose-p:leading-[1.6]",
          "prose-strong:text-white prose-strong:font-semibold",
          "prose-ul:my-2 prose-ul:pl-4",
          "prose-ol:my-2 prose-ol:pl-4",
          "prose-li:my-0.5",
          "prose-headings:text-white prose-headings:font-semibold",
          "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
          "prose-code:text-[#c5ccc3] prose-code:bg-white/[0.06] prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
          "prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/[0.08] prose-pre:rounded-lg",
          "prose-a:text-[#c5ccc3] prose-a:underline prose-a:underline-offset-2",
        )}>
          {isUser ? (
            <p className="m-0">{content}</p>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>

        {/* Streaming indicator */}
        {isStreaming && !isUser && (
          <span className="inline-flex ml-1">
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
          </span>
        )}
      </div>
    </div>
  )
})
