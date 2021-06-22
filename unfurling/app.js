const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');

const unfurlingController = require('./controllers/unfurling-controller');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/slack/events', unfurlingController);

app.post('/', (req, res) => {
  res.sendStatus(200);
});
// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
