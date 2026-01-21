"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface SourceItem {
  icon: React.ReactNode;
  name: string;
  detail: string;
  progress?: number;
  completed?: boolean;
}

interface GuidelineItem {
  title: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────

const HelpCenterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="text-emerald-400"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const NotionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/80">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <text x="9" y="15" fontSize="10" fill="currentColor" fontWeight="bold">
      N
    </text>
  </svg>
);

const ConfluenceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-400">
    <path
      d="M4 12C4 12 7 8 12 8C17 8 20 12 20 12C20 12 17 16 12 16C7 16 4 12 4 12Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-400">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 6h8M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-400">
    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Hooks
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
// Sub-components
// ─────────────────────────────────────────────────────────────

// Traffic light dots
const TrafficLights = () => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500/80" />
    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
    <div className="w-3 h-3 rounded-full bg-green-500/80" />
  </div>
);

// Search bar in header
const SearchBar = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <motion.div
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
    whileHover={reducedMotion ? {} : { backgroundColor: "rgba(255,255,255,0.08)" }}
    transition={{ duration: 0.15 }}
  >
    <SearchIcon />
    <span className="text-xs text-white/40">duckie.ai</span>
  </motion.div>
);

// Live indicator dot with pulse
const LiveIndicator = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-white/60">142 articles</span>
    <motion.div
      className="w-2 h-2 rounded-full bg-green-400"
      animate={
        reducedMotion
          ? {}
          : {
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }
      }
      transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Stat card
const StatCard = ({
  value,
  label,
  color = "text-white",
}: {
  value: string | number;
  label: string;
  color?: string;
}) => (
  <div className="flex flex-col items-center">
    <span className={`text-2xl font-bold ${color}`}>{value}</span>
    <span className="text-xs text-white/50 mt-1">{label}</span>
  </div>
);

