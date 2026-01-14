import Link from "next/link"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#050505]" />
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[rgba(197,204,195,0.03)] blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-8">
        {/* Logo - Glass styled */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rounded-glass-xl bg-gradient-to-br from-[#c5ccc3] to-[#a8b0a5] flex items-center justify-center text-[#0a0a0a] text-3xl font-bold shadow-glass-lg shadow-[rgba(197,204,195,0.25)] transition-all duration-glass hover:shadow-glass-glow hover:-translate-y-1">
            P
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Passage UI
          </h1>
          <p className="text-white/50 text-lg">
            Admin Dashboard Template
          </p>
        </div>

        {/* CTA - Glass Button */}
        <Link 
          href="/admin-panel"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#0a0a0a] font-semibold rounded-glass-md shadow-glass-md transition-all duration-glass hover:shadow-glass-lg hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Open Admin Panel
        </Link>
      </div>
    </main>
  )
}
