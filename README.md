# osc-route-midi-examples ✏️🎶💻🎨

This repo hosts a series of tiny examples that will hopefully make your life easier if you're trying to do real time visuals or music, new media installation work, etc.. 👨🏻‍🎨👩🏻‍🎤

Hope this helps someone!


## processing\_read\_midi

*Processing*

Simple example that shows how to read MIDI from a file and how to send via OSC some of the attributes of each note while the file is being played.
It uses the sequence object from the `javax.sound.midi` package, and the oscp5 processing library.
OSC messages are sent on localhost using UDP as transport.
Original creedits for the code go to Hamoid, who wrote [this tiny wrapper class]([https://github.com/hamoid/Fun-Programming/tree/master/processing/ideas/2017/04/MidiViz]) to facilitate dealing with MIDI.

You also can run it in background via the `processing-java` binary.

`processing-java --sketch=/full/path/to/processing_read_midi --run`


You can also export the .pde sketch to an app if you want:

`processing-java --sketch=/full/path/to/processing_read_midi --output=/where/you/like --export`

## node\_receive\_osc

*NodeJS*

This example shows how to receive OSC messages in NodeJS using the `osc` nodejs package.


## node\_bridge\_osc

*NodeJS* *Threejs*

This slightly more complex example shows how to forward OSC messages from NodeJS to the browser using **WebSockets** using the `osc` and `ws` packages.

In this way you can have your browser side library (like *p5js* or *threejs*) creating graphics in the browser but reacting to inputs that could come from any application/framework that supports sending OSC messages via UDP (which means a lot of apps like Vezér or Ableton Live, etc.. or creative coding frameworks like Processing or Openframeworks).