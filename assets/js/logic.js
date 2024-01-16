// variables calling IDs in the index.html
const startBtn = document.querySelector("#start-button");
const timerDisplay = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const questions = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const submitBtn = document.querySelector("#submit-button");
const feedback = document.querySelector("#feedback");
let finalScore = document.querySelector("#final-score");

// global variables
let questionIndex = 0;
let questionObject;
let timeLeft = 60; // total time in seconds
let timerInterval;

// function for timer to countdown from 60 seconds
function startTimer() {
    timerInterval = setInterval(function() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    // check if timeLeft is 0, and end the quiz if it is
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    }

    }, 1000); // 1000 milliseconds = 1 second
}

// function to retrieve questions
function getQuestions() {
    questionObject = questionsArr[questionIndex];
    questionTitle.textContent = questionObject.questionTitle;
    choices.innerHTML = "";

    for (let i = 0; i < questionObject.choices.length; i++) {
        let el = document.createElement("button");
        el.textContent = questionObject.choices[i];
        el.onclick = checkAnswer;
        choices.appendChild(el); // puts the element into the choices div
    }
}

// audio for correct and incorrect sound
const correctAudio = new Audio("./assets/sfx/correct.wav"); // retrieves the audio
const incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

// function to check user answer
function checkAnswer(event) {
    let userAnswer = event.target;
    console.log(userAnswer.textContent);

    if (userAnswer.textContent === questionsArr[questionIndex].answer) {
        questionIndex++;
        if (questionIndex === questionsArr.length) { 
            endQuiz();
            correctAudio.play();
            feedback.setAttribute("class","hide");
        } else {
            getQuestions();
            correctAudio.play(); // plays the audio
            feedback.setAttribute("class","show");
            feedback.textContent = "Correct!";
        }
    } else {
        timeLeft -= 10;
        questionIndex++;
        if (questionIndex === questionsArr.length) { 
            endQuiz();
            incorrectAudio.play();
            feedback.setAttribute("class","hide");
        } else {
            getQuestions();
            incorrectAudio.play();
            feedback.setAttribute("class","show");
            feedback.textContent = "Incorrect!";
        }
    }
}

// function to end quiz
function endQuiz() {
    questions.setAttribute("class","hide"); // hides the questions div
    endScreen.setAttribute("class","show"); // shows the end screen div
    clearInterval(timerInterval); // clears interval and stops the timer
    finalScore.textContent = timeLeft;
    timerDisplay.textContent = timeLeft; // added this so that the timer shows the correct amount of time remaining when the user answers wrong on the last question
}

// function to start quiz
function startQuiz() {
    startScreen.setAttribute("class","hide"); // hides the start screen div
    questions.setAttribute("class","show"); // shows the questions div
    startTimer();
    getQuestions();
}

// function to save the user's score (time remaining)
function saveUserScore() {
    let initials = document.getElementById("initials").value;
    console.log(initials); // testing to see if the initials are being submitted

    let userScore = timeLeft;
    console.log(userScore); // testing to see if the final score is being submitted

    let scoreObject = {
        score: userScore,
        initials: initials,
    };

    let scoresArr;

    if (localStorage.getItem("scores") === null) { // checking to see if there is a scores array in local storage
        scoresArr = [];
    } else {
        scoresArr = JSON.parse(localStorage.getItem("scores"));
    }

    scoresArr.push(scoreObject); // this will push the user's score into the array

    localStorage.setItem("scores", JSON.stringify(scoresArr));

    window.location.pathname = "./highscores.html";
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveUserScore);