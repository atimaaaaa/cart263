/**************************************************
Isle of Dogs - Project 1 CART263
Atima Ng

To guide Spots, the user has to speak the commands "Attack" or "Stop" and press the arrows of the keyboard to move Spots. His goal is to grab as many treats and to avoid the Robot-Dogs when it is not necessary.

Commands:
"Attack!"
"STOP!"
"(Go) left"
"(Go) right"

Credits:
annyang - https://www.talater.com/annyang/
Sand image - https://www.pinterest.ca/pin/366410119678636864/
Sound effects - Étienne Dubé: https://soundcloud.com/e_dube
Bark SFX - Provided by Pippin Barr
**************************************************/
"use strict";

//Setup initial variables
//
//
//Set the initial state
let state = `title`; // Possible states: title, simulation, win, lose
let introState = 0;

//List of directives
let directives = [`Stay still!`, `Attack!`, `Treat!`];
//Current directive
let currentDirective = `Click to see your first command!`;

//Store high score
let score = 0;
let projectData = {
  highScore: 0 // Set high score at 0 by default
};
let timer = 80;

//Store data
let dogNamesData = undefined;
let dogTypeData = undefined;
let dogProfile = {
  name: `**** CONFIDENTIAL ****`,
  password: `**** CONFIDENTIAL ****`,
  mission: `**** CONFIDENTIAL ****`
};

//URL's to JSON Data
const DOGS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json`;
const PROFILE_DATA_KEY = `isle-dogs-profile-data`;

//Variables to store JSON data for generating dogProfile
let dogData;

//Objects for the simulation
let dog;
let robots = [];
let numRobots = 10;
let treats = [];
let numTreats = 3;

//Typography
//Red
let redColor = {
  r: 236,
  g: 26,
  b: 23
};
//Gold
let goldColor = {
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
//green
let greenColor = {
  r: 159,
  g: 254,
  b: 137
};

//Images variables
let bgImage;
//Audio variables
let barkSFX;
let rates = [1, 1.5, 1.75, 2.25, 2.75, 3];
let treatSFX;
let bgMusic;

// // preload
// //
// // Description of preload() goes here.
function preload() {
  //Audio
  barkSFX = loadSound(`assets/sounds/bark.wav`);
  treatSFX = loadSound(`assets/sounds/score.mp3`);
  bgMusic = loadSound(`assets/sounds/background.mp3`);
  //Data
  dogNamesData = loadJSON(`assets/data/dogNames.json`);
  dogTypeData = loadJSON(DOGS_DATA_URL);
}

// // setup()
// //
// // Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  //Setup the introduction
  //Generate the name of a random dog from the movie
  let randomDog = random(dogNamesData.dogs);
  dogProfile.name = randomDog.name;
  //Load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  //Checks if there is data to load
  if (data) {
    //Password protect the page
    let password = prompt(
      `To access confidential information, please enter your pawsword.`
    );
    //If the password is correct...
    if (password === data.password) {
      setProfile(data);
      responsiveVoice.speak(`woof woof woof!`, `UK English Male`, {
        pitch: 0.25,
        rate: 0.5,
        volume: 1
      });
    }
  } else {
    generateProfile();
  }
  setupSimulation();
}

//Assign variables to the related data
function setProfile(data) {
  dogProfile.name = data.name;
  dogProfile.password = data.password;
  dogProfile.mission = `Rescue Spots`;
}

//Generates profile
function generateProfile() {
  let password = random(dogTypeData.dogs);
  dogProfile.password = `${password}`;

  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(dogProfile));
}

//Code to setup the simulation.
function setupSimulation() {
  //background
  bgImage = loadImage(`assets/images/sand.jpg`);
  //Load the game data
  let data = JSON.parse(localStorage.getItem(`project-data`));
  //Check if there is a score already
  if (data !== null) {
    projectData = data;
  }
  //Setup the main dog class
  let x = windowWidth / 2;
  let y = windowHeight / 2;
  dog = new Dog(x, y);
  //Setup the robot dog class
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
  //Setup the treat class
  for (let i = 0; i < numTreats; i++) {
    //Create new robot dog
    let x = random(0, width);
    let y = random(0, height);
    let treat = new Treat(x, y);
    //Add robot dog to the array of robot dogs
    treats.push(treat);
  }
  //Setup annyang
  setupAnnyang();
}

//Setup annyang for the voice commands to control the dog
function setupAnnyang() {
  if (annyang) {
    //Add Commands
    let commands = {
      //Add commands to control the dog.
      attack: function() {
        dog.attack();
      },
      stop: function() {
        dog.stop();
      },
      "(Go) left": function() {
        dog.goLeft();
      },
      "(Go) right": function() {
        dog.goRight();
      }
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

// // draw()
// //
// // Description of draw() goes here.
function draw() {
  background(0);
  //Call states
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    win();
  } else if (state === `lose`) {
    lose();
  }
}

//Title sequences. Click to change states
function title() {
  background(0);
  if (introState === 0) {
    displayTitle();
  } else if (introState === 1) {
    displayText(`Welcome ${dogProfile.name}!`);
    responsiveVoice.speak(`We need your help!`);
  } else if (introState === 2) {
    displayText(`We need your help to guide Spots to safety.
