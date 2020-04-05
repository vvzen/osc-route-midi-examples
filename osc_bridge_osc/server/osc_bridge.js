const WebSocket = require('ws');
const osc = require('osc');
const express = require('express');

// Used to communicate with the browser
const WS_PORT = 8080;
// Used to communicate with other OSC sending apps
const OSC_UDP_PORT = 8079;
// Used to serve content to the client
const EXPRESS_PORT = 8081;

// The WebSocket server will communicate on the browser
// by opening the same port and sending serialized JSON messages
// check client/src/main.js to see how the browser handles it
const wss = new WebSocket.Server({
    port: WS_PORT
});

// We only use ExpressJS to serve the static content to the client
// Be aware that this is not required for the WebSocket communication at all!
// but it's nice to have one app that does both
// you could start your own server with http-server or Python -m SimpleHTTPServer
const app = express();
const staticFolderName = 'client';
app.use(express.static(staticFolderName));
app.listen(EXPRESS_PORT);
console.log(`[ExpressJS] Serving ${staticFolderName} on ${EXPRESS_PORT}`)

// This will be initialised as soon as we a have a connection with the client
let websocket = null;

// We can choose multiple transports for OSC,
// but UDP it's quite common
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: OSC_UDP_PORT,
    metadata: true
});

// Open the socket.
udpPort.open();

udpPort.on('ready', function() {

    console.log(`[OSC Listener] listening on UDP ${OSC_UDP_PORT}`);

    // Set up the WebSocket connection to the browser
    wss.on('connection', ws => {

        websocket = ws;

        let handshake = {
            'note': 255,
            'velocity': 255,
            'stuff': 255
        };

        ws.send(JSON.stringify(handshake));

        ws.on('message', message => {
            console.log(`[WebSocket] Received message => ${message}`)
        });

        let message = {
            'note': 100,
            'velocity': 100,
            'stuff': 100
        }

        ws.send(JSON.stringify(message));
    });
});

// Callback for incoming OSC messages
udpPort.on('message', function(oscMsg, timeTag, info) {
    console.log('[OSC Listener] received message', oscMsg);
    // console.log('Remote info is: ', info);

    if (websocket != null){
        websocket.send(JSON.stringify(oscMsg));
    }

});