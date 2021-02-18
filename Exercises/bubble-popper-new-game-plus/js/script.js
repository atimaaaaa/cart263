/**************************************************
Bubble Popper++ activity
Atima Ng

Pop bubbles with your ring and index finder.
Bubble pop SFX: https://freesound.org/people/TheBuilder15/sounds/411462/
**************************************************/
//Store the handpose.
let video = undefined;
let handpose = undefined;

//Current set of predictions
let predictions = [];

//Stores Bubble
let bubble = undefined;

//Track current score
let currentScore = 0;
//Track mininum score until the game becomes harder.
let fasterSpeedScore = 5;

//Store high score
let bubbleData = {
  highScore: 0 // Set high schore at 0 by default
};
//Load pop sound effect
let popSFX = undefined;

//preLoad sounds sound effects.
function preload() {
  popSFX = loadSound(`assets/sounds/pop.wav`);
}

// setup()
//
// Description of setup() goes here.
//Store user's webcam
function setup() {
  createCanvas(600, 480);
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
  loadData();
}

//Load high score data.
function loadData() {
  //Load high score data
  let data = JSON.parse(localStorage.getItem(`pop-data`));
  if (data !== null) {
    //If there is data, replace it with current high score.
    bubbleData = data;
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  displayScore();
  //Check if there is a hand.
  if (predictions.length > 0) {
    let hand = predictions[0];
    //Fingers
    let index = hand.annotations.indexFinger;
    let ring = hand.annotations.ringFinger;
    //Array for tip and base fingers
    let tip = index[3];
    let base = index[0];
    let ringTip = ring[3];
    let ringBase = ring[0];
    //Tip position for the array for fingers
    let tipX = tip[0];
    let tipY = tip[1];
    let ringTipX = ringTip[0];
    let ringTipY = ringTip[1];
    //Base position for the array for fingers
    let baseX = base[0];
    let baseY = base[1];
    let ringBaseX = ringBase[0];
    let ringBaseY = ringBase[1];
    //Draws pin - index
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();
    //Draws pin - ring
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(ringBaseX, ringBaseY, ringTipX, ringTipY);
    pop();
    //Pin dot - index
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20, 20);
    pop();
    //Pin dot - ring
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(ringBaseX, ringBaseY, 20, 20);
    pop();
    //Checks overlap finger tips and bubble
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    let j = dist(ringTipX, ringTipY, bubble.x, bubble.y);
    if (d < bubble.size / 2 || j < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
      currentScore++;
      //Plays SFX to the overlap.
      if (!popSFX.isPlaying()) {
        popSFX.play();
      }
    }
  }
  bubbleMovement();
  displayBubble();
  scoreUpdate();
}

//Keeps track of the bubble movement
function bubbleMovement() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
  //Bubble resets when reaches the top
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }
  //Added difficulty: Faster bubbles.
  if (currentScore > fasterSpeedScore) {
    bubble.vy -= 0.05;
  }
}

//Displays the bubble in the simulation
function displayBubble() {
  push();
  fill(0, 13, 200);
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}

function scoreUpdate() {
  //New high score becomes the high score.
  if (currentScore > bubbleData.highScore) {
    bubbleData.highScore = currentScore;
    localStorage.setItem(`pop-data`, JSON.stringify(bubbleData));
  }
}
//Displays the player's score.
function displayScore() {
  //Display current score
  push();
  fill(255);
  textSize(500);
  textAlign(CENTER, CENTER);
  text(currentScore, width / 2, height / 2);
  pop();
  //Display high score
  push();
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(`High score: ${bubbleData.highScore}`, width / 2, height / 2 + 200);
  pop();
}
