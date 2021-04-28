/*
DJ TERRIBLE PORTFOLIO
Atima Ng


Uses:
jQuery:
https://jquery.com

jQuery UI:
https://jqueryui.com

The dance party code was inspired by Pippin Barr's "Beach party" example: https://github.com/pippinbarr/cart263-2021/tree/main/examples/jquery-ui/beach-party

*/

"use strict";
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

//Function to start the resize
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
  $("this").removeClass("draggable");
  $(this).draggable("option", "start", undefined);
}

//Duplicates the draggable element when mouse is released
function stopDrag() {
  // if (
  //   Math.abs($(this).position().top) > $(window).height() * 0.85 &&
  //   Math.abs($(this).position().left) < 180
  // ) {
  //   $(this).remove();
  //   return;
  // }
  $(this).addClass("resizable");
  $(this).resizable({
    aspectRatio: true
  });
  $(this).resizable("enable");
}
