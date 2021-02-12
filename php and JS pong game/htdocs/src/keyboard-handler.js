var pong = pong || {};

/**
 * This class allows registering callbacks to be executed whenever a key is depressed.
 */
class KeyboardHandler {
  /**
   * initialize state and bind listeners.
   */
  constructor() {
    this.keySet = {};
    this.callList = [];
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  /**
   * sets the event.key to true in our keymap when a key is pressed
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    this.keySet[event.key] = true;
  }

  /**
   * sets the event.key to false in our keymap when a key is pressed
   * @param {KeyboardEvent} event
   */
  onKeyUp(event) {
    this.keySet[event.key] = false;
  }

  /**
   * Executes all callbacks registered to a currently depressed key
   */
  executeCallbacks(deltaTime) {
    // first we get a list of all keys that are currently pressed.
    let pressedKeys = Object.keys(this.keySet).filter(f => this.keySet[f]);
    // for every key that is pressed, we must get every function registered to that key and then execute the callback associated with that key.
    pressedKeys.forEach(key => {
      this.callList
        .filter(f => f.key == key)
        .forEach(callable => {
          callable.callback(deltaTime);
        });
    });
  }

  /**
   * Adds a callback function to be executed every tick. Optionally include a binding.
   * @param {string} key
   * @param {function} callback
   * @param {object} binding
   */
  AddKeyHandle(key, callback, binding = this) {
    this.callList.push({
      key: key,
      callback: callback.bind(binding) //may need to change the scope of "this" in the callback, so we pass along a binding as well.
    });
  }
}

pong.Keyboard = KeyboardHandler;
