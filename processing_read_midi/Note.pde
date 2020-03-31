class Note {
  int channel;
  int note;
  int velocity;
  int living;
  int dying;

  Note(int c, int n, int v) {
    channel = c;
    note = n;
    velocity = v;
  }
  void update() {
  }
  
  public String toString() { 
    return String.format("Note: %s, channel: %s, velocity: %s, living: %s, dying: %s", this.note, this.channel, this.velocity, this.living, this.dying);
  } 
}
