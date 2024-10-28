import { directionVectors } from "../../constants";
import { Direction, Position } from "../../types";

export class Snake {
  private body: Array<Position>;
  private currentDirection!: Direction;
  private proposedDirection: Direction;

  constructor(body: Array<Position>, direction: Direction) {
    this.body = body;
    this.proposedDirection = direction;
    this.currentDirection = direction;
  }

  getPositions(): Array<Position> {
    return this.body;
  }

  getHead(): Position {
    return { ...this.body[0] };
  }

  getCurrentDirection() {
    return this.currentDirection;
  }

  private validProposedDirection(): boolean {
    const currentVector = directionVectors[this.currentDirection];
    const newVector = directionVectors[this.proposedDirection];

    return (
      currentVector.x + newVector.x !== 0 || currentVector.y + newVector.y !== 0
    );
  }

  setDirection(direction: Direction) {
    this.proposedDirection = direction;
  }

  getNextPositionHead(): Position | undefined {
    if (this.validProposedDirection()) {
      this.currentDirection = this.proposedDirection;
    }

    if (this.currentDirection !== undefined) {
      const head: Position = this.getHead();

      const vector = directionVectors[this.currentDirection];

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
