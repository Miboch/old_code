'use strict';
const ImgSheet = new Image();
const Wall = new Image();
const Tile = new Image();
const Letters = new Image();
const Music = new Audio();
const SnackSound = new Audio();
const Click = new Audio();
/**
 * Bundles asset loading into a promise, so we know all assets are ready before we start the game
 */
function loadAssets() {
  return new Promise((resolve, reject) => {
    let readyCount = 0;
    Music.addEventListener('canplaythrough', () => {
      isReady();
      Music.loop = true;
    });
    Music.src = AssetPaths.Sounds.Music;
    SnackSound.addEventListener('canplaythrough', () => isReady());
    SnackSound.src = AssetPaths.Sounds.Apple;
    Click.addEventListener('canplaythrough', () => isReady())
    Click.src = AssetPaths.Sounds.Click;

    ImgSheet.onload = () => isReady();
    Wall.onload = () => isReady();
    Tile.onload = () => isReady();
    Letters.onload = () => isReady();

    ImgSheet.src = AssetPaths.Images.Snake;
    Tile.src = AssetPaths.Images.Tile;
    Wall.src = AssetPaths.Images.Wall;
    Letters.src = AssetPaths.Images.Letters;
    function isReady() {
      readyCount++;
      if (readyCount == Object.keys(AssetPaths.Images).length + Object.keys(AssetPaths.Sounds).length) {
        resolve();
      }
    }
  });
}
