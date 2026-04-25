import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFFFFF",
          alt: "#F9F9F9",
        },
        primary: {
          DEFAULT: "#5ABB4A",
          50: "#F0FAEE",
          100: "#DCF2D7",
          200: "#B8E5AF",
          300: "#94D887",
          400: "#77CB67",
          500: "#5ABB4A",
          600: "#48953B",
          700: "#36702C",
          800: "#244A1E",
          900: "#12250F",
        },
        foreground: "#111827",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
