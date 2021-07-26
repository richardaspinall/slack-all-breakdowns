const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');

const verifySignature = require('../utils/verify-signature.js');

const eventsController = require('./events-controller');

const app = express();

// Verify signature in middleware for urlencoded or json requests
app.use(express.urlencoded({ extended: true, verify: verifySignature }));
app.use(express.json({ verify: verifySignature }));

app.use('/slack/events', (req, res) => {
  // Verify signature
  if (!req.valid) {
    return res.sendStatus(404);
  }
  if (req.body.challenge) {
    return res.send({ challenge: req.body.challenge });
  }
  eventsController(req, res);
});

app.post('/', (req, res) => {
  res.sendStatus(200);
});
// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
