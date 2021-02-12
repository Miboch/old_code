var pong = pong || {};

/* colours for the graphics context. Makes it easier to change the colours later */
const colors = {
  background: '#222222',
  paddle: '#22aa22',
  ball: '#efefef',
  score: '#d98bda77'
};

/**
 * The canvas class is mainly responsible for drawing elements on the screen.
 *
 * Note: In its implementation, it was coupled directly with some of the game objects.
 * This can be improved upon by moving some of the logical flow into index.js, and then passing the necessary positional data as function arguments instead
 */
class Canvas {
  // width and height should match the width and height of the canvas.
  constructor() {
    this.width = 800;
    this.height = 600;
    this.ctx = document.getElementById('pong').getContext('2d');
  }

  /**
   * Entry-point for drawing a frame.
   * Add draw methods to this flow to keep a sensible ordering of the draw calls.
   */
  draw() {
    if (!pong.game.gameOver) {
      this.clearCanvas();
      this.drawScore();
      this.drawLives();
      this.drawPaddles();
      this.drawBall();
    } else {
      this.drawGameOverScreen();
    }
  }

  /**
   * Clears what was previously drawn on the canvas.
   */
  clearCanvas() {
    this.ctx.fillStyle = colors.background;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draws the paddles.
   *
   * - Candidate for refactoring, as it currently consumes two objects from the pong global object.
   * This could be improved upon by passing the paddle positions into the .draw() call from index.js.
   */
  drawPaddles() {
    this.ctx.fillStyle = colors.paddle;
    let leftPaddle = pong.leftPaddle;
    let rightPaddle = pong.rightPaddle;
    this.ctx.fillRect(leftPaddle.constraints.left, leftPaddle.top, leftPaddle.width, leftPaddle.height);
    this.ctx.fillRect(rightPaddle.constraints.left, rightPaddle.top, rightPaddle.width, rightPaddle.height);
    this.ctx.fillStyle = colors.background;
  }

  /**
   * Draws the ball
   * - Candidate for refactoring, as it currently relies on the pong global object much like drawPaddles.
   */
  drawBall() {
    this.ctx.beginPath();
    this.ctx.fillStyle = colors.ball;
    let ball = pong.ball;
    this.ctx.arc(ball.locX, ball.locY, ball.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  /**
   * Draws the pause screen
   */
  drawPauseScreen() {
    this.ctx.fillStyle = colors.background;
    this.ctx.font = '30px monospace';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = colors.paddle;
    this.ctx.fillText('GAME PAUSED', 40, 40, this.width);
  }

  /**
   * Draw the player's current score on the game board
   * - Candidate for refactoring as it currently relies on the pong global object.
   */
  drawScore() {
    let score = pong.game.score;
    this.ctx.fillStyle = colors.score;
    this.ctx.font = '120px monospace';
    this.ctx.fillText(score, this.width / 2 - 30, this.height / 2);
  }

  /**
   * Draw how many lives the player currently has left.
   */
  drawLives() {
    let lives = pong.game.lives;
    this.ctx.fillStyle = colors.score;
    this.ctx.font = '20px monospace';
    for (let i = 0; i < lives; i++) {
      this.ctx.fillText(`❤`, 10 + 30 * i, 20);
    }
  }

  /**
   * Draw a screen summarizing the player's score when they lose the game.
   */
  drawGameOverScreen() {
    let score = pong.game.score;
    this.ctx.fillStyle = colors.background;
    this.ctx.font = '30px monospace';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = colors.score;
    this.ctx.font = '22px monospace';
    this.ctx.fillText('The game is over', this.width / 4, this.height / 2, this.width);
    this.ctx.fillText('Your final score was: ' + score, this.width / 4, this.height / 2 + 35, this.width);
  }
}

pong.Canvas = Canvas;
