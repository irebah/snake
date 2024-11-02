import { render, screen } from "@testing-library/react";
import Info from "./Info";
import MockProvider from "../../mocks/MockProvider";
import initialState from "../../context/initialState";

describe("Game Over", () => {
  test("it should show the score", () => {
    const score = Math.floor(Math.random());

    render(
      <MockProvider mockState={{ ...initialState, score }}>
        <Info />
      </MockProvider>
    );

    expect(screen.getByTestId("current-score")).toHaveTextContent(`${score}`);
  });

  test("it should show the highest score", () => {
    const highestScore = Math.floor(Math.random());

    render(
      <MockProvider mockState={{ ...initialState, highestScore }}>
        <Info />
      </MockProvider>
    );

    expect(screen.getByTestId("current-score")).toHaveTextContent(
      `${highestScore}`
    );
  });
});
