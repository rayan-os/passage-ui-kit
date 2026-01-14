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
        // Semantic colors
        border: "rgba(255, 255, 255, 0.12)",
        input: "rgba(255, 255, 255, 0.10)",
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
        lg: "20px",
        md: "12px",
        sm: "8px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        'giga': '0 20px 60px rgba(0, 0, 0, 0.45)',
        'giga-sm': '0 4px 12px rgba(0, 0, 0, 0.25)',
        'giga-md': '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
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
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
