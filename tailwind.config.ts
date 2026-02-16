import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          900: "#151a22",
          800: "#1c2430",
          700: "#273241",
          600: "#344255"
        },
        silver: {
          100: "#f5f7fa",
          200: "#d7dee7",
          300: "#b7c2ce",
          400: "#9aa8b8"
        }
      },
      boxShadow: {
        silver: "0 12px 40px rgba(183, 194, 206, 0.2)"
      },
      backgroundImage: {
        "premium-gradient":
          "radial-gradient(circle at 0% 0%, rgba(154, 168, 184, 0.16), transparent 45%), radial-gradient(circle at 100% 100%, rgba(183, 194, 206, 0.14), transparent 40%), linear-gradient(135deg, #151a22, #1f2936 55%, #2d3a4d)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up .6s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
