// variables calling IDs in the index.html
const startButton = document.querySelector("#start-button");
const timerDisplay = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const questions = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const submitButton = document.querySelector("#submit-button");
const feedback = document.querySelector("#feedback");

// variables
let timeLeft = 60; // total time in seconds
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