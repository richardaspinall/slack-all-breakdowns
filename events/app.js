const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');

const eventsController = require('./events-controller');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/slack/events', eventsController);

app.post('/', (req, res) => {
  res.sendStatus(200);
});
// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
