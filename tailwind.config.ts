import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#00d394",
        destructive: "#ff0000"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("autoprefixer"),
    require("tailwindcss-text-fill"),
  ],
  daisyui: {
    darkTheme: false,
  },
};
export default config;
