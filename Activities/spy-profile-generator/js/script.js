/**************************************************
Spy Profile Generattor
Atima Ng

Generates a randomised spy profile for the user and password protects it.
**************************************************/
let spyProfile = {
  name: `** REDACTED **`,
  alias: `** REDACTED **`,
  secretWeapon: `** REDACTED **`,
  password: `** REDACTED **`
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

function preload() {
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowHeight, windowHeight);
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`)); // Convert to object

  if (data !== null) {
    let password = prompt(`What's your password, mate?`);
    if (password === data.password) {
      //Not spyProfile cause not populated yet... {
      // If there is data saved {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password; // Do not write data = spyProfile, does not work
    }
  } else {
    generateSpyProfile();
  }
}

function generateSpyProfile() {
  spyProfile.name = prompt(`What's your name, punk?`);

  let instrument = random(instrumentData.instruments); // Grab random instrument from array
  spyProfile.alias = `The ${instrument}`; // Choose from array
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile)); //To save the profile
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 255, 0);

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
