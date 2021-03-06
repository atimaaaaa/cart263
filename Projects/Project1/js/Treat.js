class Treat {
  constructor(x, y) {
    //Position and size information
    this.x = x;
    this.y = y;
    this.size = 20;
  }
  //Handles the treat when interacting with a dog (it respawns)
  reposition() {
    this.x = random(width);
    this.y = random(height);
    //Constrain
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }
  display() {
    push();
    fill(goldColor.r, goldColor.g, goldColor.b);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
