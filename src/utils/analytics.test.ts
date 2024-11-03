import ReactGA from "react-ga4";
import { initAnalytics } from "./analytics";
import { describe, expect, vi } from "vitest";

describe("Analytics", () => {
  beforeAll(() => {
    vi.mock("react-ga4", () => ({
      __esModule: true,
      default: {
        initialize: vi.fn(),
        send: vi.fn(),
      },
    }));
  });

  test("should initialize ReactGA and send pageview if not in development mode", () => {
    import.meta.env.MODE = "production";

    initAnalytics();

    expect(ReactGA.initialize).toHaveBeenCalledWith(
      import.meta.env.VITE_GOOGLE_ANALYTICS_ID
    );
    expect(ReactGA.send).toHaveBeenCalledWith("pageview");
  });

  test("should not initialize ReactGA in development mode", () => {
    import.meta.env.MODE = "development";

    initAnalytics();

    expect(ReactGA.initialize).not.toHaveBeenCalled();
    expect(ReactGA.send).not.toHaveBeenCalled();
  });
});
