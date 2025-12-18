var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        makeSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length -1)
    });

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);

    
}
function makeSound(sound){
    var audio = new Audio("sounds/" + sound +".mp3");
    audio.play();
}

function animatePress(currColor){
    $("#" + currColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("sucsses");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}