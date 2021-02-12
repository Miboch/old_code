class User {
  constructor(username, password, favorite = '', salt = '') {
    this.username = username;
    this.password = password;
    this.favorite = favorite;
    this.salt = salt;
  }
}
