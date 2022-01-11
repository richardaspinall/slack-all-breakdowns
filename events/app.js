const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');

const slack = require('../libs/slack_interface/index');
const verifySignature = require('../utils/verify-signature.js');
const appHomeView = require('./home.json');

const app = express();

// Verify signature in middleware for urlencoded or json requests
app.use(express.urlencoded({ extended: true, verify: verifySignature }));
app.use(express.json({ verify: verifySignature }));

app.use('/slack/events', (req, res) => {
  // Verify signature
  if (!req.valid) {
    return res.sendStatus(404);
  }
  // A challenge param is sent to this endpoint when enabling events
  if (req.body.challenge) {
    return res.send({ challenge: req.body.challenge });
  }

  res.sendStatus(200);

  // Check body for event type and log relevant information, catch unhandled events
  if (req.body.event) {
    const event = req.body.event.type;
    switch (event) {
      case 'link_shared':
        console.log(req.body.event.links);
        break;
      case 'app_mention':
        console.log(req.body.event);
        break;
      case 'app_home_opened':
        console.log(req.body.event);
        slack.web.viewsPublish(req.body.event.user, appHomeView);
        break;
      case 'team_join':
        console.log(req.body.event);
        console.log(req.body.event.user.profile);
        break;
      default:
        console.log(`------------------\nEvent not handled:\n------------------`);
        console.log(req.body);
        console.log(`------------------`);
    }
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server has started');
});
