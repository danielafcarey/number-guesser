// ==============TO DO=================================================

// ✅ user types number into #user-input
// ✅ #guess-button becomes active (and #clear-button) on input field change
// ✅ user clicks #guess-button 
// ✅ (alternatively, user may press #clear-button button to clear input field)
// ✅ when #guess-button is pressed, #user-input is stored as number
// ✅ #user-input changes HTML at p.last-guess in HTML
// ✅ #reset-game button clears user-results section
// ✅ generate & store randomNumber
// ✅ if userInput is > randomNumber, show in user-result section "That is too high"
// ✅ if userInput is < randomNumber, show in user-result section "That is too low"
// ✅ if userInput === randomNumber, show in user-result section "BOOM!"

// ✅ input field only accepts numbers (use parseInt)
// ✅ set min/max input range
// ✅ display error if userInput is NaN (parseInt() returns NaN)
// ✅ display error if userInput is > max and < min
// ✅ #reset-game button generates new random number
// ✅ reset button should be disabled if input field is empty
// ✅ guess and clear buttons disabled if user guesses correctly

// ✅ add input fields for user to specify min & max
// ✅ when input fields show number, update min/max in getRandomNumber
// ✅ when user inputs min/max, new random number is generated
// ✅ when range is updated by user input, new randomNumber is generated
// ✅ update alerts to show alert if guess it outside new range
// ✅ enable reset button if "input" in the min/max fields
// ✅ user can guess with new range until reset button is clicked
// ✅ if guess is out of range, it should not show up in the user-result section
// if userInput === randomNumber, max increases by 10 (adjust userInput field to accept broader range)
// if userInput === randomNumber, min decreases by 10 (adjust userInput field to accept broader range)
// refine UI so user understands updated range ^^ 
// check JS styleguide

// ❓ WHY CAN'T I DECLARE userInput var OUTSIDE FUNCTIONS?!?!?! (alternative is to create a function to do it and call tha function everytime I want it...but kept it this way for the sake of asking the question)
// ❓ how does this work --> Math.random() * (max - min) + min);
// ❓ how to better use element.class#id in css
// ❓ tips/tricks for ids vs. classes (specifically how could this code improve?)
// ❓ vertical-align: middle; -- why does this never work???
// ❓ when committing, what is best practice if you've made a major change, but also a minor change? Do you notate that minor change?
// ✅ change button colors to have disabled/active state color
// ✅ make initial game UI show smaller "Make a guess" font (.make-a-guess class)
// ✅ set up tabs correctly (to tab through buttons)
// change what happens when user types "enter" after inputing guess in input field
// ✅ only allow min/max input if max > min
// remove hover from inactive buttons
// ✅ change "Guess a number" text to stand out more (pink)
// update spacing so user doesn't have to scroll
// clean up code: 
// - userInput should be userInputGuess to be clear
// - change thatIsToo name to something less stupid
// ===================================================================

var setMinumum = 0;
var setMaximum = 100;

var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var displayLastGuess = document.querySelector('.display-last-guess');
var userInputGuess = document.querySelector('#user-input');
var resetGameButton = document.querySelector('.reset-button');
var yourLastGuessWas = document.getElementById('your-last-guess-was');
var thatIsToo = document.getElementById('that-is-too');
var inputMin = document.getElementById('minimum-number');
var inputMax = document.getElementById('maximum-number');
var userRangeInput = document.getElementById('user-range-input');

var randomNumber = initializeNewGame();

guessButton.addEventListener('click', alertUser);
userInputGuess.addEventListener('input', updateButtonStates);
clearButton.addEventListener('click', clearUserGuess);
inputMax.addEventListener('input', updateRange);
resetGameButton.addEventListener('click', resetGame);

function initializeNewGame() {
  var randomNumber = getRandomNumber(setMinumum, setMaximum);
  console.log(randomNumber);
  return randomNumber;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateButtonStates() {
  var userInput = userInputGuess.value;
  guessButton.disabled = userInput === '';
  clearButton.disabled = userInput === '';
  resetGameButton.disabled = userInput === '';

  if (guessButton.disabled === false) {
    guessButton.classList.add('active-button');
  } else {
    guessButton.classList.remove('active-button');
  }

  if (clearButton.disabled === false) {
    clearButton.classList.add('active-button');
  } else {
    clearButton.classList.remove('active-button');
  }

  if (resetGameButton.disabled === false) {
    resetGameButton.classList.add('active-button');
  } else {
    resetGameButton.classList.remove('active-button');
  }
}

function clearUserGuess() {
  document.getElementById('user-input').value = '';
  updateButtonStates();
}

function displayUserResult() {
  var userInput = userInputGuess.value; 
  userInput = parseInt(userInput, 10);
  yourLastGuessWas.classList.remove('pink-text');

  if (randomNumber > userInput) {
    thatIsToo.innerText = 'That is too low!';
  } else if (randomNumber < userInput) {
    thatIsToo.innerText = 'That is too high!';
  } else if (randomNumber === userInput) {
    thatIsToo.innerText = 'BOOM!';
    guessButton.disabled = true;
    guessButton.classList.remove('active-button');
    clearButton.disabled = true;
    clearButton.classList.remove('active-button');
  } 
}

function alertUser() {
  var userInput = userInputGuess.value;
  userInput = parseInt(userInput, 10);
  var userInputMin = inputMin.value;
  userInputMin = parseInt(userInputMin, 10);
  console.log(userInputMin);
  var userInputMax = inputMax.value;
  userInputMax = parseInt(userInputMax, 10);
  console.log(userInputMax);

  if (Number.isNaN(userInput)) {
    alert('Please enter a number.');
  } else if ((userInput < userInputMin) || (userInput > userInputMax)) {
    alert('Number must be between ' + userInputMin + ' and ' + userInputMax);
  } else {
    displayLastGuess.innerText = userInput;
    yourLastGuessWas.innerText = 'Your last guess was';
    displayUserResult();
  }

  if (((Number.isNaN(userInputMin) || (Number.isNan(userInputMax))) && ((userInput < 0) || (userInput > 100)))) {
    alert('Number must be between 0 and 100')
    resetGame();
  }
}

function resetGame() {
  yourLastGuessWas.innerText = 'Guess a number';
  yourLastGuessWas.classList.add('pink-text');
  displayLastGuess.innerText = '';
  thatIsToo.innerText = '';

  userRangeInput.reset();
  updateButtonStates();
  clearUserGuess();
  randomNumber = initializeNewGame();
}

function updateRange() {
  var userInputMin = inputMin.value;
  userInputMin = parseInt(userInputMin, 10);
  var userInputMax = inputMax.value;
  userInputMax = parseInt(userInputMax, 10);


  if ((userInputMin < userInputMax) && ((Number.isNaN(userInputMax)) === false)) {
    randomNumber = getRandomNumber(userInputMin, userInputMax);
    console.log(randomNumber);
    resetGameButton.disabled = false;
    resetGameButton.classList.add('active-button');
  }
}


// EXTRAS I started but didn't finish or couldn't figure out:

// ----- expand range if user guesses correctly -----
// function expandRange() {
//     var userInput = userInputGuess.value;
//     var changeMinimum = setMinumum - 10;
//     console.log('there is a new min');
//     var changeMaximum = setMaximum + 10;
//     console.log('there is a new max');

//     if (userInput === randomNumber) {
//       initializeNewGame(changeMinimum, changeMaximum);
//     }
// }

// ----- enter button from guess input field triggers Guess button click -----
// userInputGuess.addEventListener('keypress', function(event) {
//   if (event.keyCode === 13) {
//     guessButton.click();
//   }
// })



