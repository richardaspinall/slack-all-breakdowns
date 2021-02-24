const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const WebSocketClient = require('websocket').client;
const slack = require('../slack_interface/index');

const client = new WebSocketClient();

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');
  connection.on('error', function (error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function (message) {
    let messageObject = JSON.parse(message.utf8Data);

    console.log(messageObject);

    if (messageObject.envelope_id) {
      console.log(messageObject.envelope_id);
      connection.sendUTF(
        JSON.stringify({
          envelope_id: messageObject.envelope_id,
        })
      );
    }
    // if (message.type === 'utf8') {
    //   console.log("Received: '" + message.utf8Data + "'");
    // }
  });
});

(async () => {
  try {
    const res = await slack.web.connectionOpen();
    console.log(res.body);
    client.connect(res.body.url);
  } catch (err) {
    console.error(err);
  }
})();
