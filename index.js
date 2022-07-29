
start();

function start() {
   const secretWord = "salve";
   const secretWordField = getDOM("p");
   const wrongGuessesField = getDOM(".wrong-guesses-field");
   const winMessage = getDOM("#win-message");
   const input = getDOM("input");

   let underlinedWord = secretWord.replace(/[a-zA-Z]/g, "_");
   let userCorrectGuesses = '';
   let userWrongGuesses = '';

   secretWordField.innerHTML = underlinedWord;

   const submitButton = getDOM("#submit-button");
   const restartButton = getDOM("#restart-button");

   submitButton.addEventListener('click', () => {
      buttonClickEffect(submitButton);
      checkGuess();
   })

   restartButton.addEventListener('click', () => {
      buttonClickEffect(restartButton);
      winMessage.style.display = "none";
      restartButton.style.display = "none";
      wrongGuessesField.innerHTML = '';
      start();
   })

   function buttonClickEffect(button) {
      button.classList.toggle("button-click");
      setTimeout(() => {
         button.classList.toggle("button-click");
      }, 70);
   }

   function checkGuess() {
      const userGuess = input.value;
      clearInput();

      if(userGuess.length == 1) {
         if(secretWord.includes(userGuess)) {
            updateUnderlinedWord(userGuess);
            if(checkWin(userGuess)) showWinMessage();
         } 
         else {
            wrongGuessEffect();
            updateWrongGuesses(userGuess);
         }
      }
      else if(userGuess.length > 1) {
         if(checkWin(userGuess)) showWinMessage();
         else wrongGuessEffect();
      }
   }

   function updateWrongGuesses(guess) {
      userWrongGuesses += guess;
      wrongGuessesField.innerHTML = userWrongGuesses;
   }

   function wrongGuessEffect() {
      input.classList.toggle("input-wrong");
      setTimeout(() => {
         input.classList.toggle("input-wrong");
      }, 1000);
   }

   function getDOM(element) {
      return document.querySelector(element);
   }

   function checkWin(userGuess) {
      if(underlinedWord == secretWord || secretWord == userGuess) {
         return true;
      }

      return false;
   }

   function showWinMessage() {
      winMessage.style.display = "block";
      restartButton.style.display = "block";
      secretWordField.innerHTML = secretWord;
   }

   function updateUnderlinedWord(userGuess) {
      userCorrectGuesses += userGuess;
      underlinedWord = secretWord.replace(new RegExp(`[^${userCorrectGuesses} ]`, 'g'), '_')
      secretWordField.innerHTML = underlinedWord;
      clearInput();
   }

   function clearInput() {
      input.value = '';
   }
}

