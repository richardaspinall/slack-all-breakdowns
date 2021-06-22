const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('../node_modules/express');
const viewsController = require('./controllers/views-controller');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing interactivity to controller
app.use('/slack/events', viewsController);

app.listen(3000, () => {
  console.log('Server has started');
});
