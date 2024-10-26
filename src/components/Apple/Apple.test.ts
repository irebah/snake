import { Apple } from "./Apple";

describe("Apple", () => {
  test("it can be created passing the parameter position", () => {
    const position = { x: 0, y: 0 };
    const apple = new Apple(position);

    expect(apple).toBeInstanceOf(Apple);
  });

  test("it returns the correct position", () => {
    const x = Math.random();
    const y = Math.random();
    const position = { x, y };
    const apple = new Apple(position);

    const result = apple.getPosition();

    expect(result.x).toBe(x);
    expect(result.y).toBe(y);
  });

  test("it can be moved to a random position", () => {
    const position = { x: -1, y: -1 };
    const apple = new Apple(position);
    const numColumns = 100;
    const numRows = 100;

    apple.moveToRandomPosition(numColumns, numRows);
    const result = apple.getPosition();

    expect(result.x).toBeGreaterThan(0);
    expect(result.x).toBeLessThanOrEqual(numColumns);
    expect(result.y).toBeGreaterThan(0);
    expect(result.y).toBeLessThanOrEqual(numRows);
  });

  test("it can return wheter is at a specified position", () => {
    const position = { x: 3, y: 5 };
    const apple = new Apple(position);

    expect(apple.isAt(position)).toBe(true);
    expect(apple.isAt({ ...position, x: position.x + 1 })).toBe(false);
  });
});
