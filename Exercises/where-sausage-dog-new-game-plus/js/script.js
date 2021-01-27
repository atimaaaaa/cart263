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

const NUM_CHARACTER_IMAGES = 4;
const NUM_CHARACTERS = 100;

let characterImages = [];
let characters = [];

let waldoImage = undefined;
let waldo = undefined;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);

  for (let i = 0; i < NUM_CHARACTER_IMAGES; i++) {
    let characterImage = loadImage(`assets/images/character${i}.png`);
    characterImages.push(characterImage); // Puts Image into the array. push adds to the array
  }

  waldoImage = loadImage(`assets/images/waldo.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM_CHARACTERS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let characterImage = random(characterImages); //Loads from animalImages array
    let character = new Character(x, y, characterImage);
    characters.push(character); // Loads 100 images at random position
  }

  let x = random(0, width);
  let y = random(0, height);
  waldo = new Waldo(x, y, waldoImage);
}

// Draws
function draw() {
  background(255, 0, 0);

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
  displayText(`Where's Waldo?
    Press anywhere to continue.`);
}

// Simulation state.
function simulation() {
  updateCharacters();
  displayTimer();
  if (timer === 0 && !waldo.found) {
    state = `lose`;
  }
}

// Updates all character to a random position
function updateCharacters() {
  for (let i = 0; i < characters.length; i++) {
    characters[i].update(); //update is referencing the character class
  }
  waldo.update();
}

//Win state.
function win() {
  displayText(`WALDO HAS FOUND!
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
    waldo.mousePressed();
    if (waldo.found) {
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
  fill(255);
  textAlign(CENTER);
  text(`${timer} seconds to find Waldo`,
    width /2, height/2);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  pop();
}

// displayText() displays message in the center of the createCanvas
function displayText(message) {
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
