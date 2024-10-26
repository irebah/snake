import { Position } from "../../types";

export class Apple {
  private position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  moveToRandomPosition(numColumns: number, numRows: number) {
    this.position = {
      x: Math.floor(Math.random() * numColumns),
      y: Math.floor(Math.random() * numRows),
    };
  }

  isAt(position: Position): boolean {
    return position.x === this.position.x && position.y === this.position.y;
  }
}
