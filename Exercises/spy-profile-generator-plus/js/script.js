/**************************************************
Spy Profile Generattor New Game
Atima Ng

Generates a randomised spy profile for the user and password protects it.

JSON files come from Dariusk corpora: https://github.com/dariusk/corpora/
Background image source: https://www.shutterstock.com/video/clip-20197435-computer-hacker-sitting-dark-room-front-screens
**************************************************/
// The spy profile while the program is running
let spyProfile = {
  name: `** REDACTED **`,
  password: `** REDACTED **`,
  alias: `** REDACTED **`,
  secretWeapon: `** REDACTED **`,
  favoriteArtMovement: `** REDACTED **`
};

//URL's to JSON data
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const ART_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/art/isms.json`;
const PROFILE_DATA_KEY = `spy-profile-data`;

//Variables to store JSON data for generating profile
let instrumentData;
let objectData;
let tarotData;
let artData;

//Load image background image
let hackerBg;

function preload() {
  //Load the data from JSON URLs
  instrumentData = loadJSON(INSTRUMENT_DATA_URL);
  objectData = loadJSON(OBJECT_DATA_URL);
  tarotData = loadJSON(TAROT_DATA_URL);
  artData = loadJSON(ART_DATA_URL);

  //Load the hacker background image
  hackerBg = loadImage(`assets/images/hacker.png`);
}

//Background COlor of the spy profile.
let screenBg = {
  r: 0,
  g: 255,
  b: 0
};
// setup()
//
// Description of setup() goes here.
function setup() {
  //Create canvas
  createCanvas(910, 480);

  //Load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY)); // Convert to object
  //Check if there was data to load
  if (data) {
    //Password protect page
    let password = prompt(`What's your password, mate?`);
    if (password === data.password) {
      setSpyProfile(data);
      //Make the computer speak
      responsiveVoice.speak(
        `HACKER. HACKER. HACKER. HACKER.`,
        `UK English Male`,
        {
          pitch: 0.25,
          rate: 0.5,
          volume: 1
        }
      );
    }
  } else {
    generateSpyProfile();
  }
}

function setSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password; // Do not write data = spyProfile, does not work
  spyProfile.favoriteArtMovement = data.favoriteArtMovement;
}

function generateSpyProfile() {
  spyProfile.name = prompt(`What's your name, punk?`);

  let instrument = random(instrumentData.instruments); // Grab random instrument from array
  spyProfile.alias = `The ${instrument}`; // Choose from array
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  spyProfile.favoriteArtMovement = random(artData.isms);

  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile)); //To save the profile
}

//Delete saved data.
function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(PROFILE_DATA_KEY);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(screenBg.r, screenBg.g, screenBg.b); //Green background

  let profile = `** SPY PROFILE **
  Name: ${spyProfile.name}
  Password: ${spyProfile.password}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Favorite Art Movement: ${spyProfile.favoriteArtMovement}

  Forgot password? Press C
  to reinitialize!`;

  push();
  textFont(`Courier, monospace`);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 580, 65);
  pop();

  //Load background image
  image(hackerBg, 0, 0);
}
