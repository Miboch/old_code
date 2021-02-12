'use strict';

/**
 * We create a closure over every state to initialize the states with some of their
 * one-time logic saved in the closure.
 */

///////////////
//// START ////
///////////////

const StartScreen = (function () {
  let x, y, dir;
  function setupScreen() {
    x = 7 + Math.floor(Math.random() * (GameBoardSize.Cols - 14));
    y = 7 + Math.floor(Math.random() * (GameBoardSize.Rows - 14));
    dir = Math.floor(Math.random() * 4);
  }

  function updateScreen() {
    clearCanvas();
    drawTiles();
    drawDecorativeSnake({ x, y }, dir);
    drawStartButton();
    textToCanvas('Game Created By', ETextLocations.Attribution);
    textToCanvas(Author, ETextLocations.Attribution, 1.5);
  }

  function unloadScreen() {
    snake.state.changeState(MoveSnake);
  }
  return new TState(setupScreen, updateScreen, unloadScreen, EStateNames.Screens.Start);
})();

///////////////////
//// GAME OVER ////
///////////////////

const GameOverScreen = (function () {
  function setupScreen() {
    snake.state.changeState(IdleSnake);
    EndGameSprite.getPos().x =
      (GameBoardSize.Cols * SpriteSheets.SnakeSheet.Head.w - SpriteSheets.SnakeSheet.GameOver.w) / 2;
    EndGameSprite.getPos().y =
      (GameBoardSize.Rows * SpriteSheets.SnakeSheet.Head.h - SpriteSheets.SnakeSheet.GameOver.h) / 2;
    NumberSprite.setAlpha(1);
    // this has to be done because we utilize the sprites to check if we
    // click in the right location on the canvas.
    RetryButtonSprite.getPos().x = EndGameClickRectRetry.x;
    RetryButtonSprite.getPos().y = EndGameClickRectRetry.y;
    HomeButtonSprite.getPos().x = EndGameClickRectHome.x;
    HomeButtonSprite.getPos().y = EndGameClickRectHome.y;
  }

  function updateScreen() {
    clearCanvas();
    drawTiles();
    drawSnake();
    drawEndInfo();
    numToCanvas(score.getScore(), ETextLocations.EndgameScore);
    RetryButtonSprite.draw();
  }

  function unloadScreen() {
    NumberSprite.setAlpha(0.55);
  }
  return new TState(setupScreen, updateScreen, unloadScreen, EStateNames.Screens.Over);
})();

///////////////
//// PAUSE ////
///////////////

const PauseGameScreen = (function () {
  let flavour;
  function setupScreen() {
    flavour = FlavourText[Math.floor(Math.random() * FlavourText.length)];
    pauseSprite.setIndex(0);
    snake.state.changeState(IdleSnake);
  }
  function updateScreen() {
    clearCanvas();
    drawTiles();
    drawDecorativeSnake({ x: 8, y: 16 }, 2);
    drawPauseSprite();
    textToCanvas(flavour, ETextLocations.Attribution);
    drawScore();
  }
  function unloadScreen() {
    pauseSprite.setIndex(1);
    clearCanvas();
    drawTiles();
    drawPauseSprite();
    snake.state.changeState(MoveSnake);
  }
  return new TState(setupScreen, updateScreen, unloadScreen, EStateNames.Screens.Paused);
})();

//////////////
//// PLAY ////
//////////////

const PlayGameScreen = (function () {
  function setupScreen() {
    Music.play();
    snack.state.changeState(ActiveSnack);
  }
  function updateScreen() {
    checkDefeat();
    clearCanvas();
    drawTiles();
    drawScore();
  }
  function unloadScreen() {
    Music.pause();
    snack.state.changeState(IdleSnack);
  }
  return new TState(setupScreen, updateScreen, unloadScreen, EStateNames.Screens.Playing);
})();

////////////////////
//// RESET GAME ////
////////////////////
const ResetGameState = (function () {
  // handle reset logic and transition state to start screen.
  function setupState() {
    Music.currentTime = 0;
    score.reset();
    Screens.changeState(StartScreen);
    snake.reset(DynamicParameters.initialLength);
  }
  function executeState() {}
  function unloadState() {
    snake.state.changeState(IdleSnake);
  }

  return new TState(setupState, executeState, unloadState, EStateNames.Game.Reset);
})();

const MoveSnake = (function () {
  let updates_per_step, counter;
  function setupState() {
    updates_per_step = UPDATE_RATE / SNAKE_TILES_PER_SECOND;
    counter = 0;
  }
  // rate-limit the snake so it doesnt just fly off the screen :)
  function executeState() {
    counter++;
    if (counter > updates_per_step) {
      snake.move();
      counter = 0;
    }
    drawSnake();
  }
  function unloadState() {
    counter = 0;
  }
  return new TState(setupState, executeState, unloadState, EStateNames.Snake.Move);
})();

const IdleSnake = (function () {
  function setupState() {}
  function executeState() {}
  function unloadState() {}
  return new TState(setupState, executeState, unloadState, EStateNames.Snake.Idle);
})();

const ActiveSnack = (function () {
  let counter, decayAmount;
  function setupState() {
    counter = 0;
    decayAmount = DynamicParameters.valueDecay;
  }

  function executeState() {
    counter++;
    // once pr. second.
    if(counter > UPDATE_RATE) {
      counter = 0;
      snack.decay(decayAmount);
    }
    drawSnack();
    snack.eaten(snake.segments[0].getPos());
  }

  function unloadState() {
    counter = 0;
  }
  return new TState(setupState, executeState, unloadState, EStateNames.Snack.Active);
})();

const IdleSnack = (function () {
  function setupState() {}
  function executeState() {
  }
  function unloadState() {}
  return new TState(setupState, executeState, unloadState, EStateNames.Snack.Idle);
})();

const Screens = new TStateManager(StartScreen);
