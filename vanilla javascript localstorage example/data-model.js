/**
 * A class that represents our posts.
 */
class Post {
  constructor(title, content, date = new Date()) {
    this.title = title;
    this.content = content;
    this.date = date;
  }

  /**
   * Takes the date object and returns a formatted date string.
   * example return value: 01 Feb 2020
   */
  get formattedDate() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${this.date.getDate()} ${months[this.date.getMonth()]} ${this.date.getFullYear()}`;
  }
}
