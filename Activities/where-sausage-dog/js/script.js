/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage); // Puts animalImage into the array. push adds to the array
  }
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
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 255, 0);
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(); //update is referencing the Animals class
  }
}
