/*
Dice Game
Mads Poff
*/

var score = 0;
var p1score = 0;
var p2score = 0;
var p1name, p2name;

function startGame1p() {
    //var startScreen = document.getElementById("_" + "1" + "pstart");
    var startScreen = document.getElementById("_1pstart");
    var startButtons = document.getElementById("gamestart");
    var helpText = document.getElementById("instructions");
    helpText.innerHTML = "Press roll to roll two d6 dice. If you roll two 1s, you lose! Anything else is added to your score. Get to a score of 50 to win.";

    startScreen.style.display = "flex";
    startButtons.style.display = "none";
}

function startGame2p() {
    //var startScreen = document.getElementById("_" + "1" + "pstart");
    /*
    var startScreen = document.getElementById("_2pstart");
    var startButtons = document.getElementById("gamestart");
    var helpText = document.getElementById("instructions");
    helpText.innerHTML = "[2p help here]";

    startScreen.style.display = "flex";
    startButtons.style.display = "none";
    */
    alert("Two player mode coming soon!");
}

function showGameScreen2p() {
    var playScreen = document.getElementById("_2pPlay");
    var startScreen = document.getElementById("_2pstart");
    startScreen.style.display = "none";
    playScreen.style.display = "flex";
}

// --- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
// --- end of MDN content

function loseGame() {
    alert("You lose the game!!!!");
    location.reload();
}

function winGame() {
    alert("WINNER WINNER CHICKEN DINNER");
    location.reload();
}

function roll() {
    // Set up all the game text
    var d1, d2;
    var d1Text = document.getElementById("d1Text");
    var d2Text = document.getElementById("d2Text");
    var scoreText = document.getElementById("singleplayerScore");
    // Roll two d6 dice
    d1 = getRandomInt(1,6);
    d2 = getRandomInt(1,6);
    // Report the results of the rolls
    d1Text.innerHTML = "&nbsp" + d1;
    d2Text.innerHTML = d2 + "&nbsp";

    // Lose the game if two 1s are rolled, otherwise add to the score and check if it's over 50 (win condition)
    if (d1 === 1 && d2 === 1) {
          loseGame();
    } else {
        score += d1+d2;
        scoreText.innerHTML = score;
        if (score >= 50) {
            winGame();
        }
    }
}

window.onload = function () {
    var startbtn1 = document.getElementById("_1pstartbutton");
    var startbtn2 = document.getElementById("_2pstartbutton");
    var rollBtn = document.getElementById("rollDice");
    var helpText = document.getElementById("instructions");
    var submit2pNames = document.getElementById("init2pBtn");
    helpText.innerHTML = "Select the number of players:";
    startbtn1.onclick = startGame1p;
    startbtn2.onclick = startGame2p;
    rollBtn.onclick = roll;
    submit2pNames.onclick = showGameScreen2p;
}
