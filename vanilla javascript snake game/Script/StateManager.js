'use strict';

/**
 *
 * @param {TState} initialState
 */
function TStateManager(initialState) {
  this.currentState = initialState;
  let previousState;
  this.currentState.load();
  this.changeState = function (newState) {
    previousState = this.currentState;
    this.currentState = newState;
    previousState.unload();
    this.currentState.load();
  };
}

/**
 * Create a State which has a small bit of logic for loading and unloading state.
 * The executor function will not be called until the load has been performed.
 * @param {function} load
 * @param {function} executor
 * @param {function} unload
 */
function TState(load, executor, unload, stateName) {
  let ready = false;
  this.stateName = stateName;
  this.load = () => {
    load();
    ready = true;
  };
  this.executor = () => {
    if (ready) executor();
  };
  this.unload = () => {
    ready = false;
    unload();
  };
}
