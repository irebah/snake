import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GameProvider } from "./context/index.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { initAnalytics } from "./utils/analytics.ts";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <GameProvider>
        <App />
      </GameProvider>
    </ErrorBoundary>
  </StrictMode>
);
