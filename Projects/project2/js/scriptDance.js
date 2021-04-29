/*
DJ TERRIBLE PORTFOLIO - DANCE
Atima Ng

Uses:
jQuery:
https://jquery.com

jQuery UI:
https://jqueryui.com

Audio: https://freesound.org/people/stankbeast/sounds/342360/


*/

"use strict";

//Load Audio
let bgMusic = new Audio("assets/audio/djTerrible2.mp3");
bgMusic.pause();

//Slider variables
let volumeControl = document.getElementById("vol-control");

//SLIDER
volumeControl.addEventListener("change", function() {
  bgMusic.volume = this.value / 100;
});

//Setup selectors
const colorBtn = document.querySelector("#btn-1");
const boxes = document.querySelectorAll(".box");
let colorsChanging = false;

//Get random color hex code
function randomColor() {
  let letters = "0123456789ABCEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//To add color to square boxes
function startRandomColor() {
  if (colorsChanging) {
    boxes.forEach(color => {
      color.style.background = randomColor();
    });
    //Changes color every 500ms
    setTimeout(startRandomColor, 500);
  }
}

//Changes color of the "dance floor" on click
colorBtn.addEventListener("click", function() {
  colorBtn.innerText = "TURN IT DOWN...";
  //When the "turn it down" button is pressed
  if (colorsChanging) {
    colorsChanging = false;
    colorBtn.innerText = "TURN IT UP!!!";
    bgMusic.pause();
  }
  //When "turn it up" button is pressed
  else {
    //CHanges color of tiles
    colorsChanging = true;
    startRandomColor();
    //Plays bg music
    bgMusic.play();
    bgMusic.volume = 0.2;
    //Let responsive voice speak
    responsiveVoice.speak(`Dance Dance Dance!`, `UK English Male`, {
      pitch: 1,
      rate: 1,
      volume: 2
    });
  }
});
