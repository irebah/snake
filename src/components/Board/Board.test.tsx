import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { APPLE_COLOR, SNAKE_COLOR, SQUARE_SIZE } from "../../constants";

describe("Board", () => {
  const renderBoard = () =>
    render(
      <Board
        size={{ width: 4 * SQUARE_SIZE, height: 4 * SQUARE_SIZE }}
        snake={[{ x: 2, y: 2 }]}
        apple={{ x: 0, y: 1 }}
      />
    );

  test("it should render", () => {
    renderBoard();
  });

  test("it should has as many 'squares' as size / SQUARE_SIZE", () => {
    renderBoard();

    const numberSquares = screen.getByTestId("grid").children.length;

    expect(numberSquares).toBe(16);
  });

  test("it should render the snake in the correct position", () => {
    renderBoard();

    expect(screen.getByTestId("cell-2-2")).toHaveClass(SNAKE_COLOR);
  });

  test("it should render the apple in the correct position", () => {
    renderBoard();

    expect(screen.getByTestId("cell-1-0")).toHaveClass(APPLE_COLOR);
  });
});
