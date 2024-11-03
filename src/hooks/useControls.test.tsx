import { expect, describe } from "vitest";
import { fireEvent, renderHook } from "@testing-library/react";
import { useControls } from "./useControls";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { Direction, Position } from "../types";

describe("useControls", () => {
  test.each([
    ["ArrowUp", Direction.UP],
    ["ArrowDown", Direction.DOWN],
    ["ArrowLeft", Direction.LEFT],
    ["ArrowRight", Direction.RIGHT],
  ])(
    "it should trigger the changeSnakeDirection function with the correct direction",
    async (event: string, direction: Direction) => {
      const user = userEvent.setup();

      const changeSnakeDirection = vi.fn();

      renderHook(() =>
        useControls({
          changeSnakeDirection,
          boardRef: useRef<HTMLDivElement | null>(null),
        })
      );

      expect(changeSnakeDirection).toHaveBeenCalledTimes(0);

      await user.keyboard(`{${event}}`);

      expect(changeSnakeDirection).toHaveBeenCalledWith(direction);
    }
  );

  test("it should not trigger the changeSnakeDirection function for a random key", async () => {
    const user = userEvent.setup();

    const changeSnakeDirection = vi.fn();

    renderHook(() =>
      useControls({
        changeSnakeDirection,
        boardRef: useRef<HTMLDivElement | null>(null),
      })
    );

    await user.keyboard("{enter}");

    expect(changeSnakeDirection).toHaveBeenCalledTimes(0);
  });

  test.each([
    [{ x: 10, y: 10 }, { x: 20, y: 10 }, Direction.RIGHT],
    [{ x: 50, y: 10 }, { x: 40, y: 10 }, Direction.LEFT],
    [{ x: 10, y: 30 }, { x: 10, y: 40 }, Direction.DOWN],
    [{ x: 10, y: 70 }, { x: 10, y: 60 }, Direction.UP],
  ])(
    "it should trigger the changeSnakeDirection function for swipe in the direction %s %s => %s",
    async (initial: Position, final: Position, direction: Direction) => {
      const changeSnakeDirection = vi.fn();

      const boardRef = {
        current: document.createElement("div"),
      };

      renderHook(() =>
        useControls({
          changeSnakeDirection,
          boardRef,
        })
      );

      fireEvent.pointerDown(boardRef.current, {
        clientX: initial.x,
        clientY: initial.y,
      });

      fireEvent.pointerUp(boardRef.current, {
        clientX: final.x,
        clientY: final.y,
      });

      expect(changeSnakeDirection).toHaveBeenCalledWith(direction);
    }
  );
});
