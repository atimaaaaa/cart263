"use strict";

// An array of circles with a starting length
let circles = [];
let numCircles = 10;

// NEW! A timer to count the number of frames in the game state
let gameOverTimer = 0;
// NEW! A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The current state
let state = `game`; // game, win, lose

// setup() creates the canvas and our initial circles
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    let circle = createCircle();
    circles.push(circle);
  }
}

// createCircle() creates a simple circle object with position and size
function createCircle() {
  let circle = {
    x: random(0, width),
    y: random(0, height),
    size: random(50, 100)
  };
  return circle;
}

// draw() checks the state and runs the appropriate state function
function draw() {
  background(0);

  if (state === `title`) {
    title();
  } else if (state === `game`) {
    game();
  } else if (state === `win`) {
    win();
  } else if (state === `lose`) {
    lose();
  }
}

// title() displays the title
function title() {
  displayText(`title`);
}

// game() displays all the circles in the array
function game() {
  // NEW! Increase the timer's count by one frame
  gameOverTimer++;
  // NEW! Check if we have reached the end of our timer
  if (gameOverTimer >= gameLength) {
    // The game is over! So we should check the win/lose state
    gameOver();
  }

  // Display all the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    displayCircle(circle);
  }
}

// NEW! gameOver() checks whether the player has won or lost
// and sets the state appropriately
function gameOver() {
  // Check if there are 0 circles left...
  if (circles.length === 0) {
    // There are no circles left, so the user won!
    state = `win`;
  } else {
    // Otherwise they lost
    state = `lose`;
  }
}

// displayCircle() displays the circle provided as a parameter
function displayCircle(circle) {
  push();
  fill(255);
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

// mousePressed() switches from title to game or checks all circles to see if they were clicked
function mousePressed() {
  if (state === `title`) {
    state = `game`;
  } else if (state === `game`) {
    checkCircleClick();
  }
}

// checkCircleClick() checks if any circle was clicked and removes it if so
function checkCircleClick() {
  // Check all circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Check the distance to the circle from the mouse
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    // If the mouse was clicked inside the circle
    if (d < circle.size / 2) {
      // Remove the circle from the array with splice()
      circles.splice(i, 1);
      // Break out of the for-loop after removing the circle
      break;
    }
  }
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
