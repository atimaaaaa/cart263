/**************************************************
Where's Sausage Dog Nww game Plus Activity
Atima Ng

Find the sausage dog!
**************************************************/

// setup()
//
// Description of setup() goes here.
"use strict";

//Current initial state
let state = `simulation`;

//Set initial timer
let timer = 15; // 15 seconds

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage); // Puts animalImage into the array. push adds to the array
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages); //Loads from animalImages array
    let animal = new Animal(x, y, animalImage);
    animals.push(animal); // Loads 100 images at random position
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(0, 255, 0);

  if (state === `title`) {
    title();
  }
  if (state === `simulation`) {
    simulation();
  }
  if (state === `win`) {
    win();
  }
  if (state === `lose`) {
    lose();
  }
}

function title() {
  displayText(`Save Sausage dog!
    Press anywhere to continue.`);
}

function simulation() {
  updateAll();
  displayTimer();
  if (timer === 0) {
    state = `lose`;
  }
}

function updateAll() {
  updateAnimals();
  sausageDog.update();
}
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(); //update is referencing the Animals class
  }
}

function win() {
  displayText(`WEINER :-)
    Are you able to find him again?`);
}

function lose() {
  displayText(`LOSER :(
    Try to find him again!`);
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state === `simulation`) {
    sausageDog.mousePressed();
    set;
    state = `win`;
  }
}

function displayTimer() {
  push();
  textSize(32);
  fill(0);
  text(`${timer} seconds left`, width - 400, height - 800);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  pop();
}

// displayText() displays message in the center of the createCanvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
