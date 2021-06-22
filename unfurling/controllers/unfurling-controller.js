const express = require('express');
const path = require('path');

const slack = require('../../libs/slack_interface/index');

const router = express.Router();

const UNFURL_DOMAIN = `${process.env.UNFURL_DOMAIN}/image123`;

router.post('/', async (req, res) => {
  // A challenge param is sent to this end point when enabling events
  if (req.body.challenge) {
    res.send({ challenge: req.body.challenge });
  } else {
    res.sendStatus(200);
    console.log(req.body.event.links);

    const channel = req.body.event.channel;
    const ts = req.body.event.message_ts;

    // Call remote.add
    if (req.body.event.links[0].url === UNFURL_DOMAIN) {
      try {
        const response = await slack.web.filesRemoteAdd(
          path.join(__dirname, '../files/slack.jpeg'),
          'Slack Logo',
          UNFURL_DOMAIN,
          'ABC123456789'
        );
        console.log(response.body);
        if (response.body.ok) {
          console.log('OK Request');
          slack.web.chatUnfurl(ts, channel, {
            [UNFURL_DOMAIN]: {
              blocks: [
                {
                  type: 'file',
                  external_id: 'ABC123456789',
                  source: 'remote',
                },
              ],
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
});

module.exports = router;
