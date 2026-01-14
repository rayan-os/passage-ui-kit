"use client"

import { AssistantSheet } from "@/components/chat"

export default function ChatPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#080808] to-[#050505]" />
      
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgba(197,204,195,0.03)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[rgba(139,92,246,0.02)] blur-[100px] pointer-events-none" />
      
      {/* Chat container */}
      <div className="relative z-10 w-full max-w-[1000px] h-[85vh] max-h-[900px] min-h-[500px]">
        <AssistantSheet />
      </div>
    </main>
  )
}
