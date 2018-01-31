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

// add input fields for user to specify min & max
// if userInput === randomNumber, max increases by 10 (adjust userInput field to accept broader range)
// if userInput === randomNumber, min decreases by 10 (adjust userInput field to accept broader range)
// refine UI so user understands updated range ^^ 

// ❓ DO I NEED THIS? look into event.preventDefault to prevent form from submitting to server
// ❓ Should the reset button ever be disabled?
// ✅ change button colors to have disabled/active state color
// ✅ make initial game UI show smaller "Make a guess" font (.make-a-guess class)
// ✅ set up tabs correctly (to tab through buttons)
// change what happens when user types "enter" after inputing guess in input field
// change ids to classes
// remove hover from inactive buttons
// 

// ===================================================================

var randomNumber = getRandomNumber(0, 100);
console.log(randomNumber);
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var displayLastGuess = document.querySelector('.display-last-guess');
var userInputGuess = document.querySelector('#user-input');
var resetGameButton = document.querySelector('#reset-game');
var yourLastGuessWas = document.getElementById('your-last-guess-was');
var thatIsToo = document.getElementById('that-is-too');


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function updateButtonStates() {
  var userInput = userInputGuess.value;
  guessButton.disabled = userInput === "";
  clearButton.disabled = userInput === "";

  // function addHoverState() {
  //   guessButton.classList.add('button-hover');
  //   console.log("addHoverState ran");
  // };

  if (guessButton.disabled === false) {
    guessButton.classList.add('active-button');
    // guessButton.addEventListener('onmouseover', addHoverState);
    console.log("guess button is enabled");
  } else {
    guessButton.classList.remove('active-button');
  }

  if (clearButton.disabled === false) {
    clearButton.classList.add('active-button');
  } else {
    clearButton.classList.remove('active-button');
  };

  if (guessButton.disabled === false) {
    resetGameButton.classList.add('active-button');
  } else {
    resetGameButton.classList.remove('active-button');
  }
};
// ^^ look into actually disabling reset and if I want it ever disabled?
// ^^ can clean up this code by putting all remove/add classes into the same if event


function clearUserGuess() {
  document.getElementById('user-input').value = "";
  updateButtonStates();
};

function displayUserResult() {
  var userInput = userInputGuess.value; 
  userInput = parseInt(userInput, 10);
  if (randomNumber > userInput) {
    thatIsToo.innerText = "That is too low!";
  } else if (randomNumber < userInput) {
    thatIsToo.innerText = "That is too high!";
  } else if (randomNumber === userInput) {
    thatIsToo.innerText = "BOOM!";
  } else {};
};

function resetGame() {
  yourLastGuessWas.innerText = "Guess a number";
  displayLastGuess.innerText = "";
  thatIsToo.innerText = "";
  updateButtonStates();
  clearUserGuess();
  randomNumber = getRandomNumber(0,100);
  console.log(randomNumber);
};

// look into highlow ()

guessButton.addEventListener('click', function() {
  var userInput = userInputGuess.value;
  userInput = parseInt(userInput, 10);

  if (Number.isNaN(userInput)) {
    alert("Please enter a number.");
  } else if ((userInput < 0) || (userInput > 100)) {
    alert("Number must be between 0 and 100");
  } else {
    displayLastGuess.innerText = userInput;
    yourLastGuessWas.innerText = "Your last guess was";
    thatIsToo.innerText = "";
    displayUserResult();
  }
});


userInputGuess.addEventListener('input', updateButtonStates);

clearButton.addEventListener('click', clearUserGuess);

resetGameButton.addEventListener('click', resetGame);



// ^^ when reset-button is clicked, function resetGame is run.

// may need to figure out how to run back through other functions. 
// figure out how to start with reset state



