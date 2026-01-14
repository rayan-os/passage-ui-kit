"use client"

import { useRef, useCallback, KeyboardEvent } from "react"
import { Send, Square, RotateCcw, Paperclip, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatStatus } from "./types"

interface ComposerBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  onReload?: () => void
  status: ChatStatus
  error?: Error | null
  disabled?: boolean
}

export function ComposerBar({
  value,
  onChange,
  onSubmit,
  onStop,
  onReload,
  status,
  error,
  disabled = false,
}: ComposerBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isStreaming = status === "streaming"
  const isSubmitted = status === "submitted"
  const isError = status === "error"
  const isReady = status === "ready"
  const isProcessing = isStreaming || isSubmitted

  // Auto-resize textarea
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    
    // Auto resize
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px"
    }
  }, [onChange])

  // Handle keyboard
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isProcessing && !disabled && value.trim()) {
        onSubmit()
        // Reset height
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"
        }
      }
    }
  }, [isProcessing, disabled, value, onSubmit])

  const handleSubmit = useCallback(() => {
    if (!isProcessing && !disabled && value.trim()) {
      onSubmit()
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }, [isProcessing, disabled, value, onSubmit])

  return (
    <div className={cn(
      "border-t border-white/[0.08]",
      "bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent",
      "px-5 py-4",
    )}>
      {/* Error message */}
      {isError && error && (
        <div className={cn(
          "flex items-center gap-2 mb-3 px-3 py-2",
          "rounded-lg",
          "bg-red-500/10 border border-red-500/20",
          "text-red-400 text-sm",
        )}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1 truncate">{error.message || "Something went wrong"}</span>
          {onReload && (
            <button
              onClick={onReload}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 transition-colors text-xs font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          )}
        </div>
      )}

      {/* Input container */}
      <div className={cn(
        "flex items-end gap-3",
        "px-4 py-3",
        "rounded-2xl",
        "bg-white/[0.04]",
        "border border-white/[0.1]",
        "focus-within:border-white/[0.2] focus-within:bg-white/[0.06]",
        "transition-all duration-200",
      )}>
        {/* Attachment button */}
        <button
          type="button"
          disabled={isProcessing}
          className={cn(
            "flex-shrink-0 w-9 h-9 rounded-xl",
            "flex items-center justify-center",
            "text-white/40 hover:text-white/70 hover:bg-white/[0.06]",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Jackie..."
          disabled={isProcessing || disabled}
          rows={1}
          className={cn(
            "flex-1 min-h-[36px] max-h-[150px]",
            "bg-transparent resize-none",
            "text-[15px] text-white placeholder:text-white/30",
            "outline-none",
            "disabled:opacity-50",
          )}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Regenerate button - show when ready and has messages */}
          {isReady && onReload && (
            <button
              onClick={onReload}
              className={cn(
                "w-9 h-9 rounded-xl",
                "flex items-center justify-center",
                "text-white/40 hover:text-white/70 hover:bg-white/[0.06]",
                "transition-all duration-200",
              )}
              title="Regenerate"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Stop button - show when streaming */}
          {isStreaming && onStop && (
            <button
              onClick={onStop}
              className={cn(
                "w-9 h-9 rounded-xl",
                "flex items-center justify-center",
                "bg-white/10 hover:bg-white/15",
                "text-white/70 hover:text-white",
                "transition-all duration-200",
              )}
              title="Stop"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={isProcessing || disabled || !value.trim()}
            className={cn(
              "w-9 h-9 rounded-xl",
              "flex items-center justify-center",
              "transition-all duration-200",
              value.trim() && !isProcessing
                ? "bg-[#c5ccc3] text-[#0a0a0a] hover:bg-[#d0d7ce] shadow-sm"
                : "bg-white/[0.06] text-white/30 cursor-not-allowed",
            )}
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-[11px] text-white/25 text-center mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
