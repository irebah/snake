import { useCallback, useEffect, useRef, useState } from "react";
import { Direction, Position } from "../types";
import { GAME_SPEED } from "../constants";
import { Snake } from "../components/Snake/Snake";
import { Apple } from "../components/Apple/Apple";
import { useGameContext } from "../context";
import { INCREASE_COUNTER, START_GAME, STOP_GAME } from "../context/types";
import { positionIsWithinBoard } from "../utils/board";

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
  snakeDirection: Direction | undefined;
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
  >();

  const [applePosition, setApplePosition] = useState<Position | undefined>();

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
          const nextPosition = snake.current.getNextPositionHead();
          if (nextPosition) {
            if (apple.current?.isAt(nextPosition)) {
              snake.current.grow(nextPosition);
              dispatch({ type: INCREASE_COUNTER });
              apple.current.moveToRandomPosition(numColumns, numRows);
            } else if (
              !positionIsWithinBoard(nextPosition, numColumns, numRows) ||
              snake.current.isBodyAt(nextPosition)
            ) {
              dispatch({ type: STOP_GAME });
            } else {
              snake.current.move(nextPosition);
            }
          }

          setSnakePositions(snake.current?.getPositions());
          setApplePosition(apple.current?.getPosition());
        }
      }

      requestAnimationFrame(gameLoop);
    },
    [dispatch, numColumns, numRows]
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
    snakeDirection: snake.current?.getCurrentDirection(),
  };
};
