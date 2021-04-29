/*
DJ TERRIBLE PORTFOLIO
Atima Ng

The dance party code was inspired by Pippin Barr's "Beach party" example: https://github.com/pippinbarr/cart263-2021/tree/main/examples/jquery-ui/beach-party

Uses:
jQuery:
https://jquery.com

jQuery UI:
https://jqueryui.com

DJ Terrible song 1 (really wish i had the equipment to compose a TERRIBLE song... :( - https://freesound.org/people/QLC/sounds/69999/
Shine SFX: https://freesound.org/people/InspectorJ/sounds/403005/


*/

"use strict";

//Audio setup. Stores the music into a variable.
let bgMusic = new Audio("assets/audio/djTerrible1.mp3");
bgMusic.pause();

//Change color of the backgroung with a color picker
function changeColorBg() {
  let color = document.getElementById("colorInputColor").value;
  document.body.style.backgroundColor = color;
  document.getElementById("colorInputText").value = color;
}

//Change color main title H1
function changeColorTitle() {
  let txt = document.getElementById("colorRainbowText");
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  //Grabs random RGB value
  txt.style.color = "RGB(" + r + ", " + g + ", " + b + ")";
}

//Function to start the blinking random color
changeColorTitle();
setInterval(changeColorTitle, 500);

//ANIMALS DRAGGABLE SECTION
//Make Animals draggable!
$("#animalContainer").on("mouseover", ".draggable", function() {
  $(this).draggable({
    start: startDrag,
    stop: stopDrag
  });
});

//Enables the resize of the animals.
$("#animalContainer").on("mouseover", ".resizable");
//Disables the resize of the animals.
$("#animalContainer").on("mouseout", ".resizable");

//Starts the dragable element
function startDrag() {
  $("#animalContainer").append($(this).clone());
  $(this).removeClass("draggable");
  $(this).draggable("option", "start", undefined);
}

//Duplicates the draggable element when mouse is released
function stopDrag() {
  //Make draggable item resizable
  $(this).addClass("resizable");
  $(this).resizable({
    aspectRatio: true,
    maxWidth: 400,
    autoHide: true,
    ghost: true
  });
  $(this).resizable("enable");
  handleMusic();
}

//Plays bg music
function handleMusic() {
  if (bgMusic.paused) {
    bgMusic.loop = true;
    bgMusic.volume = 1;
    bgMusic.play();
  }
}
