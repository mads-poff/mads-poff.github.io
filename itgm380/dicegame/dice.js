/*
Dice Game
Mads Poff
*/

var score = 0;
var p1score = 0;
var p2score = 0;
var p1name, p2name;
var playerTurn = 1;

function startGame1p() {

    // Update the page to show the singleplayer gameplay UI
    var startScreen = document.getElementById("_1pstart");
    var startButtons = document.getElementById("gamestart");
    var helpText = document.getElementById("instructions");
    helpText.innerHTML = "Press roll to roll two d6 dice. If you roll two 1s, you lose! Anything else is added to your score. Get to a score of 50 to win.";

    startScreen.style.display = "flex";
    startButtons.style.display = "none";
}

function startGame2p() {

    // Update the page to show the multiplayer start screen UI
    var startScreen = document.getElementById("_2pstart");
    var startButtons = document.getElementById("gamestart");

    var helpText = document.getElementById("instructions");
    helpText.innerHTML = "Players take turns rolling two dice. If someone rolls two 1s, they lose! Otherwise the total is added to their score. The first to earn 50 points wins.";

    startScreen.style.display = "flex";
    startButtons.style.display = "none";
}

function showGameScreen2p() {

    // Update the page to show the multiplayer gameplay UI
    var playScreen = document.getElementById("_2pPlay");
    var startScreen = document.getElementById("_2pstart");

    var p1NameDisplay = document.getElementById("p1NameDisplay");
    var p2NameDisplay = document.getElementById("p2NameDisplay");
    p1name = document.getElementById("p1name").value;
    p2name = document.getElementById("p2name").value;
    var rollBtn = document.getElementById("rollDice2p");
    p1NameDisplay.innerHTML = p1name + "'s score: " + "_ " + p1score + " / 50";
    p2NameDisplay.innerHTML = p2name + "'s score: " + "_ " + p2score + " / 50";
    rollBtn.innerHTML = "Roll Dice for " + p1name;

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

function endGame(result) {

    switch (result) {

        // Multiplayer, player one wins
        case 1:
            alert(p1name + " wins the game!");
            break;
        // Multiplayer, player two wins
        case 2:
            alert(p2name + " wins the game!");
            break;
        // Singleplayer, player has won
        case 3:
            alert("WINNER WINNER CHICKEN DINNER");
            break;
        // Singleplayer, player has lost
        case 4:
            alert("You lose the game!!!!");
            break;
    }

    location.reload();
    return null;
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
          endGame(4);
    } else {
        score += d1+d2;
        scoreText.innerHTML = score;
        if (score >= 50) {
            endGame(3);
        }
    }
}

// Looks at the results of each round and adds to scores and determines if it causes a win or loss
function check2pStatus(playerNum, d1, d2) {

    if (playerNum === 1) {
        if (d1 === 1 && d2 === 1) {
            alert(p1name + " rolled two ones, so " + p2name + " wins the game!");
            location.reload();
        } else {
            p1score += d1 + d2;
            if (p1score >= 50) {
                endGame(1);
            }
        }
    } else {
      if (d1 === 1 && d2 === 1) {
          alert(p2name + " rolled two ones, so " + p1name + " wins the game!");
          location.reload();
      } else {
          p2score += d1 + d2;
          if (p2score >= 50) {
              endGame(1);
          }
      }
    }
}

function roll2p() {

    // Set up all the game text
    var d1, d2;
    var d1Text = document.getElementById("d1Text2p");
    var d2Text = document.getElementById("d2Text2p");
    var status = document.getElementById("multiStatus");
    var rollBtn = document.getElementById("rollDice2p");
    var p1NameDisplay = document.getElementById("p1NameDisplay");
    var p2NameDisplay = document.getElementById("p2NameDisplay");
    var diceDisplay = document.getElementById("multiDice");
    p1NameDisplay.innerHTML = p1name + "'s score: " + "_ " + p1score + " / 50";
    p2NameDisplay.innerHTML = p2name + "'s score: " + "_ " + p2score + " / 50";

    switch (playerTurn) {
      case 1:
          // Roll two d6 dice
          d1 = getRandomInt(1,6);
          d2 = getRandomInt(1,6);
          multiDice.innerHTML = "Dice results: " + p1name + " rolled " + d1 + " and " + d2 + ". ";
          check2pStatus(1, d1, d2);

          //status.innerHTML = " It is " + p1name + "'s turn.";
          rollBtn.innerHTML = "Roll Dice for " + p2name;
          playerTurn = 2;
          break;
      case 2:
          // Roll two d6 dice
          d1 = getRandomInt(1,6);
          d2 = getRandomInt(1,6);
          multiDice.innerHTML = "Dice results: " + p2name + " rolled " + d1 + " and " + d2 + ". ";
          check2pStatus(2, d1, d2);

          //status.innerHTML = " It is " + p1name + "'s turn.";
          rollBtn.innerHTML = "Roll Dice for " + p1name;
          playerTurn = 1;
          break;
      default:
          status.innerHTML = " Something seems to have gone wrong.";
          break;
    }

    p1NameDisplay.innerHTML = p1name + "'s score: " + "_ " + p1score + " / 50";
    p2NameDisplay.innerHTML = p2name + "'s score: " + "_ " + p2score + " / 50";
}

// Set up key events on the initial page load
window.onload = function () {

    var startbtn1 = document.getElementById("_1pstartbutton");
    var startbtn2 = document.getElementById("_2pstartbutton");
    var rollBtn = document.getElementById("rollDice");
    var rollMultiBtn = document.getElementById("rollDice2p");
    var helpText = document.getElementById("instructions");
    var submit2pNames = document.getElementById("init2pBtn");
    helpText.innerHTML = "Select the number of players:";
    startbtn1.onclick = startGame1p;
    startbtn2.onclick = startGame2p;
    rollBtn.onclick = roll;
    rollMultiBtn.onclick = roll2p;
    submit2pNames.onclick = showGameScreen2p;
}
