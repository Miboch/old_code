var pong = pong || {};

/**
 * creates a paddle with a given set of constraints and starting location.
 */
class Paddle {
  /**
   * @param {number} startLoc
   * @param {{top: number, bottom: number, left: number}} constraints
   */
  constructor(startLoc = 0, constraints = { top: 0, bottom: 600, left: 0 }) {
    this.top = startLoc;
    this.width = 20;
    this.height = 80;
    this.speed = 300;
    this.constraints = {
      top: constraints.top || 0,
      bottom: constraints.bottom || 600,
      left: constraints.left || 0
    };
  }

  /**
   * move the paddle upward by its speed multiplied by time since last update
   * @param {number} deltaT
   */
  moveUp(deltaT) {
    let nextPosition = this.top - this.speed * deltaT;
    if (nextPosition < this.constraints.top) this.top = 0;
    else this.top = nextPosition;
  }

  /**
   * move the paddle downwqard by its speed multiplied by the time since last update
   * @param {number} deltaT
   */
  moveDown(deltaT) {
    let nextPosition = this.top + this.speed * deltaT;
    let bottomPosition = this.constraints.bottom - this.height;
    if (nextPosition > bottomPosition) this.top = bottomPosition;
    else this.top = nextPosition;
  }

  reset() {
    this.top = 260;
  }

  /* getters for retrieving the corners of the paddle. */
  get topLeft() {
    return { x: this.constraints.left, y: this.top };
  }

  get topRight() {
    return { x: this.constraints.left + this.width, y: this.top };
  }

  get bottomRight() {
    return { x: this.constraints.left, y: this.top + this.height };
  }

  get bottomLeft() {
    return { x: this.constraints.left + this.width, y: this.top + this.height };
  }
}

pong.Paddle = Paddle;
