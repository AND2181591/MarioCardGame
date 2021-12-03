const cards = document.querySelectorAll('.card');

// Records the player's best score
let bestScore = 0;
const bestGuess = document.getElementById('best-guess');
const best = document.getElementById('best');

// Tracks the number of guesses the player has attempted
let count = 0;
const score = document.getElementById('score');
score.innerHTML = count;

// Allows the player to reset the game
const button = document.getElementById('button');
button.addEventListener('click', resetGame);

// Coin animation
const coin = document.getElementById('coin');

let endGameCount = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



function flipCard(){
  // This will disable any clicks that occur before the non-matched cards reset
  if(lockBoard)
    return;
  // This will prevent a double click on the same card to obtain a match
  if(this === firstCard)
    return;
  
  this.classList.add('flip');
  
  if(!hasFlippedCard){
    // First card is clicked
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  } 

  secondCard = this; // Second card is clicked
  checkForMatch(); // Check if cards match
}



//This function will check if the two cards chosen match
function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // isMatch ? disableCards() : unflipCards();
  if (isMatch) {
    setScore(1);
    disableCards();
    endGameCheck();
  } else {
    setScore(1);
    unflipCards();
  }
}



//This function will disable the chosen cards whenever there's a match
function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  resetBoard();
}



//This function will reset the cards if they don't match
function unflipCards(){
  lockBoard = true;
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}



function setScore(add = 0) {
  if (add) {
    count += add;
  } else {
    count = add;
    endGameCount = add;
  }
  score.innerHTML = count;
}



function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}



function resetGame() {
  setScore();
  cards.forEach(card => card.classList.remove('flip'));

  if (bestGuess.classList.contains('blink')) {
    bestGuess.classList.remove('blink');
  }

  coin.style.display = 'flex';
  coin.classList.add('coin-animation');

  resetBoard();
  setTimeout(() => {
    coin.classList.remove('coin-animation');
    coin.style.display = 'none';
    shuffle();
  }, 400);
}



function endGameCheck() {
  endGameCount++;
  if (endGameCount === 9) {
    
    if (bestScore === 0 || count < bestScore) {
      bestScore = count;
      best.innerHTML = bestScore;
    }
    bestGuess.style.display = 'block'
    bestGuess.classList.add('blink');
  }
}



// This will shuffle the cards immediately upon page reload. Or if the player clicks 
// the restart button
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
    card.addEventListener('click', flipCard)
  })
}

(shuffle)();