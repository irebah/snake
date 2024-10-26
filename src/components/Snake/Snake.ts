import { directionVectors } from "../../constants";
import { Direction, Position } from "../../types";

export class Snake {
  private body: Array<Position>;
  private direction: Direction | undefined;

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
    if (this.direction !== undefined) {
      const currentVector = directionVectors[this.direction];
      const newVector = directionVectors[newDirection];

      return (
        currentVector.x + newVector.x === 0 &&
        currentVector.y + newVector.y === 0
      );
    }

    return false;
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

  move(head: Position) {
    this.body = [head, ...this.body.slice(0, -1)];
  }

  grow(head: Position) {
    this.body = [head, ...this.body];
  }
}
