var level=0;
var buttonArray=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var notStarted=true;
$(document).keypress(function(){
    if(notStarted){
        $("#level-title").text("Level: "+level);
        nextSequence();
        notStarted=false;
    }
})
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function startOver(){
    level=0;
    gamePattern=[];
    notStarted=true;
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,Press any key to Restart");
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var num=Math.random();
    num=Math.floor(num*4);
    console.log(num);
    var randomChoseColor=buttonArray[num];
    gamePattern.push(randomChoseColor);
    $("#" + randomChoseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}