// Source row item
const SourceRow = ({
  source,
  reducedMotion,
}: {
  source: SourceItem;
  reducedMotion: boolean;
}) => (
  <motion.div
    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer"
    whileHover={
      reducedMotion
        ? {}
        : {
            y: -2,
            borderColor: "rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.05)",
          }
    }
    transition={{ duration: 0.15 }}
  >
    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
      {source.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm text-white/90 font-medium">{source.name}</div>
      <div className="text-xs text-white/50">{source.detail}</div>
      {source.progress !== undefined && (
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
    {source.completed && (
      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
        <CheckIcon />
      </div>
    )}
  </motion.div>
);

// Guideline row item
const GuidelineRow = ({
  guideline,
  reducedMotion,
}: {
  guideline: GuidelineItem;
  reducedMotion: boolean;
}) => (
  <motion.div
    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] cursor-pointer"
    whileHover={
      reducedMotion
        ? {}
        : {
            y: -2,
            borderColor: "rgba(255,255,255,0.10)",
            backgroundColor: "rgba(255,255,255,0.04)",
          }
    }
    transition={{ duration: 0.15 }}
  >
    <div className="text-sm text-white/90 font-medium">{guideline.title}</div>
    <div className="text-xs text-white/40 mt-1">{guideline.description}</div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// Noise Texture Overlay (CSS-based for better performance)
// ─────────────────────────────────────────────────────────────

const NoiseOverlay = ({ reducedMotion }: { reducedMotion: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      animate={
        reducedMotion
          ? {}
          : {
              opacity: [0.03, 0.05, 0.03],
            }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────
// Light Sweep Effect
// ─────────────────────────────────────────────────────────────

const LightSweep = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-[20px]">
    <motion.div
      className="absolute top-0 left-0 w-1/3 h-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
      }}
      initial={{ x: "-100%" }}
      animate={
        reducedMotion
          ? { x: "-100%" }
          : {
              x: ["-100%", "400%"],
            }
      }
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────
// Sync Icon with rotation
// ─────────────────────────────────────────────────────────────

const SyncIcon = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <motion.svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className="text-white/50"
    animate={reducedMotion ? {} : { rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <path
      d="M21 12a9 9 0 11-9-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 3v3l3-1.5L12 3z"
      fill="currentColor"
    />
  </motion.svg>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function TrainingCard() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Data
  const sources: SourceItem[] = [
    {
      icon: <HelpCenterIcon />,
      name: "Help Center",
      detail: "89 articles",
      completed: true,
    },
    {
      icon: <NotionIcon />,
      name: "Notion",
      detail: "62%",
      progress: 62,
    },
    {
      icon: <ConfluenceIcon />,
      name: "Confluence",
      detail: "53 articles",
      completed: true,
    },
  ];

  const guidelines: GuidelineItem[] = [
    { title: "Tone & Voice", description: "Be friendly and helpful" },
    { title: "Escalation Rules", description: "Escalate billing issues over $500" },
    { title: "Response Format", description: "Keep responses under 3 paragraphs" },
  ];

  // Show a simple loading state until mounted
  if (!mounted) {
    return (
      <div className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* ─────────────────────────────────────────────────────────
          Background with animated gradients
          ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a1a] via-[#0a0a0a] to-[#0a0a0a]" />

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute inset-0"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, 40, 0, -40, 0],
                  y: [0, -20, 0, -20, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Purple/pink radial blob - top left */}
          <div
            className="absolute w-[800px] h-[800px] -top-[200px] -left-[200px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
            }}
          />
          {/* Pink/magenta radial blob - bottom center */}
          <div
            className="absolute w-[1000px] h-[600px] bottom-0 left-1/2 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.04) 50%, transparent 80%)",
            }}
          />
          {/* Blue accent blob - right side */}
          <div
            className="absolute w-[600px] h-[600px] top-1/4 -right-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Secondary drifting layer */}
        <motion.div
          className="absolute inset-0"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, -30, 0, 30, 0],
                  y: [0, 15, 0, 15, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="absolute w-[500px] h-[500px] top-[20%] left-[30%]"
            style={{
              background:
                "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Noise texture overlay */}
        <NoiseOverlay reducedMotion={reducedMotion} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          Floating Window
          ───────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full max-w-[580px] mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: reducedMotion ? 0 : [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Glass window container */}
        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            background: "rgba(18, 18, 18, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Light sweep effect on top bar */}
          <LightSweep reducedMotion={reducedMotion} />

          {/* ─────────────────────────────────────────────────────
              Top Bar
              ───────────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10">
            <TrafficLights />
            <SearchBar reducedMotion={reducedMotion} />
            <div className="w-12" /> {/* Spacer for balance */}
          </div>

          {/* ─────────────────────────────────────────────────────
              Header with title and indicator
              ───────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <DocumentIcon />
              </div>
              <span className="text-base font-semibold text-white">Training</span>
            </div>
            <LiveIndicator reducedMotion={reducedMotion} />
          </div>

          {/* ─────────────────────────────────────────────────────
              Stats Row
              ───────────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-4 px-5 py-6 border-b border-white/[0.06]">
            <StatCard value={142} label="Articles" color="text-purple-400" />
            <StatCard value={12} label="Guidelines" color="text-fuchsia-400" />
            <StatCard value={8} label="Runbooks" color="text-white/90" />
          </div>

          {/* ─────────────────────────────────────────────────────
              Two Column Content
              ───────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-6 p-5">
            {/* Sources Column */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">
                Sources
              </div>
              <div className="flex flex-col gap-2">
                {sources.map((source, idx) => (
                  <SourceRow
                    key={idx}
                    source={source}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>

            {/* Guidelines Column */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.12em] text-white/40 uppercase mb-3">
                Guidelines
              </div>
              <div className="flex flex-col gap-2">
                {guidelines.map((guideline, idx) => (
                  <GuidelineRow
                    key={idx}
                    guideline={guideline}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────
              Bottom Status Bar
              ───────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <SyncIcon reducedMotion={reducedMotion} />
              <span>Syncing...</span>
            </div>
            <span className="text-xs text-white/40">Updated: 2m ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
