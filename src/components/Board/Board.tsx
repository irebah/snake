import { APPLE_COLOR, SNAKE_COLOR, SQUARE_SIZE } from "../../constants";
import { Position, Size } from "../../types";

interface Props {
  size: Size;
  snake: Array<Position>;
  apple: Position;
}

const Board = ({ size, snake, apple }: Props) => {
  const numColumns = Math.floor(size.width / SQUARE_SIZE);
  const numRows = Math.floor(size.height / SQUARE_SIZE);

  const hasSnake = (position: Position): boolean =>
    snake.some(
      (snakePosition) =>
        snakePosition.x === position.x && snakePosition.y === position.y
    );

  const hasApple = (position: Position): boolean =>
    apple.x === position.x && apple.y === position.y;

  const getColor = (position: Position): string => {
    if (hasSnake(position)) return SNAKE_COLOR;
    if (hasApple(position)) return APPLE_COLOR;
    return "";
  };

  return (
    <section
      data-testid="grid"
      className="grid gap-0 border border-black bg-black"
      style={{
        width: `${numColumns * SQUARE_SIZE}px`,
        height: `${numRows * SQUARE_SIZE}px`,
        gridTemplateColumns: `repeat(${numColumns}, ${SQUARE_SIZE}px)`,
      }}
    >
      {[...Array(numRows).keys()].map((row) =>
        [...Array(numColumns).keys()].map((column) => (
          <div
            data-testid={`cell-${row}-${column}`}
            key={`${row}-${column}`}
            className={`${getColor({ x: column, y: row })}`}
          ></div>
        ))
      )}
    </section>
  );
};

export default Board;
