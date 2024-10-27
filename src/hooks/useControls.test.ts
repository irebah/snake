import { expect, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import { useControls } from "./useControls";
import { Direction } from "../types";
import userEvent from "@testing-library/user-event";

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

      renderHook(() => useControls({ changeSnakeDirection }));

      expect(changeSnakeDirection).toHaveBeenCalledTimes(0);

      await user.keyboard(`{${event}}`);

      expect(changeSnakeDirection).toHaveBeenCalledWith(direction);
    }
  );

  test("it should not trigger the changeSnakeDirection function for a random key", async () => {
    const user = userEvent.setup();

    const changeSnakeDirection = vi.fn();

    renderHook(() => useControls({ changeSnakeDirection }));

    await user.keyboard("{enter}");

    expect(changeSnakeDirection).toHaveBeenCalledTimes(0);
  });
});
