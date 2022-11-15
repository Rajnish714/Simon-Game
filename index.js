/*----------------------------------------Variables & Animation Function-------------------------------------------------------------*/
let buttonColours = ["green", "red", "yellow", "blue"];
let level = 0;
let started = false;
let gamePattern = [];
let userClickedPattern = [];

let fadeAnimation = (ani) => {
  return ani.fadeIn(100).fadeOut(100).fadeIn(100);
};

$(document).keypress(() => {
  if (!started) {
    $("#level-title").html("Level " + level);

    initialSequence();
    started = true;
  }
});

/*----------------------------------------User guess-------------------------------------------------------------*/
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkResult(userClickedPattern.length - 1);
});

/*----------------------------------------game random combination-------------------------------------------------------------*/

function initialSequence() {
  userClickedPattern = [];
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  fadeAnimation($("#level-title").html("Level " + level));
  setTimeout(() => {
    fadeAnimation($("#" + randomChosenColour));
  }, 500);
}

/*----------------------------------------game sound play-------------------------------------------------------------*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(userClicked) {
  if (userClicked === "body") {
    $("#" + userClicked).addClass("game-over");
    setTimeout(() => {
      $("#" + userClicked).removeClass("game-over");
    }, 100);
  } else {
    $("#" + userClicked).addClass("pressed");
    setTimeout(() => {
      $("#" + userClicked).removeClass("pressed");
    }, 100);
  }
}

/*----------------------------------------Check Result-------------------------------------------------------------*/

function checkResult(userClick) {
  if (gamePattern[userClick] === userClickedPattern[userClick]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        initialSequence();
      }, 1000);
    }
  } else {
    started = false;
    userClickedPattern = [];
    gamePattern = [];
    level -= level;
    fadeAnimation($("#level-title").html("GameOver! Press Any Key to Restart"));
    animatePress("body");
    playSound("wrong");
  }
}

// fadeAnimation($("#level-title").html("GameOver"));
// level -= level;
// $(document).keypress(() => {
//   // initialSequence();
// });
// if (arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i])) {
//   console.log("hii");
//   initialSequence();
// } else {
//   fadeAnimation($("#level-title").html("GameOver"));
// level -= level;
// $(document).keypress(() => {
//   initialSequence();
// });
