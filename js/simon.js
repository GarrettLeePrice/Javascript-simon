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
