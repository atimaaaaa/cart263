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

//Set initial bark sound.
let barkSFX = undefined;

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);

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

// Draws
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

// Title state.
function title() {
  displayText(`Save Sausage dog!
    Press anywhere to continue.`);
}

// Simulation state.
function simulation() {
  updateAnimals();
  displayTimer();
  if (timer === 0 && !sausageDog.found) {
    state = `lose`;
  }
}

// Updates all animals to a random position
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(); //update is referencing the Animals class
  }
  sausageDog.update();
}

//Win state.
function win() {
  displayText(`WEINER :-)
    Are you able to find him again?`);
}

//Lose state.
function lose() {
  displayText(`LOSER :(
    Try to find him again!`);
}

// mousePressed() changes states and can make sausage dog spin!
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state === `simulation`) {
    sausageDog.mousePressed();
    if (sausageDog.found) {
      playBarkSFX();
      setTimeout(function() {
        state = `win`;
      }, 2000);
    }
  }
}

//Plays barkSFX sound.
function playBarkSFX() {
  if (!barkSFX.isPlaying()) {
    barkSFX.play();
  }
}

// Display the timer on the simulation
function displayTimer() {
  push();
  textSize(32);
  fill(0);
  text(
    `${timer} seconds to
find sausage dog`,
    width - 400,
    height - 800
  );
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
