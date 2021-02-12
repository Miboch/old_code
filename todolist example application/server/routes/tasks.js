const db = require('../database');
const utils = require('../server-utilities');

module.exports = app => {
  app.get('/api/task', (request, response) => {
    db.each('SELECT * FROM tasks').then(r => response.send(r));
  });

  app.get('/api/task/:taskId', (req, res) => {
    let query = req.params.taskId;
    db.get(`SELECT * FROM tasks WHERE id = ?`, query).then(r => res.send(r));
  });

  app.put('/api/task/:taskId', (req, res) => {
    let query = req.params.taskId;
    let body = req.body;
    if (utils.validate(body, ['taskname', 'completed'])) {
      db.run(`UPDATE tasks SET taskname = ?, completed = ? WHERE id = ?`, [body.taskname, body.completed, query]).then(r => utils.success(res));
    } else utils.invalidObject(res);
  });

  app.put('/api/task/:taskId/complete', (req, res) => {
    let query = req.params.taskId;
    db.run('UPDATE tasks SET completed = 1 WHERE id = ?', query).then(utils.success(res));
  });

  app.post('/api/task', (req, res) => {
    let body = req.body;
    if (utils.validate(body, ['taskname', 'completed', 'todo_id'])) {
      db.run(`INSERT INTO tasks (taskname, completed, todo_id) VALUES(?, ?, ?)`, [body.taskname, body.completed, body.todo_id]).then(r => utils.success(res));
    } else utils.invalidObject(res);
  });

  app.delete('/api/task/:taskId', (req, res) => {
    let query = req.params.taskId;
    db.run('DELETE FROM tasks WHERE id = ?', query).then(r => utils.success(res));
  });
};
