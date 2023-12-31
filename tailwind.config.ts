import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addComponents }) => {
      addComponents({
        ".container": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@media (min-width: 640px)": {
            maxWidth: "640px",
          },
          "@media (min-width: 768px)": {
            maxWidth: "768px",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "1024px",
          },
          "@media (min-width: 1280px)": {
            maxWidth: "1280px",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          },
          "@media (min-width: 1536px)": {
            maxWidth: "1536px",
            paddingLeft: "128px",
            paddingRight: "128px",
          },
        },
      });
    }),
  ],
};

export default config;
