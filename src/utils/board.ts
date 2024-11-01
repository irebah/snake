import { Position } from "../types";

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

export const getRandomNumberInRange = (min: number, max: number): number => {
  if (min > max) {
    throw new Error(
      "Minimum value should be less than or equal to maximum value."
    );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getFieldFromLocalStorage = (field: string): number => {
  const value = localStorage.getItem(field);
  return value ? parseInt(value, 10) : 0;
};
