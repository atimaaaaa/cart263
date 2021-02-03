"use strict";

let on = false;

function setup() {
  createCanvas(500, 500);

  if(annyang) {
    let commands = {
      'turn on the lights': function() {
        on = true;
      },
      'turn off the lights': function(){
        on = false;
      }
    }
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  if(on){
    background(255);
  }
  else {
    background(0);
  }
}
