import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

// Perform cleanup after each test
afterEach(() => {
  cleanup();
});
