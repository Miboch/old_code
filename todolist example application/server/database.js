const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(':memory:');

function init() {
  db.serialize(() => {
    /* Create Tables */
    db.run('CREATE TABLE todos (id INTEGER NOT NULL PRIMARY KEY, title TEXT, description TEXT)');
    db.run('CREATE TABLE tasks (id INTEGER NOT NULL PRIMARY KEY, taskname TEXT, completed BOOLEAN, todo_id INTEGER, FOREIGN KEY (todo_id) REFERENCES todos)');

    /* todos */
    db.run(`INSERT INTO todos (title, description) VALUES ('Make Todo App', 'A list of tasks based on the project outline')`);
    db.run(`INSERT INTO todos (title, description) VALUES ('Modify Todo Data', 'A Test of features')`);

    /* Tasks */
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('This task is pre-completed', 1, 2)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Read the Readme.MD', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Read the Project Outline', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Glean over the API Doc', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Plan features', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Plan UX', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Create layout wireframes', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('choose and setup build environment for front-end framework', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('implement basic layout', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('implement api service', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('implement components', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('wire service and components together', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Bonus: Plan bonus features', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Implement Bonus Features', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Back-End Tasks: Issues', 0, 1)`);
    db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES ('Back-End Tasks: Expansion', 0, 1)`);
  });
}

/* **************** */
/* Promise Wrappers */
/* **************** */

function dbGet(query, param = []) {
  return new Promise((resolve, reject) => {
    db.get(query, param, (err, row) => {
      resolve(row);
      reject(err);
    });
  });
}

function dbEach(query, param = []) {
  let collectionResult = [];
  return new Promise((resolve, reject) => {
    db.each(
      query,
      param,
      (err, row) => {
        collectionResult.push(row);
      },
      (err, count) => {
        resolve(collectionResult);
        reject(err);
      }
    );
  });
}

function dbRun(query, param = []) {
  return new Promise((resolve, reject) => {
    db.run(query, param, err => {
      resolve(this);
      reject(err);
    });
  });
}

module.exports = {
  initialize: init,
  get: dbGet,
  each: dbEach,
  run: dbRun
};
