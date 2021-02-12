'use strict';

// cache tile-variance so tile alpha is always the same for each tile.
const tileVariance = [];

// initialize other sprites so they are ready to be used in the drawing functions.
const playSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Play, new TPosition(0, 0));
const tileSprite = new TSprite(Tile, SpriteSheets.Tile, new TPosition(0, 0));
const pauseSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Resume, new TPosition(0, 0));
const EndGameSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.GameOver, new TPosition(0, 0));
const NumberSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Number, new TPosition(0, 0));

// The HomeButtonSprite sprite will draw the wrong sprite, because it has the same values in the atlas
// as the Resume value. We only use the sprite for collision testing on click however,
// so this shouldn't be an issue as of yet.
const HomeButtonSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Home, new TPosition(0, 0));
const RetryButtonSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Retry, new TPosition(0, 0));

// snake sprites
const SnakeHeadSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Head, new TPosition(0, 0));
const SnakeBodySprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Body, new TPosition(0, 0));
const SnakeTailSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Tail, new TPosition(0, 0));

// snack sprite
const SnackSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Bait, new TPosition(0, 0));

/**
 * Draw some text on the canvas!
 * First converts the letters to indices and then loops through the message to write it.
 * @param {string} text
 * @param {ETextLocation} Elocation
 */
function textToCanvas(text, Elocation, yOffset = 0) {
  let initialLoc;
  let xOffset = 0;
  switch (Elocation) {
    case ETextLocations.TopLeft:
    default:
      initialLoc = TextLocations.TopLeft;
      break;
    case ETextLocations.Center:
      initialLoc = TextLocations.Center;
      xOffset = text.length * (SpriteSheets.Letters.w / 2);
      break;
    case ETextLocations.Attribution:
      initialLoc = TextLocations.Attribution;
      xOffset = text.length * (SpriteSheets.Letters.w / 2);
      break;
  }
  const fontSprite = new TSprite(Letters, SpriteSheets.Letters, new TPosition(initialLoc.x, initialLoc.y));
  text = text
    .toLowerCase()
    .split('')
    .map((c) => Number(c.charCodeAt(0) - 97));
  text.forEach((letterIndex, index) => {
    fontSprite.setIndex(letterIndex);
    fontSprite.getPos().x = initialLoc.x + index * fontSprite.getSpriteInfo().w - xOffset;
    fontSprite.getPos().y = initialLoc.y + SpriteSheets.Letters.h * yOffset;
    // guard on spaces so we do not draw them
    if (letterIndex >= 0) fontSprite.draw();
  });
}

function numToCanvas(number, Elocation, yOffset = 0) {
  let initialPos;
  switch (Elocation) {
    case ETextLocations.TopLeft:
    default:
      initialPos = TextLocations.TopLeft;
      break;
    case ETextLocations.Attribution:
      initialPos = TextLocations.Attribution;
      break;
    case ETextLocations.Center:
      initialPos = TextLocations.Center;
      break;
    case ETextLocations.EndgameScore:
      initialPos = TextLocations.EndgameScore;
      break;
  }
  String(number)
    .split('')
    .map((num, i) => drawNumbers(num, initialPos, i, yOffset));
}

function drawNumbers(number, initialPosition, xOffset, yOffset = 0) {
  NumberSprite.setIndex(number);
  const p = NumberSprite.getPos();
  p.x = initialPosition.x + SpriteSheets.SnakeSheet.Number.w * xOffset;
  p.y = initialPosition.y + SpriteSheets.SnakeSheet.Number.h * yOffset;
  NumberSprite.draw();
}

/**
 * Draws the game tile grid. if variation is set to true it will slightly vary the alpha of each tile
 * to make the field look a bit more interesting.
 * @param {boolean} variation default value true
 */
function drawTiles(variation = true) {
  const numTiles = GameBoardSize.Cols * GameBoardSize.Rows;
  if (tileVariance.length == 0) {
    generateTileVariants(numTiles);
  }
  const pos = tileSprite.getPos();
  for (let i = 0; i < numTiles; i++) {
    pos.x = SpriteSheets.Tile.w * (i % GameBoardSize.Cols);
    // since numTiles is a product of col * row, we can determine the row by current index divided by num cols.
    // doing it bit of math saves us from having to do a nested for-loop.
    pos.y = SpriteSheets.Tile.h * Math.floor(i / GameBoardSize.Cols);
    if (variation) {
      // there is no getAlpha method on the sprite class, so we have to get the default value from the
      // constants. It was assumed that it was not allowed to change the source in the supplied files
      // which is why no getter was added.
      tileSprite.setAlpha(tileVariance[i]);
      tileSprite.draw();
      tileSprite.setAlpha(0.4);
    } else {
      tileSprite.draw();
    }
  }
}

