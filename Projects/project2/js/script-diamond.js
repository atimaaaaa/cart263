/**

DJ FLOW'S PORTFOLIO
Atima Ng

This project explore the personal portfolio of the fictional DJ TERRIBLE. His portfolio will feature elements from jQuery and jQuery UI to present his personal library of work.

Uses:
jQuery:
https://jquery.com

jQuery UI:
https://jqueryui.com

Inspired by exercises from the CART263 material by Pippin Barr

*/

"use strict";

// Set up the initial time before displaying the first pop-up
const INITIAL_DELAY = 2000;
// Constants to determine the shortest and longest time before a pop-up appears.
const MIN_DIALOG_DELAY = 2000;
const MAX_DIALOG_DELAY = 30000;
const MAX_MOUSE_MOVES = 75;
//Set initial mouse moves
let mouseMoves = 0;

//Array of questions to ask. More will be added later.
let prompts = [
  "DO YOU ENJOY GOOD VIBEZ?",
  "HIRE DJ TERRIBLE TO YOUR NEXT WEDDING?",
  "DO YOU HAVE EXTRA MONEY TO SPEND FOR GOOD MUSIC?",
  "DID YOU ENJOY MY WEBSITE?",
  "PLS I'M DESPERATE I NEED A GIG ASAP"
];

setup();

function setup() {
  $(document).on("mousemove", mouseMoved);
  setTimeout(addDialog, INITIAL_DELAY);
}

function mouseMoved() {
  mouseMoves++;
  if (mouseMoves > MAX_MOUSE_MOVES) {
    addDialog();
    mouseMoves = 0;
  }
}

//Add dialog box to the program
function addDialog() {
  let $dialog = $(`<div></div>`).attr(`title`, `Question`);
  let prompt = random(prompts);
  $dialog.append(`<p>${prompt}</p>`);
  $("body").append($dialog);
  $dialog.dialog({
    width: 400,
    resizable: false,
    buttons: {
      YES: function() {
        $(this).dialog(`close`);
      },
      yes: function() {
        $(this).dialog(`close`);
      }
    },
    close: closeDialog,
    //Contain dialog box to the canvas
    containment: "body"
  });
  //Random position of the dialog box
  $dialog.parent().offset({
    top: Math.random() * ($(window).height() - $dialog.parent().height()),
    left: Math.random() * ($(window).width() - $dialog.parent().width())
  });
}

//Close the dialog box
function closeDialog() {
  let delay = randomInRange(MIN_DIALOG_DELAY, MAX_DIALOG_DELAY);
  setTimeout(addDialog, delay);
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}
