var pong = pong || {};

/**
 * Describes a ball in the pong game. Currently also handles the collision logic in the game.
 * @param {number} locX
 * @param {number} locY
 * @param {number} radius
 */
class Ball {
  constructor(locX = 0, locY = 0, radius = 10) {
    this.locX = locX;
    this.locY = locY;
    this.radius = radius;
    this.speed = 400;
    this.elapsedTicks = 0;
    this.increaseEveryTicks = 3600; // a minute at 60 Hz
    this.setDirection();
  }

  // sets a new random direction when the game starts or is reset.
  setDirection() {
    this.direction = [0, 0];
    // pick random initial direction
    this.direction[0] = [-1, 1][(Math.random() * 2) | 0];
    this.direction[1] = [-1, 1][(Math.random() * 2) | 0];
  }

  /**
   * Move the ball and invert directions if out of bounds.
   */
  move(deltaT) {
    let newX = this.locX + this.direction[0] * this.speed * deltaT;
    let newY = this.locY + this.direction[1] * this.speed * deltaT;
    // check collision upper boundary
    if (newY - this.radius <= 0) {
      newY = this.radius;
      this.direction[1] = 1;
    }
    // check collision with bottom boundary
    if (newY + this.radius >= 600) {
      this.direction[1] = -1;
      newY = 600 - this.radius;
    }
    // check collision with left boundary
    if (newX - this.radius <= 0) {
      this.direction[0] = 1;
      newX = this.radius;
    }
    // check collision with right boundary
    if (newX + this.radius >= 800) {
      newX = 800 - this.radius;
      this.direction[0] = -1;
    }
    // check collision with left paddle
    let paddle = pong.leftPaddle;
    if (newX - this.radius <= paddle.topRight.x) {
      if (newY + this.radius >= paddle.topLeft.y && newY - this.radius <= paddle.bottomLeft.y) this.direction[0] = 1;
    }
    // check collision with right paddle
    paddle = pong.rightPaddle;
    if (newX + this.radius >= paddle.topLeft.x) {
      if (newY + this.radius >= paddle.topLeft.y && newY - this.radius <= paddle.bottomLeft.y) this.direction[0] = -1;
    }
    // update new locations
    this.locY = newY;
    this.locX = newX;
  }

  /**
   * Called when the game is reset.
   */
  reset() {
    this.speed = 400;
    this.elapsedTicks = 0;
    this.locX = 395;
    this.locY = 295;
    this.setDirection();
  }
}

pong.Ball = Ball;
