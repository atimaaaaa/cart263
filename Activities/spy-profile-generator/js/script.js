/**************************************************
Spy Profile Generattor
Atima Ng

Generates a randomised spy profile for the user and password protects it.
**************************************************/
// The spy profile while the program is running
let spyProfile = {
  name: `** REDACTED **`,
  alias: `** REDACTED **`,
  secretWeapon: `** REDACTED **`,
  password: `** REDACTED **`
};

//URL's to JSON data
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const PROFILE_DATA_KEY = `spy-profile-data`;

//Variables to store JSON data for generating profile
let instrumentData;
let objectData;
let tarotData;

function preload() {
  instrumentData = loadJSON(INSTRUMENT_DATA_URL);
  objectData = loadJSON(OBJECT_DATA_URL);
  tarotData = loadJSON(TAROT_DATA_URL);
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
  createCanvas(windowHeight, windowHeight);
  //Load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY)); // Convert to object
  //Check if there was data to load
  if (data) {
    let password = prompt(`What's your password, mate?`);
    if (password === data.password) {
      //Not spyProfile cause not populated yet...
      setSpyProfile(data);
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
}

function generateSpyProfile() {
  spyProfile.name = prompt(`What's your name, punk?`);

  let instrument = random(instrumentData.instruments); // Grab random instrument from array
  spyProfile.alias = `The ${instrument}`; // Choose from array
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile)); //To save the profile
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(screenBg.r, screenBg.g, screenBg.b); //Green background

  let profile = `** SPY PROFILE **
  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(profile, 100, 100);
  pop();
}
