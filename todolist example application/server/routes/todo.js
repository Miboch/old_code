const db = require('../database');
const utils = require('../server-utilities');
module.exports = app => {
  // Server Task 1: Modify to utilize a join instead of a nested database call.
  app.get('/api/todo/:todoId', (req, res) => {
    let query = req.params.todoId;
    db.get(`SELECT * FROM todos WHERE id = ?`, query).then(r => {
      if (!r) {
        utils.invalidId(res);
      } else {
        db.each('SELECT id, taskname, completed FROM tasks WHERE todo_id = ?', query).then(t => {
          r.tasks = t;
          res.send(r);
        });
      }
    });
  });

  app.get('/api/todo', (req, res) => {
    db.each('SELECT * FROM todos').then(r => res.send(r));
  });

  app.put('/api/todo/:todoId', (req, res) => {
    let body = req.body;
    let query = req.params.todoId;
    if (utils.validate(body, ['title', 'description'])) {
      db.run(`UPDATE todos SET title = ?, description = ? WHERE id = ?`, [body.title, body.description, query]).then(r => {
        utils.success(res);
      });
    } else utils.invalidObject(res);
  });

  app.post('/api/todo', (req, res) => {
    let body = req.body;
    if (utils.validate(body, ['title', 'description'])) {
      db.run(`INSERT INTO todos (description, title) VALUES(?,?)`, [body.description, body.title]).then(r => {
        utils.success(res);
      });
    } else utils.invalidObject(res);
  });

/* Server Task 2 - Delete all tasks that relate to the todo list that is being deleted. */
  app.delete('/api/todo/:todoId', (req, res) => {
    let query = req.params.todoId;
    db.run(`DELETE FROM todos WHERE id = ?`, query).then(r => {
      utils.success(res);
    });
  });
};
