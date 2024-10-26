import { Direction } from "../../types";
import { Snake } from "./Snake";

describe("Snake", () => {
  const dummyBody = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  test("it can be created passing the parameter body and direction", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    expect(snake).toBeInstanceOf(Snake);
  });

  test("it returns the correct positions where the body is", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    const result = snake.getPositions();

    expect(result.length).toBe(3);
    expect(JSON.stringify(result)).toBe(JSON.stringify(dummyBody));
  });

  test("it can return the position of the head's snake", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    const result = snake.getHead();

    expect(result.x).toBe(dummyBody[0].x);
    expect(result.y).toBe(dummyBody[0].y);
  });

  test("it can return the snake direction", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    const result = snake.getDirection();

    expect(result).toBe(Direction.UP);
  });

  test.each([
    [Direction.UP, Direction.UP],
    [Direction.UP, Direction.RIGHT],
    [Direction.UP, Direction.LEFT],
    [Direction.RIGHT, Direction.RIGHT],
    [Direction.RIGHT, Direction.UP],
    [Direction.RIGHT, Direction.DOWN],
    [Direction.LEFT, Direction.LEFT],
    [Direction.LEFT, Direction.UP],
    [Direction.LEFT, Direction.DOWN],
    [Direction.DOWN, Direction.DOWN],
    [Direction.DOWN, Direction.LEFT],
    [Direction.DOWN, Direction.RIGHT],
  ])(
    "it can change the direction when the new direction is not opossite of the current one %i => %i",
    (direction, newDirection) => {
      const snake = new Snake(dummyBody, direction);

      snake.setDirection(newDirection);
      const result = snake.getDirection();

      expect(result).toBe(newDirection);
    }
  );

  test.each([
    [Direction.UP, Direction.DOWN],
    [Direction.DOWN, Direction.UP],
    [Direction.RIGHT, Direction.LEFT],
    [Direction.LEFT, Direction.RIGHT],
  ])(
    "it cannot change the direction when the new direction is opossite of the current one %i => %i",
    (direction, newDirection) => {
      const snake = new Snake(dummyBody, direction);

      snake.setDirection(newDirection);
      const result = snake.getDirection();

      expect(result).toBe(direction);
    }
  );

  test.each([
    [Direction.UP, { x: 5, y: 4 }],
    [Direction.DOWN, { x: 5, y: 6 }],
    [Direction.RIGHT, { x: 6, y: 5 }],
    [Direction.LEFT, { x: 4, y: 5 }],
  ])(
    "it can calculate correctly the next position based on the direction and the current position %i => %s",
    (direction, newPosition) => {
      const snake = new Snake([{ x: 5, y: 5 }], direction);

      const result = snake.getNextPositionHead();

      expect(result?.x).toBe(newPosition.x);
      expect(result?.y).toBe(newPosition.y);
    }
  );

  test("it can move provided the next head position", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    snake.move({ x: dummyBody[0].x + 1, y: dummyBody[0].y });
    const result = snake.getPositions();

    expect(JSON.stringify(result)).toBe(
      JSON.stringify([
        { x: 11, y: 10 },
        { x: 10, y: 10 },
        { x: 9, y: 10 },
      ])
    );
  });

  test("it can grow provided the next head position", () => {
    const direction = Direction.UP;
    const snake = new Snake(dummyBody, direction);

    snake.grow({ x: dummyBody[0].x + 1, y: dummyBody[0].y });
    const result = snake.getPositions();

    expect(JSON.stringify(result)).toBe(
      JSON.stringify([
        { x: 11, y: 10 },
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ])
    );
  });
});
