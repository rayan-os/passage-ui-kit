"use client";

import { useEffect, useState, useRef } from "react";
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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const articleVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 300, damping: 24 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    transition: { delay: i * 0.03, duration: 0.15 },
  }),
};

const expandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.4 }, opacity: { duration: 0.3, delay: 0.1 } },
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
  id: string;
  name: string;
  detail: string;
  icon: string;
  done?: boolean;
  progress?: number;
  articles?: Article[];
}

interface DemoStep {
  type: "move" | "click" | "type" | "wait" | "clear";
  target?: string;
  position?: { x: number; y: number };
  text?: string;
  duration?: number;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const sourcesData: Source[] = [
  {
    id: "help-center",
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
    id: "notion",
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
    id: "confluence",
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

// Demo sequence
const demoSequence: DemoStep[] = [
  { type: "wait", duration: 1500 },
  { type: "move", target: "help-center", duration: 800 },
  { type: "click", target: "help-center" },
  { type: "wait", duration: 600 },
  { type: "move", target: "article-Getting Started Guide", duration: 500 },
  { type: "click", target: "article-Getting Started Guide" },
  { type: "wait", duration: 1200 },
  { type: "move", target: "article-Billing FAQ", duration: 400 },
  { type: "click", target: "article-Billing FAQ" },
  { type: "wait", duration: 1000 },
  { type: "move", target: "help-center", duration: 500 },
  { type: "click", target: "help-center" },
  { type: "wait", duration: 400 },
  { type: "move", target: "notion", duration: 600 },
  { type: "click", target: "notion" },
  { type: "wait", duration: 500 },
  { type: "move", target: "article-Product Roadmap", duration: 400 },
  { type: "click", target: "article-Product Roadmap" },
  { type: "wait", duration: 800 },
  { type: "move", target: "add-ticket-btn", duration: 500 },
  { type: "click", target: "add-ticket-btn" },
  { type: "wait", duration: 400 },
  { type: "move", target: "ticket-input", duration: 400 },
  { type: "click", target: "ticket-input" },
  { type: "type", text: "Add dark mode to dashboard", duration: 1800 },
  { type: "wait", duration: 500 },
  { type: "move", target: "submit-ticket", duration: 400 },
  { type: "click", target: "submit-ticket" },
  { type: "wait", duration: 1500 },
  { type: "clear" },
  { type: "wait", duration: 1000 },
];

// ─────────────────────────────────────────────────────────────
// Virtual Cursor Component
// ─────────────────────────────────────────────────────────────

const VirtualCursor = ({
  position,
  clicking,
  visible,
}: {
  position: { x: number; y: number };
  clicking: boolean;
  visible: boolean;
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="fixed pointer-events-none z-[100]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: clicking ? 0.85 : 1,
          x: position.x,
          y: position.y,
        }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{
          x: { type: "spring", stiffness: 150, damping: 20 },
          y: { type: "spring", stiffness: 150, damping: 20 },
          scale: { duration: 0.1 },
        }}
      >
        {/* Cursor SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
        >
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
            fill="#fff"
            stroke="#000"
            strokeWidth="1.5"
          />
        </svg>
        {/* Click ripple */}
        <AnimatePresence>
          {clicking && (
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 rounded-full bg-purple-500/40"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ transform: "translate(-25%, -25%)" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketText, setTicketText] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [tickets, setTickets] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();

  // Demo state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [demoRunning, setDemoRunning] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Refs for element positions
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      elementRefs.current.set(id, el);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Demo automation
  useEffect(() => {
    if (!mounted || !demoRunning || reducedMotion) return;

    const runStep = async (step: DemoStep) => {
      switch (step.type) {
        case "move": {
          if (step.target) {
            const el = elementRefs.current.get(step.target);
            if (el && containerRef.current) {
              const rect = el.getBoundingClientRect();
              const containerRect = containerRef.current.getBoundingClientRect();
              setCursorPosition({
                x: rect.left - containerRect.left + rect.width / 2 - 5,
                y: rect.top - containerRect.top + rect.height / 2 - 5,
              });
            }
          } else if (step.position) {
            setCursorPosition(step.position);
          }
          setCursorVisible(true);
          break;
        }
        case "click": {
          setCursorClicking(true);
          await new Promise((r) => setTimeout(r, 150));
          
          // Perform the actual action
          if (step.target) {
            if (step.target.startsWith("article-")) {
              const articleTitle = step.target.replace("article-", "");
              setSelectedArticle((prev) => (prev === articleTitle ? null : articleTitle));
            } else if (["help-center", "notion", "confluence"].includes(step.target)) {
              setExpandedSource((prev) => (prev === step.target ? null : step.target));
              if (expandedSource !== step.target) {
                setSelectedArticle(null);
              }
            } else if (step.target === "add-ticket-btn") {
              setShowTicketModal(true);
            } else if (step.target === "submit-ticket") {
              if (ticketText) {
                setTickets((prev) => [...prev, ticketText]);
                setTicketSubmitted(true);
                await new Promise((r) => setTimeout(r, 800));
                setShowTicketModal(false);
                setTicketSubmitted(false);
                setTicketText("");
              }
            }
          }
          
          await new Promise((r) => setTimeout(r, 100));
          setCursorClicking(false);
          break;
        }
        case "type": {
          if (step.text) {
            const chars = step.text.split("");
            const delay = (step.duration || 1000) / chars.length;
            for (const char of chars) {
              setTicketText((prev) => prev + char);
              await new Promise((r) => setTimeout(r, delay));
            }
          }
          break;
        }
        case "wait": {
          await new Promise((r) => setTimeout(r, step.duration || 500));
          break;
        }
        case "clear": {
          setExpandedSource(null);
          setSelectedArticle(null);
          setShowTicketModal(false);
          setTicketText("");
          setTicketSubmitted(false);
          setCursorVisible(false);
          break;
        }
      }
    };

    const runDemo = async () => {
      for (let i = 0; i < demoSequence.length; i++) {
        if (!demoRunning) break;
        setCurrentStepIndex(i);
        await runStep(demoSequence[i]);
        await new Promise((r) => setTimeout(r, 100));
      }
      // Restart demo
      if (demoRunning) {
        setCurrentStepIndex(0);
        setTimeout(() => {
          runDemo();
        }, 500);
      }
    };

    runDemo();

    return () => {
      setDemoRunning(false);
    };
  }, [mounted, demoRunning, reducedMotion]);

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
        ref={containerRef}
        className="relative z-20 w-full max-w-[620px] mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: reducedMotion ? 0 : [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.6 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Virtual Cursor */}
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

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
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-2 h-2 rounded-full bg-green-400" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-5 py-6 border-b border-white/[0.06]">
            {[
              { value: "142", label: "Articles", color: "text-purple-400" },
              { value: "12", label: "Guidelines", color: "text-fuchsia-400" },
              { value: "8", label: "Runbooks", color: "text-white/90" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-white/50 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Two Column Content */}
          <div className="grid grid-cols-2 gap-6 p-5">
            {/* Sources */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">Sources</div>
              <div className="flex flex-col gap-2">
                {sourcesData.map((source) => (
                  <div key={source.id}>
                    <motion.div
                      ref={registerRef(source.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        expandedSource === source.id
                          ? "bg-white/[0.06] border border-purple-500/30"
                          : "bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/20"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-sm"
                        animate={expandedSource === source.id ? { rotate: [0, -10, 10, 0] } : {}}
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
                      <motion.div animate={{ rotate: expandedSource === source.id ? 180 : 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </motion.div>

                    {/* Expanded Articles */}
                    <AnimatePresence>
                      {expandedSource === source.id && source.articles && (
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
                                ref={registerRef(`article-${article.title}`)}
                                variants={articleVariants}
                                custom={aIdx}
                                className={`py-2 px-3 my-1 rounded-lg cursor-pointer transition-all ${
                                  selectedArticle === article.title
                                    ? "bg-purple-500/20 border border-purple-500/40"
                                    : "hover:bg-white/[0.04]"
                                }`}
                                whileHover={{ x: 4 }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/80 font-medium">{article.title}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-white/40">{article.views}</span>
                                    {selectedArticle === article.title && (
                                      <motion.div
                                        className="w-1.5 h-1.5 rounded-full bg-purple-400"
                                        layoutId="selected-dot"
                                      />
                                    )}
                                  </div>
                                </div>
                                <AnimatePresence>
                                  {selectedArticle === article.title && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-2 pt-2 border-t border-white/[0.06]"
                                    >
                                      <p className="text-[10px] text-white/50 mb-2">Updated {article.updated}</p>
                                      {source.id === "notion" && article.title === "Product Roadmap" && (
                                        <motion.button
                                          ref={registerRef("add-ticket-btn")}
                                          className="px-3 py-1.5 text-[10px] rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5"
                                          whileHover={{ scale: 1.05, backgroundColor: "rgba(139,92,246,0.3)" }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                          </svg>
                                          Add Ticket
                                        </motion.button>
                                      )}
                                      {!(source.id === "notion" && article.title === "Product Roadmap") && (
                                        <motion.button
                                          className="px-3 py-1 text-[10px] rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          Open Article →
                                        </motion.button>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                            
                            {/* Show added tickets for Notion */}
                            {source.id === "notion" && tickets.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 pt-3 border-t border-white/10"
                              >
                                <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">New Tickets</div>
                                {tickets.map((ticket, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-2 py-1.5 px-2 my-1 rounded-md bg-green-500/10 border border-green-500/20"
                                  >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-green-400">
                                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span className="text-[10px] text-green-300">{ticket}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
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
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <path d="M21 12a9 9 0 11-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
              <span>Syncing...</span>
            </div>
            <span className="text-xs text-white/40">Updated: 2m ago</span>
          </div>

          {/* Ticket Modal */}
          <AnimatePresence>
            {showTicketModal && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-[20px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-[280px] p-4 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Add New Ticket</h3>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  </div>
                  
                  <div className="mb-3">
                    <label className="text-[10px] text-white/50 uppercase tracking-wider">Title</label>
                    <motion.div
                      ref={registerRef("ticket-input")}
                      className="mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white min-h-[36px] flex items-center"
                      animate={ticketText ? {} : { borderColor: ["rgba(255,255,255,0.1)", "rgba(139,92,246,0.3)", "rgba(255,255,255,0.1)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {ticketText || <span className="text-white/30">Enter ticket title...</span>}
                      <motion.span
                        className="w-0.5 h-4 bg-purple-400 ml-0.5"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 py-2 text-xs rounded-lg bg-white/5 text-white/60 border border-white/10"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      ref={registerRef("submit-ticket")}
                      className={`flex-1 py-2 text-xs rounded-lg border flex items-center justify-center gap-1.5 ${
                        ticketSubmitted
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {ticketSubmitted ? (
                        <>
                          <motion.svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                          >
                            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </motion.svg>
                          Added!
                        </>
                      ) : (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Add Ticket
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo indicator */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>Demo playing automatically</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
