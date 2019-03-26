let wordArray = ["archer", "athlete", "baseball", "bowling", "basketball", "billiards", "boxing",
  "curling", "cricket", "dugout", "dartboard", "defense", "dodgeball", "equipment", "fencing", "football",
  "game", "golfing", "goal", "goalie", "halftime", "hockey", "huddle", "infielder", "judo", "karate",
  "kickball", "lacrosse", "outfield", "player", "quarterback", "rugby", "snowboarding", "swimming",
  "taekwondo", "triathlon", "weightlifting", "wrestling"]


let winsText = document.getElementById("wins-text")
let currentWordText = document.getElementById("current-word-text")
let guessesRemainingText = document.getElementById("guesses-remaining-text")
let lettersGuessedText = document.getElementById("letters-guessed-text")
let gameStatus = document.getElementById("game-status")

// initial game state
let wins = 0
winsText.textContent += wins
let guessesRemaining = 10
guessesRemainingText.textContent = guessesRemaining
let currentWord = wordArray[Math.floor(Math.random() * wordArray.length)]
let currentPlace = 0
currentWordText.textContent = ""
for (let i = 0; i < currentWord.length; i++) {
  currentWordText.textContent += "_ "
}
lettersGuessedText.textContent = ""
gameStatus.textContent = ""
let count = 0
let usedLetters = []


// resets the game after a win or loss
function reset() {
  guessesRemaining = 10
  guessesRemainingText.textContent = guessesRemaining
  currentWord = wordArray[Math.floor(Math.random() * wordArray.length)]
  currentPlace = 0
  currentWordText.textContent = ""
  for (let i = 0; i < currentWord.length; i++) {
    currentWordText.textContent += "_ "
  }
  lettersGuessedText.textContent = ""
  gameStatus.textContent = ""
  count = 0
  usedLetters = []
}

// checks to see if chosen letter is in the word
function isCorrect(action, currentWord) {
  for (let i = 0; i < currentWord.length; i++) {
    if (action === currentWord[i])
      return true
  }

  return false
}

// increments letter count to determine if all letters have been guessed
function letterCount(action, currentWord) {
  let count = 0

  for (let i = 0; i < currentWord.length; i++) {
    if (action === currentWord[i])
      count++
  }

  return count
}

// checks to see if chosen letter has already been chosen
function unused(action, usedLetters) {
  for (let i = 0; i < usedLetters.length; i++) {
    if (action === usedLetters[i])
      return false
  }

  return true
}

// reveals letters that were guessed correctly
function reveal(action, currentWord, currentWordText, usedLetters) {
  currentWordText.textContent = ""

  for (let i = 0; i < currentWord.length; i++) {

    if (usedLetters.includes(currentWord[i]))
      currentWordText.textContent += currentWord[i]
    else
      currentWordText.textContent += " _"
  }

}

// start a fresh game
reset()


document.onkeyup = function(event) {

  // if player has guesses remaining, game continues
  if (guessesRemaining > 0 && currentPlace !== currentWord.length) {
    let action = event.key

    //player guesses right
    if (isCorrect(action, currentWord) && unused(action, usedLetters)) {
      usedLetters.push(action)
      count = letterCount(action, currentWord)
      currentPlace += count
      reveal(action, currentWord, currentWordText, usedLetters)

      //player wins
      if (currentPlace === currentWord.length) {
        gameStatus.textContent = "You win! Press any key to play again"
        wins++
        winsText.textContent = wins
      }
    } else {
      guessesRemaining--
      guessesRemainingText.textContent = guessesRemaining

      // player loses
      if (guessesRemaining === 0 && currentPlace !== currentWord.length) {
        gameStatus.textContent = `You lose :( The word was ${currentWord}. Press any key to play again`
      }
    }

    lettersGuessedText.textContent += " " + action
  }

  // player has option to reset when game ends
  else reset()
}
