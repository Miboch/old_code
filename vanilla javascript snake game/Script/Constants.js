'use strict';
const GameBoardSize = { Rows: 20, Cols: 25 };
const SpriteSheets = {
  SnakeSheet: {
    Head: { x: 0, y: 0, w: 38, h: 38, count: 4 },
    Body: { x: 0, y: 38, w: 38, h: 38, count: 6 },
    Tail: { x: 0, y: 76, w: 38, h: 38, count: 4 },
    Bait: { x: 0, y: 114, w: 38, h: 38, count: 1 },
    Play: { x: 0, y: 155, w: 202, h: 202, count: 10, speed: 0.4, loop: -1 },
    Retry: { x: 614, y: 995, w: 169, h: 167, count: 1 },
    Resume: { x: 0, y: 357, w: 202, h: 202, count: 2 },
    Home: { x: 0, y: 357, w: 202, h: 202, count: 1 },
    Number: { x: 0, y: 560, w: 81, h: 87, count: 10 },
    GameOver: { x: 0, y: 647, w: 856, h: 580, count: 1 },
  },
  Letters: { x: 0, y: 0, w: 38, h: 38, count: 26, gap: 1 },
  Wall: { x: 0, y: 0, w: 38, h: 38, count: 1 },
  Tile: { x: 0, y: 0, w: 38, h: 38, count: 1, alpha: 0.4 },
};

const FlavourText = ['Crunchy Apples', 'Selppa sevol ekans', 'Thanks for playing', 'Delicious', 'om nom nom'];

// these coordinate was just found by trial and error since no coordinate for the "house" icon
// inside the end-game sprite was supplied. the "Home" information in the Atlas points to
// the same information as the Resume value.
//
// Note this value isn't solely based on the atlas, but also has baked in the canvas offset
// from drawing the GameOver sprite in the centre of the screen.
const EndGameClickRectHome = { x: 112, y: 438 };
const EndGameClickRectRetry = { x: 661, y: 438 };

const ETextLocations = {
  TopLeft: '[Loc] Top-Left',
  Center: '[Loc] Center',
  Attribution: '[Loc] Attribute',
  EndgameScore: '[Loc] End Game Score',
};

const EStateNames = {
  Screens: {
    Start: '[ScreenState] Start',
    Playing: '[ScreenState] Playing',
    Paused: '[ScreenState] Paused',
    Over: '[ScreenState] Game Over',
    Wall: '[ScreenState] Wall Edit',
  },
  Snake: {
    Move: '[Snake] Moving',
    Idle: '[Snake] Sit Still',
  },
  Game: {
    Reset: '[Game] Reset Game',
  },
  Snack: {
    Active: '[Snack] Active',
    Idle: '[Snack] Idle',
  },
};

const DynamicParameters = {
  initialLength: 3,
  pickupValue: 12,
  valueDecay: 2,
  update: function () {
    DynamicParameters.initialLength = Number(document.getElementById('snake_len').value);
    DynamicParameters.pickupValue = Number(document.getElementById('snack_pts').value);
    DynamicParameters.valueDecay = Number(document.getElementById('snack_decay').value);
  },
};

/**
 * We do not have to care about the initial length of the snake as the tail will just
 * remain immobile until it is at proper length.
 */
const InitialSnakeParameters = {
  direction: 0,
  position: { x: Math.floor(GameBoardSize.Cols / 2), y: GameBoardSize.Rows - 3 },
};

const EKeyMappings = {
  Pause: ['Space'],
  Reset: ['KeyR'],
  Up: ['ArrowUp', 'KeyW'],
  Down: ['ArrowDown', 'KeyS'],
  Left: ['ArrowLeft', 'KeyA'],
  Right: ['ArrowRight', 'KeyD'],
};

// bit of "magic numbers" going on here. The 19 is half the width of our letter font.
// this is due to letters being drawn from top-left,
// so we have to move the first position half a letter width to get them centered.
const TextLocations = {
  TopLeft: { x: 0, y: 0 },
  Center: {
    x: (GameBoardSize.Cols * SpriteSheets.SnakeSheet.Head.w) / 2 - 19,
    y: (GameBoardSize.Rows * SpriteSheets.SnakeSheet.Head.h) / 2 - 19,
  },
  Attribution: {
    x: (GameBoardSize.Cols * SpriteSheets.SnakeSheet.Head.w) / 2 - 19,
    y: (GameBoardSize.Rows - 5) * SpriteSheets.SnakeSheet.Head.h - 19,
  },
  EndgameScore: {
    x: 550,
    y: 300,
  },
};

const mousePos = new TPosition(0, 0);
const AssetPaths = {
  Images: {
    Snake: 'SpriteSheet_Snake.png',
    Wall: 'wall.png',
    Tile: 'tile.png',
    Letters: 'LetterSprites.png',
  },
  Sounds: {
    Apple: 'chew_apple.mp3',
    Music: 'music.mp3',
    Click: 'click.mp3',
  },
};

const InitialSnakeLocation = {
  x: 4,
  y: GameBoardSize.Rows - 4,
};

const SnakeDirections = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  MAP: {
    UP: '[Snake] Move Up',
    DOWN: '[Snake] Move Down',
    LEFT: '[Snake] Move Left',
    RIGHT: '[Snake] Move Right',
  },
};

const UPDATE_RATE = 60;
const SNAKE_TILES_PER_SECOND = 10;

const Author = 'MC';
