var pong = pong || {};

/**
 * Holds state about the game.
 */
class Game {
  constructor() {
    this.reset();
  }

  /**
   * Called when the game is being reset.
   */
  reset() {
    this.score = 0;
    this.pause = false;
    this.lives = 3;
    this.scoreHit = false;
    this.lifeHit = false;
    this.gameOver = false;
  }

  /**
   * Pause the game. Simply inverts the pause state if the game isn't over.
   */
  pauseGame() {
    if (this.gameOver) return;
    this.pause = !this.pause;
  }

  /**
   * Logical flow for what to do when the game is being updated every frame.
   */
  updateGame() {
    if (!this.gameOver) {
      this.updateScore();
      this.loseLife();
    }
  }

  /**
   * Checks if the ball is in range for incrementing the score, and adds a guard ensuring it can only be incremented once until the ball has left the general vicinity of the boundary.
   */
  updateScore() {
    if (pong.ball.locX + pong.ball.radius >= 795 && !this.scoreHit) {
      this.score++;
      this.scoreHit = true;
    } else {
      if (pong.ball.locX + pong.ball.radius <= 700) this.scoreHit = false;
    }
  }

  /**
   * Checks if the ball is in range for taking a life, and adds a guard ensuring it can only be incremented once until the ball has left the general vicinity of the boundary.
   */
  loseLife() {
    if (pong.ball.locX - pong.ball.radius <= 5 && !this.lifeHit) {
      this.lives--;
      this.lifeHit = true;
      this.isGameOver();
    } else {
      if (pong.ball.locX + pong.ball.radius >= 100) this.lifeHit = false;
    }
  }

  /**
   * checks if we should enter the game over state.
   */
  isGameOver() {
    if (this.lives < 1) {
      this.gameOver = true;
      let user = client.getLoggedInUser();
      client.addScore(this.score, user);
    }
  }
}

pong.Game = Game;
