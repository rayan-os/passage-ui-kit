"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
// Animation Variants
// ─────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const expandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

const articleVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    transition: { delay: i * 0.03, duration: 0.15 },
  }),
};

const pulseRing: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.8, 1],
    opacity: [0.5, 0, 0.5],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface Article {
  title: string;
  views: string;
  updated: string;
}

interface Source {
  name: string;
  detail: string;
  icon: string;
  done?: boolean;
  progress?: number;
  articles?: Article[];
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const sourcesData: Source[] = [
  {
    name: "Help Center",
    detail: "89 articles",
    icon: "🌐",
    done: true,
    articles: [
      { title: "Getting Started Guide", views: "2.4k", updated: "2d ago" },
      { title: "Account Setup", views: "1.8k", updated: "3d ago" },
      { title: "Billing FAQ", views: "1.2k", updated: "1w ago" },
      { title: "API Documentation", views: "956", updated: "4d ago" },
      { title: "Troubleshooting", views: "743", updated: "5d ago" },
    ],
  },
  {
    name: "Notion",
    detail: "62%",
    icon: "📝",
    progress: 62,
    articles: [
      { title: "Product Roadmap", views: "892", updated: "1d ago" },
      { title: "Team Processes", views: "654", updated: "2d ago" },
      { title: "Meeting Notes", views: "421", updated: "6h ago" },
    ],
  },
  {
    name: "Confluence",
    detail: "53 articles",
    icon: "🔷",
    done: true,
    articles: [
      { title: "Engineering Wiki", views: "1.5k", updated: "1d ago" },
      { title: "Design System", views: "987", updated: "3d ago" },
      { title: "Onboarding Docs", views: "756", updated: "1w ago" },
      { title: "Release Notes", views: "623", updated: "2d ago" },
    ],
  },
];

const guidelinesData = [
  { title: "Tone & Voice", desc: "Be friendly and helpful" },
  { title: "Escalation Rules", desc: "Escalate billing issues over $500" },
  { title: "Response Format", desc: "Keep responses under 3 paragraphs" },
];

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSourceClick = (sourceName: string) => {
    if (expandedSource === sourceName) {
      setExpandedSource(null);
      setSelectedArticle(null);
    } else {
      setExpandedSource(sourceName);
      setSelectedArticle(null);
    }
  };

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
        className="relative z-20 w-full max-w-[620px] mx-4"
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
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-white/40">duckie.ai</span>
            </motion.div>
            <div className="w-12" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
              <span className="text-base font-semibold text-white">Training</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">142 articles</span>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  variants={pulseRing}
                  initial="initial"
                  animate={reducedMotion ? "initial" : "animate"}
                />
                <motion.div
                  className="relative w-2 h-2 rounded-full bg-green-400"
                  animate={reducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-5 py-6 border-b border-white/[0.06]">
            {[
              { value: "142", label: "Articles", color: "text-purple-400" },
              { value: "12", label: "Guidelines", color: "text-fuchsia-400" },
              { value: "8", label: "Runbooks", color: "text-white/90" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-white/50 mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-2 gap-6 p-5">
            {/* Sources */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">Sources</div>
              <div className="flex flex-col gap-2">
                {sourcesData.map((source, idx) => (
                  <div key={source.name}>
                    <motion.div
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        expandedSource === source.name
                          ? "bg-white/[0.06] border border-purple-500/30"
                          : "bg-white/[0.03] border border-white/[0.06]"
                      }`}
                      onClick={() => handleSourceClick(source.name)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={reducedMotion ? {} : { y: -2, borderColor: "rgba(139,92,246,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-sm"
                        animate={expandedSource === source.name ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        {source.icon}
                      </motion.div>
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
                      <motion.div
                        animate={{ rotate: expandedSource === source.name ? 180 : 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        {source.done ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Expanded Articles List */}
                    <AnimatePresence>
                      {expandedSource === source.name && source.articles && (
                        <motion.div
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="overflow-hidden"
                        >
                          <motion.div
                            className="mt-2 ml-4 pl-4 border-l-2 border-purple-500/30"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {source.articles.map((article, aIdx) => (
                              <motion.div
                                key={article.title}
                                variants={articleVariants}
                                custom={aIdx}
                                className={`py-2 px-3 my-1 rounded-lg cursor-pointer transition-all ${
                                  selectedArticle === article.title
                                    ? "bg-purple-500/20 border border-purple-500/40"
                                    : "hover:bg-white/[0.04]"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedArticle(
                                    selectedArticle === article.title ? null : article.title
                                  );
                                }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/80 font-medium">{article.title}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-white/40">{article.views}</span>
                                    <motion.div
                                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
                                      animate={
                                        selectedArticle === article.title
                                          ? { scale: [1, 1.5, 1] }
                                          : {}
                                      }
                                      transition={{ duration: 0.3 }}
                                    />
                                  </div>
                                </div>
                                <AnimatePresence>
                                  {selectedArticle === article.title && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-2 pt-2 border-t border-white/[0.06]"
                                    >
                                      <p className="text-[10px] text-white/50">Updated {article.updated}</p>
                                      <motion.button
                                        className="mt-2 px-3 py-1 text-[10px] rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(139,92,246,0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        Open Article →
                                      </motion.button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">Guidelines</div>
              <div className="flex flex-col gap-2">
                {guidelinesData.map((g, idx) => (
                  <motion.div
                    key={g.title}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-pointer group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                    whileHover={{
                      y: -2,
                      borderColor: "rgba(255,255,255,0.12)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90 font-medium">{g.title}</span>
                      <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/30 group-hover:text-white/60"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </motion.svg>
                    </div>
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
            <motion.span
              className="text-xs text-white/40"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Updated: 2m ago
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
