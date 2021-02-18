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
//Track current score
let currentScore = 0;
//Store high score
let gameData = {
  highScore: 0 // Set high schore at 0 by default
};

// setup()
//
// Description of setup() goes here.
//Store user's webcam
function setup() {
  createCanvas(1000, 680);
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
  // loadData();
  let data = JSON.parse(localStorage.getItem(`game-data`));
  if (data !== null) {
    //If there is data, replace it with current high score.
    gameData = data;
  }
}

// //Load high score data.
// function loadData() {
//   //Load high score data
//   let data = JSON.parse(localStorage.getItem(`game-data`));
//   if (data !== null) {
//     //If there is data, replace it with current high score.
//     gameData = data;
//   }
// }

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  displayScore();
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
      currentScore++;
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
  //If score defeatsn high score
  if (currentScore > gameData.highScore) {
    gameData.highScore = currentScore;
    localStorage.setItem(`game-data`, JSON.stringify(gameData));
  }
}

//Displays the player's score.
function displayScore() {
  push();
  fill(255);
  textSize(500);
  textAlign(CENTER, CENTER);
  text(`${currentScore}`, width / 2, height / 2);
  pop();

  push();
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(`High score: ${gameData.highscore}`, width / 2, height / 2 + 200);
  pop();
}
