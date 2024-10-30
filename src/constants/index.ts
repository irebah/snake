import { Direction } from "../types";

export const SQUARE_SIZE = 25;
export const SNAKE_INITIAL_COL = 4;
export const APPLE_INITIAL_COL = 12;

export const SNAKE_COLOR = "bg-green-700";

export const GAME_SPEED = 150;

export const directionVectors = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
};
