'use strict';

// additional setup.
const cvs = document.getElementById('cvs');
const ctx = cvs.getContext('2d');
cvs.width = GameBoardSize.Cols * SpriteSheets.SnakeSheet.Head.w;
cvs.height = GameBoardSize.Rows * SpriteSheets.SnakeSheet.Head.h;

// game objects
const timer = new TTimer(UPDATE_RATE);
const score = new TScore();
const snake = new TSnake(DynamicParameters.initialLength);
const snack = new TSnack();

// setup events
document.addEventListener('contextmenu', (aEvent) => aEvent.preventDefault());
document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keyHandler);
registerEventsForDynamicProps();

timer.addStateManager(Screens);
timer.addStateManager(snake.state);
timer.addStateManager(snack.state);

// attribution.
document.getElementById('author').innerHTML = `${Author}`;

// all assets are loaded when this promise is fulfilled.
loadAssets().then(() => {
  timer.start();
});

function registerEventsForDynamicProps() {
  document.getElementById('snake_len').addEventListener('change', DynamicParameters.update);
  document.getElementById('snack_pts').addEventListener('change', DynamicParameters.update);
  document.getElementById('snack_decay').addEventListener('change', DynamicParameters.update);
  document.getElementById('grow_snake').addEventListener('click', () => snake.grow(1));
}
