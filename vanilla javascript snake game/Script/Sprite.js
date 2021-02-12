"use strict";

function TSprite(aSheet, aSpriteInfo, aPos, aIndex = 0, aRow = 0) {
  const sheet = aSheet;
  const spi = aSpriteInfo;
  const pos = aPos;
  let spIndex = aIndex;
  const row = aRow;
  let round = 0;
  const scale = {x: 1, y: 1};

  if(spi.gap === undefined){
    spi.gap = 0;
  }
  if(spi.loop === undefined){
    spi.loop = 0;
  }
  if(spi.speed === undefined){
    spi.speed = 1;
  }
  if(spi.alpha === undefined){
    spi.alpha = 1;
  }

  this.draw = function () {
    const index = Math.floor(spIndex);
    const x = spi.x + ((spi.w + spi.gap) * index);
    const y = spi.y + (spi.h * row);
    const oldAlpha = ctx.globalAlpha;
    ctx.globalAlpha = spi.alpha;
    ctx.drawImage(sheet, x , y, spi.w, spi.h, pos.x, pos.y,  Math.floor(spi.w * scale.x), Math.floor(spi.h * scale.y));
    ctx.globalAlpha = oldAlpha;
    if ((round < spi.loop) || (spi.loop < 0)) {
      spIndex += spi.speed;
      if (spIndex >= spi.count) {
        spIndex = 0;
        if(spi.loop > 0) {
          round++;
        }
      }
    }
  };

  this.setIndex = function (aIndex) {
    round = 0;
    spIndex = aIndex;
  };

  this.getIndex = function(){
    return spIndex;
  };

  this.isDone = function () {
    return round >= spi.loop;
  };

  this.incIndex = function () {
    spIndex++;
    if (spIndex > spi.count) {
      spIndex = 0;
    }
  };

  this.setScale = function(aScale){
    scale.x = aScale.x;
    scale.y = aScale.y;
  };

  this.setVisible = function (aVisible) {
    if(aVisible) {
      spi.alpha = 1;
    }else{
      spi.alpha = 0;
    }
  };

  this.setAlpha = function (aAlpha){
    spi.alpha = aAlpha;
  };

  this.getSpriteInfo = function(){
    return spi;
  };

  this.getPos = function(){
    return pos;
  }

}
