'use strict';

const score0EL = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0EL.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//swithcing function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  p0.classList.toggle('player--active');
  p1.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    ///console.log(dice);

    //3 . Check for 1 . if true, switch roles.
    if (dice !== 1) {
      //add dice to current sscore
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active plaayer
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check score >= 100- FINISH the game
    if (scores[activePlayer] >= 20) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3. Swithc the gamee
    else {
      switchPlayer();
    }
  }
});

//PLAYING AGAIN THE GAME
btnNew.addEventListener('click', function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  diceEl.classList.add('hidden');
  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
});
