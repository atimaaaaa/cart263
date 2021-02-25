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
    //Wrap
    this.borderLeft = 0;
    this.borderRight = width;
    this.borderTop = 0;
    this.borderBottom = height;
    //Head
    this.headWidth = 50;
    this.headHeight = 60;
    this.colorHead = {
      r: 204,
      g: 204,
      b: 204
    };
    //Eyes
    this.eyesSize = 10;
    this.colorEyes = {
      r: 153,
      g: 204,
      b: 255
    };
    //Mouth
    this.mouthHeight = 22;
    this.colorMouth = {
      r: 225,
      g: 225,
      b: 225
    };
    //Ears
    this.earsSize = 20;
    this.earsWidth = 5;
    this.earsHeight = 8;
    this.colorEars = {
      r: 240,
      g: 240,
      b: 240
    };
    //Nose
    this.noseSize = 10;
    this.colorNose = {
      r: 255,
      g: 204,
      b: 204
    };
  }
  //Dog movement
  move() {
    this.x += this.vx;
    this.y += this.vy;
    // //constrain
    // this.x = constrain(this.x, 0, width - this.headWidth);
    // this.y = constrain(this.y, 0, height - this.headHeight);
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
  }

  //Attempts to attack the robot  provided as a parameter
  //If interaction succeeds, the score will add up and the robot dog will restart from the bottom
  interactWith(robot) {
    //Calculate the distance bwteen the dog and robot
    let d = dist(this.x, this.y, robot.x, robot.y);
    //if they overlap...
    if (d < this.size / 2 + robot.headWidth / 2) {
      //Add score if dog and robot overlap
      score += 25;
      robot.restart();
    }
  }

  eat(treat) {
    let d = dist(this.x, this.y, treat.x, treat.y);
    if (d < this.size / 2 + treat.size / 2) {
      score += 25;
      treat.reposition();
    }
  }

  display() {
    push();
    //Head
    fill(this.colorHead.r, this.colorHead.g, this.colorHead.b);
    noStroke();
    rect(this.x, this.y, this.headWidth, this.headHeight);
    pop();
    //Eyes
    push();
    fill(this.colorEyes.r, this.colorEyes.g, this.colorEyes.b);
    noStroke();
    rectMode(CENTER);
    rect(this.x + 10, this.y + 25, this.eyesSize); //Left eye
    rect(this.x + 40, this.y + 25, this.eyesSize); //Right eye
    pop();
    //Mouth
    push();
    fill(this.colorMouth.r, this.colorMouth.g, this.colorMouth.b);
    noStroke();
    rectMode(CENTER);
    rect(this.x + 25, this.y + 50, this.headWidth, this.mouthHeight);
    pop();
    //Ears
    push();
    fill(this.colorEars.r, this.colorEars.g, this.colorEars.b);
    noStroke();
    ellipseMode(CENTER);
    //Ear tips
    ellipse(this.x + 10, this.y - 10, this.earsSize); //Left ear tips
    ellipse(this.x + 40, this.y - 10, this.earsSize); //Right ear tips
    rect(this.x + 7, this.y - 5, this.earsWidth, this.earsHeight); //Left ear
    rect(this.x + 38, this.y - 5, this.earsWidth, this.earsHeight); //Right ear
    pop();
    //Nose
    push();
    fill(this.colorNose.r, this.colorNose.g, this.colorNose.b);
    noStroke();
    rectMode(CENTER);
    rect(
      this.x + this.headWidth / 2,
      this.y + this.headHeight / 2 + 10,
      this.noseSize
    ); //Left eye

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
