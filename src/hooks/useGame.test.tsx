import { describe } from "vitest";
import { renderHook } from "@testing-library/react";
import MockProvider from "../mocks/MockProvider";
import { useGame } from "./useGame";
import { getRandomNumberInRange } from "../utils/board";
import { Direction } from "../types";

describe("useGame", () => {
  test("it should return the snake at a specific position based on the input", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider>{children}</MockProvider>
    );

    const numRows = getRandomNumberInRange(3, 20),
      numColumns = getRandomNumberInRange(3, 20),
      appleInitialCol = getRandomNumberInRange(3, numColumns),
      snakeInitialCol = getRandomNumberInRange(3, numColumns);

    const { result } = renderHook(
      () => useGame({ numRows, numColumns, appleInitialCol, snakeInitialCol }),
      { wrapper }
    );

    expect(JSON.stringify(result.current.snakePositions)).toBe(
      JSON.stringify([
        { x: snakeInitialCol, y: numRows / 2 },
        { x: snakeInitialCol - 1, y: numRows / 2 },
        { x: snakeInitialCol - 2, y: numRows / 2 },
      ])
    );
  });

  test("it should return the apple at a specific position based on the input", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider>{children}</MockProvider>
    );

    const numRows = getRandomNumberInRange(3, 20),
      numColumns = getRandomNumberInRange(3, 20),
      appleInitialCol = getRandomNumberInRange(3, numColumns),
      snakeInitialCol = getRandomNumberInRange(3, numColumns);

    const { result } = renderHook(
      () => useGame({ numRows, numColumns, appleInitialCol, snakeInitialCol }),
      { wrapper }
    );

    expect(JSON.stringify(result.current.applePosition)).toBe(
      JSON.stringify({ x: appleInitialCol, y: numRows / 2 })
    );
  });

  test("it should return the snake initial direction as RIGHT", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider>{children}</MockProvider>
    );

    const numRows = getRandomNumberInRange(3, 20),
      numColumns = getRandomNumberInRange(3, 20),
      appleInitialCol = getRandomNumberInRange(3, numColumns),
      snakeInitialCol = getRandomNumberInRange(3, numColumns);

    const { result } = renderHook(
      () => useGame({ numRows, numColumns, appleInitialCol, snakeInitialCol }),
      { wrapper }
    );

    expect(result.current.snakeDirection).toBe(Direction.RIGHT);
  });
});
