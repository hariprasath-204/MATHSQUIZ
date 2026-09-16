import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        swatch: {
          red: "#df301c",
          redLight: "#f04835",
          redDark: "#b82414",
          orange: "#ff9100",
          orangeLight: "#ffa726",
          orangeDark: "#e67e00",
          cream: "#fff1d1",
          creamLight: "#fff8e6",
          creamDark: "#f5ddaa",
          cyan: "#00b7cd",
          cyanLight: "#26cce0",
          cyanDark: "#0094a6",
          darkBase: "#160706",
          cardDark: "#220c0a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
