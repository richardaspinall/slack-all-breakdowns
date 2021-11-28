const express = require('express');
const path = require('path');
const slack = require('../libs/slack_interface/index');

const router = express.Router();

const RESOURCE_URL = `${process.env.UNFURL_DOMAIN}/slack.jpg`;

router.post('/', async (req, res) => {
  res.sendStatus(200);

  const channel = req.body.event.channel;
  const ts = req.body.event.message_ts;
  // console.log(req.body);

  // Unfurls when the link is posted into the message input
  // As per: https://api.slack.com/methods/chat.unfurl#responses
  if (req.body.event.source == 'composer') {
    slack.web.chatUnfurl(ts, channel, {
      [RESOURCE_URL]: {
        blocks: [
          {
            type: 'file',
            external_id: 'ABC123456789',
            source: 'remote',
          },
        ],
        preview: {
          title: {
            type: 'plain_text',
            text: 'custom preview displayed here',
          },
          icon_url:
            'https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        },
      },
    });
  } else if (req.body.event.links[0].url === RESOURCE_URL) {
    try {
      const response = await slack.web.filesRemoteAdd(
        path.join(__dirname, '../unfurling/files/slack.jpg'),
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
