import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          400: "#6366F1",
          500: "#4F46E5", // PRIMARY
          600: "#4338CA", // hover
          700: "#3730A3",
        },
        surface: {
          page:   "#F9FAFB",
          card:   "#FFFFFF",
          muted:  "#F3F4F6",
          border: "#E5E7EB",
        },
        status: {
          applied: {
            bg: "#EEF2FF",
            border: "#6366F1",
            text: "#3730A3",
          },
          screening: {
            bg: "#FEF9C3",
            border: "#EAB308",
            text: "#854D0E",
          },
          interview: {
            bg: "#DBEAFE",
            border: "#3B82F6",
            text: "#1E40AF",
          },
          offer: {
            bg: "#DCFCE7",
            border: "#22C55E",
            text: "#166534",
          },
          rejected: {
            bg: "#FEE2E2",
            border: "#EF4444",
            text: "#991B1B",
          },
          withdrawn: {
            bg: "#F3F4F6",
            border: "#9CA3AF",
            text: "#374151",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;