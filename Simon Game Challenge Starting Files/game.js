var isStarted = false;
var buttonColours = ["green", "red", "yellow", "blue"];
var level = 1;
var indice = 0;

function generateNumber() {
  n = Math.random();
  n = n * 4;
  n = Math.floor(n);
  return n;
}

var gameSequence = []
var userSequence = []

function startGame() {
  if(!isStarted) {
    isStarted = true;
    $("h1").text("Level " + level);
    playGame()
  }
}

function endGame() {
  if(isStarted) {
    isStarted = false;
    $("h1").text("Game Over. Press Any Key to Restart");
  }
}

function playsound(name) {
  var audioFile = new Audio("./sounds/" + name + ".mp3");
  audioFile.play();
}

function animateButton(button) {
  var originalColour = button.css("background-color")
  button.css("background-color", "gray");
  setTimeout(() => {
    button.css("background-color", originalColour);    
  }, 50);
  
}

function playGame() {
  level += 1;
  indice = 0;
  isStarted = false;
  gameSequence.push(buttonColours[generateNumber()]);
  console.log("game sequence: " +  gameSequence)
  for (let i = 0; i < gameSequence.length; i++) {
    
    setTimeout(() => {
      playsound(gameSequence[i]);
      animateButton($("#" + gameSequence[i]))
      
    },(i+1) * 500);
  }
  isStarted = true;

}

function checkResults(gameSequence, buttonName, indice) {
  if(gameSequence[indice] !== buttonName) {
    endGame()
  }
  if (indice === gameSequence.length - 1 && gameSequence[indice] == gameSequence[gameSequence.length -1])  {
    playGame()
  } 
}

for(let i =0; i < 4; i++) {
  let buttonName = buttonColours[i];
  $("#" + buttonName).on("click", function () {
    if (isStarted) {
      playsound(buttonName);
      animateButton($("#" + buttonName));
      checkResults(gameSequence, buttonName, indice)
      indice += 1;
      console.log("indice: " + indice +   "name: " + buttonName)
    }
  });
}

$("body").ready().on("keypress", startGame)