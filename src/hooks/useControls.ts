import { useCallback, useEffect } from "react";
import { Direction } from "../types";

interface Props {
  changeSnakeDirection: (direction: Direction) => void;
  boardRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const useControls = ({
  changeSnakeDirection,
  boardRef,
}: Props): void => {
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

  const handleTouch = useCallback(
    (event: TouchEvent) => {
      const currentBoard = boardRef.current;
      const touchStartY = event.touches[0].clientY;
      const touchStartX = event.touches[0].clientX;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        event.preventDefault();

        const touchMoveY = moveEvent.touches[0].clientY;
        const touchMoveX = moveEvent.touches[0].clientX;

        const deltaY = touchStartY - touchMoveY;
        const deltaX = touchStartX - touchMoveX;

        // Determine the direction based on the swipe
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          if (deltaY > 5) {
            changeSnakeDirection(Direction.UP);
          } else if (deltaY < -5) {
            changeSnakeDirection(Direction.DOWN);
          }
        } else {
          if (deltaX > 5) {
            changeSnakeDirection(Direction.LEFT);
          } else if (deltaX < -5) {
            changeSnakeDirection(Direction.RIGHT);
          }
        }

        // Remove the touchmove event listener after processing the swipe
        currentBoard?.removeEventListener("touchmove", handleTouchMove);
      };

      if (currentBoard) {
        currentBoard.addEventListener("touchmove", handleTouchMove);
      }
    },
    [changeSnakeDirection, boardRef]
  );

  useEffect(() => {
    const currentBoard = boardRef.current;

    window.addEventListener("keydown", handleKeyDown);
    if (currentBoard) {
      currentBoard.addEventListener("touchstart", handleTouch);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      currentBoard?.removeEventListener("touchstart", handleTouch);
    };
  }, [handleKeyDown, handleTouch, boardRef]);
};
