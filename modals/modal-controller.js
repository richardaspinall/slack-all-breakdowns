const express = require('express');
const slack = require('../libs/slack_interface/index');
const modalViews = require('./views');

const router = express.Router();

function logger(payload, view) {
  console.log(`-----------${view} PAYLOAD INCOMING----------`);
  console.log(payload);
  console.log(`-----------PAYLOAD END----------`);
}

router.post('/', (req, res) => {
  const payload = JSON.parse(req.body.payload);
  const interactionType = payload.type;
  const triggerId = payload.trigger_id;

  switch (interactionType) {
    case 'shortcut':
      res.sendStatus(200);
      if (modalViews.view1) {
        slack.web.viewsOpen(triggerId, modalViews.view1);
      } else {
        slack.web.viewsOpen(triggerId, modalViews.defaultView);
      }
      break;
    case 'block_actions':
      res.sendStatus(200);
      if (payload.view.callback_id === 'view1') {
        logger(payload, 'view1');
        // Add new view to stack either through `viewsPush` or `viewsUpdate`:
        slack.web.viewsPush(triggerId, modalViews.view2);
        // slack.web.viewsUpdate(payload.view.id, modalViews.view2);
      } else if (payload.view.callback_id === 'view2') {
        logger(payload, 'view2');

        // Add new view to stack either through `viewsPush` or `viewsUpdate`:
        slack.web.viewsPush(triggerId, modalViews.view3);
        // slack.web.viewsUpdate(payload.view.id, modalViews.view3);
      }

      break;
    case 'view_submission':
      if (modalViews.submissionView) {
        logger(payload, 'submission');

        if (payload.view.callback_id === 'submissionView') {
          res.send({
            response_action: 'clear',
          });
        } else {
          res.send({
            response_action: 'update',
            view: modalViews.submissionView,
          });
        }
      } else {
        res.send({
          response_action: 'clear',
        });
      }
      break;
  }
});

// Manually update a view
router.post('/update', (req, res) => {
  res.sendStatus(200);
  slack.web.viewsUpdate('V01D07HF7BP', modalViews.view2);
});

router.post('/externalsource', (req, res) => {
  res.json(modalViews.externalView);
});

module.exports = router;
