import { useCallback, useEffect } from "react";
import { Direction } from "../types";

interface Props {
  changeSnakeDirection: (direction: Direction) => void;
}

export const useControls = ({ changeSnakeDirection }: Props): void => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          changeSnakeDirection(Direction.UP);
          break;
        case "ArrowDown":
          changeSnakeDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          changeSnakeDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          changeSnakeDirection(Direction.RIGHT);
          break;
        default:
          break;
      }
    },
    [changeSnakeDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
