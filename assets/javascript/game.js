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


// resets the game after a win or loss
function reset() {
  guessesRemaining = 10
  guessesRemainingText.textContent = guessesRemaining
  currentWord = wordArray[Math.floor(Math.random() * wordArray.length)]
  currentPlace = 0
  currentWordText.textContent = ""
  lettersGuessedText.textContent = ""
  gameStatus.textContent = ""
}

// start a fresh game
reset()

document.onkeyup = function(event) {

  // if player has guesses remaining, game continues
  if (guessesRemaining > 0 && currentPlace !== currentWord.length) {
    let action = event.key

    // player guesses right
    if (action === currentWord[currentPlace]) {
      currentWordText.textContent += currentWord[currentPlace]
      currentPlace++

      // player wins
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

  // player wins and has option to reset
  else if (currentPlace === currentWord.length) {
    reset()
  }

  // player has no guesses remaining and game ends
  else {
    reset()
  }
}
