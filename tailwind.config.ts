import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom: {
          "gray-light": "#888888",
          gray: "#555555",
          "gray-dark": "#1D1D1B",
          tannat: "#D14B8F",
          subtitle: "#333333",
          text: "#1D1D1B",
          green: "#7EBC43",
          orange: "#F79552",
          violet: "#B6116E",
          border: "#D6D6D6",
          "background-light": "#E5E5E5",
          background: "#F5F5F5",
        },
      },
      fontSize: {
        "2xs": "0.875rem",
        "3xs": "0.75rem",
      },

      boxShadow: {
        "product-card": "0px 10px 14.600760459899902px 0px #0000001A",
        default: "0px 1px 3px 0px #00000059",
      },
    },
  },
  plugins: [],
};
export default config;
