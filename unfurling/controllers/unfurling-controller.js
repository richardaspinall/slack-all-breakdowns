const express = require('express');
const path = require('path');

const slack = require('../../libs/slack_interface/index');

const router = express.Router();

router.post('/', (req, res) => {
  // A challenge param is sent to this end point when enabling events
  if (req.body.challenge) {
    res.send({ challenge: req.body.challenge });
  } else {
    res.sendStatus(200);
    console.log(req.body);
    // Call remote.add
    slack.web.filesUpload('C01V7NZK58B', path.join(__dirname, '../files/slack.jpeg'));
    // Call chat.unfurl
  }
});

module.exports = router;
