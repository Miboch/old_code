/**
* graphicsContext API: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function drawGridLines(graphicsContext) {
  graphicsContext.strokeStyle = colours.gridLines;
  // use the graphicsContext to draw lines for every grid cell
  for (let i = 0; i < numberOfCells; i++) {
    for (let j = 0; j < numberOfCells; j++) {
      const x = j * gridCellSize;
      const y = i * gridCellSize;
      // hint use x and y to draw lines around a gridCell
    }
  }
}

/**
* graphicsContext API: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function drawSnake(graphicsContext) {
  graphicsContext.fillStyle = colours.snake;
  // use the graphicsContex to draw all the snake elements
  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    // hint 1: fill in a box of gridCellSize using the coordinate.
    // hint 2: If your snake is being drawn at the top-left corner, look at the x and y coordinates for drawGridLines.
  }
}

/**
* graphicsContext API: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function drawApple(graphicsContext) {
  graphicsContext.fillStyle = colours.apple;
}

/**
* graphicsContext API: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function drawScore(graphicsContext) {
  graphicsContext.fillStyle = colours.scoreColour;
  graphicsContext.font = '28px serif';
  // hint: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
}

function moveSnake() {
  growingSnake();
  let oldHead = snake[0];
  // write your code after this line.
}

function whenPlayerPressesUp() {}

function whenPlayerPressesDown() {}

function whenPlayerPressesLeft() {}

function whenPlayerPressesRight() {}

function snakeTouchesTopEdge() {}

function snakeTouchesBottomEdge() {}

function snakeTouchesLeftEdge() {}

function snakeTouchesRightEdge() {}

function snakeTouchesApple() {
  growing = true;
  // tip: You can get a random valid location using the provided getNewRandomLocation() function.
  // usage: apple = getNewRandomLocation();
}

function snakeRunsIntoItself() {}

/**
 * ========================================================================
 *            Provided code below this line - DO NOT CHANGE
 * ========================================================================
 */

var canvas, snake, width, height, numberOfCells, gridCellSize, apple, direction, gameover, score, timer, ctx, growing;
var colours = {
  snake: '#00aa11',
  apple: '#aa2222',
  background: '#222',
  gridLines: '#44444444',
  scoreColour: '#22afff',
};

document.addEventListener('DOMContentLoaded', (ev) => {
  canvas = document.getElementById('cvs');
  snake = [];
  width = 600;
  height = 600;
  numberOfCells = 30;
  gridCellSize = width / numberOfCells;
  apple = { x: 0, y: 0 };
  direction = { x: 1, y: 0 };
  gameover = true;
  score = 0;
  timer = new TTimer(6);
  timer.start();
  ctx = canvas.getContext('2d');
  growing = false;
  canvas.width = width;
  canvas.height = height;
  setupNewGame();
});

// keyboard events.
document.addEventListener('keydown', (ev) => {
  switch (ev.key) {
    case 'ArrowUp':
    case 'w':
      whenPlayerPressesUp();
      break;
    case 'ArrowDown':
    case 's':
      whenPlayerPressesDown();
      break;
    case 'ArrowLeft':
    case 'a':
      whenPlayerPressesLeft();
      break;
    case 'ArrowRight':
    case 'd':
      whenPlayerPressesRight();
      break;
    case 'Escape':
    case 'r':
      restart();
      break;
  }
});

function restart() {
  location.reload();
}

function setupNewGame() {
  snake = [
    { x: 6, y: 4 },
    { x: 5, y: 4 },
    { x: 4, y: 4 },
  ];
  apple = getNewRandomLocation();
  score = 0;
  gameover = false;
  direction = { x: 1, y: 0 };
}

function getNewRandomLocation() {
  let newLocation = { x: Math.floor(Math.random() * numberOfCells + 1), y: Math.floor(Math.random() * numberOfCells + 1) };
  const locOnSnake = snake.filter((segment) => segment.x == newLocation.x && segment.y == newLocation.y).length > 0;
  if (locOnSnake) return getNewRandomLocation();
  else return newLocation;
}

function clearCanvas() {
  ctx.fillStyle = colours.background;
  ctx.fillRect(0, 0, width, height);
}

function growingSnake() {
  if (growing) {
    growing = false;
    const last = snake[snake.length - 1];
    snake.push({ x: last.x, y: last.y });
  }
}

function gameLoop() {
  clearCanvas();
  drawGridLines(ctx);
  drawScore(ctx);
  drawApple(ctx);
  drawSnake(ctx);
  if (!gameover) {
    moveSnake();
    checkCollisions();
  }
}

function checkCollisions() {
  let head = snake[0];
  if (head.x < 0) snakeTouchesLeftEdge();
  if (head.x > numberOfCells - 1) snakeTouchesRightEdge();
  if (head.y > numberOfCells - 1) snakeTouchesBottomEdge();
  if (head.y < 0) snakeTouchesTopEdge();
  if (selfCollision()) snakeRunsIntoItself();
  if (head.x == apple.x && head.y == apple.y) snakeTouchesApple();
}

function selfCollision() {
  const head = snake[0];
  return snake.slice(1).filter((segment) => segment.x == head.x && segment.y == head.y).length > 0;
}

function TTimer(updatesPerSecond) {
  this.entities = [];
  this.started = false;
  this.UPS = updatesPerSecond;
  this.FPS = 1000 / this.UPS;
  this.delta = 0;
  this.now = 0;
  this.last = 0;
  this.timeSinceLastFrame = 0;
  this.lastFrameTimestamp = 0;
  this.start = start;
  this.stop = stop;

  function start() {
    if (!this.started) {
      this.started = true;
      this.last = new Date().getTime();
      this.lastFrameTimestamp = new Date().getTime();
      this.delta = 0;
      this.timeSinceLastFrame = 0;
      tick.bind(this, 0)();
    }
  }

  function stop() {
    this.started = false;
    this.timeSinceLastFrame = 0;
    this.delta = 0;
    this.now = 0;
    this.last = 0;
  }

  /**
   * Internal timing logic. The update parameter is currently not utilized, but part of the spec for
   * requestAnimationFrame interface
   * @param {Number} update
   */
  function tick(update) {
    if (this.started) {
      this.now = new Date().getTime();
      this.delta += (this.now - this.last) / this.FPS;
      this.last = this.now;
      if (this.delta > 1) {
        this.delta = this.delta - Math.floor(this.delta);
        this.timeSinceLastFrame = (this.now - this.lastFrameTimestamp) / 1000;
        this.lastFrameTimestamp = this.now;
        gameLoop();
      }
      window.requestAnimationFrame(tick.bind(this));
    }
  }
}
