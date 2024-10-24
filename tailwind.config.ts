import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({
      addBase,
    }: {
      addBase: (base: Record<string, { [key: string]: string }>) => void;
    }) {
      addBase({
        "*": {
          boxSizing: "border-box",
          userSelect: "none",
        },
        "*::before": {
          boxSizing: "border-box",
        },
        "*::after": {
          boxSizing: "border-box",
        },
      });
    },
  ],
};

export default config;
