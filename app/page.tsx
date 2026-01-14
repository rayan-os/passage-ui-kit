import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background flex items-center justify-center">
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
          className={cn(buttonVariants({ variant: "default", size: "default" }), "px-8")}
          prefetch
        >
          Open Admin Panel
        </Link>
      </div>
    </main>
  )
}
