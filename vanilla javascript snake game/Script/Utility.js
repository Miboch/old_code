'use strict';
const txtLog = () => document.getElementById('txtLog');
/**
 * Implementation has been changed to utilize flex-layout to reverse the log direction.
 * @param {string} aText
 */
function addLogText(aText) {
  let d = document.createElement('div');
  d.innerHTML = aText;
  txtLog().appendChild(d);
}

function setMousePos(aEvent) {
  const bounds = cvs.getBoundingClientRect();
  mousePos.x = aEvent.clientX - bounds.left;
  mousePos.y = aEvent.clientY - bounds.top;
}

// convenience, so we don't have to type addLogText every time we wish to log.
const log = addLogText;