/**
 *  As we have decided not to use modules due to lack of support in Microsoft Edge, we utilize
 * the fact that a var can be referenced on the same line as it is initialized, and the fact that a var can be declared more than once.
 *
 * By doing this in each file, This gives us a pseudo-module to put our constructors on to keep the project organized.
 **/
var pong = pong || {};

/* General Key Listeners */
document.addEventListener('keyup', e => {
  if (e.key == 'r') reset();
  if (e.key == 'p') game.pauseGame();
});

/* Setup Game objects */
const ball = new pong.Ball(395, 295);
const game = new pong.Game();
const paddleLeft = new pong.Paddle(260, { left: 10 });
const paddleRight = new pong.Paddle(260, { left: 770 });
const keyboard = new pong.Keyboard();
const canvas = new pong.Canvas();
const AI = new pong.AIController(paddleRight);

/**
 * - keyboard setup -
 * the main difference in these action handles and the previous general key listeners lies in the fact
 * that these execute a callback function every game "tick." if and only if the registered key is still being pressed.
 */
keyboard.AddKeyHandle('w', paddleLeft.moveUp, paddleLeft);
keyboard.AddKeyHandle('s', paddleLeft.moveDown, paddleLeft);
keyboard.AddKeyHandle('ArrowUp', paddleRight.moveUp, paddleRight);
keyboard.AddKeyHandle('ArrowDown', paddleRight.moveDown, paddleRight);

/* main game loop */

// Set the updates per second and calculate how long one frame should take
// a higher UPS is more smooth, but also more demanding on your pc.
const UPDATES_PER_SECOND = 120;
const ONE_FRAME = 1000 / UPDATES_PER_SECOND;

// time calculations
let last = new Date().getTime();
let dt = 0;
let sinceLastFrame = last;

function loop() {
  // calculate if we should update
  let now = new Date().getTime();
  // dt accumulates the delta time divided by how long a frame should take, so when it is > 1 we know we should trigger an update.
  dt += (now - last) / ONE_FRAME;
  last = now;
  if (dt > 1) {
    dt--;
    // time resolution is MS, so we divide with 1000. this step is done to smooth out "jitter" so we can multiply change in state with the time since last update.
    // this is a great advantage, because multiplying our velocities with the time ensures our speed values are in pixel pr. second, so our game moves the same "speed" no matter how many Updates pr. Second we are running.
    // although do note that the collision detection may not work if the timestep makes the ball move past the paddles hit zones.
    let updateDelta = (now - sinceLastFrame) / 1000;
    sinceLastFrame = now;
    if (!game.pause) {
      updateGame(updateDelta);
      // we could pass some object state into the draw call here to remove the canvas class' coupling to the rest of the system.
      draw();
    } else {
      canvas.drawPauseScreen();
    }
  }
  window.requestAnimationFrame(loop);
}

// start the game loop
// could refactor this into a function allowing for the game to wait for the player to be ready before starting the first game.
window.requestAnimationFrame(loop);

/**
 * executes game loop update logic
 * @param {number} deltaTime
 */
function updateGame(deltaTime) {
  keyboard.executeCallbacks(deltaTime);
  ball.move(deltaTime);
  game.updateGame();
  AI.update(deltaTime);
}

/**
 * passes along the draw call to the canvas.
 */
function draw() {
  canvas.draw();
}

/**
 * resets the game
 */
function reset() {
  game.reset();
  ball.reset();
  paddleLeft.reset();
  paddleRight.reset();
}

// we put the instances on our pong object to have access to all instances across all files.
pong.leftPaddle = paddleLeft;
pong.rightPaddle = paddleRight;
pong.ball = ball;
pong.game = game;
pong.keyboard = keyboard;
pong.canvas = canvas;
