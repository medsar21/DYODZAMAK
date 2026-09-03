import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#591D3E",
        bronze: "#A36A2B",
        gold: "#E3BB69",
        beige: "#F3E5CD",
        ivory: "#FFF9EF"
      },
      borderRadius: {
        xs: "8px",
        sm: "14px",
        md: "24px",
        lg: "34px",
        xl: "42px"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0,0,0,.22)"
      }
    }
  },
  plugins: []
};

export default config;
