const path = require('path');

// Super Agent reference: https://github.coventry.ac.uk/askaria/304CEM-LizoFile/blob/master/node_modules/superagent/docs/index.md#attaching-files
const request = require('superagent');

// Send API call to Slack with SuperAgent
function sendSlackRequest(url, payload, token) {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
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

function sendSlackFileRequest(url, file, channel_id, token) {
  const httpHeaders = {
    Authorization: `Bearer ${token}`,
  };
  request
    .post(url)
    .set(httpHeaders)
    .attach('file', file)
    .field('channels', channel_id)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(payload);
        // console.log(res.body);
      }
    });
}

async function sendAsyncSlackRequest(url, payload, token) {
  const httpHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
  };
  const res = await request.post(url).set(httpHeaders).send(payload);
  return await res;
}

// Slack Web API methods
//
// Send a message
function chatPostMessage(channel, message) {
  sendSlackRequest(
    'https://slack.com/api/chat.postMessage',
    {
      channel: channel,
      blocks: message,
    },
    process.env.BOTTOKEN
  );
}

// Open a modal
function viewsOpen(trigger_id, view) {
  sendSlackRequest(
    'https://slack.com/api/views.open',
    {
      trigger_id,
      view,
    },
    process.env.BOTTOKEN
  );
}

// Add a view to the currently opened modal
function viewsPush(trigger_id, view) {
  sendSlackRequest(
    'https://slack.com/api/views.push',
    {
      trigger_id,
      view,
    },
    process.env.BOTTOKEN
  );
}

// Update a view
function viewsUpdate(view_id, view) {
  sendSlackRequest(
    'https://slack.com/api/views.update',
    {
      view_id,
      view,
    },
    process.env.BOTTOKEN
  );
}

// Publish a view
function viewsPublish(user_id, view) {
  sendSlackRequest(
    'https://slack.com/api/views.publish',
    {
      user_id,
      view,
    },
    process.env.BOTTOKEN
  );
}

function filesUpload(channel_id, file) {
  sendSlackFileRequest(
    'https://slack.com/api/files.upload',
    file,
    channel_id,
    process.env.BOTTOKEN
  );
}

// Opens websocket
async function appsConnectionOpen() {
  const res = await sendAsyncSlackRequest(
    'https://slack.com/api/apps.connections.open',
    {},
    process.env.SOCKETTOKEN
  );
  if (!res.body.url) {
    console.log('Error: sending request to Slack API failed:');
    console.log('=============================');
    throw res.body;
  }
  return res.body.url;
}

module.exports = {
  chatPostMessage: chatPostMessage,
  viewsOpen: viewsOpen,
  viewsPush: viewsPush,
  viewsUpdate: viewsUpdate,
  viewsPublish: viewsPublish,
  filesUpload: filesUpload,
  appsConnectionOpen: appsConnectionOpen,
};
