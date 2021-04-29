/**

DJ FLOW'S PORTFOLIO
Atima Ng

Uses:
jQuery:
https://jquery.com

jQuery UI:
https://jqueryui.com

AUDIO CREDITS
Recorder audio: https://freesound.org/people/dela.deb/sounds/463725/
Ukulele strumming audio: https://freesound.org/people/melismw12/sounds/510922/
Lopp Pi Dee Loop audio: https://freesound.org/people/visual/sounds/338948/

*/
"use strict";

//Load Audio
let audio1 = new Audio("assets/audio/recorder.wav");
let audio2 = new Audio("assets/audio/ukulele.wav");
let audio3 = new Audio("assets/audio/futurama.wav");
let audio4 = new Audio("assets/audio/looppideeloop.wav");
audio1.pause();
audio2.pause();
audio3.pause();
audio4.pause();

//Listen for a click to play audio
let $drag = $(".ui-state-default");

//For the elements to be sortable.
$(function() {
  $("#sortable").sortable({
    placeholder: "ui-state-highlight",
    cursor: "grabbing",
    distance: 40,
    start: function(event, ui) {},
    stop: function(event, ui) {}
  });
  $("#sortable").disableSelection();
});
