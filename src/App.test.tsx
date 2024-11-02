import { render, screen } from "@testing-library/react";
import App from "./App";
import { GameProvider } from "./context";
import MockProvider from "./mocks/MockProvider";
import initialState from "./context/initialState";

describe("App", () => {
  test("it should render the board", () => {
    vi.mock("./components/Board/Board", () => {
      return {
        __esModule: true,
        default: () => <div data-testid="board">Mocked Board</div>,
      };
    });

    render(
      <GameProvider>
        <App />
      </GameProvider>
    );

    expect(screen.getByTestId("board")).toBeInTheDocument();
  });

  test("it should render the info section", () => {
    vi.mock("./components/Info/Info", () => {
      return {
        __esModule: true,
        default: () => <div data-testid="info">Mocked Info</div>,
      };
    });

    render(
      <GameProvider>
        <App />
      </GameProvider>
    );

    expect(screen.getByTestId("info")).toBeInTheDocument();
  });

  test("it should render the game over section when the game is not ready but active", () => {
    vi.mock("./components/GameOver/GameOver", () => {
      return {
        __esModule: true,
        default: () => <div data-testid="gameOver">Mocked GameOver</div>,
      };
    });

    render(
      <MockProvider
        mockState={{ ...initialState, readyGame: false, activeGame: true }}
      >
        <App />
      </MockProvider>
    );

    expect(screen.getByTestId("gameOver")).toBeInTheDocument();
  });

  test("it should not render the game over section when the game is not ready and not active", () => {
    vi.mock("./components/GameOver/GameOver", () => {
      return {
        __esModule: true,
        default: () => <div data-testid="gameOver">Mocked GameOver</div>,
      };
    });

    render(
      <MockProvider
        mockState={{ ...initialState, readyGame: false, activeGame: false }}
      >
        <App />
      </MockProvider>
    );

    expect(screen.queryByTestId("gameOver")).toBeNull();
  });
});
