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
const MAX_MOUSE_MOVES = 25;
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
