"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Custom hook for reduced motion
// ─────────────────────────────────────────────────────────────

function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={reducedMotion ? {} : { x: [0, 40, 0, -40, 0], y: [0, -20, 0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="absolute w-[800px] h-[800px] -top-[200px] -left-[200px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
          />
          <div
            className="absolute w-[1000px] h-[600px] bottom-0 left-1/2 -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 80%)" }}
          />
          <div
            className="absolute w-[600px] h-[600px] top-1/4 -right-[100px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)" }}
          />
        </motion.div>
      </div>

      {/* Floating Window */}
      <motion.div
        className="relative z-20 w-full max-w-[580px] mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.6 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            background: "rgba(18, 18, 18, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-white/40">duckie.ai</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-base font-semibold text-white">Training</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">142 articles</span>
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={reducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-5 py-6 border-b border-white/[0.06]">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-400">142</span>
              <span className="text-xs text-white/50 mt-1">Articles</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-fuchsia-400">12</span>
              <span className="text-xs text-white/50 mt-1">Guidelines</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white/90">8</span>
              <span className="text-xs text-white/50 mt-1">Runbooks</span>
            </div>
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-2 gap-6 p-5">
            {/* Sources */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">Sources</div>
              <div className="flex flex-col gap-2">
                {[
                  { name: "Help Center", detail: "89 articles", icon: "🌐", done: true },
                  { name: "Notion", detail: "62%", icon: "📝", progress: 62 },
                  { name: "Confluence", detail: "53 articles", icon: "🔷", done: true },
                ].map((source, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer"
                    whileHover={reducedMotion ? {} : { y: -2, borderColor: "rgba(255,255,255,0.12)" }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-sm">
                      {source.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white/90 font-medium">{source.name}</div>
                      <div className="text-xs text-white/50">{source.detail}</div>
                      {source.progress && (
                        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${source.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      )}
                    </div>
                    {source.done && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">Guidelines</div>
              <div className="flex flex-col gap-2">
                {[
                  { title: "Tone & Voice", desc: "Be friendly and helpful" },
                  { title: "Escalation Rules", desc: "Escalate billing issues over $500" },
                  { title: "Response Format", desc: "Keep responses under 3 paragraphs" },
                ].map((g, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-pointer"
                    whileHover={reducedMotion ? {} : { y: -2, borderColor: "rgba(255,255,255,0.10)" }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="text-sm text-white/90 font-medium">{g.title}</div>
                    <div className="text-xs text-white/40 mt-1">{g.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/50"
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <path d="M21 12a9 9 0 11-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
              <span>Syncing...</span>
            </div>
            <span className="text-xs text-white/40">Updated: 2m ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
