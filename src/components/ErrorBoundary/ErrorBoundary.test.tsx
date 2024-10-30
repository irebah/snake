import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test error");
};

const SafeComponent = () => <div>All good!</div>;

describe("ErrorBoundary", () => {
  test("it catches errors and displays fallback UI", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(getByText("Something went wrong.")).toBeInTheDocument();
  });

  test("it renders children when there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    expect(getByText("All good!")).toBeInTheDocument();
  });
});
