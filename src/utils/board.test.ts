import { Direction, Position } from "../types";
import {
  getFieldFromLocalStorage,
  getHeadClass,
  getRandomNumberInRange,
  positionIsWithinBoard,
} from "./board";

describe("boardUtils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test.each([
    [Direction.UP, "first:rounded-t-full"],
    [Direction.DOWN, "first:rounded-b-full"],
    [Direction.RIGHT, "first:rounded-r-full"],
    [Direction.LEFT, "first:rounded-l-full"],
    [undefined, ""],
  ])(
    "it should start the game when is not active but a direction %i is pressed",
    (direction: Direction | undefined, className: string) => {
      const headClass = getHeadClass(direction);

      expect(headClass).toBe(className);
    }
  );

  test.each([
    [{ x: 5, y: 3 }, 4, 4],
    [{ x: -1, y: 3 }, 4, 4],
    [{ x: 2, y: 5 }, 4, 4],
    [{ x: 2, y: -1 }, 4, 4],
  ])(
    "check that a specific position is outside of the board",
    (position: Position, numColumns: number, numRows: number) => {
      const result = positionIsWithinBoard(position, numColumns, numRows);

      expect(result).toBe(false);
    }
  );

  test("check that a specific position is within the board", () => {
    const result = positionIsWithinBoard({ x: 2, y: 2 }, 4, 4);

    expect(result).toBe(true);
  });

  test("should return a number within the specified range", () => {
    const min = 1;
    const max = 10;
    const randomNumber = getRandomNumberInRange(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  test("should return a number within the specified range when min equals max", () => {
    const min = 5;
    const max = 5;
    const randomNumber = getRandomNumberInRange(min, max);
    expect(randomNumber).toBe(min);
  });

  test("should throw an error if min is greater than max", () => {
    const min = 10;
    const max = 5;
    expect(() => getRandomNumberInRange(min, max)).toThrowError(
      "Minimum value should be less than or equal to maximum value."
    );
  });

  test("should retrieve value from localstorage", () => {
    const value = 5;
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockReturnValue(`${value}`);

    const result = getFieldFromLocalStorage("field");

    expect(getItemSpy).toHaveBeenCalledWith("field");
    expect(result).toBe(value);
  });

  test("should return 0 if key does not exist in localstorage", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

    const result = getFieldFromLocalStorage("field");

    expect(getItemSpy).toHaveBeenCalledWith("field");
    expect(result).toBe(0);
  });
});
