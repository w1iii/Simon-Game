var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false; 

function nextSequence(){
    userClickedPattern = []; // Reset user pattern for new sequence
    level++; 

    document.getElementById("level-title").innerHTML = "Level " + level;
    
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

    console.log("Level:", level);
    console.log("Game pattern:", gamePattern);
}

function animatePress(userChosenColour){
    var button = document.getElementById(userChosenColour);
    button.classList.add("pressed");

    setTimeout(function() {
        button.classList.remove("pressed");
    }, 100);
}

function handler(){
    if (!started) return; // Don't allow clicks before game starts
    
    var userChosenColour = this.id; 
    userClickedPattern.push(userChosenColour);  

    console.log("User clicked:", userChosenColour); 
    console.log("User pattern:", userClickedPattern);

    var colorAudio = new Audio("sounds/" + userChosenColour + ".mp3");
    colorAudio.play();

    animatePress(userChosenColour);
    
    // Check answer after each click
    checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel){
    // Check if current click matches the pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If user completed the current sequence
        if (userClickedPattern.length === gamePattern.length) {
            console.log("Sequence completed correctly!");
            
            // Start next sequence after a delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // Wrong answer - game over
        console.log("Wrong answer! Game Over!");
        document.getElementById("level-title").innerHTML = "Game Over! Press A to Restart";
        
        // Reset game
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        started = false;

        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play().catch(function() {
            console.log("Wrong sound not found");
        });
        
        // Flash red background
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "#011F3F";
        }, 200);
    }
}


document.querySelectorAll(".btn").forEach(function(button) {
    button.addEventListener("click", handler);
});


document.addEventListener("keydown", function(event) {
    if (event.key === "a" || event.key === "A") {
        if (!started) {
            console.log("Game Started! A key was pressed");
            started = true;
            nextSequence(); 
        } else {
            console.log("Game already started!");
        }
    }
});