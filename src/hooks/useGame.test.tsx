import { describe } from "vitest";
import { renderHook } from "@testing-library/react";
import MockProvider from "../mocks/MockProvider";
import { useGame } from "./useGame";
import { getRandomNumberInRange } from "../utils/board";
import { Direction } from "../types";
import initialState from "../context/initialState";
import { GAME_SPEED } from "../constants";
import { act } from "react";
import { INCREASE_COUNTER, START_GAME, STOP_GAME } from "../context/types";

describe("useGame", () => {
  let rafId = 0;

  const requestAnimationFrameMock = (
    callback: FrameRequestCallback
  ): number => {
    rafId++;
    // Immediately call the callback for testing purposes
    setTimeout(() => callback(performance.now()), 0);
    return rafId; // Return the ID
  };

  beforeAll(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      requestAnimationFrameMock
    );
    vi.spyOn(performance, "now").mockImplementation(() => Date.now());
  });

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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
        { x: snakeInitialCol, y: Math.floor(numRows / 2) },
        { x: snakeInitialCol - 1, y: Math.floor(numRows / 2) },
        { x: snakeInitialCol - 2, y: Math.floor(numRows / 2) },
      ])
    );
  });

  test("it should return the apple at a specific position based on the input", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider>{children}</MockProvider>
    );

    const numRows = getRandomNumberInRange(10, 20),
      numColumns = getRandomNumberInRange(10, 20),
      appleInitialCol = getRandomNumberInRange(3, numColumns - 1),
      snakeInitialCol = getRandomNumberInRange(3, numColumns);

    const { result } = renderHook(
      () => useGame({ numRows, numColumns, appleInitialCol, snakeInitialCol }),
      { wrapper }
    );

    expect(JSON.stringify(result.current.applePosition)).toBe(
      JSON.stringify({ x: appleInitialCol, y: Math.floor(numRows / 2) })
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

  test("it should not move the snake if the game is not ready", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider mockState={{ ...initialState }}>{children}</MockProvider>
    );

    const snakeInitialCol = 3;
    const unitsOfTimePassed = getRandomNumberInRange(2, 5);

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 9,
          snakeInitialCol,
        }),
      { wrapper }
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED * unitsOfTimePassed);
    });

    expect(JSON.stringify(result.current.snakePositions)).toBe(
      JSON.stringify([
        { x: snakeInitialCol, y: 5 },
        { x: snakeInitialCol - 1, y: 5 },
        { x: snakeInitialCol - 2, y: 5 },
      ])
    );
  });

  test("it should not move the snake if the game is not active", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, readyGame: true, activeGame: false }}
      >
        {children}
      </MockProvider>
    );

    const snakeInitialCol = 3;
    const unitsOfTimePassed = getRandomNumberInRange(2, 5);

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 9,
          snakeInitialCol,
        }),
      { wrapper }
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED * unitsOfTimePassed);
    });

    expect(JSON.stringify(result.current.snakePositions)).toBe(
      JSON.stringify([
        { x: snakeInitialCol, y: 5 },
        { x: snakeInitialCol - 1, y: 5 },
        { x: snakeInitialCol - 2, y: 5 },
      ])
    );
  });

  test.each([[Direction.UP], [Direction.DOWN], [Direction.RIGHT]])(
    "it should start the game when is not active but a direction %i is pressed",
    (direction: Direction) => {
      const mockDispatch = vi.fn();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockProvider
          mockDispatch={mockDispatch}
          mockState={{ ...initialState, readyGame: true, activeGame: false }}
        >
          {children}
        </MockProvider>
      );

      const { result } = renderHook(
        () =>
          useGame({
            numRows: 10,
            numColumns: 10,
            appleInitialCol: 9,
            snakeInitialCol: 3,
          }),
        { wrapper }
      );

      result.current.changeSnakeDirection(direction);

      expect(mockDispatch).toHaveBeenCalledWith({ type: START_GAME });
    }
  );

  test("it should not start the game when is not active and the user press LEFT", () => {
    const mockDispatch = vi.fn();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockDispatch={mockDispatch}
        mockState={{ ...initialState, readyGame: true, activeGame: false }}
      >
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 9,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    result.current.changeSnakeDirection(Direction.LEFT);

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  test("it should move when the game is active and there is no apple or wall in the way", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        {children}
      </MockProvider>
    );

    const snakeInitialCol = 3;
    const unitsOfTimePassed = getRandomNumberInRange(2, 5);

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 9,
          snakeInitialCol,
        }),
      { wrapper }
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED * unitsOfTimePassed);
    });

    expect(JSON.stringify(result.current.snakePositions)).toBe(
      JSON.stringify([
        { x: snakeInitialCol + unitsOfTimePassed, y: 5 },
        { x: snakeInitialCol + unitsOfTimePassed - 1, y: 5 },
        { x: snakeInitialCol + unitsOfTimePassed - 2, y: 5 },
      ])
    );
  });

  test("it should dispatch stop game when the snake hits the right wall", () => {
    const mockDispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        {children}
      </MockProvider>
    );

    const snakeInitialCol = 6;
    const unitsOfTimePassed = 4;

    renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 1,
          snakeInitialCol,
        }),
      { wrapper }
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED * unitsOfTimePassed);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: STOP_GAME });
  });

  test("it should dispatch stop game when the snake hits the left wall", () => {
    const mockDispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 10,
          numColumns: 10,
          appleInitialCol: 6,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    act(() => {
      result.current.changeSnakeDirection(Direction.UP);
      vi.advanceTimersByTime(GAME_SPEED);
      result.current.changeSnakeDirection(Direction.LEFT);
      vi.advanceTimersByTime(GAME_SPEED * 4);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: STOP_GAME });
  });

  test("it should dispatch stop game when the snake hits the top wall", () => {
    const mockDispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 5,
          numColumns: 10,
          appleInitialCol: 6,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    act(() => {
      result.current.changeSnakeDirection(Direction.UP);
      vi.advanceTimersByTime(GAME_SPEED * 3);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: STOP_GAME });
  });

  test("it should dispatch stop game when the snake hits the bottom wall", () => {
    const mockDispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 5,
          numColumns: 10,
          appleInitialCol: 6,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    act(() => {
      result.current.changeSnakeDirection(Direction.DOWN);
      vi.advanceTimersByTime(GAME_SPEED * 3);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: STOP_GAME });
  });

  test("it should return the correct snake direction after calling the function change direction", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 5,
          numColumns: 10,
          appleInitialCol: 6,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    expect(result.current.snakeDirection).toBe(Direction.RIGHT);

    act(() => {
      result.current.changeSnakeDirection(Direction.DOWN);
      vi.advanceTimersByTime(GAME_SPEED);
    });

    expect(result.current.snakeDirection).toBe(Direction.DOWN);
  });

  test("it should increase the counter when eating the apple", () => {
    const mockDispatch = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider
        mockState={{ ...initialState, activeGame: true }}
        mockDispatch={mockDispatch}
      >
        {children}
      </MockProvider>
    );

    renderHook(
      () =>
        useGame({
          numRows: 5,
          numColumns: 10,
          appleInitialCol: 4,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: INCREASE_COUNTER });
  });

  test("it should grown when eating the Apple", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 5,
          numColumns: 10,
          appleInitialCol: 4,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    expect(result.current.snakePositions?.length).toBe(3);

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED);
    });

    expect(result.current.snakePositions?.length).toBe(4);
  });

  test("it should move the apple somewhere when is eaten", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockProvider mockState={{ ...initialState, activeGame: true }}>
        {children}
      </MockProvider>
    );

    const { result } = renderHook(
      () =>
        useGame({
          numRows: 100,
          numColumns: 100,
          appleInitialCol: 4,
          snakeInitialCol: 3,
        }),
      { wrapper }
    );

    expect(JSON.stringify(result.current.applePosition)).toBe(
      JSON.stringify({ x: 4, y: 50 })
    );

    act(() => {
      vi.advanceTimersByTime(GAME_SPEED);
    });

    expect(JSON.stringify(result.current.applePosition)).not.toBe(
      JSON.stringify({ x: 4, y: 50 })
    );
  });
});
