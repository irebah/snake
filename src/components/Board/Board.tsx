import {
  APPLE_INITIAL_COL,
  SNAKE_COLOR,
  SNAKE_INITIAL_COL,
  SQUARE_SIZE,
} from "../../constants";
import { Direction, Position, Size } from "../../types";
import { useGame } from "../../hooks/useGame";
import { useControls } from "../../hooks/useControls";
import { useEffect } from "react";
import { useGameContext } from "../../context";
import { STOP_GAME } from "../../context/types";
import crashSound from "../../assets/477802__saltbearer__snappy-lo-fi-perc.wav";

interface Props {
  size: Size;
}

const Board = ({ size }: Props) => {
  const numColumns = Math.floor(size.width / SQUARE_SIZE);
  const numRows = Math.floor(size.height / SQUARE_SIZE);
  const { state, dispatch } = useGameContext();
  const {
    snakePositions,
    applePosition,
    changeSnakeDirection,
    snakeDirection,
  } = useGame({
    numRows,
    numColumns,
    appleInitialCol: APPLE_INITIAL_COL,
    snakeInitialCol: SNAKE_INITIAL_COL,
  });
  useControls({ changeSnakeDirection });

  const getHeadClass = (): string => {
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
    return "";
  };

  useEffect(() => {
    if (state.activeGame && snakePositions && numColumns && numRows) {
      const head: Position = snakePositions[0];
      if (
        head.x > numColumns - 1 ||
        head.x < 0 ||
        head.y > numRows - 1 ||
        head.y < 0
      ) {
        const audio = new Audio(crashSound);
        audio.play();
        dispatch({ type: STOP_GAME });
      }
    }
  }, [snakePositions, numColumns, numRows, state, dispatch]);

  return (
    <>
      <section
        data-testid="grid"
        className={`grid gap-0 relative border border-black rounded-xl overflow-hidden`}
        style={{
          width: `${numColumns * SQUARE_SIZE + 2}px`,
          height: `${numRows * SQUARE_SIZE}px`,
          gridTemplateColumns: `repeat(${numColumns}, ${SQUARE_SIZE}px)`,
        }}
      >
        {snakePositions?.map((square) => (
          <div
            data-testid={`snake-${square.y}-${square.x}`}
            key={`${square.y}-${square.x}`}
            className={`${SNAKE_COLOR} absolute ${getHeadClass()}`}
            style={{
              transform: `translate(${square.x * SQUARE_SIZE}px, ${
                square.y * SQUARE_SIZE - 1
              }px)`,
              width: `${SQUARE_SIZE}px`,
              height: `${SQUARE_SIZE}px`,
            }}
          ></div>
        ))}

        {applePosition && (
          <div
            data-testid={`apple-${applePosition.y}-${applePosition.x}`}
            key={`${applePosition.y}-${applePosition.x}`}
            className="absolute rounded-full flex justify-center items-center"
            style={{
              top: `${applePosition.y * SQUARE_SIZE - 1}px`,
              left: `${applePosition.x * SQUARE_SIZE}px`,
              width: `${SQUARE_SIZE}px`,
              height: `${SQUARE_SIZE}px`,
            }}
          >
            <span className="text-[1.875em]">🍎</span>
          </div>
        )}

        {[...Array(numRows).keys()].map((row) =>
          [...Array(numColumns).keys()].map((column) => (
            <div
              data-testid={`cell-${row}-${column}`}
              key={`${row}-${column}`}
              className={`${
                (row + column) % 2 === 0 ? "bg-blue-600/60" : "bg-blue-300/60"
              }`}
            ></div>
          ))
        )}
      </section>
    </>
  );
};

export default Board;
