/**************************************************
Isle of Dogs
Atima Ng

Description.

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
let state = `simulation`;
let introState = 0;

//Store high score
let score = 0;
let projectData = {
  highScore: 0 // Set high score at 0 by default
};

//Objects
let dog;
let robots = [];
let numRobots = 5; //5?
let treats = [];
let numTreats = 3;

//Background
let bgImage;
//Sounds
let barkSFX;

//Typography
//Red
let redColor = {
  r: 255,
  g: 0,
  b: 0
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
//Store name variables in
let dogNamesData = undefined;
let dogTypeData = undefined;
const DOGS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json`;
let displayName = "stranger...";

// // preload
// //
// // Description of preload() goes here.
function preload() {
  //Sounds
  barkSFX = loadSound(`assets/sounds/bark.wav`);
  //Data
  dogNamesData = loadJSON(`assets/data/dogNames.json`);
  dogTypeData = loadJSON(DOGS_DATA_URL);
}

// // setup()
// //
// // Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
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
      Attack: function() {
        dog.attack();
      },
      Stop: function() {
        dog.stop();
      },
      "(Go) left": function() {
        dog.goLeft();
      },
      "(Go) right": function() {
        dog.goRight();
      },
      help: function() {
        alert(
          `Use your voice to control the dog to collect his treats. Prompts include: "Attack!", "Stop!"`
        );
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
  background(bgImage);
  // noCursor();
  displayScore();
  displayHighScore();
  setScore();

  //Display dog.
  dog.move();
  dog.wrap();
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

//Displays the text for the current score
function displayScore() {
  displayText(`${score} points`);
}

//Displays text for the high score
function displayHighScore() {
  push();
  fill(goldColor.r, goldColor.g, goldColor.b);
  textAlign(RIGHT);
  textSize(50);
  textStyle(BOLD);
  textFont(`Rockwell Std Condensed`);
  text(
    `High Score ${projectData.highScore}`,
    windowWidth - 50,
    windowHeight - 100
  );
  pop();
}

//
function setScore() {
  if (score > projectData.highScore) {
    //Set a new high score
    projectData.highScore = score;
    localStorage.setItem(`project-data`, JSON.stringify(projectData));
  }
}

function displayText(string) {
  push();
  fill(goldColor.r, goldColor.g, goldColor.b);
  textAlign(CENTER);
  textSize(100);
  textFont(`Rockwell Std Condensed`);
  // fill(255);
  text(string, width / 2, height / 2);
  pop();
}

function keyPressed() {
  // dog.keyPressed();
  dog.move();
}
