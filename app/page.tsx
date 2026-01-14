import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c5ccc3] to-[#a8b0a5] flex items-center justify-center text-[#0a0a0a] text-2xl font-bold shadow-giga">
            P
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Passage UI
          </h1>
          <p className="text-white/55 text-lg">
            Admin Dashboard Template
          </p>
        </div>

        {/* CTA */}
        <Link 
          href="/admin-panel"
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0a0a0a] font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Open Admin Panel
        </Link>
      </div>
    </main>
  )
}
