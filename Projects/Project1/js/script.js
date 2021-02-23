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
let state = `introduction`;
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

//Store name variables in
let dogNamesData = undefined;
const DOGS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json`;
let displayName = "stranger...";
// // preload
// //
// // Description of preload() goes here.
function preload() {
  dogNamesData = loadJSON(`assets/data/dogNames.json`);
  dogTypeData = loadJSON(DOGS_DATA_URL);
}

// // setup()
// //
// // Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

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
  } else if (state === `introduction`) {
    introduction();
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

function introduction() {
  background(0);

  let randomDog = random(dogNamesData.dogs);
  displayName = random(randomDog.name);

  push();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);
  text(`Welcome ${displayName}`, width / 2, height / 2);
  pop();
}

function simulation() {
  noCursor();
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

function displayText(string) {
  push();
  textAlign(CENTER);
  textSize(32);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}

function keyPressed() {
  dog.keyPressed();
  dog.move();
}
