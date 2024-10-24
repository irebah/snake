import { Position } from "../../types";

export class Apple {
  private position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  moveToRandomPosition() {}

  isAt(position: Position): boolean {
    return position.x === this.position.x && position.y === this.position.y;
  }
}
