const express = require('express');
const slack = require('../../libs/slack_interface/index');
const views = require('../views/home.json');

const router = express.Router();

router.post('/', (req, res) => {
  // A challenge param is sent to this end point when enabling events
  if (req.body.challenge) {
    res.send({ challenge: req.body.challenge });
  } else {
    res.sendStatus(200);
  }
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
        slack.web.viewsPublish(req.body.event.user, views);
        break;
      default:
        console.log(`------------------\nEvent not handled:\n------------------`);
        console.log(req.body);
        console.log(`------------------`);
    }
  }
});

module.exports = router;
