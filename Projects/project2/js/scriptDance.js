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
  if (colorsChanging) {
    colorsChanging = false;
    colorBtn.innerText = "TURN IT UP!!!";
    bgMusic.pause();
  } else {
    colorsChanging = true;
    startRandomColor();
    bgMusic.play();
  }
});
