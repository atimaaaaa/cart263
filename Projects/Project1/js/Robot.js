class Robot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = -0.01;
    this.maxSpeed = 2; //10
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
      r: 255,
      g: 204,
      b: 0
    };
    //Mouth
    this.mouthWidth = 35;
    this.mouthHeight = 10;
    this.colorMouth = {
      r: 0,
      g: 0,
      b: 0
    };
    //Ears
    this.earsSize = 20;
    this.earsWidth = 5;
    this.earsHeight = 8;

    this.colorEars = {
      r: 102,
      g: 102,
      b: 102
    };
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
    //Head
    push();
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
    rect(this.x + 25, this.y + 42, this.mouthWidth, this.mouthHeight);
    pop();
    //Ears
    push();
    fill(this.colorEars.r, this.colorEars.g, this.colorEars.b);
    noStroke();
    ellipseMode(CENTER);
    //Ear tips
    ellipse(this.x + 10, this.y - 10, this.earsSize); //Left ear
    ellipse(this.x + 40, this.y - 10, this.earsSize); //Right ear
    rect(this.x + 7, this.y - 5, this.earsWidth, this.earsHeight); //Left ear
    rect(this.x + 38, this.y - 5, this.earsWidth, this.earsHeight); //Right ear
    pop();
  }
}