/**
 * populate the tile variants array, so the grid stays static when redrawing the tiles.
 * @param {number} numTiles
 */
function generateTileVariants(numTiles) {
  for (let i = 0; i < numTiles; i++) {
    tileVariance.push(0.4 + getAlphaVariation());
  }
}

/**
 *
 * @param {{x: number, y: number}} startLocation
 * @param {number} direction accepts values 0 to 3
 */
function drawDecorativeSnake(startLocation, direction) {
  const startLoc = {
    x: startLocation.x * SpriteSheets.SnakeSheet.Head.w,
    y: startLocation.y * SpriteSheets.SnakeSheet.Head.h,
  };
  const headSprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Head, new TPosition(startLoc.x, startLoc.y));
  const bodySprite = new TSprite(ImgSheet, SpriteSheets.SnakeSheet.Body, new TPosition(0, 0));
  headSprite.setIndex(direction);
  if (direction == 0 || direction == 3) {
    bodySprite.setIndex(5);
  } else {
    bodySprite.setIndex(4);
  }
  headSprite.draw();
  const bodyVec = getBodyVec(direction);
  for (let i = 1; i < 18; i++) {
    const p = bodySprite.getPos();
    p.x = startLoc.x + bodyVec.x * i * bodySprite.getSpriteInfo().w;
    p.y = startLoc.y + bodyVec.y * i * bodySprite.getSpriteInfo().h;
    bodySprite.draw();
  }
}

function drawEndInfo() {
  EndGameSprite.draw();
}

function drawStartButton() {
  // center position
  const x = cvs.width / 2 - SpriteSheets.SnakeSheet.Play.w / 2;
  const y = cvs.height / 2 - SpriteSheets.SnakeSheet.Play.h / 2;
  playSprite.getPos().x = x;
  playSprite.getPos().y = y;
  playSprite.draw();
}

function drawPauseSprite() {
  const x = cvs.width / 2 - SpriteSheets.SnakeSheet.Resume.w / 2;
  const y = cvs.height / 2 - SpriteSheets.SnakeSheet.Resume.h / 2;
  pauseSprite.getPos().x = x;
  pauseSprite.getPos().y = y;
  pauseSprite.draw();
}

function clearCanvas() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function getAlphaVariation() {
  const addOrSub = Math.random() > 0.5 ? 1 : -1;
  return ((1 + Math.random() * 10) / 100) * addOrSub;
}

function drawSnake() {
  const snakeDim = SpriteSheets.SnakeSheet.Head.w;
  // drawSnakeDebug();
  // draw the head of the snake
  SnakeHeadSprite.getPos().x = snake.segments[0].getPos().x * snakeDim;
  SnakeHeadSprite.getPos().y = snake.segments[0].getPos().y * snakeDim;
  SnakeHeadSprite.setIndex(setSnakeHeadSpriteIndex(snake.directionKey));
  SnakeHeadSprite.draw();
  // draw the body.
  for (let i = 1; i < snake.segments.length - 1; i++) {
    SnakeBodySprite.getPos().x = snake.segments[i].getPos().x * snakeDim;
    SnakeBodySprite.getPos().y = snake.segments[i].getPos().y * snakeDim;
    SnakeBodySprite.setIndex(setSnakeBodySpriteIndex(i));
    SnakeBodySprite.draw();
  }
  // draw the tail
  const tailIndex = snake.segments.length - 1;
  SnakeTailSprite.getPos().x = snake.segments[tailIndex].getPos().x * snakeDim;
  SnakeTailSprite.getPos().y = snake.segments[tailIndex].getPos().y * snakeDim;
  SnakeTailSprite.setIndex(setSnakeTailSpriteIndex(tailIndex));
  SnakeTailSprite.draw();
}

/**
 * can simply be determined by which way the sanke is currently moving since its the "lead" segment
 * @param {string} directionKey
 */
function setSnakeHeadSpriteIndex(directionKey) {
  if (directionKey === SnakeDirections.MAP.UP) {
    return 0;
  }
  if (directionKey === SnakeDirections.MAP.DOWN) {
    return 3;
  }
  if (directionKey === SnakeDirections.MAP.LEFT) {
    return 2;
  }
  if (directionKey === SnakeDirections.MAP.RIGHT) {
    return 1;
  }
}

