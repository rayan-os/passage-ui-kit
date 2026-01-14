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
        // Single source of truth: CSS variables from app/globals.css
        border: "hsl(var(--border-hsl))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-hsl))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },

        // Compatibility layer for existing classes like `ring-offset-giga-bg`
        giga: {
          bg: "hsl(var(--background))",
          panel: "hsl(var(--popover))",
          "panel-2": "hsl(var(--secondary))",
          card: "hsl(var(--card))",
          "card-hover": "hsl(var(--muted-hsl))",
          accent: "hsl(var(--primary))",
          "accent-2": "hsl(var(--accent-hsl))",
          blue: "#3b82f6",
          teal: "#14b8a6",
          orange: "#ff6b35",
          yellow: "#fbbf24",
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
