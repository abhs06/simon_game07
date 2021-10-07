
var gamePattern=[];
var started = false;
 var level = 0;
 var score=0;
var buttonColours=["red","blue","green","yellow"];
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//next nextSequence function to generate the random numbers for the patterns
function nextSequence()
{
  userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level); //to update the level
var randomNumber=Math.floor(Math.random()*4); //to generate range from(0-3)
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}
//to find the value or identification of the pressed button
$(".btn").click(function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
 });
//playing sounds using js
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//for adding animation on click or press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//for checking the answers
function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

       if (userClickedPattern.length === gamePattern.length){
         score++;
         setTimeout(function () {
           nextSequence();
         }, 1000);
       }
     }
     else {
       playSound("wrong");
       $("body").addClass("game-over");
       $("#level-title").html("Game Over :(  Try again<br/><br/><em>Score<em/> "+score);
       setTimeout(function () {
         $("body").removeClass("game-over");
       }, 500);

       startOver();
     }
 }
 //restart function for the game
 function startOver() {
   level = 0;
   score=0;
   gamePattern = [];
   started = false;
 }