/**
 * We determine the relative position of the connecting pieces to determine which index
 * we must draw so we have a continuous snake
 *
 * We utilize the fact that each "virtual" position is adjacent and continuous to determine these
 * by simply subtracting the position x and y from the previous and next segment
 * @param {Number} currentIndex
 */
function setSnakeBodySpriteIndex(currentIndex) {
  const prevPos = snake.segments[currentIndex - 1].getPos();
  const curPos = snake.segments[currentIndex].getPos();
  const nextPos = snake.segments[currentIndex + 1].getPos();
  if (prevPos.x > curPos.x && nextPos.y > curPos.y) {
    return 0;
  }
  if (curPos.x > nextPos.x && curPos.y > prevPos.y) {
    return 1;
  }
  if (curPos.x > nextPos.x && curPos.y < prevPos.y) {
    return 3;
  }
  if (prevPos.y < curPos.y && nextPos.x > curPos.x) {
    return 2;
  }
  if (prevPos.x < curPos.x && nextPos.y > curPos.y) {
    return 3;
  }
  if (prevPos.y > curPos.y && nextPos.x > curPos.x) {
    return 0;
  }
  if (prevPos.x > curPos.x && nextPos.y < curPos.y) {
    return 2;
  }
  if (prevPos.x < curPos.x && nextPos.y < curPos.y) {
    return 1;
  }
  if (curPos.x - prevPos.x == 1 || curPos.x - prevPos.x == -1) {
    return 4;
  }
  if (curPos.y - prevPos.y == 1 || curPos.y - prevPos.y == -1) {
    return 5;
  }
}

function setSnakeTailSpriteIndex(tailIndex) {
  const tailPos = snake.segments[tailIndex].getPos();
  const prevPos = snake.segments[tailIndex - 1].getPos();
  if (tailPos.y > prevPos.y) return 0;
  if (tailPos.x < prevPos.x) return 1;
  if (tailPos.x > prevPos.x) return 2;
  if (tailPos.y < prevPos.y) return 3;
}

function getBodyVec(direction) {
  if (direction == 0) return { x: 0, y: 1 };
  if (direction == 1) return { x: -1, y: 0 };
  if (direction == 2) return { x: 1, y: 0 };
  if (direction == 3) return { x: 0, y: -1 };
}

function drawSnakeDebug() {
  for (let s of snake.segments) {
    ctx.fillRect(s.getPos().x * snakeDim, s.getPos().y * snakeDim, snakeDim, snakeDim);
  }
}

function drawSnack() {
  const snackPos = snack.position;
  const snackDim = SpriteSheets.SnakeSheet.Bait.w;
  SnackSprite.getPos().x = snackPos.x * snackDim;
  SnackSprite.getPos().y = snackPos.y * snackDim;
  SnackSprite.draw();
}

function drawScore() {
  NumberSprite.setScale({x: 0.6, y: 0.6});
  NumberSprite.setAlpha(0.5);
  scoreToCanvas(score.getScore(), TextLocations.TopLeft, 0 , 0.5);
  scoreToCanvas(score.getSnackCount(), TextLocations.TopLeft, 1.2, 0.5);
  NumberSprite.setScale({x: 1, y: 1});
  NumberSprite.setAlpha(1);
}


// these two following functions are just to make the score more "pretty" since we cannot 
// access the scale on a instantiated sprite. and we presumably are not allowed to 
// change the code which was delivered for the task.

function scoreToCanvas(number, Elocation, yOffset = 0, scale = 1) {
  let initialPos;
  switch (Elocation) {
    case ETextLocations.TopLeft:
    default:
      initialPos = TextLocations.TopLeft;
      break;
    case ETextLocations.Attribution:
      initialPos = TextLocations.Attribution;
      break;
    case ETextLocations.Center:
      initialPos = TextLocations.Center;
      break;
    case ETextLocations.EndgameScore:
      initialPos = TextLocations.EndgameScore;
      break;
  }
  String(number)
    .split('')
    .map((num, i) => drawScoreNumbers(num, initialPos, i, yOffset, scale));
}

function drawScoreNumbers(number, initialPosition, xOffset, yOffset = 0, scale = 1) {
  NumberSprite.setIndex(number);
  const p = NumberSprite.getPos();
  p.x = initialPosition.x + SpriteSheets.SnakeSheet.Number.w * xOffset * scale;
  p.y = initialPosition.y + SpriteSheets.SnakeSheet.Number.h * yOffset * scale;
  NumberSprite.draw();
}