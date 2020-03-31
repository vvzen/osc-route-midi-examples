/*
This simple example shows how to run listen
to OSC messages on localhost
*/

const osc = require("osc");
const OSC_RECEIVE_PORT = 12001;

const oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: OSC_RECEIVE_PORT,
    metadata: true
});

oscPort.open();

// For most Ports, send() should only be called after the "ready" event fires.
oscPort.on("ready", function () {

    console.log("OSC ready");

    oscPort.send({
        address: "/note/on",
        args: [
            {   
                type: "f",
                value: 440
            }
        ]
    });

    // Listen for incoming OSC messages.
    oscPort.on("message", function (oscMsg, timeTag, info) {
        console.log("An OSC message just arrived!", oscMsg);
        console.log("Remote info is: ", info);
    });
});


