var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    var randomNum = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNum];
 
    gamePattern.push(randomChosenColour);
    var button = document.getElementById(randomChosenColour);

    button.classList.add('flash-animation');
    setTimeout(function() {
        button.classList.remove('flash-animation');
    }, 300);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    level += 1;
    console.log(level);

}

function animatePress(userChosenColour){
    var button = document.getElementById(userChosenColour);
    button.classList.add("pressed");

    setTimeout(function() {
        button.classList.remove("pressed");
    }, 100);

}

function handler(){
    var userChosenColour = this.id; 

    
    userClickedPattern.push(userChosenColour);  

    console.log(userChosenColour); 

    console.log(userClickedPattern);

    var colorAudio = new Audio("sounds/" + userChosenColour + ".mp3");
    colorAudio.play();

    animatePress(userChosenColour);

}

function checkAnswer(){
    //Step 8 - Check the User's Answer Against the Game Sequence8
}




document.querySelectorAll(".btn").forEach(function(button) {
    button.addEventListener("click", handler);
});




document.addEventListener("keydown", function(event) {
    if (event.key === "a" || event.key === "A") {
        console.log("Game Started! A key was pressed");

        document.getElementById("level-title").innerHTML = "Level " + level;
        
        nextSequence();

    }
});



