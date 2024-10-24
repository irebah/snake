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

  grow() {
    // this.body = [head, ...this.body];
  }

  private isOposite(newDirection: Direction): boolean {
    switch (newDirection) {
      case Direction.UP:
        return this.direction === Direction.DOWN;
      case Direction.DOWN:
        return this.direction === Direction.UP;
      case Direction.LEFT:
        return this.direction === Direction.RIGHT;
      case Direction.RIGHT:
        return this.direction === Direction.LEFT;
    }
  }

  setDirection(direction: Direction) {
    if (!this.isOposite(direction)) {
      this.direction = direction;
    }
  }

  move() {
    if (this.direction !== undefined) {
      const head: Position = this.getHead();

      switch (this.direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      this.body = [head, ...this.body.slice(0, -1)];
    }
  }
}
