import {
  APPLE_INITIAL_COL,
  SNAKE_COLOR,
  SNAKE_INITIAL_COL,
  SQUARE_SIZE,
} from "../../constants";
import { Size } from "../../types";
import { useGame } from "../../hooks/useGame";
import { useControls } from "../../hooks/useControls";
import { useRef } from "react";

interface Props {
  size: Size;
}

const Board = ({ size }: Props) => {
  const numColumns = Math.floor(size.width / SQUARE_SIZE);
  const numRows = Math.floor(size.height / SQUARE_SIZE);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const { snakePositions, applePosition, changeSnakeDirection } = useGame({
    numRows,
    numColumns,
    appleInitialCol: APPLE_INITIAL_COL,
    snakeInitialCol: SNAKE_INITIAL_COL,
  });

  useControls({ changeSnakeDirection, boardRef });

  return (
    <>
      <section
        ref={boardRef}
        data-testid="grid"
        className={`grid gap-0 relative border border-black rounded-xl overflow-hidden`}
        style={{
          touchAction: "none",
          width: `${numColumns * SQUARE_SIZE + 2}px`,
          height: `${numRows * SQUARE_SIZE}px`,
          gridTemplateColumns: `repeat(${numColumns}, ${SQUARE_SIZE}px)`,
        }}
      >
        {snakePositions?.map((square) => (
          <div
            data-testid={`snake-${square.y}-${square.x}`}
            key={`${square.y}-${square.x}`}
            className={`${SNAKE_COLOR} absolute first:rounded-lg`}
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
                (row + column) % 2 === 0 ? "bg-gray-400/40" : "bg-gray-300/60"
              }`}
            ></div>
          ))
        )}
      </section>
    </>
  );
};

export default Board;
