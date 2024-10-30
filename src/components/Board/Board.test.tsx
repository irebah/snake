import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { SQUARE_SIZE } from "../../constants";
import { GameProvider } from "../../context";

describe("Board", () => {
  const renderBoard = () =>
    render(
      <GameProvider>
        <Board size={{ width: 4 * SQUARE_SIZE, height: 4 * SQUARE_SIZE }} />
      </GameProvider>
    );

  test("it should render", () => {
    renderBoard();
  });

  test("it should has as many 'squares' as size / SQUARE_SIZE", () => {
    const snakeLength = 3;
    const appleLength = 1;

    renderBoard();

    const numberSquares = screen.getByTestId("grid").children.length;
    expect(numberSquares).toBe(16 + snakeLength + appleLength);
  });

  test("it should render the snake", () => {
    renderBoard();

    expect(screen.getAllByTestId(/snake-.*/).length).toBe(3);
  });

  test("it should render the apple", () => {
    renderBoard();

    expect(screen.getAllByTestId(/apple-.*/).length).toBe(1);
  });
});
