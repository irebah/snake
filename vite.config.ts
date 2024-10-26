import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/snake" : "/",
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: "./setupTests.ts",
    globals: true,
    outputFile: {
      junit: "./junit-report.xml",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/*.mjs",
        "tailwind.config.ts",
        "src/constants",
        "src/types",
        "src/main.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
