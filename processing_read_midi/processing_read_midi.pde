/* 
Most of this code is based on the original work of hamoid: shttps://github.com/hamoid/Fun-Programming
I've just renamed a bunch of things and added a format method to it.
In this example I'm just reading a MIDI file and sending OSC messages
containing information about each note played in real time.
*/


import netP5.*;
import oscP5.*;

import java.util.Collection;
import javax.sound.midi.*;

HamoidMidiPlayer midiPlayer;
OscP5 oscP5;
NetAddress remoteAddress;
int OSC_RECEIVE_PORT = 12000;
int OSC_SEND_PORT = 12001;
String MIDI_FILE_NAME = "pianocon.mid";

void setup() {
  
  // No real need to show the processing window
  surface.setVisible(false);
  
  oscP5 = new OscP5(this, OSC_RECEIVE_PORT);
  remoteAddress = new NetAddress("127.0.0.1", OSC_SEND_PORT);

  try {
    midiPlayer = new HamoidMidiPlayer();
    midiPlayer.load(dataPath(MIDI_FILE_NAME));
    midiPlayer.start();
  }
  catch(Exception e){
    println(e);
  }
  
  rectMode(CENTER);
  ellipseMode(CENTER);
}

void draw() {
  
  for (Note n : midiPlayer.getNotes()) {
    
    OscMessage noteMessage = new OscMessage("/note");
    noteMessage.add(int(n.note));
    noteMessage.add(n.channel);
    noteMessage.add(n.velocity);
    noteMessage.add(n.living);
    noteMessage.add(n.dying);
    oscP5.send(noteMessage, remoteAddress);
    //println(n);
  }

  midiPlayer.update();
}
