function TScore() {
  let score = 0;
  let snackCount = 0;

  this.getScore = () => score;
  this.getSnackCount = () => snackCount;
  this.increaseScore = (by) => (score += by);
  this.increaseSnackCount = () => snackCount++;
  this.reset = () => {
    snackCount = 0;
    score = 0;
  };
}

function TSnack() {
  this.position = new TPosition(0, 0);
  this.reset = reset;
  this.decay = decay;
  this.eaten = eaten;
  this.reset();
  this.state = new TStateManager(IdleSnack);

  function reset() {
    this.position.x = Math.floor(Math.random() * GameBoardSize.Cols);
    this.position.y = Math.floor(Math.random() * GameBoardSize.Rows);
    this.yumValue = DynamicParameters.pickupValue;
    this.currentValue = this.yumValue;
  }

  function decay(byAmount) {
    this.currentValue = Math.max(1, this.currentValue - byAmount);
  }

  function eaten(pos) {
    if (pos.x === this.position.x && pos.y === this.position.y) {
      score.increaseScore(this.currentValue);
      score.increaseSnackCount();
      SnackSound.play();
      snake.grow(1);
      this.reset();
    }
  }
}

/**
 * Creates a snake with a specified length, tail and snakeLength body segments. Minimum Length is 3.
 * @param {number} snakeLength
 */
function TSnake(snakeLength) {
  this.grow = (amount) => (this.growth += amount);
  this.reset = reset;
  this.move = move;
  this.turn = turn;
  // setup the initial 3 snake parts. We will "grow" the remainders if applicable.
  this.reset(snakeLength);
  this.state = new TStateManager(IdleSnake);

  function reset(length) {
    // min 0, subtract 3 from grow for the initial length segments.
    this.growth = Math.max(0, length - 3);
    this.segments = [];
    this.segments.push(new TSegment());
    this.segments.push(new TSegment());
    this.segments.push(new TSegment());
    this.segments[0].setPos(InitialSnakeLocation.x, InitialSnakeLocation.y);
    this.segments[1].setPos(InitialSnakeLocation.x - 1, InitialSnakeLocation.y);
    this.segments[2].setPos(InitialSnakeLocation.x - 2, InitialSnakeLocation.y);
    this.walkDirection = SnakeDirections.RIGHT;
    this.directionKey = SnakeDirections.MAP.RIGHT;
    this.pendingKey = this.directionKey;
  }

  function move() {
    this.directionKey = this.pendingKey;
    let movingSegment;
    let previousLeadPos = this.segments[0].getPos();
    if (this.growth > 0) {
      movingSegment = new TSegment();
      this.growth--;
      this.segments.push(movingSegment);
    } else {
      movingSegment = this.segments[this.segments.length - 1];
    }
    this.segments.unshift(this.segments.pop());
    movingSegment.setPos(previousLeadPos.x, previousLeadPos.y);
    movingSegment.move(this.walkDirection);
    this.canTurn = true;
  }

  /**
   * if the snake hasn't turned yet in the current move it will set a new direction if the flagged input is a valid move.
   * These extra checks are done to prevent the snake from running backwards by the player turning quickly in succession.
   * @param {string} direction
   */
  function turn(direction) {
    if (!this.canTurn) return;
    switch (direction) {
      case SnakeDirections.MAP.DOWN:
        if (this.directionKey !== SnakeDirections.MAP.UP) {
          this.walkDirection = SnakeDirections.DOWN;
          this.canTurn = false;
          this.pendingKey = direction;
        }
        break;
      case SnakeDirections.MAP.UP:
        if (this.directionKey !== SnakeDirections.MAP.DOWN) {
          this.walkDirection = SnakeDirections.UP;
          this.canTurn = false;
          this.pendingKey = direction;
        }
        break;
      case SnakeDirections.MAP.LEFT:
        if (this.directionKey !== SnakeDirections.MAP.RIGHT) {
          this.walkDirection = SnakeDirections.LEFT;
          this.canTurn = false;
          this.pendingKey = direction;
        }
        break;
      case SnakeDirections.MAP.RIGHT:
        if (this.directionKey !== SnakeDirections.MAP.LEFT) {
          this.walkDirection = SnakeDirections.RIGHT;
          this.canTurn = false;
          this.pendingKey = direction;
        }
        break;
    }
  }
}

function TSegment() {
  this.position = new TPosition(-10, 0);
  this.previousPosition = new TPosition(-10, 0);
  this.setPos = setPos;
  this.getPos = () => this.position;
  this.move = move;

  function setPos(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  function move(newPos) {
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
    this.setPos(this.position.x + newPos.x, this.position.y + newPos.y);
  }
}

function checkDefeat() {
  const headPos = snake.segments[0].getPos();
  if (headPos.x < 0 || headPos.x >= GameBoardSize.Cols) {
    Screens.changeState(GameOverScreen);
  }
  if (headPos.y < 0 || headPos.y >= GameBoardSize.Rows) {
    Screens.changeState(GameOverScreen);
  }
  // collide with self.
  for (let i = 1; i < snake.segments.length; i++) {
    segPos = snake.segments[i].getPos();
    if (segPos.x === headPos.x && segPos.y === headPos.y) {
      Screens.changeState(GameOverScreen);
    }
  }
}
