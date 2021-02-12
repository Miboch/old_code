const db = require('./database');
db.initialize();

// express
const cors = require('cors');
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3200;

app.use(parser.json({ extended: true }));
app.use(cors()); // remove in production.

// routes
require('./routes/tasks')(app);
require('./routes/todo')(app);

// listen for requests
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
