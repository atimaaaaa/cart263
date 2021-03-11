/**
Haiku Generator New Game plus
Atima Ng

A program that generates a random haiku based on pre-existing arrays
of lines of the correct syllable length. Also swaps out lines if the user
clicks on them with a fade in and out effect.
*/

"use strict";

//Title options
let haikuTitle = [
  `The new breeze`,
  `New Beginnings`,
  `Inspire yourself`,
  `Let it go`
];

// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    `O, to be alas free`,
    `Will they ever know?`,
    `We are all flowers`,
    `They will notice`,
    `Live and let go`
  ],
  sevenSyllables: [
    `Walk between the trees`,
    `Trust you can accomplish this`,
    `Those who matter will stay`,
    `Learn from all and everyone`,
    `Fall down but rise again`
  ]
};

// Our four elements on the page that contain each line of the poem
let title = document.getElementById(`title`);
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

// Set up the starting lines
setupLines();
// Listen for clicks on each element and respond by changing them
addListeners();

/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {
  title.innerText = random(haikuTitle);
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  let originalText = title.innerText;

  title.addEventListener(`click`, changeLine);
  //Mouse hover reveals a hidden message
  title.addEventListener(`mouseenter`, function(event) {
    event.target.style[`background-color`] = `greenyellow`;
    event.target.innerText = `You are wonderful.`;
  });
  //Mouse unhover reveals original message
  title.addEventListener(`mouseleave`, function(event) {
    event.target.innerText = originalText;
  });
  line1.addEventListener(`click`, changeLine);
  line1.addEventListener(`mouseenter`, function(event) {
    event.target.style[`background-color`] = `greenyellow`;
  });
  line2.addEventListener(`click`, changeLine);
  line2.addEventListener(`mouseenter`, function(event) {
    event.target.style[`background-color`] = `greenyellow`;
  });
  line3.addEventListener(`click`, changeLine);
  line3.addEventListener(`mouseenter`, function(event) {
    event.target.style[`background-color`] = `greenyellow`;
  });

  let checkBox = document.getElementById(`submit-button`);
  checkBox.addEventListener(`click`, function(event) {
    event.target.style[`background-color`] = `yellow`;
  });
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  fadeOut(event.target, 1);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  } else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  } else {
    // Do nothing - we're done!
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
  } else if (element === line2) {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
  } else {
    element.innerText = random(haikuTitle);
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
