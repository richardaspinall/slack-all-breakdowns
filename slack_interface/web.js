const request = require('superagent');
// Send API call to Slack with SuperAgent
function sendSlackRequest(url, payload) {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${process.env.BOTTOKEN}`,
  };
  request
    .post(url)
    .set(httpHeaders)
    .send(payload)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(payload);
        // console.log(res.body);
      }
    });
}

// Slack Web API methods
//
// Send a message
function chatPostMessage(channel, message) {
  sendSlackRequest('https://slack.com/api/chat.postMessage', {
    channel: channel,
    blocks: message,
  });
}

// Open a modal
function viewsOpen(trigger_id, view) {
  sendSlackRequest('https://slack.com/api/views.open', {
    trigger_id,
    view,
  });
}

// Add a view to the currently opened modal
function viewsPush(trigger_id, view) {
  sendSlackRequest('https://slack.com/api/views.push', {
    trigger_id,
    view,
  });
}

// Update a view
function viewsUpdate(view_id, view) {
  sendSlackRequest('https://slack.com/api/views.update', {
    view_id,
    view,
  });
}

module.exports = {
  chatPostMessage: chatPostMessage,
  viewsOpen: viewsOpen,
  viewsPush: viewsPush,
  viewsUpdate: viewsUpdate,
};
