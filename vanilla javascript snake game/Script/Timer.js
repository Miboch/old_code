'use strict';
/**
 * Creates a Timer, which utilizes the requestAnimationFrame native method to create a loop which will
 * execute an update action every updatesPerSecond seconds.
 *
 * Each timer should be utilized by first being instantiated. Timing actions should then be added
 * via the addEntity method.
 * @param {Number} updatesPerSecond
 */
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
  this.addStateManager = addStateManager;
  this.start = start;
  this.stop = stop;

  function start() {
    if (!this.started) {
      log(`Timer has been started: (${this.UPS} UPS)`);
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
        updateAllEntities.bind(this)();
      }
      window.requestAnimationFrame(tick.bind(this));
    }
  }

  /**
   * Add an update entity to the timer.
   * The timer will execute every updateFunction passed into it via this method every "update cycle."
   * while attempting to bind the update function to the "this" scope of the first parameter "entity."
   *
   * If you do not need to bind the updating function to a specific scope scope,
   * simply pass in null for the first parameter.
   * @param {TStateManager} state
   */
  function addStateManager(stateManager) {
    this.entities.push({
      callback: () => stateManager.currentState.executor(),
    });
  }

  function updateAllEntities() {
    for (let e of this.entities) {
      e.callback();
    }
  }
}
