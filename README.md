# osc-route-midi-examples

## processing\_read\_midi

Simple example that shows how to read MIDI from a file and how to send via OSC some of the attributes of each note while the file is being played.
It uses the sequence object from the javax.sound.midi package, and the oscp5 processing library.
OSC messages are sent on localhost using UDP as transport.

You can run it via the processing-java binary.

processing-java --sketch=/full/path/to/processing_read_midi --run

You can also export the .pde sketch to an app:

processing-java --sketch=/full/path/to/processing_read_midi --output=/where/you/like --export

## node\_receive\_osc

This example shows how to receive osc messages in nodejs using UDP as transport and the osc package.
