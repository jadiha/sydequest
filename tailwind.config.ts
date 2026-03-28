import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marker: ["'Permanent Marker'", "cursive"],
        kalam: ["'Kalam'", "cursive"],
        caveat: ["'Caveat'", "cursive"],
        hand: ["'Patrick Hand'", "cursive"],
      },
      colors: {
        paper: "#fffef5",
        rose: "#e05a82",
        violet: "#7b5ea7",
        teal: "#3a8c7a",
        amber: "#d97706",
        cobalt: "#3b6cb8",
        sage: "#5a8a5a",
      },
    },
  },
  plugins: [],
} satisfies Config;
