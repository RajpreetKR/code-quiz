// variables calling IDs in the highscores.html
let highscores = document.querySelector("#highscores");
const clearBtn = document.querySelector("#clear");

let scoresString = localStorage.getItem("scores");
let scoresArr = JSON.parse(scoresString);

// sorts the array by the highest value
scoresArr.sort(function(a, b) {
    return b.score - a.score;
});

for (let i = 0; i < scoresArr.length; i++) {
    let scoreObject = scoresArr[i];

    // creates a new div for each score
    let scoreElement = document.createElement("div");
    scoreElement.textContent = `${scoreObject.initials}: ${scoreObject.score}`;

    // appends the score element to the highscores div
    highscores.appendChild(scoreElement);
}

function clearLeaderboard() {
    window.localStorage.removeItem("scores");
    highscores.innerHTML = "";
}

clearBtn.addEventListener("click", clearLeaderboard);
