/**
Code Taker
Atima Ng

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

$(`#solved-dialog`).dialog({
  //Dialog doesn't open at the start of the program
  autoOpen: false,
  buttons: {
    "I know": function() {
      $(this).dialog(`close`);
    }
  }
});

// Listens for a mouse hover adds the class of found
$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  //Draggable letter
  $(this).draggable({
    //Clones letter
    helper: "clone"
  });
});

// Drag letters in a dialog box
$(`#answer`).droppable({
  drop: function(event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    // Check answer
    if (($(this).text() = `Theremin`)) {
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});
