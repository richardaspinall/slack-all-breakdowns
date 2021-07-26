const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');

const verifySignature = require('../utils/verify-signature.js');

const modalController = require('./modal-controller');

const app = express();

// Verify signature in middleware for urlencoded or json requests
app.use(express.urlencoded({ extended: true, verify: verifySignature }));
app.use(express.json({ verify: verifySignature }));

// Verify challenge or send request to controller
app.use('/slack/events', (req, res) => {
  // Verify signature
  if (!req.valid) {
    return res.sendStatus(404);
  }

  modalController(req, res);
});
app.listen(3000, () => {
  console.log('Server has started');
});
