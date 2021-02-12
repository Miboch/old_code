/**
 * Contains functions which are called depending on the page we are visiting
 */

// anonymous self-executing function to start the on-page load dispatch.
const currentUser = client.getLoggedInUser();
(() => {
  let location = getPart(window.location.href);
  location = location.substring(0, location.indexOf('.'));
  switch (location) {
    case 'scores':
      onScoresLoaded();
      break;
    case 'register':
      onRegisterLoaded();
      break;
    case 'login':
      onLoginLoaded();
      break;
    case 'play':
      onPlayLoaded();
  }
})();

function getPart(url) {
  return url.match(/\/[a-zA-Z]+\.php$/g)[0].substring(1);
}

function onPlayLoaded() {
  if (!currentUser) {
    createModal();
  }
}

function onLoginLoaded() {
  if (currentUser) {
    const box = document.querySelector('.form-box');
    box.innerHTML = '';
    const message = document.createElement('div');
    message.innerHTML = `Welcome back, ${currentUser.username}<br> <button onclick="logout()">logout</button>`;
    box.appendChild(message);
  }
}

function onRegisterLoaded() {
  if (currentUser) {
    const box = document.querySelector('.form-box');
    box.innerHTML = '';
    const message = document.createElement('div');
    message.innerHTML = `Welcome back, ${currentUser.username}<br> <button onclick="logout()">logout</button>`;
    box.appendChild(message);
  }
}

function onScoresLoaded() {
  let scores = client.getUsersAndScores();
  scores.sort((a, b) => b.score - a.score);

  const target = document.querySelector('#score-target');
  scores.forEach(score => {
    target.appendChild(createScoreLine(score));
  });
}

/**
 * creates a div for every score it recieves
 * @param {*} score
 */
function createScoreLine(score) {
  const outer = document.createElement('div');
  const name = document.createElement('div');
  const scored = document.createElement('div');
  const liked = document.createElement('div');

  name.innerHTML = `<p>${score.name}</p>`;
  scored.innerHTML = `<p>${score.score}</p>`;
  liked.innerHTML = `<p>${score.favorite}</p>`;
  outer.appendChild(name)
  outer.appendChild(scored)
  outer.appendChild(liked)
  return outer;
}

function createModal() {
  const backdrop = document.createElement('div');
  const modal = document.createElement('div');
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  backdrop.classList.add('backdrop');
  modal.classList.add('modal');

  modal.innerHTML = `
    <h1>You must log in to play</h1>
    <p>
    <a href="/login.php">Go to login</a> or <a href="/register.php">register a new account</a>
    </p>
  `;
}

function logout() {
  client.logout().then(r => {
    window.location.href = window.location.origin;
  });
}
