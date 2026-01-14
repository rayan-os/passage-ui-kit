/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // GIGA Design System Colors
        giga: {
          bg: '#0a0a0a',
          panel: '#121212',
          'panel-2': '#161616',
          card: '#141414',
          'card-hover': '#1a1a1a',
          accent: '#c5ccc3',
          'accent-2': '#a8b0a5',
          blue: '#3b82f6',
          teal: '#14b8a6',
          orange: '#ff6b35',
          yellow: '#fbbf24',
        },
        // Liquid Glass Colors
        glass: {
          bg: 'rgba(255, 255, 255, 0.03)',
          'bg-elevated': 'rgba(255, 255, 255, 0.05)',
          'bg-hover': 'rgba(255, 255, 255, 0.07)',
          'bg-active': 'rgba(255, 255, 255, 0.10)',
          border: 'rgba(255, 255, 255, 0.10)',
          'border-subtle': 'rgba(255, 255, 255, 0.06)',
          'border-strong': 'rgba(255, 255, 255, 0.15)',
        },
        // Semantic colors
        border: "rgba(255, 255, 255, 0.10)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#c5ccc3",
        background: "#0a0a0a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#c5ccc3",
          foreground: "#0a0a0a",
        },
        secondary: {
          DEFAULT: "#161616",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "rgba(255, 255, 255, 0.55)",
        },
        accent: {
          DEFAULT: "#c5ccc3",
          foreground: "#0a0a0a",
        },
        popover: {
          DEFAULT: "#121212",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#121212",
          foreground: "#ffffff",
        },
        sidebar: {
          DEFAULT: "#121212",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#fbbf24",
        },
      },
      borderRadius: {
        // Liquid Glass Radii - softer, more organic
        'glass-sm': '10px',
        'glass-md': '14px',
        'glass-lg': '20px',
        'glass-xl': '28px',
        'glass-capsule': '9999px',
        // Legacy
        lg: "20px",
        md: "12px",
        sm: "8px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        // Liquid Glass Shadows - layered depth
        'glass': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.08)',
        'glass-sm': '0 1px 2px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'glass-md': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 16px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 0 0 1px rgba(255, 255, 255, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16), 0 16px 32px rgba(0, 0, 0, 0.12)',
        'glass-glow': '0 0 20px rgba(197, 204, 195, 0.15)',
        'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        // Legacy
        'giga': '0 20px 60px rgba(0, 0, 0, 0.45)',
        'giga-sm': '0 4px 12px rgba(0, 0, 0, 0.25)',
        'giga-md': '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
        // Liquid Glass Blur
        'glass-light': '12px',
        'glass': '20px',
        'glass-heavy': '32px',
        // Legacy
        'giga': '18px',
        'giga-light': '10px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glass-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glass-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "glass-shimmer": "glass-shimmer 8s ease-in-out infinite",
        "glass-pulse": "glass-pulse 2s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'glass': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'glass': '180ms',
        'glass-slow': '280ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
