let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})


//on button click takes the id of the button and adds it to the array of user choices + plays its audio
$(".btn").click(function(){
    if(started){
    let userClickedColor = $(this).attr("id");
    userClickedPattern.push(userClickedColor);

    $("#" + userClickedColor).fadeOut(100).fadeIn(100);     //animation
    playAudio(userClickedColor);
    checkAnswer(userClickedPattern.length-1);       //take the the index of the last button click and compare it with the gamePattern element of the same index
    }
})

//selects the next randomly generated color
function nextSequence() {
    userClickedPattern = [];    //reset the user clicked pattern so the player is required to press more than just the final key
    $("#level-title").text("level " + level);
    level++;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    //select the button that was chosen
    $("#" + randomColor).fadeOut(100).fadeIn(100);          //animation
    playAudio(randomColor)
}

function playAudio(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(lastColorIndex){
    if(userClickedPattern[lastColorIndex] === gamePattern[lastColorIndex]){
        // alert("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playAudio("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}