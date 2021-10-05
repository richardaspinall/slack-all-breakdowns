const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const slack = require('../libs/slack_interface/index');

// WebSocket package for websockets support
const WebSocket = require('websocket').client;

// Create a WebSocket client
const client = new WebSocket();

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

  // Handle events and interactivity down the socket
  connection.on('message', function (message) {
    const socketMessage = JSON.parse(message.utf8Data);

    // Send back envelope_id as acknowledgment
    if (socketMessage.envelope_id) {
      connection.send(
        JSON.stringify({
          envelope_id: socketMessage.envelope_id,
        })
      );
      // Log message from the websocket
      console.log(socketMessage);
      /*
        DO SOME COOL STUFF OFF THE BACK OF THE MESSAGE
      */
    } else {
      // Hello from Slack – No need to respond
      console.log(socketMessage);
    }
  });
});

// Connection to Slack

(async () => {
  try {
    const webSocketURL = await slack.web.rtmConnect();
    client.connect(webSocketURL);
    console.log(webSocketURL);
  } catch (err) {
    console.error(err);
  }
})();
