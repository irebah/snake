import { directionVectors } from "../../constants";
import { Direction, Position } from "../../types";

export class Snake {
  private body: Array<Position>;
  private direction: Direction;

  constructor(body: Array<Position>, direction: Direction) {
    this.body = body;
    this.direction = direction;
  }

  getPositions(): Array<Position> {
    return this.body;
  }

  getHead(): Position {
    return { ...this.body[0] };
  }

  getDirection() {
    return this.direction;
  }

  private isOposite(newDirection: Direction): boolean {
    const currentVector = directionVectors[this.direction];
    const newVector = directionVectors[newDirection];

    return (
      currentVector.x + newVector.x === 0 && currentVector.y + newVector.y === 0
    );
  }

  setDirection(direction: Direction) {
    if (!this.isOposite(direction)) {
      this.direction = direction;
    }
  }

  getNextPositionHead(): Position | undefined {
    if (this.direction !== undefined) {
      const head: Position = this.getHead();

      const vector = directionVectors[this.direction];

      const newHead = { x: head.x + vector.x, y: head.y + vector.y };

      return newHead;
    }
  }

  isBodyAt(position: Position): boolean {
    return this.body.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }

  move(head: Position) {
    this.body = [head, ...this.body.slice(0, -1)];
  }

  grow(head: Position) {
    this.body = [head, ...this.body];
  }
}
