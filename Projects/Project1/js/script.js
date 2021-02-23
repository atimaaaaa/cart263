/**************************************************
Isle of the Dogs
Atima Ng

Here is a description of this template p5 project.
**************************************************/
"use strict";

//Setup initial variables
//
//
//Set the initial state
let state = `title`;
let introState = 0;
let gameStarted = false;

//Store high score
let treatsData = {
  highScore: 0 // Set high score at 0 by default
};

//Main dog
let dog;
//Robot dogs
let robots = [];
let numRobots = 2; //5?

//Typography
let titleColor = {
  r: 255,
  g: 0,
  b: 0
};
let subtitleColor = {
  r: 255,
  g: 204,
  b: 0
};

// // setup()
// //
// // Description of setup() goes here.

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Remove cursor
  noCursor();
  //Main dog class
  let x = windowWidth / 2;
  let y = windowHeight / 2;
  dog = new Dog(x, y);

  //Robot dog class
  for (let i = 0; i < numRobots; i++) {
    //Create new robot dog
    let x = random(width);
    let y = 0;
    let robot = new Robot(x, y);
    //Add robot dog to the array of robot dogs
    robots.push(robot);
  }
}

// // draw()
// //
// // Description of draw() goes here.
function draw() {
  background(100);
  //Call states
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    // win();
  } else if (state === `lose`) {
    // lose();
  }
}

function title() {
  background(0);
  displayTitle();
}

function displayTitle() {
  //犬ヶ島 - display title
  push();
  textAlign(CENTER, CENTER);
  fill(titleColor.r, titleColor.g, titleColor.b);
  textSize(400);
  text(`犬ヶ島`, width / 2, height / 2);
  pop();
  //Isle of the Dogs - display title
  push();
  textAlign(CENTER, CENTER);
  fill(subtitleColor.r, subtitleColor.g, subtitleColor.b);
  textSize(35);
  textFont(`Rockwell Std Condensed`);
  text(`(Isle of the Dogs)`, width / 2, height / 2 + 250);
  pop();
}

function displayText(string) {
  push();
  textAlign(CENTER);
  textSize(32);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}

function simulation() {
  //Display dog.
  dog.display();
  dog.wrap();
  //Display robot dogs
  for (let i = 0; i < robots.length; i++) {
    let robot = robots[i];
    robot.move();
    robot.display();
  }
}

function keyPressed() {
  dog.keyPressed();
  dog.move();
}
