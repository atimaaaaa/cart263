/**
Code Taker new game plus
Atima Ng

Uses:

jQuery
https://jquery.com

jQuery UI:
https://jqueryui.com
*/

"use strict";

//The secret message to solve!
let secret = `Theremin`;
//Audio elements
let popVFX = new Audio(`assets/sounds/pop.wav`);
let tadaVFX = new Audio(`assets/sounds/tada.flac`);

//Instructions
$(`#instruction-dialog`).dialog({
  modal: true,
  buttons: {
    "I'm Ready!": function() {
      $(this).dialog(`close`);
    }
  }
});

$(`#solved-dialog`).dialog({
  //Dialog doesn't open at the start of the program
  autoOpen: false,
  //Add button
  buttons: {
    "I know!!!!": function() {
      $(this).dialog(`close`);
    }
  }
});

// User mouses over secret letters, highlights them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  //Draggable letter via a clone helper
  $(this).draggable({
    //Clones letter
    helper: `clone`,
    //Underlines letter when dragged
    start: function(event, ui) {
      $(this).css(`text-decoration`, `underline`);
    },
    //No underline when not dragged
    stop: function(event, ui) {
      $(this).css(`text-decoration`, `none`);
    }
  });
});

// Drag letters in a dialog box
$(`#answer`).droppable({
  drop: function(event, ui) {
    //Obtain letter to grab
    let letter = ui.draggable.text();
    //Add it to the answer box
    $(this).append(letter);
    //Disable future dragging of the letter
    ui.draggable.draggable(`disable`);
    //Remove the highlight of the letter
    ui.draggable.removeClass(`found`, 500);
    //Disable mouseovers on this letter
    ui.draggable.off(`mouseover`);
    // Check for the right answer
    if ($(`#answer`).text() === secret) {
      //Display dialog box
      $(`#solved-dialog`).dialog(`open`);
      tadaVFX.play();
    }
  }
});

$(`.white-box`).draggable();
