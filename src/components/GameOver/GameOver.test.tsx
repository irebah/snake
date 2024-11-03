import { render, screen } from "@testing-library/react";
import { GameProvider } from "../../context";
import GameOver from "./GameOver";
import MockProvider from "../../mocks/MockProvider";
import userEvent from "@testing-library/user-event";
import initialState from "../../context/initialState";
import { SET_READY } from "../../context/types";

describe("Game Over", () => {
  test("it should present the option to continue or not", () => {
    render(
      <GameProvider>
        <GameOver />
      </GameProvider>
    );

    expect(screen.getByTestId("option-Yes")).toBeInTheDocument();
    expect(screen.getByTestId("option-No")).toBeInTheDocument();
  });

  test("it should restart the game when the option yes is clicked", async () => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();

    render(
      <MockProvider
        mockDispatch={mockDispatch}
        mockState={{ ...initialState, readyGame: false }}
      >
        <GameOver />
      </MockProvider>
    );

    await user.click(screen.getByTestId("option-Yes"));

    expect(mockDispatch).toHaveBeenCalledWith({ type: SET_READY });
  });

  test("it should redirect to the portfolio when the option no is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MockProvider mockState={{ ...initialState, readyGame: false }}>
        <GameOver />
      </MockProvider>
    );

    await user.click(screen.getByTestId("option-No"));

    expect(window.location.href).toBe("https://ismailrebah.com/");
  });

  test("it should restart the game when the option yes is focused and enter is pressed", async () => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();

    render(
      <MockProvider
        mockDispatch={mockDispatch}
        mockState={{ ...initialState, readyGame: false }}
      >
        <GameOver />
      </MockProvider>
    );

    expect(screen.getByTestId("option-Yes")).toBe(document.activeElement);

    await user.keyboard("{Enter}");

    expect(mockDispatch).toHaveBeenCalledWith({ type: SET_READY });
  });

  test("it should allow to switch between options using the tab", async () => {
    const user = userEvent.setup();

    render(
      <GameProvider>
        <GameOver />
      </GameProvider>
    );

    expect(screen.getByTestId("option-Yes")).toBe(document.activeElement);

    await user.keyboard("{Tab}");

    expect(screen.getByTestId("option-No")).toBe(document.activeElement);
  });

  test("it should allow to switch between options using the arrow left and right", async () => {
    const user = userEvent.setup();

    render(
      <GameProvider>
        <GameOver />
      </GameProvider>
    );

    expect(screen.getByTestId("option-Yes")).toBe(document.activeElement);

    await user.keyboard("{ArrowRight}");
    expect(screen.getByTestId("option-No")).toBe(document.activeElement);

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByTestId("option-Yes")).toBe(document.activeElement);
  });

  test("it should have the yes option focused by default", () => {
    render(
      <GameProvider>
        <GameOver />
      </GameProvider>
    );

    expect(screen.getByTestId("option-Yes")).toBe(document.activeElement);
  });
});
