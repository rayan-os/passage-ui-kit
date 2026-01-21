"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface Student {
  id: string;
  name: string;
  country: string;
  flag: string;
  program: string;
  gpa: number;
  status: "submitted" | "in_review" | "approved" | "rejected" | "pending";
  photo: string;
  email: string;
  documents: { name: string; status: "verified" | "pending" | "missing" }[];
  appliedDate: string;
  aiScore: number;
}

interface DemoStep {
  type: "move" | "click" | "type" | "wait" | "scroll" | "load";
  target?: string;
  text?: string;
  duration?: number;
  scrollTo?: number;
}

// ─────────────────────────────────────────────────────────────
// Generate Students Data
// ─────────────────────────────────────────────────────────────

const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "China", flag: "🇨🇳" },
  { name: "India", flag: "🇮🇳" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
];

const firstNames = ["Emma", "Liam", "Yuki", "Chen", "Priya", "Mohammed", "Sofia", "Lucas", "Fatima", "Hiroshi", "Anna", "Carlos", "Aisha", "Viktor", "Maria", "Jin", "Olga", "Ahmed", "Nina", "David", "Sara", "Max", "Leila", "Tom", "Zara", "Kai", "Elena", "Omar", "Julia", "Raj"];
const lastNames = ["Smith", "Müller", "Tanaka", "Wang", "Patel", "Al-Hassan", "Garcia", "Silva", "Kim", "Johnson", "Novak", "Santos", "Ibrahim", "Petrov", "Martinez", "Liu", "Ivanova", "Hassan", "Kowalski", "Anderson", "Yamamoto", "Chen", "Schmidt", "Rossi", "Park"];
const programs = ["Computer Science", "Business Administration", "Mechanical Engineering", "Data Science", "Medicine", "Law", "Architecture", "Psychology", "Economics", "Biotechnology"];
const statuses: Student["status"][] = ["submitted", "in_review", "approved", "rejected", "pending"];

const generateStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const gpa = (3.0 + Math.random() * 1.0).toFixed(2);
    const aiScore = Math.floor(60 + Math.random() * 40);

    return {
      id: `STU-${String(i + 1).padStart(4, "0")}`,
      name: `${firstName} ${lastName}`,
      country: country.name,
      flag: country.flag,
      program: programs[Math.floor(Math.random() * programs.length)],
      gpa: parseFloat(gpa),
      status,
      photo: `${firstName[0]}${lastName[0]}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      documents: [
        { name: "Transcript", status: Math.random() > 0.2 ? "verified" : "pending" },
        { name: "Passport", status: Math.random() > 0.15 ? "verified" : "pending" },
        { name: "Statement of Purpose", status: Math.random() > 0.25 ? "verified" : "missing" },
        { name: "Recommendation Letters", status: Math.random() > 0.3 ? "verified" : "pending" },
        { name: "English Proficiency", status: Math.random() > 0.2 ? "verified" : "pending" },
      ],
      appliedDate: `${Math.floor(Math.random() * 28) + 1} days ago`,
      aiScore,
    };
  });
};

const allStudents = generateStudents(100);

// Demo sequence
const demoSequence: DemoStep[] = [
  { type: "wait", duration: 600 },
  { type: "move", target: "search-bar", duration: 500 },
  { type: "click", target: "search-bar" },
  { type: "type", text: "passage.ai/admissions", duration: 1400 },
  { type: "wait", duration: 300 },
  { type: "click", target: "search-bar" },
  { type: "load", duration: 1800 },
  { type: "wait", duration: 800 },
  { type: "scroll", scrollTo: 150, duration: 1200 },
  { type: "wait", duration: 400 },
  { type: "scroll", scrollTo: 350, duration: 1000 },
  { type: "wait", duration: 300 },
  { type: "move", target: "student-5", duration: 500 },
  { type: "click", target: "student-5" },
  { type: "wait", duration: 1500 },
  { type: "move", target: "approve-btn", duration: 400 },
  { type: "click", target: "approve-btn" },
  { type: "wait", duration: 2500 },
  { type: "move", target: "close-modal", duration: 300 },
  { type: "click", target: "close-modal" },
  { type: "wait", duration: 500 },
  { type: "scroll", scrollTo: 600, duration: 800 },
  { type: "move", target: "student-12", duration: 400 },
  { type: "click", target: "student-12" },
  { type: "wait", duration: 1200 },
  { type: "move", target: "reject-btn", duration: 400 },
  { type: "click", target: "reject-btn" },
  { type: "wait", duration: 1500 },
  { type: "move", target: "close-modal", duration: 300 },
  { type: "click", target: "close-modal" },
  { type: "wait", duration: 800 },
  { type: "move", target: "filter-in-review", duration: 500 },
  { type: "click", target: "filter-in-review" },
  { type: "wait", duration: 2000 },
  { type: "scroll", scrollTo: 0, duration: 600 },
  { type: "wait", duration: 1500 },
];

// ─────────────────────────────────────────────────────────────
// Virtual Cursor
// ─────────────────────────────────────────────────────────────

const VirtualCursor = ({ position, clicking, visible }: { position: { x: number; y: number }; clicking: boolean; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute pointer-events-none z-[200]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: clicking ? 0.85 : 1, x: position.x, y: position.y }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ x: { type: "spring", stiffness: 150, damping: 22 }, y: { type: "spring", stiffness: 150, damping: 22 }, scale: { duration: 0.1 } }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}>
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
        </svg>
        <AnimatePresence>
          {clicking && (
            <motion.div
              className="absolute top-0 left-0 w-10 h-10 rounded-full bg-emerald-400/60"
              initial={{ scale: 0.3, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transform: "translate(-30%, -30%)" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────────────────────────────────────────────
// Status Badge
// ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: Student["status"] }) => {
  const config = {
    submitted: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", label: "Submitted" },
    in_review: { bg: "bg-yellow-500/20", border: "border-yellow-500/30", text: "text-yellow-400", label: "In Review" },
    approved: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400", label: "Approved" },
    rejected: { bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400", label: "Rejected" },
    pending: { bg: "bg-white/10", border: "border-white/20", text: "text-white/60", label: "Pending" },
  };
  const c = config[status];
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
      {c.label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// LOI Modal
// ─────────────────────────────────────────────────────────────

const LOIModal = ({ student, action, onClose }: { student: Student; action: "approve" | "reject"; onClose: () => void }) => {
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-[150] flex items-center justify-center bg-black/70 backdrop-blur-md rounded-[20px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-[380px] p-5 rounded-2xl bg-[#151515] border border-white/10 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              {action === "approve" ? "Generating Letter of Intent" : "Generating Rejection Letter"}
            </h3>
            <p className="text-xs text-white/50 mt-1">For {student.name}</p>
          </div>
          <motion.button
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        {generating ? (
          <div className="py-6">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className={`w-16 h-16 rounded-2xl ${action === "approve" ? "bg-emerald-500/20" : "bg-red-500/20"} flex items-center justify-center`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <motion.svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={action === "approve" ? "text-emerald-400" : "text-red-400"}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 6h8M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              </motion.div>
            </div>
            <div className="text-center mb-4">
              <motion.p className="text-sm text-white/70" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                AI is generating document...
              </motion.p>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${action === "approve" ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gradient-to-r from-red-500 to-orange-500"} rounded-full`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-xs text-white/40 mt-2">{progress}%</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`p-4 rounded-xl ${action === "approve" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/20"} mb-4`}>
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className={`w-8 h-8 rounded-full ${action === "approve" ? "bg-emerald-500/30" : "bg-red-500/30"} flex items-center justify-center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {action === "approve" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-400">
                      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                </motion.div>
                <span className={`text-sm font-medium ${action === "approve" ? "text-emerald-400" : "text-red-400"}`}>
                  {action === "approve" ? "LOI Generated Successfully" : "Rejection Letter Generated"}
                </span>
              </div>
              <div className="text-xs text-white/60 space-y-1">
                <p><span className="text-white/40">Student:</span> {student.name}</p>
                <p><span className="text-white/40">Program:</span> {student.program}</p>
                <p><span className="text-white/40">Document ID:</span> LOI-{student.id.replace("STU-", "")}</p>
                <p><span className="text-white/40">Generated:</span> Just now</p>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-medium flex items-center justify-center gap-2"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Download PDF
              </motion.button>
              <motion.button
                className={`flex-1 py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 ${
                  action === "approve" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-red-500/20 border border-red-500/30 text-red-400"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Send to Student
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [students, setStudents] = useState<Student[]>(allStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showLOI, setShowLOI] = useState<{ student: Student; action: "approve" | "reject" } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [cursorPosition, setCursorPosition] = useState({ x: 300, y: 200 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) elementRefs.current.set(id, el);
  };

  const filteredStudents = activeFilter === "all" ? students : students.filter((s) => s.status === activeFilter);
  const stats = {
    total: students.length,
    approved: students.filter((s) => s.status === "approved").length,
    rejected: students.filter((s) => s.status === "rejected").length,
    inReview: students.filter((s) => s.status === "in_review").length,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Demo automation
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    const getPos = (id: string) => {
      const el = elementRefs.current.get(id);
      if (el && containerRef.current) {
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return { x: rect.left - containerRect.left + rect.width / 2 - 14, y: rect.top - containerRect.top + rect.height / 2 - 14 };
      }
      return null;
    };

    const runStep = async (step: DemoStep) => {
      if (cancelled) return;
      switch (step.type) {
        case "move": {
          if (step.target) {
            const pos = getPos(step.target);
            if (pos) setCursorPosition(pos);
          }
          setCursorVisible(true);
          await new Promise((r) => setTimeout(r, step.duration || 500));
          break;
        }
        case "click": {
          setCursorClicking(true);
          await new Promise((r) => setTimeout(r, 150));
          if (step.target === "search-bar") setSearchFocused(true);
          else if (step.target?.startsWith("student-")) {
            const idx = parseInt(step.target.replace("student-", ""));
            const student = filteredStudents[idx];
            if (student) setSelectedStudent(student);
          } else if (step.target === "approve-btn" && selectedStudent) {
            setStudents((prev) => prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "approved" } : s)));
            setShowLOI({ student: selectedStudent, action: "approve" });
          } else if (step.target === "reject-btn" && selectedStudent) {
            setStudents((prev) => prev.map((s) => (s.id === selectedStudent.id ? { ...s, status: "rejected" } : s)));
            setShowLOI({ student: selectedStudent, action: "reject" });
          } else if (step.target === "close-modal") {
            setShowLOI(null);
            setSelectedStudent(null);
          } else if (step.target === "filter-in-review") {
            setActiveFilter("in_review");
          }
          await new Promise((r) => setTimeout(r, 100));
          setCursorClicking(false);
          break;
        }
        case "type": {
          if (step.text) {
            for (const char of step.text.split("")) {
              if (cancelled) break;
              setSearchText((p) => p + char);
              await new Promise((r) => setTimeout(r, (step.duration || 1000) / step.text.length));
            }
          }
          break;
        }
        case "scroll": {
          if (listRef.current && step.scrollTo !== undefined) {
            const start = listRef.current.scrollTop;
            const end = step.scrollTo;
            const duration = step.duration || 500;
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              if (listRef.current) {
                listRef.current.scrollTop = start + (end - start) * eased;
                setScrollPosition(listRef.current.scrollTop);
              }
              if (progress < 1 && !cancelled) requestAnimationFrame(animate);
            };
            animate();
            await new Promise((r) => setTimeout(r, duration));
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
      }
    };

    const runDemo = async () => {
      while (!cancelled) {
        // Reset
        setSearchText("");
        setSearchFocused(false);
        setAppLoaded(false);
        setSelectedStudent(null);
        setShowLOI(null);
        setActiveFilter("all");
        setStudents(allStudents);
        setCursorVisible(false);
        if (listRef.current) listRef.current.scrollTop = 0;

        for (const step of demoSequence) {
          if (cancelled) break;
          await runStep(step);
          await new Promise((r) => setTimeout(r, 30));
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    };

    runDemo();
    return () => { cancelled = true; };
  }, [mounted]);

  if (!mounted) {
    return <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white/40 text-sm">Loading...</div></div>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" animate={{ x: [0, 25, 0, -25, 0], y: [0, -10, 0, -10, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}>
          <div className="absolute w-[1000px] h-[1000px] -top-[400px] -left-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 50%)" }} />
          <div className="absolute w-[800px] h-[600px] bottom-0 right-0" style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 60%)" }} />
          <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 50%)" }} />
        </motion.div>
      </div>

      {/* Main Window */}
      <motion.div
        ref={containerRef}
        className="relative z-20 w-full max-w-[900px] mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ opacity: { duration: 0.8 }, y: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div className="relative rounded-[24px] overflow-hidden" style={{ background: "rgba(10, 10, 10, 0.95)", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 40px 120px rgba(0, 0, 0, 0.7)", backdropFilter: "blur(30px)" }}>
          {/* Loading */}
          <AnimatePresence>
            {isLoading && (
              <motion.div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] rounded-[24px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                  <span className="text-3xl font-bold text-white">P</span>
                </motion.div>
                <motion.div className="flex gap-1.5">{[0, 1, 2].map((i) => (<motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-emerald-400" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />))}</motion.div>
                <motion.p className="mt-4 text-sm text-white/50" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>Loading Admissions Portal...</motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOI Modal */}
          <AnimatePresence>
            {showLOI && <LOIModal student={showLOI.student} action={showLOI.action} onClose={() => setShowLOI(null)} />}
          </AnimatePresence>

          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <motion.div ref={registerRef("search-bar")} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${searchFocused ? "bg-white/10 border-emerald-500/50 ring-2 ring-emerald-500/20" : "bg-white/5 border-white/10"} border min-w-[240px]`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              <span className="text-sm text-white/60">{searchText || "Search..."}{searchFocused && <motion.span className="inline-block w-0.5 h-4 bg-emerald-400 ml-0.5" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />}</span>
            </motion.div>
            <div className="w-16" />
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {!appLoaded ? (
              <motion.div key="empty" className="flex items-center justify-center h-[500px] text-white/30" exit={{ opacity: 0 }}>
                <div className="text-center"><div className="text-5xl mb-4">🎓</div><p className="text-sm">Search passage.ai/admissions to begin</p></div>
              </motion.div>
            ) : (
              <motion.div key="app" className="flex h-[500px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Sidebar */}
                <div className="w-[200px] border-r border-white/[0.06] p-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"><span className="text-lg font-bold text-white">P</span></div>
                    <div><div className="text-sm font-semibold text-white">Passage AI</div><div className="text-[10px] text-white/40">Admissions Portal</div></div>
                  </div>

                  <div className="space-y-1 mb-6">
                    {[{ label: "All Applications", value: "all", count: stats.total }, { label: "Approved", value: "approved", count: stats.approved }, { label: "In Review", value: "in_review", count: stats.inReview }, { label: "Rejected", value: "rejected", count: stats.rejected }].map((f) => (
                      <motion.div key={f.value} ref={f.value === "in_review" ? registerRef("filter-in-review") : undefined} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeFilter === f.value ? "bg-emerald-500/10 border border-emerald-500/20" : "hover:bg-white/[0.04]"}`} whileHover={{ x: 2 }}>
                        <span className={`text-xs ${activeFilter === f.value ? "text-emerald-400" : "text-white/70"}`}>{f.label}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${activeFilter === f.value ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40"}`}>{f.count}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                    <div className="text-[10px] text-emerald-400/70 uppercase tracking-wider mb-1">AI Processing</div>
                    <div className="text-lg font-bold text-white">{stats.total - stats.inReview}</div>
                    <div className="text-[10px] text-white/40">Documents analyzed today</div>
                  </div>
                </div>

                {/* Student List */}
                <div className="flex-1 flex flex-col">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-white">Student Applications</h2>
                      <span className="text-xs text-white/40">{filteredStudents.length} students</span>
                    </div>
                  </div>

                  <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1" style={{ scrollBehavior: "auto" }}>
                    {filteredStudents.slice(0, 20).map((student, idx) => (
                      <motion.div
                        key={student.id}
                        ref={registerRef(`student-${idx}`)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedStudent?.id === student.id ? "bg-emerald-500/10 border border-emerald-500/30" : "hover:bg-white/[0.04] border border-transparent"}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-sm font-medium text-white/70 border border-white/10">{student.photo}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white truncate">{student.name}</span>
                            <span className="text-base">{student.flag}</span>
                          </div>
                          <div className="text-[10px] text-white/40 truncate">{student.program} • GPA {student.gpa}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <StatusBadge status={student.status} />
                          <span className="text-[9px] text-white/30">{student.appliedDate}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Detail Panel */}
                <div className="w-[260px] border-l border-white/[0.06] p-4">
                  <AnimatePresence mode="wait">
                    {selectedStudent ? (
                      <motion.div key={selectedStudent.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} ref={registerRef("close-modal")}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-xl font-bold text-white/80 border border-white/10">{selectedStudent.photo}</div>
                          <div>
                            <div className="text-sm font-semibold text-white">{selectedStudent.name}</div>
                            <div className="text-[10px] text-white/50 flex items-center gap-1">{selectedStudent.flag} {selectedStudent.country}</div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-white/[0.03]">
                            <div className="text-[9px] text-white/40 uppercase tracking-wider">Program</div>
                            <div className="text-xs text-white/80">{selectedStudent.program}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 rounded-lg bg-white/[0.03]">
                              <div className="text-[9px] text-white/40 uppercase">GPA</div>
                              <div className="text-sm font-semibold text-white">{selectedStudent.gpa}</div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white/[0.03]">
                              <div className="text-[9px] text-white/40 uppercase">AI Score</div>
                              <div className={`text-sm font-semibold ${selectedStudent.aiScore >= 85 ? "text-emerald-400" : selectedStudent.aiScore >= 70 ? "text-yellow-400" : "text-red-400"}`}>{selectedStudent.aiScore}%</div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-[9px] text-white/40 uppercase tracking-wider mb-2">Documents</div>
                          <div className="space-y-1.5">
                            {selectedStudent.documents.map((doc) => (
                              <div key={doc.name} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
                                <span className="text-[10px] text-white/60">{doc.name}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${doc.status === "verified" ? "bg-emerald-500/20 text-emerald-400" : doc.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                                  {doc.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <motion.button ref={registerRef("approve-btn")} className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center justify-center gap-2" whileHover={{ scale: 1.02, backgroundColor: "rgba(16,185,129,0.3)" }} whileTap={{ scale: 0.98 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                            Approve & Generate LOI
                          </motion.button>
                          <motion.button ref={registerRef("reject-btn")} className="w-full py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-xs font-medium" whileHover={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }} whileTap={{ scale: 0.98 }}>
                            Reject Application
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" className="flex flex-col items-center justify-center h-full text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="text-4xl mb-3">📋</div>
                        <p className="text-xs text-white/40">Select a student<br />to review their application</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo indicator */}
        <motion.div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-white/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span>Demo • AI Admissions Document Processor</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
