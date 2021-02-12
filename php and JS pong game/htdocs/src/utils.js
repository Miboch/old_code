const client = new MockClient();

function submitLogin() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  if (!username.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/g)) {
    alertToast('invalid username or password');
    return;
  }

  if (!password) {
    alertToast('You must provide a password');
  }

  client
    .login(username, password)
    .then(r => {
      localStorage.setItem(client.storeKeys.currentUser, JSON.stringify(r));
      alertToast('Welcome back, ' + r.username);
    })
    .catch(() => {
      alertToast('invalid username or password');
    });
}

function submitRegistration() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const favorite = document.querySelector('#favorite').value;
  if (!username.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/g)) {
    alertToast('invalid username or password');
    return;
  }
  if (!password) {
    alertToast('You must provide a password');
    return;
  }
  let user = new User(username, password, favorite);
  client
    .addUser(user)
    .then(r => {
      alertToast('successfully added user');
      client.login(user.username, user.password).then(r => {
        localStorage.setItem(client.storeKeys.currentUser, r);
      });
    })
    .catch(r => {
      alertToast('An error occurred when creating the user');
    });
}

function alertToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toastr');
  toast.innerHTML = `<p>${message}</p>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 5000);
}
