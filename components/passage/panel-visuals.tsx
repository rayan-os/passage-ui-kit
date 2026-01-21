import * as React from "react"

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  )
}

export function UniversityPanelVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Base mesh */}
      <div className="absolute inset-0 passage-float [animation:passageFloat_7s_ease-in-out_infinite] bg-[radial-gradient(60%_60%_at_30%_20%,rgba(197,204,195,0.35)_0%,rgba(197,204,195,0.08)_35%,transparent_70%),radial-gradient(55%_55%_at_80%_65%,rgba(59,130,246,0.18)_0%,transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]" />
      {/* Shimmer line */}
      <div className="absolute inset-0 opacity-70 before:absolute before:inset-[-40%] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)] before:bg-[length:200%_100%] before:animate-glass-shimmer" />
      {/* Energy sweep */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(197,204,195,0.12),rgba(59,130,246,0.10),transparent)] passage-sweep [animation:passageSweep_1.6s_ease-out_0.35s_1]" />
      </div>

      <div className="absolute inset-0">
        <Svg>
          <defs>
            <linearGradient id="uStroke" x1="0" y1="0" x2="600" y2="420">
              <stop offset="0" stopColor="rgba(197,204,195,0.9)" />
              <stop offset="0.55" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="1" stopColor="rgba(59,130,246,0.55)" />
            </linearGradient>
            <radialGradient id="uGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(360 170) rotate(90) scale(190 240)">
              <stop stopColor="rgba(197,204,195,0.35)" />
              <stop offset="0.55" stopColor="rgba(197,204,195,0.12)" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
            <pattern id="uGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M30 0H0V30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid */}
          <rect x="0" y="0" width="600" height="420" fill="url(#uGrid)" opacity="0.55" />

          {/* Glow bloom */}
          <circle cx="360" cy="170" r="210" fill="url(#uGlow)" />

          {/* Architectural “wireframe” */}
          <path
            d="M70 290L210 210L360 250L530 160"
            stroke="url(#uStroke)"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            d="M70 290L70 340L210 265L210 210"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />
          <path
            d="M210 265L360 310L360 250"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />
          <path
            d="M360 310L530 220L530 160"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />

          {/* “Nodes” */}
          {[
            [70, 290],
            [210, 210],
            [360, 250],
            [530, 160],
            [210, 265],
            [360, 310],
            [530, 220],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="8" fill="rgba(197,204,195,0.10)" />
              <circle cx={x} cy={y} r="3" fill="rgba(197,204,195,0.85)" />
            </g>
          ))}

          {/* Scanlines */}
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d={`M0 ${40 + i * 36}H600`}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
        </Svg>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_60%_45%,transparent_0%,rgba(5,5,5,0.35)_70%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  )
}

export function StudentPanelVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Base mesh */}
      <div className="absolute inset-0 passage-float [animation:passageFloat_7.5s_ease-in-out_infinite] bg-[radial-gradient(55%_55%_at_25%_30%,rgba(59,130,246,0.35)_0%,rgba(59,130,246,0.10)_35%,transparent_70%),radial-gradient(55%_55%_at_80%_70%,rgba(244,63,94,0.22)_0%,transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]" />
      {/* Shimmer line */}
      <div className="absolute inset-0 opacity-70 before:absolute before:inset-[-40%] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)] before:bg-[length:200%_100%] before:animate-glass-shimmer" />
      {/* Energy sweep */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.14),rgba(244,63,94,0.10),transparent)] passage-sweep [animation:passageSweep_1.6s_ease-out_0.45s_1]" />
      </div>

      <div className="absolute inset-0">
        <Svg>
          <defs>
            <linearGradient id="sStroke" x1="0" y1="0" x2="600" y2="420">
              <stop offset="0" stopColor="rgba(59,130,246,0.9)" />
              <stop offset="0.55" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="1" stopColor="rgba(244,63,94,0.65)" />
            </linearGradient>
            <radialGradient id="sGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(260 220) rotate(90) scale(210 260)">
              <stop stopColor="rgba(59,130,246,0.32)" />
              <stop offset="0.55" stopColor="rgba(59,130,246,0.10)" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
            <pattern id="sDots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.10)" />
            </pattern>
          </defs>

          {/* Dotted field */}
          <rect x="0" y="0" width="600" height="420" fill="url(#sDots)" opacity="0.65" />

          {/* Glow bloom */}
          <circle cx="260" cy="220" r="240" fill="url(#sGlow)" />

          {/* Orbit arcs */}
          <path
            d="M95 270C160 150 290 90 420 120C510 142 560 220 520 292C470 382 310 400 210 345C150 312 120 295 95 270Z"
            stroke="url(#sStroke)"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            d="M140 305C210 210 330 175 430 205C495 225 530 278 500 322C450 395 320 382 245 350"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* Waypoints */}
          {[
            [140, 305],
            [225, 205],
            [360, 188],
            [465, 240],
            [500, 322],
            [245, 350],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="9" fill="rgba(59,130,246,0.10)" />
              <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
            </g>
          ))}

          {/* Subtle diagonal “flow” lines */}
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d={`M${-40 + i * 70} 430L${120 + i * 70} -10`}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
        </Svg>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,transparent_0%,rgba(5,5,5,0.35)_70%,rgba(5,5,5,0.72)_100%)]" />
    </div>
  )
}

export function UniversityCardBackdrop() {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="uOrb" x1="0" y1="0" x2="600" y2="420">
          <stop offset="0" stopColor="rgba(197,204,195,0.20)" />
          <stop offset="0.55" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="1" stopColor="rgba(59,130,246,0.14)" />
        </linearGradient>
      </defs>
      <path
        d="M-40 290C80 160 230 120 360 160C490 200 600 150 680 90"
        stroke="url(#uOrb)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      <path
        d="M-10 330C120 210 270 190 380 225C500 265 610 230 690 185"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.2"
        opacity="0.45"
      />
      {[...Array(16)].map((_, i) => (
        <circle
          key={i}
          cx={50 + i * 38}
          cy={60 + (i % 4) * 28}
          r="1"
          fill="rgba(255,255,255,0.10)"
          opacity="0.6"
        />
      ))}
    </svg>
  )
}

export function StudentCardBackdrop() {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sOrb" x1="0" y1="0" x2="600" y2="420">
          <stop offset="0" stopColor="rgba(59,130,246,0.20)" />
          <stop offset="0.55" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="1" stopColor="rgba(244,63,94,0.14)" />
        </linearGradient>
      </defs>
      <path
        d="M20 320C120 150 290 110 410 150C520 185 585 250 560 315C525 410 330 420 210 360"
        stroke="url(#sOrb)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      <path
        d="M80 345C170 220 300 200 400 235C500 268 545 320 515 360"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.2"
        opacity="0.45"
      />
      {[
        [150, 265],
        [245, 210],
        [345, 220],
        [455, 270],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="6" fill="rgba(59,130,246,0.07)" />
          <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
        </g>
      ))}
    </svg>
  )
}

