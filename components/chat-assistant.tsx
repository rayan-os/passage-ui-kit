"use client"

import { useState } from "react"
import { X, Send, Paperclip, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  sender?: string
}

interface ProgramCard {
  id: string
  title: string
  school: string
  type: string
  image: string
  programLevel?: string
  duration?: string
}

interface ChatAssistantProps {
  onClose?: () => void
}

// Sample conversation data
const initialMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "ON",
    timestamp: "30m",
    sender: "rayan@passage.com",
  },
  {
    id: "2",
    type: "assistant",
    content: "Thanks for sharing! What's your highest level of education? This will help me find programs that match your qualifications.",
    timestamp: "30m",
    sender: "Jackie",
  },
  {
    id: "3",
    type: "user",
    content: "high school nigeria",
    timestamp: "30m",
    sender: "rayan@passage.com",
  },
  {
    id: "4",
    type: "assistant",
    content: "What courses or subjects did you enjoy the most during your high school studies? This can help in finding programs that you might be particularly interested in.",
    timestamp: "30m",
    sender: "Jackie",
  },
  {
    id: "5",
    type: "user",
    content: "physics math",
    timestamp: "30m",
    sender: "rayan@passage.com",
  },
]

const programCards: ProgramCard[] = [
  {
    id: "1",
    title: "Computer Programming - (P0411)",
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
    title: "Bachelor of Computer Science – (BCMS)",
    school: "Seneca Polytechnic",
    type: "program",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    programLevel: "Undergraduate",
    duration: "3 years",
  },
]

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.type === "user"

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-start" : "items-end")}>
      {/* Sender label */}
      <span className="text-[11px] text-white/40 px-1">
        {isUser ? message.sender : message.sender}
      </span>
      
      {/* Message bubble */}
      <div
        className={cn(
          "relative max-w-[85%] px-4 py-3 rounded-2xl",
          "transition-all duration-glass",
          isUser
            ? [
                // User bubble - subtle glass
                "bg-glass-bg backdrop-blur-glass",
                "border border-glass-border",
                "text-white/90",
                "rounded-tl-md",
              ]
            : [
                // Assistant bubble - tinted purple glass
                "bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(139,92,246,0.08)]",
                "backdrop-blur-glass",
                "border border-[rgba(139,92,246,0.2)]",
                "text-white/90",
                "rounded-tr-md",
                // Specular highlight
                "before:absolute before:inset-0 before:rounded-[inherit]",
                "before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent",
                "before:pointer-events-none",
              ]
        )}
      >
        <p className="relative z-10 text-[14px] leading-relaxed">{message.content}</p>
      </div>
      
      {/* Timestamp */}
      <span className="text-[10px] text-white/30 px-1">{message.timestamp}</span>
    </div>
  )
}

function ProgramCardComponent({ program }: { program: ProgramCard }) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-[260px] overflow-hidden",
        "rounded-glass-lg",
        "bg-glass-bg backdrop-blur-glass",
        "border border-glass-border",
        "shadow-glass",
        "transition-all duration-glass ease-glass",
        "hover:shadow-glass-hover hover:-translate-y-1 hover:border-glass-border-strong",
        "cursor-pointer group",
        // Specular highlight
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-gradient-to-br before:from-white/[0.06] before:via-transparent before:to-transparent",
        "before:pointer-events-none before:z-[1]",
      )}
    >
      {/* Image */}
      <div className="relative h-[140px] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-glass group-hover:scale-105"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Carousel indicator */}
        <button className={cn(
          "absolute right-3 bottom-3",
          "w-8 h-8 rounded-full",
          "bg-white/20 backdrop-blur-glass-light",
          "border border-white/20",
          "flex items-center justify-center",
          "text-white/80",
          "transition-all duration-glass",
          "hover:bg-white/30 hover:border-white/30",
        )}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Content */}
      <div className="relative z-[2] p-4 space-y-3">
        <h3 className="font-semibold text-[14px] text-white leading-tight line-clamp-2">
          {program.title}
        </h3>
        
        <div className="space-y-1.5">
          <p className="text-[12px] text-white/60">
            <span className="text-white/40">School:</span> {program.school}
          </p>
          <p className="text-[12px] text-white/60">
            <span className="text-white/40">Type:</span> {program.type}
          </p>
        </div>
        
        {/* View Details button */}
        <button className={cn(
          "w-full py-2 px-4 mt-2",
          "rounded-glass-md",
          "bg-glass-bg backdrop-blur-glass-light",
          "border border-glass-border",
          "text-[13px] font-medium text-white/80",
          "transition-all duration-glass",
          "hover:bg-glass-bg-hover hover:text-white hover:border-glass-border-strong",
        )}>
          View Details
        </button>
      </div>
    </div>
  )
}

