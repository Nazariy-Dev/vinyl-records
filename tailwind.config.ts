import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        'autoResize': 'repeat(auto-fit, minmax(200px, 1fr))',
    }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#fff8dd",
          "secondary": "#D4AA00",
          "accent": "#FFEB9D",
          "neutral": "#f6ffff",
          "base-100": "#f8ffff",
          "info": "#41ffff",
          "success": "#9affdc",
          "warning": "#fff129",
          "error": "#ffbab9",
        },
      }, "lemonade"
    ],
  },
};
export default config;
