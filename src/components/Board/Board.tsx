import {
  APPLE_COLOR,
  APPLE_INITIAL_COL,
  SNAKE_COLOR,
  SNAKE_INITIAL_COL,
  SQUARE_SIZE,
} from "../../constants";
import { Position, Size } from "../../types";
import { useGame } from "../../hooks/useGame";
import { useControls } from "../../hooks/useControls";
import { useEffect } from "react";
import { useGameContext } from "../../context";
import { STOP_GAME } from "../../context/types";

interface Props {
  size: Size;
}

const Board = ({ size }: Props) => {
  const numColumns = Math.floor(size.width / SQUARE_SIZE);
  const numRows = Math.floor(size.height / SQUARE_SIZE);
  const { state, dispatch } = useGameContext();
  const { snakePositions, applePosition, changeSnakeDirection } = useGame({
    numRows,
    numColumns,
    appleInitialCol: APPLE_INITIAL_COL,
    snakeInitialCol: SNAKE_INITIAL_COL,
  });
  useControls({ changeSnakeDirection });

  useEffect(() => {
    if (state.activeGame && snakePositions && numColumns && numRows) {
      const head: Position = snakePositions[0];
      if (
        head.x > numColumns - 1 ||
        head.x < 0 ||
        head.y > numRows - 1 ||
        head.y < 0
      ) {
        dispatch({ type: STOP_GAME });
      }
    }
  }, [snakePositions, numColumns, numRows, state, dispatch]);

  return (
    <>
      <section
        data-testid="grid"
        className="grid gap-0 bg-green-400 relative"
        style={{
          width: `${numColumns * SQUARE_SIZE}px`,
          height: `${numRows * SQUARE_SIZE}px`,
          gridTemplateColumns: `repeat(${numColumns}, ${SQUARE_SIZE}px)`,
        }}
      >
        {snakePositions?.map((square) => (
          <div
            data-testid={`snake-${square.y}-${square.x}`}
            key={`${square.y}-${square.x}`}
            className={`${SNAKE_COLOR} absolute`}
            style={{
              transform: `translate(${square.x * SQUARE_SIZE}px, ${
                square.y * SQUARE_SIZE
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
            className={`${APPLE_COLOR} absolute rounded-xl`}
            style={{
              top: `${applePosition.y * SQUARE_SIZE}px`,
              left: `${applePosition.x * SQUARE_SIZE}px`,
              width: `${SQUARE_SIZE}px`,
              height: `${SQUARE_SIZE}px`,
            }}
          ></div>
        )}

        {/* {[...Array(numRows).keys()].map((row) =>
        [...Array(numColumns).keys()].map((column) => (
          <div
          data-testid={`cell-${row}-${column}`}
          key={`${row}-${column}`}
          className={`bg-black border border-white`}
          ></div>
          ))
          )} */}
      </section>
    </>
  );
};

export default Board;
