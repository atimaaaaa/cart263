/**************************************************
Bubble Popper activity
Atima Ng

Pop bubble swith your finder
**************************************************/
let video = undefined;
//Store the handpose.
let handpose = undefined;
//Current set of predictions
let predictions = [];
//Stores Bubble
let bubble = undefined;

// setup()
//
// Description of setup() goes here.
//Store user's webcam
function setup() {
  createCanvas(640, 480);
  //Access user's webcam.
  video = createCapture(VIDEO);
  video.hide();

  //load handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function() {
    console.log(`model loaded`);
  });

  //Listen for predictions
  handpose.on(`predict`, function(results) {
    console.log(results);
    predictions = results;
  });

  //Bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2
  };
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  //Check if there is a hand.
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];
    //Pin
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();
    //Draws red dot on the pin
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20, 20);
    pop();

    //Checks bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }
  //Bubble movement
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }
  //Display bubble
  push();
  fill(0, 13, 200);
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
