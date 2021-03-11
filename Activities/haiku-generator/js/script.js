/**
Haiku generator
Atima Ng

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
];

let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];

//Assign random array to each line
let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

//Link the line from the HTML
let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

//Displays the P tag from the array
line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

//Calls the line
line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

//New line appears after a click
function lineClicked(event){
  fadeOut(event.target, 1);
}

//Fades opacity until 0
function fadeOut(element,opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0){
    requestAnimationFrame(function() {
      fadeOut(element,opacity);
    });
  }
  else{
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity){
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1){
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    });
  }
}

//Sets new line in the Kaiku
function setNewLine(element){
  if (element === line1P || element === line3P){
    element.innerText = random(fiveSyllableLines);
  }
  else if (element === line2P){
    element.innerText = random(sevenSyllableLines);
  }
}

//Chooses random array
function random(array) {
  let index = Math.floor(Math.random() * array.length); //chooses number between 0-1 (just before 1)
  //math.floor removes the numbers after the decimal. pulls a full number
  return array[index];
}
