const express = require('express');
const path = require('path');
const slack = require('../../libs/slack_interface/index');

const router = express.Router();

const RESOURCE_URL = `${process.env.UNFURL_DOMAIN}/image123`;

router.post('/', async (req, res) => {
  res.sendStatus(200);

  const channel = req.body.event.channel;
  const ts = req.body.event.message_ts;

  // Call remote.add
  if (req.body.event.links[0].url === RESOURCE_URL) {
    try {
      const response = await slack.web.filesRemoteAdd(
        path.join(__dirname, '../files/slack.jpeg'),
        'Slack Logo',
        RESOURCE_URL,
        'ABC123456789'
      );

      if (response.body.ok) {
        console.log('OK Request');
        slack.web.chatUnfurl(ts, channel, {
          [RESOURCE_URL]: {
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
});

module.exports = router;
