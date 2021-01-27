/**************************************************
Where's Sausage Dog Nww game Plus Activity
Atima Ng

Find Waldo!
**************************************************/

// setup()
//
// Description of setup() goes here.
"use strict";

//Current initial state
let state = `title`;

//Set initial timer
let timer = 15; // 15 seconds

//Set initial  sound.
let helloSFX = undefined;
let wrongSFX = undefined;

//Set initial number of images and images used.
const NUM_CHARACTER_IMAGES = 4;
const NUM_CHARACTERS = 300;

let characterImages = [];
let characters = [];

let waldoImage = undefined;
let waldo = undefined;

//preload()
//
// Load sounds and images.
function preload() {
  helloSFX = loadSound(`assets/sounds/hello.wav`);
  wrongSFX = loadSound(`assets/sounds/wrongSFX.wav`);

  for (let i = 0; i < NUM_CHARACTER_IMAGES; i++) {
    let characterImage = loadImage(`assets/images/character${i}.png`);
    characterImages.push(characterImage); // Puts Image into the array. push adds to the array
  }

  waldoImage = loadImage(`assets/images/waldo.png`);
}

//setup()
//
// Setup characters and Waldo.
function setup() {
  createCanvas(windowWidth, windowHeight);
  //Setup characters.
  for (let i = 0; i < NUM_CHARACTERS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let characterImage = random(characterImages); //Loads from characterImages array
    let character = new Character(x, y, characterImage);
    characters.push(character);
  }
  //Setup Waldo
  let x = random(0, width);
  let y = random(0, height);
  waldo = new Waldo(x, y, waldoImage);
}

// Draw()
//
//The different states of the game.
function draw() {
  background(255, 0, 0);

  //Possible states: title, simulation, win, lose
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
  displayText(`WALDO WAS FOUND!
    Are you able to find him again?`);
}

//Lose state.
function lose() {
  displayText(`LOSER :(
    Try to find him again!`);
}

// mousePressed() changes states and can make Waldo spin!
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state === `simulation`) {
    playWrongSFX();
    waldo.mousePressed();
    if (waldo.found) {
      playHelloSFX(); // Sounds plays when Waldo is found!
      setTimeout(function() {
        state = `win`;
      }, 2000);
    }
  }
}

//Plays helloSFX.
function playHelloSFX() {
  if (!helloSFX.isPlaying()) {
    helloSFX.play();
  }
}

// Plays wrongSFX
function playWrongSFX() {
  if (!wrongSFX.isPlaying() && !helloSFX.isPlaying()) {
    wrongSFX.play();
  }
}

// Display the timer on the simulation
function displayTimer() {
  push();
  textSize(50);
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
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}
