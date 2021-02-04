/**************************************************
Exercise 2: Slaminaaaaaa
Atima Ng

A guessing game where the user has to guess the name of an animal when it is said backwards.
**************************************************/

"use strict";

//An array with all possible animals
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

//Store animals and current answer.
let currentAnimal = ``;
let currentAnswer = ``;

//Keep track of the current current state
let state = `title`; // Possible states: title, instructionScreen and simulation
let simulationState = ``; //Possible states: ``, success, fail, play

//Store instructions for the states.
const TITLE = `Do you have magical powers?

Press any key to continue`;

const INSTRUCTIONS = `Test you abilities to guess animals names backwards.
Answer by saying "I think it is..."

Press any key to continue`;

//Set initial timer
let timer = 15; // 15 SECONDS TIMER

//Set spoken responses
const goodAnswerReply = [
  `Good job!`,
  `Keep at it!`,
  `Woohoo!`,
  `Yes girl`,
  `You're killing it!`
];
const wrongAnswerReply = [
  `Wrong!`,
  `Try again!`,
  `I'm getting angry!`,
  `How could you think that?`,
  `Boo!`,
  `You stink!`
];

//Set initial sound.
let wrongSFX = undefined;

//preload()
//
//Load sounds.
function preload() {
  wrongSFX = loadSound(`assets/sounds/wrong.mp3`);
}

//setup()
//
//Setups the canvas
function setup() {
  createCanvas(700, 700);

  // Setup the annyang commands
  if (annyang) {
    let commands = {
      "I think it is *animal": guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

// draw()
//
// keep track of the current state.
function draw() {
  background(0, 0, 255); // Blue background
  currentState();
}

//Keep track of the current state the player is in.
function currentState() {
  if (state === `title`) {
    title();
  } else if (state === `instructionScreen`) {
    instructionScreen();
  } else if (state === `simulation`) {
    simulation();
  }
}

//The title state.
function title() {
  displayText(TITLE);
}

//The instructionScreen state.
function instructionScreen() {
  displayText(INSTRUCTIONS);
}

//The simulation state
function simulation() {
  background(0);
  displayTimer();
  //If player answers correctly, the animal answer will be displayed.
  if (simulationState === `success`) {
    text(currentAnimal, width / 2, height / 2);
  }
  //If player answers incorrectly, the animal answer will be displayed.
  else if (simulationState === `fail`) {
    text(currentAnimal, width / 2, height / 2);
  }
}

//displays the timer in the simulation screen
function displayTimer() {
  if (simulationState === `play`) {
    push();
    fill(255, 0, 255);
    text(`${timer} seconds`, width / 2, height / 5);
    pop();
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
  }
  if (timer === 0) {
    fail();
    playWrongSFX();
  }
}

//The fail state during the simulation.
function fail() {
  push();
  fill(255, 0, 0);
  background(255);
  text(`YOU STINK`, width / 2, height / 2);
  pop();
}

//Plays the wrongSFX when the player loses.
function playWrongSFX() {
  if (!wrongSFX.isPlaying()) {
    wrongSFX.play();
  }
}

//To control the state switches.
function keyPressed() {
  if (state === `title`) {
    state = `instructionScreen`;
  } else if (state === `instructionScreen`) {
    state = `simulation`;
  }
}

// To start te simulation
function mousePressed() {
  if (state === `simulation`) {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);
    timer = 15; // Resets timer to 15 when player doesn't know the answer.
    simulationState = `play`;
  }
}

// Keeps track of the current animal guessed.
function guessAnimal(animal) {
  currentAnswer = animal.toLowerCase(); // converts animal name to lowercase
  checkAnswer();
}

//Checks if the answer is correct or incorrect.
function checkAnswer() {
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0); //green
    text(currentAnswer, width / 2, height / 2);
    simulationState = `success`;
  } else {
    fill(255, 0, 0); //red
    text(currentAnswer, width / 2, height / 2);
    simulationState = `fail`;
  }
  showAnimalAnswer();
}

function displayText(string) {
  push();
  fill(255);
  textSize(24);
  text(string, width / 2, height / 2);
  pop();
}

//Displays right or wrong answer.
function showAnimalAnswer() {
  //If successful, a voice will yell a positive command.
  if (simulationState === `success`) {
    let goodAnswer = random(goodAnswerReply);
    responsiveVoice.speak(goodAnswer);
    //If unsuccessful, a voice will yell a negative command.
  } else if (simulationState === `fail`) {
    let badAnswer = random(wrongAnswerReply);
    responsiveVoice.speak(badAnswer);
  }
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join("");
  // Return the result
  return result;
}
