import { ChatAssistant } from "@/components/chat-assistant"

export default function ChatPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#050505]" />
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[rgba(139,92,246,0.04)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[rgba(197,204,195,0.03)] blur-[80px] pointer-events-none" />
      
      {/* Chat container */}
      <div className="relative z-10 w-full max-w-[580px] h-[90vh] max-h-[900px]">
        <ChatAssistant />
      </div>
    </main>
  )
}
