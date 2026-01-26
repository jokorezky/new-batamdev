import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* =========================
         BREAKPOINTS
      ========================= */
      screens: {
        "1440": "1440px",
      },

      /* =========================
         FONTS
      ========================= */
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Ubuntu",
          "Cantarell",
          '"Helvetica Neue"',
          "sans-serif",
        ],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },

      /* =========================
         COLORS (FUTURISTIC RED)
      ========================= */
      colors: {
        background: "#000000",
        foreground: "#ffffff",

        card: {
          DEFAULT: "rgba(255,255,255,0.05)",
          foreground: "#ffffff",
        },

        border: "rgba(255,0,0,0.35)",
        input: "rgba(255,255,255,0.1)",
        ring: "rgba(239,68,68,0.8)",

        primary: {
          DEFAULT: "#ef4444", // red-500
          hover: "#dc2626",   // red-600
          glow: "rgba(239,68,68,0.45)",
        },

        muted: {
          DEFAULT: "#9ca3af", // zinc-400
          foreground: "#71717a",
        },

        accent: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },

        destructive: {
          DEFAULT: "#b91c1c",
          foreground: "#ffffff",
        },
      },

      /* =========================
         BORDER RADIUS
      ========================= */
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      /* =========================
         SHADOWS
      ========================= */
      boxShadow: {
        glow: "0 0 40px rgba(239,68,68,0.35)",
        "glow-lg": "0 0 60px rgba(239,68,68,0.45)",
        soft: "0 10px 30px rgba(0,0,0,0.4)",
      },

      /* =========================
         BACKDROP / GLASS
      ========================= */
      backdropBlur: {
        xs: "2px",
      },

      /* =========================
         KEYFRAMES
      ========================= */
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        accordionDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      /* =========================
         ANIMATIONS
      ========================= */
      animation: {
        fadeUp: "fadeUp 0.5s ease-out forwards",
        glow: "glowPulse 2.5s ease-in-out infinite",
        "accordion-down": "accordionDown 0.2s ease-out",
        "accordion-up": "accordionUp 0.2s ease-out",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
