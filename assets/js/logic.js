const startButton = document.querySelector("#start-button");
const timerDisplay = document.querySelector("#time");

let timeLeft = 60; // Total time in seconds
let timerInterval;

function startTimer() {
    timerInterval = setInterval(function() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    // check if timeLeft is 0, and end the quiz if it is
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // call for a function to end the quiz here when created
    }

  }, 1000); // 1000 milliseconds = 1 second
}

startButton.addEventListener("click", startTimer);