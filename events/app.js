const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const slack = require('../slack_interface/index');

const eventsController = require('./controllers/events-controller');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/events', eventsController);

app.post('/', (req, res) => {
  res.sendStatus(200);
});
// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
