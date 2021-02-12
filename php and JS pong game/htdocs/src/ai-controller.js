var pong = pong || {};
/**
 * CPU paddle:
 * behavior: lazy chase:
 */
class AIController {
  constructor(paddle) {
    this.paddle = paddle;
    this.tolerance = 40; // will begin to chase when center of paddle is this far away from ball on Y-axis
  }

  update(deltaTime) {
    let loc = pong.ball.locY + pong.ball.radius;
    let distance = this.paddle.top - loc;
    if (Math.abs(distance) >= this.tolerance) {
      distance > 0 ? this.paddle.moveUp(deltaTime) : this.paddle.moveDown(deltaTime);
    }
  }
}

pong.AIController = AIController;
