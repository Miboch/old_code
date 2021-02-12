/**
 * Mocks a service making http calls. Utilizes promise-wrapped localStorage instead of actual XHR-requests.
 * NOTICE: has external dependency on a function capable of performing MD5 hashing.
 */
class MockClient {
  storeKeys = {
    userList: 'pong-game-user-list',
    currentUser: 'pong-game-current-user',
    scoreList: 'pong-game-score-list'
  };

  /** gets a list of all users currently in storage.
   * @returns {[{username: string}]}
   */
  getUsers() {
    return new Promise((resolve, reject) => {
      let users = JSON.parse(localStorage.getItem(this.storeKeys.userList));
      resolve(users);
    });
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem(this.storeKeys.currentUser));
  }

  /**
   * add a user to the user store if the username is not already taken.
   */
  addUser(user) {
    user.salt = this.generateNewSalt();
    user.password = md5(user.password + user.salt);
    return new Promise((resolve, reject) => {
      this.getUsers().then(r => {
        if (!r) r = [];
        const nameTaken = r.some(u => u.username == user.username);
        if (nameTaken) {
          reject('That name is taken');
          return;
        }
        r.push(user);
        localStorage.setItem(this.storeKeys.userList, JSON.stringify(r));
        resolve('ok');
      });
    });
  }

  /**
   * Login a user.
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    return new Promise((resolve, reject) => {
      this.getUsers().then(users => {
        if (!users) {
          reject('An error has occurred');
          throw Error('An error has occurred');
        }

        let findUser = users.find(u => u.username === username);
        if (!findUser) reject('No such username or password');
        let comparePassword = md5(password + findUser.salt);
        if (findUser.password == comparePassword) resolve(findUser);
        else reject('No such username or password');
      });
    });
  }

  /**
   * logout a user by deleting the currentUser key from the local storage.
   * Additional logout logic such as redirects should be handled in the .then() call.
   */
  logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(this.storeKeys.currentUser);
      resolve();
    });
  }

  /**
   * Generates a salt for a user when adding them to the store so that passwords are harder to guess.
   */
  generateNewSalt() {
    const letters = [...'abcdefghijklmnopqrstuvwxyz'];
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, c => letters[(Math.random() * letters.length) | 0]);
  }

  getScoreList() {
    return JSON.parse(localStorage.getItem(this.storeKeys.scoreList));
  }

  addScore(score, user) {
    const scoreList = JSON.parse(localStorage.getItem(this.storeKeys.scoreList)) || [];
    let exists = scoreList.findIndex(c => {
      return c.name == user.username;
    });
    if (exists == -1) {
      scoreList.push({ score: score, name: user.username });
    } else {
      scoreList[exists].score = Math.max(score, scoreList[exists].score);
    }

    localStorage.setItem(this.storeKeys.scoreList, JSON.stringify(scoreList));
  }

  getUsersAndScores() {
    const scoreList = this.getScoreList();
    const users = JSON.parse(localStorage.getItem(this.storeKeys.userList));
    return scoreList.map(scoreItem => {
      return { score: scoreItem.score, name: scoreItem.name, favorite: users.find(u => (u.username == scoreItem.name)).favorite };
    });
  }
}
