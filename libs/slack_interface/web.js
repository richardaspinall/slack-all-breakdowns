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
        console.log(payload);
        console.log(res.body);
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
    process.env.BOT_TOKEN
  );
}

// Send an ephemeral message
function chatPostEphemeral(channel, message, user) {
  sendSlackRequest(
    'https://slack.com/api/chat.postEphemeral',
    {
      channel: channel,
      blocks: message,
      user: user,
    },
    process.env.BOT_TOKEN
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
    process.env.BOT_TOKEN
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
    process.env.BOT_TOKEN
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
    process.env.BOT_TOKEN
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
    process.env.BOT_TOKEN
  );
}

function filesUpload(channel_id, file) {
  const httpHeaders = {
    Authorization: `Bearer ${process.env.BOT_TOKEN}`,
  };
  request
    .post('https://slack.com/api/files.upload')
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

async function filesRemoteAdd(preview_image, title, external_url, external_id) {
  const httpHeaders = {
    Authorization: `Bearer ${process.env.BOT_TOKEN}`,
  };
  const res = await request
    .post('https://slack.com/api/files.remote.add')
    .set(httpHeaders)
    .attach('preview_image', preview_image)
    .field('title', title)
    .field('external_url', external_url)
    .field('external_id', external_id);

  return await res;
}

function chatUnfurl(ts, channel, unfurls) {
  console.log(unfurls);
  sendSlackRequest(
    'https://slack.com/api/chat.unfurl',
    {
      ts,
      channel,
      unfurls,
    },
    process.env.BOT_TOKEN
  );
}

// Opens websocket
async function appsConnectionOpen() {
  const res = await sendAsyncSlackRequest('https://slack.com/api/apps.connections.open', {}, process.env.SOCKET_TOKEN);
  if (!res.body.url) {
    console.log('Error: sending request to Slack API failed:');
    console.log('=============================');
    throw res.body;
  }
  return res.body.url;
}

module.exports = {
  chatPostMessage: chatPostMessage,
  chatPostEphemeral: chatPostEphemeral,
  viewsOpen: viewsOpen,
  viewsPush: viewsPush,
  viewsUpdate: viewsUpdate,
  viewsPublish: viewsPublish,
  filesUpload: filesUpload,
  filesRemoteAdd: filesRemoteAdd,
  chatUnfurl: chatUnfurl,
  appsConnectionOpen: appsConnectionOpen,
};
