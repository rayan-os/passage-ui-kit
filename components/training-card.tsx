"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface Ticket {
  id: string;
  query: string;
  score: number;
  status: "pass" | "review" | "fail";
  expected?: string;
  response?: string;
  country?: string;
}

interface TestSuite {
  name: string;
  count: number;
  active?: boolean;
}

interface DemoStep {
  type: "move" | "click" | "type" | "wait" | "clear" | "load";
  target?: string;
  text?: string;
  duration?: number;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const testSuites: TestSuite[] = [
  { name: "Historic", count: 127, active: true },
  { name: "Edge Cases", count: 34 },
  { name: "Regression", count: 56 },
];

const initialTickets: Ticket[] = [
  { id: "TKT-8921", query: "Password reset not working", score: 98, status: "pass", country: "🇺🇸", expected: "Reset link sent", response: "Password reset email sent successfully" },
  { id: "TKT-8922", query: "Billing inquiry - wrong charge", score: 95, status: "pass", country: "🇬🇧", expected: "Refund processed", response: "Charge reversed, refund initiated" },
  { id: "TKT-8923", query: "Cancel subscription request", score: 72, status: "review", country: "🇩🇪", expected: "Cancellation confirmed", response: "Retention offer made" },
  { id: "TKT-8924", query: "Product not delivered", score: 96, status: "pass", country: "🇫🇷", expected: "Shipping update", response: "Replacement order created" },
  { id: "TKT-8925", query: "Account access blocked", score: 68, status: "review", country: "🇯🇵", expected: "Account unlocked", response: "Security verification required" },
];

const demoSequence: DemoStep[] = [
  { type: "wait", duration: 800 },
  { type: "move", target: "search-bar", duration: 600 },
  { type: "click", target: "search-bar" },
  { type: "type", text: "passage.ai", duration: 1200 },
  { type: "wait", duration: 400 },
  { type: "click", target: "search-bar" },
  { type: "load", duration: 1500 },
  { type: "wait", duration: 1000 },
  { type: "move", target: "run-batch", duration: 600 },
  { type: "click", target: "run-batch" },
  { type: "wait", duration: 2500 },
  { type: "move", target: "ticket-TKT-8923", duration: 500 },
  { type: "click", target: "ticket-TKT-8923" },
  { type: "wait", duration: 1200 },
  { type: "move", target: "approve-btn", duration: 400 },
  { type: "click", target: "approve-btn" },
  { type: "wait", duration: 800 },
  { type: "move", target: "ticket-TKT-8925", duration: 500 },
  { type: "click", target: "ticket-TKT-8925" },
  { type: "wait", duration: 1000 },
  { type: "move", target: "fail-btn", duration: 400 },
  { type: "click", target: "fail-btn" },
  { type: "wait", duration: 1000 },
  { type: "move", target: "edge-cases", duration: 500 },
  { type: "click", target: "edge-cases" },
  { type: "wait", duration: 2000 },
  { type: "clear" },
];

// ─────────────────────────────────────────────────────────────
// Virtual Cursor
// ─────────────────────────────────────────────────────────────

const VirtualCursor = ({ position, clicking, visible }: { position: { x: number; y: number }; clicking: boolean; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute pointer-events-none z-[100]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: clicking ? 0.85 : 1, x: position.x, y: position.y }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ x: { type: "spring", stiffness: 120, damping: 20 }, y: { type: "spring", stiffness: 120, damping: 20 }, scale: { duration: 0.1 } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
        </svg>
        <AnimatePresence>
          {clicking && (
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 rounded-full bg-cyan-400/50"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transform: "translate(-25%, -25%)" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────────────────────────────────────────────
// Loading Screen
// ─────────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <motion.div
    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d] rounded-[20px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-4"
      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span className="text-2xl font-bold text-white">P</span>
    </motion.div>
    <motion.div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
    <motion.p
      className="mt-4 text-sm text-white/50"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Loading Passage AI...
    </motion.p>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// Progress Bar Animation
// ─────────────────────────────────────────────────────────────

const ProgressBar = ({ progress, total }: { progress: number; total: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-white/70">
      <span className="text-cyan-400 font-semibold">{progress}</span>/{total}
    </span>
    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(progress / total) * 100}%` }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [activeSuite, setActiveSuite] = useState("Historic");
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0, review: 0 });

  // Cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 300, y: 200 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) elementRefs.current.set(id, el);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats when tickets change
  useEffect(() => {
    if (appLoaded) {
      const passed = tickets.filter((t) => t.status === "pass").length;
      const failed = tickets.filter((t) => t.status === "fail").length;
      const review = tickets.filter((t) => t.status === "review").length;
      setStats({ total: tickets.length, passed, failed, review });
    }
  }, [tickets, appLoaded]);

  // Demo automation
  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    const getElementPosition = (id: string) => {
      const el = elementRefs.current.get(id);
      if (el && containerRef.current) {
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2 - 12,
          y: rect.top - containerRect.top + rect.height / 2 - 12,
        };
      }
      return null;
    };

    const runStep = async (step: DemoStep) => {
      if (cancelled) return;

      switch (step.type) {
        case "move": {
          if (step.target) {
            const pos = getElementPosition(step.target);
            if (pos) setCursorPosition(pos);
          }
          setCursorVisible(true);
          await new Promise((r) => setTimeout(r, step.duration || 500));
          break;
        }
        case "click": {
          setCursorClicking(true);
          await new Promise((r) => setTimeout(r, 150));

          if (step.target === "search-bar") {
            setSearchFocused(true);
          } else if (step.target === "run-batch") {
            setBatchRunning(true);
            setBatchProgress(0);
            // Animate progress
            for (let i = 0; i <= 127; i += 3) {
              if (cancelled) break;
              setBatchProgress(Math.min(i, 127));
              await new Promise((r) => setTimeout(r, 15));
            }
            setBatchProgress(127);
            setBatchRunning(false);
          } else if (step.target?.startsWith("ticket-")) {
            const ticketId = step.target.replace("ticket-", "");
            const ticket = tickets.find((t) => t.id === ticketId);
            if (ticket) setSelectedTicket(ticket);
          } else if (step.target === "approve-btn" && selectedTicket) {
            setTickets((prev) =>
              prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: "pass" as const } : t))
            );
            setSelectedTicket((prev) => (prev ? { ...prev, status: "pass" } : null));
          } else if (step.target === "fail-btn" && selectedTicket) {
            setTickets((prev) =>
              prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: "fail" as const } : t))
            );
            setSelectedTicket((prev) => (prev ? { ...prev, status: "fail" } : null));
          } else if (step.target === "edge-cases") {
            setActiveSuite("Edge Cases");
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
              if (cancelled) break;
              setSearchText((prev) => prev + char);
              await new Promise((r) => setTimeout(r, delay));
            }
          }
          break;
        }
        case "load": {
          setIsLoading(true);
          await new Promise((r) => setTimeout(r, step.duration || 1500));
          setIsLoading(false);
          setAppLoaded(true);
          break;
        }
        case "wait": {
          await new Promise((r) => setTimeout(r, step.duration || 500));
          break;
        }
        case "clear": {
          // Reset everything for loop
          setSearchText("");
          setSearchFocused(false);
          setAppLoaded(false);
          setBatchRunning(false);
          setBatchProgress(0);
          setSelectedTicket(null);
          setTickets(initialTickets);
          setActiveSuite("Historic");
          setCursorVisible(false);
          await new Promise((r) => setTimeout(r, 1500));
          break;
        }
      }
    };

    const runDemo = async () => {
      while (!cancelled) {
        for (const step of demoSequence) {
          if (cancelled) break;
          await runStep(step);
          await new Promise((r) => setTimeout(r, 50));
        }
      }
    };

    runDemo();

    return () => {
      cancelled = true;
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{ x: [0, 30, 0, -30, 0], y: [0, -15, 0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute w-[900px] h-[900px] -top-[300px] -left-[200px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)" }} />
          <div className="absolute w-[800px] h-[500px] bottom-0 left-1/2 -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, transparent 70%)" }} />
          <div className="absolute w-[600px] h-[600px] top-1/3 -right-[150px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)" }} />
        </motion.div>
      </div>

      {/* Main Window */}
      <motion.div
        ref={containerRef}
        className="relative z-20 w-full max-w-[820px] mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.8 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            background: "rgba(13, 13, 13, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 30px 100px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Loading Overlay */}
          <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            {/* Search Bar */}
            <motion.div
              ref={registerRef("search-bar")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                searchFocused ? "bg-white/10 border-cyan-500/50" : "bg-white/5 border-white/10"
              } border min-w-[200px]`}
              animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-white/60 min-w-[100px]">
                {searchText || "Search..."}
                {searchFocused && !searchText && (
                  <motion.span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                )}
                {searchFocused && searchText && (
                  <motion.span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                )}
              </span>
            </motion.div>

            <div className="w-16" />
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {!appLoaded ? (
              <motion.div
                key="empty"
                className="flex items-center justify-center h-[450px] text-white/30"
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-sm">Search for passage.ai to begin</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="app"
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Sidebar */}
                <div className="w-[160px] border-r border-white/[0.06] p-4">
                  <div className="text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase mb-3">Test Suite</div>
                  <div className="space-y-1">
                    {testSuites.map((suite) => (
                      <motion.div
                        key={suite.name}
                        ref={suite.name === "Edge Cases" ? registerRef("edge-cases") : undefined}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          activeSuite === suite.name ? "bg-white/[0.08] border border-white/10" : "hover:bg-white/[0.04]"
                        }`}
                        whileHover={{ x: 2 }}
                      >
                        <span className="text-xs text-white/80">{suite.name}</span>
                        <span className={`text-xs ${activeSuite === suite.name ? "text-cyan-400" : "text-white/40"}`}>
                          {suite.count}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase mt-6 mb-3">Agent</div>
                  <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-xs text-white/70">Support Agent v2.1</span>
                  </div>

                  <motion.button
                    ref={registerRef("run-batch")}
                    className="mt-6 w-full py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(6,182,212,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {batchRunning ? (
                      <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <path d="M21 12a9 9 0 11-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </motion.svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                      </svg>
                    )}
                    {batchRunning ? "Running..." : "Run Batch Test"}
                  </motion.button>
                </div>

                {/* Center Content */}
                <div className="flex-1 p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-base font-semibold text-white">Batch Testing</span>
                    </div>
                    <ProgressBar progress={batchProgress} total={127} />
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "TOTAL", value: stats.total || 127, color: "text-white" },
                      { label: "PASSED", value: stats.passed || 119, color: "text-green-400" },
                      { label: "FAILED", value: stats.failed || 3, color: "text-red-400" },
                      { label: "REVIEW", value: stats.review || 5, color: "text-yellow-400" },
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                        whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
                      >
                        <div className="text-[9px] text-white/40 uppercase tracking-wider">{stat.label}</div>
                        <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[80px_1fr_70px_80px] gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/[0.06] text-[9px] text-white/40 uppercase tracking-wider">
                      <span>Ticket</span>
                      <span>Query</span>
                      <span>Score</span>
                      <span>Status</span>
                    </div>

                    {/* Table Rows */}
                    {tickets.map((ticket, idx) => (
                      <motion.div
                        key={ticket.id}
                        ref={registerRef(`ticket-${ticket.id}`)}
                        className={`grid grid-cols-[80px_1fr_70px_80px] gap-2 px-3 py-2.5 border-b border-white/[0.04] cursor-pointer transition-colors ${
                          selectedTicket?.id === ticket.id ? "bg-cyan-500/10" : "hover:bg-white/[0.03]"
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 2 }}
                      >
                        <span className="text-xs text-white/50">{ticket.id}</span>
                        <span className="text-xs text-white/80 truncate">{ticket.query}</span>
                        <span className={`text-xs font-medium ${ticket.score >= 90 ? "text-green-400" : ticket.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                          {ticket.score}%
                        </span>
                        <motion.span
                          className={`text-[10px] px-2 py-0.5 rounded-full inline-flex items-center justify-center gap-1 w-fit ${
                            ticket.status === "pass"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : ticket.status === "review"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                          layout
                        >
                          {ticket.status === "pass" && "✓ Pass"}
                          {ticket.status === "review" && "? Review"}
                          {ticket.status === "fail" && "✗ Fail"}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Panel */}
                <div className="w-[200px] border-l border-white/[0.06] p-4">
                  <AnimatePresence mode="wait">
                    {selectedTicket ? (
                      <motion.div
                        key={selectedTicket.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Review</div>
                        <div className="text-sm font-medium text-white mb-3">{selectedTicket.query}</div>

                        <div className="mb-4 p-2 rounded-lg bg-white/[0.03]">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-white/40 uppercase">Confidence</span>
                            <span
                              className={`text-lg font-bold ${
                                selectedTicket.score >= 90 ? "text-green-400" : selectedTicket.score >= 70 ? "text-yellow-400" : "text-red-400"
                              }`}
                            >
                              {selectedTicket.score}%
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                selectedTicket.score >= 90 ? "bg-green-400" : selectedTicket.score >= 70 ? "bg-yellow-400" : "bg-red-400"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedTicket.score}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Expected</div>
                          <div className="text-xs text-white/70">{selectedTicket.expected}</div>
                        </div>

                        <div className="mb-4 p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                          <div className="text-[9px] text-cyan-400/70 uppercase tracking-wider mb-1">Response</div>
                          <div className="text-xs text-white/80">{selectedTicket.response}</div>
                        </div>

                        <div className="space-y-2">
                          <motion.button
                            ref={registerRef("approve-btn")}
                            className="w-full py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Approve
                          </motion.button>
                          <motion.button
                            ref={registerRef("fail-btn")}
                            className="w-full py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/50 text-xs font-medium"
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Fail
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        className="flex flex-col items-center justify-center h-full text-white/30 text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="text-2xl mb-2">👈</div>
                        <p className="text-xs">Select a ticket to review</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo indicator */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>Demo playing • Document Processor Agent</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
