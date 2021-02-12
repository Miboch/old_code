'use strict';
function clickHandler(event) {
  const rect = cvs.getBoundingClientRect();
  mousePos.x = Math.floor(event.clientX - rect.left);
  mousePos.y = Math.floor(event.clientY - rect.top);
  switch (Screens.currentState.stateName) {
    case EStateNames.Screens.Start:
      if (clickedSprite(playSprite)) {
        Click.play();
        Screens.changeState(PlayGameScreen);
      }
      break;
    case EStateNames.Screens.Paused:
      if (clickedSprite(pauseSprite)) {
        Click.play();
        Screens.changeState(PlayGameScreen);
      }
      break;
    case EStateNames.Screens.Over:
      if (clickedSprite(HomeButtonSprite)) {
        Click.play();
        Screens.changeState(ResetGameState);
      }
      if (clickedSprite(RetryButtonSprite)) {
        Click.play();
        Screens.changeState(ResetGameState);
      }
  }
}

/**
 * uses supplied code to calculate whether a mouse click event occurred ontop of a sprite.
 * @param {TSprite} sprite
 */
function clickedSprite(sprite) {
  let bounds = new TBoundsRectangle(sprite.getPos(), sprite.getSpriteInfo());
  return bounds.hitPos(mousePos);
}

function keyHandler(event) {
  if (matchKeys(event.code, EKeyMappings.Down)) {
    snake.turn(SnakeDirections.MAP.DOWN);
  }

  if (matchKeys(event.code, EKeyMappings.Up)) {
    snake.turn(SnakeDirections.MAP.UP);
  }

  if (matchKeys(event.code, EKeyMappings.Left)) {
    snake.turn(SnakeDirections.MAP.LEFT);
  }

  if (matchKeys(event.code, EKeyMappings.Right)) {
    snake.turn(SnakeDirections.MAP.RIGHT);
  }

  if (matchKeys(event.code, EKeyMappings.Pause)) {
    if (Screens.currentState.stateName == EStateNames.Screens.Playing) {
      Screens.changeState(PauseGameScreen);
    } else if (Screens.currentState.stateName == EStateNames.Screens.Paused) {
      Screens.changeState(PlayGameScreen);
    }
  }

  if (matchKeys(event.code, EKeyMappings.Reset)) {
    if (Screens.currentState.stateName != EStateNames.Screens.Start) {
      Screens.changeState(ResetGameState);
    }
  }
}

function matchKeys(eventKey, keys) {
  return keys.some((k) => k == eventKey);
}
