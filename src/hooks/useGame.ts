import { useCallback, useEffect, useRef, useState } from "react";
import { Direction, Position } from "../types";
import { GAME_SPEED } from "../constants";
import { Snake } from "../components/Snake/Snake";
import { Apple } from "../components/Apple/Apple";
import { useGameContext } from "../context";
import { INCREASE_COUNTER, START_GAME } from "../context/types";

interface Props {
  numRows: number;
  numColumns: number;
  appleInitialCol: number;
  snakeInitialCol: number;
}

interface Output {
  snakePositions?: Array<Position>;
  applePosition?: Position;
  changeSnakeDirection: (direction: Direction) => void;
}

export const useGame = ({
  numRows,
  numColumns,
  appleInitialCol,
  snakeInitialCol,
}: Props): Output => {
  const snake = useRef<Snake>();
  const apple = useRef<Apple>();
  const lastTimeRef = useRef(performance.now());
  const { state, dispatch } = useGameContext();

  const activeGameRef = useRef(state.activeGame);

  const [snakePositions, setSnakePositions] = useState<
    Array<Position> | undefined
  >(snake.current?.getPositions());

  const [applePosition, setApplePosition] = useState<Position | undefined>(
    apple.current?.getPosition()
  );

  const changeSnakeDirection = (direction: Direction) => {
    if (snake.current) {
      snake.current.setDirection(direction);
    }

    if (state.readyGame && !state.activeGame && direction !== Direction.LEFT) {
      dispatch({ type: START_GAME });
    }
  };

  const init = useCallback(() => {
    if (numColumns && numRows) {
      const initialPositionSnake: Position = {
        x: snakeInitialCol,
        y: Math.floor(numRows / 2),
      };

      const initialPositionApple: Position = {
        x: Math.min(numColumns - 1, appleInitialCol),
        y: Math.floor(numRows / 2),
      };

      apple.current = new Apple(initialPositionApple);
      snake.current = new Snake(
        [
          initialPositionSnake,
          { ...initialPositionSnake, x: initialPositionSnake.x - 1 },
          { ...initialPositionSnake, x: initialPositionSnake.x - 2 },
        ],
        Direction.RIGHT
      );

      setSnakePositions(snake.current?.getPositions());
      setApplePosition(apple.current?.getPosition());
    }
  }, [numColumns, numRows, appleInitialCol, snakeInitialCol]);

  const gameLoop = useCallback(
    (currentTime: number) => {
      const elapsedTime = currentTime - lastTimeRef.current;

      if (activeGameRef.current && elapsedTime >= GAME_SPEED) {
        lastTimeRef.current = currentTime;

        if (snake.current) {
          snake.current.move();

          const snakeHead = snake.current.getHead();
          if (apple.current?.isAt(snakeHead)) {
            dispatch({ type: INCREASE_COUNTER });
            snake.current.grow();
            apple.current.moveToRandomPosition();
          }

          setSnakePositions(snake.current?.getPositions());
          setApplePosition(apple.current?.getPosition());
        }
      }

      requestAnimationFrame(gameLoop);
    },
    [dispatch]
  );

  useEffect(() => {
    activeGameRef.current = state.activeGame;

    if (state.activeGame) {
      lastTimeRef.current = performance.now();
      requestAnimationFrame(gameLoop);
    }
  }, [state.activeGame, gameLoop]);

  useEffect(() => {
    if ((state.readyGame && !state.activeGame) || !snake.current) {
      init();
    }
  }, [init, state.readyGame, state.activeGame]);

  return {
    snakePositions,
    applePosition,
    changeSnakeDirection,
  };
};
