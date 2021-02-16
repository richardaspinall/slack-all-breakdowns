const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('../node_modules/express');

const viewController = require('./controllers/views-controller');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// App routes
app.use('/interactivity', viewController);

// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
