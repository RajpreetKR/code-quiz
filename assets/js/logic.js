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

// global variables
let scoreObject = {
    score : "", initials : ""
}
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

// function to check user answer
function checkAnswer(event) {
    let userAnswer = event.target;
    console.log(userAnswer.textContent);

    if (userAnswer.textContent === questionsArr[questionIndex].answer) {
        questionIndex++;
        if (questionIndex === questionsArr.length) { 
            endQuiz();
        } else {
            getQuestions();
        }
    } else {
        timeLeft -= 10;
        questionIndex++;
        if (questionIndex === questionsArr.length) { 
            endQuiz();
        } else {
            getQuestions();
        }
    }
}

// function to end quiz
function endQuiz() {
    questions.setAttribute("class","hide"); // hides the questions div
    endScreen.setAttribute("class","show"); // shows the end screen div
}

// function to start quiz
function startQuiz() {
    startScreen.setAttribute("class","hide"); // hides the start screen div
    questions.setAttribute("class","show"); // shows the questions div
    startTimer();
    getQuestions();
}

startButton.addEventListener("click", startQuiz);