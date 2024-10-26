import { Direction, Position } from "../types";

export const getHeadClass = (snakeDirection: Direction | undefined): string => {
  if (snakeDirection !== undefined) {
    switch (snakeDirection) {
      case Direction.UP:
        return "first:rounded-t-full";
      case Direction.DOWN:
        return "first:rounded-b-full";
      case Direction.RIGHT:
        return "first:rounded-r-full";
      case Direction.LEFT:
        return "first:rounded-l-full";
    }
  }

  return "";
};

export const positionIsWithinBoard = (
  position: Position,
  numColumns: number,
  numRows: number
): boolean => {
  return (
    position.x < numColumns &&
    position.x >= 0 &&
    position.y < numRows &&
    position.y >= 0
  );
};
