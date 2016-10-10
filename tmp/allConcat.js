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