He is surrounded by Robot-Dogs
who want to harm him.`);
  } else if (introState === 3) {
    let profile = `** DOG PROFILE **
  Name: ${dogProfile.name}
  Pawsword: ${dogProfile.password}
  Mission: ${dogProfile.mission}

  Forgot your password? Press 1 to reinitialize`;

    displayMediumText(profile, windowWidth / 2, windowHeight);
  } else if (introState === 4) {
    displayMediumText(
      `Guide Spots to safety.

  To move: Yell "ATTACK" and use any the arrow keys.
  To stop: Yell "STOP" and press an arrow key.
  To attack: Yell "ATTACK" and use any the arrow keys.

      Follow the proposed commands to save Spots from the Robot-dogs!
      `,
      windowWidth / 2,
      windowHeight / 2
    );
  }
}

//Displays the simulation
function simulation() {
  background(bgImage);
  noCursor();
  //Display score and directive
  displayDirective();
  displayScoreTimer();
  displayInstructions();
  setScore();

  //Plays background music in a loop when loaded
  if (bgMusic.isPlaying() === false) {
    bgMusic.loop();
  }

  //Display dog.
  dog.checkDirectives();
  dog.update();
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
  changeState();
}

//Change to the win or lose state
function changeState() {
  if (score >= 500) {
    state = `win`;
  } else if (timer === 0 || score < -25) {
    state = `lose`;
  }
}

function displayDirective() {
  displayText(currentDirective);
}

//Displays text for the high score
function displayScoreTimer() {
  push();
  fill(whiteColor.r, whiteColor.g, whiteColor.b);
  textAlign(RIGHT);
  textSize(35);
  textStyle(BOLD);
  textFont(`Rockwell Std Condensed`);
  text(
    `Current score ${score}
    Goal 500
    High Score ${projectData.highScore}
    ${timer} seconds left`,
    windowWidth - 50,
    windowHeight - 200
  );
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  pop();
}
///Displays instructions to the simulation
function displayInstructions() {
  displaySmallText(`To move: Yell "ATTACK" and use any the arrow keys.
To stop: Yell "STOP" and press an arrow key.
To attack: Yell "ATTACK" and use any the arrow keys.`);
}

//Saves the high score.
function setScore() {
  if (score > projectData.highScore) {
    //Set a new high score
    projectData.highScore = score;
    localStorage.setItem(`project-data`, JSON.stringify(projectData));
  }
}

//Displays the win screen
function win() {
  background(greenColor.r, greenColor.g, greenColor.b);
  displayMediumText(`WIN`);
  responsiveVoice.speak(`Winner. Winner. Chicken Diner!`, `UK English Male`, {
    pitch: 1.5
  });
}

//Displays the lose screen
function lose() {
  background(redColor.r, redColor.g, redColor.b);
  displayMediumText(`TRY AGAIN`);
  responsiveVoice.speak(
    `Try again. Spot is still captured.`,
    `UK English Male`,
    { pitch: 1.5 }
  );
}

//Displays the title sequences
function displayTitle() {
  //犬ヶ島 - display title
  push();
  textAlign(CENTER, CENTER);
  fill(redColor.r, redColor.g, redColor.b);
  textSize(400);
  text(`犬ヶ島`, width / 2, height / 2);
  pop();
  //Isle of Dogs - display title
  push();
  textAlign(CENTER, CENTER);
  fill(goldColor.r, goldColor.g, goldColor.b);
  textSize(35);
  textFont(`Rockwell Std Condensed`);
  text(`(Isle of Dogs)`, width / 2, height / 2 + 250);
  pop();
}

//Template to reuse text strings - Big
function displayText(string) {
  push();
  fill(whiteColor.r, whiteColor.g, whiteColor.b);
  textAlign(CENTER);
  textSize(100);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}
//Template to reuse text strings - Medium
function displayMediumText(string) {
  push();
  fill(whiteColor.r, whiteColor.g, whiteColor.b);
  textAlign(CENTER, CENTER);
  textSize(50);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}
//Template to reuse text strings - Small
function displaySmallText(string) {
  push();
  fill(whiteColor.r, whiteColor.g, whiteColor.b);
  textAlign(TOP, LEFT);
  textSize(35);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, 100, 100);
  pop();
}

//Press the arrow keys to move the dog.
function keyPressed() {
  dog.keyPressed();
  dog.move();
  //Erase the data.
  if (key === `1`) {
    localStorage.removeItem(PROFILE_DATA_KEY);
  }
}

//Click to receive the command
function mousePressed() {
  if (currentDirective === `Click to see your first command!`) {
    currentDirective = random(directives);
  }
}

//Advance in the introduction
function mouseClicked() {
  if (state === `title`) {
    introState += 1;
    if (introState === 5) {
      state = `simulation`;
    }
  }
}
