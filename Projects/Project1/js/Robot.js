class Robot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 50;
    this.speed = -0.01;
    this.maxSpeed = 10;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    //Increased speed
    this.vy += this.speed;
    //Constrain to a max speed
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    //Robot dog reset.
    if (this.y < 0) {
      this.x = random(width);
      this.y = height;
    }
  }

  display() {
    push();
    fill(0, 0, 255);
    noStroke();
    // rectMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
