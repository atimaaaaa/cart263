/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";
//Main dog
let dog;
//Robot dogs
let robots = [];
let numRobots = 3;

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
  background(0);
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
