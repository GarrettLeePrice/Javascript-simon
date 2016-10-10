(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Simon() {
  this.pattern = [];
  this.guess = [];
  this.currentGuessIndex = -1;
  this.possibleColors = ['Red', 'Blue', 'Green', 'Yellow'];
}

Simon.prototype.guessColor = function(color) {
  this.guess.push(color);
  this.currentGuessIndex++;
  // user's guess is added to the guess pattern
  // and increments the guess index
};

Simon.prototype.addToPattern = function() {
  var rando = Math.floor(Math.random() * 4);
  var color = this.possibleColors[rando];
  this.pattern.push(color);
  // selects at random one of the four color and adds it to the pattern
};

Simon.prototype.checkGuess = function() {
  // tests new guess at appropriate index and returns true or false
  if (this.pattern[this.currentGuessIndex] === this.guess[this.currentGuessIndex]) {
    return true;
  } else {
    return false;
  }
};

Simon.prototype.fullGuessCheck = function() {
  // tests if the entire pattern has been guessed
  if (this.pattern.length === this.guess.length) {
    return true;
  } else {
    return false;
  }
};

Simon.prototype.getScore = function() {
  // returns score
  return this.pattern.length;
};

exports.simonModule = Simon;

},{}],2:[function(require,module,exports){
var Simon = require('./../js/simon.js').simonModule;

$(document).ready(function() {
  var simon;

  $('#start').click(function() {
    simon = new Simon();
    simon.addToPattern();
    flashPattern();
  });

  $('#Red').click(function() {
    flashButton('Red');
    guessColor('Red');
  });

  $('#Yellow').click(function() {
    flashButton('Yellow');
    guessColor('Yellow');
  });

  $('#Blue').click(function() {
    flashButton('Blue');
    guessColor('Blue');
  });

  $('#Green').click(function() {
    flashButton('Green');
    guessColor('Green');
  });

  function flashButton(color) {
    $('#' + color).addClass('bright' + color);
    setTimeout(darkButton, 500, color);
  }

  function darkButton(color) {
    $('#' + color).removeClass('bright' + color);
  }

  function guessColor(color) {
    simon.guessColor(color);
    if (simon.checkGuess(color)) {
      if (simon.fullGuessCheck()) {
        simon.addToPattern();
        // and set guess to an empty array
        simon.guess = [];
        simon.currentGuessIndex = -1;
        // initiates color flashing sequence
        setTimeout(flashPattern(), 1000);
      }
    } else {
      gameOver();
    }
  }

  function gameOver() {
    var score = simon.getScore();
    $('#score').text(score);
  }

  function flashPattern() {
    console.log(simon.pattern);
    var counter = 0;
    var flasher = setInterval(function() {
      color = simon.pattern[counter];
      flashButton(color);
      console.log(counter, simon.pattern.length);
      if (counter === (simon.pattern.length - 1)) {
        clearInterval(flasher);
      }
      counter++;
      },
      600
    );
  }

});

},{"./../js/simon.js":1}]},{},[2]);