function ProgramListItem({ program }: { program: ProgramCard }) {
  return (
    <div className="space-y-2">
      <a href="#" className="text-[14px] font-semibold text-white hover:text-[#c5ccc3] underline underline-offset-2 transition-colors">
        {program.title}
      </a>
      <ul className="space-y-1 pl-4">
        <li className="text-[13px] text-white/70">
          <span className="text-white/50">School</span>: {program.school}
        </li>
        {program.programLevel && (
          <li className="text-[13px] text-white/70">
            <span className="text-white/50">Program Level</span>: {program.programLevel}
          </li>
        )}
        {program.duration && (
          <li className="text-[13px] text-white/70">
            <span className="text-white/50">Duration</span>: {program.duration}
          </li>
        )}
      </ul>
    </div>
  )
}

export function ChatAssistant({ onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: "now",
      sender: "rayan@passage.com",
    }
    
    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full w-full max-w-[580px]",
        "rounded-glass-xl overflow-hidden",
        "bg-gradient-to-b from-[rgba(10,10,10,0.95)] to-[rgba(10,10,10,0.98)]",
        "backdrop-blur-glass-heavy",
        "border border-glass-border",
        "shadow-glass-lg",
        // Specular highlight
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-gradient-to-br before:from-white/[0.04] before:via-transparent before:to-transparent",
        "before:pointer-events-none before:z-0",
      )}
    >
      {/* Header */}
      <div className={cn(
        "relative z-10 flex items-center justify-between px-5 py-4",
        "border-b border-glass-border-subtle",
        "bg-gradient-to-b from-glass-bg to-transparent",
      )}>
        <h2 className="text-[16px] font-semibold text-white">AI Assistant</h2>
        <button
          onClick={onClose}
          className={cn(
            "w-8 h-8 rounded-glass-sm",
            "flex items-center justify-center",
            "text-white/50 hover:text-white",
            "hover:bg-glass-bg",
            "transition-all duration-glass",
          )}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Found Programs Section */}
        <div className="pt-4 space-y-4">
          <p className="text-[15px] font-semibold text-white">Found 12 Programs</p>
          
          {/* Horizontal scrolling cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {programCards.map((program) => (
              <ProgramCardComponent key={program.id} program={program} />
            ))}
          </div>
        </div>

        {/* Assistant message with program list */}
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[11px] text-white/40 px-1">Jackie</span>
          <div
            className={cn(
              "relative max-w-[90%] px-4 py-4 rounded-2xl rounded-tr-md",
              "bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(139,92,246,0.08)]",
              "backdrop-blur-glass",
              "border border-[rgba(139,92,246,0.2)]",
              // Specular highlight
              "before:absolute before:inset-0 before:rounded-[inherit]",
              "before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent",
              "before:pointer-events-none",
            )}
          >
            <div className="relative z-10 space-y-4">
              <p className="text-[14px] text-white/90 leading-relaxed">
                Here are some Computer Science programs you might be interested in:
              </p>
              
              <ol className="space-y-4 list-decimal list-inside">
                {programCards.map((program, index) => (
                  <li key={program.id} className="text-white/90">
                    <ProgramListItem program={program} />
                  </li>
                ))}
              </ol>
              
              <p className="text-[14px] text-white/80 leading-relaxed pt-2">
                These programs are a blend of diplomas and undergraduate degrees. If any of these interest you or if you'd like more details about a specific program, let me know!
              </p>
            </div>
          </div>
          <span className="text-[10px] text-white/30 px-1">30m</span>
        </div>
      </div>

      {/* Input area */}
      <div className={cn(
        "relative z-10 px-4 py-4",
        "border-t border-glass-border-subtle",
        "bg-gradient-to-t from-glass-bg to-transparent",
      )}>
        <div className={cn(
          "flex items-center gap-3 px-4 py-3",
          "rounded-glass-lg",
          "bg-glass-bg backdrop-blur-glass",
          "border border-glass-border",
          "shadow-glass-sm",
          "focus-within:border-glass-border-strong focus-within:shadow-glass-md",
          "transition-all duration-glass",
        )}>
          {/* Attachment button */}
          <button className={cn(
            "flex-shrink-0 w-8 h-8 rounded-glass-sm",
            "flex items-center justify-center",
            "text-white/40 hover:text-white/70",
            "hover:bg-glass-bg-hover",
            "transition-all duration-glass",
          )}>
            <Paperclip className="w-5 h-5" />
          </button>
          
          {/* Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message..."
            className={cn(
              "flex-1 bg-transparent",
              "text-[14px] text-white placeholder:text-white/35",
              "outline-none",
            )}
          />
          
          {/* Send button */}
          <button
            onClick={handleSend}
            className={cn(
              "flex-shrink-0 px-5 py-2",
              "rounded-glass-md",
              "bg-[#c5ccc3] hover:bg-[#d0d7ce]",
              "text-[#0a0a0a] text-[14px] font-semibold",
              "shadow-glass-sm",
              "transition-all duration-glass",
              "hover:shadow-glass-md hover:-translate-y-[1px]",
              "active:translate-y-0 active:scale-[0.98]",
            )}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
