'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring start variables
let scores, currentScore, activePlayer, playing;

// Starting conditions

const init = function () {
  //assigning start variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //reset scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  //reset current scores
  current0El.textContent = 0;
  current1El.textContent = 0;
  // remove winner layout
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //add active player layout
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //hide the dice
  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //add if does not exist and remove if exist
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // playing boolean for stoping the game after someone win
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  // playing boolean for stoping the game after someone win
  if (playing) {
    // 1. add current score to the score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check score is >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove the dice
      diceEl.classList.add('hidden');
      //remove active player layout
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
