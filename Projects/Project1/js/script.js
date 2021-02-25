/**************************************************
Isle of Dogs
Atima Ng

Here is a description of this template p5 project.
**************************************************/
"use strict";

//Setup initial variables
//
//
//Set the initial state
let state = `simulation`;
let introState = 0;
let gameStarted = false;

//Store high score
let score = 0;
let data = {
  highScore: 0 // Set high score at 0 by default
};

//Objects
let dog;
let robots = [];
let numRobots = 5; //5?
let treats = [];
let numTreats = 3;

//Typography
//Red
let titleColor = {
  r: 255,
  g: 0,
  b: 0
};
//Gold
let subtitleColor = {
  r: 255,
  g: 204,
  b: 0
};
//white
let whiteColor = {
  r: 255,
  g: 255,
  b: 255
};

//Store name variables in
let dogNamesData = undefined;
let dogTypeData = undefined;
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
    let x = random(0, width);
    let y = random(0, height);
    let headWidth = random(50, 70);
    let headHeight = random(60, 80);
    let robot = new Robot(x, y, headWidth, headHeight);
    //Add robot dog to the array of robot dogs
    robots.push(robot);
  }
  //treats
  for (let i = 0; i < numTreats; i++) {
    //Create new robot dog
    let x = random(0, width);
    let y = random(0, height);
    let treat = new Treat(x, y);
    //Add robot dog to the array of robot dogs
    treats.push(treat);
  }
}

// // draw()
// //
// // Description of draw() goes here.
function draw() {
  background(255);
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
  //Isle of Dogs - display title
  push();
  textAlign(CENTER, CENTER);
  fill(subtitleColor.r, subtitleColor.g, subtitleColor.b);
  textSize(35);
  textFont(`Rockwell Std Condensed`);
  text(`(Isle of Dogs)`, width / 2, height / 2 + 250);
  pop();
}

function introduction() {
  background(0);

  let randomDog = random(dogNamesData.dogs);
  displayName = randomDog.name;

  push();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);
  text(`Welcome ${displayName}`, width / 2, height / 2);
  pop();
}

function simulation() {
  noCursor();
  displayScore();
  //Display dog.
  dog.display();
  //Display robot dogs
  for (let i = 0; i < robots.length; i++) {
    let robot = robots[i];
    robot.move();
    robot.display();
    dog.interactWith(robot);
  }
  //Display treats
  for (let i = 0; i < treats.length; i++) {
    let treat = treats[i];
    treat.display();
    dog.eat(treat);
  }
}

function displayScore() {
  displayText(`${score} points`);
}

function displayText(string) {
  push();
  fill(subtitleColor.r, subtitleColor.g, subtitleColor.b);
  textAlign(CENTER);
  textSize(100);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}

function keyPressed() {
  dog.keyPressed();
  dog.move();
}
