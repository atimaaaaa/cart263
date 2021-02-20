class Dog {
  //constructor
  //
  //sets the dog class up
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.vx = 2;
    this.vy = 2;
    this.speed = 60;
    this.growSpeed = 0.25;
    this.borderLeft = 0;
    this.borderRight = width;
    this.borderTop = 0;
    this.borderBottom = height;
  }
  //Dog movement
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  //Check interraction with robot.
  checkTouch(robot) {
    let d = dist(this.x, this.y, robot.x, robot.y);
    if (d < this.size / 2 + robot.size / 2) {
      this.size += this.growSpeed;
    }
  }

  //Wraps the dog to the canvas.
  wrap() {
    if (this.x >= this.borderRight) {
      this.x = this.borderRight;
    } else if (this.x <= this.borderLeft) {
      this.x = this.borderLeft;
    }
    if (this.y >= this.borderBottom) {
      this.y = this.borderBottom;
    } else if (this.y <= this.borderTop) {
      this.y = this.borderTop;
    }
  }

  display() {
    push();
    fill(255, 0, 0);
    noStroke();
    rectMode(RADIUS);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }

  keyPressed() {
    //Horizontal movement
    if (keyCode === LEFT_ARROW) {
      this.vx = -this.speed;
    } else if (keyCode === RIGHT_ARROW) {
      this.vx = this.speed;
    }
    // No movement if left or right arrow are pressed.
    else {
      this.vx = 0;
    }
    //Vertical movement
    if (keyCode === UP_ARROW) {
      this.vy = -this.speed;
    } else if (keyCode === DOWN_ARROW) {
      this.vy = this.speed;
    }
    // No movement if up or bottom arrow are pressed.
    else {
      this.vy = 0;
    }
  }
}
